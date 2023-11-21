<script lang="ts">
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import gsap from '$lib/gsap';
	import { useTransitionReady } from '$lib/utils/useTransitionReady.js';

	export let blok: any;

	let el!: HTMLElement;
	let scrollEl!: HTMLElement;
	let ctx: any = null;

	$: innerWidth = 0;

	const variants = cva('w-full', {
		variants: {
			size: {
				small: 'h-64' /* 256px */,
				medium: 'h-96' /* 384px */,
				large: 'h-128' /* 512px */
			}
		},
		defaultVariants: {
			size: 'medium'
		}
	});

	function getScrollAmount() {
		return -(scrollEl.scrollWidth - innerWidth);
	}

	useTransitionReady(
		() => {
			ctx = gsap.context(() => {
				if (!scrollEl) return;

				gsap.to(scrollEl, {
					x: () => scrollEl.scrollWidth * -1,
					xPercent: 100,
					scrollTrigger: {
						trigger: scrollEl,
						start: 'center center',
						end: () => `+=${getScrollAmount() * -1}`,
						pin: el,
						scrub: true,
						invalidateOnRefresh: true
					}
				});
			}, scrollEl);
		},
		() => {
			ctx?.revert();
		}
	);
</script>

<svelte:window bind:innerWidth />

<div use:storyblokEditable={blok} {...$$restProps} bind:this={el} class={blok.class}>
	<div class="overflow">
		<div class="grid grid-cols-12" bind:this={scrollEl}>
			<div class="col-span-9 col-start-2 flex gap-8">
				{#each blok.content as b, index}
					<div class={variants({ size: blok.size })}>
						<StoryblokComponent blok={b} {index} />
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
