<script>
	import { Flex } from '$lib/components/layout';
	import { Heading } from '$lib/components/typography';
</script>

<svelte:head>
	<title>Contact</title>
	<meta name="description" content="Contact" />
</svelte:head>

<section class="pt-[var(--header-height)] pb-32">
	<div class="mx-auto max-w-6xl">
		<Flex class="pt-16 items-end">
			<Heading as="h2" size="h1" class="w-1/2">Headline Statement</Heading>
			<p class="text-xl flex-1">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac feugiat nisl, a
				cursus orci. Pellentesque sollicitudin feugiat ipsum, eget venenatis urna mollis ac.
			</p>
		</Flex>
		<Flex class="px-24 pt-32">
			<Heading as="h2" size="h5" class="uppercase font-bold tracking-widest w-1/2">Email</Heading>
			<p class="text-2xl flex-1">Want to say hi?</p>
		</Flex>
		<Flex class="px-24 pt-32">
			<Heading as="h2" size="h5" class="uppercase font-bold tracking-widest w-1/2">Openings</Heading
			>
			<p class="text-lg flex-1">CTA copy to check out openings on careers page</p>
		</Flex>
		<Flex class="px-24 pt-32">
			<Heading as="h2" size="h5" class="uppercase font-bold tracking-widest w-1/2">Address</Heading>
			<p class="text-lg flex-1">
				<strong>1387 Venables Street</strong><br />Vancouver, BC<br />Canada<br />V5L 2G1
			</p>
		</Flex>
		<Flex class="px-24 pt-32">
			<Heading as="h2" size="h5" class="uppercase font-bold tracking-widest w-1/2">Phone</Heading>
			<p class="text-lg flex-1">(604) 345-7363</p>
		</Flex>
		<Flex class="px-24 pt-32">
			<Heading as="h2" size="h5" class="uppercase font-bold tracking-widest w-1/2">Social</Heading>
			<p class="text-lg flex-1">...</p>
		</Flex>
		<Flex class="px-24 pt-32">
			<Heading as="h2" size="h5" class="uppercase font-bold tracking-widest w-1/2"
				>Acknowledgement</Heading
			>
			<p class="text-lg flex-1">
				GFC acknowledges that rwe work and play on the unceded traditional territories of the
				<strong>xʷməθkʷəy̓əm</strong> (Musqueam), <strong>Sḵwx̱wú7mesh</strong> (Squamish), and
				<strong>səlilwətaɬ</strong>
				(Tsleil-Waututh) Nations.
			</p>
		</Flex>
	</div>
</section>
