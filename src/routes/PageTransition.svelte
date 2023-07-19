<script lang="ts">
	import { fade } from 'svelte/transition';
	import { quartOut, cubicOut } from 'svelte/easing';
	import { isPageHidden } from '$lib/stores';

	export let pathname: string = '';

	function onPageChange(e): void {
		e.target.style.position = 'absolute';
		e.target.style.width = '100%';
	}

	function onOldContentRemoved(): void {
		// old content has been removed, page is hidden
		// we can add curtains planes
		isPageHidden.set(true);
	}
</script>

{#key pathname}
	<div
		in:fade={{ easing: cubicOut, duration: 100, delay: 1500 }}
		on:outrostart={onPageChange}
		out:fade={{ easing: quartOut, duration: 100, delay: 1200 }}
		on:outrostart={onPageChange}
		on:outroend={onOldContentRemoved}
	>
		<slot />
	</div>
{/key}
