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

						const text = new SplitText(p, {
							type: 'lines',
							linesClass: 'split-line'
						});

						const textParent = new SplitText(p, {
							type: ['lines'],
							linesClass: 'c-richtext-transition'
						});

						gsap.set('.c-richtext-transition', { overflow: 'hidden' });

						if (text.lines.length > 0) {
							gsap.set(text.lines, {
								rotation: 6,
								yPercent: 20,
								opacity: 0,
								transformOrigin: '0% 0%'
							});

							ScrollTrigger.batch(text.lines, {
								start: 'top 90%',
								end: 'bottom 10%',
								top: 'top center',
								toggleActions: 'restart pause resume reverse',
								onEnter(elements: any, triggers: any) {
									gsap.to(elements, {
										duration: 0.3,
										ease: 'circ.out',
										yPercent: 0,
										rotation: 0,
										opacity: 1,
										stagger: 0.06,
										onComplete: () => {}
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

		if (ctx) ctx.revert();
		initAnimation();
		createAnimation();

		lastWidth = innerWidth;
	};
</script>

<svelte:window bind:innerWidth on:resize={debounce(onResize, 1000)} />

<span
	bind:this={element}
	class={cls(
		'[&_a]:c-animated-underline inline-block break-words [&_p]:overflow-hidden [&_p]:duration-1000 [&_p]:ease-out',
		clazz
	)}
	{style}
>
	<span class="wrap"></span><slot />
</span>
