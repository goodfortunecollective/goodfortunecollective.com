<script lang="ts">
	import { renderRichText, storyblokEditable } from '@storyblok/svelte';

	import { NumberedListItem } from '$lib/components';
	import TextTransition from '$lib/components/TextTransition.svelte';
	import Heading from '$lib/components/Heading.svelte';

	export let blok: any;

	$: content = renderRichText(blok.content);
</script>

<div use:storyblokEditable={blok} {...$$restProps}>
	{#if blok.heading}
		<dt class="flex gap-4 mb-4 heading-list-item">
			<NumberedListItem index={$$restProps.index} />
			<span class="font-bold uppercase 3xl:text-2xl 4xl:text-3xl"
				><TextTransition type="heading">{blok.label}</TextTransition></span
			>
		</dt>
		<dd class="text-xl leading-7 4xl:text-3xl">
			<Heading as="h3" size="h2">{blok.heading}</Heading>
			<TextTransition>{@html content}</TextTransition>
		</dd>
	{:else}
		<div class="flex flex-wrap items-start gap-4 md:flex-nowrap">
			<NumberedListItem index={$$restProps.index} />
			<dd class="text-xl leading-7 4xl:text-3xl">
				<TextTransition>{@html content}</TextTransition>
			</dd>
		</div>
	{/if}
</div>

<style lang="scss">
	@import '../../vars.scss';

	.heading-list-item :global(.uppercase .split-line) {
		padding: 0;
	}

	.heading-list-item :global(h3) {
		font-weight: bold;
	}
</style>
