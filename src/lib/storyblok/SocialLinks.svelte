<script lang="ts">
	import { onMount } from 'svelte';
	import { getStoryblokApi } from '@storyblok/svelte';

	let links: any;

	onMount(async () => {
		const storyblokApi = getStoryblokApi();
		links = await storyblokApi.get('cdn/datasource_entries', {
			datasource: 'social-media-links'
		});
	});
</script>

<div class="flex">
	{#if links}
		{#each links.data.datasource_entries as item}
			<a class="mr-2" href={item.value} target="_blank">{item.name}</a>
		{/each}
	{/if}
</div>

<style lang="scss">
	@import '../../vars.scss';
</style>
