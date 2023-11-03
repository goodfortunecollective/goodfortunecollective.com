<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { storyblokEditable } from '@storyblok/svelte';

	import { BackgroundTheme } from '$lib/components';
	import gsap, { SplitText } from '$lib/gsap';
	import { clamp } from '$lib/utils/maths';
	import { useTransitionReady } from '$lib/utils/useTransitionReady';
	import { cursorType } from '$lib/stores';

	export let blok: any;

	let ctx: any = null;

	let videoContainer!: HTMLElement;
	let video!: HTMLElement;
	let videoPlayer!: HTMLElement;
	let line!: HTMLElement;
	let container!: HTMLElement;

	let videoPlaying = blok.autoplay;

	let constrain = 100;

	let bgOpacity: number = 1;
	let titleScale: number = 1;

	// avoid division by 0
	let ww: number = 1;
	let scrollPosition: number = 0;
	let videoBBox: DOMRect | undefined;
	$: videoTransformEffect = 0;

	let splitTexts: any[] = [];

	interface DOMPosition {
		x: number;
		y: number;
	}

	$: videoRotation = {
		x: 0,
		y: 0
	} as DOMPosition;

	const mousePosition: DOMPosition = {
		x: 0,
		y: 0
	};

	const onResize = () => {
		ww = window.innerHeight;
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
		videoTransformEffect = clamp(scrollPosition / (window.innerHeight * 0.5), 0, 1);

		// bail if translation is almost complete
		if (videoTransformEffect >= 0.99) {
			videoRotation.x = 0;
			videoRotation.y = 0;
			return;
		}

		videoRotation.x =
			(1 - videoTransformEffect) *
			(-(mousePosition.y - videoBBox.y - videoBBox.height / 2) / constrain);
		videoRotation.y =
			(1 - videoTransformEffect) *
			((mousePosition.x - videoBBox.x - videoBBox.width / 2) / constrain);
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
							bgOpacity = 1 - self.progress;
						}
					}
				});

				gsap.timeline({
					scrollTrigger: {
						trigger: container,
						start: 'center 50%',
						end: '+=150% bottom',
						scrub: true,
						pin: true,
						onUpdate: (self) => {
							titleScale = 1 - self.progress * 0.35;
						}
					}
				});

				const tlSplitText = gsap.timeline({
					scrollTrigger: {
						trigger: videoContainer,
						start: 'center 55%',
						end: 'center 30%',
						toggleActions: 'play reverse play reverse' // onEnter onLeave onEnterBack onLeaveBack
					},
					onStart: () => {
						// move video behind title
						// if (videoContainer) videoContainer.style.zIndex = '9';
					},
					onReverseComplete: () => {
						// move video on top of title
						// if (videoContainer) videoContainer.style.zIndex = '11';
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

	function videoOnEnter() {
		cursorType.set(videoPlaying ? 'pause' : 'play');
	}

	function videoOnLeave() {
		cursorType.set('none');
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

	onDestroy(() => {
		if (ctx) ctx.revert();
	});
</script>

<svelte:window on:mousemove={onMouseMove} on:resize={onResize} />

<section use:storyblokEditable={blok} {...$$restProps} class="grid h-screen grid-cols-12">
	<div class="absolute z-[-1] h-[250vh] w-full" style="opacity:{bgOpacity}" />
	<div class="relative col-span-10 col-start-2 h-full w-full" bind:this={container}>
		<div class="video-cont perspective-800 relative z-[9] h-full w-full" bind:this={videoContainer}>
			<div
				bind:this={video}
				class="HeadlineVideo-container preserve-3d absolute mt-[10vh] h-full w-full transform-gpu cursor-pointer"
				style="--video-effect: {videoTransformEffect}; --rotation-x: {videoRotation.x}deg; --rotation-y: {videoRotation.y}deg"
			>
				<video
					bind:this={videoPlayer}
					on:click={playPauseVideo}
					on:mouseenter={videoOnEnter}
					on:mouseleave={videoOnLeave}
					class="aspect-video w-full rounded-3xl"
					src={blok.video}
					autoplay={blok.autoplay}
					loop={blok.loop}
					muted={blok.muted}
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
					class="title z-[8] max-w-7xl font-degular-display text-6xl leading-[4rem] tracking-wide text-neutral-950 md:text-[11rem] md:leading-[8rem] 3xl:text-[12rem] 3xl:leading-[9rem]"
					style="transform:scale({titleScale})"
				>
					{blok.headline}
				</h1>
				<h2
					data-gsap="split-text"
					class="z-10 mb-[5vh] max-w-2xl font-degular-display text-5xl text-white md:text-7xl lg:max-w-4xl"
				>
					{blok.subheadline}
				</h2>
			</div>
		</div>

		<div
			class="pointer-events-none absolute left-0 top-0 z-10 flex h-full w-full items-center justify-end"
		>
			<div class="relative mr-24 w-full max-w-xs">
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
	.HeadlineVideo {
		&-container {
			// prettier-ignore
			transform:
				scale3d(
					calc(0.5 + var(--video-effect) * 0.5),
					calc(0.5 + var(--video-effect) * 0.5),
					1
				)
				rotateX(var(--rotation-x))
				rotateY(var(--rotation-y));
			// opacity: calc(0.5 + var(--video-effect) * 2);
		}
	}
	.title {
		-webkit-text-stroke: 1px white;
		// text-shadow: -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white;
	}
</style>
