<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { inview } from 'svelte-inview';
	import { storyblokEditable } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { cls } from '$lib/styles';
	import { backgroundTheme } from '$lib/stores';
	import { getImageDimensionsFromUrl } from '$lib/storyblok/utils';
	import { inViewColorTransition } from '$lib/utils/animations';

	export let blok: any;

	let el!: HTMLElement;
	let imageWidth = 0;

	const variants = cva('h-full w-full duration-1000 ease-out', {
		variants: {
			theme: {
				light: '',
				dark: 'text-white'
			}
		},
		defaultVariants: {
			theme: 'light'
		}
	});

	onMount(() => {
		if (!blok.asset?.filename) return;

		const w = getImageDimensionsFromUrl(blok.asset.filename).width;
		const h = getImageDimensionsFromUrl(blok.asset.filename).height;

		imageWidth = (el.getBoundingClientRect().height / h) * w;
	});
</script>

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	use:inview
	on:inview_change={inViewColorTransition}
	class={cls(variants({ theme: $backgroundTheme }), blok.class)}
	bind:this={el}
>
	<div class="flex h-full w-full flex-col">
		{#if blok.asset.filename?.length > 0}
			<div class="relative h-full" style={`width: ${imageWidth}px`}>
				<div class="absolute inset-0">
					<img
						src={`${blok.asset.filename}/m/`}
						alt={blok.asset.name}
						loading="lazy"
						decoding="async"
						class="h-full w-full"
						in:fade={{ duration: 500 }}
					/>
				</div>
			</div>
		{/if}
	</div>
</div>
