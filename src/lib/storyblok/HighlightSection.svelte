<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';
	import { inview } from 'svelte-inview';

	import { base } from '$app/paths';
	import { Heading, Spacer } from '$lib/components';
	import { cls } from '$lib/styles';
	import { backgroundTheme, cursorType } from '$lib/stores';
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

	const onEnter = () => {
		cursorType.set('checkout');
	};

	const onLeave = () => {
		cursorType.set('none');
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
		<div class="relative col-span-10 col-start-4">
			<div class="absolute left-0 top-0">
				<div class="-translate-x-14 -translate-y-14 scale-110">
					<img src={`${base}/assets/GFC-lockup.png`} alt="" class="animate-spin-slow" />
				</div>
			</div>
			<video
				preload="metadata"
				class="aspect-video w-full rounded-s-3xl"
				bind:this={videoPlayer}
				playsinline
				autoplay={false}
				loop={true}
				muted={true}
			>
				<source src={blok.video} type="video/mp4" />
				<track kind="captions" />
			</video>
		</div>
		<div class=" col-span-10 col-start-2">
			<div class=" max-w-[600px] -translate-y-44">
				<Heading as="h2" size="h2">
					{blok.title}<span class="text-white">{blok.highlight}</span>
				</Heading>
			</div>
			<Spacer gap="extra-large" />
			<a href={blok.link.cached_url} on:mouseenter={onEnter} on:mouseleave={onLeave}>
				<Heading size="h2" as="h4" underline class="-translate-y-44 text-rose-50 underline">
					{blok.label}
				</Heading>
			</a>
		</div>
	</div>
</div>
