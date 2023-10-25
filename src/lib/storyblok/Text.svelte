<script lang="ts">
	import { renderRichText, storyblokEditable } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { RichtextTransition } from '$lib/components';

	export let blok: any;

	$: content = renderRichText(blok.content);

	const variants = cva('', {
		variants: {
			intent: {
				default: '',
				stroke: 'text-transparent'
			}
		},
		defaultVariants: {
			intent: 'default'
		}
	});
</script>

<span use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<RichtextTransition
		enabled={blok.animated}
		class={variants({ intent: blok.strokeColor ? 'stroke' : 'default' })}
		style={blok.strokeColor ? `-webkit-text-stroke: 1px ${blok.strokeColor.color};` : ''}
	>
		{@html content}
	</RichtextTransition>
</span>
