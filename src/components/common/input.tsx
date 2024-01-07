import { EvaIcon } from '$icons';
import { twMerge } from 'tailwind-merge';
import { JSX } from 'preact/jsx-runtime';

type InputProps = JSX.HTMLAttributes<HTMLInputElement> & {
	icon?: EvaIcon;
	containerClass?: string;
};

export function Input({ icon: Icon, containerClass, ...props }: InputProps) {
	return (
		<label
			class={twMerge(
				`flex items-center h-[42px] px-3
          font-semibold bg-zinc-900 border border-zinc-800
          rounded-xl cursor-pointer`,
				containerClass,
			)}
		>
			{Icon && (
				<Icon class='flex-shrink-0 w-[18px] h-[18px] ml-px fill-zinc-400' />
			)}
			<input
				{...props}
				class={twMerge(
					`bg-transparent w-full
            placeholder:text-zinc-400 leading-4 focus:outline-none
            autofill:shadow-[0_0_0_1000px_inset] autofill:shadow-zinc-900`,
					typeof props.class === 'string' ? props.class : props.class?.value,
				)}
			/>
		</label>
	);
}
