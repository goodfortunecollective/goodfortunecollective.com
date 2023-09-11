<script lang="ts">
	import { onMount, onDestroy, getContext } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent, renderRichText } from '@storyblok/svelte';

	import { base } from '$app/paths';
	import { goto } from '$app/navigation';

	import { Heading } from '$lib/components';
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
</script>

<section class="pt-[var(--header-height)] bg-black text-white">
	<div class="grid grid-cols-12 pt-16 pb-16">
		<div class="col-span-8 col-start-2 lg:col-start-2 lg:col-span-6">
			<div class="grid grid-cols-12 gap-8 lg:gap-0">
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
			<Heading as="h1" size="h1" class="mt-6" animated={true}>{data.story.name}</Heading>
			{#if data.story.content.description}
				<div class="w-full mt-12 leading-loose md:w-2/3">
					{@html description}
				</div>
			{/if}
		</div>
		<figure class="col-span-3 col-start-10 lg:col-start-10 lg:col-span-3">
			{#if data.story.content.thumbnail}
				<div class="relative w-full h-full">
					<img
						src={data.story.content.thumbnail.filename}
						class="absolute inset-0 object-cover object-top w-full h-full"
						alt={data.story.content.title}
					/>
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
