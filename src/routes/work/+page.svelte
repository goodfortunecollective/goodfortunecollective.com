<script lang="ts">
	import { onMount } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';

	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import ScrollPlane from '$lib/components/ScrollPlane.svelte';
	import MenuList from './MenuList.svelte';
	import MenuItem from './MenuItem.svelte';

	export let data;

	$: filter = $page.url.hash.slice(1);

	/**
	 * @param {string} filter
	 */
	const getProjectsByCategory = (filter: string, projects: any) => {
		if (filter) {
			return projects.filter((project: any) => project.content.category.indexOf(filter) !== -1);
		}
		return projects;
	};

	$: projects = getProjectsByCategory(filter, data.projects);

	onMount(() => {
		if (data.story) {
			useStoryblokBridge(data.story.id, (newStory) => (data.story = newStory));
		}
	});
</script>

<section class="pt-[var(--header-height)] pb-32">
	<div class="max-w-6xl mx-auto relative">
		<MenuList class="z-10 absolute top-0 right-0 flex flex-col items-end gap-4">
			<MenuItem name="All Projects" total={data.projects.length} url={`${base}/work`} />
			{#each data.categories.data.datasource_entries as category, i}
				<MenuItem
					name={category.name}
					total={0}
					url={`${base}/work#${category.value}`}
					delay={i * 50}
				/>
			{/each}
		</MenuList>
	</div>
	{#each projects as { name, slug, content }}
		<ScrollPlane {name} {slug} {content} />
	{/each}
</section>

{#if data.story}
	<StoryblokComponent blok={data.story.content} />
{/if}
