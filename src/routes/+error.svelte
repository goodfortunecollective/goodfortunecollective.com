<script>
	import { cva } from 'class-variance-authority';
	import { base } from '$app/paths';

	import { BackgroundTheme, Heading, TextTransition, Spacer } from '$lib/components';
	import { cls } from '$lib/styles';

	import { backgroundTheme } from '$lib/stores';

	const variants = cva('duration-1000 ease-out', {
		variants: {
			theme: {
				light: '',
				dark: 'text-white'
			}
		},
		defaultVariants: {
			theme: 'light'
		}
	});
</script>

<BackgroundTheme preload tartColor="#1a1a1a" endColor="#1a1a1a" startTheme="dark" endTheme="dark" />
<section
	class={cls('relative grid grid-cols-12 pt-24 3xl:pt-32 ', variants({ theme: $backgroundTheme }))}
>
	<div class="col-span-10 col-start-2 flex h-full flex-col items-center text-center">
		<h1
			class={cls('my-0 py-0 font-degular-display leading-none text-transparent', 'b-error__title')}
		>
			<TextTransition enabled={false}>
				<span class="relative z-1 inline-block">4</span>
				<span class="relative -z-1 inline-block">
					<img
						src={`${base}/assets/GFC-error.webp`}
						class="aspect-ratio:500/376 absolute inset-0 top-[57.5%] -z-1 inline-block w-full -translate-y-1/2 scale-175"
						alt=""
					/>
					<span>0</span>
				</span>
				<span class="relative z-1 inline-block">4</span>
			</TextTransition>
		</h1>
		<div class="max-w-sm 2xl:max-w-md 4xl:max-w-xl">
			<h2 class="font-degular-display text-5xl lg:text-6xl 3xl:text-7xl 4xl:text-8xl">
				<TextTransition>Damn. Sorry.</TextTransition>
			</h2>
			<Spacer gap="extra-large" />
			<p class="text-xl xl:text-2xl 4xl:text-4xl">
				Looks like that page doesn’t exist. "What does? All the reasons you should choose our
				impactful strategy-driven creative.
			</p>
			<Spacer gap="medium" />
			<a href="/about" class="font-degular-display text-xl xl:text-2xl 4xl:text-4xl">
				<TextTransition underline>See here</TextTransition>
			</a>
		</div>
	</div>
</section>

<style lang="scss">
	.b-error {
		&__title {
			-webkit-text-stroke: 1px white;
			// text-shadow: -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white;
			font-size: clamp(64px, calc(200px + (360 - 200) * (100vw - 768px) / (1920 - 768)), 540px);

			//font-size: clamp(16px, calc(60px + (36 - 20) * (100vw - 768px) / (1920 - 768)), 48px);

			// This text has a font size of 20px at viewport width of 768px
			// font size of 36px when viewport width is 1920px.
			// But if the viewport width is less than 768px,
			// the font-size won't get lower than 16px
			// the viewport width is more than 1920px font size will stop scaling at 48px.
		}
	}
</style>
