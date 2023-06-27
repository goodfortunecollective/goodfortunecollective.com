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
			}
		}
	},
	plugins: [require('@tailwindcss/typography')],
	safelist: []
};
