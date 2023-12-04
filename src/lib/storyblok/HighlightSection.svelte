<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';
	import { inview } from 'svelte-inview';

	import { Heading, Spacer } from '$lib/components';
	import { cls } from '$lib/styles';
	import { backgroundTheme } from '$lib/stores';
	import { inViewColorTransition } from '$lib/utils/animations';

	export let blok: any;

	let videoPlayer!: HTMLVideoElement;

	const textStyle = cva('duration-1000 ease-out', {
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

	const inViewPlayer = ({ detail }: CustomEvent<ObserverEventDetails>) => {
		const { inView } = detail as ObserverEventDetails;

		if (inView) {
			videoPlayer.play();
		} else {
			videoPlayer.pause();
		}
	};
</script>

<div use:inview on:inview_change={inViewPlayer}>
	<div
		use:storyblokEditable={blok}
		{...$$restProps}
		use:inview
		on:inview_change={inViewColorTransition}
		class={cls('relative grid grid-cols-12', blok.class, textStyle({ theme: $backgroundTheme }))}
	>
		<div class="col-span-10 col-start-3">
			<video
				preload="metadata"
				class="aspect-video w-full"
				bind:this={videoPlayer}
				src={blok.video}
				autoplay={true}
				loop={true}
				muted={true}
			>
				<track kind="captions" />
			</video>
		</div>
		<div class=" col-span-10 col-start-2">
			<div class=" max-w-[600px] -translate-y-28">
				<Heading as="h2" size="h2">
					{blok.title}<span class="text-white">{blok.highlight}</span>
				</Heading>
				<Spacer gap="extra-large" />
				<a href={blok.link.cached_url}>
					<Heading size="h2" underline as="h4" class="text-rose-50 underline">
						{blok.label}
					</Heading>
				</a>
			</div>
		</div>
	</div>
</div>
