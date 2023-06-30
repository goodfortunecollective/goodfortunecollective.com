<script lang="ts">
	import { Heading } from '$lib/components/typography';
	import { renderRichText } from '@storyblok/svelte';
	import { StoryblokComponent, storyblokEditable } from '@storyblok/svelte';

	export let blok: any;
	let { body } = blok;
	$: solutions = renderRichText(blok.solutions);
	$: roles = renderRichText(blok.roles);
	$: deliverables = renderRichText(blok.deliverables);
</script>

<div use:storyblokEditable={body} class="px-6">
	<div class="flex flex-row project-header">
		<div class="flex flex-row gap-4 project-header-infos md:w-3/4">
			{#if blok.client}
				<div class="project-header-col">
					<h5 class="mb-2 text-sm font-bold uppercase">Client</h5>
					{blok.client}
				</div>
			{/if}
			{#if blok.solutions}
				<div class="project-header-col">
					<h5 class="mb-2 text-sm font-bold uppercase">Solutions</h5>
					{@html solutions}
				</div>
			{/if}
			{#if blok.roles}
				<div class="project-header-col">
					<h5 class="mb-2 text-sm font-bold uppercase">Roles</h5>
					{@html roles}
				</div>
			{/if}
			{#if blok.deliverables}
				<div class="project-header-col">
					<h5 class="mb-2 text-sm font-bold uppercase">Deliverables</h5>
					{@html deliverables}
				</div>
			{/if}
		</div>
		<figure class="project-thumbnail md:w-1/4">
			{#if blok.thumbnail}
				<img src={blok.thumbnail.filename} alt={blok.title} />
			{/if}
		</figure>
		<!-- <Heading size="h1">{blok.title}</Heading> -->
	</div>
	{#each body as blok}
		<StoryblokComponent {blok} />
	{/each}
</div>

<style lang="scss">
	.project-header-col {
		h5 {
			letter-spacing: 0.02em;
		}
		p {
			margin: 0;
		}
	}
	// @import '../../vars.scss';
</style>
