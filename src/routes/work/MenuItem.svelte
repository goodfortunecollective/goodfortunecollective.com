<script lang="ts">
	import { fade } from 'svelte/transition';

	import { zeroPad } from '$lib/utils/text';
	import { cls } from '$lib/styles';

	export let name: string;
	export let url: string;
	export let sup: number;
	export let selected: boolean;
	export let delay: number = 0;
</script>

<li in:fade|global={{ delay }} out:fade|global class="whitespace-nowrap text-right">
	<a href={url}>
		<span class={cls(selected && 'font-bold')}>{name}</span>
		<sup class="font-features sups">{zeroPad(sup)}</sup>
	</a>
</li>
