<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';

	export let blok: any;
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<img class="w-full" src={blok.asset.filename} alt={blok.asset.name ? blok.asset.name : ''} />
</div>
