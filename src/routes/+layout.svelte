<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { gsap } from '$lib/gsap';
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

	beforeNavigate(() => {
		isTransition = true;

		const tl = gsap.timeline();

		tl.fromTo(
			background,
			{
				x: '-100vw'
			},
			{
				x: 0,
				duration: 0.75,
				ease: 'expo.inOut'
			}
		);

		tl.to(background, {
			x: '100vw',
			duration: 0.75,
			delay: 0.1,
			ease: 'expo.inOut'
		}).then(() => {
			isTransition = false;
		});
	});
</script>

<Header />
<div id="smooth-wrapper">
	<div id="smooth-content">
		<main>
			<div
				class={cls('h-screen w-screen z-10 fixed top-0 left-0', isTransition ? 'block' : 'hidden')}
			>
				<div bind:this={background} class="h-full w-full bg-black" />
			</div>
			<PageTransition pathname={data.pathname}>
				<slot />
				<Footer />
			</PageTransition>
		</main>
	</div>
</div>

<!--
<Loader />-->

<style>
</style>
