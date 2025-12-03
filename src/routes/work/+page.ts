import { dev } from '$app/environment';
import { isPreview } from '$lib/storyblok';

export async function load({ parent, url }) {
	const { storyblokApi } = await parent();

	const dataStory = await storyblokApi.get('cdn/stories/work/', {
		version: dev || isPreview(url) ? 'draft' : 'published'
	});

	const projects = await storyblokApi.get('cdn/stories', {
		version: dev || isPreview(url) ? 'draft' : 'published',
		starts_with: 'projects'
	});

	const categories = await storyblokApi.get('cdn/datasource_entries', {
		datasource: 'project-categories'
	});

	return {
		story: dataStory.data.story,
		projects: projects.data.stories.filter(
			(project: any) => !project.full_slug.includes('projects/archive/')
		),
		archive: projects.data.stories.filter((project: any) =>
			project.full_slug.includes('projects/archive/')
		),
		categories: categories
	};
}
