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
	<title>Home</title>
	<meta
		name="description"
		content="People today love brands that love them back. But more than that, people today need to know that brands have their best intentions at heart.e"
	/>
</svelte:head>

{#if data.story}
	<StoryblokComponent blok={data.story.content} />
{/if}
