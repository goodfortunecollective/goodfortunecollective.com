import { apiPlugin, storyblokInit, useStoryblokApi } from '@storyblok/svelte';

import { PUBLIC_STORYBLOK_ACCESS_TOKEN } from '$env/static/public';

import { dev } from '$app/environment';
import { components, isPreview } from '$lib/storyblok';

import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url }) => {
	storyblokInit({
		accessToken: PUBLIC_STORYBLOK_ACCESS_TOKEN,
		use: [apiPlugin],
		components,
		apiOptions: {
			https: true,
			region: 'us'
		}
	});
	let storyblokApi = await useStoryblokApi();

	const settingsStory = await storyblokApi.get('cdn/stories/settings/', {
		version: dev || isPreview(url) ? 'draft' : 'published'
	});

	return {
		storyblokApi: storyblokApi,
		pathname: url.pathname,
		preview: isPreview(url),
		settings: settingsStory.data.story,
	};
};
