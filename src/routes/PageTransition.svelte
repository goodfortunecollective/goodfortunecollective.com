<script lang="ts">
	import { fly } from 'svelte/transition';
	import { quartOut, cubicOut } from 'svelte/easing';

	import { pageLeaveDuration, pageEnterDuration } from '$lib/utils/page-transitions';
	import { pageTransitionPauseDuration } from '$lib/utils/page-transitions.js';

	export let pathname: string = '';
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
				delay: pageTransitionPauseDuration / 4
			}}
		>
			<slot />
		</div>
	{/key}
</div>
