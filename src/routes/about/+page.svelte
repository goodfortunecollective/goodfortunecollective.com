<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	import { base } from '$app/paths';
	import { Flex } from '$lib/components/layout';
	import { Heading } from '$lib/components/typography';

	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';
	import Link from '$lib/components/layout/Link.svelte';

	export let data;

	onMount(() => {
		if (data.story) {
			useStoryblokBridge(data.story.id, (newStory) => (data.story = newStory));
		}
	});
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About" />
</svelte:head>

<section class="about pt-[var(--header-height)] pb-32">
	<!--h-1/2 -->
	{#if data.story}
		<StoryblokComponent blok={data.story.content} />
	{/if}
</section>
<section>
	<!-- <img src="{base}/img/good-fortune-collective-circle.png" alt="Good Fortune Collective" /> -->
</section>
<section class="max-w-6xl mx-auto">
	<div class="flex flex-col items-stretch gap-12 px-8 pt-16 pb-8 lg:flex-row">
		<div class="flex items-center flex-1 text-2xl">
			<div class="pt-0 text lg:pt-24">
				Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
			</div>
		</div>
		<div class="flex flex-col justify-between space md:w-1/2">
			<Heading as="h2" size="h1" class="text-9xl">Join us</Heading>
			<div class="mt-8">
				<Link href={{ url: base + '/careers/' }} label="We're good people" class="mt-8" />
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	@import '../../vars.scss';

	.about {
		:global(.image-block:after) {
			position: absolute;
			top: 0;
			right: 0;
			width: 90px;
			height: 90px;
			background: url('/img/good-fortune-collective-circle.png');
			background-size: cover;
			transform: translate(50%, -50%);
			z-index: 20;
			content: '';
		}

		@media (min-width: $media-md) {
			:global(.image-block:after) {
				width: 180px;
				height: 180px;
			}
		}
	}

	.text {
		color: #929292;
	}
</style>
