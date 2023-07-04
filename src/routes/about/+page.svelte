<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	import { base } from '$app/paths';
	import { Flex } from '$lib/components/layout';
	import { Heading } from '$lib/components/typography';

	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';

	export let data;

	onMount(() => {
		if (data.story) {
			useStoryblokBridge(data.story.id, (newStory) => (data.story = newStory));
		}
	});
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About" />
</svelte:head>

<section class="pt-[var(--header-height)] pb-32 h-1/2">
	{#if data.story}
		<StoryblokComponent blok={data.story.content} />
	{/if}
</section>
