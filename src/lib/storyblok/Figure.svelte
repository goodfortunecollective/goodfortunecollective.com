<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';

	export let blok: any;
</script>

<div use:storyblokEditable={blok} {...$$restProps}>
	<div class="mb-4 md:mb-8 text-7xl md:text-9xl">
		{blok.title}
	</div>
	<div class="text-zinc-500">{blok.content}</div>
</div>
