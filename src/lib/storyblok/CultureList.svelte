<script lang="ts">
	import { onMount } from 'svelte';
	import { storyblokEditable, getStoryblokApi } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { cls } from '$lib/styles';
	import { base } from '$app/paths';
	import { dev } from '$app/environment';
	import { Heading } from '$lib/components';
	import { backgroundTheme } from '$lib/stores';

	export let blok: any;

	let posts: any;

	const headingStyle = cva('', {
		variants: {
			theme: {
				light: '',
				dark: 'text-yellow-50'
			}
		},
		defaultVariants: {
			theme: 'light'
		}
	});

	const textStyle = cva('text-xs tracking-widest uppercase tag-list', {
		variants: {
			theme: {
				light: '',
				dark: 'text-white'
			}
		},
		defaultVariants: {
			theme: 'light'
		}
	});

	onMount(async () => {
		const storyblokApi = getStoryblokApi();
		posts = await storyblokApi.get('cdn/stories', {
			version: dev ? 'draft' : 'published',
			starts_with: 'articles'
		});

		console.log('posts.data.stories ', posts.data.stories);
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
			{#each posts.data.stories as post, i}
				<a class={cls(postsClasses[i % 6], 'mb-16 lg:mb-32')} href="{base}/culture/{post.slug}">
					<div class={cls(textClasses[i % 6], 'mt-16 post-text')}>
						{#if post.tag_list}
							<span class={textStyle({ theme: $backgroundTheme })}>
								{#each post.tag_list as tag, i}
									{#if i > 0}&nbsp;
									{/if}
									#{tag}
								{/each}
							</span>
						{/if}
						<Heading as="h2" size="h2" class={headingStyle({ theme: $backgroundTheme })}
							>{post.name}</Heading
						>
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
