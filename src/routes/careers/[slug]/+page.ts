import { dev } from '$app/environment';


export async function load({ params, parent }) {
    const { storyblokApi } = await parent();

    const dataStory = await storyblokApi.get('cdn/stories', {
        version: dev ? "draft" : "published",
        starts_with: 'jobs',
        by_slugs: '*/' + params.slug,
    });

    return {
        story: dataStory.data.stories[0],
    };
}

