<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';
	import { spring } from 'svelte/motion';
	import { onDestroy } from 'svelte';
	import { cva } from 'class-variance-authority';

	import gsap from '$lib/gsap';
	import { cls } from '$lib/styles';
	import { heading_hover_media } from '$lib/stores';

	export let blok: any;

	let imageEl!: HTMLElement;
	let image_src = '';

	const variants = cva('w-full font-degular-display', {
		variants: {
			size: {
				sm: 'h-16 w-16',
				md: 'h-32 w-32',
				lg: 'h-64 w-64',
				xl: 'h-96 w-96'
			}
		},
		defaultVariants: {
			size: 'lg'
		}
	});

	const mouseCoords = spring({ x: 0, y: 0 }, { damping: 0.1, stiffness: 0.01 });

	const onMouseMove = (event: any) => {
		$mouseCoords = { x: event.x, y: event.y };
	};

	const unsubscribe = heading_hover_media.subscribe((value: any) => {
		if (!imageEl) return;

		if (value) {
			image_src = value;

			gsap.to(imageEl, {
				clipPath: 'circle(100%)',
				opacity: 1,
				duration: 0.3,
				ease: 'css-ease.out',
				overwrite: true
			});
		} else {
			gsap.to(imageEl, {
				clipPath: 'circle(0%)',
				duration: 0.3,
				opacity: 0.2,
				ease: 'css-ease.in',
				overwrite: true
			});
		}
	});

	onDestroy(() => {
		unsubscribe();
	});
</script>

<svelte:window on:mousemove={onMouseMove} />

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	class="fixed bottom-0 left-0 right-0 top-0 -z-1 flex items-center justify-center"
>
	<div
		class={cls('absolute left-0 top-0 overflow-hidden', variants({ size: blok.size }), 'cursor')}
		style:--x={`${$mouseCoords.x}px`}
		style:--y={`${$mouseCoords.y}px`}
	>
		<img
			bind:this={imageEl}
			src={image_src}
			class="inline h-full w-auto origin-center rounded-full object-cover"
			width="auto"
			height="100%"
			alt=""
			decoding="async"
		/>
	</div>
</div>

<style lang="scss">
	.cursor {
		transform: translate(-50%, -50%) translate(var(--x, 0px), var(--y, 0px));
	}
</style>
