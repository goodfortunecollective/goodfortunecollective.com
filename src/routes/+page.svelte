<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';

	import { gsap, SplitText } from '$lib/gsap';
	import { delay_anim_page } from '$lib/stores';
	// import VideoWithPreview from '$lib/components/VideoWithPreview.svelte';

	import { Flex } from '$lib/components/layout';
	import { Heading } from '$lib/components/typography';

	export let data;

	let video!: HTMLElement;
	let videoInteractive!: HTMLElement;

	let constrain = 100;
	let isMouseLocked = false;
	let animCompleted = false;

	let tlSplitText: any = null;
	let tl: any = null;

	function handleMousemove(event: MouseEvent) {
		if (isMouseLocked) return;

		let xy = [event.clientX, event.clientY];
		let position = xy.concat([video]);

		window.requestAnimationFrame(function () {
			if (videoInteractive) transformElement(videoInteractive, position);
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

	onMount(() => {
		if (data.story) {
			useStoryblokBridge(data.story.id, (newStory) => (data.story = newStory));
		}

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
									pointerEvents: 'none',
									rotateX: 0,
									rotateY: 0,
									duration: 0.1,
									ease: 'circ.inOut'
								});
							}
							isMouseLocked = true;
						} else {
							if (videoInteractive) videoInteractive.style.pointerEvents = 'all';
							isMouseLocked = false;
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

	onDestroy(() => {
		if (tl) tl.kill();
		if (tlSplitText) tlSplitText.kill();

		tl = null;
		tlSplitText = null;
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
<div class="section-wrapper" />

<section class="pb-32">
	<div class="mx-auto max-w-6xl">
		<Flex class="pt-16 items-end">
			<Heading as="h2" size="h1" class="w-1/2">Headline Statement</Heading>
			<p class="text-xl flex-1">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac feugiat nisl, a
				cursus orci. Pellentesque sollicitudin feugiat ipsum, eget venenatis urna mollis ac.
			</p>
		</Flex>
	</div>
</section>

<!--
<section class="h-screen w-screen">
	{#if data.story}
		<StoryblokComponent blok={data.story.content} />
	{/if}
</section>
-->

<style>
	.section-wrapper {
		height: 50vh;
	}
</style>
