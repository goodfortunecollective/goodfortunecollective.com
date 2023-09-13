<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { storyblokEditable } from '@storyblok/svelte';
	import CustomCursor from '../components/CustomCursor.svelte';
	import { clamp } from '../utils/maths';

	import gsap, { SplitText } from '$lib/gsap';
	import { delay_anim_page } from '$lib/stores';

	export let blok: any;

	let videoContainer!: HTMLElement;
	let video!: HTMLElement;
	let videoPlayer!: HTMLElement;
	let line!: HTMLElement;
	let container!: HTMLElement;

	let videoPlaying = true;
	let btnHidden = true;

	let constrain = 100;

	let tl: any = null;
	let tlSplitText: any = null;
	let tlContainer: any = null;

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
		ww = window.innerHeight;
		videoBBox = video.getBoundingClientRect();
		scrollPosition = window.pageYOffset;
	};

	const onScroll = (e: any) => {
		scrollPosition = e.detail.offsetY;
	};

	const onMouseMove = (e: MouseEvent) => {
		mousePosition.x = e.clientX;
		mousePosition.y = e.clientY;
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
		window.addEventListener('smoothScrollUpdate', onScroll);
		gsap.ticker.add(onRender);
		onResize();

		tlContainer = gsap.timeline({
			scrollTrigger: {
				trigger: container,
				start: 'center 50%',
				end: '+=50%',
				scrub: true,
				pin: true,
				onUpdate: (self) => {
					console.log(
						'progress:',
						self.progress.toFixed(3)
						// 'direction:',
						// self.direction,
						// 'velocity',
						// self.getVelocity()
					);
					bgOpacity = 1 - self.progress;
					titleScale = 1 - self.progress;
					console.log('opacity : ' + (1 - self.progress));
				}
			}
		});

		const splitText = gsap.utils.toArray('[data-gsap="split-text"]');

		tlSplitText = gsap.timeline({
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
				type: 'lines,words,chars'
			});

			let chars = text.chars;

			// @ts-ignore
			gsap.set(content, { perspective: 400 });

			tlSplitText.from(
				chars,
				{
					duration: 0.8,
					opacity: 0,
					scale: 0,
					y: 80,
					rotationX: 180,
					transformOrigin: '0% 50% -50',
					ease: 'back',
					stagger: 0.01,
					delay: $delay_anim_page
				},
				'start'
			);
		});

		tl = gsap.timeline({
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
				ease: 'back',
				delay: $delay_anim_page
			},
			'start'
		);

		return () => {
			window.removeEventListener('smoothScrollUpdate', onScroll);
			gsap.ticker.remove(onRender);
		};
	});

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
		if (tlSplitText) {
			tlSplitText.kill();
		}
		if (tl) {
			tl.kill();
		}
		if (tlContainer) {
			tlContainer.kill();
		}

		tlSplitText = null;
		tl = null;
		tlContainer = null;
	});
</script>

<svelte:window on:mousemove={onMouseMove} on:resize={onResize} />

<section use:storyblokEditable={blok} {...$$restProps} class="grid h-screen grid-cols-12">
	<div class="absolute w-full h-full z-[-1] bg-black" style="opacity:{bgOpacity}" />
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
					class="w-full aspect-video"
					src={blok.video}
					autoplay
					muted
					loop
				>
					<track kind="captions" />
				</video>
			</div>
		</div>

		<div
			class="absolute top-0 left-0 flex items-start w-full h-full pointer-events-none title-cont"
		>
			<div class="flex flex-col justify-between h-full py-[10vh]">
				<h1
					data-gsap="split-text"
					class="max-w-6xl leading-none text-10xl 3xl:text-9xl z-[8] text-black font-degular-display title tracking-wide"
					style="transform:scale({titleScale})"
				>
					{blok.headline}
				</h1>
				<h2
					data-gsap="split-text"
					class="z-10 max-w-md mb-[5vh] text-5xl text-white lg:max-w-2xl 3xl:text-7xl font-degular-display"
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
						<strong>{blok.description}</strong>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
<div class="h-[50vh]" />

<style lang="scss">
	.HeadlineVideo {
		&-container {
			// prettier-ignore
			transform:
				scale3d(
					calc(0.65 + var(--video-effect) * 0.35),
					calc(0.65 + var(--video-effect) * 0.35),
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
