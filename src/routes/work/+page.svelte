<script lang="ts">
	import { onMount } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';
	import { cls } from '$lib/styles';

	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { ProjectListItem } from '$lib/components';

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

	const projectGridItemsClasses = [
		'col-span-5 col-start-7 mt-[16.66%] z-2 text-right',
		'col-span-6 col-start-2 -mt-[25%] z-1 text-left',
		'col-span-6 col-start-5 mt-[8.33%] z-2 text-right',
		'col-span-4 col-start-2 -mt-[16.66%] z-1 text-left',
		'col-span-4 col-start-8 -mt-[16.66%] z-2 text-right',
		'col-span-7 col-start-1 -mt-[4.166%] z-1 text-left'
	];

	const getProjectGridItemClass = (index) => {
		if (index === 0) {
			return 'col-span-11 z-1 text-left';
		} else {
			return projectGridItemsClasses[(index - 1) % 6];
		}
	};

	onMount(() => {
		if (data.story) {
			useStoryblokBridge(data.story.id, (newStory) => (data.story = newStory));
		}
	});
</script>

<section class="ProjectListPage pt-[var(--header-height)] pb-32">
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

	<div class="ProjectListPage-list grid grid-cols-12">
		{#each projects as { name, slug, content }, index}
			<div class={cls(getProjectGridItemClass(index), 'ProjectListPage-list-item')}>
				<ProjectListItem
					{name}
					{slug}
					{content}
					isMainItem={index === 0}
					layout={index % 2 === 0 ? 'left' : 'right'}
				/>
			</div>
		{/each}
	</div>
</section>

{#if data.story}
	<StoryblokComponent blok={data.story.content} />
{/if}

<style lang="scss">
</style>
