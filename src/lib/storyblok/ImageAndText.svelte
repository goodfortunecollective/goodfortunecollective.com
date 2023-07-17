<script lang="ts">
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	export let blok: any;

	const variants = cva('flex flex-col gap-8', {
		variants: {
			layoutDirection: {
				left: 'md:flex-row',
				right: 'md:flex-row-reverse'
			}
		},
		defaultVariants: {
			layoutDirection: 'left'
		}
	});
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<div class={variants({ layoutDirection: blok.layoutDirection })}>
		<div class="flex md:w-1/2">
			<figure>
				<img src={blok.image.filename} alt={blok.id} />
			</figure>
		</div>
		<div class="flex flex-col md:w-1/2 md:justify-center px-6 xl:px-0">
			{#each blok.content as b}
				<StoryblokComponent blok={b} />
			{/each}
		</div>
	</div>
</div>
