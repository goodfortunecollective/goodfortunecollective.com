<script lang="ts">
	import {
		renderRichText,
		RichTextSchema,
		storyblokEditable,
		type SbBlokData
	} from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { components } from './';
	import { RichtextTransition } from '$lib/components';
	import { cls } from '$lib/styles';

	export let blok: RichTextProps;

	interface RichTextProps extends SbBlokData {
		content: any;
	}

	interface RichTextComponentSegmentsProps {
		component?: any;
		blok?: SbBlokData;
		html?: string;
	}

	$: contentHTML = renderRichText(blok.content, {
		schema: RichTextSchema,
		resolver: (component, blok) => {
			return `__COMPONENT__!!! ${JSON.stringify({ component, blok })} __COMPONENT__`;
		}
	});

	$: contentSegments = contentHTML.split('__COMPONENT__').map((x) => {
		if (x.startsWith('!!!')) {
			var componentJsonString = x.replace('!!!', '');
			var details = JSON.parse(componentJsonString);

			return <RichTextComponentSegmentsProps>{
				component: components[details.component],
				blok: details.blok
			};
		}
		return <RichTextComponentSegmentsProps>{
			html: x
		};
	});

	const variants = cva('', {
		variants: {
			wrapped: {
				true: 'max-w-lg [&_p]:my-4 [&_p]:leading-8 text-xl',
				false: ''
			}
		},
		defaultVariants: {
			wrapped: false
		}
	});
</script>

<div use:storyblokEditable={blok}>
	{#each contentSegments as contentSegment}
		{#if contentSegment.html}
			<RichtextTransition class={cls(variants({ wrapped: !!blok.wrapped }))}
				>{@html contentSegment.html}</RichtextTransition
			>
		{:else}
			<svelte:component this={contentSegment.component} blok={contentSegment.blok} />
		{/if}
	{/each}
</div>

<style lang="scss">
	h3 {
		font-size: 3rem;
	}
</style>
