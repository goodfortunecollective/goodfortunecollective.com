<script lang="ts">
	import { cubicIn, cubicOut } from 'svelte/easing';

	import { beforeNavigate } from '$app/navigation';
	import { project_list_hover } from '$lib/stores';

	import { slide } from '$lib/transitions';

	let list_hover: string | null = null;

	$: title = list_hover;

	project_list_hover.subscribe((value) => {
		list_hover = value;
	});

	beforeNavigate(() => {
		project_list_hover.set(null)
	});
</script>


{#key title}
	{#if !!list_hover}
		<div class="fixed top-0 left-0 w-screen h-screen pointer-events-none z-1 text-6xl md:text-7xl xl:text-8xl 4xl:text-10xl font-degular-display grid grid-cols-24 items-center">
				<span
					class="ProjectListHover-title relative block col-start-3 lg:col-start-2 col-span-20 lg:col-span-22 h-48"
					style="--color: #dbd5bf;"
				>
						<span
							in:slide|global={{
								duration: 500,
								direction: 'bottom',
								easing: cubicOut
							}}
							out:slide|global={{ duration: 500, direction: 'top', easing: cubicOut }}
							class="block absolute"
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
			color: var(--color);
			transition: 0.5s color ease-out, 0s visibility 0.5s, 0s z-index 0.5s;
			transition-delay: 0.5s;
		}
	}
</style>
