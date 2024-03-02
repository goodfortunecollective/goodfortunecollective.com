<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	import { ScrollTrigger } from '$lib/gsap';
	import { useTransitionReady } from '$lib/utils/useTransitionReady';
	import { backgroundColor, backgroundTheme, isTransitioning } from '$lib/stores';
	import { pageTransitionPauseDuration } from '$lib/utils/page-transitions';

	export let preload: boolean = false;

	export let startColor: string = '#fff';
	export let endColor: string = '#fff';

	export let startTheme: 'light' | 'dark' = 'light';
	export let endTheme: 'light' | 'dark' = 'light';

	let el!: HTMLElement;
	let scrollTrigger!: ScrollTrigger;

	onMount(() => {
		if (preload) {
			document.body.style.transitionProperty = 'none';
			setTimeout(() => {
				backgroundTheme.set(endTheme);
				backgroundColor.set(endColor);
			}, pageTransitionPauseDuration / 2);
		}
	});

	useTransitionReady(() => {
		document.body.style.transitionProperty = 'background-color';

		scrollTrigger = ScrollTrigger.create({
			trigger: el,
			start: 'top center',
			end: 'bottom center',
			onEnter: () => {
				if (!$isTransitioning) {
					backgroundTheme.set(endTheme);
					backgroundColor.set(endColor);
				}
			},
			onLeaveBack: () => {
				if (!$isTransitioning) {
					backgroundTheme.set(startTheme);
					backgroundColor.set(startColor);
				}
			}
		});
	});

	onDestroy(() => {
		if (scrollTrigger) {
			scrollTrigger.kill();
			scrollTrigger = null;
		}
	});
</script>

<div {...$$restProps} bind:this={el} />
