<script lang="ts">
	import { StoryblokComponent, storyblokEditable } from '@storyblok/svelte';

	import { cls } from '$lib/styles';

	export let blok: any;

	const widthClassByBreakpoint: Record<string, Record<string, string>> = {
		sm: {
			'1/1': 'sm:col-span-12',
			'11/12': 'sm:col-span-11',
			'5/6': 'sm:col-span-10',
			'3/4': 'sm:col-span-9',
			'2/3': 'sm:col-span-8',
			'7/12': 'sm:col-span-7',
			'1/2': 'sm:col-span-6',
			'5/12': 'sm:col-span-5',
			'1/3': 'sm:col-span-4',
			'1/4': 'sm:col-span-3',
			'1/6': 'sm:col-span-2',
			'1/12': 'sm:col-span-1'
		},
		md: {
			'1/1': 'md:col-span-12',
			'11/12': 'md:col-span-11',
			'5/6': 'md:col-span-10',
			'3/4': 'md:col-span-9',
			'2/3': 'md:col-span-8',
			'7/12': 'md:col-span-7',
			'1/2': 'md:col-span-6',
			'5/12': 'md:col-span-5',
			'1/3': 'md:col-span-4',
			'1/4': 'md:col-span-3',
			'1/6': 'md:col-span-2',
			'1/12': 'md:col-span-1'
		},
		base: {
			'1/1': 'base:col-span-12',
			'11/12': 'base:col-span-11',
			'5/6': 'base:col-span-10',
			'3/4': 'base:col-span-9',
			'2/3': 'base:col-span-8',
			'7/12': 'base:col-span-7',
			'1/2': 'base:col-span-6',
			'5/12': 'base:col-span-5',
			'1/3': 'base:col-span-4',
			'1/4': 'base:col-span-3',
			'1/6': 'base:col-span-2',
			'1/12': 'base:col-span-1'
		},
		basexl: {
			'1/1': 'basexl:col-span-12',
			'11/12': 'basexl:col-span-11',
			'5/6': 'basexl:col-span-10',
			'3/4': 'basexl:col-span-9',
			'2/3': 'basexl:col-span-8',
			'7/12': 'basexl:col-span-7',
			'1/2': 'basexl:col-span-6',
			'5/12': 'basexl:col-span-5',
			'1/3': 'basexl:col-span-4',
			'1/4': 'basexl:col-span-3',
			'1/6': 'basexl:col-span-2',
			'1/12': 'basexl:col-span-1'
		},
		lg: {
			'1/1': 'lg:col-span-12',
			'11/12': 'lg:col-span-11',
			'5/6': 'lg:col-span-10',
			'3/4': 'lg:col-span-9',
			'2/3': 'lg:col-span-8',
			'7/12': 'lg:col-span-7',
			'1/2': 'lg:col-span-6',
			'5/12': 'lg:col-span-5',
			'1/3': 'lg:col-span-4',
			'1/4': 'lg:col-span-3',
			'1/6': 'lg:col-span-2',
			'1/12': 'lg:col-span-1'
		},
		xl: {
			'1/1': 'xl:col-span-12',
			'11/12': 'xl:col-span-11',
			'5/6': 'xl:col-span-10',
			'3/4': 'xl:col-span-9',
			'2/3': 'xl:col-span-8',
			'7/12': 'xl:col-span-7',
			'1/2': 'xl:col-span-6',
			'5/12': 'xl:col-span-5',
			'1/3': 'xl:col-span-4',
			'1/4': 'xl:col-span-3',
			'1/6': 'xl:col-span-2',
			'1/12': 'xl:col-span-1'
		},
		'2xl': {
			'1/1': '2xl:col-span-12',
			'11/12': '2xl:col-span-11',
			'5/6': '2xl:col-span-10',
			'3/4': '2xl:col-span-9',
			'2/3': '2xl:col-span-8',
			'7/12': '2xl:col-span-7',
			'1/2': '2xl:col-span-6',
			'5/12': '2xl:col-span-5',
			'1/3': '2xl:col-span-4',
			'1/4': '2xl:col-span-3',
			'1/6': '2xl:col-span-2',
			'1/12': '2xl:col-span-1'
		},
		'3xl': {
			'1/1': '3xl:col-span-12',
			'11/12': '3xl:col-span-11',
			'5/6': '3xl:col-span-10',
			'3/4': '3xl:col-span-9',
			'2/3': '3xl:col-span-8',
			'7/12': '3xl:col-span-7',
			'1/2': '3xl:col-span-6',
			'5/12': '3xl:col-span-5',
			'1/3': '3xl:col-span-4',
			'1/4': '3xl:col-span-3',
			'1/6': '3xl:col-span-2',
			'1/12': '3xl:col-span-1'
		},
		'4xl': {
			'1/1': '4xl:col-span-12',
			'11/12': '4xl:col-span-11',
			'5/6': '4xl:col-span-10',
			'3/4': '4xl:col-span-9',
			'2/3': '4xl:col-span-8',
			'7/12': '4xl:col-span-7',
			'1/2': '4xl:col-span-6',
			'5/12': '4xl:col-span-5',
			'1/3': '4xl:col-span-4',
			'1/4': '4xl:col-span-3',
			'1/6': '4xl:col-span-2',
			'1/12': '4xl:col-span-1'
		}
	};

	const orderClassByValue: Record<string, string> = {
		none: '',
		first: 'order-first',
		last: 'order-last',
		'1': 'order-1',
		'2': 'order-2',
		'3': 'order-3',
		'4': 'order-4',
		'5': 'order-5',
		'6': 'order-6',
		'7': 'order-7',
		'8': 'order-8',
		'9': 'order-9',
		'10': 'order-10',
		'11': 'order-11',
		'12': 'order-12'
	};

	const verticalAlignClassByValue: Record<string, string> = {
		start: 'self-start',
		center: 'self-center',
		end: 'self-end',
		stretch: 'self-stretch',
		auto: 'self-auto'
	};

	const hasValue = (value: unknown): value is string =>
		typeof value === 'string' && value.trim().length > 0;

	const normalizeToken = (value: unknown): string => {
		if (!hasValue(value)) return '';

		return value.trim().toLowerCase().replaceAll('_', '-').replaceAll(' ', '-');
	};

	const reduceFraction = (value: string): string => {
		const [numeratorText, denominatorText] = value.split('/');
		const numerator = Number(numeratorText);
		const denominator = Number(denominatorText);

		if (!Number.isInteger(numerator) || !Number.isInteger(denominator) || denominator === 0) {
			return value;
		}

		const gcd = (a: number, b: number): number => {
			let x = Math.abs(a);
			let y = Math.abs(b);

			while (y !== 0) {
				const remainder = x % y;
				x = y;
				y = remainder;
			}

			return x || 1;
		};

		const divisor = gcd(numerator, denominator);
		return `${numerator / divisor}/${denominator / divisor}`;
	};

	const normalizeWidth = (value: unknown): string => {
		if (!hasValue(value)) return '1/1';

		const width = value.trim().toLowerCase().replaceAll(' ', '');

		const aliases: Record<string, string> = {
			full: '1/1',
			half: '1/2',
			third: '1/3',
			'two-thirds': '2/3',
			twothirds: '2/3',
			quarter: '1/4',
			'three-quarters': '3/4',
			threequarters: '3/4',
			'2/4': '1/2',
			'4/12': '1/3',
			'8/12': '2/3',
			'6/12': '1/2',
			'9/12': '3/4',
			'3/12': '1/4',
			'10/12': '5/6',
			'2/12': '1/6'
		};

		const aliasedWidth = aliases[width] ?? width;
		const normalizedWidth = reduceFraction(aliasedWidth);

		return widthClassByBreakpoint.md[normalizedWidth] ? normalizedWidth : '1/1';
	};

	const resolveOrderClass = (value: unknown): string => {
		const normalized = normalizeToken(value);
		return orderClassByValue[normalized] ?? '';
	};

	const resolveVerticalAlignClass = (value: unknown): string => {
		const normalized = normalizeToken(value);
		const alias: Record<string, string> = {
			top: 'start',
			bottom: 'end',
			middle: 'center'
		};
		const alignValue = alias[normalized] ?? normalized;

		return verticalAlignClassByValue[alignValue] ?? '';
	};

	$: content = Array.isArray(blok.content)
		? blok.content
		: Array.isArray(blok.children)
			? blok.children
			: Array.isArray(blok.body)
				? blok.body
				: [];
	$: width = normalizeWidth(blok.width);
	$: widthSm = normalizeWidth(blok.width_sm);
	$: widthMd = normalizeWidth(blok.width_md ?? width);
	$: widthBase = normalizeWidth(blok.width_base ?? widthMd);
	$: widthBasexl = normalizeWidth(blok.width_basexl ?? widthBase);
	$: widthLg = normalizeWidth(blok.width_lg ?? widthBasexl);
	$: widthXl = normalizeWidth(blok.width_xl ?? widthLg);
	$: width2Xl = normalizeWidth(blok.width_2xl ?? widthXl);
	$: width3Xl = normalizeWidth(blok.width_3xl ?? width2Xl);
	$: width4Xl = normalizeWidth(blok.width_4xl ?? width3Xl);
	$: widthSmClass = hasValue(blok.width_sm) ? widthClassByBreakpoint.sm[widthSm] : '';
	$: widthMdClass = widthClassByBreakpoint.md[widthMd];
	$: widthBaseClass = hasValue(blok.width_base) ? widthClassByBreakpoint.base[widthBase] : '';
	$: widthBasexlClass = hasValue(blok.width_basexl)
		? widthClassByBreakpoint.basexl[widthBasexl]
		: '';
	$: widthLgClass = hasValue(blok.width_lg) ? widthClassByBreakpoint.lg[widthLg] : '';
	$: widthXlClass = hasValue(blok.width_xl) ? widthClassByBreakpoint.xl[widthXl] : '';
	$: width2XlClass = hasValue(blok.width_2xl) ? widthClassByBreakpoint['2xl'][width2Xl] : '';
	$: width3XlClass = hasValue(blok.width_3xl) ? widthClassByBreakpoint['3xl'][width3Xl] : '';
	$: width4XlClass = hasValue(blok.width_4xl) ? widthClassByBreakpoint['4xl'][width4Xl] : '';
	$: orderMobileClass = resolveOrderClass(blok.order_mobile);
	$: verticalAlignClass = resolveVerticalAlignClass(blok.vertical_align ?? blok.align_self);
</script>

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	class={cls(
		'col-span-1',
		widthSmClass,
		widthMdClass,
		widthBaseClass,
		widthBasexlClass,
		widthLgClass,
		widthXlClass,
		width2XlClass,
		width3XlClass,
		width4XlClass,
		orderMobileClass,
		verticalAlignClass,
		blok.class
	)}
>
	{#each content as child}
		<StoryblokComponent blok={child} />
	{/each}
</div>
