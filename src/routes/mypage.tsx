import type { FreshContext } from '$fresh/server.ts';
import type { DaisyState } from './_middleware.ts';

export function handler(
	_req: Request,
	ctx: FreshContext<DaisyState>,
): Response {
	if (!ctx.state.user)
		return Response.json({
			success: false,
			message: '로그인이 되어 있지 않아요.',
		});

	return Response.redirect(
		`https://playentry.org/profile/${ctx.state.user.entryId}`,
		302,
	);
}
