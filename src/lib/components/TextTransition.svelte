<script lang="ts">
	import gsap, { SplitText, ScrollTrigger } from '$lib/gsap';
	import { useTransitionReady } from '$lib/utils/useTransitionReady';
	import { onMount } from 'svelte';

	let element: HTMLSpanElement;

	let ctx: any = null;
	let text: any = null;

	export let enabled: boolean = true;
	export let type: 'heading' | 'p' = 'p';

	onMount(() => {
		if (enabled) {
			text = new SplitText(element, {
				type: 'lines,words,chars',
				linesClass: 'split-line',
				charClass: 'split-char'
			});

			if (type === 'heading') {
				gsap.set(text.chars, { yPercent: 100 });
			}
		}
	});

	useTransitionReady(
		() => {
			if (enabled) {
				ctx = gsap.context(() => {
					if (type === 'heading') {
						gsap.to(text.chars, {
							scrollTrigger: {
								trigger: element,
								top: 'top center',
								toggleActions: 'restart pause resume reverse'
							},
							duration: 0.2,
							ease: 'circ.out',
							yPercent: 0,
							stagger: 0.01
						});
					}

					if (type === 'p') {
						gsap.from(text.lines, {
							scrollTrigger: {
								trigger: element,
								toggleActions: 'restart pause resume reverse',
								start: 'bottom 90%'
							},
							duration: 0.6,
							autoAlpha: 0,
							ease: 'circ.out',
							yPercent: 25,
							stagger: 0.2
						});
					}
				}, element);
			}
		},
		() => {
			if (ctx) ctx.revert();
		}
	);
</script>

<span bind:this={element} class="inline-block break-words">
	<span class="wrap" /><slot />
</span>
