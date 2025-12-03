<script lang="ts">
	import { onMount } from 'svelte';

	import { cls } from '$lib/styles';
	import gsap, { SplitText } from '$lib/gsap';
	import { debounce } from '$lib/utils/debounce';

	let clazz: string = '';
	export { clazz as class };
	export let style: string = '';
	export let enabled: boolean = true;

	$: innerWidth = 0;
	let lastWidth = 0;

	let element: HTMLSpanElement;
	let paragraphs: any = null;
	let splitTexts: any[] = [];

	onMount(() => {
		lastWidth = innerWidth;
		initAnimation();
	});

	const initAnimation = () => {
		if (!enabled) return;

		paragraphs = element.querySelectorAll('p:not(:empty)');
		if (paragraphs?.length > 0) {
			paragraphs.forEach((p: any) => {
				p.style.opacity = '0';

				const text = new SplitText(p, {
					type: 'lines,words',
					linesClass: 'split-line'
				});

				splitTexts.push(text);
			});
		} else {
			gsap.set(element, { opacity: 0 });
		}
	};

	export const animateIn = () => {
		if (!enabled) return;

		if (paragraphs?.length > 0) {
			paragraphs.forEach((p: any, index: number) => {
				gsap.set(p, { opacity: 1 });

				const text = splitTexts[index];

				if (text.words.length > 0) {
					gsap.set(text.words, { yPercent: 200, opacity: 0 });

					gsap.to(text.words, {
						duration: 0.4,
						ease: 'circ.out',
						yPercent: 0,
						opacity: 1,
						stagger: 0.005
					});
				}

				if (text.lines.length > 0) {
					gsap.set(text.lines, { skewY: 5 });

					gsap.to(text.lines, {
						duration: 0.4,
						ease: 'circ.out',
						skewY: 0,
						stagger: 0.02
					});
				}
			});
		}
	};

	export const animateOut = () => {
		if (!enabled) return;

		if (paragraphs?.length > 0) {
			paragraphs.forEach((p: any, index: number) => {
				const text = splitTexts[index];

				if (text.words.length > 0) {
					gsap.to(text.words, {
						duration: 0.2,
						ease: 'circ.in',
						yPercent: -200,
						opacity: 0,
						stagger: 0.005
					});
				}

				if (text.lines.length > 0) {
					gsap.to(text.lines, {
						duration: 0.2,
						ease: 'circ.in',
						skewY: -5,
						stagger: 0.02
					});
				}
			});
		}
	};

	const onResize = () => {
		if (lastWidth === innerWidth) return;

		splitTexts?.forEach((text) => text.revert());
		splitTexts = [];
		paragraphs = [];
		initAnimation();

		lastWidth = innerWidth;
	};
</script>

<svelte:window bind:innerWidth on:resize={debounce(onResize)} />

<span bind:this={element} class={cls('inline-block break-words', clazz)} {style}>
	<span class="wrap"></span><slot />
</span>
