<script lang="ts">
	import { onMount } from 'svelte';

	import { cls } from '$lib/styles';
	import gsap, { SplitText, ScrollTrigger } from '$lib/gsap';
	import { useTransitionReady } from '$lib/utils/useTransitionReady';

	let clazz: string = '';
	export { clazz as class };
	export let style: string = '';
	export let enabled: boolean = true;

	let element: HTMLSpanElement;

	let ctx: any = null;
	let paragraphs: any = null;

	onMount(() => {
		if (enabled) {
			paragraphs = element.querySelectorAll('p:not(:empty)');
			gsap.set(paragraphs, { opacity: 0 });
		}
	});

	useTransitionReady(
		() => {
			if (enabled) {
				ctx = gsap.context(() => {
					paragraphs.forEach((p: any) => {
						gsap.set(p, { opacity: 1 });

						const text = new SplitText(p, {
							type: 'lines,words,chars',
							linesClass: 'split-line',
							charClass: 'split-char'
						});

						gsap.set(text.words, { yPercent: 200, opacity: 0 });

						ScrollTrigger.batch(text.words, {
							start: 'top 90%',
							end: 'bottom 10%',
							top: 'top center',
							toggleActions: 'restart pause resume reverse',
							onEnter(elements: any, triggers: any) {
								gsap.to(elements, {
									duration: 0.4,
									ease: 'circ.out',
									yPercent: 0,
									opacity: 1,
									stagger: 0.005
								});
							}
						});

						gsap.set(text.lines, { skewY: 5 });

						ScrollTrigger.batch(text.lines, {
							start: 'top 90%',
							end: 'bottom 10%',
							top: 'top center',
							toggleActions: 'restart pause resume reverse',
							onEnter(elements: any, triggers: any) {
								gsap.to(elements, {
									duration: 0.4,
									ease: 'circ.out',
									skewY: 0,
									stagger: 0.02
								});
							}
						});
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
