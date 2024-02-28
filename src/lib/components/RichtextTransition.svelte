<script lang="ts">
	import { onMount } from 'svelte';

	import { cls } from '$lib/styles';
	import gsap, { SplitText, ScrollTrigger } from '$lib/gsap';
	import { useTransitionReady } from '$lib/utils/useTransitionReady';
	import { debounce } from '$lib/utils/debounce';

	let clazz: string = '';
	export { clazz as class };
	export let style: string = '';
	export let enabled: boolean = true;

	$: innerWidth = 0;
	let lastWidth = 0;

	let element: HTMLSpanElement;

	let ctx: any = null;
	let paragraphs: any = null;
	let text: any = null;

	onMount(() => {
		lastWidth = innerWidth;
		initAnimation();
	});

	const initAnimation = () => {
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
	};

	const createAnimation = () => {
		if (enabled) {
			ctx = gsap.context(() => {
				if (paragraphs?.length > 0) {
					paragraphs.forEach((p: any) => {
						gsap.set(p, { opacity: 1 });

						text = new SplitText(p, {
							type: 'lines,words',
							linesClass: 'split-line'
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
	};

	useTransitionReady(
		() => {
			createAnimation();
		},
		() => {
			if (ctx) ctx.revert();
		}
	);

	const onResize = () => {
		if (lastWidth === innerWidth) return;

		if (text) text.revert();
		if (ctx) ctx.revert();
		initAnimation();
		createAnimation();

		lastWidth = innerWidth;
	};
</script>

<svelte:window bind:innerWidth on:resize={debounce(onResize)} />

<span
	bind:this={element}
	class={cls(
		'[&_a]:c-animated-underline inline-block break-words [&_p]:duration-1000 [&_p]:ease-out',
		clazz
	)}
	{style}
>
	<span class="wrap" /><slot />
</span>
