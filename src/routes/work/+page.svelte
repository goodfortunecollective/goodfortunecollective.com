<script lang="ts">
	import { onMount } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';

	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { ScrollPlane } from '$lib/components';

	import MenuList from './MenuList.svelte';
	import MenuItem from './MenuItem.svelte';

	export let data;

	$: filter = $page.url.hash.slice(1);

	/**
	 * @param {any} projects
	 * @param {string} category
	 */
	const countProjectsByCategory = (projects: any, category: string) => {
		let count = 0;
		for (let i = 0; i < projects.length; i++) {
			if (projects[i].content.category.indexOf(category) !== -1) {
				count++;
			}
		}
		return count;
	};

	/**
	 * @param {any} projects
	 * @param {any} categories
	 */
	const getCategoriesByProject = (projects: any, categories: any) => {
		categories.forEach((category: any) => {
			category.count = countProjectsByCategory(projects, category.value);
		});
		return categories;
	};

	const categories = getCategoriesByProject(data.projects, data.categories.data.datasource_entries);

	/**
	 * @param {string} filter
	 */
	const getProjectsByFilter = (projects: any, filter: string) => {
		if (filter && filter !== 'all') {
			return projects.filter((project: any) => project.content.category.indexOf(filter) !== -1);
		}
		return projects;
	};

	$: projects = getProjectsByFilter(data.projects, filter);

	onMount(() => {
		if (data.story) {
			useStoryblokBridge(data.story.id, (newStory) => (data.story = newStory));
		}
	});
</script>

<section class="pt-[var(--header-height)] pb-32">
	<div class="max-w-6xl mx-auto relative">
		<MenuList class="z-10 absolute top-0 right-0 flex flex-col items-end gap-4">
			<MenuItem
				name="All Projects"
				sup={data.projects.length}
				url={`${base}/work#all`}
				selected={!filter || filter === 'all'}
			/>
			{#each categories as category, i}
				{#if category.count > 0}
					<MenuItem
						name={category.name}
						sup={category.count}
						url={`${base}/work#${category.value}`}
						delay={i * 50}
						selected={filter === category.value}
					/>
				{/if}
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
