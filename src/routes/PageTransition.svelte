<script lang="ts">
	import { fly } from 'svelte/transition';
	import { quartOut, cubicOut } from 'svelte/easing';

	import { pageLeaveDuration, pageEnterDuration } from '$lib/utils/page-transitions';
	import { pageTransitionPauseDuration } from '$lib/utils/page-transitions.js';

	export let pathname: string = '';

	function onPageChange(e): void {
		e.target.style.position = 'absolute';
		e.target.style.width = '100%';
	}
</script>

<div class="relative z-10">
	{#key pathname}
		<div
			in:fly|local={{
				easing: cubicOut,
				duration: 0.1,
				delay: pageTransitionPauseDuration / 4
			}}
			out:fly|local={{
				easing: quartOut,
				duration: 0.1,
				delay: pageLeaveDuration
			}}
			on:outrostart={onPageChange}
		>
			<slot />
		</div>
	{/key}
</div>
