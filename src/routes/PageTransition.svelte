<script lang="ts">
	import { fly } from 'svelte/transition';
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
		// old content has been removed, pa ge is hidden
		// we can add curtains planes
		isPageHidden.set(true);
	}
</script>

<div class="relative z-10">
	{#key pathname}
		<div
			in:fly|local={{
				easing: cubicOut,
				duration: 1,
				delay: pageLeaveDuration + pageTransitionPauseDuration
			}}
			out:fly|local={{ easing: quartOut, duration: 1, delay: pageLeaveDuration * 0.5 - 100 }}
			on:outrostart={onPageChange}
			on:outroend={onOldContentRemoved}
		>
			<slot />
		</div>
	{/key}
</div>
