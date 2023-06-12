<script lang="ts">
	import { cls } from '$lib/styles';

	export const as: 'div' | 'section' | 'footer' | 'header' | 'main' | 'span' = 'div';
	export const direction: 'row' | 'row-reverse' | 'column' | 'column-reverse' = 'row';
	export const justifyContent:
		| 'normal'
		| 'flex-start'
		| 'flex-end'
		| 'center'
		| 'space-between'
		| 'space-around'
		| 'space-evenly'
		| 'stretch' = 'normal';

	export const gap:
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
		| 96 = 0;

	const flexDirection = {
		row: 'row',
		'row-reverse': 'row-reverse',
		column: 'col',
		'column-reverse': 'col-reverse'
	};

	const flexJustifyContent = {
		normal: 'normal',
		'flex-start': 'start',
		'flex-end': 'end',
		center: 'center',
		'space-between': 'between',
		'space-around': 'around',
		'space-evenly': 'evenly',
		stretch: 'stretch'
	};
</script>

<svelte:element
	this={as}
	{...$$restProps}
	class={cls(
		'flex',
		`flex-${flexDirection[direction]}`,
		`justify-${flexJustifyContent[justifyContent]}`,
		`gap-${gap}`,
		$$props.class
	)}
>
	<slot />
</svelte:element>
