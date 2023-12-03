<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	// avoid to reload the loader animation each time we update the page
	export let skip: boolean = false;

	export const hide = () => {
		active = false;
	};

	const dispatch = createEventDispatcher();
	let logo!: HTMLVideoElement;
	let active: boolean = true;

	function ready() {
		dispatch('complete');
	}

	const onVideoReady = () => {
		logo.addEventListener('ended', onVideoComplete, {
			once: true
		});

		logo.play();
	};

	const onVideoComplete = () => {
		if (!skip) {
			ready();
		}
	};

	onMount(async () => {
		if (skip) {
			requestAnimationFrame(ready);
			hideLoader();
			return;
		}

		if (logo.readyState >= logo.HAVE_ENOUGH_DATA) {
			onVideoReady();
		} else {
			logo.addEventListener('canplaythrough', onVideoReady, {
				once: true
			});
		}

		return () => {
			logo.removeEventListener('canplaythrough', onVideoReady);
			logo.removeEventListener('ended', onVideoComplete);
		};
	});
</script>

{#if active}
	<div class="fixed left-0 top-0 z-40 h-screen w-screen overflow-hidden bg-white" id="loader">
		<div class="flex h-full w-full items-center justify-center">
			<div class="absolute h-full w-full bg-white" />
			<video
				bind:this={logo}
				class="absolute scale-50"
				src={'/GFC-intro.mp4'}
				autoplay={false}
				muted
			/>
		</div>
	</div>
{/if}

<style>
</style>
