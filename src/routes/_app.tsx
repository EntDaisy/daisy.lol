import { Partial } from '$fresh/runtime.ts';
import type { PageProps } from '$fresh/server.ts';
import {
	BrushIcon,
	CodeIcon,
	CompassIcon,
	EvaIcon,
	PaperPlaneIcon,
} from '$icons';
import Nav from '../components/layout/nav.tsx';
import { Sidebar } from '../components/layout/sidebar.tsx';
import { AuthModal } from '../islands/auth/modal.tsx';
import { useEntryUserUpdater } from '../utils/hooks/use-entry-user-updater.ts';
import type { DaisyState } from './_middleware.ts';

export interface Route {
	icon: EvaIcon;
	href: string;
	label: string;
}

const routes: Route[] = [
	{ icon: CompassIcon, href: '/', label: '홈' },
	{ icon: BrushIcon, href: '/themes', label: '테마' },
	{ icon: CodeIcon, href: '/scripts', label: '스크립트' },
	{ icon: PaperPlaneIcon, href: '/direct', label: 'Direct' },
];

export default function App({
	Component,
	state,
	url,
}: PageProps<unknown, DaisyState>) {
	useEntryUserUpdater(state.user);

	return (
		<html lang='ko'>
			<head>
				<meta charset='utf-8' />
				<title>Daisy</title>
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<meta name='theme-color' content='#09090b' />
				<link rel='manifest' href='/manifest.json' />
				<link rel='icon' type='image/svg+xml' href='/favicon.svg' />
				<link rel='stylesheet' href='/fonts.css' />
				<link rel='stylesheet' href='/styles.css' />
			</head>
			<body class='grid grid-cols-[16rem_1fr]' f-client-nav>
				<Sidebar user={state.user} routes={routes} />
				<div class='grid grid-rows-[64px_1fr]'>
					<Nav routes={routes} pathname={url.pathname} />
					<Partial name='main'>
						<Component />
					</Partial>
					<AuthModal verifyId={Deno.env.get('VERIFY_ID') ?? ''} />
				</div>
			</body>
		</html>
	);
}
