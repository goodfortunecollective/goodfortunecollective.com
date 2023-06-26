<script lang="ts">
	import { cls } from '$lib/styles';
	import Flex from './Flex.svelte';
	import { Heading } from '$lib/components/typography';
	export let title = 'Title';
	export let titleSide: 'left' | 'right' = 'left';
	// console.log("AlternateListBlock");
	export let items = [
		'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Aenean lacinia bibendum nulla sed consectetur. Nullam id dolor id nibh ultricies vehicula ut id elit. Nulla vitae elit libero, a pharetra augue.',
		'Sed posuere consectetur est at lobortis. Donec id elit non mi porta gravida at eget metus. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Sed posuere consectetur est at lobortis. Sed posuere consectetur est at lobortis. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.',
		'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Aenean lacinia bibendum nulla sed consectetur. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Donec id elit non mi porta gravida at eget metus. Donec sed odio dui. Maecenas sed diam eget risus varius blandit sit amet non magna. Sed posuere consectetur est at lobortis.',
		'Sed posuere consectetur est at lobortis. Donec id elit non mi porta gravida at eget metus. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Sed posuere consectetur est at lobortis. Sed posuere consectetur est at lobortis. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.',]
</script>

<div class="list-block">

	{#if titleSide === 'left'}
	<Heading as="h2">{ title }</Heading>
	{/if}

	<div class="list container">
		{#each items as item, i}
		<Flex class="list-item">
			<div class="list-item-number">{#if i <= 10}0{/if}{ i+1 }</div>
			<div class="list-item-text">
				<p>{ item }</p>
			</div>
		</Flex>
		{#if titleSide === 'right' && i == 0}
		<Heading as="h3">{ title }</Heading>
		{/if}
		{/each}
	</div>

	<!-- <slot /> -->

</div>

<style>
	.list-item{
		display: flex;
	}
</style>

