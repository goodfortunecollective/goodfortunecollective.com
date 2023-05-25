<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	import { cls } from '$lib/styles';

	import gfc from '$lib/images/gfc.svg';

	let background!: HTMLDivElement;
	let logo!: HTMLDivElement;
	let circle!: HTMLDivElement;

	let active: boolean = true;
	let colorBackground: string = 'bg-white';

	onMount(() => {
		const tl = gsap.timeline();

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
			active = false;
		});
	});
</script>

{#if active}
	<div class={cls('z-100 absolute top-0 w-screen h-screen overflow-hidden', colorBackground)}>
		<div class="flex items-center justify-center w-full h-full">
			<div bind:this={background} class="w-full h-full bg-gray-100 absolute" />
			<img bind:this={logo} class="h-8 w-auto absolute" src={gfc} alt="" />
			<div bind:this={circle} class="w-16 h-16 bg-gray-300 rounded-full absolute" />
		</div>
	</div>
{/if}

<style>
</style>
