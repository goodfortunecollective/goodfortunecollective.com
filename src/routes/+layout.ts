

import { apiPlugin, storyblokInit, useStoryblokApi } from "@storyblok/svelte";
import { PUBLIC_STORYBLOK_ACCESS_TOKEN } from '$env/static/public'

// import cloneDeep from "clone-deep";
// const mySchema = cloneDeep(RichTextSchema); // you can make a copy of the default RichTextSchema
// ... and edit the nodes and marks, or add your own.
// Check the base RichTextSchema source here https://github.com/storyblok/storyblok-js-client/blob/master/source/schema.js

import type { LayoutLoad } from "./$types";

import { components } from "$lib/storyblok";

export const prerender = true;

export const load: LayoutLoad = async ({ url: { pathname } }) => {
    storyblokInit({
        accessToken: PUBLIC_STORYBLOK_ACCESS_TOKEN,
        use: [apiPlugin],
        components,
        apiOptions: {
            https: true,
            region: "us",
        },
				// richText: {
				// 	schema: mySchema,
				// 	resolver: (component, blok) => {
				// 		switch (component) {
				// 			case "my-custom-component":
				// 				return `<div class="my-component-class">${blok.text}</div>`;
				// 			default:
				// 				return "Resolver not defined";
				// 		}
				// 	},
				// },
    });
    let storyblokApi = await useStoryblokApi();

    return {
        storyblokApi: storyblokApi,
        pathname: pathname,
    };
}
