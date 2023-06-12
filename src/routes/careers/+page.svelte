<script>
	import { Flex } from '$lib/components/layout';
	import { Heading } from '$lib/components/typography';
</script>

<svelte:head>
	<title>Careers</title>
	<meta name="description" content="Careers" />
</svelte:head>

<section class="pt-[var(--header-height)] pb-32 h-screen bg-gray-200">
	<div class="mx-auto max-w-6xl">
		<Flex class="pt-16 items-end">
			<Heading as="h2" size="h1" class="w-1/2">Headline Statement</Heading>
			<p class="text-xl flex-1">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac feugiat nisl, a
				cursus orci. Pellentesque sollicitudin feugiat ipsum, eget venenatis urna mollis ac.
			</p>
		</Flex>
	</div>
</section>
