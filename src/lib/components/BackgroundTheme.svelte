<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	import { ScrollTrigger } from '$lib/gsap';
	import { useTransitionReady } from '$lib/utils/useTransitionReady';
	import { backgroundColor, backgroundTheme } from '$lib/stores';

	export let preload: boolean = false;

	export let startColor: string = '#fff';
	export let endColor: string = '#fff';

	export let startTheme: 'light' | 'dark' = 'light';
	export let endTheme: 'light' | 'dark' = 'light';

	let el!: HTMLElement;
	let scrollTrigger!: ScrollTrigger;

	onMount(() => {
		if (preload) {
			setTimeout(() => {
				backgroundTheme.set(endTheme);
				backgroundColor.set(endColor);
			}, 500);
		}
	});

	useTransitionReady(() => {
		scrollTrigger = ScrollTrigger.create({
			trigger: el,
			start: 'top center',
			end: 'bottom center',
			onEnter: () => {
				backgroundTheme.set(endTheme);
				backgroundColor.set(endColor);
			},
			onLeaveBack: () => {
				backgroundTheme.set(startTheme);
				backgroundColor.set(startColor);
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
