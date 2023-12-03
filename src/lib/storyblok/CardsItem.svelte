<script lang="ts">
	import { inview } from 'svelte-inview';
	import { storyblokEditable } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { Heading, NumberedListItem } from '$lib/components';
	import { cls } from '$lib/styles';
	import { backgroundTheme } from '$lib/stores';
	import { getImageDimensionsFromUrl } from '$lib/storyblok/utils';
	import { inViewColorTransition } from '$lib/utils/animations';

	export let blok: any;

	const variants = cva('w-80 rounded-2xl duration-1000 ease-out', {
		variants: {
			theme: {
				light: 'bg-stone-100',
				dark: 'bg-stone-300 text-yellow-50'
			}
		},
		defaultVariants: {
			theme: 'light'
		}
	});
</script>

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	use:inview
	on:inview_change={inViewColorTransition}
	class={cls(variants({ theme: $backgroundTheme }), blok.class)}
>
	<div class="flex flex-col p-8">
		<div class="relative aspect-square w-full">
			<div class="absolute inset-0">
				{#if blok.asset.filename?.length > 0}
					<img
						src={`${blok.asset.filename}/m/`}
						width={getImageDimensionsFromUrl(blok.asset.filename).width}
						height={getImageDimensionsFromUrl(blok.asset.filename).height}
						alt={blok.asset.name ? blok.asset.name : ''}
						class="h-full w-full object-contain"
						loading="lazy"
					/>
				{/if}
			</div>
			<div class="absolute inset-0 text-red-100">
				<NumberedListItem index={$$restProps.index} />
			</div>
		</div>
		<div class="relative h-32">
			<Heading
				as="h3"
				size="h3"
				class="absolute -bottom-4 align-bottom text-4xl 3xl:text-4xl 4xl:text-4xl"
				>{blok.title}</Heading
			>
		</div>
	</div>
</div>
