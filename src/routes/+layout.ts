import { apiPlugin, storyblokInit, useStoryblokApi } from '@storyblok/svelte';

import { env as publicEnv } from '$env/dynamic/public';

import { dev } from '$app/environment';
import { components, isPreview } from '$lib/storyblok';

import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url }) => {
	const accessToken = publicEnv.PUBLIC_STORYBLOK_ACCESS_TOKEN ?? '';

	storyblokInit({
		// Dynamic env allows builds to succeed even when the token isn't injected (e.g., CI).
		accessToken,
		use: [apiPlugin],
		components,
		apiOptions: {
			https: true,
			region: 'us'
		}
	});
	let storyblokApi = await useStoryblokApi();

	const settingsStory = await storyblokApi.get('cdn/stories/settings/', {
		version: dev || isPreview(url) ? 'draft' : 'published',
		resolve_relations: ['header.navigation']
	});

	return {
		storyblokApi: storyblokApi,
		pathname: url.pathname,
		preview: isPreview(url),
		settings: settingsStory.data.story
	};
};
