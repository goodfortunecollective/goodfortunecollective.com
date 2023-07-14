import { dev } from '$app/environment';

export async function load({ parent }) {
	const { storyblokApi } = await parent();

	const dataStory = await storyblokApi.get('cdn/stories/work/', {
		version: dev ? 'draft' : 'published'
	});

	const projects = await storyblokApi.get('cdn/stories', {
		version: dev ? 'draft' : 'published',
		starts_with: 'projects'
	});

	const categories = await storyblokApi.get('cdn/datasource_entries', {
		datasource: 'project-categories'
	});

	return {
		story: dataStory.data.story,
		projects: projects.data.stories,
		categories: categories
	};
}
