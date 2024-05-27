<script lang="ts">
	import { renderRichText } from '@storyblok/svelte';

	import { Heading } from '$lib/components';
	import { heading_hover_media } from '$lib/stores';
	import { base } from '$app/paths';

	export let name: string;
	export let slug: string;
	export let content: any;

	$: description = renderRichText(content.description);
</script>

<li
	on:mouseenter={() => {
		heading_hover_media.set(content.thumbnail.filename);
	}}
	on:mouseleave={() => {
		heading_hover_media.set(null);
	}}
	class="h-auto w-full border-b border-gray-500 last:border-0"
	id={`${slug}`}
>
	<a
		href={`${base}/work/archive/${slug}`}
		class="align-center block h-full py-3 text-left hover:no-underline lg:flex lg:flex-row 2xl:py-6"
	>
		<span class="flex w-full flex-col lg:w-2/3">
			<Heading size="h3" as="h3" class="w-full" underline>{name}</Heading>
			{#if description && description.length > 0}
				<span class="inline-block w-full text-base text-white xl:text-xl 4xl:text-2xl">
					{@html description}
				</span>
			{/if}
		</span>
		<Heading
			size="h6"
			as="h3"
			class="flex w-full items-center font-bold uppercase tracking-widest text-white no-underline lg:w-1/3"
		>
			<small>{content.brand}</small>
		</Heading>
	</a>
</li>
