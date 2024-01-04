import type { PageProps } from '$fresh/server.ts';
import { Partial } from '$fresh/src/runtime/Partial.tsx';
import { Sidebar } from '../components/layout/sidebar.tsx';

export default function App({ Component }: PageProps) {
	return (
		<html lang='ko'>
			<head>
				<meta charset='utf-8' />
				<title>daisy.lol</title>
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<link rel='manifest' href='/manifest.json' />
				<link rel='icon' type='image/svg+xml' href='/favicon.svg' />
				<link rel='stylesheet' href='/fonts.css' />
				<link rel='stylesheet' href='/styles.css' />
			</head>
			<body class='grid grid-cols-[16rem_1fr]' f-client-nav>
				<Sidebar />
				<Partial name='main'>
					<Component />
				</Partial>
			</body>
		</html>
	);
}
