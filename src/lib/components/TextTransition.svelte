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
	export let type: 'words' | 'chars' = 'chars';

	let element: HTMLSpanElement;

	let ctx: any = null;
	let text: any = null;
	let typeText: any = null;

	onMount(() => {
		if (enabled) {
			text = new SplitText(element, {
				type: 'lines,words,chars',
				linesClass: underline
					? 'split-line c-animated-underline c-animated-underline__heading'
					: 'split-line',
				charClass: 'split-char'
			});

			typeText = type === 'words' ? text.words : text.chars;

			gsap.set(typeText, { yPercent: 200, opacity: 0 });
		}
	});

	useTransitionReady(
		() => {
			if (enabled) {
				ctx = gsap.context(() => {
					gsap.set(typeText, { opacity: 1 });

					ScrollTrigger.batch(typeText, {
						start: 'top 90%',
						end: 'bottom 10%',
						top: 'top center',
						toggleActions: 'restart pause resume reverse',
						onEnter(elements: any, triggers: any) {
							gsap.to(elements, {
								duration: 0.4,
								ease: 'circ.out',
								yPercent: 0,
								stagger: 0.02
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
