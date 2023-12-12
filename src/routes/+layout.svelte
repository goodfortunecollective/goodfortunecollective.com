<script lang="ts">
	import Lenis from '@studio-freight/lenis';
	import { onMount, setContext } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';
	import { Body } from 'svelte-body';

	import { browser } from '$app/environment';
	import { isIntroDone, backgroundColor } from '$lib/stores';
	import gsap, { ScrollTrigger, CustomEase } from '$lib/gsap';

	import { lenisStore as lenis, setLenisStore } from '$lib/stores/lenis';

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

	let loaderRef: Loader | null = null;
	let pageTransitionAnimRef: PageTransitionAnim | null = null;

	setContext('storyblok-preview', data.preview);

	let hash = '';

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

		lenisInstance.on('scroll', ScrollTrigger.update);

		setLenisStore(lenisInstance);
		gsap.ticker.add((time) => {
			$lenis?.raf(time * 1000);
		});

		gsap.ticker.lagSmoothing(0);

		return () => {
			$lenis?.destroy();
		};
	});

	function handleCompleteLoader() {
		pageTransitionAnimRef?.animateTransition({
			onEnteringDone: () => {
				loaderRef?.hide();
				$lenis?.start();

				isIntroDone.set(true);
			},
			onLeavingDone: () => {
				//isIntroDone.set(true)
			}
		});
	}
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

<Loader bind:this={loaderRef} on:complete={handleCompleteLoader} skip={true} />

<PageTransitionAnim bind:this={pageTransitionAnimRef} />

<Cursor />

<style>
</style>
