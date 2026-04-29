<script lang="ts">
	import { onDestroy, onMount, tick } from 'svelte';

	import { ScrollTrigger } from '$lib/gsap';
	import { useTransitionReady } from '$lib/utils/useTransitionReady';
	import { StoryblokComponent, useStoryblokBridge } from '@storyblok/svelte';
	import { fade } from 'svelte/transition';

	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { ProjectListItem } from '$lib/components';
	import gsap from '$lib/gsap';
	import { isTransitioningEnabled } from '$lib/stores';
	import { lenisStore as lenis } from '$lib/stores/lenis';
	import { useCurtains, type CurtainsInstance } from '$lib/utils/useCurtains';

	import ArchiveItem from './ArchiveItem.svelte';
	import MenuItem from './MenuItem.svelte';
	import MenuList from './MenuList.svelte';

	let activeFilter = false;
	let projectReturnReady = false;

	let el!: HTMLElement;
	let curtains: CurtainsInstance;
	let ctx: any = null;
	let returnScrollFrame: number | null = null;

	useCurtains((curtainsInstance) => {
		curtains = curtainsInstance;
	});

	export let data;

	//$: filter = $page.url.searchParams.get('filter');
	$: filter = $page.url.hash.slice(1);
	$: projectReturnSlug = $page.url.searchParams.get('slug');
	$: isProjectReturn = !$isTransitioningEnabled && !!projectReturnSlug;
	$: hideProjectReturn = isProjectReturn && !projectReturnReady;

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

	const waitForFrame = () =>
		new Promise<void>((resolve) => {
			returnScrollFrame = requestAnimationFrame(() => {
				returnScrollFrame = null;
				resolve();
			});
		});

	const scrollInstantlyTo = (target: HTMLElement) => {
		window.scrollTo({
			top: target.getBoundingClientRect().top + window.scrollY,
			behavior: 'auto'
		});

		$lenis?.scrollTo(target, { offset: 0, immediate: true });
	};

	const completeProjectReturn = () => {
		isTransitioningEnabled.set(true);
		projectReturnReady = true;
		ScrollTrigger.refresh(true);
	};

	const handleProjectReturn = async () => {
		gsap.set(el, { opacity: 0, y: 0 });

		await tick();
		await waitForFrame();

		const scrollElem = projectReturnSlug ? document.getElementById(projectReturnSlug) : null;

		if (!scrollElem) {
			if (el) scrollInstantlyTo(el);
			completeProjectReturn();
			return;
		}

		for (let attempt = 0; attempt < 8; attempt += 1) {
			scrollInstantlyTo(scrollElem);
			await waitForFrame();

			if (Math.abs(scrollElem.getBoundingClientRect().top) <= 2) break;
		}

		ctx = gsap.context(() => {
			gsap.to(el, {
				duration: 1,
				opacity: 1,
				delay: 0.1,
				ease: 'power2.out',
				onComplete: () => {
					ScrollTrigger.refresh(true);
				}
			});
		});

		completeProjectReturn();
	};

	onMount(() => {
		if (data.story) {
			useStoryblokBridge(data.story.id, (newStory) => (data.story = newStory));
		}

		if (!$isTransitioningEnabled && projectReturnSlug) {
			handleProjectReturn();
		} else {
			projectReturnReady = true;
		}
	});

	useTransitionReady(() => {
		activeFilter = true;
		ScrollTrigger.refresh(true);
	});

	onDestroy(() => {
		if (returnScrollFrame) {
			cancelAnimationFrame(returnScrollFrame);
			returnScrollFrame = null;
		}

		ctx?.revert();
	});
</script>

<div class:opacity-0={hideProjectReturn}>
	{#if data.story}
		<StoryblokComponent blok={data.story.content} />
	{/if}

	<section class="relative pt-8" bind:this={el}>
		<div class="relative hidden xl:block">
			{#if activeFilter}
				<MenuList class="fixed top-32 right-4 z-10 flex flex-col items-end gap-4 pt-8 pr-8">
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
</div>
