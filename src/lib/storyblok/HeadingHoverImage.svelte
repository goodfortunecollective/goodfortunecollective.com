<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';
	import { spring } from 'svelte/motion';
	import { onDestroy } from 'svelte';
	import { cva } from 'class-variance-authority';

	import { cls } from '$lib/styles';
	import { heading_hover_media } from '$lib/stores';

	export let blok: any;

	const variants = cva('w-full font-degular-display', {
		variants: {
			size: {
				sm: 'h-16 w-16',
				md: ' h-32 w-32',
				lg: ' h-64 w-64',
				xl: ' h-96 w-96'
			}
		},
		defaultVariants: {
			size: 'lg'
		}
	});

	const mouseCoords = spring({ x: 0, y: 0 }, { damping: 0.2, stiffness: 0.01 });

	const onMouseMove = (event: any) => {
		$mouseCoords = { x: event.x, y: event.y };
	};

	let image_src = '';

	const unsubscribe = heading_hover_media.subscribe((value: any) => {
		if (value) image_src = value;
	});

	onDestroy(unsubscribe);
</script>

<svelte:window on:mousemove={onMouseMove} />

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	class="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center"
>
	<div
		class={cls('cursor absolute left-0 top-0 overflow-hidden', variants({ size: blok.size }))}
		style:--x={`${$mouseCoords.x}px`}
		style:--y={`${$mouseCoords.y}px`}
	>
		{#if image_src}
			<img
				src={image_src}
				class="img inline h-full w-auto origin-center rounded-full object-cover transition-all duration-500 ease-out"
				width="auto"
				height="100%"
				alt=""
				style:--scale={$heading_hover_media != null ? '100%' : '0%'}
			/>
		{/if}
	</div>
</div>

<style lang="scss">
	.cursor {
		transform: translate(-50%, -50%) translate(var(--x, 0px), var(--y, 0px));
	}

	.img {
		clip-path: circle(var(--scale) at 50% 50%);
	}
</style>