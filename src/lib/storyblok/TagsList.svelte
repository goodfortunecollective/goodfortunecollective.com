<script lang="ts">
	import { StoryblokComponent, storyblokEditable } from '@storyblok/svelte';

	import gsap from '$lib/gsap';
	import { useTransitionReady } from '$lib/utils/useTransitionReady';

	export let blok: any;

	useTransitionReady(() => {
		gsap.utils.toArray<HTMLElement>('[data-gsap="tags-list"]').forEach((parent, index) => {
			const container: HTMLElement | null = parent.querySelector('ul');

			if (container) {
				const [x, xEnd] =
					index % 2
						? ['100%', (container.scrollWidth - parent.offsetWidth) * -1]
						: [container.scrollWidth * -1, 0];

				gsap.fromTo(
					container,
					{ x },
					{
						x: xEnd,
						scrollTrigger: {
							trigger: parent,
							scrub: 0.5
						}
					}
				);
			}
		});
	});
</script>

<div use:storyblokEditable={blok} class={blok.class}>
	<div class="flex flex-col gap-8">
		{#each Array(4) as _, index (index)}
			<div data-gsap="tags-list" class="border-b-2 border-b-gray-200 last-of-type:border-0">
				<ul class="whitespace-nowrap">
					{#each blok.tags as b}
						<li class="inline-block mr-24 mb-8">
							<span class="text-7xl uppercase">
								<StoryblokComponent blok={b} />
							</span>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</div>
