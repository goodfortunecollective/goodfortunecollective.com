<script lang="ts">
	import { inview } from 'svelte-inview';
	import { renderRichText, storyblokEditable, StoryblokComponent } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { Heading, RichtextTransition } from '$lib/components';
	import { cls } from '$lib/styles';
	import { backgroundTheme } from '$lib/stores';
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
		class="col-span-12 col-start-1 mx-4 mt-16 flex flex-col flex-wrap items-center justify-center gap-16 md:col-span-10 md:col-start-2 md:mx-0 lg:flex-row lg:gap-32 2xl:col-span-8 2xl:col-start-3"
	>
		{#each blok.children as b}
			<StoryblokComponent blok={b} />
		{/each}
	</div>
</div>
