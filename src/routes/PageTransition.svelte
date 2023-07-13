<script lang="ts">
	import { fly } from 'svelte/transition';
	import { quartOut, cubicOut } from 'svelte/easing';

	export let pathname: string = '';

	function onPageChange(e) {
		e.target.style.position = 'absolute';
		e.target.style.width = '100%';
	}
</script>

{#key pathname}
	<div
		in:fly={{ easing: cubicOut, y: 100, opacity: 0, duration: 100, delay: 1500 }}
		on:outrostart={onPageChange}
		out:fly={{ easing: quartOut, y: -100, opacity: 1, duration: 100, delay: 1200 }}
		on:outrostart={onPageChange}
	>
		<slot />
	</div>
{/key}
