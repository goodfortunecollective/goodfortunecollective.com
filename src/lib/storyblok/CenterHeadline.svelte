<script lang="ts">
	import { renderRichText, StoryblokComponent, storyblokEditable } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';
	import { inview } from 'svelte-inview';

	import { Heading, RichtextTransition } from '$lib/components';
	import { backgroundTheme } from '$lib/stores';
	import { cls } from '$lib/styles';
	import { inViewColorTransition } from '$lib/utils/animations';

	export let blok: any;

	$: content = renderRichText(blok.content);

	const variants = cva('grid grid-cols-12 text-center duration-1000 ease-out', {
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

	const variantsChildren = cva('', {
		variants: {
			gap: {
				small: 'mt-4',
				base: ' mt-16'
			}
		},
		defaultVariants: {
			gap: 'base'
		}
	});
</script>

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	use:inview
	on:inview_change={inViewColorTransition}
	class={cls(variants({ theme: $backgroundTheme }), blok.class)}
>
	<div
		class="col-span-12 col-start-1 mx-4 md:col-span-10 md:col-start-2 md:mx-0 2xl:col-span-8 2xl:col-start-3"
	>
		<Heading as="h3" size="h2" leading="tightest">{blok.title}</Heading>
	</div>
	<div
		class="col-span-12 col-start-1 mx-4 my-8 text-center md:col-span-10 md:col-start-2 md:mx-0 lg:col-span-6 lg:col-start-4"
	>
		<RichtextTransition class="text-xl xl:text-2xl [&_p]:my-4 [&_p]:leading-snug">
			{@html content}
		</RichtextTransition>
	</div>
	<div
		class={cls(
			'col-span-12 col-start-1 mx-4 flex flex-col flex-wrap items-center justify-center gap-16 md:col-span-10 md:col-start-2 md:mx-0 lg:flex-row lg:gap-32 2xl:col-span-8 2xl:col-start-3',
			variantsChildren({ gap: blok.gap })
		)}
	>
		{#each blok.children as b}
			<StoryblokComponent blok={b} />
		{/each}
	</div>
</div>
