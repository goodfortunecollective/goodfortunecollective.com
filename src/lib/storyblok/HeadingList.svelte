<script lang="ts">
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { cls } from '$lib/styles';
	import { backgroundTheme } from '$lib/stores';

	export let blok: any;

	const variants = cva('transition-colors duration-1000 ease-out', {
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
	class={cls(variants({ theme: $backgroundTheme }), blok.class)}
>
	<dl class="flex flex-col gap-24 lg:gap-32">
		{#each blok.list as b, index}
			<StoryblokComponent blok={b} {index} />
		{/each}
	</dl>
</div>
