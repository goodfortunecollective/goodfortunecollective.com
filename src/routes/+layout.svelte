<script lang="ts">
	import { onMount } from 'svelte';
	import { custom_event } from 'svelte/internal';

	import { page } from '$app/stores';
	import { ScrollSmoother, gsap } from '$lib/gsap';

	import type { LayoutData } from './$types';

	import Loader from './Loader.svelte';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import PageTransition from './PageTransition.svelte';
	import PageTransitionAnim from './PageTransitionAnim.svelte';

	import '../app.css';

	export let data: LayoutData;

	let scroll: ScrollSmoother | null = null;

	let ref: any;

	onMount(() => {
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
	<div id="canvas" />
	<div id="smooth-wrapper" class="z-10">
		<div id="smooth-content">
			<PageTransition pathname={data.pathname}>
				<slot />
				<Footer />
			</PageTransition>
		</div>
	</div>
</main>

<Loader on:complete={handleCompleteLoader} />

<style>
	#canvas {
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		height: 100vh;
		z-index: 1;
		opacity: 1;
		transition: opacity 0.5s ease-in;
		/* display: none; */
	}
</style>
