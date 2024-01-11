import { ArrowForwardIcon, ColorPaletteIcon } from '$icons';
import type { User } from 'lucia';
import { openAuthModal } from '../auth/modal.tsx';

interface ThemeEditorChipProps {
	user: User | null;
}

export function ThemeEditorChip({ user }: ThemeEditorChipProps) {
	return (
		<a
			href='/editor/theme'
			class='flex items-center gap-x-1.5 px-3 py-2 mt-6
    border border-zinc-800 hover:border-zinc-700 rounded-full
    transition-colors duration-300 ease-in-out group'
			onClick={
				!user
					? (e) => {
							e.preventDefault();
							openAuthModal('login');
					  }
					: undefined
			}
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
	);
}
