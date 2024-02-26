<script lang="ts">
	import { fade } from 'svelte/transition';
	import { storyblokEditable } from '@storyblok/svelte';

	import { cls } from '$lib/styles';
	import { gsap } from 'gsap';
	import { useTransitionReady } from '$lib/utils/useTransitionReady';
	import { getImageDimensionsFromUrl } from '$lib/storyblok/utils';

	export let blok: any;
	let element: HTMLElement;
	let ctx: any = null;

	useTransitionReady(
		() => {
			if (!element) return;

			ctx = gsap.context(() => {
				gsap.to(element, {
					yPercent: blok.speed,
					ease: 'none',
					scrollTrigger: {
						trigger: element,
						start: 'top center',
						scrub: true,
						invalidateOnRefresh: true
					}
				});
			}, element);
		},
		() => {
			if (ctx) ctx.revert();
		}
	);
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={cls('absolute inset-0', blok.class)}>
	{#if blok.asset.filename?.length > 0}
		<img
			bind:this={element}
			src={`${blok.asset.filename}/m/`}
			width={getImageDimensionsFromUrl(blok.asset.filename).width}
			height={getImageDimensionsFromUrl(blok.asset.filename).height}
			alt={blok.asset.name}
			loading="lazy"
			decoding="async"
			in:fade={{ duration: 500 }}
		/>
	{/if}
</div>
