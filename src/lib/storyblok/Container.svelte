<script lang="ts">
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { cls } from '$lib/styles';

	export let blok: any;

	const variants = cva('', {
		variants: {
			backgroundColor: {
				transparent: '',
				black: 'bg-black text-white',
				grey: 'bg-zinc-200'
			}
		},
		defaultVariants: {
			backgroundColor: 'transparent'
		}
	});
</script>

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	class={cls(variants({ backgroundColor: blok.backgroundColor }), blok.class)}
	style={blok.style}
>
	{#each blok.children as b}
		<StoryblokComponent blok={b} />
	{/each}
</div>
