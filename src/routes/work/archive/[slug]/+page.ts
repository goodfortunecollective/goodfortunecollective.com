import { dev } from '$app/environment';
import { isPreview } from '$lib/storyblok';

export async function load({ parent, params, url }) {
	const { storyblokApi } = await parent();

	const dataStory = await storyblokApi.get('cdn/stories', {
		version: dev || isPreview(url) ? 'draft' : 'published',
		starts_with: 'projects/archive',
		by_slugs: '*/' + params.slug
	});

	return {
		story: dataStory.data.stories[0]
	};
}
