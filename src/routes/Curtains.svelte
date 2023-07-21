<script lang="ts">
	import { curtains } from '../lib/stores';
	import { gsap } from '$lib/gsap';
	import { Curtains } from '$lib/vendors/curtainsjs/core/Curtains';
	import { onMount } from 'svelte';

	function scrollonUpdate(event: any) {
		if ($curtains) {
			$curtains.updateScrollValues(0, event.detail.offsetY);
			// $curtains.needRender();
		}
	}

	onMount(() => {
		// 0 - no touch (pointer/mouse only)
		// 1 - touch-only device (like a phone)
		// 2 - device can accept touch input and mouse/pointer (like Windows tablets)
		const touchCapability: number =
			window.matchMedia && window.matchMedia('(hover: none), (pointer: coarse)').matches
				? 1
				: 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
				? 2
				: 0;

		if (touchCapability !== 1) {
			curtains.set(
				new Curtains({
					container: 'canvas',
					watchScroll: false,
					autoRender: false,
					pixelRatio: Math.min(1.5, window.devicePixelRatio) // limit pixel ratio for performance
				})
			);

			// $curtains.disableDrawing();

			$curtains
				.onError(() => {
					// we will add a class to the document body to display original images
					document.body.classList.add('no-curtains');
				})
				.onContextLost(() => {
					// on context lost, try to restore the context
					$curtains.restoreContext();
				});
		} else {
			// we will add a class to the document body to display original images
			document.body.classList.add('no-curtains');
		}

		const onRender = () => {
			if ($curtains) $curtains.render();
		};

		gsap.ticker.fps(60);
		gsap.ticker.add(onRender);

		window.addEventListener('smoothScrollUpdate', scrollonUpdate);

		return () => {
			// this function is called when the component is destroyed
			window.removeEventListener('smoothScrollUpdate', scrollonUpdate);

			if ($curtains) {
				gsap.ticker.remove(onRender);
				$curtains.dispose();
			}
			curtains.set(null);
		};
	});
</script>

<div id="canvas" />

<style lang="scss">
	#canvas {
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		height: 100vh;
		z-index: 1;
	}
</style>
