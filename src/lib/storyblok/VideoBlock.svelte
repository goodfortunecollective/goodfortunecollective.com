<script lang="ts">
	import { Heading } from '$lib/components/typography';

	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

	export let blok: any;
	// console.log(blok);

	export let videoVisible = false;

	function showVideo(e) {
		videoVisible = true;
		let id = e.currentTarget.getAttribute('data-id');
		let videoPlayer = document.getElementById('video-player-' + id);
		if (videoPlayer) videoPlayer.play();
	}

	function playPauseVideo(e) {
		let player = e.currentTarget;

		if (player.paused) {
			player.play();
		} else player.pause();
	}
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<div class="flex items-center justify-center my-12 video-block">
		{#if blok.id && !blok.file}
			<iframe
				class="video-block-iframe"
				src="https://player.vimeo.com/video/{blok.id}?h=0041aac5ea&title=0&byline=0&portrait=0"
				width="640"
				height="360"
				frameborder="0"
				allow="autoplay; fullscreen; picture-in-picture"
				allowfullscreen
			/>
		{:else if blok.file}
			<video
				class="video-player"
				id={'video-player-' + blok.id}
				src={blok.file}
				playsinline=""
				webkit-playsinline=""
				poster=""
				on:click={playPauseVideo}
			/>
		{/if}
		{#if blok.poster}
			<div
				class={'video-block-btn' + (videoVisible ? ' inactive' : '')}
				on:click={showVideo}
				data-id={blok.id}
			/>
			<figure
				class={'video-block-poster' + (videoVisible ? ' inactive' : '')}
				on:click={showVideo}
				data-id={blok.id}
			>
				<img class="video-block-poster-img" src={blok.poster.filename} alt="" />
			</figure>
			<!-- content here -->
		{/if}
	</div>
</div>

<style lang="scss">
	@import '../../vars.scss';

	.video-block {
		position: relative;
	}

	.video-player {
		position: absolute;
		width: 100%;
		height: auto;
		z-index: 10;
	}

	.video-block-btn {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		top: 50%;
		left: 50%;
		width: 86px;
		height: 86px;
		background: $black;
		border-radius: 100%;
		transform: translate(-50%, -50%);
		cursor: pointer;
		z-index: 13;
		transition: 0.5s opacity ease-out, 0s visibility 0.5s, 0s z-index 0.5s;

		&:after {
			display: inline-block;
			width: 0;
			height: 0;
			border-top: 7px solid transparent;
			border-bottom: 7px solid transparent;
			border-left: 12px solid $white;
			margin-left: 2px;
			content: '';
		}
	}

	.video-block-poster {
		position: relative;
		width: 100%;
		height: 100%;
		z-index: 11;
		cursor: pointer;
	}

	.video-block-btn,
	.video-block-poster {
		transition: 0.5s opacity ease-out, 0s visibility 0.5s, 0s z-index 0.5s;
		&.inactive {
			visibility: hidden;
			opacity: 0;
			z-index: 9;
		}
	}

	.video-block-poster-img {
		position: relative;
		width: 100%;
		height: auto;
	}
</style>
