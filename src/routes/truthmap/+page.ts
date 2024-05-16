import { dev } from '$app/environment';
import { isPreview } from '$lib/storyblok';

export async function load({ parent, url }) {
	const { storyblokApi } = await parent();

	const dataStory = await storyblokApi.get('cdn/stories/truthmap/', {
		version: dev || isPreview(url) ? 'draft' : 'published'
	});

	return {
		story: dataStory.data.story
	};
}
