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
		<div class="max-w-6xl mx-auto">
			<div class="flex flex-col gap-8 px-8 lg:flex-row lg:pt-32 lg:gap-32 lg:px-0">
				<Heading as="h2" size="h3" class="w-full lg:w-1/4">{blok.title}</Heading>
				{#if jobs}
					<ul class="flex-1 w-full">
						{#each jobs.data.stories as { name, slug }}
							<LinkListItem {name} url="{base}/careers/{slug}" label="Apply Now" />
						{/each}
					</ul>
				{/if}
			</div>
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
