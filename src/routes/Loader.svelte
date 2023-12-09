<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	import { base } from '$app/paths';

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

	onMount(() => {
		if (skip) {
			requestAnimationFrame(ready);
			return;
		}

		logo.addEventListener('ended', ready);

		return () => {
			if (!skip) {
				logo.removeEventListener('ended', ready);
			}
		};
	});
</script>

{#if active}
	<div class="fixed left-0 top-0 z-40 h-screen w-screen overflow-hidden bg-white">
		<div class="flex h-full w-full items-center justify-center">
			<div class="absolute h-full w-full bg-white" />
			<video bind:this={logo} playsinline autoplay muted class="absolute scale-50">
				<source src={`${base}/assets/GFC-intro.mp4`} />
			</video>
		</div>
	</div>
{/if}

<style>
</style>
