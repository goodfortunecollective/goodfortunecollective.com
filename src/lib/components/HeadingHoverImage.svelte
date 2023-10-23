<script lang="ts">
	import { spring } from 'svelte/motion';
	import { heading_hover_media } from '$lib/stores';

	const mouseCoords = spring({ x: 0, y: 0 });

	const onMouseMove = (event: any) => {
		$mouseCoords = { x: event.x, y: event.y };
	};
</script>

<svelte:window on:mousemove={onMouseMove} />

<div class="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center">
	<div class="cursor" style:--x={`${$mouseCoords.x}px`} style:--y={`${$mouseCoords.y}px`}>
		{#if $heading_hover_media}
			<img
				src={$heading_hover_media.filename}
				width="auto"
				height="500px"
				alt={$heading_hover_media.name}
				class="inline h-full w-auto object-cover"
			/>
		{/if}
	</div>
</div>

<style lang="scss">
	.cursor {
		position: absolute;
		top: 0;
		left: 0;
		width: 360px;
		height: 360px;
		overflow: hidden;
		border-radius: 50%;
		transform: translate(-50%, -50%) translate(var(--x, 0px), var(--y, 0px));
	}
</style>
