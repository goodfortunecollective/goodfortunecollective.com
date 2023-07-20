<script lang="ts">
	import { onMount } from 'svelte';
	import { custom_event } from 'svelte/internal';

	import { page } from '$app/stores';
	import { ScrollSmoother, ScrollTrigger, gsap } from '$lib/gsap';

	import type { LayoutData } from './$types';

	import Loader from './Loader.svelte';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import Curtains from './Curtains.svelte';
	import PageTransition from './PageTransition.svelte';
	import PageTransitionAnim from './PageTransitionAnim.svelte';

	import '../app.css';

	export let data: LayoutData;

	let scroll: ScrollSmoother | null = null;

	let ref: any;

	let smoothScrollContentEl: HTMLElement;
	let resizeObserver: ResizeObserver | undefined;

	onMount(() => {
		// @ts-ignore
		ScrollTrigger.normalizeScroll(true);

		// each time our smooth scroll content div size change, refresh scroll trigger
		resizeObserver = new ResizeObserver(() => {
			// @ts-ignore
			ScrollTrigger.refresh();
		});
		resizeObserver.observe(smoothScrollContentEl);

		// @ts-ignore
		scroll = ScrollSmoother.create({
			wrapper: '#smooth-wrapper',
			content: '#smooth-content',
			smooth: 1.5,
			effects: true,
			normalizeScroll: true,
			smoothTouch: 0.1,
			onUpdate: (event: any) => {
				ref.dispatchEvent(
					custom_event('smoothScrollUpdate', { offsetY: event.scrollTop() }, { bubbles: true })
				);
			}
		});
		if (scroll) {
			const hash = $page.url.hash.slice(1);

			if (hash) {
				const scrollElem = document.getElementById(hash);

				if (scrollElem) {
					gsap.to(scroll, {
						scrollTop: scroll.offset(scrollElem, 'top top'),
						duration: 1,
						delay: 0.5
					});
				} else {
					scroll.paused(true);
				}
			}
		}

		return () => {
			if (resizeObserver) resizeObserver.disconnect();
		};
	});

	function handleCompleteLoader() {
		if (scroll) {
			scroll.paused(false);
		}
	}
</script>

<Header />
<main bind:this={ref}>
	<PageTransitionAnim />
	<div id="smooth-wrapper" class="z-10">
		<div id="smooth-content" bind:this={smoothScrollContentEl}>
			<PageTransition pathname={data.pathname}>
				<slot />
				<Footer />
			</PageTransition>
		</div>
	</div>
</main>

<Curtains />

<Loader on:complete={handleCompleteLoader} />

<style>
</style>
