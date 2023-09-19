<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	import gsap, { SplitText } from '$lib/gsap';

	let element: HTMLSpanElement;
	let animChars: any = null;
	let animLines: any = null;

	export let enabled: boolean = true;
	export let type: 'heading' | 'p' = 'p';
	export let text: any = null;

	onMount(() => {
		if (enabled) {
			text = new SplitText(element, {
				type: 'lines,words,chars',
				linesClass: 'split-line',
				charClass: 'split-char'
			});

			if (type === 'heading') {
				animChars = gsap.from(text.chars, {
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
				animLines = gsap.from(text.lines, {
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
		}
	});

	onDestroy(() => {
		if (animChars) {
			animChars.kill();
			animChars = null;
		}

		if (animLines) {
			animLines.kill();
			animLines = null;
		}
	});
</script>

<span bind:this={element} class="inline-block break-words">
	<span class="wrap" /><slot />
</span>
