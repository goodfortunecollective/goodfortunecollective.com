<script lang="ts">
	import { page } from '$app/stores';

	import { env as publicEnv } from '$env/dynamic/public';

	const measurementId = publicEnv.PUBLIC_GOOGLE_MEASUREMENT_ID;

	const content = `
		window.dataLayer = window.dataLayer || [];
		function gtag() {
		dataLayer.push(arguments);
		}
		gtag('js', new Date());
		gtag('config', '${measurementId ?? ''}');
	`;

	$: {
		// @ts-expect-error - gtag is defined in script tag
		if (typeof gtag !== 'undefined') {
			// @ts-expect-error - gtag is defined in script tag
			// eslint-disable-next-line no-undef
			gtag('config', `${measurementId}`, {
				page_title: document.title,
				page_path: $page.url.pathname
			});
		}
	}
</script>

<svelte:head>
	{#if measurementId}
		<script async src="https://www.googletagmanager.com/gtag/js?id={measurementId}"></script>
		<svelte:element this={'script'}>
			{content}
		</svelte:element>
	{/if}
</svelte:head>
