<script lang="ts">
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { cls } from '$lib/styles';
	import { backgroundTheme } from '$lib/stores';

	export let blok: any;

	const variants = cva('', {
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
	class={cls(blok.class, variants({ theme: $backgroundTheme }))}
>
	<ul class="m-auto mt-16 flex-col items-center">
		{#each blok.children as b}
			<StoryblokComponent blok={b} />
		{/each}
	</ul>
</div>
