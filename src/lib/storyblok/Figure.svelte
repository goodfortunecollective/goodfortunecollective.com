<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';

	import { Heading } from '$lib/components';

	export let blok: any;
</script>

<div use:storyblokEditable={blok} {...$$restProps}>
	<Heading as="h3" size="h1" leading="extra-tight">
		{blok.title}
	</Heading>
	<Heading as="h4" size="h6" class="uppercase">{blok.content}</Heading>
</div>
