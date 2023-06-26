<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
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
	<title>careers SLUG</title>
	<meta name="description" content="Careers SLUG" />
</svelte:head>

<section class="pt-[var(--header-height)] pb-32">
	<div class="mx-auto max-w-6xl">
		<a href="{base}/careers/"> &#10229; </a>
		{#if data.story}
			<StoryblokComponent blok={data.story.content} />
		{/if}
	</div>
</section>

<style>
</style>
