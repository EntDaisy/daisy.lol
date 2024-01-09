import { BellIcon } from '$icons';

export function NotificationButton() {
	const notifications = [''];

	return (
		<button
			type='button'
			class='border border-transparent px-3 py-2
        enabled:hover:bg-zinc-900 enabled:hover:border-zinc-800 rounded-xl
        transition-colors duration-300 ease-in-out cursor-pointer disabled:cursor-not-allowed group'
		>
			{notifications.length > 0 && (
				<div class='flex justify-end relative'>
					<div class='fixed w-1.5 h-1.5 bg-red-500 rounded-full' />
				</div>
			)}
			<BellIcon
				class='w-5 h-5
          fill-zinc-300 group-disabled:fill-zinc-500/80
          transition-colors duration-300 ease-in-out'
			/>
		</button>
	);
}
