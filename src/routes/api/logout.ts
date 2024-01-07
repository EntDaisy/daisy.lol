import { FreshContext } from '$fresh/server.ts';
import { lucia } from '$utils/db/lucia.ts';
import { setCookie } from '$std/http/cookie.ts';
import { DaisyState } from '../_middleware.ts';

export async function handler(
	_req: Request,
	ctx: FreshContext<DaisyState>,
): Promise<Response> {
	const session = ctx.state.session;

	if (session) {
		await lucia.invalidateSession(session.id);
		const blankSessionCookie = lucia.createBlankSessionCookie();

		const res = Response.json({ success: true });
		setCookie(res.headers, {
			name: blankSessionCookie.name,
			value: blankSessionCookie.value,
			...blankSessionCookie.attributes,
			sameSite: blankSessionCookie.attributes.sameSite
				? (`${blankSessionCookie.attributes.sameSite
						.at(0)
						?.toUpperCase()}${blankSessionCookie.attributes.sameSite.slice(
						1,
				  )}` as 'Strict' | 'Lax' | 'None')
				: undefined,
		});

		return res;
	}

	return Response.json({ success: false });
}
