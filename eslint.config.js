import unicorn from 'eslint-plugin-unicorn';

export default [
	{
		ignores: [
			'packages/create-svelte/shared/**',
			'build/**',
			'.svelte-kit/**',
			'.vercel/**',
			'node_modules/**',
			'src/lib/vendors/**'
		]
	},
	{
		files: ['**/*.{js,cjs,mjs}'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module'
		},
		plugins: {
			unicorn
		},
		rules: {
			'unicorn/prefer-node-protocol': 'error'
		}
	}
];
