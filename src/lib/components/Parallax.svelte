<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

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

	onMount(() => {
		if (innerWidth < 1024) return;

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
