import { dev } from '$app/environment';

export async function load({ parent }) {
    const { storyblokApi } = await parent();

    const dataStory = await storyblokApi.get('cdn/stories', {
        version: dev ? "draft" : "published",
        starts_with: 'projects',
    });

    return {
        stories: dataStory.data.stories,
    };
}

