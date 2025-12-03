<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';

	import { getImageDimensionsFromUrl } from '$lib/storyblok/utils';
	import { cls } from '$lib/styles';
	import { lazyLoad } from '$lib/utils/lazyLoad';

	export let blok: any;
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	{#if blok.asset.filename?.length > 0}
		<img
			use:lazyLoad={`${blok.asset.filename}/m/`}
			width={getImageDimensionsFromUrl(blok.asset.filename).width}
			height={getImageDimensionsFromUrl(blok.asset.filename).height}
			alt={blok.asset.name}
			loading="lazy"
			class={cls('w-full', 'sb-image')}
		/>
	{/if}
</div>

<style lang="scss">
	.sb-image {
		opacity: 0;
		transition: opacity 0.6s ease-in-out;
	}
</style>
