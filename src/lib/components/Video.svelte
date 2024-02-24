<script lang="ts">
	import { cva } from 'class-variance-authority';
	import { onDestroy, onMount } from 'svelte';
	import { inview } from 'svelte-inview';

	import { cls } from '$lib/styles';
	import gsap from '$lib/gsap';
	import { Image } from '$lib/components';
	import { cursorType } from '$lib/stores';
	import { useTransitionReady } from '$lib/utils/useTransitionReady';

	let clazz: string = '';
	export { clazz as class };
	export let videoID: string = '';
	export let videoUrl: string = '';
	export let videoUrlMobile: string = '';
	export let posterUrl: string = '';
	export let name: string = '';
	export let autoplay: boolean = false;
	export let animated: boolean = true;
	export let loop: boolean = false;
	export let muted: boolean = false;

	let videoVisible = autoplay;
	let videoPlaying = autoplay;
	let tl: any = null;

	let videoContainer!: HTMLElement;
	let videoPlayer!: HTMLVideoElement;

	$: innerWidth = 0;
	$: offsetWidth = 0;

	let touchCapability: number = 0;

	const variants = cva('relative w-full h-full z-[11] cursor-pointer', {
		variants: {
			visible: {
				true: '',
				false: 'invisible opacity-0 z-[9]'
			}
		},
		defaultVariants: {
			visible: false
		}
	});

	function activate() {
		if (autoplay) return;

		cursorType.set(videoPlaying ? 'pause' : 'play');
	}

	function deactivate() {
		if (autoplay) return;

		cursorType.set('none');
	}

	function showVideo() {
		if (!videoVisible) {
			videoVisible = true;
			if (videoPlayer) {
				videoPlayer.play();
				cursorType.set('pause');
			}
			videoPlaying = true;
		} else {
			playPauseVideo();
		}
	}

	function playPauseVideo() {
		if (videoPlayer.paused) {
			videoPlayer.play();
			cursorType.set('pause');
		} else {
			videoPlayer.pause();
			cursorType.set('play');
		}

		videoPlaying = !videoPlaying;
	}

	onMount(() => {
		// 0 - no touch (pointer/mouse only)
		// 1 - touch-only device (like a phone)
		// 2 - device can accept touch input and mouse/pointer (like Windows tablets)
		touchCapability =
			window.matchMedia && window.matchMedia('(hover: none), (pointer: coarse)').matches
				? 1
				: 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
					? 2
					: 0;

		gsap.set(videoContainer, { clipPath: 'inset(0)' });
	});

	useTransitionReady(() => {
		let mm = gsap.matchMedia();
		const clipPath = (2 / 12) * 100;
		const scale = offsetWidth / innerWidth;

		tl = gsap.timeline();

		if (animated) {
			mm.add(
				'(min-width: 800px)',
				() => {
					tl.from(videoContainer, {
						clipPath: `inset(${clipPath}%)`,
						scale,
						duration: 1,
						scrollTrigger: {
							trigger: videoContainer,
							scrub: true,
							start: 'top top%',
							end: 'bottom 90%'
						}
					});
				},
				videoContainer
			);
		}
	});

	onDestroy(() => {
		if (tl) {
			tl.kill();
			tl = null;
		}
	});

	const inViewPlayer = ({ detail }: CustomEvent<ObserverEventDetails>) => {
		const { inView } = detail as ObserverEventDetails;

		if (inView) {
			if (autoplay) {
				videoPlayer.play();
			}
		} else {
			if (videoVisible) {
				videoPlayer.pause();
				if (!autoplay) {
					videoPlaying = false;
				}
			}
		}
	};
</script>

<svelte:window bind:innerWidth />

<div class={cls('h-full w-full', clazz)} use:inview on:inview_change={inViewPlayer}>
	<div class="grid w-full grid-cols-12">
		<div class="col-span-10 col-start-2" bind:offsetWidth />
	</div>
	<div
		bind:this={videoContainer}
		class={cls('relative flex w-full items-center justify-center', !autoplay && 'cursor-pointer')}
		on:mouseenter={activate}
		on:mouseleave={deactivate}
		role="group"
	>
		{#if videoID && !videoUrl}
			<iframe
				class="video-block-iframe"
				src="https://player.vimeo.com/video/{videoID}?h=0041aac5ea&title=0&byline=0&portrait=0"
				width="640"
				height="360"
				frameborder="0"
				allow="autoplay; fullscreen; picture-in-picture"
				allowfullscreen
				title={name}
			/>
		{:else if videoUrl}
			<video
				preload="metadata"
				class={cls(!autoplay && posterUrl && 'absolute z-10', 'h-auto w-full')}
				src={innerWidth < 768 && videoUrlMobile !== '' ? videoUrlMobile : videoUrl}
				bind:this={videoPlayer}
				poster=""
				on:click={playPauseVideo}
				playsinline
				{autoplay}
				loop={autoplay ? true : loop}
				muted={autoplay ? true : muted}
			/>
		{/if}
		{#if !autoplay && posterUrl}
			<div
				class={cls(variants({ visible: !videoVisible }), 'c-video__poster')}
				on:click={showVideo}
				role="presentation"
			>
				<Image class="relative h-auto w-full" src={posterUrl} alt={name} {animated} />
			</div>
		{/if}
		{#if !autoplay && touchCapability === 1 && !videoVisible}
			<div
				class="absolute inset-0 z-20 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
				on:click={showVideo}
			>
				<button
					type="button"
					class="flex h-[64px] w-[64px] origin-center items-center justify-center transition duration-300 ease-out"
				>
					<div
						class="z-1 flex h-full w-full origin-center items-center justify-center rounded-[100%] bg-yellow-350"
					>
						<div
							class="ml-0.5 inline-block h-0 w-0 origin-center transform cursor-pointer border-y-[7px] border-l-[12px] border-solid border-y-transparent border-l-black content-['']"
						></div>
					</div>
				</button>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.c-video__poster {
		transition:
			0.5s opacity ease-out,
			0s visibility 0.5s,
			0s z-index 0.5s;
	}
</style>
