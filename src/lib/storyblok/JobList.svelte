<script lang="ts">
	import { onMount } from 'svelte';
	import { storyblokEditable, getStoryblokApi } from '@storyblok/svelte';

	import { base } from '$app/paths';
	import { dev } from '$app/environment';
	import { LinkListItem } from '$lib/components';

	export let blok: any;

	let jobs: any;

	onMount(async () => {
		const storyblokApi = getStoryblokApi();
		jobs = await storyblokApi.get('cdn/stories', {
			version: dev ? 'draft' : 'published',
			starts_with: 'jobs'
		});
	});
</script>

<section id="jobs" use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<div class="pt-8 grid grid-cols-12 lg:pt-[8.33vw] gap-8 lg:gap-0">
		{#if jobs}
			<ul class="col-span-10 col-start-2 lg:col-span-6 lg:col-start-5">
				{#each jobs?.data.stories as { name, slug }}
					<LinkListItem {name} url="{base}/careers/{slug}" label="Apply Now" />
				{/each}
			</ul>
		{/if}
	</div>
</section>
