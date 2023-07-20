<script lang="ts">
	import { delay_anim_page } from '$lib/stores';
	import { gsap, SplitText, ScrollTrigger } from '$lib/gsap';
	import { isPageHidden, isTransitioning } from '../stores';
	import { cls } from '$lib/styles';
	import { onDestroy, onMount } from 'svelte';

	export let as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h1';
	export let size: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h1';

	const textSizes = {
		h1: 'text-6xl md:text-8xl',
		h2: 'text-5xl',
		h3: 'text-4xl',
		h4: 'text-3xl',
		h5: 'text-xl',
		h6: 'text-lg'
	};

	let headingTl: any = null;
	let headingEl: HTMLElement;

	// only add timeline when the page has been scrolled to top after a transition
	let canCreateTl,
		isTransition,
		isHidden: boolean = false;

	const createScrollTriggerTl = () => {
		if (canCreateTl) {
			//console.log('create scroll tl', as, headingEl.innerText);

			if (headingTl) headingTl.kill();

			const text = new SplitText(headingEl, {
				type: 'chars'
			});

			let chars = text.chars;

			// @ts-ignore
			gsap.set(headingEl, { perspective: 400 });

			const scrollTrigger = ScrollTrigger.create({
				trigger: headingEl,
				start: '50% 80%',
				end: 'bottom 20%',
				once: true,
				onEnter: ({ isActive }) => {
					// force animation to play on first load
					// super dirty but not working otherwise...
					if (isActive) {
						setTimeout(() => {
							if (headingTl && !headingTl.isActive()) {
								headingTl.restart();
							}
						});
					}
				}
			});

			if (chars.length) {
				headingTl = gsap
					.timeline({
						scrollTrigger,
						delay: as === 'h1' ? $delay_anim_page : 0
					})
					.from(chars, {
						duration: 0.8,
						opacity: 0,
						scale: 0,
						y: 80,
						rotationX: 180,
						transformOrigin: '0% 50% -50',
						ease: 'back',
						stagger: 0.01
					});
			}
		}
	};

	onMount(() => {
		//createScrollTriggerTl();

		isTransitioning.subscribe((value: boolean) => {
			isTransition = value;
			// create plane if we're not coming from a page transition
			// (ie first load, project filters, etc)
			if (!value && !canCreateTl) {
				canCreateTl = true;
				createScrollTriggerTl();
			}
		});

		isPageHidden.subscribe((value: boolean) => {
			isHidden = value;
			if (value && isTransition && !canCreateTl) {
				// coming from a page transition
				canCreateTl = true;
				createScrollTriggerTl();
			}
		});
	});

	onDestroy(() => {
		if (headingTl) headingTl.kill();

		headingTl = null;
	});
</script>

<svelte:element
	this={as}
	bind:this={headingEl}
	{...$$restProps}
	class={cls(textSizes[size], 'w-full font-degular-display', $$props.class)}
>
	<slot />
</svelte:element>

<!--
    @component Heading
    ## Props
    @prop as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h1';
    @prop size: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h1';
    ## Example
    ```
    <script>
      import {  Heading  } from '$lib/components'
    </script>

    <div  class="text-center">
      <Heading as="h2" size="h1" class="mb-4">We invest in the world’s potential</Heading>
     </div>
    ```
  -->
