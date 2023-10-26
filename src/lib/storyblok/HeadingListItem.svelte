<script lang="ts">
	import { renderRichText, storyblokEditable } from '@storyblok/svelte';

	import { NumberedListItem, RichtextTransition, TextTransition, Heading } from '$lib/components';

	export let blok: any;

	$: content = renderRichText(blok.content);
</script>

<div use:storyblokEditable={blok} {...$$restProps} class="grid grid-cols-12">
	<div class="col-span-2 col-start-2 lg:col-span-1 lg:col-start-3">
		<NumberedListItem index={$$restProps.index} divider />
	</div>
	<dt class="col-span-6 col-start-4 lg:col-span-6 lg:col-start-4">
		<span class="font-bold uppercase 3xl:text-2xl 4xl:text-3xl">
			<TextTransition>{blok.label}</TextTransition>
		</span>
	</dt>
	<dd
		class="col-span-7 col-start-2 mt-8 flex flex-col gap-4 text-xl leading-7 lg:col-span-6 lg:col-start-4 4xl:text-3xl"
	>
		<Heading as="h3" size="h2" class="w-full leading-tightest lg:leading-tightest"
			>{blok.heading}</Heading
		>
		<RichtextTransition class="w-full">{@html content}</RichtextTransition>
	</dd>
</div>
