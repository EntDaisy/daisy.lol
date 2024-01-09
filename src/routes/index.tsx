import { Head } from '$fresh/runtime.ts';

export default function Index() {
	return (
		<>
			<Head>
				<title>홈 | Daisy</title>
			</Head>
			<div>
				<button type='button'>로그인</button>
			</div>
		</>
	);
}
