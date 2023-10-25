<script lang="ts">
	import gsap from '$lib/gsap';
	import { onMount } from 'svelte';

	import { lenis } from '$lib/stores';
	import { lerp } from '$lib/utils/maths';

	export let cursorType: string | undefined;
	export let isHidden: boolean = true;
	export let bgColor: string | undefined;
	let cursorEl!: HTMLElement;
	$: touchCapability = 2 as number;

	const currentPosition = {
		x: 0 as number,
		y: 0 as number
	};

	$: lerpedPosition = {
		x: 0 as number,
		y: 0 as number
	};

	const onPointerMove = (e) => {
		if (touchCapability === 1) return;

		currentPosition.x = e.clientX;
		currentPosition.y = e.clientY + ($lenis ? $lenis.animatedScroll : 0);
	};

	const onRender = () => {
		if (touchCapability === 1) return;

		lerpedPosition.x = lerp(lerpedPosition.x, currentPosition.x);
		lerpedPosition.y = lerp(lerpedPosition.y, currentPosition.y);
	};

	onMount(() => {
		// 0 - no touch (pointer/mouse only)
		// 1 - touch-only device (like a phone)
		// 2 - device can accept touch input and mouse/pointer (like Windows tablets)
		touchCapability =
			window.matchMedia && window.matchMedia('(hover: none), (pointer: coarse)').matches
				? 1
				: 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
				? 2
				: 0;

		window.addEventListener('mousemove', onPointerMove);
		gsap.ticker.add(onRender);

		return () => {
			window.removeEventListener('mousemove', onPointerMove);
			gsap.ticker.remove(onRender);
		};
	});
</script>

<div class={'CustomCursor' + (isHidden || touchCapability === 1 ? ' is-hidden' : '')}>
	<div
		class={'CustomCursor-inner' + (cursorType ? ` is-${cursorType}` : '')}
		style={'--cursor-x: ' +
			lerpedPosition.x +
			'px; --cursor-y: ' +
			lerpedPosition.y +
			'px;' +
			(bgColor ? 'background-color:' + bgColor + ';' : '')}
		bind:this={cursorEl}
	/>
</div>

<style lang="scss">
	@import '../../vars.scss';

	.CustomCursor {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		overflow: visible;
		z-index: 999;
		pointer-events: none;
		transition:
			0.5s opacity ease-out,
			0s visibility 0.5s,
			0s z-index 0.5s;

		&-inner {
			position: absolute;
			display: flex;
			align-items: center;
			justify-content: center;
			top: var(--cursor-y);
			left: var(--cursor-x);
			// top: 50%;
			// left: 50%;
			width: 86px;
			height: 86px;
			background: $black;
			border-radius: 100%;
			transform: translate(-50%, -50%);
			cursor: pointer;
			z-index: 13;

			// play
			&.is-play:before {
				display: inline-block;
				width: 0;
				height: 0;
				border-top: 7px solid transparent;
				border-bottom: 7px solid transparent;
				border-left: 12px solid $white;
				margin-left: 2px;
				content: '';
			}

			// pause
			&.is-pause:before {
				position: absolute;
				width: 10px;
				height: 18px;
				border-right: 2px solid $white;
				border-left: 2px solid $white;
				content: '';
			}

			// horizontal drag
			&.is-horizontal-drag:before {
				position: absolute;
				color: $white;
				font-size: 1.25rem;
				left: 15px;
				top: 50%;
				transform: translate3d(0, -50%, 0);
				content: '˂';
			}

			&.is-horizontal-drag:after {
				position: absolute;
				color: $white;
				font-size: 1.25rem;
				right: 15px;
				top: 50%;
				transform: translate3d(0, -50%, 0);
				content: '˃';
			}

			// vertical drag
			&.is-vertical-drag:before {
				position: absolute;
				color: $white;
				font-size: 1.25rem;
				top: 15px;
				left: 50%;
				transform: translate3d(-50%, 0, 0);
				content: '˄';
			}

			&.is-vertical-drag:after {
				position: absolute;
				color: $white;
				font-size: 1.25rem;
				bottom: 15px;
				left: 50%;
				transform: translate3d(-50%, 0, 0);
				content: '˅';
			}
		}

		&.is-hidden {
			opacity: 0;
		}
	}
</style>
