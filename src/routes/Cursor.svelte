<script lang="ts">
	import { spring } from 'svelte/motion';
	import { cva } from 'class-variance-authority';

	import { cls } from '$lib/styles';
	import { cursorType } from '$lib/stores';

	const variants = cva('', {
		variants: {
			type: {
				none: '',
				play: 'cursor-pointer ml-0.5 inline-block h-0 w-0 border-y-[7px] border-l-[12px] border-solid border-y-transparent border-l-black content-[""]',
				pause: 'cursor-pointer h-[18px] w-2.5 border-x-2 border-solid border-x-black content-[""]'
			}
		},
		defaultVariants: {
			type: 'none'
		}
	});

	const mouseCoords = spring({ x: 0, y: 0 });

	let type: 'none' | 'play' | 'pause' = 'none';
	let opacity: number = 0;

	cursorType.subscribe((value) => {
		if (value !== 'none') {
			type = value;
		}

		opacity = value === 'none' ? 0 : 1;
	});

	const onMouseMove = (event: MouseEvent) => {
		$mouseCoords = { x: event.x, y: event.y };
	};
</script>

<svelte:window on:mousemove={onMouseMove} />

<div class="pointer-events-none fixed left-0 top-0 z-10 h-full w-full">
	<div
		class={cls(
			'absolute flex h-[86px] w-[86px] items-center justify-center rounded-[100%] bg-[#dbfa45]',
			'cursor'
		)}
		style:--x={`${$mouseCoords.x}px`}
		style:--y={`${$mouseCoords.y}px`}
		style:--opacity={opacity}
	>
		<div class={cls(variants({ type: type }))} />
	</div>
</div>

<style>
	.cursor {
		transition:
			0.3s opacity ease-out,
			0s visibility 0.3s,
			0s z-index 0.3s;
		opacity: var(--opacity);
		transform: translate(-50%, -50%) translate(var(--x, 0px), var(--y, 0px));
	}
</style>
