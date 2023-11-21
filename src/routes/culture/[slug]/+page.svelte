<script lang="ts">
	import { onMount } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';

	import { base } from '$app/paths';
	import { Link, Heading, Image } from '$lib/components';
	import { getImageDimensionsFromUrl } from '$lib/storyblok/utils';

	export let data;

	function getStoryReadTime(): number {
		let paragraphs: string[] = [];
		data.story.content.content.forEach((b: any) => {
			if (b.component === 'article-text') {
				b.content.content.forEach((c: any) => {
					if (c.type === 'paragraph' && c.content) {
						c.content.forEach((t: any) => {
							paragraphs.push(t.text);
						});
					}
				});
			}
		});

		const words = paragraphs.join(' ').split(' ').length;

		return Math.ceil(words / 200);
	}

	onMount(() => {
		if (data.story) {
			useStoryblokBridge(data.story.id, (newStory) => (data.story = newStory));
		}
	});
</script>

<section class="pt-[var(--header-height)]">
	<div class="mb-8 mt-24 grid grid-cols-12">
		<div class="col-span-10 col-start-2 lg:col-span-4 lg:col-start-2">
			<span class="inline-block rotate-180">
				<Link href="{base}/culture/">&#10229;</Link>
			</span>
		</div>
	</div>
	<div class="grid grid-cols-12">
		{#if data.story}
			<Heading as="h1" size="h2" class="col-span-10 col-start-2 mb-6 lg:col-span-8 lg:col-start-2"
				>{data.story.content.title}</Heading
			>
			{#if data.story.content.thumbnail}
				<figure class="col-start-0 col-span-12 mb-16 mt-8 lg:col-span-9">
					{#if data.story.content.thumbnail.filename?.length > 0}
						<Image
							src={`${data.story.content.thumbnail.filename}/m/`}
							width={getImageDimensionsFromUrl(data.story.content.thumbnail.filename).width}
							height={getImageDimensionsFromUrl(data.story.content.thumbnail.filename).height}
							alt={data.story.content.thumbnail.name}
							loading="lazy"
							class="w-full"
						/>
					{/if}
				</figure>
			{/if}

			<Heading
				as="h4"
				size="h6"
				class="col-span-10 col-start-2 w-full  break-keep uppercase md:col-span-2 md:col-start-2 lg:translate-y-4 xl:w-[75%]"
				><strong class="tracking-widest">{getStoryReadTime()} min read</strong></Heading
			>
			{#each data.story.content.content as b}
				<StoryblokComponent blok={b} />
			{/each}
		{/if}
	</div>
</section>
