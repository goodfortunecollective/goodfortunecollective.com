<script lang="ts">
	import { StoryblokComponent, storyblokEditable } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { cls } from '$lib/styles';

	export let blok: any;

	const variants = cva('flex', {
		variants: {
			intent: {
				primary: 'gap-16 text-xl',
				secondary: 'gap-12 text-md font-bold'
			}
		},
		defaultVariants: {
			intent: 'primary'
		}
	});
</script>

<div
	use:storyblokEditable={blok}
	class={cls(variants({ intent: blok.intent }), blok.class)}
	{...$$restProps}
>
	{#each blok.links as b}
		<StoryblokComponent blok={b} />
	{/each}
</div>
