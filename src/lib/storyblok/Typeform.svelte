<script lang="ts">
	import { onMount } from 'svelte';
	import * as typeformEmbed from '@typeform/embed';
	import { storyblokEditable } from '@storyblok/svelte';

	import '@typeform/embed/build/css/popup.css';

	import { cls } from '$lib/styles';

	export let blok: any;

	let typeformPopup: any;

	onMount(() => {
		typeformPopup = typeformEmbed.createPopup(blok.id, {
			mode: 'popup', // popup mode
			autoOpen: false, // do not open automatically
			hideHeaders: true, // hide headers
			hideFooters: true, // hide footers
			autoClose: 3 // close after 3 seconds
		});
	});

	const openTypeform = () => {
		if (typeformPopup) {
			typeformPopup.open();
		}
	};
</script>

<div use:storyblokEditable={blok}>
	<button
		class={cls(
			'typeform-button',
			'mb-1 mr-1 rounded-full border border-solid border-red-100 bg-transparent px-8 py-3 font-bold uppercase text-red-50 outline-none transition-all duration-150 ease-linear hover:bg-red-100 hover:text-black focus:outline-none active:bg-red-200'
		)}
		on:click={openTypeform}
		type="button">{blok.label}</button
	>
</div>
