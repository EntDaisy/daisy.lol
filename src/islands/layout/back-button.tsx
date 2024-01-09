import { ArrowBackIcon } from '$icons';
import { IS_BROWSER } from '$fresh/runtime.ts';

export function BackButton() {
	const disabled = !(IS_BROWSER && history.length > 1);

	return (
		<button
			type='button'
			class='border border-transparent px-3 py-2
        enabled:hover:bg-zinc-900 enabled:hover:border-zinc-800 rounded-xl
        transition-colors duration-300 ease-in-out cursor-pointer disabled:cursor-not-allowed group'
			onClick={() => history.back()}
			disabled={disabled}
		>
			<ArrowBackIcon
				class='w-5 h-5
          fill-zinc-300 group-disabled:fill-zinc-500/80
          transition-colors duration-300 ease-in-out'
			/>
		</button>
	);
}
