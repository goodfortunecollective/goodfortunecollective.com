<script lang="ts">
	import gsap, { SplitText, ScrollTrigger } from '$lib/gsap';
	import { useTransitionReady } from '$lib/utils/useTransitionReady';

	let element: HTMLSpanElement;

	let ctx: any = null;

	export let enabled: boolean = true;
	export let type: 'heading' | 'p' = 'p';

	useTransitionReady(
		() => {
			if (enabled) {
				ctx = gsap.context(() => {
					const text: any = new SplitText(element, {
						type: 'lines,words,chars',
						linesClass: 'split-line',
						charClass: 'split-char'
					});

					if (type === 'heading') {
						gsap.from(text.chars, {
							scrollTrigger: {
								trigger: element,
								start: 'bottom 80%',
								toggleActions: 'restart pause resume reverse'
							},
							duration: 0.2,
							ease: 'circ.out',
							yPercent: 100,
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
				});
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
