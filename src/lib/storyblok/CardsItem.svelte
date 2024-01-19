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
	class={cls('w-[26rem] rounded-2xl bg-black duration-1000 ease-out', blok.class)}
>
	<div class="flex flex-col p-8 pb-12">
		<div class="relative aspect-video w-full">
			<div class="absolute inset-0 text-red-100">
				<NumberedListItem index={$$restProps.index} />
			</div>
		</div>
		<div class="relative h-3">
			<span
				class="absolute -bottom-4 align-bottom text-3xl text-white lg:text-4xl 3xl:text-5xl 4xl:text-5xl"
				>{blok.title}</span
			>
		</div>
	</div>
</div>
