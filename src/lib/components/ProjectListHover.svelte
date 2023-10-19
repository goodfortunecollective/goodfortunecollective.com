<script lang="ts">
	import { cubicIn, cubicOut } from 'svelte/easing';

	//import { beforeNavigate, afterNavigate } from '$app/navigation';
	import { project_list_hover } from '$lib/stores';

	import { slide } from '$lib/transitions';

	let list_hover: string | null = null;

	$: title = list_hover;

	project_list_hover.subscribe((value) => {
		list_hover = value;
	});

	// afterNavigate(() => {
	// 	project_list_hover.set(null);
	// });
</script>

{#key title}
	{#if !!list_hover}
		<div
			class="z-1 pointer-events-none fixed left-0 top-0 grid h-screen w-screen grid-cols-12 items-center font-degular-display text-6xl md:text-8xl lg:text-9xl xl:text-10xl 4xl:text-10xl"
		>
			<span class="ProjectListHover-title relative col-span-10 col-start-2 block h-48 text-center">
				<span
					in:slide|global={{
						duration: 500,
						direction: 'bottom',
						easing: cubicOut
					}}
					out:slide|global={{ duration: 500, direction: 'top', easing: cubicOut }}
					class="absolute block w-full"
				>
					{title}
				</span>
			</span>
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
