<script lang="ts">
	import { renderRichText, storyblokEditable } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { cls } from '$lib/styles';
	import { backgroundTheme } from '$lib/stores';
	import { Heading } from '$lib/components';

	export let blok: any;

	$: list = renderRichText(blok.list);

	const headingStyle = cva('max-w-xl lg:leading-tightest leading-tightest', {
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

<div use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	{blok.category}
	<Heading size="h2" as="h2" class={headingStyle({ theme: $backgroundTheme })}>
		{blok.title}
	</Heading>
	<div>
		{@html list}
	</div>
</div>
