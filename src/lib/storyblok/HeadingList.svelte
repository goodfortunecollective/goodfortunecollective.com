<script lang="ts">
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { cls } from '$lib/styles';
	import { Heading } from '$lib/components';

	export let blok: any;

	let indexStart = [6, 2, 5, 2];

	if (blok.titleFullWidth) {
		indexStart = [3, 5, 4, 5];
	}

	const variants = cva('relative', {
		variants: {
			layoutDirection: {
				left: 'flex-row',
				right: 'flex-row-reverse'
			},
			columnIndex: {
				'0': 'col-start-2 lg:col-start-' + indexStart[0] + ' col-span-10 lg:col-span-5',
				'1': 'col-start-2 lg:col-start-' + indexStart[1] + ' col-span-10 lg:col-span-5',
				'2': 'col-start-2 lg:col-start-' + indexStart[2] + ' col-span-10 lg:col-span-5',
				'3': 'col-start-2 lg:col-start-' + indexStart[3] + ' col-span-10 lg:col-span-5'
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
	class={cls('px-6 lg:px-0', variants({ layoutDirection: blok.layoutDirection }), blok.class)}
>
	<div class={'relative grid grid-cols-12' + (blok.titleFullWidth ? '' : 'lg:absolute')}>
		<Heading
			as="h3"
			size="h2"
			class={'col-span-10 col-start-2 lg:col-start-2 ' +
				(blok.titleFullWidth ? 'lg:col-span-8' : 'lg:col-span-4')}>{blok.heading}</Heading
		>
	</div>

	<dl
		class={'grid grid-cols-12 gap-0 lg:gap-24' + (blok.titleFullWidth ? ' title-full-width' : '')}
	>
		{#each blok.list as b, index}
			<div class={cls('mt-16', variants({ columnIndex: getColumnIndex(index) }))}>
				<div class={cls('flex justify-start', variants({ layoutDirection: blok.layoutDirection }))}>
					<StoryblokComponent blok={b} {index} />
				</div>
			</div>
		{/each}
	</dl>
</div>

<style lang="scss">
	@import '../../vars.scss';

	.title-full-width :global(.text-xl) {
		@media (min-width: $media-md) {
			padding-left: 115px;
		}
	}
</style>
