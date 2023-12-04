<script lang="ts">
	import { inview } from 'svelte-inview';
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { Heading } from '$lib/components';
	import { cls } from '$lib/styles';
	import { backgroundTheme } from '$lib/stores';
	import { inViewColorTransition } from '$lib/utils/animations';

	export let blok: any;

	const variants = cva('duration-1000 ease-out', {
		variants: {
			theme: {
				light: '',
				dark: 'text-yellow-50'
			}
		},
		defaultVariants: {
			theme: 'light'
		}
	});
</script>

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	use:inview
	on:inview_change={inViewColorTransition}
	class={cls(blok.class, variants({ theme: $backgroundTheme }))}
>
	<div class="grid grid-cols-12 gap-8 pb-8 pt-16 lg:gap-0">
		<div
			class={cls(
				'col-span-10 col-start-2 lg:col-start-2 ',
				blok.titleFullWidth ? 'lg:col-span-8' : 'lg:col-span-4'
			)}
		>
			<Heading
				as="h2"
				animated={blok.animated}
				size={blok.titleSize}
				class="leading-extra-tight lg:leading-extra-tight"
			>
				{blok.title}
			</Heading>
			{#if blok.links.length}
				<div class="mt-8 hidden lg:block">
					{#each blok.links as b}
						<StoryblokComponent blok={b} />
					{/each}
				</div>
			{/if}
		</div>
		<div class="col-span-10 col-start-2 md:col-start-6 lg:col-span-5 lg:col-start-6">
			<div class="flex flex-col gap-8 text-3xl leading-10">
				{#each blok.content as b}
					<StoryblokComponent blok={b} />
				{/each}
			</div>
		</div>
		{#if blok.links.length}
			<div class="lg:hidden">
				{#each blok.links as b}
					<StoryblokComponent blok={b} />
				{/each}
			</div>
		{/if}
	</div>
</div>
