<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { Heading } from '$lib/components';
	import { cls } from '$lib/styles';
	import { backgroundTheme } from '$lib/stores';

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
