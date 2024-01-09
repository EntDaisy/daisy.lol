import { Head } from '$fresh/runtime.ts';
import type { PageProps } from '$fresh/server.ts';
import type { DaisyState } from '../_middleware.ts';

export default function User({
	params,
	state,
}: PageProps<unknown, DaisyState>) {
	return (
		<>
			<Head>
				<title>{params.username ?? '유저'} | Daisy</title>
			</Head>
			{state.user && JSON.stringify(state.user)}
		</>
	);
}
