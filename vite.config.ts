import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

import tailwindcss from '@tailwindcss/vite';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
	server: { host: true },
	plugins: [mkcert(), tailwindcss(), sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
