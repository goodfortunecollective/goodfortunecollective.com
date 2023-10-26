<script lang="ts">
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { cls } from '$lib/styles';
	import { backgroundTheme } from '$lib/stores';

	export let blok: any;

	const textStyle = cva('flex flex-col', {
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
	class={cls(blok.class, textStyle({ theme: $backgroundTheme }))}
>
	<div class="grid grid-cols-12">
		<div class="col-span-6 col-start-3 flex flex-col">
			{#each blok.list as b}
				<StoryblokComponent blok={b} />
			{/each}
		</div>
	</div>
</div>
