<script lang="ts">
	import { isTransitioningEnabled } from '$lib/stores';
	import { pageLeaveDuration } from '$lib/utils/page-transitions';
	import { cubicOut, quartOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';

	export let pathname: string = '';
</script>

<div class="relative z-10">
	{#key pathname}
		<div
			in:fade={{
				easing: cubicOut,
				duration: 0.1
			}}
			out:fade={{
				easing: quartOut,
				duration: 0.1,
				delay: $isTransitioningEnabled ? pageLeaveDuration : 0
			}}
		>
			<slot />
		</div>
	{/key}
</div>
