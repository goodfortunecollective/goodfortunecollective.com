<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';

	export let data;

	onMount(() => {
		if (data.story) {
			useStoryblokBridge(data.story.id, (newStory) => (data.story = newStory));
		}
	});

	onDestroy(() => {});
</script>

<svelte:head>
	<title>careers SLUG</title>
	<meta name="description" content="Work SLUG" />
</svelte:head>

<section class="pt-[var(--header-height)] pb-32 h-screen bg-gray-200">
	<div class="mx-auto max-w-6xl">
		{#if data.story}
			<StoryblokComponent blok={data.story.content} />
		{/if}
	</div>
</section>

<style>
</style>
