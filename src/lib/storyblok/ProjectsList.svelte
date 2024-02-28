<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { ProjectListItem, Link } from '$lib/components';
	import { cls } from '$lib/styles';

	export let blok: any;

	let containerEl: HTMLElement;

	const projectGridParallax = [-3, -5, -2, -1, -2, -1];

	const variants = cva('', {
		variants: {
			layout: {
				left: 'col-span-10 col-start-1 z-1 text-left md:text-left md:col-span-6 md:col-start-2 2xl:col-span-5 2xl:col-start-3',
				right:
					'col-span-10 col-start-3 text-left md:col-span-6 md:col-start-6 md:text-right md:z-2  2xl:col-span-5 2xl:col-start-7'
			}
		},
		defaultVariants: {
			layout: 'left'
		}
	});
</script>

<section use:storyblokEditable={blok} {...$$restProps} class={cls('relative', blok.class)}>
	<div bind:this={containerEl} class="lg:translate-y-64 3xl:translate-y-48">
		<div class="relative my-16 grid w-full grid-cols-12 lg:absolute lg:my-0">
			<div
				class="col-span-12 col-start-1 mx-4 md:col-span-10 md:col-start-2 md:mx-0 2xl:col-span-6 2xl:col-start-3"
			>
				<Link href={blok.href.cached_url} label={blok.label} />
			</div>
		</div>
		<div>
			{#each blok.projects as { name, slug, content }, index}
				<div class="grid grid-cols-12">
					<ProjectListItem
						{name}
						{slug}
						{content}
						parallaxSpeed={projectGridParallax[index % 6]}
						layout={index % 2 === 0 ? 'right' : 'left'}
						class={cls(variants({ layout: index % 2 === 0 ? 'right' : 'left' }))}
					/>
				</div>
			{/each}
		</div>
	</div>
</section>
