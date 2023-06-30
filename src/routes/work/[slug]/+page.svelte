<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Heading } from '$lib/components/typography';
	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';

	import { base } from '$app/paths';

	export let data;

	onMount(() => {
		if (data.story) {
			useStoryblokBridge(data.story.id, (newStory) => (data.story = newStory));
		}
	});

	onDestroy(() => {});
</script>

<svelte:head>
	<title>Work SLUG</title>
	<meta name="description" content="Work SLUG" />
</svelte:head>

<section class="pt-[var(--header-height)] pb-32">
	<div class="max-w-6xl mx-auto">
		<a href="{base}/work/"> &#10229; </a>
		{#if data.story}
			<StoryblokComponent blok={data.story.content} />
		{/if}
		<div class="flex justify-center mt-16 align-center">
			<a href="{base}/work/"><Heading size="h1" as="h3">All projects</Heading></a>
		</div>
	</div>
</section>

<style>
</style>
