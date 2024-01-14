<script lang="ts">
	import { onMount } from 'svelte';

	import { cls } from '$lib/styles';
	import gsap, { SplitText, ScrollTrigger } from '$lib/gsap';
	import { useTransitionReady } from '$lib/utils/useTransitionReady';

	let clazz: string = '';
	export { clazz as class };
	export let style: string = '';
	export let enabled: boolean = true;
	export let underline: boolean = false;

	let element: HTMLSpanElement;

	let ctx: any = null;
	let text: any = null;

	onMount(() => {
		if (enabled) {
			text = new SplitText(element, {
				type: 'lines,words,chars',
				linesClass: underline
					? 'split-line animated-underline animated-underline__heading'
					: 'split-line',
				charClass: 'split-char'
			});

			gsap.set(text.chars, { yPercent: 200, opacity: 0 });
		}
	});

	useTransitionReady(
		() => {
			if (enabled) {
				ctx = gsap.context(() => {
					gsap.set(text.chars, { opacity: 1 });

					ScrollTrigger.batch(text.chars, {
						start: 'top 90%',
						end: 'bottom 10%',
						top: 'top center',
						toggleActions: 'restart pause resume reverse',
						onEnter(elements: any, triggers: any) {
							gsap.to(elements, {
								duration: 0.2,
								ease: 'circ.out',
								yPercent: 0,
								stagger: 0.01
							});
						}
					});
				}, element);
			}
		},
		() => {
			if (ctx) ctx.revert();
		}
	);
</script>

<span bind:this={element} class={cls('inline-block break-words', clazz)} {style}>
	<span class="wrap" /><slot />
</span>
