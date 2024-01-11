import { Partial } from '$fresh/runtime.ts';
import type { PageProps } from '$fresh/server.ts';
import { Head } from '../../components/layout/head.tsx';

export default function AuthLayout({ Component }: PageProps) {
	return (
		<html lang='ko'>
			<head>
				<Head />
			</head>
			<body
				class='flex items-center justify-center w-screen h-screen
        bg-[#0000] bg-repeat bg-[0_0] bg-[length:100%_100%]
        bg-scroll bg-origin-padding bg-clip-border
        bg-[conic-gradient(from_90deg_at_50%_0,_#ff640080,_#ff640080_0deg,_#82dca080_135deg),_linear-gradient(#ff005a80_0%,_#82dca080_100%,_#82dca080)]
        [background-blend-mode:_color-dodge]'
				f-client-nav
			>
				<div
					class='w-full bg-zinc-950 max-w-md min-h-[32px] p-0
  rounded-3xl shadow-xl
  group-data-[open=true]:animate-scaleIn group-data-[open=false]:animate-scaleOut'
				>
					<Partial name='auth'>
						<Component />
					</Partial>
				</div>
			</body>
		</html>
	);
}
