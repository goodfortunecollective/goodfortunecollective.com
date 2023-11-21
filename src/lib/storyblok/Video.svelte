<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';

	import { Video } from '$lib/components';

	export let blok: any;
</script>

<div use:storyblokEditable={blok}>
	<Video
		{...$$restProps}
		name={blok.id}
		videoID={blok.id}
		videoUrl={blok.file}
		posterUrl={blok.poster?.filename ? blok.poster.filename : `https://vumbnail.com/${blok.id}.jpg`}
		loop={blok.loop}
		muted={blok.muted}
		autoplay={blok.autoplay}
		animated={blok.animated}
		class={blok.class}
	/>
</div>
