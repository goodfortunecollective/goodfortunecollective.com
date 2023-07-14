import { apiPlugin, storyblokInit, useStoryblokApi } from '@storyblok/svelte';
import { PUBLIC_STORYBLOK_ACCESS_TOKEN } from '$env/static/public';

import type { LayoutLoad } from './$types';

import { components } from '$lib/storyblok';

export const load: LayoutLoad = async ({ url: { pathname } }) => {
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
		pathname: pathname
	};
};
