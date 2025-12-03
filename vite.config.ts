import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import type { PluginOption } from 'vite';

import tailwindcss from '@tailwindcss/vite';
import mkcert from 'vite-plugin-mkcert';

const useMkcert = process.env.CI !== 'true';

const plugins: PluginOption[] = [tailwindcss(), sveltekit()];

if (useMkcert) {
	plugins.unshift(mkcert());
}

export default defineConfig({
	server: { host: true },
	plugins,
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
