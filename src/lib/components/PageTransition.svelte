<script lang="ts">
	import { fade } from 'svelte/transition';
	import { quartOut } from 'svelte/easing';
	export let pathname: string = '';
</script>

{#key pathname}
	<div
		class="absolute inset-0 w-full h-full"
		in:fade={{ duration: 50, delay: 1500, easing: quartOut }}
		out:fade={{ duration: 50, delay: 1500, easing: quartOut }}
	>
		<slot />
	</div>
{/key}
