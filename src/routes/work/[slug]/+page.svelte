<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Heading } from '$lib/components/typography';
	import { useStoryblokBridge, StoryblokComponent, renderRichText } from '@storyblok/svelte';

	import { base } from '$app/paths';

	export let data;
	$: solutions = renderRichText(data.story.content.solutions);
	$: roles = renderRichText(data.story.content.roles);
	$: deliverables = renderRichText(data.story.content.deliverables);

	onMount(() => {
		if (data.story) {
			useStoryblokBridge(data.story.id, (newStory) => (data.story = newStory));
		}
	});

	onDestroy(() => {});
</script>

<svelte:head>
	<title>Work SLUG</title>
	<meta name="description" content="Work SLUG" />
</svelte:head>

<section class="pt-[var(--header-height)] pb-32">
	<div class="flex flex-row project-header">
		<div class="flex flex-col project-header-text md:w-3/4">
			<div class="flex flex-row gap-4 project-header-infos">
				{#if data.story.content.client}
					<div class="project-header-col">
						<h5 class="mb-2 text-sm font-bold uppercase">Client</h5>
						{data.story.content.client}
					</div>
				{/if}
				{#if data.story.content.solutions}
					<div class="project-header-col">
						<h5 class="mb-2 text-sm font-bold uppercase">Solutions</h5>
						{@html solutions}
					</div>
				{/if}
				{#if data.story.content.roles}
					<div class="project-header-col">
						<h5 class="mb-2 text-sm font-bold uppercase">Roles</h5>
						{@html roles}
					</div>
				{/if}
				{#if data.story.content.deliverables}
					<div class="project-header-col">
						<h5 class="mb-2 text-sm font-bold uppercase">Deliverables</h5>
						{@html deliverables}
					</div>
				{/if}
			</div>
			<Heading size="h1">{data.story.name}</Heading>
		</div>
		<figure class="project-thumbnail md:w-1/4">
			{#if data.story.content.thumbnail}
				<img src={data.story.content.thumbnail.filename} alt={data.story.content.title} />
			{/if}
		</figure>
	</div>
	<div class="max-w-6xl mx-auto">
		<a href="{base}/work/"> &#10229; </a>
		{#if data.story}
			<StoryblokComponent blok={data.story.content} />
		{/if}
		<div class="flex justify-center mt-16 align-center">
			<a href="{base}/work/"><Heading size="h1" as="h3">All projects</Heading></a>
		</div>
	</div>
</section>

<style lang="scss">
	// @import '../../vars.scss';
	.project-header-col {
		h5 {
			letter-spacing: 0.02em;
		}
		p {
			margin: 0;
		}
	}
</style>
