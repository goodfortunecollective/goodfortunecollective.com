<script lang="ts">
	import { Heading } from '$lib/components/typography';

	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

	export let blok: any;
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<div class="flex items-center justify-center my-12 video-block">
		<iframe
			src="https://player.vimeo.com/video/{blok.id}?h=0041aac5ea&title=0&byline=0&portrait=0"
			width="640"
			height="360"
			frameborder="0"
			allow="autoplay; fullscreen; picture-in-picture"
			allowfullscreen
		/>
		<!-- <video src="https://player.vimeo.com/{blok.id}" /> -->
		<!-- <video id="video-home-overlay" class="video-player" src="https://player.vimeo.com/progressive_redirect/playback/{blok.id}/rendition/1080p/file.mp4?loc=external&amp;signature=4fdebc546d37b98a3c1f0e6b7f04ed9786fb0b897a6f6af5717bfcab853df482" playsinline="" webkit-playsinline="" poster=""></video> -->
	</div>
</div>

<style lang="scss">
	// @import '../../vars.scss';
</style>
