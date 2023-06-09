<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	export let data;

	onMount(() => {});

	onDestroy(() => {});
</script>

<svelte:head>
	<title>Work SLUG</title>
	<meta name="description" content="Work SLUG" />
</svelte:head>

<div class="relative">
	<h1>Work Slug {data.slug}</h1>
</div>

<style>
</style>
