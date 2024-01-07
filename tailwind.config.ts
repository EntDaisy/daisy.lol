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
			keyframes: {
				fadeScaleIn: {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' },
				},
				fadeScaleOut: {
					'0%': { opacity: '1', transform: 'scale(1)' },
					'100%': { opacity: '0', transform: 'scale(0.95)' },
				},
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				fadeOut: {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' },
				},
				scaleIn: {
					'0%': { transform: 'scale(0.95)' },
					'100%': { transform: 'scale(1)' },
				},
				scaleOut: {
					'0%': { transform: 'scale(1)' },
					'100%': { transform: 'scale(0.95)' },
				},
			},
			animation: {
				fadeScaleIn: 'fadeScaleIn 0.3s ease-in-out',
				fadeScaleOut: 'fadeScaleOut 0.3s ease-in-out',
				fadeIn: 'fadeIn 0.3s ease-in-out',
				fadeOut: 'fadeOut 0.3s ease-in-out',
				scaleIn: 'scaleIn 0.3s ease-in-out',
				scaleOut: 'scaleOut 0.3s ease-in-out',
			},
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
