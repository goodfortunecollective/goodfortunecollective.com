<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { useStoryblokBridge, renderRichText } from '@storyblok/svelte';

	import { base } from '$app/paths';
	import { Link, Heading } from '$lib/components';
	import TextTransition from '$lib/components/TextTransition.svelte';

	export let data;
	let publishedAt = new Date(data.story.published_at);
	let publishedAtFormatted =
		publishedAt.toLocaleString('default', { month: 'short' }) +
		' ' +
		publishedAt.getDay() +
		', ' +
		publishedAt.getFullYear();

	$: content = renderRichText(data.story.content.content);

	onMount(() => {
		if (data.story) {
			useStoryblokBridge(data.story.id, (newStory) => (data.story = newStory));
		}
	});

	onDestroy(() => {});
</script>

<section class="pt-[var(--header-height)] pb-32">
	<div class="grid grid-cols-12 mt-24 mb-8">
		<div class="col-span-10 col-start-2 lg:col-start-2 lg:col-span-4">
			<span class="inline-block rotate-180">
				<Link href="{base}/culture/">&#10229;</Link>
			</span>
		</div>
	</div>
	<div class="grid grid-cols-12">
		{#if data.story}
			<Heading as="h1" size="h2" class="col-span-10 col-start-2 mb-6 lg:col-start-2 lg:col-span-4"
				>{data.story.content.title}</Heading
			>
			{#if data.story.content.thumbnail}
				<figure class="col-span-9 mb-16 col-start-0 post-image">
					<img src={data.story.content.thumbnail.filename} class="post-img" alt={data.story.name} />
				</figure>
			{/if}

			<Heading
				as="h2"
				size="h6"
				class="w-full col-span-10 col-start-2 md:col-start-2 md:col-span-2 xl:w-[75%] title break-keep"
				>{publishedAtFormatted}</Heading
			>
			<div
				class="col-span-10 col-start-2 text-lg md:col-start-4 md:col-span-6 culture-single-content"
			>
				<div class="flex flex-col gap-4">
					<TextTransition>{@html content}</TextTransition>
				</div>
			</div>
		{/if}
	</div>
</section>

<style>
	.post-img {
		width: 100%;
	}

	.culture-single-content :global(p) {
		margin-bottom: 1.5rem;
	}
</style>
