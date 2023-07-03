<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	import { base } from '$app/paths';
	import { Flex } from '$lib/components/layout';
	import { Heading } from '$lib/components/typography';

	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';

	export let data;

	onMount(() => {
		if (data.story) {
			useStoryblokBridge(data.story.id, (newStory) => (data.story = newStory));
		}
	});
</script>

<svelte:head>
	<title>Contact</title>
	<meta name="description" content="Contact" />
</svelte:head>

<section class="contact pt-[var(--header-height)] pb-32">
	<div class="max-w-6xl mx-auto">
		<Flex class="items-end pt-16">
			<Heading as="h2" size="h1" class="md:w-1/2">Headline Statement</Heading>
			<p class="flex-1 text-xl">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac feugiat nisl, a
				cursus orci. Pellentesque sollicitudin feugiat ipsum, eget venenatis urna mollis ac.
			</p>
		</Flex>
		<!-- <Flex class="px-24 pt-32">
			<Heading as="h2" size="h5" class="font-bold tracking-widest uppercase md:w-1/2">Email</Heading
			>
			<p class="flex-1 text-2xl">Want to say hi?</p>
		</Flex>
		<Flex class="px-24 pt-32">
			<Heading as="h2" size="h5" class="font-bold tracking-widest uppercase md:w-1/2"
				>Openings</Heading
			>
			<p class="flex-1 text-lg">CTA copy to check out openings on careers page</p>
		</Flex>
		<Flex class="px-24 pt-32">
			<Heading as="h2" size="h5" class="font-bold tracking-widest uppercase md:w-1/2"
				>Address</Heading
			>
			<p class="flex-1 text-lg">
				<strong>1387 Venables Street</strong><br />Vancouver, BC<br />Canada<br />V5L 2G1
			</p>
		</Flex>
		<Flex class="px-24 pt-32">
			<Heading as="h2" size="h5" class="w-1/2 font-bold tracking-widest uppercase">Phone</Heading>
			<p class="flex-1 text-lg">(604) 345-7363</p>
		</Flex>
		<Flex class="px-24 pt-32">
			<Heading as="h2" size="h5" class="font-bold tracking-widest uppercase md:w-1/2"
				>Social</Heading
			>
			<p class="flex-1 text-lg">...</p>
		</Flex>
		<Flex class="px-24 pt-32">
			<Heading as="h2" size="h5" class="font-bold tracking-widest uppercase md:w-1/2"
				>Acknowledgement</Heading
			>
			<p class="flex-1 text-lg">
				GFC acknowledges that rwe work and play on the unceded traditional territories of the
				<strong>xʷməθkʷəy̓əm</strong> (Musqueam), <strong>Sḵwx̱wú7mesh</strong> (Squamish), and
				<strong>səlilwətaɬ</strong>
				(Tsleil-Waututh) Nations.
			</p>
		</Flex> -->
	</div>
</section>

<section class="contact">
	<div class="max-w-6xl mx-auto">
		{#if data.story}
			<StoryblokComponent blok={data.story.content} />
		{/if}
	</div>
</section>

<style lang="scss">
	@import '../../vars.scss';

	.contact {
		:global(.heading-richtext-2col .title) {
			// color: #929292;
		}
		:global(.heading-richtext-2col .text) {
			color: #929292;
		}
	}
</style>
