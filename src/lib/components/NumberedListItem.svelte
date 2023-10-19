<script lang="ts">
	import { zeroPad } from '$lib/utils/text';

	export let index: number;
</script>

<span
	class="after-px-4 flex items-center gap-4 font-bold after:block after:h-px after:w-16 after:bg-current 3xl:text-lg 4xl:text-xl"
>
	{zeroPad(index + 1)}
</span>
