<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';

	import { base } from '$app/paths';
	import { Link, Heading } from '$lib/components';

	export let data;

	onMount(() => {
		if (data.story) {
			useStoryblokBridge(data.story.id, (newStory) => (data.story = newStory));
		}
	});

	onDestroy(() => {});
</script>

<section class=" pb-32">
	<div class="grid grid-cols-12 mt-24 mb-8">
		<div class="col-start-2 lg:col-start-2 col-span-10 lg:col-span-4">
			<span class="rotate-180 inline-block">
				<Link href="{base}/careers/">&#10229;</Link>
			</span>
		</div>
	</div>
	<div class="grid grid-cols-12">
		{#if data.story}
			<Heading as="h1" size="h2" class="col-start-2 lg:col-start-2 col-span-10 lg:col-span-4"
				>{data.story.content.title}</Heading
			>
			<div class="col-start-1 col-span-11">
				{#each data.story.content.description as item}
					<StoryblokComponent blok={item} />
				{/each}
			</div>
		{/if}
	</div>
</section>

<style>
</style>
