<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { Heading } from '$lib/components';
	import { backgroundTheme } from '$lib/stores';
	import { cls } from '$lib/styles';

	export let blok: any;

	const headingStyle = cva('duration-1000 ease-out', {
		variants: {
			theme: {
				light: '',
				dark: 'text-yellow-50'
			}
		},
		defaultVariants: {
			theme: 'light'
		}
	});
</script>

<div use:storyblokEditable={blok}>
	<Heading
		{...$$restProps}
		as={blok.as}
		size={blok.size}
		leading={blok.leading}
		class={cls(blok.autoTheme && headingStyle({ theme: $backgroundTheme }), blok.class)}
		animated={blok.animated}>{blok.text}</Heading
	>
</div>
