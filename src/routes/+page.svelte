<script lang="ts">
	import { onMount } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';

	import { gsap, SplitText } from '$lib/gsap';
	// import VideoWithPreview from '$lib/components/VideoWithPreview.svelte';

	export let data;

	const DELAY_LOADER = 6.5;

	let video!: HTMLElement;
	let videoInteractive!: HTMLElement;

	let constrain = 100;
	let isMouseLocked = false;

	function handleMousemove(event: MouseEvent) {
		if (isMouseLocked) return;

		let xy = [event.clientX, event.clientY];
		let position = xy.concat([video]);

		window.requestAnimationFrame(function () {
			transformElement(videoInteractive, position);
		});
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

	onMount(async () => {
		if (data.story) {
			useStoryblokBridge(data.story.id, (newStory) => (data.story = newStory));
		}

		const splitText = document.querySelectorAll('[data-gsap="split-text"]');

		splitText.forEach((content) => {
			const text = new SplitText(content, {
				type: 'lines,words,chars'
			});

			gsap.set(text.chars, {
				opacity: 0,
				y: 40
			});

			gsap.to(text.chars, {
				opacity: 1,
				duration: 0.6,
				ease: 'circ.out',
				y: 0,
				delay: 1 + DELAY_LOADER,
				stagger: 0.01
			});

			gsap.to(text.chars, {
				scrollTrigger: {
					trigger: '#h-intro',
					start: 'bottom 55%',
					end: 'bottom 20%',
					toggleActions: 'play complete reverse reverse'
				},
				immediateRender: false,
				opacity: 0,
				duration: 0.4,
				ease: 'circ.inOut',
				y: 40,
				stagger: 0.01
			});
		});

		gsap.set(video, {
			scale: 0.15,
			opacity: 0,
			rotationY: 0
		});

		gsap.to(video, {
			scale: 0.65,
			delay: 0.5 + DELAY_LOADER,
			opacity: 0.5,
			rotationY: -25
		});

		gsap.to(video, {
			scrollTrigger: {
				trigger: '#h-intro',
				start: 'bottom 55%',
				end: 'bottom 30%',
				toggleActions: 'play complete reverse reverse',
				scrub: true,
				onUpdate: (self) => {
					if (self.progress > 0.25) {
						if (!isMouseLocked) {
							gsap.to(videoInteractive, {
								pointerEvents: 'none',
								rotateX: 0,
								rotateY: 0,
								duration: 0.1,
								ease: 'circ.inOut'
							});
						}
						isMouseLocked = true;
					} else {
						videoInteractive.style.pointerEvents = 'all';
						isMouseLocked = false;
					}
				}
			},
			immediateRender: false,
			scale: 1,
			opacity: 1,
			rotationY: 0,
			y: '50%',
			duration: 1,
			ease: 'circ.inOut'
		});
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta
		name="description"
		content="People today love brands that love them back. But more than that, people today need to know that brands have their best intentions at heart.e"
	/>
</svelte:head>

<svelte:window on:mousemove={handleMousemove} />

<section class="flex h-screen w-screen bg-black">
	<div class="flex w-full h-full mx-auto max-w-6xl relative">
		<div class="perspective-800 w-full h-full relative">
			<div bind:this={video} class="absolute w-full h-full transform-gpu preserve-3d">
				<div bind:this={videoInteractive} class="w-full h-full preserve-3d">
					<video
						class="w-full h-full aspect-video absolute inset-0"
						src="https://media.istockphoto.com/id/1250005100/pt/v%C3%ADdeo/floating-droplets-loop.mp4?s=mp4-640x640-is&amp;k=20&amp;c=eJworDI_aCrPdxtWQhVk4j77JHwtc4xV6wRFXljLgcE="
						autoplay
						muted
						loop><track kind="captions" /></video
					>
				</div>
			</div>
		</div>
		<div class="z-10 absolute h-full w-full flex items-center">
			<div class="flex flex-col gap-24" id="h-intro">
				<h1 data-gsap="split-text" class="text-cyan-500 font-degular-display text-9xl">
					Good Fortune Collective
				</h1>
				<h2 data-gsap="split-text" class="text-white font-degular-display text-7xl max-w-2xl">
					is a culture that embraces change
				</h2>
			</div>
		</div>
	</div>
</section>

<section class="h-screen w-screen" />
{#if data.story}
	<StoryblokComponent blok={data.story.content} />
{/if}
```

<style>
</style>
