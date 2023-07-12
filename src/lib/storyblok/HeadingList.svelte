<script lang="ts">
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { cls } from '$lib/styles';
	import { Heading } from '$lib/components';

	export let blok: any;

	const variants = cva('relative max-w-6xl mx-auto px-6 xl:px-0 md:flex justify-between', {
		variants: {
			layoutDirection: {
				left: 'flex-row',
				right: 'flex-row-reverse'
			}
		},
		defaultVariants: {
			layoutDirection: 'left'
		}
	});
</script>

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	class={cls(variants({ layoutDirection: blok.layoutDirection }), blok.class)}
>
	<div class="md:w-4/12 absolute">
		<Heading as="h3" size="h2">{blok.heading}</Heading>
	</div>

	<dl class="flex flex-col md:w-7/12 gap-16 mt-16">
		{#each blok.list as item, index}
			<StoryblokComponent blok={item} {index} />
		{/each}
	</dl>
</div>
