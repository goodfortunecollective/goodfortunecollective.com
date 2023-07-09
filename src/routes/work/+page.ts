import { dev } from '$app/environment';

export async function load({ parent }) {
    const { storyblokApi } = await parent();

    const dataStory = await storyblokApi.get('cdn/stories', {
        version: dev ? "draft" : "published",
        starts_with: 'projects',
    });

    const categories = await storyblokApi.get('cdn/datasource_entries', {
        datasource: 'project-categories'
    });

    return {
        stories: dataStory.data.stories,
        categories: categories,
    };
}

