import { KvCookieJar } from '$utils/entry-api/kv-cookie-jar.ts';
import { Cookie } from 'another-cookiejar';

const MAX_REDIRECT = 20;

export type WrapFetchOptions = {
	fetch?: typeof fetch;
	cookieJar: KvCookieJar;
};

interface ExtendedRequestInit extends RequestInit {
	redirectCount?: number;
}

const redirectStatus = new Set([301, 302, 303, 307, 308]);

function isRedirect(status: number): boolean {
	return redirectStatus.has(status);
}

// Credit <https://github.com/node-fetch/node-fetch/blob/5e78af3ba7555fa1e466e804b2e51c5b687ac1a2/src/utils/is.js#L68>.
function isDomainOrSubdomain(destination: string, original: string): boolean {
	const orig = new URL(original).hostname;
	const dest = new URL(destination).hostname;

	return orig === dest || orig.endsWith(`.${dest}`);
}

export function wrapFetch(options: WrapFetchOptions): typeof fetch {
	const { cookieJar, fetch = globalThis.fetch } = options || {};

	async function wrappedFetch(
		input: RequestInfo | URL,
		init?: ExtendedRequestInit,
	): Promise<Response> {
		if (!input) return await fetch(input);

		const cookieString = cookieJar.getCookieString(input);

		let originalRedirectOption: ExtendedRequestInit['redirect'];
		const originalRequestUrl: string =
			(input as Request).url || input.toString();

		if (input instanceof Request) {
			originalRedirectOption = input.redirect;
		}
		if (init?.redirect) {
			originalRedirectOption = init?.redirect;
		}

		const interceptedInit: ExtendedRequestInit = {
			...init,
			redirect: 'manual',
		};

		const reqHeaders = new Headers((input as Request).headers || {});

		if (init?.headers) {
			// biome-ignore lint/complexity/noForEach:
			new Headers(init.headers).forEach((value, key) => {
				reqHeaders.set(key, value);
			});
		}

		if (cookieString.length) reqHeaders.set('cookie', cookieString);

		reqHeaders.delete('cookie2');
		interceptedInit.headers = reqHeaders;

		const response = await fetch(input, interceptedInit as RequestInit);

		// biome-ignore lint/complexity/noForEach:
		response.headers.forEach((value, key) => {
			if (key.toLowerCase() === 'set-cookie') {
				const expires = Cookie.from(value).expires ?? 0;
				if (value.toLowerCase().includes('expires') && expires - Date.now() < 0)
					return;
				cookieJar.setCookie(value, response.url);
			}
		});

		const redirectCount = interceptedInit.redirectCount ?? 0;
		const redirectUrl = response.headers.has('location')
			? new URL(
					response.headers.get('location')?.toString() ?? '',
					originalRequestUrl,
			  ).toString()
			: undefined;

		if (redirectCount > 0) {
			Object.defineProperty(response, 'redirected', { value: true });
		}

		if (
			!isRedirect(response.status) ||
			!redirectUrl ||
			(redirectCount === 0 && originalRedirectOption === 'manual')
		) {
			return response;
		}

		if (originalRedirectOption === 'error') {
			await response.body?.cancel();
			throw new TypeError(
				`URI requested responded with a redirect and redirect mode is set to error: ${response.url}`,
			);
		}

		if (redirectCount >= MAX_REDIRECT) {
			await response.body?.cancel();
			throw new TypeError(
				`Reached maximum redirect of ${MAX_REDIRECT} for URL: ${response.url}`,
			);
		}

		await response.body?.cancel();
		interceptedInit.redirectCount = redirectCount + 1;
		const filteredHeaders = new Headers(interceptedInit.headers);

		if (!isDomainOrSubdomain(originalRequestUrl, redirectUrl)) {
			for (const name of ['authorization', 'www-authenticate']) {
				filteredHeaders.delete(name);
			}
		}

		if (interceptedInit.method === 'POST') {
			filteredHeaders.delete('content-length');
			interceptedInit.method = 'GET';
			interceptedInit.body = undefined;
		}
		interceptedInit.headers = filteredHeaders;

		return await wrappedFetch(redirectUrl, interceptedInit as RequestInit);
	}

	return wrappedFetch;
}
