<script lang="ts">
	export let src: string = '';
</script>

<div class="flex h-full w-full items-center">
	<video autoplay={true} controls class="h-auto w-full">
		<source {src} type="video/mp4" />
		<track kind="captions" srclang="en" label="Captions" />
	</video>
</div>
