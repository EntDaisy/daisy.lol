import { Partial } from '$fresh/runtime.ts';
import type { PageProps } from '$fresh/server.ts';
import { Sidebar } from '../components/layout/sidebar.tsx';
import type { DaisyState } from './_middleware.ts';

export default function App({
	Component,
	state,
}: PageProps<unknown, DaisyState>) {
	return (
		<html lang='ko'>
			<head>
				<meta charset='utf-8' />
				<title>daisy.lol</title>
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<meta name='theme-color' content='#09090b' />
				<link rel='manifest' href='/manifest.json' />
				<link rel='icon' type='image/svg+xml' href='/favicon.svg' />
				<link rel='stylesheet' href='/fonts.css' />
				<link rel='stylesheet' href='/styles.css' />
			</head>
			<body class='grid grid-cols-[16rem_1fr]' f-client-nav>
				<Sidebar user={state.user} />
				<Partial name='main'>
					<Component />
				</Partial>
			</body>
		</html>
	);
}
