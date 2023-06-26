import { dev } from '$app/environment';

export async function load({ parent }) {
    const { storyblokApi } = await parent();

    const jobs = await storyblokApi.get('cdn/stories', {
        version: dev ? "draft" : "published",
        starts_with: 'jobs',
    });

    const dataStory = await storyblokApi.get("cdn/stories/careers/", {
        version: dev ? "draft" : "published",
    });

    return {
        jobs: jobs.data.stories,
        story: dataStory.data.story,
    };
}

