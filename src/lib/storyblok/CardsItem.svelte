<script lang="ts">
	import { renderRichText, storyblokEditable } from '@storyblok/svelte';
	import { inview } from 'svelte-inview';

	import { cls } from '$lib/styles';
	import { inViewColorTransition } from '$lib/utils/animations';

	import { NumberedListItem, RichtextTransition } from '$lib/components';

	export let blok: any;

	$: content = renderRichText(blok.content);
</script>

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	use:inview
	on:inview_change={inViewColorTransition}
	class={cls(
		'h-full w-[20rem] rounded-2xl bg-neutral-950 duration-1000 ease-out md:w-[26rem] 2xl:w-[28rem]',
		blok.class
	)}
>
	<div class="relative flex h-full w-full flex-col p-8">
		<div class="relative w-full">
			<div class="absolute inset-0 text-red-100">
				<NumberedListItem index={$$restProps.index} />
			</div>
			{#if blok.video}
				<video
					preload="metadata"
					class="h-full w-full"
					autoplay={true}
					loop={true}
					muted={true}
					playsinline
					src={blok.video}
				></video>
			{/if}
		</div>
		<RichtextTransition
			class="[&_p]:4xl:text-4xl absolute bottom-8 pr-8  align-bottom text-white [&_h3]:text-3xl [&_h3]:lg:text-4xl [&_h3]:2xl:text-5xl [&_p]:my-4 [&_p]:text-xl [&_p]:leading-snug [&_p]:xl:text-2xl"
		>
			{@html content}
		</RichtextTransition>
	</div>
</div>
