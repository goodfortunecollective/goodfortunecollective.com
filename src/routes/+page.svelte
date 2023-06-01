<script lang="ts">
	import { onMount } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';

	import { gsap, ScrollSmoother, ScrollTrigger, SplitText } from '$lib/gsap';

	export let data;

	onMount(async () => {
		if (data.story) {
			useStoryblokBridge(data.story.id, (newStory) => (data.story = newStory));
		}

		/**
		ScrollSmoother.create({
			wrapper: '#smooth-wrapper',
			content: '#smooth-content',
			smooth: 1.5,
			effects: true,
			smoothTouch: 0.1
		});*/

		const splitText = document.querySelectorAll('[data-gsap="split-text"]');

		splitText.forEach((content) => {
			const tl = gsap.timeline();

			const text = new SplitText(content, {
				type: 'lines,words,chars',
				linesClass: 'split-line'
			});

			tl.fromTo(
				text.chars,
				{
					opacity: 0,
					y: 80
				},
				{
					opacity: 1,
					duration: 0.6,
					ease: 'circ.out',
					y: 0,
					delay: 1,
					stagger: 0.02
				}
			);

			tl.to(text.chars, {
				scrollTrigger: {
					trigger: '#h-intro',
					start: 'top 20%',
					end: 'bottom 50%',
					markers: true
				},
				opacity: 0,
				duration: 0.6,
				ease: 'circ.out',
				y: -80,
				delay: 1,
				stagger: 0.02
			});
		});
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta
		name="description"
		content="People today love brands that love them back. But more than that, people today need to know that brands have their best intentions at heart.e"
	/>
</svelte:head>

<section class="flex h-full w-full bg-black">
	<div class="flex w-full h-full mx-auto max-w-6xl relative">
		<video
			class="w-full h-full aspect-video absolute inset-0"
			src="https://media.istockphoto.com/id/1250005100/pt/v%C3%ADdeo/floating-droplets-loop.mp4?s=mp4-640x640-is&amp;k=20&amp;c=eJworDI_aCrPdxtWQhVk4j77JHwtc4xV6wRFXljLgcE="
			autoplay
			muted
			loop><track kind="captions" /></video
		>
		<div class="z-10 absolute h-full w-full flex items-center">
			<div class="flex flex-col gap-24" id="h-intro">
				<h1 data-gsap="split-text" class="text-cyan-500 font-degular-display text-9xl">
					Good Fortune Collective
				</h1>
				<h2 data-gsap="split-text" class="text-white font-degular-display text-7xl max-w-2xl">
					is a culture that embraces change
				</h2>
			</div>
		</div>
	</div>
</section>

<section class="h-full w-full" />
{#if data.story}
	<StoryblokComponent blok={data.story.content} />
{/if}

<style>
</style>
