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
	class="grid h-auto w-full grid-cols-12 bg-gradient-to-r from-transparent to-transparent hover:from-transparent hover:via-slate-700/25 hover:to-transparent [&_a]:last:border-0"
	id={`${slug}`}
>
	<a
		href={`${base}/work/archive/${slug}`}
		class=" align-center col-span-12 col-start-1 mx-4 block h-full border-b border-gray-500 py-3 text-left hover:no-underline md:col-span-10 md:col-start-2 md:mx-0 lg:flex lg:flex-row 2xl:py-6"
	>
		<span class="flex w-full flex-col lg:w-2/3">
			<Heading size="h3" as="h3" class="w-full">{name}</Heading>
			{#if description && description.length > 0}
				<span class="mt-1 inline-block w-full text-base text-white xl:text-xl 4xl:text-2xl">
					{@html description}
				</span>
			{/if}
		</span>
		<Heading
			size="h6"
			as="h3"
			class="mb-2 mt-2 flex w-full items-center font-bold uppercase tracking-widest text-white no-underline lg:mb-0 lg:mt-0 lg:w-1/3"
		>
			<small class="text-yellow-350">{content.brand}</small>
		</Heading>
	</a>
</li>
