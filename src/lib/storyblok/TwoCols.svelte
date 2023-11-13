<script lang="ts">
	import { storyblokEditable, renderRichText } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { cls } from '$lib/styles';
	import { Heading, RichtextTransition } from '$lib/components';
	import { backgroundTheme } from '$lib/stores';

	export let blok: any;

	$: left_col = renderRichText(blok.left_col);
	$: right_col = renderRichText(blok.right_col);

	const variants = cva('transition-c duration-1000 ease-out', {
		variants: {
			theme: {
				light: '',
				dark: 'text-white'
			}
		},
		defaultVariants: {
			theme: 'light'
		}
	});
</script>

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	class={cls(variants({ theme: $backgroundTheme }), blok.class, blok.padding_title ? 'pt-32' : '')}
>
	<div class="grid grid-cols-12">
		<div class="col-span-10 col-start-2 mb-12 md:col-span-4 md:col-start-2 md:mb-0">
			<Heading as="h4" size="h4" class="mb-4 border-b pb-8 uppercase">
				<strong>{blok.left_col_title}</strong>
			</Heading>
			<RichtextTransition class="text-xl xl:text-2xl 4xl:text-4xl [&_p]:my-8 [&_p]:leading-8">
				{@html left_col}
			</RichtextTransition>
		</div>
		<div class="col-span-10 col-start-2 md:col-span-4 md:col-start-7">
			<Heading as="h4" size="h4" class="mb-4 border-b pb-8 uppercase">
				<strong>{blok.right_col_title}</strong>
			</Heading>
			<RichtextTransition class="text-xl xl:text-2xl 4xl:text-4xl [&_p]:my-8 [&_p]:leading-8">
				{@html right_col}
			</RichtextTransition>
		</div>
	</div>
</div>
