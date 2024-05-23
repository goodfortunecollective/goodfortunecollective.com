/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			animation: {
				'spin-slow': 'spin 20s linear infinite'},
			aspectRatio: {
				'9/16': '9/16',
			  },
			colors: {
				neutral: {
					950: '#1a1a1a',
				},
				yellow: {
					50: '#dbd5bf',
					350: '#dbfa45',
				},
				rose: {
					50: "#e9bdb2"
				},
				stone: {
					350: "#bec6c4",
					450: "#a7a89a"
				}
			},
			scale: {
				'175': '1.75',
			},
			screens: {
				'base': '780px',
				'basexl': '998px',
				'3xl': '1920px',
				'4xl': '2160px'
			},
			maxWidth: {
				'8xl': '88rem',
				'9xl': '96rem',
				'10xl': '104rem',
				'11xl': '112rem',
				'12xl': '120rem'
			},
			fontFamily: {
				'degular-display': ['degular-display', 'cursive'],
				'tenon': ['tenon', 'cursive']
			},
			fontSize: {
				'10xl': '10rem',
				'12xl': '12rem'
			},
			lineHeight: {
				'tightest': '0.5',
				'extra-tight': '0.8'
			},
			gridTemplateColumns: {
				// Simple 24 column grid
				24: 'repeat(24, minmax(0, 1fr))'
			},
			gridColumn: {
				'span-16': 'span 16 / span 16',
				'span-20': 'span 20 / span 20',
				'span-22': 'span 22 / span 22'
			},
			gridColumnStart: {
				13: '13',
				14: '14',
				15: '15',
				16: '16',
				17: '17',
				18: '18',
				19: '19',
				20: '20',
				21: '21',
				22: '22',
				23: '23'
			},
			letterSpacing: {
				tightest: '-.075em',
				tighter: '-.05em',
				tight: '-.025em',
				normal: '0',
				wide: '.025em',
				wider: '.05em',
				widest: '.15em'
			},
			height: {
				'112': '28rem',
				'128': '32rem',
				'160': '40rem',
				'192': '48rem',
				'224': '56rem',
				'256': '64rem'
			},
			zIndex: {
				'1': '1',
			}
		}
	},
	plugins: [require('@tailwindcss/typography')],
	safelist: ['mt-8', 'mt-16','mt-24','mt-32', 'mb-8', 'mb-16','mb-24','mb-32']
};
