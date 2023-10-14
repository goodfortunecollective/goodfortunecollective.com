<script lang="ts">
	import { zeroPad } from '$lib/utils/text';

	export let index: number;
</script>

<span
	class="flex gap-4 items-center font-bold after:h-px after:bg-current after-px-4 after:block after:w-16 3xl:text-lg 4xl:text-xl"
>
	{zeroPad(index + 1)}
</span>
