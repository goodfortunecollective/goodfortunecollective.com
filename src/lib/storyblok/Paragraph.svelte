<script lang="ts">
	import { renderRichText, storyblokEditable } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { RichtextTransition } from '$lib/components';
	import { cls } from '$lib/styles';
	import { backgroundTheme } from '$lib/stores';

	export let blok: any;
	$: content = renderRichText(blok.content);

	const variants = cva(
		'flex text-xl leading-9 w-full  xl:text-2xl 4xl:text-4xl 4xl:leading-loose transition-c duration-1000 ease-out',
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
					lg: 'max-w-lg'
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
>
	<RichtextTransition class="[&_p]:my-16 [&_p]:leading-8">{@html content}</RichtextTransition>
</div>
