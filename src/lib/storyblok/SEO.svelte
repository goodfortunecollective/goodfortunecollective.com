<script lang="ts">
	export let blok: any;

	let { title, description, image } = blok;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="theme-color" content="#000000" />
	{#if image?.filename?.length > 0}
		<meta property="og:image" content={image.filename} />
	{/if}

	<!-- OG -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:site_name" content="Good Fortune Collective" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	{#if image?.filename?.length > 0}
		<meta name="twitter:image" content={image.filename} />
	{/if}
</svelte:head>
