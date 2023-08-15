<script lang="ts">
	import { onMount } from 'svelte';
	import { storyblokEditable, getStoryblokApi } from '@storyblok/svelte';

	import { base } from '$app/paths';
	import { dev } from '$app/environment';
	import { Heading, LinkListItem } from '$lib/components';

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
	{#if blok.title}
		<div class="grid grid-cols-12 gap-8 md:gap-0">
			<Heading as="h2" size="h3" class="col-start-2 md:col-start-2 col-span-10 md:col-span-3"
				>{blok.title}</Heading
			>
			{#if jobs}
				<ul class="col-start-2 md:col-start-6 col-span-10 md:col-span-6">
					{#each jobs.data.stories as { name, slug }}
						<LinkListItem {name} url="{base}/careers/{slug}" label="Apply Now" />
					{/each}
				</ul>
			{/if}
		</div>
	{:else}
		<div>
			{#if jobs}
				<ul>
					{#each jobs?.data.stories as { name, slug }}
						<LinkListItem {name} url="{base}/careers/{slug}" label="Apply Now" />
					{/each}
				</ul>
			{/if}
		</div>
	{/if}
</section>
