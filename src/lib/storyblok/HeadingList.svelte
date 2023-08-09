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
				'0': 'col-span-5 col-start-6',
				'1': 'col-span-5 col-start-2',
				'2': 'col-span-5 col-start-5',
				'3': 'col-span-5 col-start-2'
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
	class={cls('g px-6 xl:px-0', variants({ layoutDirection: blok.layoutDirection }), blok.class)}
>
	<div class="grid grid-cols-12 lg:absolute">
		<Heading as="h3" size="h2" class="col-span-4 col-start-2">{blok.heading}</Heading>
	</div>

	<dl class="grid grid-cols-12 gap-24">
		{#each blok.list as b, index}
			<div class={cls('min-w-[500px] mt-16', variants({ columnIndex: getColumnIndex(index) }))}>
				<div class={cls('flex justify-start', variants({ layoutDirection: blok.layoutDirection }))}>
					<StoryblokComponent blok={b} {index} />
				</div>
			</div>
		{/each}
	</dl>
</div>
