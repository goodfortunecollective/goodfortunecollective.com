<script lang="ts">
	import { onMount } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';

	import { base } from '$app/paths';
	import { Link, Heading } from '$lib/components';

	export let data;

	onMount(() => {
		if (data.story) {
			useStoryblokBridge(data.story.id, (newStory) => (data.story = newStory));
		}
	});
</script>

<section class="about pb-32">
	{#if data.story}
		<StoryblokComponent blok={data.story.content} />
	{/if}
</section>
<section class="grid grid-cols-12 mb-2 gap-8 lg:gap-0">
	<div class="col-start-2 lg:col-start-2 col-span-10 lg:col-span-4">
		<div class="pt-0 text-2xl 4xl:text-3xl lg:pt-24">
			Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
		</div>
	</div>
	<div class="col-start-2 lg:col-start-7 col-span-10 lg:col-span-4">
		<Heading as="h2" size="h1" class="text-9xl">Join Us Subheadline</Heading>
		<div class="mt-8">
			<Link href={base + '/careers/'} label="We're good people" class="mt-8" />
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
