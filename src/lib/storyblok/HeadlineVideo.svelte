<script lang="ts">
	import { onDestroy } from 'svelte';
	import { storyblokEditable } from '@storyblok/svelte';

	import CustomCursor from '$lib/components/CustomCursor.svelte';
	import gsap, { SplitText, ScrollTrigger } from '$lib/gsap';
	import { clamp } from '$lib/utils/maths';
	import { useTransitionReady } from '$lib/utils/useTransitionReady';

	export let blok: any;

	let ctx: any = null;

	let videoContainer!: HTMLElement;
	let video!: HTMLElement;
	let videoPlayer!: HTMLElement;
	let line!: HTMLElement;
	let container!: HTMLElement;
	let background!: HTMLElement;

	let videoPlaying = blok.autoplay;
	let btnHidden = true;

	let constrain = 100;

	let bgOpacity: number = 1;
	let titleScale: number = 1;

	// avoid division by 0
	let ww: number = 1;
	let scrollPosition: number = 0;
	let videoBBox: DOMRect | undefined;
	$: videoTransformEffect = 0;

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
		console.log('>>> RESIZEEEE');
		ww = window.innerHeight;
		scrollPosition = window.pageYOffset;
		if (video) {
			videoBBox = video.getBoundingClientRect();
		}
	};

	const onScroll = (event: any) => {
		scrollPosition = event.detail.offsetY;
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

	useTransitionReady(
		() => {
			window.addEventListener('smoothScrollUpdate', onScroll);
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

				const splitText = gsap.utils.toArray('[data-gsap="split-text"]');

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

				splitText.forEach((content) => {
					const text = new SplitText(content, {
						type: 'lines,words,chars',
						linesClass: 'split-line',
						charClass: 'split-char'
					});

					tlSplitText.from(
						text.chars,
						{
							duration: 0.2,
							ease: 'circ.out',
							yPercent: 100,
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
			});
		},
		() => {
			window.removeEventListener('smoothScrollUpdate', onScroll);
			gsap.ticker.remove(onRender);
		}
	);

	function videoOnEnter() {
		btnHidden = false;
	}

	function videoOnLeave() {
		btnHidden = true;
	}

	function playPauseVideo() {
		if (videoPlayer.paused) {
			videoPlayer.play();
		} else videoPlayer.pause();

		videoPlaying = !videoPlaying;
	}

	onDestroy(() => {
		if (ctx) ctx.revert();
	});
</script>

<svelte:window on:mousemove={onMouseMove} on:resize={onResize} />

<section use:storyblokEditable={blok} {...$$restProps} class="grid h-screen grid-cols-12">
	<div
		bind:this={background}
		class="absolute w-screen h-[250vh] z-[-1] bg-black"
		style="opacity:{bgOpacity}"
	/>
	<CustomCursor
		isHidden={btnHidden}
		cursorType={videoPlaying ? 'pause' : 'play'}
		bgColor="#dbfa45"
	/>

	<div class="relative w-full h-full col-span-10 col-start-2" bind:this={container}>
		<div class="relative w-full h-full z-[9] video-cont perspective-800" bind:this={videoContainer}>
			<div
				bind:this={video}
				class="absolute w-full h-full cursor-pointer HeadlineVideo-container transform-gpu preserve-3d mt-[10vh]"
				style="--video-effect: {videoTransformEffect}; --rotation-x: {videoRotation.x}deg; --rotation-y: {videoRotation.y}deg"
			>
				<video
					bind:this={videoPlayer}
					on:click={playPauseVideo}
					on:mouseenter={videoOnEnter}
					on:mouseleave={videoOnLeave}
					class="w-full aspect-video rounded-3xl"
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
			class="absolute top-0 left-0 flex items-start w-full h-full pointer-events-none title-cont"
		>
			<div class="flex flex-col justify-between h-full py-[15vh]">
				<h1
					data-gsap="split-text"
					class="max-w-6xl text-6xl leading-[4rem] md:text-[11rem] md:leading-[8rem] 3xl:text-[12rem] 3xl:leading-[9rem] z-[8] text-black font-degular-display title tracking-wide"
					style="transform:scale({titleScale})"
				>
					{blok.headline}
				</h1>
				<h2
					data-gsap="split-text"
					class="z-10 max-w-md mb-[5vh] text-5xl md:text-7xl text-white lg:max-w-2xl font-degular-display"
				>
					{blok.subheadline}
				</h2>
			</div>
		</div>

		<div
			class="absolute top-0 left-0 z-10 flex items-center justify-end w-full h-full pointer-events-none"
		>
			<div class="relative w-full max-w-xs mr-24">
				<div class="absolute inline-flex items-center justify-center w-full gap-4">
					<hr bind:this={line} class="w-32 h-px" />
					<div class="w-[10rem] text-xs text-white uppercase" data-gsap="split-text">
						<h3 class="leading-3"><strong data-gsap="split-text">{blok.description}</strong></h3>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
<div class="h-[150vh]" />

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
