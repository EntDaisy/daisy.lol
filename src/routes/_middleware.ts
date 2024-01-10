import type { FreshContext } from '$fresh/server.ts';
import { getCookies, setCookie } from '$std/http/cookie.ts';
import { lucia } from '$utils/db/lucia.ts';
import { getUser } from '$utils/entry-api/get-user.ts';
import type { Session, User } from 'lucia';

export interface DaisyState {
	user: User | null;
	session: Session | null;
}

export async function handler(req: Request, ctx: FreshContext<DaisyState>) {
	ctx.state = { user: null, session: null };
	const { pathname } = ctx.url;

	if (pathname.includes('.') || pathname.startsWith('/_frsh/')) {
		return ctx.next();
	}

	const sessionId = getCookies(req.headers)[lucia.sessionCookieName] as
		| string
		| undefined;
	if (!sessionId) {
		ctx.state.user = null;
		return ctx.next();
	}

	const { session, user: _user } = await lucia.validateSession(sessionId);
	let sessionCookie;
	if (!session) sessionCookie = lucia.createBlankSessionCookie();
	if (session?.fresh) sessionCookie = lucia.createSessionCookie(session.id);

	const entryUser = _user?.id ? await getUser(_user.entryId) : null;
	const user: User | null =
		_user && entryUser
			? {
					..._user,
					nickname: entryUser.nickname,
					profileImage: entryUser?.profileImage,
					coverImage: entryUser?.coverImage,
					updated: entryUser.updated,
			  }
			: null;

	ctx.state.user = user;
	ctx.state.session = session;

	const res = await ctx.next();

	if (sessionCookie)
		setCookie(res.headers, {
			name: sessionCookie.name,
			value: sessionCookie.value,
			...sessionCookie.attributes,
			sameSite: sessionCookie.attributes.sameSite
				? (`${sessionCookie.attributes.sameSite
						.at(0)
						?.toUpperCase()}${sessionCookie.attributes.sameSite.slice(1)}` as
						| 'Strict'
						| 'Lax'
						| 'None')
				: undefined,
		});

	return res;
}
