<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	import { dev } from '$app/environment';
	import { gsap } from '$lib/gsap';
	import { cls } from '$lib/styles';
	import { delay_anim_page } from '$lib/stores';
	import { Gfc } from '$lib/components';

	const dispatch = createEventDispatcher();

	let background!: HTMLDivElement;
	let logo!: HTMLDivElement;
	let circle!: HTMLDivElement;

	let active: boolean = true;
	let colorBackground: string = 'bg-white';

	function ready() {
		active = false;
		dispatch('complete');
		delay_anim_page.set(1.5);
	}

	onMount(async () => {
		const tl = gsap.timeline();

		if (dev) {
			requestAnimationFrame(ready);
			return;
		}

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
				}
			}
		);

		tl.fromTo(
			circle,
			{
				scale: 0.5,
				opacity: 0,
				x: 0
			},
			{
				scale: 1,
				opacity: 1,
				x: 100,
				duration: 0.5,
				ease: 'expo.inOut'
			}
		);

		tl.to(circle, {
			x: -100,
			duration: 1,
			ease: 'expo.inOut'
		});

		tl.fromTo(
			logo,
			{
				opacity: 0
			},
			{
				opacity: 1,
				delay: 0.5,
				duration: 0.5,
				ease: 'expo.inOut'
			},
			'<'
		);

		tl.to(circle, {
			x: 100,
			opacity: 0,
			delay: 1,
			duration: 0.5,
			ease: 'expo.inOut'
		});

		tl.to(
			logo,
			{
				opacity: 0,
				duration: 0.5,
				ease: 'expo.inOut'
			},
			'<'
		);

		tl.fromTo(
			background,
			{
				x: 0
			},
			{
				x: '100vw',
				duration: 2.5,
				ease: 'expo.inOut'
			},
			'<'
		).then(() => {
			if (!dev) {
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
			<div bind:this={logo} class="absolute">
				<Gfc class="w-auto h-8" alt="" />
			</div>
			<div bind:this={circle} class="absolute w-16 h-16 bg-gray-300 rounded-full" />
		</div>
	</div>
{/if}

<style>
</style>
