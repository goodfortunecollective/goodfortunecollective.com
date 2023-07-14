<script lang="ts">
	import { fade } from 'svelte/transition';

	import { zeroPad } from '$lib/utils/text';

	export let name: string;
	export let url: string;
	export let total: number;
	export let delay: number = 0;
</script>

<li in:fade={{ delay }} out:fade class="whitespace-nowrap text-right">
	<a href={url}>
		{name}
		<sup class="font-features sups">{zeroPad(total)}</sup>
	</a>
</li>
