<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	import gsap, { SplitText } from '$lib/gsap';

	let element: HTMLSpanElement;

	let animChars: any = null;
	let animLines: any = null;

	export let enabled: boolean = true;

	onMount(() => {
		if (enabled) {
			const text = new SplitText(element, {
				type: 'lines,words,chars',
				linesClass: 'split-line'
			});

			animChars = gsap.from(text.chars, {
				scrollTrigger: {
					trigger: element,
					start: 'bottom 80%',
					markers: true,
					toggleActions: 'restart pause resume reverse'
				},
				duration: 0.2,
				ease: 'circ.out',
				y: 40,
				stagger: 0.01
			});

			animLines = gsap.from(text.lines, {
				scrollTrigger: {
					trigger: element,
					start: 'bottom 80%',
					markers: true,
					toggleActions: 'restart pause resume reverse'
				},
				duration: 0.2,
				ease: 'circ.out',
				rotateX: 40,
				stagger: 0.01
			});
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

<span bind:this={element}>
	<slot />
</span>
