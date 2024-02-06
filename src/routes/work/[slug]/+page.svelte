<script lang="ts">
	import { inview } from 'svelte-inview';
	import { cva } from 'class-variance-authority';
	import { onMount, getContext } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent, renderRichText } from '@storyblok/svelte';

	import {
		Heading,
		ProjectTitle,
		HoverPlane,
		Video,
		BackgroundTheme,
		RichtextTransition,
		ScrollActionToPage
	} from '$lib/components';
	import { cls } from '$lib/styles';
	import { backgroundTheme } from '$lib/stores';
	import { inViewColorTransition } from '$lib/utils/animations';
	import TextTransition from '$lib/components/TextTransition.svelte';

	export let data;

	// title hover
	let isTitleHovered = false as boolean;

	$: description = renderRichText(data.story.content.description);
	$: ask_text = renderRichText(data.story.content.ask_text);
	$: strategy_text = renderRichText(data.story.content.strategy_text);
	$: solution_text = renderRichText(data.story.content.solution_text);

	const preview = getContext('storyblok-preview');

	const variants = cva('relative duration-1000 ease-out', {
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

<section
	use:inview
	on:inview_change={inViewColorTransition}
	class={variants({ theme: $backgroundTheme })}
>
	<div class="absolute inset-0 flex h-full w-full items-center text-center">
		<div class="mx-auto grid -translate-y-1/2 grid-cols-12 pt-16 lg:-translate-y-1/4">
			<div
				class="col-span-10 col-start-2"
				on:mouseenter={() => (isTitleHovered = true)}
				on:mouseleave={() => (isTitleHovered = false)}
				role="presentation"
			>
				<ProjectTitle animated={false} name={data.story.name} />
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
		<div
			class="absolute bottom-0 left-0 col-span-12 col-start-1 grid w-full grid-cols-12 pb-24 lg:pb-32"
		>
			<div
				class="col-span-10 col-start-2 mx-auto flex flex-col gap-8 lg:flex-row lg:gap-0 lg:space-x-24"
			>
				{#if data.story.content.brand}
					<div>
						<Heading
							as="h2"
							size="h6"
							class="inline-block font-bold uppercase tracking-wide text-rose-50">Brand</Heading
						>
						<RichtextTransition class="text-xl xl:text-2xl 4xl:text-4xl [&_p]:leading-snug">
							<p>{@html data.story.content.brand}</p>
						</RichtextTransition>
					</div>
				{/if}
				{#if data.story.content.ask_text}
					<div>
						<Heading
							as="h2"
							size="h6"
							class="inline-block font-bold uppercase tracking-wide text-rose-50">The ask</Heading
						>
						<RichtextTransition class="text-xl xl:text-2xl 4xl:text-4xl [&_p]:leading-snug">
							{@html ask_text}
						</RichtextTransition>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<section
	use:inview
	on:inview_change={inViewColorTransition}
	class={cls(variants({ theme: $backgroundTheme }))}
>
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
			<div class="max-w-4xl py-16 2xl:max-w-6xl 4xl:max-w-8xl">
				<Heading as="h2" size="h2" animated={false}
					><RichtextTransition>{@html description}</RichtextTransition></Heading
				>
			</div>
		</div>
		{#if data.story.content.strategy_text}
			<div class="col-span-12 grid w-full grid-cols-12 py-16">
				<Heading
					as="h4"
					size="h6"
					class="col-span-10 col-start-2 mt-1 uppercase text-rose-50 lg:col-span-2 lg:col-start-2"
					><strong>Strategy</strong></Heading
				>
				<RichtextTransition
					class="col-span-10 col-start-2 text-xl lg:col-span-6 lg:col-start-5 xl:text-2xl 4xl:text-4xl [&_p]:leading-snug"
				>
					{@html strategy_text}
				</RichtextTransition>
			</div>
		{/if}

		{#if data.story.content.solution_text}
			<div class="col-span-12 grid w-full grid-cols-12 pt-16">
				<Heading
					as="h4"
					size="h6"
					class="col-span-10 col-start-2 mt-1 uppercase text-rose-50 lg:col-span-2 lg:col-start-2"
					><strong>Solution</strong></Heading
				>
				<RichtextTransition
					class="col-span-10 col-start-2 text-xl lg:col-span-6 lg:col-start-5 xl:text-2xl 4xl:text-4xl [&_p]:leading-snug"
				>
					{@html solution_text}
				</RichtextTransition>
			</div>
		{/if}
		{#if data.story.content.ask}
			<div class="col-span-12 grid w-full grid-cols-12 pb-0 pt-16">
				<ul
					class="col-span-10 col-start-2 text-[#dcf945] lg:col-span-6 lg:col-start-5 [&>*:not(:last-child)]:after:ml-2 [&>*:not(:last-child)]:after:align-super [&>*:not(:last-child)]:after:content-['•']"
				>
					{#each data.story.content.ask as item}
						<li class="mr-2 inline-block text-base xl:text-xl 4xl:text-2xl">
							<TextTransition type="words">{item}</TextTransition>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
		{#if data.story.content.output}
			<div class="col-span-12 grid w-full grid-cols-12 pt-8">
				<ul
					class="col-span-10 col-start-2 text-[#dcf945] lg:col-span-6 lg:col-start-5 [&>*:not(:last-child)]:after:ml-2 [&>*:not(:last-child)]:after:align-super [&>*:not(:last-child)]:after:content-['•']"
				>
					{#each data.story.content.output as item}
						<li class="mr-2 inline-block text-base xl:text-xl 4xl:text-2xl">
							<TextTransition type="words">{item}</TextTransition>
						</li>
					{/each}
				</ul>
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

<ScrollActionToPage
	href={`/work?slug=${data.story.slug}`}
	label={'All projects'}
	disabled={!!preview}
/>
