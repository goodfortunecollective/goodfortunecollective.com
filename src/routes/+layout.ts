

import { apiPlugin, storyblokInit, useStoryblokApi } from "@storyblok/svelte";
import { PUBLIC_STORYBLOK_ACCESS_TOKEN } from '$env/static/public'
import Feature from "$lib/components/Feature.svelte";
import Grid from "$lib/components/Grid.svelte";
import Page from "$lib/components/Page.svelte";
import Teaser from "$lib/components/Teaser.svelte";

export const prerender = true;

let callbackComponents = () => {
    return {
        feature: Feature,
        grid: Grid,
        page: Page,
        teaser: Teaser,
    };
};


export async function load() {
    storyblokInit({
        accessToken: PUBLIC_STORYBLOK_ACCESS_TOKEN,
        use: [apiPlugin],
        components: callbackComponents,
        apiOptions: {
            https: true,
            region: "us",
        },
    });
    let storyblokApi = await useStoryblokApi();

    return {
        storyblokApi: storyblokApi,
    };
}