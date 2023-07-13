<script lang="ts">
	export let blok: any;

	let {title, description} = blok;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description}/>
</svelte:head>
