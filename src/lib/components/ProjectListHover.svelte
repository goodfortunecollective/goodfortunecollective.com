<script lang="ts">
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';

	import { gsap } from '$lib/gsap';
	import { project_list_hover } from '$lib/stores';

	import { slide } from '$lib/transitions';

	let titleEl!: HTMLElement;
	let list_hover: string[] = [];
	let locked = false;

	$: title = list_hover[0] || '';

	project_list_hover.subscribe((value) => {
		if (!locked) {
			if (value.length > 0 && value[0] !== list_hover[0]) {
				list_hover = value;
			}
		}
	});

	beforeNavigate(() => {
		if (list_hover.length > 0) {
			locked = true;
		}
	});

	afterNavigate(() => {
		if (list_hover.length > 0 && $page.url.pathname.includes('/work')) {
			gsap.to(titleEl, {
				startColor: '#000',
				endColor: '#fff',
				duration: 0.2,
				onComplete: () => {
					setTimeout(() => {
						locked = false;
						project_list_hover.set([]);
					}, 2000);
				}
			});
		} else {
			project_list_hover.set([]);
		}
	});
</script>

{#if list_hover.length > 0}
	<div class="fixed top-0 left-0 w-screen h-screen pointer-events-none z-50">
		<section class="pt-[var(--header-height)]">
			<div class="grid grid-cols-12 pt-16 pb-16">
				<div class="col-start-2 col-span-8 lg:col-start-2 lg:col-span-6">
					<div class="grid grid-cols-12 gap-8 lg:gap-0">
						<div class="opacity-0 col-start-4 lg:col-start-4 col-span-2 lg:col-span-3">
							<h5 class="mb-2 text-sm font-bold tracking-wide uppercase">...</h5>
							<ul class="leading-loose">
								<li>...</li>
								<li>...</li>
								<li>...</li>
							</ul>
						</div>
					</div>
					<p
						class="mt-6 text-6xl md:text-7xl xl:text-8xl 4xl:text-10xl w-full font-degular-display"
						bind:this={titleEl}
					>
						<span
							class="ProjectListHover-title relative"
							style="--color: {locked ? '#fff' : '#000'};"
						>
							{#key title}
								<span
									in:slide|global={{ duration: 200, delay: 200, direction: 'bottom' }}
									out:slide|global={{ duration: 200, direction: 'top' }}
									class="inline-block"
								>
									{title}
								</span>
							{/key}
						</span>
					</p>
				</div>
			</div>
		</section>
	</div>
{/if}

<style lang="scss">
	.ProjectListHover {
		&-title {
			color: var(--color);
			transition: 0.5s color ease-out, 0s visibility 0.5s, 0s z-index 0.5s;
			transition-delay: 0.5s;
		}
	}
</style>
