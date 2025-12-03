<script lang="ts">
	import { renderRichText, storyblokEditable, type SbBlokData } from '@storyblok/svelte';

	import { RichtextTransition } from '$lib/components';
	import { components } from './';

	export let blok: RichTextProps;

	interface RichTextProps extends SbBlokData {
		content: any;
	}

	interface RichTextComponentSegmentsProps {
		component?: any;
		blok?: SbBlokData;
		html?: string;
	}

	$: contentHTML =
		renderRichText(blok.content, {
			// cast to maintain custom component resolution with the new SDK
			resolver: (component: any, blok: any) => {
				return `__COMPONENT__!!! ${JSON.stringify({ component, blok })} __COMPONENT__`;
			}
		} as any) ?? '';

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
</script>

<div use:storyblokEditable={blok}>
	{#each contentSegments as contentSegment}
		{#if contentSegment.html}
			<RichtextTransition>{@html contentSegment.html}</RichtextTransition>
		{:else}
			<svelte:component this={contentSegment.component} blok={contentSegment.blok} />
		{/if}
	{/each}
</div>
