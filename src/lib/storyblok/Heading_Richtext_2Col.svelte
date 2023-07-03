<script lang="ts">
	import { renderRichText, storyblokEditable } from '@storyblok/svelte';
	import { Flex } from '$lib/components/layout';
	import { Heading } from '$lib/components/typography';

	export let blok: any;

	$: content = renderRichText(blok.content);
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<Flex class="px-24 pt-32">
		<Heading as="h2" size="h5" class="font-bold tracking-widest uppercase md:w-1/2"
			>{blok.heading}</Heading
		>
		<div class="flex-1 text-lg">{@html content}</div>
	</Flex>
</div>
