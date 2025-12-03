import { apiPlugin, storyblokInit, type SbSDKOptions } from '@storyblok/js';

import { getComponentByName } from '$lib/storyblok';

import { env as publicEnv } from '$env/dynamic/public';

const getStoryblok = (
	apiOptions: SbSDKOptions['apiOptions'] = {},
	options: Omit<SbSDKOptions, 'apiOptions'> = {}
) => {
	const accessToken = publicEnv.PUBLIC_STORYBLOK_ACCESS_TOKEN ?? '';

	const { storyblokApi } = storyblokInit({
		// Dynamic env keeps builds from failing when PUBLIC_STORYBLOK_ACCESS_TOKEN
		// is not defined at build time (e.g., CI without public envs).
		accessToken,
		use: [apiPlugin],
		...options,
		apiOptions: {
			https: true,
			region: 'us',
			...apiOptions
		}
	});

	return storyblokApi as NonNullable<ReturnType<typeof storyblokInit>['storyblokApi']>;
};

export async function GET({ url }) {
	const storyblok = getStoryblok();

	const sbSettings = await storyblok.get('cdn/stories/settings', {
		version: 'published',
		resolve_relations: ['header.navigation']
	});

	const sbHeader = getComponentByName(sbSettings.data.story.content, 'header');

	const sbProjects = await storyblok.get('cdn/stories', {
		version: 'published',
		starts_with: 'projects'
	});

	const body = sitemap(url.origin, sbHeader.navigation, sbProjects.data.stories);
	const response = new Response(body);
	response.headers.set('Cache-Control', 'max-age=0, s-maxage=3600');
	response.headers.set('Content-Type', 'application/xml');
	return response;
}

const sitemap = (
	websiteURL: string,
	pages: any,
	projects: any
) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="https://www.w3.org/1999/xhtml"
  xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
  <url>
    <loc>${websiteURL}</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  ${pages
		.map(
			(page: any) => `
  <url>
    <loc>${websiteURL}/${page.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  `
		)
		.join('')}
  ${projects
		.map(
			(project: any) => `
  <url>
    <loc>${websiteURL}/work/${project.slug}</loc>
    <changefreq>weekly</changefreq>
    <lastmod>${project.published_at}</lastmod>
    <priority>0.7</priority>
  </url>
  `
		)
		.join('')}
</urlset>`;
