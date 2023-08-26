<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';

	import { ProjectListItem } from '$lib/components';
	import { project_list_hover } from '$lib/stores';

	export let blok: any;

	const projectGridItemsClasses = [
		'col-span-5 col-start-7 mt-[16.66%] z-2 text-right',
		'col-span-6 col-start-2 -mt-[25%] z-1 text-left',
		'col-span-6 col-start-5 mt-[8.33%] z-2 text-right',
		'col-span-4 col-start-2 -mt-[16.66%] z-1 text-left',
		'col-span-4 col-start-8 mt-[16.66%] z-2 text-right',
		'col-span-7 col-start-2 -mt-[4.166%] z-1 text-left'
	];

	const getProjectGridItemClass = (index: number) => {
		if (index === 0) {
			return 'col-span-11 z-1 text-left';
		} else {
			return projectGridItemsClasses[(index - 1) % 6];
		}
	};
</script>

<section use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<div class="mb-64">
		{#each blok.projects as { name, slug, content }, index (content._uid)}
			<div class="grid grid-cols-12">
				<ProjectListItem
					hover={$project_list_hover.includes(slug)}
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
