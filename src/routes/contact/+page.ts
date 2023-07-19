import { dev } from '$app/environment';

export async function load({ parent }) {
	const { storyblokApi } = await parent();

	const dataStory = await storyblokApi.get('cdn/stories/contact/', {
		version: dev ? 'draft' : 'published'
	});

	return {
		story: dataStory.data.story
	};
}
