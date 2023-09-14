<script lang="ts">
	import { base } from '$app/paths';
	import { navigating, page } from '$app/stores';
	import MenuList from '../../routes/work/MenuList.svelte';
	import MenuItem from '../../routes/work/MenuItem.svelte';

	export let data;

	$: filter = $page.url.hash.slice(1);

	// console.log(filter);
	// console.log(data);

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
</script>

<MenuList class="fixed top-0 right-0 z-10 flex flex-col items-end gap-4">
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

<style lang="scss">
</style>
