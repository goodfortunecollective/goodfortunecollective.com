<script lang="ts">
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	export let blok: any;

	$: numColumns = blok.content.length;

	const variants = cva('col-span-20 col-start-3 grid gap-32', {
		variants: {
			columns: {
				1: 'grid-cols-1',
				2: 'grid-cols-1 lg:grid-cols-2',
				3: 'grid-cols-1 lg:grid-cols-3'
			}
		},
		defaultVariants: {
			columns: 1
		}
	});
</script>

<div use:storyblokEditable={blok} {...$$restProps} class="grid grid-cols-24 py-16">
	<div class={variants({ columns: numColumns })}>
		{#each blok.content as b}
			<StoryblokComponent blok={b} />
		{/each}
	</div>
</div>
