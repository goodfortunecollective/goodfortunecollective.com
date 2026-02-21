<script lang="ts">
	import { StoryblokComponent, storyblokEditable } from '@storyblok/svelte';

	import { cls } from '$lib/styles';

	export let blok: any;

	const gridClassByStackBreakpoint: Record<string, string> = {
		sm: 'sm:grid-cols-12',
		md: 'md:grid-cols-12',
		base: 'base:grid-cols-12',
		basexl: 'basexl:grid-cols-12',
		lg: 'lg:grid-cols-12',
		xl: 'xl:grid-cols-12',
		'2xl': '2xl:grid-cols-12',
		'3xl': '3xl:grid-cols-12',
		'4xl': '4xl:grid-cols-12'
	};

	const rowGapClassBySize: Record<string, string> = {
		none: 'gap-y-0',
		xs: 'gap-y-2',
		sm: 'gap-y-4',
		default: 'gap-y-6',
		lg: 'gap-y-8',
		xl: 'gap-y-12',
		'2xl': 'gap-y-16'
	};

	const colGapClassBySize: Record<string, string> = {
		none: 'gap-x-0',
		xs: 'gap-x-2',
		sm: 'gap-x-4',
		default: 'gap-x-6',
		lg: 'gap-x-8',
		xl: 'gap-x-12',
		'2xl': 'gap-x-16'
	};

	const alignClassByValue: Record<string, string> = {
		start: 'items-start',
		center: 'items-center',
		end: 'items-end',
		stretch: 'items-stretch'
	};

	$: columns = Array.isArray(blok.columns) ? blok.columns : [];
	$: stackUntil =
		typeof blok.stack_until === 'string' && gridClassByStackBreakpoint[blok.stack_until]
			? blok.stack_until
			: 'md';
	$: stackClass = gridClassByStackBreakpoint[stackUntil];
	$: rowGapSize =
		typeof blok.row_gap === 'string' && rowGapClassBySize[blok.row_gap] ? blok.row_gap : 'default';
	$: colGapSize =
		typeof blok.col_gap === 'string' && colGapClassBySize[blok.col_gap] ? blok.col_gap : 'default';
	$: spacingClass = cls(rowGapClassBySize[rowGapSize], colGapClassBySize[colGapSize]);
	$: verticalAlign =
		typeof blok.vertical_align === 'string' && alignClassByValue[blok.vertical_align]
			? blok.vertical_align
			: 'stretch';
	$: verticalAlignClass = alignClassByValue[verticalAlign];
</script>

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	class={cls('grid grid-cols-1', stackClass, spacingClass, verticalAlignClass, blok.class)}
>
	{#each columns as column}
		<StoryblokComponent blok={column} />
	{/each}
</div>
