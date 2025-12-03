<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';

	import { Heading } from '$lib/components';
	import { heading_hover_media } from '$lib/stores';

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
	class="h-auto w-full border-b border-gray-500 last:border-0 lg:h-20 2xl:h-32"
>
	<span class="align-center block h-full py-4 text-left lg:flex lg:flex-row 2xl:py-8">
		<Heading size="h3" as="h3" class="w-full lg:w-2/3">
			{blok.name}
		</Heading>
		<Heading
			size="h6"
			as="h3"
			class="flex w-full items-center font-bold tracking-widest text-white uppercase lg:w-1/3"
		>
			<small>{blok.role}</small>
		</Heading>
	</span>
</li>
