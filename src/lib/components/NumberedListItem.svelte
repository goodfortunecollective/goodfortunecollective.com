<script lang="ts">
	const getIndexText = (index: number) => ('0' + (index + 1)).slice(-2);

	export let index: number;
</script>

<span
	class="flex gap-4 items-center font-bold after:h-px after:bg-black after-px-4 after:block after:w-16"
>
	{getIndexText(index)}
</span>
