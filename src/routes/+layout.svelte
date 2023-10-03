<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import { custom_event } from 'svelte/internal';
	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';
	import { isIntroDone } from '$lib/stores';

	import { dev } from '$app/environment';
	import { page } from '$app/stores';
	import gsap, { ScrollSmoother, ScrollTrigger } from '$lib/gsap';

	import { getComponentByName } from '$lib/storyblok';

	import type { LayoutData } from './$types';

	import Loader from './Loader.svelte';
	import ScrollIndicator from './ScrollIndicator.svelte';
	import Curtains from './Curtains.svelte';
	import PageTransition from './PageTransition.svelte';
	import PageTransitionAnim from './PageTransitionAnim.svelte';
	import ProjectListHover from '$lib/components/ProjectListHover.svelte';

	import '../app.css';

	export let data: LayoutData;

	let scroll: ScrollSmoother | null = null;

	let ref: any;

	let smoothScrollContentEl: HTMLElement;
	let resizeObserver: ResizeObserver | undefined;

	setContext('storyblok-preview', data.preview);

	onMount(() => {
		if (data.settings) {
			useStoryblokBridge(
				data.settings.id,
				(newSettingsStory) => (data.settings = newSettingsStory)
			);
		}

		console.log('data.settings', data.settings.content.content[0]);

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

	let introComplete, hideLoader;

	function handleCompleteLoader() {
		introComplete({
			onEnteringDone: () => {
				// TODO start page content entering animations
				hideLoader();

				if (scroll) {
					scroll.paused(false);
				}

				isIntroDone.set(true);
			},
			onLeavingDone: () => {
				//isIntroDone.set(true)
			}
		});
	}
</script>

{#if data.settings}
	<StoryblokComponent blok={getComponentByName(data.settings.content, 'header')} />
{/if}
<main bind:this={ref}>
	<div id="smooth-wrapper" class="z-10">
		<div id="smooth-content" bind:this={smoothScrollContentEl}>
			<PageTransition pathname={data.pathname}>
				<slot />
				{#if data.settings}
					<StoryblokComponent blok={getComponentByName(data.settings.content, 'footer')} />
				{/if}
			</PageTransition>
		</div>
	</div>

	<ProjectListHover />
</main>

<Curtains />

<ScrollIndicator />

<Loader on:complete={handleCompleteLoader} bind:hideLoader skip={data.preview} />

<PageTransitionAnim bind:animateTransition={introComplete} />

<style>
</style>
