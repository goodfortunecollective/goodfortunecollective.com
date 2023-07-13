<script lang="ts">
	import {curtains} from '../lib/stores';
	import {ScrollSmoother} from '$lib/gsap';
	import {Curtains} from '$lib/vendors/curtainsjs/core/Curtains';
	import {onMount} from 'svelte';

	let scroll: ScrollSmoother | null = null;

	function scrollonUpdate(event: any) {
		// @ts-ignore
		scroll = ScrollSmoother.get();

		if ($curtains) {
			$curtains.updateScrollValues(0, event.detail.offsetY);
			// $curtains.needRender();
		}
	}

	onMount(() => {
		curtains.set(
			new Curtains({
				container: 'canvas',
				watchScroll: false,
				pixelRatio: Math.min(1.5, window.devicePixelRatio) // limit pixel ratio for performance
			})
		);

		// $curtains.disableDrawing();


		$curtains.onError(() => {
			// we will add a class to the document body to display original images
			document.body.classList.add('no-curtains', 'planes-loaded');
		})
			.onContextLost(() => {
				// on context lost, try to restore the context
				$curtains.restoreContext();
			})

		window.addEventListener('smoothScrollUpdate', scrollonUpdate);

		return () => {
			// this function is called when the component is destroyed
			window.removeEventListener('smoothScrollUpdate', scrollonUpdate);

			if ($curtains) $curtains.dispose();
			curtains.set(null);
		};
	});
</script>

<div id="canvas"/>

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
