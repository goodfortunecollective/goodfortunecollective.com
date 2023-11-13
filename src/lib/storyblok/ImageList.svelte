<script lang="ts">
	import { renderRichText, storyblokEditable } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { backgroundTheme } from '$lib/stores';
	import { Heading, RichtextTransition } from '$lib/components';

	export let blok: any;

	$: list = renderRichText(blok.list);

	const headingStyle = cva(
		'max-w-xl lg:leading-tightest leading-tightest transition-c duration-1000 ease-out',
		{
			variants: {
				theme: {
					light: '',
					dark: 'text-yellow-50'
				}
			},
			defaultVariants: {
				theme: 'light'
			}
		}
	);
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<div class="flex flex-col gap-8">
		<Heading size="h5" as="h5" class="font-bold uppercase">{blok.category}</Heading>
		<Heading size="h2" as="h2" class={headingStyle({ theme: $backgroundTheme })}>
			{blok.title}
		</Heading>
		<div class="[&_p]:my-4 [&_p]:leading-8">
			<RichtextTransition class="text-xl [&_p]:my-16 [&_p]:leading-8"
				>{@html list}</RichtextTransition
			>
		</div>
	</div>
</div>
