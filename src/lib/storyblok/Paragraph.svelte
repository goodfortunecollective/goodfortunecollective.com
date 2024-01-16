<script lang="ts">
	import { renderRichText, storyblokEditable } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';
	import { inview } from 'svelte-inview';

	import { RichtextTransition } from '$lib/components';
	import { cls } from '$lib/styles';
	import { backgroundTheme } from '$lib/stores';
	import { inViewColorTransition } from '$lib/utils/animations';

	export let blok: any;
	$: content = renderRichText(blok.content);

	const variants = cva(
		'flex w-full text-xl leading-9 duration-1000 ease-out xl:text-2xl 4xl:text-4xl 4xl:leading-loose',
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
					sm: 'max-w-sm',
					md: 'max-w-md',
					lg: 'max-w-lg',
					xl: 'max-w-xl',
					'2xl': 'max-w-2xl',
					'3xl': 'max-w-3xl'
				}
			},
			defaultVariants: {
				theme: 'light'
			}
		}
	);
</script>

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	class={cls(
		variants({ theme: $backgroundTheme, align: blok.align, maxWidth: blok.maxWidth }),
		blok.class
	)}
	use:inview
	on:inview_change={inViewColorTransition}
>
	<RichtextTransition class="[&_p]:my-16 [&_p]:leading-8">{@html content}</RichtextTransition>
</div>
