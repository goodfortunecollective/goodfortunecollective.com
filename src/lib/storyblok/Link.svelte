<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';

	import { Link } from '$lib/components/layout';

	export let blok: any;
</script>

<span use:storyblokEditable={blok} class={blok.class}>
	<Link {...$$restProps} href={blok.href} class={blok.class} label={blok.label} />
</span>
