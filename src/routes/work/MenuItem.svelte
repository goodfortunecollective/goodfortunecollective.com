<script lang="ts">
	import { fade } from 'svelte/transition';

	import { zeroPad } from '$lib/utils/text';
	import { cls } from '$lib/styles';

	export let name: string;
	export let url: string;
	export let sup: number;
	export let selected: boolean;
	export let delayIn: number = 0;
	export let delayOut: number = 0;
</script>

<li
	in:fade|local={{ delay: delayIn }}
	out:fade|local={{ delay: delayOut, duration: 150 }}
	class={cls('mb-3 whitespace-nowrap text-right text-xs font-bold uppercase tracking-wider')}
>
	<a href={url} class={cls(selected ? 'text-white' : 'text-stone-450')}>
		<span class={cls(selected && 'font-bold')}>{name}</span>
		<sup class="font-features sups -mt-1 font-normal">{zeroPad(sup)}</sup>
	</a>
</li>
