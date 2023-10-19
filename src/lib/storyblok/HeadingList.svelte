<script lang="ts">
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { cls } from '$lib/styles';
	import { backgroundTheme } from '$lib/stores';
	import { Heading } from '$lib/components';

	export let blok: any;

	let indexStart = [6, 2, 5, 2];

	if (blok.titleFullWidth) {
		indexStart = [3, 5, 4, 5];
	}

	const containerStyle = cva('relative', {
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

	const textStyle = cva('relative', {
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
	class={cls('px-6 lg:px-0', containerStyle({ layoutDirection: blok.layoutDirection }), blok.class)}
>
	<div class={'relative grid grid-cols-12 mb-32' + (blok.titleFullWidth ? '' : 'lg:absolute')}>
		<Heading
			as="h3"
			size="h1"
			class={'col-span-10 col-start-2 lg:col-start-2 ' +
				(blok.titleFullWidth ? 'lg:col-span-8' : 'lg:col-span-4')}>{blok.heading}</Heading
		>
	</div>

	<dl
		class={'grid grid-cols-12 gap-0 lg:gap-24' + (blok.titleFullWidth ? ' title-full-width' : '')}
	>
		{#each blok.list as b, index}
			<div class={cls('col-start-2 lg:col-start-3 col-span-7 lg:col-span-4, mt-16')}>
				<div
					class={cls(
						'flex justify-start',
						containerStyle({ layoutDirection: blok.layoutDirection }),
						textStyle({ theme: $backgroundTheme })
					)}
				>
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
