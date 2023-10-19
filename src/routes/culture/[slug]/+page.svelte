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

<section class="pb-32 pt-[var(--header-height)]">
	<div class="mb-8 mt-24 grid grid-cols-12">
		<div class="col-span-10 col-start-2 lg:col-span-4 lg:col-start-2">
			<span class="inline-block rotate-180">
				<Link href="{base}/culture/">&#10229;</Link>
			</span>
		</div>
	</div>
	<div class="grid grid-cols-12">
		{#if data.story}
			<Heading as="h1" size="h2" class="col-span-10 col-start-2 mb-6 lg:col-span-4 lg:col-start-2"
				>{data.story.content.title}</Heading
			>
			{#if data.story.content.thumbnail}
				<figure class="col-start-0 post-image col-span-9 mb-16">
					<img src={data.story.content.thumbnail.filename} class="post-img" alt={data.story.name} />
				</figure>
			{/if}

			<Heading
				as="h2"
				size="h6"
				class="title col-span-10 col-start-2 w-full break-keep md:col-span-2 md:col-start-2 xl:w-[75%]"
				>{publishedAtFormatted}</Heading
			>
			<div
				class="culture-single-content col-span-10 col-start-2 text-lg md:col-span-6 md:col-start-4"
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
