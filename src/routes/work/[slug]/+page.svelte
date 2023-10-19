<script lang="ts">
	import { Body } from 'svelte-body';
	import { onMount, getContext } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent, renderRichText } from '@storyblok/svelte';

	import { Heading, HoverPlane, ScrollActionToPage } from '$lib/components';

	export let data;

	// title hover
	let isTitleHovered = false as boolean;

	$: description = renderRichText(data.story.content.description);

	const preview = getContext('storyblok-preview');

	onMount(() => {
		if (data.story) {
			useStoryblokBridge(data.story.id, (newStory) => (data.story = newStory));
		}
	});
</script>

<Body class="work-page" />

<section class="project-header relative pt-20 text-white 3xl:pt-24">
	<div class="grid h-full grid-cols-12 py-16">
		<div class="col-span-10 col-start-2 flex flex-col justify-between md:flex-col">
			<div class="flex flex-row md:flex-col">
				<div
					class="mx-auto grid w-[60%] grid-cols-12 gap-8 pb-8 md:w-full md:pb-0 lg:w-[60%] lg:gap-0"
				>
					{#if data.story.content.client}
						<div class="col-span-2 col-start-1 lg:col-span-3 lg:col-start-1">
							<h5 class="mb-2 text-sm font-bold uppercase tracking-wide">Client</h5>
							{data.story.content.client}
						</div>
					{/if}
					{#if data.story.content.solutions}
						<div class="col-span-2 col-start-4 lg:col-span-3 lg:col-start-4">
							<h5 class="mb-2 text-sm font-bold uppercase tracking-wide">Solutions</h5>
							<ul class="leading-loose">
								{#each data.story.content.solutions as item}
									<li>{item}</li>
								{/each}
							</ul>
						</div>
					{/if}
					{#if data.story.content.roles}
						<div class="col-span-2 col-start-1 lg:col-span-3 lg:col-start-7">
							<h5 class="mb-2 text-sm font-bold uppercase tracking-wide">Roles</h5>
							<ul class="leading-loose">
								{#each data.story.content.roles as item}
									<li>{item}</li>
								{/each}
							</ul>
						</div>
					{/if}
					{#if data.story.content.deliverables}
						<div class="col-span-2 col-start-4 lg:col-span-3 lg:col-start-10">
							<h5 class="mb-2 text-sm font-bold uppercase tracking-wide">Deliverables</h5>
							<ul class="leading-loose">
								{#each data.story.content.deliverables as item}
									<li>{item}</li>
								{/each}
							</ul>
						</div>
					{/if}
				</div>
				<figure
					class="col-span-3 col-start-10 h-full w-[40%] translate-x-[25%] md:hidden lg:col-span-4 lg:col-start-9"
				>
					{#if data.story.content.thumbnail}
						<img
							class="h-full w-full object-cover"
							src={data.story.content.thumbnail
								? data.story.content.thumbnail.filename.replace(
										'//a-us.storyblok.com',
										'//a2-us.storyblok.com'
								  )
								: 'https://source.unsplash.com/random/?Motion&1'}
							data-sampler="planeTexture"
							alt={data.story.content.title}
						/>
					{/if}
				</figure>
			</div>
			<div
				on:mouseenter={() => (isTitleHovered = true)}
				on:mouseleave={() => (isTitleHovered = false)}
			>
				<Heading as="h1" size="h1" class="mt-6 md:text-center" animated={false}
					>{data.story.name}</Heading
				>
			</div>

			{#if data.story.content.description}
				<div class="mx-auto mt-12 w-full leading-loose md:w-2/3 md:text-center">
					{@html description}
				</div>
			{/if}
		</div>
		<figure
			class="pointer-events-none absolute left-[50%] col-span-3 col-start-10 hidden h-auto w-1/4 -translate-x-1/2 pb-[50%] md:block lg:col-span-4 lg:col-start-9"
		>
			{#if data.story.content.thumbnail}
				<div class="absolute h-full w-full">
					<HoverPlane content={data.story.content} {isTitleHovered} />
				</div>
			{/if}
		</figure>
	</div>
</section>
<section>
	{#if data.story}
		<StoryblokComponent blok={data.story.content} />
	{/if}

	<ScrollActionToPage href={'/work'} label={'All projects'} />
</section>

<style lang="scss">
	@import '../../../vars.scss';
	.project-header {
		@media (min-width: $media-md) {
			height: 100vh;
		}
	}
</style>
