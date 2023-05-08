<script>
	import { onMount } from 'svelte';
	import { createDarkStore, cssDarkModePreference } from '$lib/styles';

	import gsap from 'gsap';
	import ScrollTrigger from '$lib/gsap/ScrollTrigger';
	import ScrollSmoother from '$lib/gsap/ScrollSmoother';

	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import '../app.css';

	let darkModeStore = createDarkStore();
	$: darkMode = $darkModeStore ?? cssDarkModePreference();

	$: if (typeof document !== 'undefined') {
		if (darkMode) {
			document.body.classList.add('dark');
		} else {
			document.body.classList.remove('dark');
		}
	}

	onMount(() => {
		gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
	});
</script>

<div>
	<div id="smooth-wrapper">
		<div id="smooth-content">
			<div class="flex flex-col">
				<Header />
				<main class="flex mx-auto flex-1 flex-col p-4 w-full max-w-5xl box-border">
					<slot />
				</main>
				<Footer />
			</div>
		</div>
	</div>
</div>

<style>
</style>
