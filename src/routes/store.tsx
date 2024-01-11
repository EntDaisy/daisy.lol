import { Head } from '$fresh/runtime.ts';
import type { PageProps } from '$fresh/server.ts';
import { ThemeEditorChip } from '../islands/store/theme-editor-chip.tsx';
import type { DaisyState } from './_middleware.ts';

export default function Themes({ state }: PageProps<unknown, DaisyState>) {
	return (
		<>
			<Head>
				<title>스토어 | Daisy</title>
			</Head>
			<ThemeEditorChip user={state.user} />
			<div class='w-full max-w-4xl pt-10'>
				<h2 class='font-semibold text-[34px]'>인기 테마</h2>
			</div>
			<div class='grid grid-cols-2 gap-x-6 max-w-[calc(56rem_+_16px)] mt-4'>
				<div>
					<img
						src='https://picsum.photos/512?0'
						alt=''
						class='w-full aspect-[2/1] object-cover rounded-[14px]'
					/>
					<div class='px-2 mt-3'>
						<p class='font-semibold text-[15px] text-zinc-400'>Daisy 다크</p>
						<p class='font-[650] text-xl'>
							Daisy 유저들에게만 제공되는 아름다운 다크 테마
						</p>
						<div class='flex items-center gap-x-1.5 mt-1.5'>
							<img
								src='https://playentry.org/uploads/9r/ao/9raor8ynklsv616l003hf51f2bbdsf7j.svg'
								alt=''
								class='w-6 h-6 border border-zinc-900 rounded-full'
							/>
							<span class='font-semibold text-zinc-300'>띠까</span>
						</div>
					</div>
				</div>
				<div>
					<img
						src='https://picsum.photos/512?2'
						alt=''
						class='w-full aspect-[2/1] object-cover rounded-[14px]'
					/>
					<div class='px-2 mt-3'>
						<p class='font-semibold text-[15px] text-zinc-400'>뉴진스</p>
						<p class='font-[650] text-xl'>NewJeans X 엔트리</p>
						<div class='flex items-center gap-x-1.5 mt-1.5'>
							<img
								src='https://playentry.org/uploads/9r/ao/9raor8ynklsv616l003hf51f2bbdsf7j.svg'
								alt=''
								class='w-6 h-6 border border-zinc-900 rounded-full'
							/>
							<span class='font-semibold text-zinc-300'>띠까</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
