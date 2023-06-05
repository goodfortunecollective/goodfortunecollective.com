<script lang="ts">
	import { fade } from 'svelte/transition';
	import { quartOut } from 'svelte/easing';
	export let pathname: string = '';
</script>

{#key pathname}
	<div
		class="absolute inset-0"
		in:fade={{ duration: 50, delay: 1500, easing: quartOut }}
		out:fade={{ duration: 50, delay: 1500, easing: quartOut }}
	>
		<div id="smooth-wrapper">
			<div id="smooth-content">
				<slot />
			</div>
		</div>
	</div>
{/key}
