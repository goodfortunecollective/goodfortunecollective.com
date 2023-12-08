<script lang="ts">
	import { onMount } from 'svelte';

	import { cls } from '$lib/styles';
	import gsap, { SplitText, ScrollTrigger } from '$lib/gsap';
	import { useTransitionReady } from '$lib/utils/useTransitionReady';
	import CardsImage from '$lib/storyblok/CardsImage.svelte';

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
			if (paragraphs?.length > 0) {
				paragraphs.forEach((p: any) => {
					p.style.opacity = '0';
				});
			} else {
				gsap.set(element, { opacity: 0 });
			}
		}
	});

	useTransitionReady(
		() => {
			if (enabled) {
				ctx = gsap.context(() => {
					if (paragraphs?.length > 0) {
						paragraphs.forEach((p: any) => {
							gsap.set(p, { opacity: 1 });

							const text = new SplitText(p, {
								type: 'lines,words,chars',
								linesClass: 'split-line',
								charClass: 'split-char'
							});

							if (text.words.length > 0) {
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
							}

							if (text.lines.length > 0) {
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
							}
						});
					} else {
						gsap.to(element, { opacity: 1, delay: 0.4, duration: 0.6, ease: 'circ.out' });
					}
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
