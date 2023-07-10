<script lang="ts">
	import { onMount } from 'svelte';
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';
	import { gsap } from 'gsap';

	export let blok: any;

	export let videoVisible = false;
	export let videoPlaying = false;
	export let btnHidden = false;
	let video!: HTMLElement;
	let btn!: HTMLElement;
	export let posterUrl = null;

	function contOnEnter(e) {
		btnHidden = false;
	}
	function contOnLeave(e) {
		btnHidden = true;
	}

	function contOnMove(e) {
		let x = e.pageX - e.currentTarget.getBoundingClientRect().left,
			y = e.pageY - e.currentTarget.getBoundingClientRect().top - window.scrollY;
		// console.log('page x : ' + e.pageX + ' - ' + 'y : ' + e.pageY);
		// console.log('x : ' + x + ' - ' + 'y : ' + y);
		gsap.to(btn, 0.2, { x: x, y: y });
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
		posterUrl = blok.poster.filename
			? blok.poster.filename
			: 'https://vumbnail.com/' + blok.id + '.jpg';
	});
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<div
		class="flex items-center justify-center my-12 video-block"
		on:mousemove={contOnMove}
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
		<!-- {#if blok.poster}{/if} -->
		<div
			class={'video-block-btn' + (videoPlaying ? ' playing' : '') + (btnHidden ? ' hidden' : '')}
			on:click={showVideo}
			bind:this={btn}
		/>
		<figure
			class={'video-block-poster' + (videoVisible ? ' inactive' : '')}
			on:click={showVideo}
			data-id={blok.id}
		>
			<img class="video-block-poster-img" src={posterUrl} alt={blok.id} />
		</figure>
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
		top: 0;
		left: 0;
		// top: 50%;
		// left: 50%;
		width: 86px;
		height: 86px;
		background: $black;
		border-radius: 100%;
		transform: translate(-50%, -50%);
		cursor: pointer;
		z-index: 13;
		transition: 0.5s opacity ease-out, 0s visibility 0.5s, 0s z-index 0.5s;

		// play
		&:before {
			display: inline-block;
			width: 0;
			height: 0;
			border-top: 7px solid transparent;
			border-bottom: 7px solid transparent;
			border-left: 12px solid $white;
			margin-left: 2px;
			content: '';
			opacity: 1;
		}

		// pause
		&:after {
			position: absolute;
			width: 10px;
			height: 18px;
			border-right: 2px solid $white;
			border-left: 2px solid $white;
			opacity: 0;
			content: '';
		}

		&.playing {
			&:before {
				opacity: 0;
			}

			&:after {
				opacity: 1;
			}
		}

		&.hidden {
			opacity: 0;
		}
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
