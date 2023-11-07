<script lang="ts">
	import { StoryblokComponent, storyblokEditable } from '@storyblok/svelte';

	import { cls } from '$lib/styles';
	import { gsap } from 'gsap';
	import { useTransitionReady } from '$lib/utils/useTransitionReady';

	export let blok: any;
	let element: HTMLElement;
	let ctx: any = null;

	useTransitionReady(
		() => {
			ctx = gsap.context(() => {
				gsap.to(element, {
					yPercent: blok.speed,
					ease: 'none',
					scrollTrigger: {
						trigger: element,
						start: 'top center',
						scrub: true
					}
				});
			}, element);
		},
		() => {
			if (ctx) ctx.revert();
		}
	);
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={cls('relative', blok.class)}>
	<img src={blok.background.filename} alt="" bind:this={element} />
	{#each blok.content as b}
		<StoryblokComponent blok={b} />
	{/each}
</div>
