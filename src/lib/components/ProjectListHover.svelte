<script lang="ts">
	import { cubicOut } from 'svelte/easing';

	import { project_list_hover } from '$lib/stores';
	import { slide } from '$lib/transitions';
	import { Heading } from '$lib/components';

	let list_hover: string | null = null;

	$: title = list_hover;

	project_list_hover.subscribe((value) => {
		list_hover = value;
	});
</script>

{#key title}
	{#if !!list_hover}
		<div class="pointer-events-none fixed inset-0 z-1 flex h-full w-full items-center text-center">
			<div class="mx-auto grid grid-cols-12 pt-16">
				<div class="col-span-10 col-start-2">
					<Heading
						as="h1"
						size="h1"
						class="leading-extra-tight lg:leading-extra-tight"
						animated={false}
					>
						{title}
					</Heading>
				</div>
			</div>
		</div>
	{/if}
{/key}

<style lang="scss">
	.ProjectListHover {
		&-title {
			color: #f7f6f3;
			transition:
				0.5s color ease-out,
				0s visibility 0.5s,
				0s z-index 0.5s;
			transition-delay: 0.5s;
		}
	}
	:global(.work) {
		.ProjectListHover {
			&-title {
				color: black;
			}
		}
	}
</style>
