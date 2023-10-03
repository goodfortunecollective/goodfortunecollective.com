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
			{#if data.story.tag_list}
				<span
					class="col-span-10 col-start-2 text-xs tracking-widest uppercase lg:col-start-2 lg:col-span-4 tag-list"
				>
					{#each data.story.tag_list as tag, i}
						{#if i > 0}&nbsp;
						{/if}
						#{tag}
					{/each}
				</span>
			{/if}
			{#if data.story.content.thumbnail}
				<figure class="col-span-10 col-start-2 my-16 lg:col-start-2 post-image">
					<img src={data.story.content.thumbnail.filename} class="post-img" alt={data.story.name} />
				</figure>
			{/if}
			<div class="col-span-11 col-start-1">
				{#each data.story.content.description as item}
					<StoryblokComponent blok={item} />
				{/each}
			</div>
		{/if}
	</div>
</section>

<style>
	.post-img {
		width: 100%;
	}
</style>
