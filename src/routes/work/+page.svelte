<script>
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	import ScrollTrigger from '$lib/gsap/ScrollTrigger';
	import ScrollSmoother from '$lib/gsap/ScrollSmoother';

	onMount(() => {
		gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

		let skewSetter = gsap.quickTo('.a-skew-y', 'skewY'),
			clamp = gsap.utils.clamp(-5, 5);

		// @ts-ignore
		ScrollSmoother.create({
			smooth: 1.5,
			effects: true,
			onUpdate: (self) => skewSetter(clamp(self.getVelocity() / -50)),
			onStop: () => skewSetter(0)
		});

		gsap.fromTo(
			'.a-img-left',
			{
				opacity: 0,
				scale: 1.05
			},
			{
				opacity: 1,
				scale: 1,
				duration: 1,
				delay: 1.5,
				stagger: 0.25,
				ease: 'power4.out'
			}
		);

		gsap.fromTo(
			'.a-img-right',
			{
				opacity: 0,
				scale: 1.05
			},
			{
				opacity: 1,
				scale: 1,
				duration: 1,
				delay: 1.75,
				stagger: 0.25,
				ease: 'power4.out'
			}
		);
	});
</script>

<svelte:head>
	<title>Work</title>
	<meta name="description" content="Work" />
</svelte:head>

<div class="text-column">
	<h1>Work</h1>
	<section class="flex justify-between">
		<div class="flex-col space-y-4" data-speed="1.1">
			<div class="a-skew-y">
				<img
					class="flex a-skew-y a-img-left"
					data-speed="1.1"
					src="https://placehold.co/400x300"
					alt=""
				/>
			</div>
			<div class="a-skew-y">
				<img
					class="flex a-skew-y a-img-left"
					data-speed="1.05"
					src="https://placehold.co/400x300"
					alt=""
				/>
			</div>
			<div class="a-skew-y">
				<img
					class="flex a-skew-y a-img-left"
					data-speed="1.1"
					src="https://placehold.co/400x300"
					alt=""
				/>
			</div>
			<div class="a-skew-y">
				<img
					class="flex a-skew-y a-img-left"
					data-speed="1.05"
					src="https://placehold.co/400x300"
					alt=""
				/>
			</div>
		</div>
		<div class="flex-col space-y-4">
			<div class="a-skew-y">
				<img
					class="flex a-skew-y a-img-right"
					data-speed="1.1"
					src="https://placehold.co/400x300"
					alt=""
				/>
			</div>
			<div class="a-skew-y">
				<img
					class="flex a-skew-y a-img-right"
					data-speed="1.05"
					src="https://placehold.co/400x300"
					alt=""
				/>
			</div>
			<div class="a-skew-y">
				<img
					class="flex a-skew-y a-img-right"
					data-speed="1.1"
					src="https://placehold.co/400x300"
					alt=""
				/>
			</div>
			<div class="a-skew-y">
				<img
					class="flex a-skew-y a-img-right"
					data-speed="1.05"
					src="https://placehold.co/400x300"
					alt=""
				/>
			</div>
		</div>
	</section>
</div>
