<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';

	import { BackgroundTheme } from '$lib/components';

	export let blok: any;
</script>

<div use:storyblokEditable={blok}>
	<BackgroundTheme
		{...$$restProps}
		preload={blok.preload}
		startColor={blok.startColor}
		endColor={blok.endColor}
		startTheme={blok.startTheme}
		endTheme={blok.endTheme}
	/>
</div>
