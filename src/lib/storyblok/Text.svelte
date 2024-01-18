<script lang="ts">
	import { renderRichText, storyblokEditable } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { RichtextTransition } from '$lib/components';
	import { backgroundTheme } from '$lib/stores';

	export let blok: any;

	$: content = renderRichText(blok.content);

	const variants = cva('', {
		variants: {
			intent: {
				default: '',
				stroke: ' text-transparent'
			},
			theme: {
				light: 'text-outline-black',
				dark: 'text-outline-red-100',
				default: ''
			}
		},
		defaultVariants: {
			intent: 'default',
			theme: 'light'
		}
	});
</script>

<span use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<RichtextTransition
		enabled={blok.animated}
		class={variants({
			intent: blok.stroke ? 'stroke' : 'default',
			theme: blok.stroke ? $backgroundTheme : 'default'
		})}
	>
		{@html content}
	</RichtextTransition>
</span>
