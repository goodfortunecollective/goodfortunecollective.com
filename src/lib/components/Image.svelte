<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	import { ScrollTrigger } from '$lib/gsap';

	let el!: HTMLElement;
	let scrollTrigger!: ScrollTrigger;

	$: parallaxEffect = 0 as number;

	onMount(() => {
		scrollTrigger = ScrollTrigger.create({
			trigger: el,
			start: 'top bottom',
			end: 'bottom top',
			onUpdate: (self: any) => {
				parallaxEffect = self.progress;
			}
		});
	});

	onDestroy(() => {
		if (scrollTrigger) {
			scrollTrigger.kill();
			scrollTrigger = null;
		}
	});
</script>

<div bind:this={el} class={$$props.class}>
	<div class="relative aspect-video h-full w-full overflow-hidden">
		<img
			{...$$restProps}
			src={$$props.src}
			alt={$$props.alt}
			class="c-image absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover"
			style="--parallax-effect: {parallaxEffect}"
		/>
	</div>
</div>

<style lang="scss">
	.c-image {
		transform: translateY(calc(100px * var(--parallax-effect)))
			scale(calc(1.05 + 0.2 * var(--parallax-effect)));
	}
</style>
