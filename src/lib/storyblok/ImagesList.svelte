<script lang="ts">
	import { fade } from 'svelte/transition';
	import { inview } from 'svelte-inview';
	import { onDestroy } from 'svelte';
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { ScrollTrigger } from '$lib/gsap';
	import { cls } from '$lib/styles';
	import { backgroundTheme } from '$lib/stores';
	import { getImageDimensionsFromUrl } from '$lib/storyblok/utils';
	import { useTransitionReady } from '$lib/utils/useTransitionReady';
	import { inViewColorTransition } from '$lib/utils/animations';
	import { lazyLoad } from '$lib/utils/lazyLoad';

	export let blok: any;

let el!: HTMLElement;
let pinEl!: HTMLElement;
let contentEl!: HTMLElement;

let scrollTrigger: ScrollTrigger | null = null;

	const textStyle = cva('flex flex-col duration-1000 ease-out', {
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

	useTransitionReady(() => {
		if (contentEl && pinEl && !scrollTrigger) {
			scrollTrigger = ScrollTrigger.create({
				trigger: el,
				start: '-50px top',
				end: () => `+=${contentEl.offsetHeight - pinEl.offsetHeight - 160}`,
				pin: pinEl,
				invalidateOnRefresh: true
			});
		}
	});

onDestroy(() => {
	scrollTrigger?.kill?.();
	scrollTrigger = null;
});
</script>

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	use:inview
	on:inview_change={inViewColorTransition}
	class={cls(blok.class, textStyle({ theme: $backgroundTheme }), blok.disabled && 'hidden')}
>
	<div class="relative mt-32 grid grid-cols-12" bind:this={el}>
		{#if blok.asset.filename?.length > 0}
			<img
				bind:this={pinEl}
				use:lazyLoad={`${blok.asset.filename}/m/`}
				width={getImageDimensionsFromUrl(blok.asset.filename).width}
				height={getImageDimensionsFromUrl(blok.asset.filename).height}
				alt={blok.asset.name}
				class="-translate-x-1/8 absolute left-1/2 top-0 col-span-12 translate-y-1/4 -rotate-45 scale-150 transform"
				loading="lazy"
				decoding="async"
				in:fade={{ duration: 500 }}
			/>
		{/if}
		<div
			class="col-span-12 col-start-1 mx-4 my-32 md:col-span-10 md:col-start-2 md:mx-0 lg:col-span-8 lg:col-start-4"
			bind:this={contentEl}
		>
			<div class=" flex flex-col gap-64">
				{#each blok.list as b}
					<StoryblokComponent blok={b} />
				{/each}
			</div>
		</div>
	</div>
</div>
