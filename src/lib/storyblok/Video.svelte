<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { storyblokEditable } from '@storyblok/svelte';

	import { CustomCursor } from '$lib/components';
	import { gsap } from '$lib/gsap';

	let tl: any = null;
	export let blok: any;
	export let videoVisible = false;
	export let videoPlaying = false;
	export let btnHidden = true;
	export let posterUrl = null;

	let videoContainer!: HTMLElement;
	let video!: HTMLElement;

	$: innerWidth = 0;
	$: offsetWidth = 0;

	function contOnEnter(e) {
		btnHidden = false;
	}

	function contOnLeave(e) {
		btnHidden = true;
	}

	function showVideo() {
		if (!videoVisible) {
			videoVisible = true;
			if (video) video.play();
			videoPlaying = true;
		} else {
			playPauseVideo();
		}
	}

	function playPauseVideo() {
		// let player = e.currentTarget;

		if (video.paused) {
			video.play();
		} else video.pause();

		videoPlaying = !videoPlaying;
	}

	onMount(() => {
		posterUrl =
			blok.poster && blok.poster.filename
				? blok.poster.filename
				: 'https://vumbnail.com/' + blok.id + '.jpg';

		const scale = offsetWidth / innerWidth;

		tl = gsap.timeline();

		if (blok.animated) {
			tl.from(videoContainer, {
				scale,
				duration: 1,
				scrollTrigger: {
					trigger: videoContainer,
					scrub: true,
					start: 'top top%',
					end: 'bottom 90%'
				}
			});
		}
	});

	onDestroy(() => {
		if (tl) {
			tl.kill();
			tl = null;
		}
	});
</script>

<svelte:window bind:innerWidth />

<div use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<div class="grid grid-cols-12">
		<div class="col-start-2 col-span-10" bind:offsetWidth />
	</div>
	<div
		bind:this={videoContainer}
		class="flex items-center justify-center video-block cursor-pointer"
		on:mouseenter={contOnEnter}
		on:mouseleave={contOnLeave}
		data-id={blok.id}
	>
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
				src={blok.file}
				playsinline=""
				bind:this={video}
				webkit-playsinline=""
				poster=""
				on:click={playPauseVideo}
			/>
		{/if}

		<figure
			class={'video-block-poster' + (videoVisible ? ' inactive' : '')}
			on:click={showVideo}
			data-id={blok.id}
		>
			<img class="video-block-poster-img" src={posterUrl} alt={blok.id} />
		</figure>
	</div>
	<CustomCursor isHidden={btnHidden} cursorType={videoPlaying ? 'pause' : 'play'} />
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

	.video-block-poster {
		position: relative;
		width: 100%;
		height: 100%;
		z-index: 11;
		cursor: pointer;
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
