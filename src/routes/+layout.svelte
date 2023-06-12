<script lang="ts">
	import { onMount } from 'svelte';
	import { ScrollSmoother } from '$lib/gsap';

	import type { LayoutData } from './$types';

	import Loader from './Loader.svelte';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import PageTransition from './PageTransition.svelte';
	import PageTransitionAnim from './PageTransitionAnim.svelte';

	import '../app.css';

	export let data: LayoutData;

	let scroll: ScrollSmoother | null = null;

	onMount(() => {
		// @ts-ignore
		scroll = ScrollSmoother.create({
			wrapper: '#smooth-wrapper',
			content: '#smooth-content',
			smooth: 1.5,
			effects: true,
			normalizeScroll: true,
			smoothTouch: 0.1
		});
		if (scroll) scroll.paused(true);
	});

	function handleCompleteLoader() {
		if (scroll) scroll.paused(false);
	}
</script>

<Header />
<main>
	<PageTransitionAnim />
	<div id="canvas" />
	<div id="smooth-wrapper">
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
		z-index: 10;
		opacity: 1;
		transition: opacity 0.5s ease-in;
	}
</style>
