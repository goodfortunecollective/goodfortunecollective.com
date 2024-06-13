<script lang="ts">
	import Lenis from '@studio-freight/lenis';
	import { onMount, setContext } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';
	import { Body } from 'svelte-body';
	import Modal from 'svelte-simple-modal';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	import { afterNavigate, disableScrollHandling } from '$app/navigation';
	import { browser, version } from '$app/environment';
	import { isIntroDone, backgroundColor, isTransitioningEnabled } from '$lib/stores';
	import gsap, { ScrollTrigger, CustomEase } from '$lib/gsap';

	import { lenisStore as lenis, setLenisStore } from '$lib/stores/lenis';

	import { getComponentByName } from '$lib/storyblok';
	import { ProjectListHover } from '$lib/components';
	import { debounce } from '$lib/utils/debounce';

	import type { LayoutData } from './$types';
	import { pageLeaveDuration, pageTransitionPauseDuration } from '$lib/utils/page-transitions';

	import Analytics from './Analytics.svelte';
	import Loader from './Loader.svelte';
	import ScrollIndicator from './ScrollIndicator.svelte';
	import Curtains from './Curtains.svelte';
	import PageTransition from './PageTransition.svelte';
	import PageTransitionAnim from './PageTransitionAnim.svelte';
	import Cursor from './Cursor.svelte';

	import '../app.css';

	injectSpeedInsights();

	export let data: LayoutData;

	$: innerWidth = 0;
	let lastWidth = 0;

	let loaderRef: Loader | null = null;
	let pageTransitionAnimRef: PageTransitionAnim | null = null;

	setContext('storyblok-preview', data.preview);

	let hash = '';

	$: if (browser && $lenis && hash) {
		const target = document.querySelector(hash);
		if ($isTransitioningEnabled) {
			$lenis.scrollTo(target, { offset: 0 });
		}
	}

	// ScrollTrigger.defaults({ markers: process.env.NODE_ENV === 'development' });

	onMount(() => {
		lastWidth = innerWidth;

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

		const logVersion = () => {
			console.log(
				`%cGood Fortune Collective %cV${version}`,
				'color: #fff; background-color: #1a1a1a; font-size: 16px; padding: 4px; border-radius: 4px 0 0 4px;',
				'color: #1a1a1a; background-color: #fff; font-size: 10px; padding: 2px; border-radius: 0 4px 4px 0;'
			);
		};

		logVersion();

		return () => {
			$lenis?.destroy();
		};
	});

	afterNavigate(() => {
		disableScrollHandling();
		if ($isTransitioningEnabled) {
			setTimeout(
				() => {
					scrollTo({ top: 0, behavior: 'instant' });
				},
				pageLeaveDuration + pageTransitionPauseDuration / 2
			);
		}
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

	const onResize = () => {
		if (lastWidth === innerWidth) return;

		ScrollTrigger.refresh(true);

		lastWidth = innerWidth;
	};
</script>

<svelte:window bind:innerWidth on:resize={debounce(onResize)} />

<Body style="--theme-color: {$backgroundColor}" />

{#if data.settings}
	<StoryblokComponent blok={getComponentByName(data.settings.content, 'header')} />
{/if}

<main class="overflow-hidden">
	<PageTransition pathname={data.pathname}>
		<Modal
			closeButton={false}
			styleBg={{ background: 'rgba(0, 0, 0, 0.8)', zIndex: 9999 }}
			classBg="fixed top-0 left-0 w-screen h-screen flex flex-col justify-center"
			classWindowWrap="relative m-2 max-h-full"
			classWindow="!bg-transparent relative w-40 max-w-full max-h-full my-2 mx-auto text-orange-200 rounded shadow-md bg-indigo-900"
			classContent="relative p-2 overflow-auto"
			on:closed={() => {
				ScrollTrigger.refresh(true);
			}}
		>
			<slot key={data.pathname} />
		</Modal>
		{#if data.settings}
			<StoryblokComponent blok={getComponentByName(data.settings.content, 'footer')} />
		{/if}
	</PageTransition>

	<ProjectListHover />

	<Curtains />
</main>

<ScrollIndicator />

<Loader bind:this={loaderRef} on:complete={handleCompleteLoader} skip={data.preview} />

<PageTransitionAnim bind:this={pageTransitionAnimRef} />

<Cursor />

<Analytics />

<style>
</style>
