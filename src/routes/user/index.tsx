import type { FreshContext, PageProps } from '$fresh/server.ts';
import type { DaisyState } from '../_middleware.ts';
import _User from './[username].tsx';

export function handler(_req: Request, ctx: FreshContext<DaisyState>) {
	if (!ctx.state.user) throw new Deno.errors.NotFound();
	return ctx.render();
}

export default function User(props: PageProps<unknown, DaisyState>) {
	return _User({
		...props,
		params: { ...props.params, username: props.state.user!.username },
	});
}
