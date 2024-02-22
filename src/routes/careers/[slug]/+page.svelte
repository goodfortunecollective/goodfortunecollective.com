<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';

	import { base } from '$app/paths';
	import { Link, Heading, BackgroundTheme } from '$lib/components';

	export let data;

	onMount(() => {
		if (data.story) {
			useStoryblokBridge(data.story.id, (newStory) => (data.story = newStory));
		}
	});

	onDestroy(() => {});
</script>

<BackgroundTheme
	preload={true}
	startColor="#fff"
	endColor="#fff"
	startTheme="light"
	endTheme="light"
/>

<section class=" pb-32">
	<div class="mb-8 mt-24 grid grid-cols-12">
		<div
			class="col-span-10 col-start-2 lg:col-span-4 lg:col-start-2 2xl:col-span-3 2xl:col-start-3"
		>
			<span class="inline-block rotate-180">
				<Link href="{base}/careers/#jobs">&#10229;</Link>
			</span>
		</div>
	</div>
	<div class="grid grid-cols-12">
		{#if data.story}
			<Heading
				as="h1"
				size="h2"
				class="col-span-10 col-start-2 mb-8 lg:col-span-4 lg:col-start-2 2xl:col-span-3 2xl:col-start-3"
				>{data.story.content.title}</Heading
			>
			<div class="col-start-0 col-span-12">
				{#each data.story.content.description as item}
					<StoryblokComponent blok={item} />
				{/each}
			</div>
		{/if}
	</div>
</section>

<style>
</style>
