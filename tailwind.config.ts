import type { Config } from 'tailwindcss';

export default ({
	content: ['src/{routes,islands,components}/**/*.{ts,tsx}'],
	theme: {
		screens: {
			'2xl': { max: '1535px' },
			xl: { max: '1279px' },
			lg: { max: '1023px' },
			md: { max: '767px' },
			sm: { max: '639px' },
		},
		fontFamily: {
			sans: [
				'"Pretendard Variable"',
				'Pretendard',
				'-apple-system',
				'BlinkMacSystemFont',
				'system-ui',
				'Roboto',
				'"Helvetica Neue"',
				'"Segoe UI"',
				'"Apple SD Gothic Neo"',
				'"Noto Sans KR"',
				'"Malgun Gothic"',
				'sans-serif',
			],
			display: [
				'Onest',
				'-apple-system',
				'BlinkMacSystemFont',
				'system-ui',
				'Roboto',
				'"Helvetica Neue"',
				'"Segoe UI"',
				'"Apple SD Gothic Neo"',
				'"Noto Sans KR"',
				'"Malgun Gothic"',
				'sans-serif',
			],
		},
		extend: {
			colors: {
				brand: {
					50: '#EBEEFF',
					100: '#DBE1FF',
					200: '#B3BFFF',
					300: '#8FA2FF',
					400: '#6B84FF',
					500: '#4262FF',
					600: '#1F44FF',
					700: '#0024D6',
					800: '#00188F',
					900: '#000C47',
					950: '#000624',
				},
			},
		},
	},
} satisfies Config);
