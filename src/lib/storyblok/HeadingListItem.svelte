<script lang="ts">
	import { renderRichText, storyblokEditable } from '@storyblok/svelte';

	import { NumberedListItem, RichtextTransition, TextTransition, Heading } from '$lib/components';

	export let blok: any;

	$: content = renderRichText(blok.content);
</script>

<div use:storyblokEditable={blok} {...$$restProps}>
	{#if blok.heading}
		<dt class="mb-4 flex gap-4">
			<NumberedListItem index={$$restProps.index} />
			<span class="font-bold uppercase 3xl:text-2xl 4xl:text-3xl">
				<TextTransition>{blok.label}</TextTransition>
			</span>
		</dt>
		<dd class="text-xl leading-7 4xl:text-3xl">
			<Heading as="h3" size="h2">{blok.heading}</Heading>
			<RichtextTransition>{@html content}</RichtextTransition>
		</dd>
	{:else}
		<div class="flex flex-wrap items-start gap-4 md:flex-nowrap">
			<NumberedListItem index={$$restProps.index} />
			<dd class="text-xl leading-7 4xl:text-3xl">
				<RichtextTransition>{@html content}</RichtextTransition>
			</dd>
		</div>
	{/if}
</div>
