<script lang="ts">
	let clazz: string;
	export { clazz as class };

	let isOpen = false;

	function toggleDropdown() {
		isOpen = !isOpen;
	}
</script>

<div class={clazz}>
	<button class="bg-black text-white rounded-full px-4 py-2 w-16 h-16" on:click={toggleDropdown}>
		<span class="text-2xl">{isOpen ? '-' : '+'}</span>
	</button>
	{#if isOpen}
		<ul><slot /></ul>
	{/if}
</div>
