/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				'degular-display': ['degular-display', 'cursive']
			},
			gridTemplateColumns: {
				// Simple 24 column grid
				24: 'repeat(24, minmax(0, 1fr))'
			},
			gridColumn: {
				'span-16': 'span 16 / span 16'
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
			}
		}
	},
	plugins: [require('@tailwindcss/typography')],
	safelist: []
};
