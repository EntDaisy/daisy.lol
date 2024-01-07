import { Partial } from '$fresh/runtime.ts';
import type { JSX } from 'preact/jsx-runtime';

interface AuthLayoutProps {
	children: JSX.Element;
}

export function AuthLayout({ children }: AuthLayoutProps) {
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
			<body
				class='bg-[#0000] bg-repeat bg-[0_0] bg-[length:100%_100%]
          bg-scroll bg-origin-padding bg-clip-border
          bg-[conic-gradient(from_90deg_at_50%_0,_#ff640080,_#ff640080_0deg,_#82dca080_135deg),_linear-gradient(#ff005a80_0%,_#82dca080_100%,_#82dca080)]
          [background-blend-mode:_color-dodge] h-screen'
				f-client-nav
			>
				<div class='flex w-full h-full px-2'>{children}</div>
			</body>
		</html>
	);
}
