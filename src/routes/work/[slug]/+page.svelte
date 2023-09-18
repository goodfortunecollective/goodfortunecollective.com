<script lang="ts">
	import { Body } from 'svelte-body';
	import { onMount, onDestroy, getContext } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent, renderRichText } from '@storyblok/svelte';

	import { base } from '$app/paths';
	import { goto } from '$app/navigation';

	import { Heading, HoverPlane } from '$lib/components';
	import gsap from '$lib/gsap';

	export let data;

	let tl: any = null;
	let scrollBottomContainerEl: HTMLElement;
	let scrollBottomEl: HTMLElement;
	let scrollProgressBottomEl: HTMLElement;

	$: description = renderRichText(data.story.content.description);

	const preview = getContext('storyblok-preview');

	let isExit = false;

	onMount(() => {
		if (data.story) {
			useStoryblokBridge(data.story.id, (newStory) => (data.story = newStory));
		}

		// debug
		return;

		// avoid auto navigation animation on Storyblok preview
		if (preview) return;

		tl = gsap.timeline();

		tl.fromTo(
			scrollBottomEl,
			{ y: 0 },
			{
				y: '-=300',
				scrollTrigger: {
					trigger: scrollBottomContainerEl,
					end: 'top center',
					scrub: 0.5
				},
				onComplete: () => {
					if (isExit) return;

					gsap.to(scrollBottomEl, {
						opacity: 0,
						onComplete: () => {
							goto(`${base}/work`);
						}
					});

					isExit = true;
				}
			}
		);

		tl.fromTo(
			scrollProgressBottomEl,
			{ scaleY: 0 },
			{
				scaleY: 1,
				scrollTrigger: {
					trigger: scrollBottomEl,
					end: 'center center',
					scrub: 0.5
				}
			}
		);
	});

	onDestroy(() => {
		if (tl) {
			tl.kill();
			tl = null;
		}
	});

	// title hover
	let isTitleHovered = false as boolean;
</script>

<Body class="work-page" />

<section class="project-header py-[var(--header-height)] relative text-white">
	<div class="grid h-full grid-cols-12 pt-16 pb-16">
		<div class="flex flex-col justify-between col-span-10 col-start-2 md:flex-col">
			<div class="flex flex-row md:flex-col ">
				<div class="grid w-[60%] md:w-full grid-cols-12 gap-8 mx-auto lg:gap-0 lg:w-[60%] pb-8 md:pb-0">
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
				<figure class="w-[40%] h-full col-span-3 col-start-10 lg:col-start-9 lg:col-span-4 md:hidden translate-x-[25%]">
					{#if data.story.content.thumbnail}
					<img
					class="object-cover w-full h-full"
						src={data.story.content.thumbnail
							? data.story.content.thumbnail.filename.replace('//a-us.storyblok.com', '//a2-us.storyblok.com')
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
				<Heading as="h1" size="h1" class="mt-6 md:text-center" animated={true}
					>{data.story.name}</Heading
				>
			</div>

			{#if data.story.content.description}
				<div class="w-full mx-auto mt-12 leading-loose md:text-center md:w-2/3">
					{@html description}
				</div>
			{/if}
		</div>
		<figure class="absolute w-1/4 h-auto col-span-3 col-start-10 lg:col-start-9 lg:col-span-4 pb-[50%] hidden md:block">
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
	<div bind:this={scrollBottomContainerEl} class=" mt-72 pb-[100vh]">
		<div
			bind:this={scrollBottomEl}
			class="flex flex-col items-center justify-center gap-8 text-center"
		>
			<p class="font-medium tracking-widest uppercase">Scroll</p>
			<div class="w-px h-48 bg-gray-100">
				<div bind:this={scrollProgressBottomEl} class="h-full origin-top bg-black" />
			</div>
			<span class="font-degular-display leading-8 text-[10em]">All projects</span>
		</div>
	</div>
</section>

<style lang="scss">
	@import '../../../vars.scss';
	.project-header {
		@media (min-width: $media-md) {
			height: 100vh;
		}
	}
</style>
