<script lang="ts">
	import Flex from './Flex.svelte';

	export const spacing:
		| 0
		| 'px'
		| 0.5
		| 1
		| 1.5
		| 2
		| 2.5
		| 3
		| 3.5
		| 4
		| 5
		| 6
		| 7
		| 8
		| 9
		| 10
		| 11
		| 12
		| 14
		| 16
		| 20
		| 24
		| 28
		| 32
		| 36
		| 40
		| 44
		| 48
		| 52
		| 56
		| 60
		| 64
		| 72
		| 80
		| 96 = 2;

	export const orientation: 'vertical' | 'horizontal' = 'horizontal';
</script>

<Flex
	gap={spacing}
	direction={String(orientation) === 'vertical' ? 'column' : 'row'}
	justifyContent="center"
	{...$$restProps}
>
	<slot />
</Flex>
