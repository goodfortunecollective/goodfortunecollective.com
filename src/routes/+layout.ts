

import { apiPlugin, storyblokInit, useStoryblokApi } from "@storyblok/svelte";
import { PUBLIC_STORYBLOK_ACCESS_TOKEN } from '$env/static/public'

import type { LayoutLoad } from "./$types";

import { Flex, Heading, Page } from "$lib/storyblok";

export const prerender = true;

let callbackComponents = () => {
    return {
        flex: Flex,
        heading: Heading,
        page: Page,
    };
};


export const load: LayoutLoad = async ({ url: { pathname } }) => {
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
        pathname: pathname,
    };
}