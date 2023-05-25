<script lang="ts">
	import PageTransition from '$lib/components/PageTransition.svelte';
	import type { LayoutServerData } from './$types';

	import Loader from './Loader.svelte';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';

	import '../app.css';

	export let data: LayoutServerData;
</script>

<Header />
<div id="smooth-wrapper">
	<div id="smooth-content" class=" ">
		<main class="flex mx-auto flex-1 flex-col p-4 w-full max-w-5xl box-border">
			<PageTransition pathname={data.pathname}>
				<div class="pt-[var(--header-height)]">
					<slot />
				</div>
			</PageTransition>
			<Footer />
		</main>
	</div>
</div>
<Loader />

<style>
</style>
