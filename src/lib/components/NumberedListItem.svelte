<script lang="ts">
	import { zeroPad } from '$lib/utils/text';
	import { cls } from '$lib/styles';

	export let index: number;
	export let divider: boolean = false;
</script>

<span
	class={cls(
		'after-px-4 flex items-center gap-4 font-bold md:pr-4 3xl:text-2xl 4xl:text-3xl',
		divider && 'after:block after:h-px after:w-full after:bg-current'
	)}
>
	{zeroPad(index + 1)}
</span>
