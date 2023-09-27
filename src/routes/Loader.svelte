<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	import gsap from '$lib/gsap';
	import { cls } from '$lib/styles';

	// avoid to reload the loader animation each time we update the page
	export let skip: boolean = false;

	const dispatch = createEventDispatcher();

	let background!: HTMLElement;
	let logo!: HTMLVideoElement;

	let active: boolean = true;
	let colorBackground: string = 'bg-white';

	function ready() {
		dispatch('complete');
	}

	const onVideoReady = () => {
		console.log('video ready');
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

	export const hideLoader = () => {
		active = false;
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
	<div
		class={cls('fixed top-0 left-0 z-40 w-screen h-screen overflow-hidden', colorBackground)}
		id="loader"
	>
		<div class="flex items-center justify-center w-full h-full">
			<div bind:this={background} class="absolute w-full h-full bg-white" />

			<video
				bind:this={logo}
				class="absolute"
				src={'/GFC-intro.mp4'}
				autoplay={false}
				muted
				preload="auto"
			/>
		</div>
	</div>
{/if}

<style>
</style>
