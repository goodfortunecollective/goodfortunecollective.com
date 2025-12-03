<script lang="ts">
	import { isTransitioningIn, project_list_hover } from '$lib/stores';
	import { ProjectTitle } from '$lib/components';

	let list_hover: string | null = null;

	$: title = list_hover;

	project_list_hover.subscribe((value) => {
		list_hover = value;
	});
</script>

{#key title}
	{#if !!list_hover || $isTransitioningIn}
		<div
			class="pointer-events-none fixed inset-0 z-1 flex h-full w-screen items-center text-center"
		>
			<div class="mx-auto grid -translate-y-1/2 grid-cols-12 pt-16 lg:-translate-y-1/4">
				<div
					class="col-span-12 col-start-1 mx-4 md:col-span-10 md:col-start-2 md:mx-0 2xl:col-span-8 2xl:col-start-3"
				>
					<ProjectTitle type="hover" animated={true} name={title} />
				</div>
			</div>
		</div>
	{/if}
{/key}
