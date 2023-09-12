<script lang="ts">
	import {beforeNavigate} from '$app/navigation';
	import {page} from '$app/stores';
	import {isTransitioning, isPageHidden} from '$lib/stores';
	import gsap, {ScrollSmoother} from '$lib/gsap';
	import {cls} from '$lib/styles';
	import {useCurtains} from '$lib/utils/useCurtains';
	import type {CurtainsInstance} from '../lib/utils/useCurtains';
	import {onMount} from "svelte";

	let curtains: CurtainsInstance;
	let tl: any;

	useCurtains((c) => {
		curtains = c;
	});

	let canvasEl: HTMLCanvasElement;
	let canvasDOMRect: DOMRect | null = null;
	let ctx: CanvasRenderingContext2D | null = null;
	const archStrength: number = 2

	const onResize = () => {
		canvasDOMRect = canvasEl.getBoundingClientRect()
		canvasEl.width = canvasDOMRect.width
		canvasEl.height = canvasDOMRect.height
	}

	const drawCanvas = (enteringProgress = 0, leavingProgress = 0) => {
		if (!ctx || !canvasDOMRect) return

		ctx.clearRect(0, 0, canvasDOMRect.width, canvasDOMRect.height)

		ctx.fillStyle = '#111827'

		ctx.beginPath()
		ctx.moveTo(0, canvasDOMRect.height * (1 - enteringProgress))

		// prettier-ignore
		ctx.bezierCurveTo(
			canvasDOMRect.width * 0.25, canvasDOMRect.height * Math.pow((1 - enteringProgress), archStrength),
			canvasDOMRect.width * 0.75, canvasDOMRect.height * Math.pow((1 - enteringProgress), archStrength),
			canvasDOMRect.width, canvasDOMRect.height * (1 - enteringProgress)
		)

		ctx.lineTo(canvasDOMRect.width, canvasDOMRect.height * (1 - leavingProgress))

		//ctx.lineTo(0, canvasDOMRect.height)
		ctx.bezierCurveTo(
			canvasDOMRect.width * 0.75, canvasDOMRect.height * Math.pow((1 - leavingProgress), archStrength),
			canvasDOMRect.width * 0.25, canvasDOMRect.height * Math.pow((1 - leavingProgress), archStrength),
			0, canvasDOMRect.height * (1 - leavingProgress)
		)

		ctx.lineTo(0, canvasDOMRect.height * (1 - enteringProgress))

		ctx.fill()
	}

	onMount(() => {
		ctx = canvasEl.getContext('2d')
		onResize()
	})

	beforeNavigate(async () => {
		// @ts-ignore
		const scroll = ScrollSmoother.get();

		isTransitioning.set(true);
		isPageHidden.set(false);

		if (scroll) scroll.paused(true);

		const canvasTransition = {
			enteringProgress: 0,
			leavingProgress: 0
		}

		tl = gsap.timeline();

		tl.to(canvasTransition, {
			enteringProgress: 1,
			duration: 2,
			ease: 'circ.inOut',
			onUpdate: () => {
				drawCanvas(canvasTransition.enteringProgress, canvasTransition.leavingProgress)
			},
			onComplete: () => {
				if (scroll) scroll.scrollTo(0, 0);

				if (curtains) {
					curtains.updateScrollValues(0, 0);
				}
			}
		}).to(canvasTransition, {
			leavingProgress: 1,
			duration: 1.5,
			ease: 'power4.out',
			onUpdate: () => {
				drawCanvas(canvasTransition.enteringProgress, canvasTransition.leavingProgress)
			},
		}).then(() => {
			isPageHidden.set(false);
			isTransitioning.set(false);

			const hash = $page.url.hash.slice(1);

			if (scroll) {
				scroll.paused(false);

				if (hash) {
					const scrollElem = document.getElementById(hash);

					if (scrollElem) {
						gsap.to(scroll, {
							scrollTop: scroll.offset(scrollElem, 'top top'),
							duration: 1,
							delay: 0.5
						});
					}
				}
			}
		});

		// resize curtains to avoid misplaced plane after navigation because of fly transition
		// tl.call(() => {
		// 	if (curtains) {
		// 		curtains.resize();
		// 	}
		// }, null, 2.15); // add a small delay after effective DOM change
	});
</script>

<svelte:window on:resize={onResize}/>

<div class='h-full w-full fixed z-40 top-0 left-0 pointer-events-none'>
	<canvas bind:this={canvasEl} class="absolute h-full w-full"/>
</div>

<style></style>
