<script lang="ts">
	import { cls } from '$lib/styles';

	let clazz: string;
	export { clazz as class };

	let isOpen = true;
	let yScroll = 0;

	function toggleDropdown() {
		isOpen = !isOpen;
	}

	const onScroll = (event: any) => {
		if (yScroll > 100 && isOpen) toggleDropdown();
		else if (yScroll <= 100 && !isOpen) toggleDropdown();
	};
</script>

<svelte:window on:scroll={onScroll} bind:scrollY={yScroll} />

<div class={cls('grid grid-cols-24', clazz)}>
	<div class="col-span-20 col-start-3 flex flex-col items-end lg:col-span-22 lg:col-start-2">
		<button class="h-12 w-12 rounded-full bg-black text-white" on:click={toggleDropdown}>
			<span class="text-2xl">{isOpen ? '-' : '+'}</span>
		</button>
		<div class={cls('flex items-stretch gap-8', !isOpen && 'pointer-events-none')}>
			{#if isOpen}
				<ul class="mt-6">
					<slot />
				</ul>
			{/if}
			<div
				class={cls(
					'mr-6 mt-2 w-px flex-1 origin-top transform bg-white bg-opacity-50 transition-transform ease-in-out',
					isOpen ? 'scale-y-100' : 'scale-y-0'
				)}
			></div>
		</div>
	</div>
</div>
