<script lang="ts">
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';
	import gsap from '$lib/gsap';

	import { useTransitionReady } from '$lib/utils/useTransitionReady.js';

	export let blok: any;

	let el!: HTMLElement;
	let scrollEl!: HTMLElement;
	let ctx: any = null;

	useTransitionReady(
		() => {
			ctx = gsap.context(() => {
				gsap.to(scrollEl, {
					x: () => scrollEl.scrollWidth * -1,
					xPercent: 100,
					scrollTrigger: {
						trigger: scrollEl,
						start: 'center center',
						end: () => '+=' + scrollEl.offsetWidth,
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

<div use:storyblokEditable={blok} {...$$restProps} bind:this={el}>
	<div class="overflow">
		<div class="grid grid-cols-12" bind:this={scrollEl}>
			<div class="col-span-9 col-start-2 flex gap-8">
				{#each blok.content as b, index}
					<div class="w-96">
						<StoryblokComponent blok={b} {index} />
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
