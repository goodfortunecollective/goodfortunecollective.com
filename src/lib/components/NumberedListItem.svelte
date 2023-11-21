<script lang="ts">
	import { zeroPad } from '$lib/utils/text';
	import { cls } from '$lib/styles';

	export let index: number;
	export let divider: boolean = false;
</script>

<span
	class={cls(
		'after-px-4 flex items-center gap-4 pr-4 font-bold 3xl:text-lg 4xl:text-xl',
		divider && 'after:block after:h-px after:w-full after:bg-current'
	)}
>
	{zeroPad(index + 1)}
</span>
