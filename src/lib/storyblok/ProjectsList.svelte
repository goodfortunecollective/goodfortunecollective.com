<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { cls } from '$lib/styles';
	import { ProjectListItem } from '$lib/components';

	export let blok: any;

	let containerEl: HTMLElement;

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
</script>

<section use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<div bind:this={containerEl}>
		{#each blok.projects as { name, slug, content }, index}
			<div class="grid grid-cols-12">
				<ProjectListItem
					{name}
					{slug}
					{content}
					layout={index % 2 === 0 ? 'right' : 'left'}
					class={cls(variants({ layout: index % 2 === 0 ? 'right' : 'left' }))}
				/>
			</div>
		{/each}
	</div>
</section>
