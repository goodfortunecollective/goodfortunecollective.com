<script lang="ts">
	import { renderRichText, storyblokEditable, StoryblokComponent } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { Heading } from '$lib/components';
	import { cls } from '$lib/styles';
	import { backgroundTheme } from '$lib/stores';
	import TextTransition from '$lib/components/TextTransition.svelte';

	export let blok: any;

	const headingStyle = cva('flex-1 lg:leading-extra-tight leading-extra-tight', {
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

	const textStyle = cva('', {
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

	$: content = renderRichText(blok.content);
</script>

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	class={cls(blok.class, textStyle({ theme: $backgroundTheme }))}
>
	<div class="grid grid-cols-12 gap-8 pt-8 lg:gap-0 lg:pt-[8.33vw]">
		<div class="col-span-10 col-start-2">
			<div class="flex h-full flex-col">
				<Heading
					as="h1"
					size="h1"
					class={headingStyle({ theme: $backgroundTheme, maxWidth: blok.maxWidth })}
					>{blok.title}
				</Heading>
			</div>
		</div>
		{#if blok.children.length}
			<div class="col-span-10 col-start-2 lg:col-span-2 lg:col-start-2 lg:pt-12">
				{#each blok.children as b}
					<StoryblokComponent blok={b} />
				{/each}
			</div>
		{/if}
		<div class="col-span-10 col-start-2 lg:col-span-6 lg:col-start-5">
			<div
				class="max-w-screen-xl text-xl leading-9 lg:pt-12 xl:text-2xl 4xl:text-4xl 4xl:leading-loose"
				{...$$restProps}
			>
				<TextTransition>{@html content}</TextTransition>
			</div>
		</div>
	</div>
</div>
