<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';

	import { Spacer } from '$lib/components';

	export let blok: any;
</script>

<div use:storyblokEditable={blok}>
	<Spacer {...$$restProps} gap={blok.gap} />
</div>
