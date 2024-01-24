<script lang="ts">
	import { zeroPad } from '$lib/utils/text';
	import { cls } from '$lib/styles';

	export let name: string;
	export let url: string;
	export let sup: number;
	export let selected: boolean;
</script>

<li class={cls('mb-3 whitespace-nowrap text-right text-xs font-bold uppercase tracking-wider')}>
	<span
		class={cls(selected ? 'text-white [&_a]:text-white' : 'text-stone-450 [&_a]:text-stone-450')}
	>
		<a
			href={url}
			class={cls('c-animated-underline c-animated-underline__align-right', selected && 'font-bold')}
			>{name}</a
		>
		<sup class="font-features sups -mt-1 font-normal">{zeroPad(sup)}</sup>
	</span>
</li>
