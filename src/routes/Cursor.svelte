<script lang="ts">
	import { browser } from '$app/environment';
	import { spring } from 'svelte/motion';
	import { cva } from 'class-variance-authority';

	import gsap from '$lib/gsap';
	import { cls } from '$lib/styles';
	import { cursorType } from '$lib/stores';

	const backgroundVariants = cva('', {
		variants: {
			type: {
				none: '',
				play: 'bg-yellow-350',
				pause: 'bg-yellow-350',
				checkout: 'border-yellow-350 border-solid border'
			}
		},
		defaultVariants: {
			type: 'none'
		}
	});

	const variants = cva('origin-center transform', {
		variants: {
			type: {
				none: '',
				play: 'cursor-pointer ml-0.5 inline-block h-0 w-0 border-y-[7px] border-l-[12px] border-solid border-y-transparent border-l-black content-[""]',
				pause: 'cursor-pointer h-[18px] w-2.5 border-x-2 border-solid border-x-black content-[""]',
				checkout: 'cursor-pointer'
			}
		},
		defaultVariants: {
			type: 'none'
		}
	});

	$: isTouchDevice = browser && 'ontouchstart' in window;

	let el!: HTMLElement;

	const mouseCoords = spring({ x: 0, y: 0 }, { damping: 0.77, stiffness: 0.25 });

	let type: 'none' | 'play' | 'pause' | 'checkout' = 'none';
	let opacity: number = 0;

	cursorType.subscribe((value) => {
		if (isTouchDevice) return;

		if (value !== 'none') {
			type = value;
		}

		opacity = value === 'none' ? 0 : 1;

		if (el) {
			gsap.to(el, {
				scale: value === 'none' ? 0 : 1,
				delay: value === 'none' ? 0 : 0.1,
				duration: value === 'none' ? 0 : 0.5,
				ease: 'power.out'
			});
		}
	});

	const onMouseMove = (event: MouseEvent) => {
		$mouseCoords = { x: event.x, y: event.y };
	};
</script>

<svelte:window on:mousemove={onMouseMove} />

<div
	class="pointer-events-none fixed left-0 top-0 z-10 h-full w-full origin-center transform"
	bind:this={el}
>
	<div
		class={cls(
			'absolute flex h-[86px] w-[86px] origin-center items-center justify-center rounded-[100%]',
			backgroundVariants({ type: type }),
			'c-cursor'
		)}
		style:--x={`${$mouseCoords.x}px`}
		style:--y={`${$mouseCoords.y}px`}
		style:--opacity={opacity}
	>
		<div class={cls(variants({ type: type }))} />
	</div>
</div>

<style>
	.c-cursor {
		transition:
			0.3s opacity ease-out,
			0s visibility 0.3s,
			0s z-index 0.3s;
		opacity: var(--opacity);
		transform: translate(-50%, -50%) translate(var(--x, 0px), var(--y, 0px));
	}
</style>
