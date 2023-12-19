<script lang="ts">
	import { fade } from 'svelte/transition';
	import { quartOut, cubicOut } from 'svelte/easing';
	import { pageLeaveDuration } from '$lib/utils/page-transitions';
	import { isTransitioningEnabled } from '$lib/stores';

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
