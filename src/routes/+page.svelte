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

<section class="h-full w-full bg-black" />
<section class="h-full w-full" />
{#if data.story}
	<StoryblokComponent blok={data.story.content} />
{/if}

<style>
</style>
