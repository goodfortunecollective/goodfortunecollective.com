<script lang="ts">
	import { onMount } from 'svelte';

	export let blok: any;

	let { title, description } = blok;

	onMount(() => {
		console.log('SEO component mounted', title, description);
	});
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

<div><!-- SEO --></div>
