<script lang="ts">
	import { onMount } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';

	// import { base } from '$app/paths';
	// import { Link, Heading } from '$lib/components';

	export let data;

	onMount(() => {
		if (data.story) {
			useStoryblokBridge(data.story.id, (newStory) => (data.story = newStory));
		}
	});
</script>

<section class="culture pt-[var(--header-height)]">
	{#if data.story}
		<StoryblokComponent blok={data.story.content} />
	{/if}
</section>

<style lang="scss">
	@import '../../vars.scss';
</style>
