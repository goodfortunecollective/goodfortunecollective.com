<script lang="ts">
	import { fade } from 'svelte/transition';
	import { onDestroy, onMount } from 'svelte';
	import { cva } from 'class-variance-authority';

	import { cls } from '$lib/styles';
	import { ScrollTrigger } from '$lib/gsap';
	import { useTransitionReady } from '$lib/utils/useTransitionReady';

	export let aspect: 'square' | 'landscape' | 'portrait' | 'auto' = 'landscape';
	export let animated: boolean = true;

	$: innerWidth = 0;

	let el!: HTMLElement;
	let scrollTrigger!: ScrollTrigger;

	$: parallaxEffect = 0 as number;

	const containerStyle = cva('relative h-full w-full overflow-hidden', {
		variants: {
			aspect: {
				square: 'aspect-square',
				landscape: 'aspect-video',
				portrait: 'aspect-[2/3]',
				auto: 'aspect-auto'
			}
		},
		defaultVariants: {
			aspect: 'landscape'
		}
	});

	function setStyleContainer() {
		if (aspect === 'auto' && $$props.width) {
			const scale = innerWidth / $$props.width;
			el.style.setProperty('width', `${$$props.width * scale}px`);
			el.style.setProperty('height', `${$$props.height * scale}px`);
		}
	}

	onMount(() => {
		setStyleContainer();
	});

	useTransitionReady(() => {
		if (animated) {
			scrollTrigger = ScrollTrigger.create({
				trigger: el,
				start: 'top bottom',
				end: 'bottom top',
				onUpdate: (self: any) => {
					parallaxEffect = self.progress;
				}
			});
		}
	});

	onDestroy(() => {
		if (scrollTrigger) {
			scrollTrigger.kill();
			scrollTrigger = null;
		}
	});
</script>

<svelte:window bind:innerWidth on:resize={setStyleContainer} />

<div
	bind:this={el}
	class={$$props.class}
	style={`width: ${$$props.width * (innerWidth / $$props.width)}px; height: ${
		$$props.height * (innerWidth / $$props.width)
	}px;`}
>
	<div class={cls(containerStyle({ aspect }))}>
		<img
			src={$$props.src}
			alt={$$props.alt}
			class="c-image absolute inset-0 h-full w-full object-cover"
			style="--parallax-effect: {parallaxEffect}"
			loading="lazy"
			decoding="async"
			in:fade={{ duration: 500 }}
		/>
	</div>
</div>

<style lang="scss">
	.c-image {
		transform: translateY(calc(50px * var(--parallax-effect)))
			scale(calc(1.05 + 0.2 * var(--parallax-effect)));
	}
</style>
