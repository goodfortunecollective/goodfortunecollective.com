<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';

	import { lenisStore as lenis } from '$lib/stores/lenis';
	import gsap, { ScrollTrigger } from '$lib/gsap';
	import { cls } from '$lib/styles';
	import {
		isTransitioning,
		isTransitionDone,
		project_list_hover,
		isTransitioningIn,
		isTransitioningEnabled
	} from '$lib/stores';
	import { ProjectTitle } from '$lib/components';
	import { debounce } from '$lib/utils/debounce';
	import { useCurtains } from '$lib/utils/useCurtains';
	import type { CurtainsInstance } from '$lib/utils/useCurtains';
	import {
		pageLeaveDuration,
		pageEnterDuration,
		pageTransitionPauseDuration
	} from '$lib/utils/page-transitions';

	$: innerWidth = 0;
	let lastWidth = 0;

	let curtains: CurtainsInstance;
	let tl: any;

	useCurtains((c) => {
		curtains = c;
	});

	let canvasEl: HTMLCanvasElement;
	let canvasDOMRect: DOMRect | null = null;
	let ctx: CanvasRenderingContext2D | null = null;
	const archStrength: number = 2;

	let showTitle = false;

	let list_hover: string | null = null;

	project_list_hover.subscribe((value) => {
		list_hover = value;
	});

	const updateCanvas = () => {
		if (canvasEl) {
			canvasDOMRect = canvasEl.getBoundingClientRect();
			canvasEl.width = canvasDOMRect.width;
			canvasEl.height = canvasDOMRect.height;
		}
	};

	const onResize = () => {
		if (lastWidth === innerWidth) return;

		updateCanvas();

		lastWidth = innerWidth;
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

		ctx.restore();
	};

	onMount(() => {
		lastWidth = innerWidth;
		ctx = canvasEl.getContext('2d');
		updateCanvas();
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
				isTransitioningIn.set(true);
				if (list_hover) showTitle = true;
			},
			onUpdate: () => {
				drawCanvas(canvasTransition.enteringProgress, canvasTransition.leavingProgress);
			},
			onComplete: () => {
				if (curtains) {
					curtains.updateScrollValues(0, 0);
				}

				ScrollTrigger.refresh(true);

				isTransitioningIn.set(false);

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
				isTransitioning.set(false);
				isTransitionDone.set(true);

				// reset project hover
				project_list_hover.set(null);
				showTitle = false;

				const scrollTo = $page.url.searchParams.get('slug') || $page.url.hash.replace('#', '');

				if ($lenis) {
					$lenis.start();

					if (scrollTo) {
						const scrollElem = document.getElementById(scrollTo);

						if (scrollElem) {
							$lenis.scrollTo(scrollElem, {
								duration: 1
							});
						}
					}
				}

				onLeavingDone();
			});
	};

	beforeNavigate(async () => {
		if ($isTransitioningEnabled) {
			isTransitionDone.set(false);
			isTransitioning.set(true);

			animateTransition();
		}
	});
</script>

<svelte:window bind:innerWidth on:resize={debounce(onResize)} />

<div
	class={cls(
		'fixed inset-0 z-40 h-full w-full items-center overflow-hidden text-center',
		!$isTransitioning && 'pointer-events-none'
	)}
>
	<canvas bind:this={canvasEl} class="absolute inset-0 h-full w-full" />
</div>

{#if list_hover && showTitle}
	<div
		class="fixed inset-0 z-50 flex h-screen w-full transform-gpu items-center text-center"
		in:fade={{ delay: pageLeaveDuration / 2, duration: pageLeaveDuration / 8 }}
	>
		<div class="mx-auto grid -translate-y-1/2 grid-cols-12 pt-16 lg:-translate-y-1/4">
			<div
				class="col-span-12 col-start-1 mx-4 text-white md:col-span-10 md:col-start-2 md:mx-0 2xl:col-span-8 2xl:col-start-3"
			>
				<ProjectTitle type="hover" animated={false} inheritTextColor name={list_hover} />
			</div>
		</div>
	</div>
{/if}
