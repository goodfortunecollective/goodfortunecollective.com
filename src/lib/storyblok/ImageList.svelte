<script lang="ts">
	import { renderRichText, storyblokEditable } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { backgroundTheme } from '$lib/stores';
	import { Heading, RichtextTransition, TextTransition } from '$lib/components';
	import { inViewColorTransition } from '$lib/utils/animations';
	import { cls } from '$lib/styles';

	export let blok: any;

	$: list = renderRichText(blok.list);

	const headingStyle = cva('max-w-4xl leading-extra-tight duration-1000 ease-out', {
		variants: {
			theme: {
				light: '',
				dark: 'text-yellow-50'
			}
		},
		defaultVariants: {
			theme: 'light'
		}
	});
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<div class="flex flex-col">
		<Heading size="h6" as="h5" class="text-red mb-8 font-bold uppercase tracking-widest	"
			>{blok.category}</Heading
		>
		<h2
			on:inview_change={inViewColorTransition}
			class={cls(
				' font-degular-display text-5xl leading-none  lg:text-9xl lg:leading-tightest',
				headingStyle({ theme: $backgroundTheme })
			)}
		>
			<TextTransition>
				{blok.title}
			</TextTransition>
		</h2>
		<div class="mt-8 [&_p]:my-0 [&_p]:leading-10">
			<RichtextTransition
				class="font-degular-display text-xl leading-10 text-white lg:text-2xl 4xl:text-4xl [&_p]:my-4"
			>
				{@html list}
			</RichtextTransition>
		</div>
	</div>
</div>
