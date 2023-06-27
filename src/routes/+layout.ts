

import { apiPlugin, storyblokInit, useStoryblokApi } from "@storyblok/svelte";
import { PUBLIC_STORYBLOK_ACCESS_TOKEN } from '$env/static/public'

import type { LayoutLoad } from "./$types";

import { AlternateListBlock, FiguresBlock, VideoBlock, ImagesBlock, Flex, Heading, Page, Heading_Richtext_2Col, Text } from "$lib/storyblok";

export const prerender = true;

let callbackComponents = () => {
    return {
        'alternate-list-block': AlternateListBlock,
        'figures-block': FiguresBlock,
        'video-block': VideoBlock,
				'images-block':ImagesBlock,
        flex: Flex,
        heading: Heading,
        'heading-richtext-2col': Heading_Richtext_2Col,
        page: Page,
        text: Text
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
