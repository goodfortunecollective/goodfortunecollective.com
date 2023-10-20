<script lang="ts">
	import { onMount } from 'svelte';

	import { cls } from '$lib/styles';
	import gsap, { SplitText } from '$lib/gsap';
	import { useTransitionReady } from '$lib/utils/useTransitionReady';

	let clazz: string = '';
	export { clazz as class };
	export let style: string = '';
	export let enabled: boolean = true;
	export let type: 'heading' | 'p' = 'p';

	let element: HTMLSpanElement;

	let ctx: any = null;
	let text: any = null;

	onMount(() => {
		if (enabled) {
			text = new SplitText(element, {
				type: 'lines,words,chars',
				linesClass: 'split-line',
				charClass: 'split-char'
			});

			if (type === 'heading') {
				gsap.set(text.chars, { yPercent: 200, opacity: 0 });
			}
		}
	});

	useTransitionReady(
		() => {
			if (enabled) {
				ctx = gsap.context(() => {
					if (type === 'heading') {
						gsap.set(text.chars, { opacity: 1 });
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

<span bind:this={element} class={cls('inline-block break-words', clazz)} {style}>
	<span class="wrap" /><slot />
</span>
