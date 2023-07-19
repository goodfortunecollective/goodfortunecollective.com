<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent, renderRichText } from '@storyblok/svelte';

	import { base } from '$app/paths';
	import { Heading } from '$lib/components';

	export let data;
	$: description = renderRichText(data.story.content.description);

	onMount(() => {
		// console.log(data.story.content);
		if (data.story) {
			useStoryblokBridge(data.story.id, (newStory) => (data.story = newStory));
		}
	});

	onDestroy(() => {});
</script>

<section class="pt-[var(--header-height)] bg-black text-white">
	<div class="flex flex-row max-w-6xl pt-16 pb-32 mx-auto">
		<div class="flex flex-col px-12 md:w-3/4">
			<div class="flex flex-row gap-4">
				{#if data.story.content.client}
					<div class="flex flex-col md:w-1/5">
						<h5 class="mb-2 text-sm font-bold tracking-wide uppercase">Client</h5>
						{data.story.content.client}
					</div>
				{/if}
				{#if data.story.content.solutions}
					<div class="flex flex-col md:w-1/5">
						<h5 class="mb-2 text-sm font-bold tracking-wide uppercase">Solutions</h5>
						{#each data.story.content.solutions as item}
							<span>{item}</span>
						{/each}
					</div>
				{/if}
				{#if data.story.content.roles}
					<div class="flex flex-col md:w-1/5">
						<h5 class="mb-2 text-sm font-bold tracking-wide uppercase">Roles</h5>
						{#each data.story.content.roles as item}
							<span>{item}</span>
						{/each}
					</div>
				{/if}
				{#if data.story.content.deliverables}
					<div class="flex flex-col md:w-1/5">
						<h5 class="mb-2 text-sm font-bold tracking-wide uppercase">Deliverables</h5>
						{#each data.story.content.deliverables as item}
							<span>{item}</span>
						{/each}
					</div>
				{/if}
			</div>
			<Heading size="h1" class="mt-6">{data.story.name}</Heading>
			{#if data.story.content.description}
				<div class="mt-12">
					{@html description}
				</div>
			{/if}
		</div>
		<figure class="md:w-1/4">
			{#if data.story.content.thumbnail}
				<img src={data.story.content.thumbnail.filename} alt={data.story.content.title} />
			{/if}
		</figure>
	</div>
</section>
<section>
	<div class="max-w-6xl mx-auto">
		{#if data.story}
			<StoryblokComponent blok={data.story.content} />
		{/if}
		<div class="flex justify-center align-center mt-72 pb-[1600px]">
			<a href="{base}/work/">
				<Heading size="h1" as="h3">All projects</Heading>
			</a>
		</div>
	</div>
</section>
