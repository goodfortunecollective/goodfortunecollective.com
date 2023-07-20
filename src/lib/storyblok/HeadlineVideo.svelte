<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { storyblokEditable } from '@storyblok/svelte';
	import CustomCursor from '../components/CustomCursor.svelte';

	import { gsap, SplitText } from '$lib/gsap';
	import { delay_anim_page } from '$lib/stores';

	export let blok: any;

	let video!: HTMLElement;
	let videoInteractive!: HTMLElement;
	let videoPlayer!: HTMLElement;

	let videoPlaying = true;
	let btnHidden = true;

	let constrain = 100;
	let isMouseLocked = false;
	let animCompleted = false;

	let tlSplitText: any = null;
	let tl: any = null;

	function handleMousemove(event: MouseEvent) {
		let xy = [event.clientX, event.clientY];
		if (!isMouseLocked) {
			let position = xy.concat([video]);
			window.requestAnimationFrame(function () {
				if (videoInteractive) transformElement(videoInteractive, position);
			});
		}
	}

	function transforms(x: number, y: number, el: HTMLElement) {
		let box = el.getBoundingClientRect();
		let calcX = -(y - box.y - box.height / 2) / constrain;
		let calcY = (x - box.x - box.width / 2) / constrain;

		return (
			'perspective(1000px) ' + '   rotateX(' + calcX + 'deg) ' + '   rotateY(' + calcY + 'deg) '
		);
	}

	function transformElement(el: HTMLElement, xyEl: [x: number, y: number, el: HTMLElement]) {
		el.style.transform = transforms.apply(null, xyEl);
	}

	onMount(() => {
		tl = gsap.timeline();
		tl.set(video, { scale: 0.15, opacity: 0, rotationY: 0 });

		const splitText = gsap.utils.toArray('[data-gsap="split-text"]');

		tlSplitText = gsap.timeline({
			scrollTrigger: {
				trigger: '#h-intro',
				start: 'center 55%',
				end: 'center 30%',
				toggleActions: 'play reverse play reverse' // onEnter onLeave onEnterBack onLeaveBack
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

		tl.to(video, {
			scale: 0.65,
			opacity: 0.5,
			rotationY: -25,
			duration: 1,
			delay: $delay_anim_page,
			onComplete: () => {
				animCompleted = true;
			}
		});

		tl.fromTo(
			video,
			{
				scale: 0.65,
				opacity: 0.5,
				rotationY: -25
			},
			{
				scrollTrigger: {
					trigger: '#h-intro',
					start: 'bottom 55%',
					end: 'bottom 30%',
					toggleActions: 'play none none none', // onEnter onLeave onEnterBack onLeaveBack
					scrub: true,
					immediateRender: false,
					onUpdate: (self) => {
						if (!animCompleted) return;

						if (self.progress > 0.25) {
							if (!isMouseLocked && videoInteractive) {
								gsap.to(videoInteractive, {
									// pointerEvents: 'click',
									rotateX: 0,
									rotateY: 0,
									duration: 0.1,
									ease: 'circ.inOut'
								});
							}
							isMouseLocked = true;
							videoOnEnter();
						} else {
							// if (videoInteractive) videoInteractive.style.pointerEvents = 'all';
							isMouseLocked = false;

							videoOnLeave();
						}
					}
				},
				scale: 1,
				opacity: 1,
				rotationY: 0,
				y: '50%',
				duration: 1,
				ease: 'circ.inOut'
			}
		);
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
		if (tl) tl.kill();
		if (tlSplitText) tlSplitText.kill();

		tl = null;
		tlSplitText = null;
	});
</script>

<svelte:window on:mousemove={handleMousemove} />

<section use:storyblokEditable={blok} {...$$restProps} class="flex w-screen h-screen bg-black">
	<CustomCursor isHidden={btnHidden} cursorType={videoPlaying ? 'pause' : 'play'} />

	<div class="relative flex w-full h-full max-w-6xl mx-auto">
		<div class="relative w-full h-full perspective-800">
			<div
				bind:this={video}
				class="absolute w-full h-full transform-gpu preserve-3d cursor-pointer"
				on:mouseenter={videoOnEnter}
				on:mouseleave={videoOnLeave}
			>
				<div bind:this={videoInteractive} class="w-full h-full preserve-3d">
					<video
						bind:this={videoPlayer}
						on:click={playPauseVideo}
						class="absolute inset-0 w-full h-full aspect-video"
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
