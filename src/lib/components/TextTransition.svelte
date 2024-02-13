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
	export let underline: boolean = false;
	export let blockType: 'list' | 'default' = 'list';
	export let speed: number = 1;

	let element: HTMLSpanElement;

	let ctx: any = null;
	let text: any = null;

	onMount(() => {
		if (enabled) {
			text = new SplitText(element, {
				type: 'lines,words',
				linesClass: underline
					? 'split-line c-animated-underline c-animated-underline__heading'
					: blockType === 'list'
						? 'split-line__list'
						: 'split-line',
				charClass: 'split-char'
			});

			gsap.set(text.words, { yPercent: 100, opacity: 0 });
			gsap.set(text.lines, { rotateZ: 4 });
		}
	});

	useTransitionReady(
		() => {
			if (enabled) {
				ctx = gsap.context(() => {
					gsap.set(text.words, { opacity: 1 });

					ScrollTrigger.batch(text.words, {
						start: 'top 90%',
						end: 'bottom 10%',
						top: 'top center',
						toggleActions: 'restart pause resume reverse',
						onEnter(elements: any, triggers: any) {
							gsap.to(elements, {
								duration: 0.4 * speed,
								ease: 'circ.out',
								yPercent: 0,
								stagger: 0.03
							});

							gsap.to(text.lines, {
								duration: 0.3 * speed,
								ease: 'sine.out',
								rotateZ: 0,
								stagger: 0.01,
								delay: 0.1
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

	const onResize = () => {
		if (text) text.split();
	};
</script>

<svelte:window on:resize={debounce(onResize)} />

<span
	bind:this={element}
	class={cls('inline-block break-words duration-1000 ease-out', clazz)}
	{style}
>
	<span class="wrap" /><slot />
</span>
