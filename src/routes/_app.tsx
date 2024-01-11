import { Partial } from '$fresh/runtime.ts';
import type { PageProps } from '$fresh/server.ts';
import {
	CompassIcon,
	EditIcon,
	EvaIcon,
	PaperPlaneIcon,
	ShoppingBagIcon,
} from '$icons';
import { useEntryUserUpdater } from '$utils/hooks/use-entry-user-updater.ts';
import { Head } from '../components/layout/head.tsx';
import Nav from '../components/layout/nav.tsx';
import { Sidebar } from '../components/layout/sidebar.tsx';
import { AuthModal } from '../islands/auth/modal.tsx';
import type { DaisyState } from './_middleware.ts';

export interface Route {
	icon: EvaIcon;
	href: string;
	label: string;
	protected?: boolean;
}

const routes: Route[] = [
	{ icon: CompassIcon, href: '/', label: '홈' },
	{ icon: ShoppingBagIcon, href: '/store', label: '스토어' },
	{ icon: EditIcon, href: '/editor', label: '만들기', protected: true },
	{ icon: PaperPlaneIcon, href: '/direct', label: 'Direct', protected: true },
];

export default function App({
	Component,
	state,
}: PageProps<unknown, DaisyState>) {
	useEntryUserUpdater(state.user);

	return (
		<html lang='ko'>
			<head>
				<Head />
			</head>
			<body class='grid grid-cols-[16rem_1fr]' f-client-nav>
				<Sidebar user={state.user} routes={routes} />
				<div class='grid grid-rows-[64px_1fr]'>
					<Nav />
					<main class='flex flex-col items-center'>
						<Partial name='main'>
							<Component />
						</Partial>
					</main>
					<AuthModal verifyId={Deno.env.get('VERIFY_ID') ?? ''} />
				</div>
			</body>
		</html>
	);
}
