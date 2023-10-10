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

<section class="project-header pt-20 3xl:pt-24 relative text-white">
	<div class="grid h-full grid-cols-12 py-16">
		<div class="flex flex-col justify-between col-span-10 col-start-2 md:flex-col">
			<div class="flex flex-row md:flex-col">
				<div
					class="grid w-[60%] md:w-full grid-cols-12 gap-8 mx-auto lg:gap-0 lg:w-[60%] pb-8 md:pb-0"
				>
					{#if data.story.content.client}
						<div class="col-span-2 col-start-1 lg:col-start-1 lg:col-span-3">
							<h5 class="mb-2 text-sm font-bold tracking-wide uppercase">Client</h5>
							{data.story.content.client}
						</div>
					{/if}
					{#if data.story.content.solutions}
						<div class="col-span-2 col-start-4 lg:col-start-4 lg:col-span-3">
							<h5 class="mb-2 text-sm font-bold tracking-wide uppercase">Solutions</h5>
							<ul class="leading-loose">
								{#each data.story.content.solutions as item}
									<li>{item}</li>
								{/each}
							</ul>
						</div>
					{/if}
					{#if data.story.content.roles}
						<div class="col-span-2 col-start-1 lg:col-start-7 lg:col-span-3">
							<h5 class="mb-2 text-sm font-bold tracking-wide uppercase">Roles</h5>
							<ul class="leading-loose">
								{#each data.story.content.roles as item}
									<li>{item}</li>
								{/each}
							</ul>
						</div>
					{/if}
					{#if data.story.content.deliverables}
						<div class="col-span-2 col-start-4 lg:col-start-10 lg:col-span-3">
							<h5 class="mb-2 text-sm font-bold tracking-wide uppercase">Deliverables</h5>
							<ul class="leading-loose">
								{#each data.story.content.deliverables as item}
									<li>{item}</li>
								{/each}
							</ul>
						</div>
					{/if}
				</div>
				<figure
					class="w-[40%] h-full col-span-3 col-start-10 lg:col-start-9 lg:col-span-4 md:hidden translate-x-[25%]"
				>
					{#if data.story.content.thumbnail}
						<img
							class="object-cover w-full h-full"
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
				<div class="w-full mx-auto mt-12 leading-loose md:text-center md:w-2/3">
					{@html description}
				</div>
			{/if}
		</div>
		<figure
			class="absolute w-1/4 h-auto col-span-3 col-start-10 lg:col-start-9 lg:col-span-4 pb-[50%] hidden md:block"
		>
			{#if data.story.content.thumbnail}
				<div class="absolute w-full h-full">
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

	<ScrollActionToPage href={"/work"} label={"All projects"} />
</section>

<style lang="scss">
	@import '../../../vars.scss';
	.project-header {
		@media (min-width: $media-md) {
			height: 100vh;
		}
	}
</style>
