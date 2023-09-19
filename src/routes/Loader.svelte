<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	import gsap from '$lib/gsap';
	import { cls } from '$lib/styles';
	import { delay_anim_page } from '$lib/stores';

	// avoid to reload the loader animation each time we update the page
	export let skip: boolean = false;

	const dispatch = createEventDispatcher();

	let background!: HTMLElement;
	let logo!: HTMLVideoElement;

	let active: boolean = true;
	let colorBackground: string = 'bg-white';

	function ready() {
		active = false;
		dispatch('complete');
		delay_anim_page.set(1.5);
	}

	onMount(async () => {
		if (skip) {
			requestAnimationFrame(ready);
			return;
		}

		const tl = gsap.timeline();

		gsap.set(logo, {
			opacity: 0
		});

		tl.fromTo(
			background,
			{
				x: '-100vw'
			},
			{
				x: 0,
				duration: 2.5,
				ease: 'expo.inOut',
				onComplete: () => {
					colorBackground = 'bg-transparent';
					logo.play();
				}
			}
		)
			.to(logo, {
				opacity: 1,
				duration: 0.25
			})
			.to(
				logo,
				{
					opacity: 0
				},
				'+=4'
			)
			.to(background, {
				x: '100vw',
				duration: 2.5,
				ease: 'expo.inOut'
			})
			.then(() => {
				if (!skip) {
					ready();
				}
			});
	});
</script>

{#if active}
	<div
		class={cls('fixed top-0 left-0 z-50 w-screen h-screen overflow-hidden', colorBackground)}
		id="loader"
	>
		<div class="flex items-center justify-center w-full h-full">
			<div bind:this={background} class="absolute w-full h-full bg-gray-100" />

			<video
				bind:this={logo}
				class="absolute"
				src={'/GFC_logo.mp4'}
				autoplay={false}
				muted
				loop
				preload="auto"
			/>
		</div>
	</div>
{/if}

<style>
</style>
