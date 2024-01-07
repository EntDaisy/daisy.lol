import type { EvaProps } from '$icons';

export function PersonIcon(props: EvaProps) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='currentColor'
			stroke='none'
			stroke-width='2'
			stroke-linecap='round'
			stroke-linejoin='round'
			{...props}
		>
			<title>사람 아이콘</title>
			<path d='M12 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4z' />
			<path d='M18 21a1 1 0 0 0 1-1 7 7 0 0 0-14 0 1 1 0 0 0 1 1z' />
		</svg>
	);
}
