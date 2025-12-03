<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { cva } from 'class-variance-authority';

	import { cls } from '$lib/styles';
import { ScrollTrigger } from '$lib/gsap';
	import { debounce } from '$lib/utils/debounce';
	import { useTransitionReady } from '$lib/utils/useTransitionReady';
	import { lazyLoad } from '$lib/utils/lazyLoad';

	export let aspect: 'square' | 'landscape' | 'portrait' | 'auto' = 'landscape';
	export let animated: boolean = true;

	$: innerWidth = 0;
	let lastWidth = 0;

	let el!: HTMLElement;
	let imageEl!: HTMLImageElement;
let scrollTrigger: ScrollTrigger | null = null;

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
		lastWidth = innerWidth;
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

	const onResize = () => {
		if (lastWidth === innerWidth) return;

		setStyleContainer();

		lastWidth = innerWidth;
	};

onDestroy(() => {
		scrollTrigger?.kill?.();
		scrollTrigger = null;
	});
</script>

<svelte:window bind:innerWidth on:resize={debounce(onResize)} />

<div
	bind:this={el}
	class={$$props.class}
	style={animated
		? `width: ${$$props.width * (innerWidth / $$props.width)}px; height: ${
				$$props.height * (innerWidth / $$props.width)
			}px;`
		: ''}
>
	<div class={cls(containerStyle({ aspect }))}>
		<img
			use:lazyLoad={$$props.src}
			alt={$$props.alt}
			class={cls(
				'c-image',
				'absolute inset-0 h-full w-full object-cover',
				animated && 'c-image__animated'
			)}
			style="--parallax-effect: {parallaxEffect}"
			loading={$$props.loading}
			decoding="async"
			bind:this={imageEl}
		/>
	</div>
</div>

<style lang="scss">
	.c-image {
		opacity: 0;
		transition: opacity 0.6s ease-in-out;
	}

	.c-image__animated {
		transform: translateY(calc(50px * var(--parallax-effect)))
			scale(calc(1.05 + 0.2 * var(--parallax-effect)));
	}
</style>
