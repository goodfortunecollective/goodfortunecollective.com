<script lang="ts">
	import Lenis from '@studio-freight/lenis';
	import { onMount, setContext } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';
	import { Body } from 'svelte-body';

	import { browser } from '$app/environment';
	import { isIntroDone, backgroundColor } from '$lib/stores';
	import gsap, { ScrollTrigger, CustomEase } from '$lib/gsap';

	import { lenisStore as lenis, setLenisStore } from '$lib/stores/lenis';
	import { useScroll } from '$lib/lifecycle-functions/useScroll';
	import { useFrame } from '$lib/lifecycle-functions/useFrame';
	import { raf } from '$lib/utils/tempus';

	import { getComponentByName } from '$lib/storyblok';
	import { ProjectListHover } from '$lib/components';

	import type { LayoutData } from './$types';

	import Loader from './Loader.svelte';
	import ScrollIndicator from './ScrollIndicator.svelte';
	import Curtains from './Curtains.svelte';
	import PageTransition from './PageTransition.svelte';
	import PageTransitionAnim from './PageTransitionAnim.svelte';
	import Cursor from './Cursor.svelte';

	import '../app.css';

	export let data: LayoutData;

	setContext('storyblok-preview', data.preview);

	let hash = '';

	if (browser) {
		// Merge rafs
		gsap.ticker.remove(gsap.updateRoot);
		raf.add((time) => {
			gsap.updateRoot(time! / 1000);
		}, 0);
	}

	useScroll(ScrollTrigger.update);

	$: if (browser && $lenis) {
		ScrollTrigger.refresh();
		$lenis.start();
	}

	$: if (browser && $lenis && hash) {
		const target = document.querySelector(hash);
		$lenis.scrollTo(target, { offset: 0 });
	}

	// ScrollTrigger.defaults({ markers: process.env.NODE_ENV === 'development' });

	onMount(() => {
		CustomEase.create('css-ease', 'M0,0 C0.25,0.1 0.25,1 1,1');
		CustomEase.create('css-ease.in', 'M0,0 C0.42,0 1,1 1,1');
		CustomEase.create('css-ease.out', 'M0,0 C0,0 0.58,1 1,1');
		CustomEase.create('css-ease.in-out', 'M0,0 C0.42,0 0.58,1 1,1');

		if (window.history.scrollRestoration) {
			window.history.scrollRestoration = 'manual';
		}
		window.scrollTo(0, 0);

		if (data.settings) {
			useStoryblokBridge(
				data.settings.id,
				(newSettingsStory) => (data.settings = newSettingsStory)
			);
		}

		const lenisInstance = new Lenis();
		setLenisStore(lenisInstance);

		return () => {
			$lenis?.destroy();
		};
	});

	let introComplete, hideLoader;

	function handleCompleteLoader() {
		introComplete({
			onEnteringDone: () => {
				// TODO start page content entering animations
				hideLoader();

				$lenis?.start();

				isIntroDone.set(true);
			},
			onLeavingDone: () => {
				//isIntroDone.set(true)
			}
		});
	}

	useFrame((time) => {
		$lenis?.raf(time);
	});
</script>

<Body style="--theme-color: {$backgroundColor}" />

{#if data.settings}
	<StoryblokComponent blok={getComponentByName(data.settings.content, 'header')} />
{/if}

<main class="overflow-hidden">
	<PageTransition pathname={data.pathname}>
		<slot key={data.pathname} />
		{#if data.settings}
			<StoryblokComponent blok={getComponentByName(data.settings.content, 'footer')} />
		{/if}
	</PageTransition>

	<ProjectListHover />

	<Curtains />
</main>

<ScrollIndicator />

<Loader on:complete={handleCompleteLoader} bind:hideLoader skip={data.preview} />

<PageTransitionAnim bind:animateTransition={introComplete} />

<Cursor />

<style>
</style>
