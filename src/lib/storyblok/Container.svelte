<script lang="ts">
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { cls } from '$lib/styles';

	export let blok: any;

	const variants = cva('', {
		variants: {
			palette: {
				transparent: '',
				'#1a1a1a': 'text-white',
				'#bec6c4': ''
			}
		},
		defaultVariants: {
			palette: 'transparent'
		}
	});
</script>

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	class={cls(
		variants({ palette: blok.palette.value }),
		blok.class + (blok.text_white ? ' text-white' : '')
	)}
	style={(blok.palette.value ? `background-color:${blok.palette.value};` : '') +
		(blok.customBackgroundColor.color
			? `background-color:${blok.customBackgroundColor.color};`
			: '')}
>
	{#each blok.children as b}
		<StoryblokComponent blok={b} />
	{/each}
</div>
