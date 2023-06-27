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
	<title>Careers</title>
	<meta name="description" content="Careers" />
</svelte:head>

<section class="pt-[var(--header-height)] pb-32 h-screen bg-gray-200">
	<div class="max-w-6xl mx-auto">
		<Flex class="items-end pt-16">
			<Heading as="h2" size="h1" class="md:w-1/2">Headline Statement</Heading>
			<p class="flex-1 text-xl">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac feugiat nisl, a
				cursus orci. Pellentesque sollicitudin feugiat ipsum, eget venenatis urna mollis ac.
			</p>
		</Flex>
	</div>
</section>

<section>
	{#if data.story}
		<StoryblokComponent blok={data.story.content} />
	{/if}
</section>

<section class="pt-32 pb-32 bg-white">
	<div class="max-w-6xl mx-auto">
		<Flex class="pt-32 md:items-end">
			<Heading as="h2" size="h2" class="w-full md:w-1/2"
				>Current Openings Headline Statement</Heading
			>
			{#each data.jobs as { name, slug }}
				<li>
					<a href="{base}/careers/{slug}">
						{name}
					</a>
				</li>
			{/each}
		</Flex>
	</div>
</section>
