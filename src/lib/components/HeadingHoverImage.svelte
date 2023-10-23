<script lang="ts">
	import { spring } from 'svelte/motion';
	import { fade } from 'svelte/transition';
	import { onDestroy } from 'svelte';

	import { heading_hover_media } from '$lib/stores';

	const mouseCoords = spring({ x: 0, y: 0 }, { damping: 0.2, stiffness: 0.01 });

	const onMouseMove = (event: any) => {
		$mouseCoords = { x: event.x, y: event.y };
	};

	let image_src = '';

	const unsubscribe = heading_hover_media.subscribe((value: any) => {
		if (value) image_src = value.filename;
	});

	onDestroy(unsubscribe);
</script>

<svelte:window on:mousemove={onMouseMove} />

<div class="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center">
	<div
		class="cursor absolute left-0 top-0 h-96 w-96 overflow-hidden"
		style:--x={`${$mouseCoords.x}px`}
		style:--y={`${$mouseCoords.y}px`}
	>
		{#if image_src}
			<img
				src={image_src}
				class="img inline h-full w-auto origin-center rounded-full object-cover"
				width="auto"
				height="500px"
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
		transform: scale(var(--scale, --scale));
		transition: transform 0.4s;
	}
</style>
