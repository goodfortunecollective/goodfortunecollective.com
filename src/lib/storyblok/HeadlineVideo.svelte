<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { storyblokEditable } from '@storyblok/svelte';
	import CustomCursor from '../components/CustomCursor.svelte';
	import { clamp } from '../utils/maths';

	import { gsap, SplitText } from '$lib/gsap';
	import { delay_anim_page } from '$lib/stores';

	export let blok: any;

	let videoContainer!: HTMLElement;
	let video!: HTMLElement;
	let videoInteractive!: HTMLElement;
	let videoPlayer!: HTMLElement;

	let videoPlaying = true;
	let btnHidden = true;

	let constrain = 100;

	let tlSplitText: any = null;

	// avoid division by 0
	let ww: number = 1;
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
	};

	const onScroll = (e: any) => {
		videoTransformEffect = clamp(e.detail.offsetY / (window.innerHeight * 0.5), 0, 1);
	};

	const onMouseMove = (e: MouseEvent) => {
		mousePosition.x = e.clientX;
		mousePosition.y = e.clientY;
	};

	const onRender = () => {
		// bail if translation is almost complete
		if (videoTransformEffect >= 0.99) return;

		videoRotation.x =
			(1 - videoTransformEffect) *
			(-(mousePosition.y - videoBBox.y - videoBBox.height / 2) / constrain);
		videoRotation.y =
			(1 - videoTransformEffect) *
			((mousePosition.x - videoBBox.x - videoBBox.width / 2) / constrain);
	};

	// function handleMousemove(event: MouseEvent) {
	// 	let xy = [event.clientX, event.clientY];
	// 	if (!isMouseLocked) {
	// 		window.requestAnimationFrame(function () {
	// 			if (videoInteractive) transformElement(videoInteractive, xy);
	// 		});
	// 	}
	// }
	//
	// function transforms(x: number, y: number, el: HTMLElement) {
	// 	let calcX =
	// 		(1 - videoTransformEffect) * (-(y - videoBBox.y - videoBBox.height / 2) / constrain);
	// 	let calcY = (1 - videoTransformEffect) * ((x - videoBBox.x - videoBBox.width / 2) / constrain);
	//
	// 	return (
	// 		'perspective(1000px) ' + '   rotateX(' + calcX + 'deg) ' + '   rotateY(' + calcY + 'deg) '
	// 	);
	// }
	//
	// function transformElement(el: HTMLElement, xy: [x: number, y: number]) {
	// 	el.style.transform = transforms.apply(null, xy);
	// }

	onMount(() => {
		window.addEventListener('smoothScrollUpdate', onScroll);
		gsap.ticker.add(onRender);
		onResize();

		const splitText = gsap.utils.toArray('[data-gsap="split-text"]');

		tlSplitText = gsap.timeline({
			scrollTrigger: {
				trigger: '#h-intro',
				start: 'center 55%',
				end: 'center 30%',
				toggleActions: 'play reverse play reverse' // onEnter onLeave onEnterBack onLeaveBack
			},
			onStart: () => {
				// move video behind title
				if (videoContainer) videoContainer.style.zIndex = '9';
			},
			onReverseComplete: () => {
				// move video on top of title
				if (videoContainer) videoContainer.style.zIndex = '11';
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
		if (tlSplitText) tlSplitText.kill();

		tlSplitText = null;
	});
</script>

<svelte:window on:mousemove={onMouseMove} on:resize={onResize} />

<section use:storyblokEditable={blok} {...$$restProps} class="flex w-screen h-screen bg-black">
	<CustomCursor isHidden={btnHidden} cursorType={videoPlaying ? 'pause' : 'play'} />

	<div class="relative flex w-full h-full max-w-6xl mx-auto">
		<div class="relative w-full h-full perspective-800" bind:this={videoContainer}>
			<div
				bind:this={video}
				class="HeadlineVideo-container absolute w-full h-full transform-gpu preserve-3d cursor-pointer"
				style="--video-effect: {videoTransformEffect}; --rotation-x: {videoRotation.x}deg; --rotation-y: {videoRotation.y}deg"
			>
				<div
					bind:this={videoInteractive}
					class="HeadlineVideo-container-interactive w-full h-full preserve-3d"
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
		</div>
		<div class="absolute z-10 flex items-center w-full h-full">
			<div class="flex flex-col gap-24" id="h-intro">
				<h1 data-gsap="split-text" class="text-6xl text-cyan-500 font-degular-display md:text-9xl">
					{blok.headline}
				</h1>
				<h2
					data-gsap="split-text"
					class="max-w-2xl text-4xl text-white font-degular-display md:text-7xl"
				>
					{blok.subheadline}
				</h2>
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
				translate3d(
					0,
					calc(var(--video-effect) * 50vh),
					0
				)
				scale3d(
					calc(0.65 + var(--video-effect) * 0.35),
					calc(0.65 + var(--video-effect) * 0.35),
					1
				)
				rotateX(var(--rotation-x))
				rotateY(var(--rotation-y));

			opacity: calc(0.5 + var(--video-effect) * 2);

			&-interactive {
				display: flex;
				align-items: center;
			}
		}
	}
</style>
