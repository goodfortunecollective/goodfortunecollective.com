import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const path = fileURLToPath(new URL('package.json', import.meta.url));
const pkg = JSON.parse(readFileSync(path, 'utf8'));

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
		},
		version: {
			name: pkg.version
		}
	},

	onwarn: (warning, handler) => {
		if (warning.code === 'a11y-click-events-have-key-events') return;
		handler(warning);
	}
};

export default config;
