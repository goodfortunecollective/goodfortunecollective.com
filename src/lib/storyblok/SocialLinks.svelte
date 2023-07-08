<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	// import { Heading } from '$lib/components/typography';
	import { getStoryblokApi } from '@storyblok/svelte'; // storyblokEditable

	// export let blok: any;
	export let links: any;

	onMount(async () => {
		const storyblokApi = getStoryblokApi();
		links = await storyblokApi.get('cdn/datasource_entries', {
			datasource: 'social-media-links'
		});
	});
</script>

<div class="flex social-links">
	{#if links}
		{#each links.data.datasource_entries as item}
			<a class="mr-2 social-link" href={item.value} target="_blank">{item.name}</a>
		{/each}
	{/if}
</div>

<style lang="scss">
	@import '../../vars.scss';
</style>
