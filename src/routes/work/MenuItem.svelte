<script lang="ts">
	import { zeroPad } from '$lib/utils/text';
	import { cls } from '$lib/styles';

	export let name: string;
	export let url: string;
	export let sup: number;
	export let selected: boolean;
</script>

<li class={cls('mb-3 whitespace-nowrap text-right text-xs font-bold uppercase tracking-wider')}>
	<a href={url} class={cls(selected ? 'text-white' : 'text-stone-450')}>
		<span class={cls(selected && 'font-bold')}>{name}</span>
		<sup class="font-features sups -mt-1 font-normal">{zeroPad(sup)}</sup>
	</a>
</li>
