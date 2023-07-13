<script lang="ts">
	import NumberedListItem from '$lib/components/NumberedListItem.svelte';
	import {renderRichText, storyblokEditable} from '@storyblok/svelte';

	export let blok: any;

	$: content = renderRichText(blok.content);
</script>

<div use:storyblokEditable={blok} {...$$restProps}>
	{#if blok.heading}
		<dt class="flex gap-4 mb-4">
			<NumberedListItem index={$$restProps.index}/>
			<span class="uppercase font-bold">{blok.heading}</span>
		</dt>
		<dd class="text-xl">{@html content}</dd>
	{:else}
		<div class="flex items-start gap-4">
			<NumberedListItem index={$$restProps.index}/>
			<dd class="text-xl">{@html content}</dd>
		</div>
	{/if}
</div>
