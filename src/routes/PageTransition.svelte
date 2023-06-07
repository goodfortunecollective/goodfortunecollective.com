<script lang="ts">
	import { fly } from 'svelte/transition';
	import { quartOut, cubicOut } from 'svelte/easing';

	export let pathname: string = '';
</script>

{#key pathname}
	<div
		in:fly={{ easing: cubicOut, y: 100, opacity: 0, duration: 100, delay: 2000 }}
		out:fly={{ easing: quartOut, y: -100, opacity: 1, duration: 100, delay: 1200 }}
	>
		<slot />
	</div>
{/key}
