<script lang="ts">
	import { onMount } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';

	import { gsap, ScrollSmoother } from '$lib/gsap';

	export let data;

	onMount(async () => {
		if (data.story) {
			useStoryblokBridge(data.story.id, (newStory) => (data.story = newStory));
		}

		/**
		ScrollSmoother.create({
			smooth: 1.5,
			effects: true
		});
		*/
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
	<div class="flex w-full h-full mx-auto max-w-5xl relative">
		<video
			class="w-full h-full aspect-video absolute inset-0"
			src="https://media.istockphoto.com/id/1250005100/pt/v%C3%ADdeo/floating-droplets-loop.mp4?s=mp4-640x640-is&amp;k=20&amp;c=eJworDI_aCrPdxtWQhVk4j77JHwtc4xV6wRFXljLgcE="
			autoplay
			muted
			loop><track kind="captions" /></video
		>
		<div class="z-10 absolute h-full w-full flex items-center">
			<div class="flex flex-col gap-24">
				<h1 class="text-cyan-500 font-degular-display text-9xl">Good Fortune Collective</h1>
				<h2 class="text-white font-degular-display text-7xl max-w-2xl">
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
