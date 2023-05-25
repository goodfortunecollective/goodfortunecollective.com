/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'degular-display': ['degular-display', 'cursive'],
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

