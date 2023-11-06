<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';
	import { cls } from '$lib/styles';

	export let blok: any;
</script>

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	class={cls('absolute inset-0', blok.class)}
	data-speed={blok.speed}
>
	<img src={blok.asset.filename} alt="" />
</div>
