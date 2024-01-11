import { Head } from '$fresh/runtime.ts';
import type { FreshContext } from '$fresh/server.ts';
import type { DaisyState } from './_middleware.ts';

export function handler(_req: Request, ctx: FreshContext<DaisyState>) {
	if (!ctx.state.user) {
		return new Response(null, {
			status: 302,
			headers: {
				Location: `/login?redirect=${encodeURIComponent(
					ctx.url.href.slice(ctx.url.origin.length),
				)}`,
			},
		});
	}
	return ctx.render();
}

export default function Editor() {
	return (
		<>
			<Head>
				<title>만들기 | Daisy</title>
			</Head>
		</>
	);
}
