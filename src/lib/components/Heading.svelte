<script lang="ts">
	import { cva } from 'class-variance-authority';

	import { TextTransition } from '$lib/components';
	import { cls } from '$lib/styles';

	export let as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h1';
	export let size: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h1';
	export let animated: boolean = true;
	export let underline: boolean = false;

	const variants = cva('w-full', {
		variants: {
			size: {
				h1: 'text-6xl md:text-8xl lg:text-9xl xl:text-10xl 4xl:text-10xl leading-10 font-degular-display text-yellow-50',
				h2: 'text-5xl lg:text-8xl font-degular-display',
				h3: 'text-4xl 3xl:text-5xl 4xl:text-6xl font-degular-display',
				h4: 'text-3xl 3xl:text-4xl 4xl:text-5xl font-bold',
				h5: 'text-2xl 3xl:text-3xl 4xl:text-4xl font-bold',
				h6: 'text-xl md:text-sm lg:text-xl 3xl:text-2xl 4xl:text-3xl font-bold'
			}
		},
		defaultVariants: {
			size: 'h1'
		}
	});
</script>

<svelte:element this={as} {...$$restProps} class={cls(variants({ size }), $$props.class)}>
	<TextTransition enabled={animated} {underline}>
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
