<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { renderRichText, storyblokEditable } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';
	import { inview } from 'svelte-inview';

	import { RichtextTransition } from '$lib/components';
	import { cls } from '$lib/styles';
	import { backgroundTheme, cursorType } from '$lib/stores';
	import { inViewColorTransition } from '$lib/utils/animations';

	export let blok: any;

	$: content = renderRichText(blok.content);

	let el!: HTMLElement;
	let links: NodeListOf<HTMLAnchorElement>;

	const variants = cva(
		'flex w-full text-xl md:text-2xl duration-1000 ease-out xl:text-3xl 4xl:text-5xl',
		{
			variants: {
				theme: {
					light: '',
					dark: 'text-white'
				},
				align: {
					left: '',
					center: 'm-auto'
				},
				maxWidth: {
					sm: 'max-w-sm 2xl:max-w-md 4xl:max-w-xl',
					md: 'max-w-md 2xl:max-w-lg 3xl:max-w-xl 4xl:max-w-2xl',
					lg: 'max-w-lg 2xl:max-w-xl 3xl:max-w-2xl 4xl:max-w-3xl',
					xl: 'max-w-xl max-w-2xl 3xl:max-w-3xl 4xl:max-w-4xl',
					'2xl': 'max-w-2xl 3xl:max-w-3xl 4xl:max-w-4xl',
					'3xl': 'max-w-3xl 2xl:max-w-4xl 3xl:max-w-5xl 4xl:max-w-6xl'
				}
			},
			defaultVariants: {
				theme: 'light'
			}
		}
	);

	const onEnter = () => {
		cursorType.set('checkout');
	};

	const onLeave = () => {
		cursorType.set('none');
	};

	onMount(() => {
		links = el.querySelectorAll('a');
		links?.forEach((link) => {
			link.addEventListener('mouseenter', onEnter);
			link.addEventListener('mouseleave', onLeave);
		});
	});

	onDestroy(() => {
		links?.forEach((link) => {
			link.removeEventListener('mouseenter', onEnter);
			link.removeEventListener('mouseleave', onLeave);
		});
	});
</script>

<div
	use:storyblokEditable={blok}
	bind:this={el}
	{...$$restProps}
	class={cls(
		variants({ theme: $backgroundTheme, align: blok.align, maxWidth: blok.maxWidth }),
		blok.class
	)}
	use:inview
	on:inview_change={inViewColorTransition}
>
	<RichtextTransition class="[&_h3]:duration-1000 [&_h3]:ease-out [&_p]:mb-16 [&_p]:leading-snug">
		{@html content}
	</RichtextTransition>
</div>
