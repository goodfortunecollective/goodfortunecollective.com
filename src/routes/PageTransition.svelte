<script lang="ts">
	import { fade } from 'svelte/transition';
	import { quartOut, cubicOut } from 'svelte/easing';

	import { isPageHidden } from '$lib/stores';
	import { pageLeaveDuration, pageEnterDuration } from '$lib/utils/page-transitions';
	import { pageTransitionPauseDuration } from '$lib/utils/page-transitions.js';

	export let pathname: string = '';

	function onPageChange(e): void {
		e.target.style.position = 'absolute';
		e.target.style.width = '100%';
	}

	function onOldContentRemoved(e): void {
		// old content has been removed, page is hidden
		// we can add curtains planes
		isPageHidden.set(true);
	}
</script>

{#key pathname}
	<div
		in:fade|local={{
			easing: cubicOut,
			duration: pageEnterDuration * 0.5,
			delay: pageLeaveDuration + pageTransitionPauseDuration + pageEnterDuration * 0.5
		}}
		out:fade|local={{ easing: quartOut, duration: 100, delay: pageLeaveDuration * 0.5 - 100 }}
		on:outrostart={onPageChange}
		on:outroend={onOldContentRemoved}
		class="relative z-10"
	>
		<slot />
	</div>
{/key}
