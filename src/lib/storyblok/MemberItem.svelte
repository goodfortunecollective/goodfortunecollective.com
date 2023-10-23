<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';

	import { heading_hover_media } from '$lib/stores';
	import { Heading } from '$lib/components';

	export let blok: any;

	function handleMouseEnter() {
		heading_hover_media.set(blok.image.filename);
	}

	function handleMouseLeave() {
		heading_hover_media.set(null);
	}
</script>

<li
	use:storyblokEditable={blok}
	{...$$restProps}
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
	class="h-20 w-full border-b border-gray-500 last:border-0 hover:bg-red-500"
>
	<span class="align-center flex flex-row py-4 text-left">
		<Heading size="h3" as="h3" class="w-2/3">
			{blok.name}
		</Heading>
		<Heading
			size="h6"
			as="h3"
			class="flex w-1/3 items-center font-bold uppercase tracking-widest text-white"
		>
			{blok.role}
		</Heading>
	</span>
</li>
