import type { FreshContext, PageProps, RouteConfig } from '$fresh/server.ts';
import { Login as _Login } from '../../islands/auth/login.tsx';

export const config: RouteConfig = {
	skipAppWrapper: true,
};

export function handler(_req: Request, ctx: FreshContext) {
	const redirect = ctx.url.searchParams.get('redirect');
	return ctx.render({ redirect });
}

export default function Login({ data }: PageProps<{ redirect?: string }>) {
	return <_Login redirect={data.redirect} useAnchor />;
}
