<script lang="ts">
	import { fade } from 'svelte/transition';
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';
	import { inview } from 'svelte-inview';

	import { cls } from '$lib/styles';
	import { backgroundTheme } from '$lib/stores';
	import { Video } from '$lib/components';
	import { getImageDimensionsFromUrl } from '$lib/storyblok/utils';
	import { inViewColorTransition } from '$lib/utils/animations';
	import { lazyLoad } from '$lib/utils/lazyLoad';

	export let blok: any;

	const variants = cva(
		'col-span-12 col-start-1 mx-4 flex flex-col gap-16 md:col-span-10 md:col-start-2 md:mx-0 2xl:col-start-3 2xl:col-span-8 lg:gap-32 duration-1000 ease-out',
		{
			variants: {
				layoutDirection: {
					left: 'md:flex-row',
					right: 'md:flex-row-reverse'
				},
				theme: {
					light: '',
					dark: 'text-white'
				}
			},
			defaultVariants: {
				layoutDirection: 'left',
				theme: 'light'
			}
		}
	);
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={cls('grid grid-cols-12', blok.class)}>
	<div
		use:inview
		on:inview_change={inViewColorTransition}
		class={variants({ layoutDirection: blok.layoutDirection, theme: $backgroundTheme })}
	>
		<div class="flex md:w-1/2">
			{#if blok.image && !blok.video}
				<figure>
					{#if blok.image.filename?.length > 0}
						<img
							use:lazyLoad={`${blok.image.filename}/m/`}
							width={getImageDimensionsFromUrl(blok.image.filename).width}
							height={getImageDimensionsFromUrl(blok.image.filename).height}
							alt={blok.image.name}
							loading="lazy"
							decoding="async"
							in:fade={{ duration: 500 }}
						/>
					{/if}
				</figure>
			{/if}
			{#if blok.video}
				<Video videoUrl={blok.video} autoplay muted loop animated={false} />
			{/if}
		</div>
		<div
			class="flex flex-col text-xl md:w-1/2 md:justify-center xl:text-2xl 4xl:text-4xl [&_p]:my-4 [&_p]:leading-snug"
		>
			{#each blok.content as b}
				<StoryblokComponent blok={b} />
			{/each}
		</div>
	</div>
</div>
