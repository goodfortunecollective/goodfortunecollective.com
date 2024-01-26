<script lang="ts">
	import { onMount } from 'svelte';

	import gsap, { SplitText } from '$lib/gsap';

	export let label: string;

	let el!: HTMLElement;
	let childrenEl!: HTMLElement;

	let textEl: any = null;
	let textChildrenEl: any = null;

	onMount(() => {
		textEl = new SplitText(el, {
			type: 'lines,words,chars',
			linesClass: 'split-line',
			charClass: 'split-char'
		});

		textChildrenEl = new SplitText(childrenEl, {
			type: 'lines,words,chars',
			linesClass: 'split-line',
			charClass: 'split-char'
		});

		gsap.set(textChildrenEl.chars, { y: el.clientHeight + 4 });
	});

	const onEnter = () => {
		gsap.to(textEl.chars, {
			duration: 0.3,
			delay: 0,
			ease: 'circ.out',
			y: -el.clientHeight,
			stagger: 0.01
		});

		gsap.to(textChildrenEl.chars, {
			duration: 0.3,
			delay: 0,
			ease: 'circ.out',
			y: 0,
			stagger: 0.01
		});
	};

	const onLeave = () => {
		gsap.to(textEl.chars, {
			duration: 0.3,
			delay: 0,
			ease: 'circ.out',
			y: 0,
			stagger: 0.01
		});

		gsap.to(textChildrenEl.chars, {
			duration: 0.3,
			delay: 0,
			ease: 'circ.out',
			y: el.clientHeight + 4,
			stagger: 0.01
		});
	};
</script>

<span
	class="relative inline-block h-full w-full overflow-hidden leading-none"
	on:mouseenter={onEnter}
	on:mouseleave={onLeave}
	role="button"
	tabindex="0"
>
	<span bind:this={el} class="pointer-events-none relative inline-block h-full w-full">
		{label}
	</span>
	<span bind:this={childrenEl} class="pointer-events-none absolute left-0 h-full w-full">
		{label}
	</span>
</span>
