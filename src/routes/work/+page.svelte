<script lang="ts">
	import { onMount } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';

	import { base } from '$app/paths';
	import ScrollPlane from '$lib/components/ScrollPlane.svelte';

	export let data;
	export let categoriesData = [];
	export let activeCategory = 'all';
	let categoriesOpened = false;

	function toggleCategories() {
		categoriesOpened = !categoriesOpened;
	}

	function categoryOnClick(e) {
		let $categoryActive = document.getElementsByClassName('category active'),
			name = e.currentTarget.getAttribute('data-category');

		if (e.currentTarget.className.indexOf('active') == -1) {
			if ($categoryActive.length) $categoryActive[0].classList.remove('active');
			e.currentTarget.classList.add('active');
			activeCategory = name;
		} else {
			activeCategory = 'all';
			e.currentTarget.classList.remove('active');
		}

		e.preventDefault();
	}

	onMount(() => {
		if (data.story) {
			useStoryblokBridge(data.story.id, (newStory) => (data.story = newStory));
		}
		// console.log(data.stories);

		// Get project counts by category
		let storiesLength = data.projects.length;

		let categories = data.categories.data.datasource_entries,
			categoriesLength = categories.length;

		for (let i = 0; i < categoriesLength; i++) {
			categoriesData[i] = {
				name: categories[i].name,
				slug: categories[i].value,
				count: 0
			};
		}

		for (let indexStory = 0; indexStory < storiesLength; indexStory++) {
			let categories = data.projects[indexStory].content.category;

			for (let indexCat = 0; indexCat < categories.length; indexCat++) {
				let category = categories[indexCat];
				var result = categoriesData.find((item) => item.slug === category);
				// console.log('category :' + category);
				// console.log(result);
				result.count++;
			}
		}
	});
</script>

<section class="pt-[var(--header-height)] pb-32">
	<div
		class={'categories-toggle' + (categoriesOpened ? ' opened' : '')}
		id="categories-toggle"
		on:click={toggleCategories}
	/>

	<div
		class={'flex flex-col mt-12 pr-6 text-sm font-bold uppercase tracking-wider ategories' +
			(categoriesOpened ? ' opened' : '')}
		id="categories"
	>
		<a
			class="mb-2 category all active"
			href="{base}/work#all"
			data-category="all"
			on:click={categoryOnClick}
			>All projects
			{#if data.projects}
				<sup class="text-xs font-normal category-number">
					{#if data.projects.length < 10}0{/if}{data.projects.length}</sup
				>
			{/if}
		</a>
		{#each data.categories.data.datasource_entries as category, i}
			{#if categoriesData[i] && categoriesData[i].count > 0}
				<a
					class="mb-2 category"
					href="#{category.value}"
					data-category={category.value}
					on:click={categoryOnClick}
				>
					{category.name}
					{#if categoriesData[i]}
						<sup class="text-xs font-normal category-number">
							{#if categoriesData[i].count < 10}0{/if}{categoriesData[i].count}</sup
						>
					{/if}
				</a>
			{/if}
		{/each}
	</div>

	{#each data.projects as { name, slug, content }}
		<ScrollPlane {name} {slug} {content} />
	{/each}
</section>

{#if data.story}
	<StoryblokComponent blok={data.story.content} />
{/if}

<style lang="scss">
	@import '../../vars.scss';

	#categories-toggle {
		position: relative;
		width: 39px;
		height: 39px;
		border-radius: 100%;
		background: #e0e6e7;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: 0.5s background ease-out;
		cursor: pointer;
		z-index: 20;

		@media (min-width: $media-md) {
			position: absolute;
			right: 0;
		}

		&:before,
		&:after {
			position: absolute;
			width: 9px;
			height: 1px;
			background: #596669;
			content: '';
			transition: 0.5s background ease-out, 0.5s opacity ease-out, 0.4s transform ease-out;
		}

		&:after {
			transform: rotate(90deg);
		}

		&.opened {
			background: $black;

			&:before,
			&:after {
				background: $white;
			}

			&:after {
				opacity: 0;
				transform: rotate(45deg);
			}
		}
	}

	#categories {
		position: relative;
		// letter-spacing: 0.05em;
		z-index: 15;
		overflow: hidden;
		padding-left: 40px;
		height: 0;
		transition: 0.5s height ease-out;
		text-align: right;

		&.opened {
			height: auto;
		}

		&:after {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			width: 1px;
			background: #a3b2b6;
			content: '';
		}

		@media (min-width: $media-md) {
			position: absolute;
			right: 0;
			margin-right: 20px;
		}
	}

	.category {
		position: relative;
		color: #a7a89a;
		transition: 0.4s color ease-out, 0.4s transform ease-out;

		&:after {
			position: absolute;
			right: -40px;
			width: 4px;
			height: 4px;
			border-radius: 100%;
			top: 50%;
			margin-top: -2px;
			background: $black;
			opacity: 0;
			content: '';
			transition: 0.4s opacity ease-out, 0.4s transform ease-out;
		}

		&.active {
			color: #596669;
			transform: translate(-40px, 0);
			cursor: default;

			&:after {
				opacity: 1;
			}
		}

		@media (min-width: $media-md) {
			&:hover {
				color: #596669;
				transform: translate(-40px, 0);

				&:after {
					opacity: 1;
				}
			}
		}
	}

	.category-number {
		margin-top: -2px;
	}
</style>
