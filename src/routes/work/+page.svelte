<script lang="ts">
	import { onMount } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';
	import type { Curtains } from '@types/curtainsjs';

	import { base } from '$app/paths';
	import { navigating, page } from '$app/stores';
	import { ProjectListItem } from '$lib/components';
	import { ScrollTrigger } from '$lib/gsap';
	import { project_list_hover } from '$lib/stores';
	import { useCurtains } from '$lib/utils/useCurtains';
	import { useTransitionReady } from '$lib/utils/useTransitionReady';

	import MenuList from './MenuList.svelte';
	import MenuItem from './MenuItem.svelte';

	let curtains: undefined | Curtains;

	useCurtains((curtainsInstance) => {
		curtains = curtainsInstance;
	});

	export let data;

	let containerEl: HTMLElement;

	$: filter = $page.url.searchParams.get('filter');

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
		'col-span-10 col-start-3 md:col-span-5 md:col-start-7 md:mt-[16.66%] z-2 text-right',
		'col-span-10 col-start-1 md:col-span-6 md:col-start-2 md:-mt-[25%] z-1 text-left',
		'col-span-10 col-start-3 md:col-span-6 md:col-start-5 md:mt-[8.33%] z-2 text-right',
		'col-span-10 col-start-1 md:col-span-4 md:col-start-2 md:-mt-[16.66%] z-1 text-left',
		'col-span-10 col-start-3 md:col-span-4 md:col-start-8 md:mt-[16.66%] z-2 text-right',
		'col-span-10 col-start-1 md:col-span-7 md:col-start-2 md:-mt-[4.166%] z-1 text-left'
	];

	const getProjectGridItemClass = (index: number) => {
		if (index === 0) {
			return 'col-span-11 z-1 text-left';
		} else {
			return projectGridItemsClasses[(index - 1) % 6];
		}
	};

	// force removing all projects planes when navigating away
	// works even if we have used the filters
	$: useCurtainsPlanes = true as boolean;
	$: if ($navigating) {
		if (curtains && $navigating?.from?.route.id === '/work') {
			useCurtainsPlanes = false;
		}
	}

	onMount(() => {
		if (data.story) {
			useStoryblokBridge(data.story.id, (newStory) => (data.story = newStory));
		}
	});

	useTransitionReady(
		() => {
			// @ts-ignore
			ScrollTrigger.create({
				id: 'project-work',
				trigger: containerEl,
				start: 'top center',
				end: 'bottom center'
				// onToggle: (self: any) => {
				// 	if (!self.isActive) {
				// 		$project_list_hover = '';
				// 	}
				// }
			});
		},
		() => {
			const scrollTrigger = ScrollTrigger.getById('project-work');
			if (scrollTrigger) scrollTrigger.kill();
		}
	);

	// update planes sizes and positions
	/**
	async function hashchange() {
		if (curtains) curtains.resize();
	}
	*/
</script>

<section class="pt-20 3xl:pt-24 pb-32">
	<div class="mt-16">
		<div class="relative">
			<MenuList class="absolute top-0 right-0 z-10 flex flex-col items-end gap-4">
				<MenuItem
					name="All Projects"
					sup={data.projects.length}
					url={`${base}/work`}
					selected={!filter || filter === 'all'}
				/>
				{#each categories as category, i}
					{#if category.count > 0}
						<MenuItem
							name={category.name}
							sup={category.count}
							url={`${base}/work?filter=${category.value}`}
							delay={i * 50}
							selected={filter === category.value}
						/>
					{/if}
				{/each}
			</MenuList>
		</div>

		<div class="mb-32" bind:this={containerEl}>
			{#each projects as { name, slug, content }, index}
				<div class="grid grid-cols-12">
					<ProjectListItem
						hover={$project_list_hover === name}
						{name}
						{slug}
						{content}
						isMainItem={index === 0}
						layout={index % 2 === 0 ? 'left' : 'right'}
						{useCurtainsPlanes}
						class={getProjectGridItemClass(index)}
					/>
				</div>
			{/each}
		</div>
	</div>
</section>

{#if data.story}
	<StoryblokComponent blok={data.story.content} />
{/if}

<style lang="scss">
</style>
