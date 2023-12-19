<script lang="ts">
	import { onDestroy, onMount, tick } from 'svelte';

	import { fade } from 'svelte/transition';
	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';
	import type { Curtains } from '@types/curtainsjs';

	import gsap from '$lib/gsap';
	import { lenisStore as lenis } from '$lib/stores/lenis';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { cls } from '$lib/styles';
	import { ProjectListItem } from '$lib/components';
	import { project_list_hover, isTransitioningEnabled } from '$lib/stores';
	import { useCurtains } from '$lib/utils/useCurtains';

	import MenuList from './MenuList.svelte';
	import MenuItem from './MenuItem.svelte';

	let el!: HTMLElement;
	let curtains: undefined | Curtains;
	let ctx: any = null;

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
		gsap.set(el, { opacity: 0, y: 200 });

		if (data.story) {
			useStoryblokBridge(data.story.id, (newStory) => (data.story = newStory));
		}

		if (!$isTransitioningEnabled) {
			ctx = gsap.context(() => {
				if (el) {
					scrollTo({ top: 0, behavior: 'instant' });

					const search = $page.url.searchParams.get('slug');

					if (search) {
						const scrollElem = document.getElementById(search);

						if (scrollElem) {
							gsap.to(el, {
								duration: 1,
								opacity: 1,
								delay: 0.3,
								y: 0,
								ease: 'power2.out',
								onStart: () => {
									isTransitioningEnabled.set(true);
									scrollElem?.scrollIntoView(true);
								}
							});
						}
					}
				}
			});
		}
	});

	onDestroy(() => {
		ctx?.revert();
	});
</script>

{#if data.story}
	<StoryblokComponent blok={data.story.content} />
{/if}

<section class="pt-32 3xl:pt-48" bind:this={el}>
	<div class="relative hidden lg:block">
		<MenuList class="absolute right-0 top-32 z-10 flex flex-col items-end gap-4 pr-8 pt-8">
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
	</div>

	<div>
		{#each projects as { name, slug, content }, index (name)}
			<div class="grid grid-cols-12" id={`${slug}`}>
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
