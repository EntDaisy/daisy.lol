import { fetch, kv } from '$utils/entry-api/fetch.ts';

export interface Tokens {
	csrfToken?: string;
	xToken?: string;
	updated?: number;
}

const tokens = await kv.get<Tokens>(['tokens']).then((t) => t.value);

export async function getTokens(): Promise<Tokens | null> {
	const username = Deno.env.get('USERNAME');
	const password = Deno.env.get('PASSWORD');

	try {
		if (tokens?.updated && Date.now() - tokens.updated <= 1000 * 60 * 60 * 3)
			return tokens;

		const res = await fetch('https://playentry.org');
		const html = await res.text();

		const __NEXT_DATA__ =
			/\<script id="__NEXT_DATA__".*\>((.|\n)+)\<\/script\>/.exec(html)?.[1];
		if (!__NEXT_DATA__) return null;

		const parsedData = JSON.parse(__NEXT_DATA__);

		const csrfToken = parsedData.props.initialProps.csrfToken;
		const xToken = parsedData.props.initialState.common.user?.xToken;

		if (!xToken) {
			const res = await fetch('https://playentry.org/graphql', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					...(csrfToken && { 'csrf-token': csrfToken }),
				},
				body: JSON.stringify({
					query: `mutation ($username: String!, $password: String!) {
          signinByUsername(username: $username, password: $password) {
            id
            username
            nickname
          }
        }`,
					variables: { username, password },
				}),
			});
			if (!res.ok) return null;
			const json = await res.json();
			if (!json.data.signinByUsername) return null;
			return getTokens();
		}

		if (typeof csrfToken !== 'string' || typeof xToken !== 'string')
			return null;
		const newTokens: Tokens = { csrfToken, xToken, updated: Date.now() };

		await kv.set(['tokens'], newTokens, { expireIn: 3 * 60 * 60 * 1000 });

		return newTokens;
	} catch (_) {
		console.log(_);
		return null;
	}
}
