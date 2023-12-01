<script lang="ts">
	import { onMount } from 'svelte';

	import { useScroll } from '$lib/lifecycle-functions/useScroll';
	import { curtains } from '$lib/stores';
	import { Curtains } from '$lib/vendors/curtainsjs/core/Curtains';

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

		return () => {
			if ($curtains) {
				$curtains.dispose();
			}
			curtains.set(null);
		};
	});

	function onScroll(scroll: number) {
		if ($curtains) $curtains.render();
	}

	useScroll((scroll) => {
		onScroll(scroll);
	});
</script>

<div id="canvas" class="fixed left-0 right-0 top-0 z-[1] h-screen" />
