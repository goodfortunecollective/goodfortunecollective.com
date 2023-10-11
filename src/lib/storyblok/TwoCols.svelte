<script lang="ts">
	import { storyblokEditable, renderRichText, StoryblokComponent } from '@storyblok/svelte';

	import { Heading } from '$lib/components';
	import TextTransition from '$lib/components/TextTransition.svelte';

	export let blok: any;
	$: left_col = renderRichText(blok.left_col);
	$: right_col = renderRichText(blok.right_col);
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<div class="grid grid-cols-12 pt-32 process-text pb-36">
		<div class="col-span-10 col-start-2 mb-24 md:col-span-8 md:col-start-2">
			<Heading as="h2" size="h2" class="">{blok.title}</Heading>
		</div>
		<div class="col-span-10 col-start-2 mb-12 md:col-start-2 md:col-span-4 md:mb-0">
			<Heading as="h4" size="h6" class="mb-4 uppercase">{blok.left_col_title}</Heading>
			<TextTransition>{@html left_col}</TextTransition>
		</div>
		<div class="col-span-10 col-start-2 md:col-start-7 md:col-span-4">
			<Heading as="h4" size="h6" class="mb-4 uppercase">{blok.right_col_title}</Heading>
			<TextTransition>{@html right_col}</TextTransition>
		</div>
	</div>
</div>
