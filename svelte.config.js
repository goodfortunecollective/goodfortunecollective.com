import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			'@storyblok/svelte': './node_modules/@storyblok/svelte'
		},
		paths: {
			base: ''
		}
	},

	onwarn: (warning, handler) => {
		if (warning.code === 'a11y-click-events-have-key-events') return
		handler(warning)
	  },
};

export default config;
