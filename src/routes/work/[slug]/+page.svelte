<script lang="ts">
	import { cva } from 'class-variance-authority';
	import { onMount, getContext } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent, renderRichText } from '@storyblok/svelte';

	import {
		Heading,
		HoverPlane,
		Video,
		BackgroundTheme,
		RichtextTransition,
		ScrollActionToPage
	} from '$lib/components';
	import { cls } from '$lib/styles';
	import { backgroundTheme } from '$lib/stores';

	export let data;

	// title hover
	let isTitleHovered = false as boolean;

	$: description = renderRichText(data.story.content.description);
	$: ask_text = renderRichText(data.story.content.ask_text);
	$: strategy_text = renderRichText(data.story.content.strategy_text);
	$: solution_text = renderRichText(data.story.content.solution_text);

	const preview = getContext('storyblok-preview');

	const variants = cva('relative transition-colors duration-1000 ease-out', {
		variants: {
			theme: {
				light: '',
				dark: 'text-white'
			}
		},
		defaultVariants: {
			theme: 'light'
		}
	});

	onMount(() => {
		console.log(data.story);
		if (data.story) {
			useStoryblokBridge(data.story.id, (newStory) => (data.story = newStory));
		}
	});
</script>

<BackgroundTheme
	preload={true}
	startColor={data.story.content.color_brand}
	endColor={data.story.content.color_brand}
	startTheme={data.story.content.theme_brand}
	endTheme={data.story.content.theme_brand}
/>

<section class={variants({ theme: $backgroundTheme })}>
	<div class="absolute inset-0 flex h-full w-full items-center text-center">
		<div class="mx-auto grid -translate-y-1/2 grid-cols-12 pt-16 lg:-translate-y-1/4">
			<div
				class="col-span-10 col-start-2"
				on:mouseenter={() => (isTitleHovered = true)}
				on:mouseleave={() => (isTitleHovered = false)}
			>
				<Heading
					as="h1"
					size="h1"
					class="leading-extra-tight lg:leading-extra-tight"
					animated={false}
				>
					{data.story.name}
				</Heading>
			</div>
		</div>
	</div>
	<div class="grid h-screen w-full grid-cols-12 pt-24 lg:pt-32">
		<figure
			class="left-[50%]hidden pointer-events-none absolute h-auto w-1/4 -translate-x-1/2 pb-[50%] md:block lg:col-span-4 lg:col-start-9"
		>
			{#if data.story.content.thumbnail}
				<div class="absolute h-full w-full">
					<HoverPlane content={data.story.content} {isTitleHovered} />
				</div>
			{/if}
		</figure>
		<div class="absolute bottom-0 left-0 col-span-12 col-start-1 grid w-full grid-cols-12 pb-32">
			<div
				class="col-span-10 col-start-2 mx-auto flex flex-row space-x-8 lg:col-span-6 lg:col-start-4 lg:space-x-24"
			>
				{#if data.story.content.brand}
					<div>
						<h5 class="mb-2 text-sm font-bold uppercase tracking-wide text-rose-50">Brand</h5>
						{data.story.content.brand}
					</div>
				{/if}
				{#if data.story.content.ask}
					<div>
						<h5 class="mb-2 text-sm font-bold uppercase tracking-wide text-rose-50">Ask</h5>
						<ul
							class="[&>*:not(:first-child)]:before:mr-4 [&>*:not(:first-child)]:before:content-['•']"
						>
							{#each data.story.content.ask as item}
								<li class="mr-4 inline-block">{item}</li>
							{/each}
						</ul>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<section class={cls(variants({ theme: $backgroundTheme }))}>
	<div class="grid -translate-y-16 grid-cols-12 pb-16">
		<div class="col-span-10 col-start-2">
			<div class="w-full">
				<Video
					name={data.story.content.video_id}
					videoID={data.story.content.video_id}
					videoUrl={data.story.content.video_url}
					posterUrl={data.story.content.video_poster?.filename
						? data.story.content.video_poster.filename
						: `https://vumbnail.com/${data.story.content.video_id}.jpg`}
					autoplay={data.story.content.video_autoplay}
					muted={data.story.content.video_autoplay}
					loop={data.story.content.video_autoplay}
					animated={false}
				/>
			</div>
			<div class=" max-w-4xl py-16">
				<Heading as="h2" size="h2">{@html description}</Heading>
			</div>
		</div>
		{#if data.story.content.ask_text}
			<div class="col-span-10 col-start-2 py-16 lg:col-span-6 lg:col-start-4">
				<Heading as="h4" size="h4" class="uppercase"><strong>Ask</strong></Heading>
				<RichtextTransition class="text-xl [&_p]:my-8 [&_p]:leading-8">
					{@html ask_text}
				</RichtextTransition>
			</div>
		{/if}

		{#if data.story.content.strategy_text}
			<div class="col-span-10 col-start-2 py-16 lg:col-span-6 lg:col-start-4">
				<Heading as="h4" size="h4" class="uppercase"><strong>Strategy</strong></Heading>
				<RichtextTransition class="text-xl [&_p]:my-8 [&_p]:leading-8">
					{@html strategy_text}
				</RichtextTransition>
			</div>
		{/if}

		{#if data.story.content.solution_text}
			<div class="col-span-10 col-start-2 py-16 lg:col-span-6 lg:col-start-4">
				<Heading as="h4" size="h4" class="uppercase"><strong>Solution</strong></Heading>
				<RichtextTransition class="text-xl [&_p]:my-8 [&_p]:leading-8">
					{@html solution_text}
				</RichtextTransition>
				{#if data.story.content.output}
					<ul
						class="mt-8 flex gap-4 text-gray-500 [&>*:not(:first-child)]:before:mr-4 [&>*:not(:first-child)]:before:content-['•']"
					>
						{#each data.story.content.output as item}
							<li>{item}</li>
						{/each}
					</ul>
				{/if}
			</div>
		{/if}
	</div>
</section>

<BackgroundTheme
	startColor={data.story.content.color_brand}
	endColor="#fff"
	startTheme={data.story.content.theme_brand}
	endTheme="light"
/>

<section>
	{#if data.story}
		<StoryblokComponent blok={data.story.content} />
	{/if}
</section>

<ScrollActionToPage href={'/work'} label={'All projects'} disabled={!!preview} />
