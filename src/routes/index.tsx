import { Head } from '$fresh/runtime.ts';

export default function Index() {
	return (
		<>
			<Head>
				<title>홈 | Daisy</title>
			</Head>
			<div>
				{new Array(10).fill(
					<img
						src='https://playentry.org/uploads/sg/e8/sge8t6brklsv58r7003hf51f2bdzzowb.svg'
						alt=''
					/>,
				)}
			</div>
		</>
	);
}
