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

<section class="h-1/2 pb-32">
	{#if data.story}
		<StoryblokComponent blok={data.story.content} />
	{/if}
</section>
