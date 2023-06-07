<script lang="ts">
	import { base } from '$app/paths';
	import { onMount } from 'svelte';

	import { gsap, ScrollSmoother } from '$lib/gsap';

	onMount(() => {
		let skewSetter = gsap.quickTo('[data-gsap="skew-y"]', 'skewY'),
			clamp = gsap.utils.clamp(-5, 5);

		// @ts-ignore
		const scroll = ScrollSmoother.get();
		scroll.onUpdate = () => skewSetter(clamp(scroll.getVelocity() / -50));
		scroll.onStop = () => skewSetter(0);
	});
</script>

<svelte:head>
	<title>Work</title>
	<meta name="description" content="Work" />
</svelte:head>

<div class="">
	<section class="space-x-8 space-y-8 columns-1">
		<div class="a-skew-y">
			<a href="{base}/work/[slug]">
				<img
					data-gsap="skew-y"
					class="flex aspect-video object-cover"
					src="https://source.unsplash.com/random/?Motion&1"
					alt=""
				/></a
			>
		</div>
		<div class="a-skew-y">
			<a href="{base}/work/[slug]">
				<img
					data-gsap="skew-y"
					class="flex aspect-video object-cover"
					src="https://source.unsplash.com/random/?Motion&2"
					alt=""
				/></a
			>
		</div>
		<div class="a-skew-y">
			<a href="{base}/work/[slug]">
				<img
					loading="lazy"
					data-gsap="skew-y"
					class="flex aspect-video object-cover"
					data-speed="1.1"
					src="https://source.unsplash.com/random/?Motion&3"
					alt=""
				/></a
			>
		</div>
		<div class="a-skew-y">
			<a href="{base}/work/[slug]">
				<img
					loading="lazy"
					data-gsap="skew-y"
					class="flex aspect-video object-cover"
					src="https://source.unsplash.com/random/?Motion&4"
					alt=""
				/></a
			>
		</div>
		<div class="a-skew-y">
			<a href="{base}/work/[slug]">
				<img
					loading="lazy"
					data-gsap="skew-y"
					class="flex aspect-video object-cover"
					src="https://source.unsplash.com/random/?Motion&5"
					alt=""
				/></a
			>
		</div>
		<div class="a-skew-y">
			<a href="{base}/work/[slug]">
				<img
					loading="lazy"
					data-gsap="skew-y"
					class="flex aspect-video object-cover"
					src="https://source.unsplash.com/random/?Motion&6"
					alt=""
				/></a
			>
		</div>
	</section>
</div>

<style>
</style>
