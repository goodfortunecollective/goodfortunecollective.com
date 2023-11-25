<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';
	import type { Curtains } from '@types/curtainsjs';

	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { cls } from '$lib/styles';
	import { ProjectListItem } from '$lib/components';
	import { project_list_hover } from '$lib/stores';
	import { useCurtains } from '$lib/utils/useCurtains';

	import MenuList from './MenuList.svelte';
	import MenuItem from './MenuItem.svelte';

	let curtains: undefined | Curtains;

	useCurtains((curtainsInstance) => {
		curtains = curtainsInstance;
	});

	export let data;

	//$: filter = $page.url.searchParams.get('filter');
	$: filter = $page.url.hash.slice(1);

	const variants = cva('', {
		variants: {
			layout: {
				left: 'col-span-10 col-start-1 z-1 text-right md:text-left md:col-span-5 md:col-start-2',
				right: 'col-span-10 col-start-3 text-left md:col-span-5 md:col-start-6 md:text-right md:z-2'
			}
		},
		defaultVariants: {
			layout: 'left'
		}
	});

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

{#if data.story}
	<StoryblokComponent blok={data.story.content} />
{/if}

<section class="pt-32 3xl:pt-48">
	<div class="relative hidden lg:block">
		<MenuList class="fixed right-0 top-32 z-10 flex flex-col items-end gap-4 pr-8 pt-8">
			<MenuItem
				name="All Projects"
				sup={data.projects.length}
				url={`${base}/work#all`}
				delayIn={0}
				delayOut={categories.length * 25}
				selected={!filter || filter === 'all'}
			/>
			{#each categories as category, i}
				{#if category.count > 0}
					<MenuItem
						name={category.name}
						sup={category.count}
						url={`${base}/work#${category.value}`}
						delayIn={i * 50}
						delayOut={(categories.length - i) * 25}
						selected={filter === category.value}
					/>
				{/if}
			{/each}
		</MenuList>
	</div>

	<div>
		{#each projects as { name, slug, content }, index (name)}
			<div class="grid grid-cols-12">
				<ProjectListItem
					theme="dark"
					hover={$project_list_hover === name}
					{name}
					{slug}
					{content}
					parallaxSpeed={index % 2 === 0 ? '0.99' : '1.01'}
					layout={index % 2 === 0 ? 'left' : 'right'}
					class={cls(variants({ layout: index % 2 === 0 ? 'left' : 'right' }))}
				/>
			</div>
		{/each}
	</div>
</section>
