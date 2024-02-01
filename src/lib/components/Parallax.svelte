<script lang="ts">
	import { onDestroy, afterUpdate } from 'svelte';

	import { cls } from '$lib/styles';
	import gsap from '$lib/gsap';

	let clazz: string;
	export { clazz as class };

	export let speed: number = 1;
	export let id: string = '';

	$: innerWidth = 0;

	let ctx: any = null;
	let targetEl!: HTMLElement;
	let triggerEl!: HTMLElement;
	let tl: any;

	afterUpdate(() => {
		if (innerWidth < 1024) return;

		console.log('----------');

		const y = innerWidth * speed * 0.1;
		const setY = gsap.quickSetter(targetEl, 'y', 'px');

		ctx = gsap.context(() => {
			tl = gsap.timeline({
				scrollTrigger: {
					id,
					trigger: triggerEl,
					scrub: true,
					start: 'top 75%',
					end: 'bottom top',
					onUpdate: (e) => {
						setY(e.progress * y);
					}
				}
			});
		}, triggerEl);
	});

	onDestroy(() => {
		console.log('killll');
		if (ctx) ctx.revert();
		if (tl) tl.kill();
	});
</script>

<svelte:window bind:innerWidth />

<div class={cls('relative', clazz)} bind:this={triggerEl}>
	<div bind:this={targetEl}>
		<slot />
	</div>
</div>
