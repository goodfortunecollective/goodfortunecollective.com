<script lang="ts">
	import { inview } from 'svelte-inview';
	import { storyblokEditable } from '@storyblok/svelte';

	import { NumberedListItem } from '$lib/components';
	import { cls } from '$lib/styles';
	import { inViewColorTransition } from '$lib/utils/animations';

	export let blok: any;
</script>

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	use:inview
	on:inview_change={inViewColorTransition}
	class={cls(
		'h-96 w-[20rem] rounded-2xl bg-neutral-950 duration-1000 ease-out md:h-128 md:w-[26rem] 2xl:w-[28rem]',
		blok.class
	)}
>
	<div class="relative flex h-full w-full flex-col p-8 pb-8">
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
				/>
			{/if}
		</div>
		<span class="absolute bottom-8 pr-8 align-bottom text-3xl text-white lg:text-4xl 2xl:text-5xl"
			>{blok.title}</span
		>
	</div>
</div>
