<script lang="ts">
	import { onMount } from 'svelte';
	import { storyblokEditable, getStoryblokApi } from '@storyblok/svelte';

	import { cls } from '$lib/styles';
	import { base } from '$app/paths';
	import { dev } from '$app/environment';
	import { Heading } from '$lib/components';

	export let blok: any;

	let posts: any;

	onMount(async () => {
		const storyblokApi = getStoryblokApi();
		posts = await storyblokApi.get('cdn/stories', {
			version: dev ? 'draft' : 'published',
			starts_with: 'articles'
		});
	});

	const postsClasses = [
		'col-start-3 col-span-20 lg:col-start-3 lg:col-span-9',
		'col-start-3 col-span-20 lg:col-start-14 lg:col-span-9',
		'col-start-3 col-span-20 lg:col-start-3 lg:col-span-20 lg:flex lg:flex-row ',
		'col-start-3 col-span-20 lg:col-start-3 lg:col-span-6',
		'col-start-3 col-span-20 lg:col-start-10 lg:col-span-6',
		'col-start-3 col-span-20 lg:col-start-17 lg:col-span-6'
	];
	const imageClasses = ['', '', 'lg:w-2/3', '', '', ''];
	const textClasses = [
		'',
		'',
		'lg:w-1/3 lg:mb-20 lg:flex lg:flex-col lg:justify-end lg:pl-[3.33%]',
		'',
		'',
		''
	];
</script>

<section id="culture-posts" use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<div class="grid py-16 grid-cols-24">
		{#if posts}
			{#each posts.data.stories as item, i}
				<a class={cls(postsClasses[i % 6], 'mb-16 lg:mb-32')} href="{base}/culture/{item.slug}">
					{#if item.content.thumbnail}
						<figure class={cls(imageClasses[i % 6], 'post-image')}>
							<img src={item.content.thumbnail.filename} class="post-img" alt={item.name} />
						</figure>
					{/if}
					<div class={cls(textClasses[[i % 6]], 'mt-16 post-text')}>
						{#if item.tag_list}
							<span class="text-xs tracking-widest uppercase tag-list">
								{#each item.tag_list as tag, i}
									{#if i > 0}&nbsp;
									{/if}
									#{tag}
								{/each}
							</span>
						{/if}
						<Heading as="h2" size="h3" class="">{item.name}</Heading>
					</div>
				</a>
			{/each}
		{/if}
	</div>
</section>

<style lang="scss">
	.post-img {
		width: 100%;
	}
</style>
