<script lang="ts">
	import { getStoryblokApi, storyblokEditable } from '@storyblok/svelte';
	import { onMount } from 'svelte';

	import { dev } from '$app/environment';
	import { base } from '$app/paths';
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
	<div class="grid grid-cols-12 gap-8 pt-8 lg:gap-0 lg:pt-[8.33vw]">
		{#if jobs}
			<ul
				class="col-span-12 col-start-1 mx-4 md:col-span-10 md:col-start-2 md:mx-0 lg:col-span-6 lg:col-start-6 2xl:col-span-5 2xl:col-start-6"
			>
				{#each jobs?.data.stories as { name, slug }}
					<LinkListItem {name} url="{base}/careers/{slug}" label="Apply Now" />
				{/each}
			</ul>
		{/if}
	</div>
</section>
