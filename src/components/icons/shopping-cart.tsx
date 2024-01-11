import type { EvaProps } from '$icons';

export function ShoppingCartIcon(props: EvaProps) {
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
			<title>쇼핑 카트 아이콘</title>
			<path d='M21.08 7a2 2 0 0 0-1.7-1H6.58L6 3.74A1 1 0 0 0 5 3H3a1 1 0 0 0 0 2h1.24L7 15.26A1 1 0 0 0 8 16h9a1 1 0 0 0 .89-.55l3.28-6.56A2 2 0 0 0 21.08 7z' />
			<circle cx='7.5' cy='19.5' r='1.5' />
			<circle cx='17.5' cy='19.5' r='1.5' />
		</svg>
	);
}
