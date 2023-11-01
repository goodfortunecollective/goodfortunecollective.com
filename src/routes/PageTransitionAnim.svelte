<script lang="ts">
	import { onMount } from 'svelte';
	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';

	import gsap, { ScrollTrigger } from '$lib/gsap';

	import { cls } from '$lib/styles';
	import {
		isTransitioning,
		isTransitionDone,
		isPageHidden,
		project_list_hover,
		lenis
	} from '$lib/stores';

	import { useCurtains } from '$lib/utils/useCurtains';
	import type { CurtainsInstance } from '$lib/utils/useCurtains';
	import {
		pageLeaveDuration,
		pageEnterDuration,
		pageTransitionPauseDuration
	} from '$lib/utils/page-transitions';

	let curtains: CurtainsInstance;
	let tl: any;

	useCurtains((c) => {
		curtains = c;
	});

	let canvasEl: HTMLCanvasElement;
	let canvasDOMRect: DOMRect | null = null;
	let ctx: CanvasRenderingContext2D | null = null;
	const archStrength: number = 2;

	let titleStyles;
	let list_hover: string | null = null;

	project_list_hover.subscribe((value) => {
		list_hover = value;
	});

	const onResize = () => {
		canvasDOMRect = canvasEl.getBoundingClientRect();
		canvasEl.width = canvasDOMRect.width;
		canvasEl.height = canvasDOMRect.height;
	};

	const drawCanvas = (enteringProgress = 0, leavingProgress = 0) => {
		if (!ctx || !canvasDOMRect) return;

		ctx.save();

		ctx.clearRect(0, 0, canvasDOMRect.width, canvasDOMRect.height);

		ctx.beginPath();
		ctx.moveTo(0, canvasDOMRect.height * (1 - enteringProgress));

		// prettier-ignore
		ctx.bezierCurveTo(
			canvasDOMRect.width * 0.25, canvasDOMRect.height * Math.pow((1 - enteringProgress), archStrength),
			canvasDOMRect.width * 0.75, canvasDOMRect.height * Math.pow((1 - enteringProgress), archStrength),
			canvasDOMRect.width, canvasDOMRect.height * (1 - enteringProgress)
		)

		ctx.lineTo(canvasDOMRect.width, canvasDOMRect.height * (1 - leavingProgress));

		//ctx.lineTo(0, canvasDOMRect.height)
		ctx.bezierCurveTo(
			canvasDOMRect.width * 0.75,
			canvasDOMRect.height * Math.pow(1 - leavingProgress, 1 / (archStrength * 0.75)),
			canvasDOMRect.width * 0.25,
			canvasDOMRect.height * Math.pow(1 - leavingProgress, 1 / (archStrength * 0.75)),
			0,
			canvasDOMRect.height * (1 - leavingProgress)
		);

		ctx.lineTo(0, canvasDOMRect.height * (1 - enteringProgress));

		ctx.clip();

		ctx.fillStyle = '#dbd5bf';
		ctx.fillRect(0, 0, canvasDOMRect.width, canvasDOMRect.height);

		if (list_hover) {
			ctx.fillStyle = 'white';
			ctx.font = titleStyles
				? `${titleStyles.fontSize} ${titleStyles.fontFamily}`
				: '160px degular-display, cursive';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillText(list_hover, canvasDOMRect.width * 0.5, canvasDOMRect.height * 0.5);
		}

		ctx.restore();
	};

	onMount(() => {
		ctx = canvasEl.getContext('2d');
		onResize();
	});

	export const animateTransition = ({
		onLeavingDone = () => {},
		onEnteringDone = () => {}
	} = {}) => {
		// @ts-ignore
		if ($lenis) $lenis.stop();

		const canvasTransition = {
			enteringProgress: 0,
			leavingProgress: 0
		};

		tl = gsap.timeline();

		tl.to(canvasTransition, {
			enteringProgress: 1,
			duration: pageLeaveDuration / 1000,
			ease: 'circ.inOut',
			onStart: () => {
				if (list_hover) {
					const projectHoverEl = document.querySelector('.ProjectListHover-title');
					if (projectHoverEl) {
						titleStyles = window.getComputedStyle(projectHoverEl) as CSSStyleDeclaration;
					}
				}
			},
			onUpdate: () => {
				drawCanvas(canvasTransition.enteringProgress, canvasTransition.leavingProgress);
			},
			onComplete: () => {
				if ($lenis) {
				}

				if (curtains) {
					curtains.updateScrollValues(0, 0);
				}

				ScrollTrigger.refresh();

				onEnteringDone();
			}
		})
			.to(
				canvasTransition,
				{
					leavingProgress: 1,
					duration: pageEnterDuration / 1000,
					ease: 'circ.inOut',
					onUpdate: () => {
						drawCanvas(canvasTransition.enteringProgress, canvasTransition.leavingProgress);
					}
				},
				`+=${pageTransitionPauseDuration / 1000}`
			)
			.then(() => {
				isPageHidden.set(false);
				isTransitioning.set(false);
				isTransitionDone.set(true);

				// reset project hover
				project_list_hover.set(null);

				const hash = $page.url.hash.slice(1);

				if ($lenis) {
					$lenis.start();

					if (hash) {
						const scrollElem = document.getElementById(hash);

						if (scrollElem) {
							$lenis.scrollTo(scrollElem, {
								duration: 1
								//delay: 0.5
							});
						}
					}
				}

				onLeavingDone();
			});
	};

	beforeNavigate(async () => {
		isTransitionDone.set(false);
		isTransitioning.set(true);
		isPageHidden.set(false);

		animateTransition();
	});
</script>

<svelte:window on:resize={onResize} />

<div
	class={cls('fixed left-0 top-0 z-40 h-full w-full', !$isTransitioning && 'pointer-events-none')}
>
	<canvas bind:this={canvasEl} class="absolute h-full w-full" />
</div>

<style></style>
