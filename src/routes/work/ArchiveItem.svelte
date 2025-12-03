<script lang="ts">
	import { renderRichText } from '@storyblok/svelte';

	import { base } from '$app/paths';
	import { Heading } from '$lib/components';
	import { heading_hover_media } from '$lib/stores';

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
	class="animate-gradient-x t relative grid h-auto w-full grid-cols-12 [&_a]:last:border-0"
	id={`${slug}`}
>
	<div
		class="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-slate-700/25 to-transparent opacity-0 transition-opacity duration-300 ease-in hover:opacity-0"
	></div>
	<a
		href={`${base}/work/archive/${slug}`}
		class=" align-center col-span-12 col-start-1 mx-4 block h-full border-b border-gray-500 py-12 text-left hover:no-underline md:col-span-10 md:col-start-2 md:mx-0 lg:flex lg:flex-row 2xl:py-6"
	>
		<span class="flex w-full flex-col lg:w-2/3">
			<Heading size="h3" as="h3" class="w-full">{name}</Heading>
			{#if description && description.length > 0}
				<span class="4xl:text-2xl mt-1 inline-block w-full text-base text-white xl:text-xl">
					{@html description}
				</span>
			{/if}
		</span>
		<Heading
			size="h6"
			as="h3"
			class="mt-2 mb-2 flex w-full items-center font-bold tracking-widest text-white uppercase no-underline lg:mt-0 lg:mb-0 lg:w-1/3"
		>
			<small class="text-yellow-350">{content.brand}</small>
		</Heading>
	</a>
</li>
