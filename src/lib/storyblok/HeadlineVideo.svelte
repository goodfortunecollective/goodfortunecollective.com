<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { storyblokEditable } from '@storyblok/svelte';

	import { BackgroundTheme } from '$lib/components';
	import gsap, { SplitText } from '$lib/gsap';
	import { clamp } from '$lib/utils/maths';
	import { useTransitionReady } from '$lib/utils/useTransitionReady';
	import { cursorType } from '$lib/stores';
	import { cls } from '$lib/styles';

	export let blok: any;

	let ctx: any = null;

	let videoContainer!: HTMLElement;
	let video!: HTMLElement;
	let videoPlayer!: HTMLElement;
	let line!: HTMLElement;
	let container!: HTMLElement;

	let videoPlaying = blok.autoplay;

	// avoid division by 0
	let scrollPosition: number = 0;
	let videoBBox: DOMRect | undefined;
	let splitTexts: any[] = [];

	let isScrollFullVideo = false;
	let isCursorEnter = false;

	interface DOMPosition {
		x: number;
		y: number;
	}

	$: videoTransformEffect = 0;
	$: innerWidth = 0;
	$: innerHeight = 0;

	$: videoRotation = {
		x: 0,
		y: 0
	} as DOMPosition;

	const mousePosition: DOMPosition = {
		x: 0,
		y: 0
	};

	const onResize = () => {
		scrollPosition = window.pageYOffset;
		if (video) {
			videoBBox = video.getBoundingClientRect();
		}
	};

	const onScroll = (event: any) => {
		scrollPosition = event.detail.scrollTop;
	};

	const onMouseMove = (event: MouseEvent) => {
		mousePosition.x = event.clientX;
		mousePosition.y = event.clientY;
	};

	const onRender = () => {
		videoTransformEffect =
			innerWidth > 768
				? clamp(scrollPosition / (innerHeight * 0.5), 0, 1)
				: clamp(scrollPosition / (innerHeight * 0.5), 0.5, 1);

		// bail if translation is almost complete
		if (videoTransformEffect >= 0.99) {
			videoRotation.x = 0;
			videoRotation.y = 0;
			return;
		}

		videoRotation.x =
			(1 - videoTransformEffect) * (-(mousePosition.y - videoBBox.y - videoBBox.height / 2) / 100);
		videoRotation.y =
			(1 - videoTransformEffect) * ((mousePosition.x - videoBBox.x - videoBBox.width / 2) / 100);
	};

	onMount(() => {
		const splitText = gsap.utils.toArray('[data-gsap="split-text"]');

		splitText.forEach((content) => {
			const text = new SplitText(content, {
				type: 'lines,words,chars',
				linesClass: 'split-line',
				charClass: 'split-char'
			});

			splitTexts.push(text);
		});

		splitTexts.forEach((text) => {
			gsap.set(text.chars, { yPercent: 200, opacity: 0 });
		});
	});

	useTransitionReady(
		() => {
			window.addEventListener('onLenisUpdate', onScroll);
			gsap.ticker.add(onRender);
			onResize();

			ctx = gsap.context(() => {
				gsap.timeline({
					scrollTrigger: {
						trigger: container,
						start: '=+50%',
						end: '=+100%',
						onUpdate: (self) => {
							if (self.progress === 0) {
								cursorType.set('none');
								isScrollFullVideo = false;
							}
						},
						onEnter: () => {
							if (isCursorEnter) {
								cursorType.set('play');
							}

							isScrollFullVideo = true;
						},
						onLeave: () => {
							cursorType.set('none');
							isScrollFullVideo = false;
						}
					}
				});

				gsap.timeline({
					scrollTrigger: {
						trigger: container,
						start: 'center 50%',
						end: '+=150% bottom',
						scrub: true,
						pin: true
					}
				});

				const tlSplitText = gsap.timeline({
					scrollTrigger: {
						trigger: videoContainer,
						start: 'center 55%',
						end: 'center 30%',
						toggleActions: 'play reverse play reverse' // onEnter onLeave onEnterBack onLeaveBack
					}
				});
				tlSplitText.addLabel('start');

				splitTexts.forEach((text) => {
					gsap.set(text.chars, { opacity: 1 });
					tlSplitText.to(
						text.chars,
						{
							duration: 0.2,
							ease: 'circ.out',
							yPercent: 0,
							delay: 0.5,
							stagger: 0.01
						},
						'start'
					);
				});

				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: videoContainer,
						start: 'center 55%',
						end: 'center 30%',
						toggleActions: 'play reverse play reverse' // onEnter onLeave onEnterBack onLeaveBack
					}
				});
				tl.addLabel('start');

				tl.from(
					line,
					{
						duration: 0.8,
						scaleX: 0,
						transformOrigin: 'right center',
						ease: 'back'
					},
					'start'
				);
			}, container);
		},
		() => {
			window.removeEventListener('onLenisUpdate', onScroll);
			gsap.ticker.remove(onRender);
		}
	);

	function videoPreviewOnEnter() {
		if (isScrollFullVideo) {
			cursorType.set('play');
		}
		isCursorEnter = true;
	}

	function videoPreviewOnLeave() {
		isCursorEnter = false;
		cursorType.set('none');
	}

	function startVideo() {
		if (isScrollFullVideo) {
			videoPlayer.src = blok.video;
			cursorType.set('pause');
			videoPlaying = true;
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
	}

	onDestroy(() => {
		if (ctx) ctx.revert();
	});
</script>

<svelte:window bind:innerWidth bind:innerHeight on:mousemove={onMouseMove} on:resize={onResize} />

<section use:storyblokEditable={blok} {...$$restProps} class="grid h-screen grid-cols-12">
	<div class="relative col-span-10 col-start-2 h-full w-full" bind:this={container}>
		<div class="perspective-800 relative z-[9] h-full w-full" bind:this={videoContainer}>
			<div
				bind:this={video}
				class={cls(
					'preserve-3d absolute mt-[20vh] h-full w-full transform-gpu md:mt-[7vh]',
					'b-headline-video__container',
					videoTransformEffect >= 0.99 && 'cursor-pointer'
				)}
				style="--video-effect: {videoTransformEffect}; --rotation-x: {videoRotation.x}deg; --rotation-y: {videoRotation.y}deg"
			>
				<video
					bind:this={videoPlayer}
					on:click={videoPlaying ? playPauseVideo : startVideo}
					on:mouseenter={videoPreviewOnEnter}
					on:mouseleave={videoPreviewOnLeave}
					class="aspect-portrait w-full rounded-3xl"
					src={blok.videoPreview}
					autoplay={true}
					loop={true}
					muted={!videoPlaying}
				>
					<track kind="captions" />
				</video>
			</div>
		</div>

		<div
			class="title-cont pointer-events-none absolute left-0 top-0 flex h-full w-full items-start"
		>
			<div class="flex h-full flex-col justify-between py-[15vh]">
				<h1
					data-gsap="split-text"
					class={cls(
						'z-[8] max-w-7xl font-degular-display leading-tightest tracking-wide text-neutral-950',
						'b-headline-video__title'
					)}
				>
					{blok.headline}
				</h1>
				<h2
					data-gsap="split-text"
					class="z-10 mb-[5vh] max-w-2xl font-degular-display text-4xl text-white md:text-6xl lg:max-w-2xl"
				>
					{blok.subheadline}
				</h2>
			</div>
		</div>

		<div
			class="pointer-events-none absolute left-0 top-0 z-10 flex h-full w-full items-center justify-end"
		>
			<div class="relative mr-[15vw] w-full max-w-xs">
				<div class="absolute inline-flex w-full items-center justify-center gap-4">
					<hr bind:this={line} class="h-px w-32" />
					<div class="w-[10rem] text-xs uppercase text-white" data-gsap="split-text">
						<h3 class="leading-3"><strong data-gsap="split-text">{blok.description}</strong></h3>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
<div class="h-[100vh]" />
<BackgroundTheme startColor="#1a1a1a" endColor="#fff" startTheme="dark" endTheme="light" />
<div class="h-[50vh]" />

<style lang="scss">
	.b-headline-video {
		&__container {
			// prettier-ignore
			transform:
				scale3d(
					calc(0.25 + var(--video-effect) * 0.75),
					calc(0.25 + var(--video-effect) * 0.75),
					1
				)
				rotateX(var(--rotation-x))
				rotateY(var(--rotation-y));
			// opacity: calc(0.5 + var(--video-effect) * 2);
		}
		&__title {
			-webkit-text-stroke: 1px white;
			// text-shadow: -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white;
			font-size: clamp(64px, calc(80px + (220 - 80) * (100vw - 768px) / (1920 - 768)), 280px);

			//font-size: clamp(16px, calc(20px + (36 - 20) * (100vw - 768px) / (1920 - 768)), 48px);

			// This text has a font size of 20px at viewport width of 768px
			// font size of 36px when viewport width is 1920px.
			// But if the viewport width is less than 768px,
			// the font-size won't get lower than 16px
			// the viewport width is more than 1920px font size will stop scaling at 48px.
		}
	}
</style>
