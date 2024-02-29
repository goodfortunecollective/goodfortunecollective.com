<script lang="ts">
	import { cva } from 'class-variance-authority';
	import { inview } from 'svelte-inview';

	import { TextTransition } from '$lib/components';
	import { cls } from '$lib/styles';

	export let as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h1';
	export let size: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h1';
	export let leading: 'normal' | 'extra-tight' | 'tightest' = 'normal';
	export let animated: boolean = true;
	export let underline: boolean = false;

	const variants = cva('w-full', {
		variants: {
			size: {
				h1: 'font-degular-display text-stone-450',
				h2: 'font-degular-display text-5xl lg:text-7xl 3xl:text-8xl 4xl:text-10xl',
				h3: 'text-3xl md:text-4xl 3xl:text-5xl 4xl:text-6xl font-degular-display',
				h4: 'text-3xl 3xl:text-4xl 4xl:text-5xl font-bold',
				h5: 'text-2xl 3xl:text-3xl 4xl:text-4xl font-bold',
				h6: 'text-xl md:text-sm lg:text-xl 3xl:text-2xl 4xl:text-3xl font-bold'
			},
			leading: {
				normal: '',
				'extra-tight': 'leading-extra-tight lg:leading-extra-tight',
				tightest: 'leading-tightest lg:leading-tightest'
			}
		},
		defaultVariants: {
			size: 'h1',
			leading: 'normal'
		}
	});
</script>

<svelte:element
	this={as}
	use:inview
	{...$$restProps}
	class={cls(variants({ size, leading }), size === 'h1' && 'c-heading__h1', $$props.class)}
>
	<TextTransition enabled={animated} {underline} speed={size !== 'h1' && size !== 'h2' ? 1 : 1.25}>
		<slot />
	</TextTransition>
</svelte:element>

<!--
    @component Heading
    ## Props
    @prop as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h1';
    @prop size: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h1';
    ## Example
    ```
    <script>
      import {  Heading  } from '$lib/components'
    </script>

    <div  class="text-center">
      <Heading as="h2" size="h1" class="mb-4">We invest in the world’s potential</Heading>
     </div>
    ```
  -->

<style lang="scss">
	.c-heading__h1 {
		// text-shadow: -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white;
		font-size: clamp(64px, calc(80px + (180 - 80) * (100vw - 768px) / (1920 - 768)), 175px);

		//font-size: clamp(16px, calc(20px + (36 - 20) * (100vw - 768px) / (1920 - 768)), 48px);

		// This text has a font size of 20px at viewport width of 768px
		// font size of 36px when viewport width is 1920px.
		// But if the viewport width is less than 768px,
		// the font-size won't get lower than 16px
		// the viewport width is more than 1920px font size will stop scaling at 48px.
	}
</style>
