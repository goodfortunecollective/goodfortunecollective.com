<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';

	import { cls } from '$lib/styles';
	import { gsap } from 'gsap';
	import { useTransitionReady } from '$lib/utils/useTransitionReady';
	import { Video } from '$lib/components';

	export let blok: any;
	let element: HTMLElement;
	let ctx: any = null;

	useTransitionReady(
		() => {
			ctx = gsap.context(() => {
				gsap.to(element, {
					yPercent: blok.speed,
					ease: 'none',
					scrollTrigger: {
						trigger: element,
						start: 'top center',
						scrub: true
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
	<div
		bind:this={element}
		class={cls('flex h-full w-full origin-center', 'blok-media-parallax-video')}
		style="--parallax-scale: {blok.scale || 1}; --parallax-positionX: {blok.positionX ||
			0}; --parallax-positionY: {blok.positionY || 0};"
	>
		<Video videoUrl={blok.video} autoplay muted loop animated={false} />
	</div>
</div>

<style lang="scss">
	.blok-media-parallax-video {
		transform: translate(calc(var(--parallax-positionX) * 1%), calc(var(--parallax-positionY) * 1%))
			scale(var(--parallax-scale));
	}
</style>
