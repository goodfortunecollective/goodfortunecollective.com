<script lang="ts">
	import { onMount } from 'svelte';

	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';

	export let data;

	onMount(() => {
		if (data.story) {
			useStoryblokBridge(data.story.id, (newStory) => (data.story = newStory));
		}
	});
</script>

<svelte:head>
	<title>Contact</title>
	<meta name="description" content="Contact" />
</svelte:head>

<section class="pt-[var(--header-height)] pb-32 h-1/2">
	{#if data.story}
		<StoryblokComponent blok={data.story.content} />
	{/if}
</section>
