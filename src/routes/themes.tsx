import { Head } from '$fresh/runtime.ts';
import { ArrowForwardIcon, ColorPaletteIcon } from '$icons';

export default function Themes() {
	return (
		<>
			<Head>
				<title>테마 | Daisy</title>
			</Head>
			<a
				href='/editor/theme'
				class='flex items-center gap-x-1.5 px-3 py-2 mt-6
          border border-zinc-800 hover:border-zinc-700 rounded-full
          transition-colors duration-300 ease-in-out group'
			>
				<ColorPaletteIcon class='w-5 h-5 fill-brand-300' />
				<span class='font-semibold text-[15px] text-brand-100 leading-4'>
					Daisy 테마 편집기
				</span>
				<span class='font-semibold text-[15px] text-brand-100/50 leading-4'>
					·
				</span>
				<span class='font-semibold text-[15px] text-brand-100/90 leading-4'>
					나만의 테마를 만들어 보세요
				</span>
				<ArrowForwardIcon
					class='w-3.5 h-3.5 -mx-0.5 -my-[3px]
            fill-brand-100/50 group-hover:fill-brand-100/80
            transition-colors duration-300 ease-in-out'
				/>
			</a>
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
