<script lang="ts">
	import { onMount } from 'svelte';
	import { beforeNavigate } from '$app/navigation';
	import { gsap, ScrollSmoother } from '$lib/gsap';
	import { cls } from '$lib/styles';
	import PageTransition from '$lib/components/PageTransition.svelte';

	import type { LayoutData } from './$types';

	import Loader from './Loader.svelte';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';

	import '../app.css';

	export let data: LayoutData;

	let background!: HTMLElement;
	let isTransition: boolean = false;
	let scroll: ScrollSmoother | null = null;

	onMount(() => {
		// @ts-ignore
		scroll = ScrollSmoother.create({
			wrapper: '#smooth-wrapper',
			content: '#smooth-content',
			smooth: 1.5,
			effects: true,
			smoothTouch: 0.1
		});
		if (scroll) scroll.paused(true);
	});

	beforeNavigate(() => {
		isTransition = true;

		const tl = gsap.timeline();

		tl.fromTo(
			background,
			{
				y: '150vh',
				scale: 1.5,
				rotation: 10
			},
			{
				y: 0,
				rotation: 0,
				duration: 2,
				ease: 'circ.inOut'
			}
		);

		tl.fromTo(
			background,
			{ rotation: 10 },
			{
				y: '-100vh',
				scale: 1,
				rotation: 0,
				duration: 1.5,
				delay: 1.5,
				ease: 'power4.out'
			},
			'<'
		).then(() => {
			isTransition = false;
		});
	});

	function handleCompleteLoader() {
		if (scroll) scroll.paused(false);
	}
</script>

<Header />
<main>
	<div class={cls('h-full w-full z-50 fixed top-0 left-0', isTransition ? 'block' : 'hidden')}>
		<div bind:this={background} class="h-full w-full bg-gray-900" />
	</div>

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
</style>
