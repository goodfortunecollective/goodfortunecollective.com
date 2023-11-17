<script lang="ts">
	import { onDestroy } from 'svelte';
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { ScrollTrigger } from '$lib/gsap';
	import { cls } from '$lib/styles';
	import { backgroundTheme } from '$lib/stores';
	import { useTransitionReady } from '$lib/utils/useTransitionReady';
	import { getImageDimensionsFromUrl } from '$lib/storyblok/utils';

	export let blok: any;

	let el!: HTMLElement;
	let pinEl!: HTMLElement;
	let contentEl!: HTMLElement;

	let scrollTrigger!: ScrollTrigger;

	const textStyle = cva('flex flex-col transition-colors duration-1000 ease-out', {
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
		if (contentEl && pinEl && !scrollTrigger)
			scrollTrigger = ScrollTrigger.create({
				trigger: el,
				start: '-50px top',
				end: () => `+=${contentEl.offsetHeight - pinEl.offsetHeight - 160}`,
				pin: pinEl,
				invalidateOnRefresh: true
			});
	});

	onDestroy(() => {
		if (scrollTrigger) {
			scrollTrigger.kill();
			scrollTrigger = null;
		}
	});
</script>

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	class={cls(blok.class, textStyle({ theme: $backgroundTheme }))}
>
	<div class="relative grid grid-cols-12" bind:this={el}>
		{#if blok.asset.filename?.length > 0}
			<img
				bind:this={pinEl}
				src={`${blok.asset.filename}/m/`}
				width={getImageDimensionsFromUrl(blok.asset.filename).width}
				height={getImageDimensionsFromUrl(blok.asset.filename).height}
				alt={blok.asset.name}
				class="-translate-x-1/8 absolute left-1/2 top-0 col-span-12 translate-y-1/4 -rotate-45 scale-150 transform"
				loading="lazy"
			/>
		{/if}
		<div class="col-span-6 col-start-3 py-32" bind:this={contentEl}>
			<div class=" flex flex-col gap-32">
				{#each blok.list as b}
					<StoryblokComponent blok={b} />
				{/each}
			</div>
		</div>
	</div>
</div>
