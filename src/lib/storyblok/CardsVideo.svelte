<script lang="ts">
	import { inview } from 'svelte-inview';
	import { storyblokEditable } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { cls } from '$lib/styles';
	import { backgroundTheme } from '$lib/stores';
	import { Video, Image } from '$lib/components';
	import { inViewColorTransition } from '$lib/utils/animations';
	import { isMobile } from '$lib/utils/browser';

	export let blok: any;

	$: innerWidth = 0;

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

	const containerStyle = cva('relative h-full w-full overflow-hidden', {
		variants: {
			aspect: {
				square: 'aspect-square',
				landscape: 'aspect-video',
				half: 'aspect-[1/2]'
			}
		},
		defaultVariants: {
			aspect: 'landscape'
		}
	});
</script>

<svelte:window bind:innerWidth />

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	use:inview
	on:inview_change={inViewColorTransition}
	class={cls(variants({ theme: $backgroundTheme }), blok.class)}
>
	<div class="flex h-full w-full flex-col">
		<div class={containerStyle({ aspect: blok.aspect })}>
			<div class="absolute inset-x-0 bottom-0">
				{#if (blok.asset !== '' && innerWidth >= 768) || blok.asset_fallback === undefined}
					<Video videoUrl={blok.asset} autoplay muted loop animated={false} />
				{/if}
				{#if blok.asset_fallback?.filename?.length > 0 && innerWidth < 768 && isMobile()}
					<Image src={blok.asset_fallback.filename} alt="" animated={false} />
				{/if}
			</div>
		</div>
	</div>
</div>
