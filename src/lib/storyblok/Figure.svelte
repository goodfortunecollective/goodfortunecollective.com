<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';

	export let blok: any;
</script>

<div use:storyblokEditable={blok} {...$$restProps} class="mb-12 figure-block md:mb-0">
	<div class="mb-4 font-bold md:mb-8 text-7xl md:text-9xl figure-block-title">
		{blok.title}
	</div>
	<div class="figure-block-content">
		{blok.content}
	</div>
</div>
