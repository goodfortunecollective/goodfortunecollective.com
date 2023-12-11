<script lang="ts">
	export let blok: any;

	let { title, description, image } = blok;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	{#if image?.filename?.length > 0}
		<meta property="og:image" content={image.filename} />
	{/if}
</svelte:head>
