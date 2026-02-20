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

	const gapClassBySize: Record<string, string> = {
		none: 'gap-0',
		xs: 'gap-2',
		sm: 'gap-4',
		default: 'gap-6',
		lg: 'gap-8',
		xl: 'gap-12',
		'2xl': 'gap-16'
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

	const hasValue = (value: unknown): value is string =>
		typeof value === 'string' && value.trim().length > 0;

	const normalizeToken = (value: unknown): string => {
		if (!hasValue(value)) return '';

		return value.trim().toLowerCase().replaceAll('_', '-').replaceAll(' ', '-');
	};

	const resolveGapSize = (value: unknown, fallback = 'default'): string => {
		const token = normalizeToken(value);
		return gapClassBySize[token] ? token : fallback;
	};

	const resolveStackBreakpoint = (value: unknown): string => {
		const token = normalizeToken(value);
		return gridClassByStackBreakpoint[token] ? token : 'md';
	};

	const resolveVerticalAlign = (value: unknown): string => {
		const token = normalizeToken(value);
		const alias: Record<string, string> = {
			top: 'start',
			bottom: 'end'
		};
		const normalized = alias[token] ?? token;

		return alignClassByValue[normalized] ? normalized : 'stretch';
	};

	$: columns = Array.isArray(blok.columns)
		? blok.columns
		: Array.isArray(blok.content)
			? blok.content
			: Array.isArray(blok.children)
				? blok.children
				: [];
	$: stackUntil = resolveStackBreakpoint(blok.stack_until ?? blok.breakpoint);
	$: stackClass = gridClassByStackBreakpoint[stackUntil];
	$: legacyGapSize = resolveGapSize(blok.gap, 'default');
	$: hasRowGap = hasValue(blok.row_gap);
	$: hasColGap = hasValue(blok.col_gap);
	$: rowGapSize = resolveGapSize(blok.row_gap, legacyGapSize);
	$: colGapSize = resolveGapSize(blok.col_gap, legacyGapSize);
	$: spacingClass =
		hasRowGap || hasColGap
			? cls(rowGapClassBySize[rowGapSize], colGapClassBySize[colGapSize])
			: gapClassBySize[legacyGapSize];
	$: verticalAlign = resolveVerticalAlign(blok.vertical_align ?? blok.align_items);
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
