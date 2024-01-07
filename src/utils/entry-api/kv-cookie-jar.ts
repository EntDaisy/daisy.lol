import {
	Cookie,
	CookieOptions,
	isSameDomainOrSubdomain,
	parseURL,
} from 'another-cookiejar/cookie';

const strictMatchProps = [
	'value',
	'secure',
	'httpOnly',
	'maxAge',
	'expires',
	'sameSite',
];

const cookieMatches = (
	options: Cookie | CookieOptions,
	comparedWith: Cookie,
	strictMatch = false,
): boolean => {
	if (
		options.path !== undefined &&
		!comparedWith.path?.startsWith(options.path)
	) {
		return false;
	}

	if (options.domain) {
		if (!isSameDomainOrSubdomain(options.domain, comparedWith.domain)) {
			return false;
		}
	}

	if (options.name !== undefined && options.name !== comparedWith.name) {
		return false;
	}

	if (
		strictMatch &&
		strictMatchProps.some(
			(propKey) =>
				// @ts-ignore
				options[propKey] !== undefined &&
				// @ts-ignore
				options[propKey] !== comparedWith[propKey],
		)
	) {
		return false;
	}

	return true;
};

const MAX_TIME = 2147483647000;

const cookieCompare = (a: Cookie, b: Cookie) => {
	let cmp = 0;

	const aPathLen = a.path?.length || 0;
	const bPathLen = b.path?.length || 0;
	cmp = bPathLen - aPathLen;
	if (cmp !== 0) return cmp;

	const aTime = a.creationDate || MAX_TIME;
	const bTime = b.creationDate || MAX_TIME;
	cmp = aTime - bTime;
	if (cmp !== 0) return cmp;

	cmp = a.creationIndex - b.creationIndex;
	return cmp;
};

export class KvCookieJar {
	kv: Deno.Kv;
	cookies: Cookie[] = [];

	constructor(kv: Deno.Kv, cookies?: string[]) {
		this.kv = kv;
		this.replaceCookies(cookies?.map((c) => Cookie.from(c)));
	}

	setCookie(cookie: Cookie | string, url?: string | Request | URL) {
		let cookieObj;
		if (typeof cookie === 'string') cookieObj = Cookie.from(cookie);
		else cookieObj = cookie;

		if (url) {
			if (!cookieObj.domain) cookieObj.setDomain(url);
			if (!cookieObj.path) cookieObj.setPath(url);
		}

		if (!cookieObj.isValid()) return;

		const foundCookie = this.getCookie(cookieObj);
		if (foundCookie) {
			const indexOfCookie = this.cookies.indexOf(foundCookie);
			if (!cookieObj.isExpired()) {
				this.cookies.splice(indexOfCookie, 1, cookieObj);
			} else {
				this.cookies.splice(indexOfCookie, 1);
			}
		} else if (!cookieObj.isExpired()) {
			this.cookies.push(cookieObj);
		}

		this.cookies.sort(cookieCompare);
		this.kv.set(
			['cookies'],
			this.cookies.map((c) => c.toString()),
		);
	}

	getCookie(options: Cookie | CookieOptions): Cookie | undefined {
		const strictMatch = typeof (options as Cookie).isValid !== 'function';
		for (const [index, cookie] of this.cookies.entries()) {
			if (cookieMatches(options, cookie, strictMatch)) {
				if (!cookie.isExpired()) return cookie;
				this.cookies.splice(index, 1);
				this.kv.set(
					['cookies'],
					this.cookies.map((c) => c.toString()),
				);
				return undefined;
			}
		}
	}

	getCookies(options?: CookieOptions | Cookie) {
		if (options) {
			const matchedCookies: Cookie[] = [];
			const removeCookies: Cookie[] = [];
			for (const cookie of this.cookies) {
				if (cookieMatches(options, cookie)) {
					if (!cookie.isExpired()) {
						matchedCookies.push(cookie);
					} else {
						removeCookies.push(cookie);
					}
				}
			}
			if (removeCookies.length) {
				this.cookies = this.cookies.filter(
					(cookie) => !removeCookies.includes(cookie),
				);
				this.kv.set(
					['cookies'],
					this.cookies.map((c) => c.toString()),
				);
			}
			return matchedCookies;
		}
		return this.cookies;
	}

	getCookieString(url: string | Request | URL) {
		const searchCookie = new Cookie();
		searchCookie.setDomain(url);
		const cookiesToSend = this.getCookies(searchCookie)
			.filter((cookie) => {
				return cookie.canSendTo(parseURL(url));
			})
			.map((c) => c.getCookieString())
			.join('; ');
		return cookiesToSend;
	}

	toJSON() {
		return this.cookies;
	}

	removeCookie(options: CookieOptions | Cookie): Cookie | undefined {
		for (const [index, cookie] of this.cookies.entries()) {
			if (cookieMatches(options, cookie)) {
				const removedCookie = this.cookies.splice(index, 1)[0];
				this.kv.set(
					['cookies'],
					this.cookies.map((c) => c.toString()),
				);
				return removedCookie;
			}
		}
	}

	removeCookies(options?: CookieOptions | Cookie): Array<Cookie> | undefined {
		if (options) {
			const deletedCookies: Cookie[] = [];
			this.cookies = this.cookies.filter((cookie) => {
				if (cookieMatches(options, cookie)) {
					deletedCookies.push(cookie);
					return false;
				}
				return true;
			});
			this.kv.set(
				['cookies'],
				this.cookies.map((c) => c.toString()),
			);
			return deletedCookies.length ? deletedCookies : undefined;
		}
		this.cookies = [];
		this.kv.set(
			['cookies'],
			this.cookies.map((c) => c.toString()),
		);
	}

	replaceCookies(cookies?: Array<Cookie> | Array<CookieOptions>) {
		if (cookies?.length) {
			if (typeof (cookies[0] as Cookie).isValid === 'function') {
				this.cookies = cookies as Array<Cookie>;
			} else {
				this.cookies = [];
				for (const option of cookies) {
					this.cookies.push(new Cookie(option));
				}
			}
		} else {
			this.cookies = [];
		}
		this.kv.set(
			['cookies'],
			this.cookies.map((c) => c.toString()),
		);
	}
}
