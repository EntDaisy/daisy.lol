import type { EvaProps } from '$icons';

export function MoreIcon(props: EvaProps) {
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
			<title>더보기 아이콘</title>
			<circle cx='12' cy='12' r='2' />
			<circle cx='19' cy='12' r='2' />
			<circle cx='5' cy='12' r='2' />
		</svg>
	);
}
