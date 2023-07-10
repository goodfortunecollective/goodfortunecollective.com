<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { gsap, ScrollSmoother, ScrollTrigger } from '$lib/gsap';
	import { cls } from '$lib/styles';

	let background!: HTMLElement;
	let isTransition: boolean = false;

	beforeNavigate(async () => {
		console.log('beforeNavigate');
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
			const hash = $page.url.hash.slice(1);

			if (scroll) {
				scroll.paused(false);

				if (hash) {
					const scrollElem = document.getElementById(hash);

					if (scrollElem) {
						gsap.to(scroll, {
							scrollTop: scroll.offset(scrollElem, 'top top'),
							duration: 1,
							delay: 0.5
						});
					}
				}
			}
		});
	});
</script>

<div class={cls('h-full w-full fixed z-40 top-0 left-0', isTransition ? 'block' : 'hidden')}>
	<div bind:this={background} class="h-full w-full bg-gray-900" />
</div>

<style></style>
