<script lang="ts">
	import { inview } from 'svelte-inview';
	import { renderRichText, storyblokEditable, StoryblokComponent } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { Heading, RichtextTransition } from '$lib/components';
	import { cls } from '$lib/styles';
	import { backgroundTheme } from '$lib/stores';
	import { inViewColorTransition } from '$lib/utils/animations';

	export let blok: any;

	const headingStyle = cva('flex-1 leading-tightest lg:leading-tightest duration-1000 ease-out', {
		variants: {
			theme: {
				light: '',
				dark: 'text-yellow-50'
			},
			maxWidth: {
				md: 'max-w-screen-md',
				lg: 'max-w-screen-lg',
				xl: 'max-w-screen-xl',
				'2xl': 'max-w-screen-2xl'
			}
		},
		defaultVariants: {
			theme: 'light',
			maxWidth: 'md'
		}
	});

	const textStyle = cva('duration-1000 ease-out', {
		variants: {
			theme: {
				light: '',
				dark: 'text-yellow-50'
			}
		},
		defaultVariants: {
			theme: 'light'
		}
	});

	const childrenStyle = cva('col-span-12 col-start-1 mx-4 md:col-span-10 md:col-start-2 md:mx-0', {
		variants: {
			align: {
				left: 'lg:col-span-2 lg:col-start-2 lg:pt-12 2xl:col-span-3 2xl:col-start-3',
				right: 'flex lg:justify-end lg:-translate-y-16 2xl:col-span-4 2xl:col-start-7'
			}
		},
		defaultVariants: {
			align: 'left'
		}
	});

	$: content = renderRichText(blok.content);
</script>

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	use:inview
	on:inview_change={inViewColorTransition}
	class={cls(blok.class, textStyle({ theme: $backgroundTheme }))}
>
	<div class="pt-18 grid grid-cols-12 gap-8 pt-32 lg:gap-0 lg:pt-[25vh]">
		<div
			class="col-span-12 col-start-1 mx-4 md:col-span-10 md:col-start-2 md:mx-0 2xl:col-span-7 2xl:col-start-3"
		>
			<div class="flex h-full flex-col">
				<Heading
					on:inview_change={inViewColorTransition}
					as="h1"
					size="h1"
					class={headingStyle({
						theme: $backgroundTheme,
						maxWidth: blok.maxWidth
					})}
				>
					{blok.title}
				</Heading>
			</div>
		</div>
		{#if blok.children.length}
			<div class={childrenStyle({ align: blok.align })}>
				{#each blok.children as b}
					<StoryblokComponent blok={b} />
				{/each}
			</div>
		{/if}
		{#if content}
			<div
				class="col-span-12 col-start-1 mx-4 md:col-span-10 md:col-start-2 md:mx-0 lg:col-span-6 lg:col-start-5 2xl:col-span-4 2xl:col-start-7"
			>
				<div
					class="max-w-screen-xl text-2xl leading-snug lg:pt-12 xl:text-3xl 4xl:text-5xl"
					{...$$restProps}
				>
					<RichtextTransition>{@html content}</RichtextTransition>
				</div>
			</div>
		{/if}
	</div>
</div>
