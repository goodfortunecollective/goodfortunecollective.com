<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';

	import { ProjectListItem } from '$lib/components';
	import { ScrollTrigger } from '$lib/gsap';
	import { project_list_hover } from '$lib/stores';
	import { useTransitionReady } from '$lib/utils/useTransitionReady';

	export let blok: any;

	let containerEl: HTMLElement;

	const projectGridItemsClasses = [
		'col-span-10 col-start-3 mt-[16.66%] text-left md:col-span-5 md:col-start-7 md:mt-[16.66%] md:text-right md:z-2',
		'col-span-10 col-start-1 -mt-[25%] z-1 text-right md:text-left md:col-span-6 md:col-start-2 md:-mt-[25%]',
		'col-span-10 col-start-3 mt-[8.33%] z-2 text-left md:text-right md:col-span-6 md:col-start-5 md:mt-[8.33%]',
		'col-span-10 col-start-1 -mt-[16.66%] z-1 text-right md:text-left md:col-span-4 md:col-start-2 md:-mt-[16.66%]',
		'col-span-10 col-start-3 mt-[16.66%] z-2 text-right md:text-right md:col-span-4 md:col-start-8 md:mt-[16.66%]',
		'col-span-10 col-start-1 -mt-[4.166%] z-1 text-right md:text-left md:col-span-7 md:col-start-2 md:-mt-[4.166%]'
	];

	const getProjectGridItemClass = (index: number) => {
		if (index === 0) {
			return 'col-span-11 z-1 text-left';
		} else {
			return projectGridItemsClasses[(index - 1) % 6];
		}
	};

	useTransitionReady(
		() => {
			// @ts-ignore
			ScrollTrigger.create({
				id: 'project-list-hover',
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
			const scrollTrigger = ScrollTrigger.getById('project-list-hover');
			if (scrollTrigger) scrollTrigger.kill();
		}
	);
</script>

<section use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<div class="mb-16 md:mb-64" bind:this={containerEl}>
		{#each blok.projects as { name, slug, content }, index (content._uid)}
			<div class="ProjectListItem-wrapper grid grid-cols-12">
				<ProjectListItem
					{name}
					{slug}
					{content}
					isMainItem={false}
					layout={index % 2 === 0 ? 'right' : 'left'}
					class={getProjectGridItemClass(index + 1)}
				/>
			</div>
		{/each}
	</div>
</section>
