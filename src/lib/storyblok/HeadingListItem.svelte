<script lang="ts">
	import { renderRichText, storyblokEditable } from '@storyblok/svelte';

	import { NumberedListItem } from '$lib/components';
	import TextTransition from '$lib/components/TextTransition.svelte';

	export let blok: any;

	$: content = renderRichText(blok.content);
</script>

<div use:storyblokEditable={blok} {...$$restProps}>
	{#if blok.heading}
		<dt class="flex gap-4 mb-4">
			<NumberedListItem index={$$restProps.index} />
			<span class="uppercase font-bold 3xl:text-2xl 4xl:text-3xl"
				><TextTransition type="heading">{blok.heading}</TextTransition></span
			>
		</dt>
		<dd class="text-xl 4xl:text-3xl leading-7"><TextTransition>{@html content}</TextTransition></dd>
	{:else}
		<div class="flex items-start gap-4 flex-wrap md:flex-nowrap">
			<NumberedListItem index={$$restProps.index} />
			<dd class="text-xl 4xl:text-3xl leading-7">
				<TextTransition>{@html content}</TextTransition>
			</dd>
		</div>
	{/if}
</div>
