import { Head } from '$fresh/runtime.ts';
import { SadLogo } from '../components/common/logo.tsx';

export default function NotFound() {
	return (
		<>
			<Head>
				<title>페이지를 찾을 수 없음 | Daisy</title>
			</Head>
			<div class='flex flex-col items-center mt-20'>
				<div class='flex items-center w-max h-max'>
					<span class='text-8xl font-black transition-colors duration-300 ease-in-out'>
						4
					</span>
					<SadLogo class='w-24 h-24 my-6' />
					<span class='text-8xl font-black transition-colors duration-300 ease-in-out'>
						4
					</span>
				</div>
				<h1 class='text-3xl font-bold transition-colors duration-300 ease-in-out'>
					페이지를 찾을 수 없어요...
				</h1>
				<p class='text-lg my-4 transition-colors duration-300 ease-in-out'>
					요청하신 페이지를 찾을 수 없어요. 주소를 다시 확인해주세요.
				</p>
				<a
					href='/'
					class='font-medium text-brand-600 dark:text-brand-400 text-lg leading-5
            underline underline-offset-4 cursor-pointer
            transition-colors duration-300 ease-in-out'
				>
					홈으로 돌아가기
				</a>
			</div>
		</>
	);
}
