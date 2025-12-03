<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	import { fade } from 'svelte/transition';
	import { useTransitionReady } from '$lib/utils/useTransitionReady';
	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';
	import { ScrollTrigger } from '$lib/gsap';

	import gsap from '$lib/gsap';
	import { lenisStore as lenis } from '$lib/stores/lenis';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { ProjectListItem } from '$lib/components';
	import { isTransitioningEnabled } from '$lib/stores';
	import { useCurtains, type CurtainsInstance } from '$lib/utils/useCurtains';

	import MenuList from './MenuList.svelte';
	import MenuItem from './MenuItem.svelte';
	import ArchiveItem from './ArchiveItem.svelte';

	let activeFilter = false;

	let el!: HTMLElement;
	let curtains: CurtainsInstance;
	let ctx: any = null;

	useCurtains((curtainsInstance) => {
		curtains = curtainsInstance;
	});

	export let data;

	//$: filter = $page.url.searchParams.get('filter');
	$: filter = $page.url.hash.slice(1);

	const projectGridItemsClasses = [
		'col-span-10 col-start-3 md:col-span-5 md:col-start-6 md:mt-[4.166%]  z-2 text-left md:text-right 2xl:col-span-5 2xl:col-start-6',
		'col-span-10 col-start-1 md:col-span-6 md:col-start-2 md:-mt-[16.66%] z-1 text-left md:text-left 2xl:col-span-5 2xl:col-start-3',
		'col-span-10 col-start-3 md:col-span-6 md:col-start-5 md:mt-[16.66%] z-2 text-left md:text-right 2xl:col-span-5 2xl:col-start-5',
		'col-span-10 col-start-1 md:col-span-4 md:col-start-2 md:-mt-[4.166%] z-1 text-left md:text-left 2xl:col-span-5 2xl:col-start-3',
		'col-span-10 col-start-3 md:col-span-4 md:col-start-7 md:mt-0 z-2 text-left md:text-right 2xl:col-span-5 2xl:col-start-6',
		'col-span-10 col-start-1 md:col-span-7 md:col-start-2 md:-mt-0 z-1 text-left md:text-left 2xl:col-span-5 2xl:col-start-3'
	];

	const projectGridParallax = [-1, -4, -2, -3, -2, -3];

	const getProjectGridItemClass = (index: number) => {
		if (index === 0) {
			return 'z-1 col-span-10 col-start-1 text-left md:col-span-5 md:col-start-3 md:-mt[16.33%] md:text-left 2xl:col-span-5 2xl:col-start-3';
		} else {
			return projectGridItemsClasses[(index - 1) % 6];
		}
	};

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

		if (!$isTransitioningEnabled) {
			gsap.set(el, { opacity: 0, y: 200 });

			ctx = gsap.context(() => {
				if (el) {
					$lenis?.scrollTo(el, { offset: 0, immediate: true });

					const search = $page.url.searchParams.get('slug');

					if (search) {
						const scrollElem = document.getElementById(search);

						if (scrollElem) {
							gsap.to(el, {
								duration: 1,
								opacity: 1,
								delay: 0.2,
								y: 0,
								ease: 'power2.out'
							});

							setTimeout(() => {
								isTransitioningEnabled.set(true);
								$lenis?.scrollTo(scrollElem, { offset: 0, immediate: true });
							}, 100);
						}
					}
				}
			});
		}
	});

	useTransitionReady(() => {
		activeFilter = true;
		ScrollTrigger.refresh(true);
	});

	onDestroy(() => {
		ctx?.revert();
	});
</script>

{#if data.story}
	<StoryblokComponent blok={data.story.content} />
{/if}

<section class="relative pt-8" bind:this={el}>
	<div class="relative hidden xl:block">
		{#if activeFilter}
			<MenuList class="fixed right-4 top-32 z-10 flex flex-col items-end gap-4 pr-8 pt-8">
				<div in:fade={{ delay: 0 }} out:fade={{ delay: categories.length * 25 }}>
					<MenuItem
						name="All Projects"
						sup={data.projects.length}
						url={`${base}/work#all`}
						selected={!filter || filter === 'all'}
					/>
				</div>
				{#each categories as category, index (category.id)}
					{#if category.count > 0}
						<div
							in:fade|global={{ delay: index * 50 }}
							out:fade|global={{ delay: (categories.length - index) * 25, duration: 150 }}
						>
							<MenuItem
								name={category.name}
								sup={category.count}
								url={`${base}/work#${category.value}`}
								selected={filter === category.value}
							/>
						</div>
					{/if}
				{/each}
			</MenuList>
		{/if}
	</div>

	<div>
		{#each projects as { name, slug, content }, index (name)}
			<div id={`${slug}`} class="grid grid-cols-12">
				<ProjectListItem
					theme="dark"
					{name}
					{slug}
					{content}
					parallaxSpeed={projectGridParallax[index % 6]}
					layout={index % 2 === 0 ? 'left' : 'right'}
					class={getProjectGridItemClass(index)}
				/>
			</div>
		{/each}
	</div>
</section>

<!-- Archive -->
<section class="mb-16">
	{#each data.archive as { name, slug, content }, index (name)}
		<ArchiveItem {name} {slug} {content} />
	{/each}
</section>
