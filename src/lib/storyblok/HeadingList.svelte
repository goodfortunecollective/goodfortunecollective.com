<script lang="ts">
	import { StoryblokComponent, storyblokEditable } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';
	import { inview } from 'svelte-inview';

	import { backgroundTheme } from '$lib/stores';
	import { cls } from '$lib/styles';
	import { inViewColorTransition } from '$lib/utils/animations';

	export let blok: any;

	const variants = cva('duration-1000 ease-out', {
		variants: {
			theme: {
				light: '',
				dark: 'text-white'
			}
		},
		defaultVariants: {
			theme: 'light'
		}
	});
</script>

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	use:inview
	on:inview_change={inViewColorTransition}
	class={cls(variants({ theme: $backgroundTheme }), blok.class)}
>
	<dl class="flex flex-col gap-24 lg:gap-32">
		{#each blok.list as b, index}
			<StoryblokComponent blok={b} {index} />
		{/each}
	</dl>
</div>
