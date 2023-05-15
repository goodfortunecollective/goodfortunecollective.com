

import { apiPlugin, storyblokInit, useStoryblokApi } from "@storyblok/svelte";
import { STORYBLOK_ACCESS_TOKEN } from '$lib/env-vars'
import Feature from "$lib/components/Feature.svelte";
import Grid from "$lib/components/Grid.svelte";
import Page from "$lib/components/Page.svelte";
import Teaser from "$lib/components/Teaser.svelte";

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
        accessToken: STORYBLOK_ACCESS_TOKEN,
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