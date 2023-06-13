<script lang="ts">
	import { gsap, ScrollSmoother, ScrollTrigger } from '$lib/gsap';
	import { cls } from '$lib/styles';
	import { beforeNavigate } from '$app/navigation';

	let background!: HTMLElement;
	let isTransition: boolean = false;

	beforeNavigate(async () => {
		// @ts-ignore
		const scroll = ScrollSmoother.get();

		isTransition = true;
		if (scroll) scroll.paused(true);

		const tl = gsap.timeline();

		tl.fromTo(
			background,
			{
				y: '150vh',
				scale: 1.5,
				rotation: 10
			},
			{
				y: 0,
				rotation: 0,
				duration: 2,
				ease: 'circ.inOut',
				onComplete: () => {
					if (scroll) scroll.scrollTo(0, 0);
					// @ts-ignore
					ScrollTrigger.refresh();
				}
			}
		);

		tl.fromTo(
			background,
			{ rotation: 10 },
			{
				y: '-100vh',
				scale: 1,
				rotation: 0,
				duration: 1.5,
				ease: 'power4.out'
			}
		).then(() => {
			isTransition = false;
			if (scroll) scroll.paused(false);
		});
	});
</script>

<div class={cls('h-full w-full fixed z-40 top-0 left-0', isTransition ? 'block' : 'hidden')}>
	<div bind:this={background} class="h-full w-full bg-gray-900" />
</div>

<style></style>
