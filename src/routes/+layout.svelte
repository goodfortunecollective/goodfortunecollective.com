<script lang="ts">
	import Lenis from '@studio-freight/lenis';
	import { onMount, setContext } from 'svelte';
	import { custom_event } from 'svelte/internal';
	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';
	import { Body } from 'svelte-body';

	import { isIntroDone, backgroundColor } from '$lib/stores';
	import { page } from '$app/stores';
	import gsap, { ScrollTrigger, CustomEase } from '$lib/gsap';
	import { lenis } from '$lib/stores';
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

	let lenisScroll: Lenis | null = null;

	let ref: any;

	setContext('storyblok-preview', data.preview);

	onMount(() => {
		CustomEase.create('css-ease', 'M0,0 C0.25,0.1 0.25,1 1,1');
		CustomEase.create('css-ease.in', 'M0,0 C0.42,0 1,1 1,1');
		CustomEase.create('css-ease.out', 'M0,0 C0,0 0.58,1 1,1');
		CustomEase.create('css-ease.in-out', 'M0,0 C0.42,0 0.58,1 1,1');

		if (data.settings) {
			useStoryblokBridge(
				data.settings.id,
				(newSettingsStory) => (data.settings = newSettingsStory)
			);
		}

		console.log('data.settings', data.settings.content.content[0]);

		lenisScroll = new Lenis();

		lenis.set(lenisScroll);

		lenisScroll.on('scroll', (e) => {
			ScrollTrigger.update();
			ref.dispatchEvent(
				custom_event(
					'onLenisUpdate',
					{ scrollTop: e.scroll, velocity: e.velocity },
					{ bubbles: true }
				)
			);
		});

		const onRaf = (time) => {
			lenisScroll.raf(time * 1000); // ms
		};

		gsap.ticker.add(onRaf);
		gsap.ticker.lagSmoothing(0);

		if (lenisScroll) {
			const hash = $page.url.hash.slice(1);

			if (hash) {
				const scrollElem = document.getElementById(hash);

				if (scrollElem) {
					lenisScroll.scrollTo(scrollElem, {
						duration: 1
						//delay: 0.5
					});
				} else {
					lenisScroll.stop();
				}
			}
		}

		return () => {
			gsap.ticker.remove(onRaf);
			lenisScroll.destroy();
			lenis.set(null);
		};
	});

	let introComplete, hideLoader;

	function handleCompleteLoader() {
		introComplete({
			onEnteringDone: () => {
				// TODO start page content entering animations
				hideLoader();

				if (lenisScroll) {
					lenisScroll.start();
				}

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

<main bind:this={ref} class="overflow-hidden">
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
