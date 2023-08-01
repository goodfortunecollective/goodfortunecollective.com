import { apiPlugin, storyblokInit, useStoryblokApi } from '@storyblok/svelte';
import { PUBLIC_STORYBLOK_ACCESS_TOKEN } from '$env/static/public';

import type { LayoutLoad } from './$types';

import { components, isPreview } from '$lib/storyblok';

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

	return {
		storyblokApi: storyblokApi,
		pathname: url.pathname,
		preview: isPreview(url),
	};
};
