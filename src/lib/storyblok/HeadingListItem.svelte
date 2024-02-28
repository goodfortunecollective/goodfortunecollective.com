<script lang="ts">
	import { renderRichText, storyblokEditable } from '@storyblok/svelte';

	import { NumberedListItem, RichtextTransition, TextTransition, Heading } from '$lib/components';

	export let blok: any;

	$: content = renderRichText(blok.content);
</script>

<div use:storyblokEditable={blok} {...$$restProps} class="grid grid-cols-12">
	<div
		class="col-span-2 col-start-1 mx-5 mt-0.5 md:col-span-2 md:col-start-2 md:mx-0 lg:col-span-1 lg:col-start-3"
	>
		<NumberedListItem index={$$restProps.index} divider />
	</div>
	<dt class="col-span-6 col-start-3 md:col-span-6 md:col-start-4 lg:col-span-6 lg:col-start-4">
		<span class="font-bold uppercase 3xl:text-2xl 4xl:text-3xl">
			<TextTransition>{blok.label}</TextTransition>
		</span>
	</dt>
	<dd
		class="col-span-12 col-start-1 mx-4 mt-8 flex flex-col gap-4 text-xl leading-7 md:col-span-10 md:col-start-2 md:mx-0 lg:col-span-6 lg:col-start-4 4xl:text-3xl"
	>
		{#if blok.heading}
			<Heading
				as="h3"
				leading="tightest"
				size="h2"
				class="w-full text-5xl lg:text-7xl 3xl:text-8xl 4xl:text-9xl">{blok.heading}</Heading
			>
		{/if}

		<RichtextTransition class="w-full">{@html content}</RichtextTransition>
	</dd>
</div>
