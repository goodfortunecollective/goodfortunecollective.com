<script lang="ts">
	import { project_list_hover } from '$lib/stores';
	import { Heading } from '$lib/components/';

	let list_hover: string[] = [];

	project_list_hover.subscribe((value) => {
		list_hover = value;
	});
</script>

{#if list_hover.length > 0}
	<div class="fixed top-0 left-0 w-screen h-screen pointer-events-none z-50">
		<div class="grid grid-cols-12 h-full">
			<div class="col-start-2 col-span-10 h-full flex items-center">
				<Heading size="h1" as="h2">{list_hover[0]}</Heading>
			</div>
		</div>
	</div>
{/if}
