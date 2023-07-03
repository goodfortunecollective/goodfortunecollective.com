<script lang="ts">
	import { renderRichText, storyblokEditable } from '@storyblok/svelte';
	import { Button, Flex } from '$lib/components/layout';
	import { Heading } from '$lib/components/typography';

	export let blok: any;
	// console.log(blok);

	$: content = renderRichText(blok.content);
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={'heading-richtext-2col ' + blok.class}>
	<Flex class="px-24 pt-32">
		<Heading as="h2" size="h5" class="font-bold tracking-widest uppercase md:w-1/2 title"
			>{blok.heading}</Heading
		>
		<div class="flex-1 text-lg text">
			{@html content}
			{#if blok.link}
				<Button class="block" url={blok.link.cached_url}>{blok.link_label}</Button>
			{/if}
		</div>
	</Flex>
</div>
