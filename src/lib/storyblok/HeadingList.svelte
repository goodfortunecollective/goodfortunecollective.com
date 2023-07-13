<script lang="ts">
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { cls } from '$lib/styles';
	import { Heading } from '$lib/components';

	export let blok: any;

	const variants = cva('relative', {
		variants: {
			layoutDirection: {
				left: 'flex-row',
				right: 'flex-row-reverse'
			},
			columnIndex: {
				'0': 'md:w-5/12',
				'1': '',
				'2': 'md:w-4/12',
				'3': 'md:w-1/12'
			}
		},
		defaultVariants: {
			layoutDirection: 'left'
		}
	});

	const getColumnIndex = (index: number) => (index % 4).toString() as '0' | '1' | '2' | '3';
</script>

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	class={cls(
		'max-w-6xl mx-auto px-6 xl:px-0 md:flex justify-between',
		variants({ layoutDirection: blok.layoutDirection }),
		blok.class
	)}
>
	<div class="md:w-4/12 absolute">
		<Heading as="h3" size="h2">{blok.heading}</Heading>
	</div>

	<dl class="flex flex-col gap-24 mt-16">
		{#each blok.list as b, index}
			<div class={cls('flex justify-start', variants({ layoutDirection: blok.layoutDirection }))}>
				<div class={cls(variants({ columnIndex: getColumnIndex(index) }))} />
				<div class="md:w-7/12">
					<StoryblokComponent blok={b} {index} />
				</div>
			</div>
		{/each}
	</dl>
</div>
