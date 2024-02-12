<script lang="ts">
	import { onMount } from 'svelte';
	import { storyblokEditable } from '@storyblok/svelte';
	import type { ObserverEventDetails } from 'svelte-inview';
	import { inview } from 'svelte-inview';

	import { BackgroundTheme } from '$lib/components';
	import gsap, { SplitText } from '$lib/gsap';
	import { clamp } from '$lib/utils/maths';
	import { useTransitionReady } from '$lib/utils/useTransitionReady';
	import { cursorType } from '$lib/stores';
	import { cls } from '$lib/styles';
	import { lenisStore as lenis } from '$lib/stores/lenis';
	import { beforeNavigate } from '$app/navigation';

	export let blok: any;

	let ctx: any = null;

	let touchCapability: number = 0;

	let videoContainer!: HTMLElement;
	let video!: HTMLElement;
	let videoPlayerPreview!: HTMLVideoElement;
	let videoPlayerFullscreen!: HTMLVideoElement;
	let container!: HTMLElement;

	let isFullscreen = false;
	let videoPlaying = blok.autoplay;

	// avoid division by 0
	let scrollPosition: number = 0;
	let videoBBox: DOMRect | undefined;
	let splitTexts: any[] = [];

	let isScrollFullVideo = false;
	let isCursorEnter = false;
	let isInView = false;

	let isReady = false;

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
		if ($lenis?.animatedScroll) {
			scrollPosition = $lenis.animatedScroll;
		}
		if (video) {
			videoBBox = video.getBoundingClientRect();
		}
	};

	const onMouseMove = (event: MouseEvent) => {
		mousePosition.x = event.clientX;
		mousePosition.y = event.clientY;
	};

	const onRender = () => {
		if (!isInView) return;

		videoTransformEffect =
			innerWidth > 768
				? clamp(scrollPosition / innerHeight, 0, 1)
				: clamp(scrollPosition / innerHeight, 0.5, 1);

		// bail if translation is almost complete
		if (videoTransformEffect >= 0.9) {
			videoRotation.x = 0;
			videoRotation.y = 0;
			return;
		}

		if (videoBBox) {
			videoRotation.x =
				(1 - videoTransformEffect) *
				(-(mousePosition.y - videoBBox.y - videoBBox.height / 2) / 100);
			videoRotation.y =
				(1 - videoTransformEffect) * ((mousePosition.x - videoBBox.x - videoBBox.width / 2) / 100);
		}
	};

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

		videoPlayerFullscreen.addEventListener('webkitendfullscreen', hideVideoFullscreen, false);
		videoPlayerFullscreen.addEventListener('webkitbeginfullscreen', showVideoFullscreen, false);

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

		gsap.set(videoContainer, { scale: 0 });

		gsap.ticker.add(onRender);
	});

	useTransitionReady(
		() => {
			onResize();
			$lenis?.on('scroll', onScroll);

			if (!isReady) {
				isReady = true;
				if (videoPlayerPreview.paused) {
					videoPlayerPreview.play();
				}
			}

			ctx = gsap.context(() => {
				gsap.to(videoContainer, {
					duration: 1,
					scale: 1,
					delay: 0.2,
					ease: 'circ.out'
				});

				gsap.timeline({
					scrollTrigger: {
						trigger: container,
						start: '=+25%',
						end: '=+125%',
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
						onEnterBack: () => {
							if (isCursorEnter) {
								cursorType.set('play');
							}

							isScrollFullVideo = true;
						},
						onLeave: () => {
							cursorType.set('none');
							isScrollFullVideo = false;
						},
						onLeaveBack: () => {
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

				splitTexts.forEach((text, index) => {
					gsap.set(text.chars, { opacity: 1 });
					tlSplitText.to(
						text.chars,
						{
							duration: 0.5,
							ease: 'circ.out',
							yPercent: 0,
							delay: 0.5 + index,
							stagger: 0.01
						},
						'start'
					);
				});
			}, container);
		},
		() => {}
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

	function toggleVideoFullscreen(event: any) {
		if (
			document.fullScreenElement ||
			document.webkitIsFullScreen == true ||
			document.mozFullScreen ||
			document.msFullscreenElement
		) {
			showVideoFullscreen();
		} else {
			hideVideoFullscreen();
		}
	}

	function showVideoFullscreen() {
		videoPlayerPreview.pause();
		isFullscreen = true;
		videoPlayerFullscreen.pause();
		videoPlayerFullscreen.currentTime = 0;
		videoPlayerFullscreen.play();
	}

	function hideVideoFullscreen() {
		isFullscreen = false;
		videoPlayerFullscreen.pause();
		videoPlayerPreview.play();
	}
	function playVideoFullscreen() {
		if (videoPlayerFullscreen.requestFullscreen) {
			videoPlayerFullscreen.requestFullscreen();
			videoPlayerFullscreen.play();
		} else if (videoPlayerFullscreen.webkitEnterFullScreen) {
			videoPlayerFullscreen.webkitEnterFullScreen();
			videoPlayerFullscreen.play();
		}
	}

	const onScroll = (scroll: any) => {
		if (video?.offsetHeight) {
			if (scroll.animatedScroll <= video.offsetHeight) {
				scrollPosition = scroll.animatedScroll;
			}
		}
	};

	beforeNavigate(() => {
		gsap.ticker.remove(onRender);
		$lenis?.off('scroll', onScroll);

		videoPlayerFullscreen.removeEventListener('webkitendfullscreen', hideVideoFullscreen);
		videoPlayerFullscreen.removeEventListener('webkitbeginfullscreen', showVideoFullscreen);
	});

	const inViewPlayer = ({ detail }: CustomEvent<ObserverEventDetails>) => {
		const { inView } = detail as ObserverEventDetails;
		if (inView) {
			if (isReady) {
				videoPlayerPreview.play();
			} else {
				videoPlayerPreview.pause();
			}
		} else {
			videoPlayerPreview.pause();
		}
		isInView = inView;
	};
</script>

<svelte:window bind:innerWidth bind:innerHeight on:mousemove={onMouseMove} on:resize={onResize} />

<div use:inview on:inview_change={inViewPlayer}>
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
					<div class="relative h-full w-full">
						<div
							class={cls(
								'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity	duration-300 ease-out',
								touchCapability !== 1 && 'hidden',
								isScrollFullVideo ? 'opacity-100' : 'opacity-0'
							)}
						>
							<button
								class="flex h-[86px] w-[86px] origin-center -translate-y-[86px] items-center justify-center transition duration-300 ease-out"
								on:click={playVideoFullscreen}
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
						<video
							preload="metadata"
							bind:this={videoPlayerPreview}
							on:click={playVideoFullscreen}
							on:mouseenter={videoPreviewOnEnter}
							on:mouseleave={videoPreviewOnLeave}
							class="aspect-portrait w-full rounded-3xl"
							autoplay={true}
							loop={true}
							muted={!videoPlaying}
							playsinline
							src={innerWidth < 1024 && blok.videoPreviewMobile !== ''
								? blok.videoPreviewMobile
								: blok.videoPreview}
						/>
					</div>

					<video
						on:fullscreenchange={toggleVideoFullscreen}
						preload="metadata"
						bind:this={videoPlayerFullscreen}
						class={cls(!isFullscreen && 'hidden')}
						autoplay={false}
						src={blok.video}
					/>
				</div>
			</div>

			<div
				class="title-cont pointer-events-none absolute left-0 top-0 flex h-full w-full items-start"
			>
				<div class="flex h-full flex-col justify-between py-[15vh]">
					<h1
						data-gsap="split-text"
						class={cls(
							'z-[8] max-w-11xl font-degular-display leading-tightest tracking-wide text-neutral-950',
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
		</div>
	</section>
	<div class="h-[80vh]" />
	<BackgroundTheme startColor="#1a1a1a" endColor="#fff" startTheme="dark" endTheme="light" />
	<div class="h-[20vh]" />
</div>

<style lang="scss">
	.b-headline-video {
		&__container {
			// prettier-ignore
			transform:
				scale3d(
					calc(0.3 + var(--video-effect) * 0.7),
					calc(0.3 + var(--video-effect) * 0.7),
					1
				)
				rotateX(var(--rotation-x))
				rotateY(var(--rotation-y));
			// opacity: calc(0.5 + var(--video-effect) * 2);
		}
		&__title {
			-webkit-text-stroke: 1px white;
			// text-shadow: -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white;
			font-size: clamp(64px, calc(80px + (280 - 80) * (100vw - 768px) / (1920 - 768)), 280px);

			//font-size: clamp(16px, calc(20px + (36 - 20) * (100vw - 768px) / (1920 - 768)), 48px);

			// This text has a font size of 20px at viewport width of 768px
			// font size of 36px when viewport width is 1920px.
			// But if the viewport width is less than 768px,
			// the font-size won't get lower than 16px
			// the viewport width is more than 1920px font size will stop scaling at 48px.
		}
	}
</style>
