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

<section class="about">
	{#if data.story}
		<StoryblokComponent blok={data.story.content} />
	{/if}
</section>

<style lang="scss">
	@import '../../vars.scss';

	// .about {
	// 	:global(.images-block) {
	// 		margin-top: 6rem;
	// 	}
	// 	:global(.image-block:after) {
	// 		position: absolute;
	// 		top: 0;
	// 		right: 0;
	// 		width: 90px;
	// 		height: 90px;
	// 		background: url('/img/good-fortune-collective-circle.png');
	// 		background-size: cover;
	// 		transform: translate(50%, -50%);
	// 		z-index: 20;
	// 		content: '';
	// 	}

	// 	@media (min-width: $media-md) {
	// 		:global(.images-block) {
	// 			justify-content: flex-start;
	// 			margin-top: 8rem;
	// 		}
	// 		:global(.image-block) {
	// 			width: 83%;
	// 		}
	// 		:global(.image-block-img) {
	// 			width: 100%;
	// 			max-width: initial;
	// 		}
	// 		:global(.image-block:after) {
	// 			width: 180px;
	// 			height: 180px;
	// 		}
	// 	}
	// }

	// .text {
	// 	color: #929292;
	// }
</style>
