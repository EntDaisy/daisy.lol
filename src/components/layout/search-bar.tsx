import { SearchIcon } from '$icons';

export function SearchBar() {
	return (
		<button
			type='button'
			class='flex items-center h-[42px] px-3
        bg-zinc-900 font-semibold border border-zinc-800 rounded-xl
        hover:bg-zinc-800 hover:border-zinc-700
        group cursor-pointer transition-colors duration-300 ease-in-out'
		>
			<SearchIcon class='flex-shrink-0 w-[18px] h-[18px] ml-px fill-zinc-400' />
			<span class='w-full ml-2 text-zinc-400 text-left leading-4'>검색</span>
			<span
				class='px-1.5 py-1
          font-semibold text-zinc-400 leading-[12px] text-xs border border-zinc-700 rounded-md
          group-hover:border-zinc-600
          transition-colors ease-in-out duration-300'
			>
				⌘K
			</span>
		</button>
	);
}
