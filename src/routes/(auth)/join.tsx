import type { FreshContext, PageProps, RouteConfig } from '$fresh/server.ts';
import { Join as _Join } from '../../islands/auth/join.tsx';

export const config: RouteConfig = {
	skipAppWrapper: true,
};

export function handler(_req: Request, ctx: FreshContext) {
	const redirect = ctx.url.searchParams.get('redirect');
	return ctx.render({ redirect });
}

export default function Join({ data }: PageProps<{ redirect?: string }>) {
	return (
		<_Join
			verifyId={Deno.env.get('VERIFY_ID')!}
			redirect={data.redirect}
			useAnchor
		/>
	);
}
