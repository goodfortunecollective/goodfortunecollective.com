<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';
	import { Image } from '$lib/components';

	import { getImageDimensionsFromUrl } from '$lib/storyblok/utils';

	export let blok: any;
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	{#if blok.asset.filename?.length > 0}
		<Image
			src={`${blok.asset.filename}/m/`}
			width={getImageDimensionsFromUrl(blok.asset.filename).width}
			height={getImageDimensionsFromUrl(blok.asset.filename).height}
			alt={blok.asset.name}
			loading="lazy"
			class="w-full"
			animated={blok.animated}
		/>
	{/if}
</div>
