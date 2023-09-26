<script lang="ts">
	import { TextTransition } from '$lib/components';
	import { cls } from '$lib/styles';

	export let as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h1';
	export let size: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h1';
	export let animated: boolean = true;

	const textSizes = {
		h1: 'text-6xl md:text-8xl lg:text-9xl xl:text-10xl 4xl:text-10xl',
		h2: 'text-5xl lg:text-8xl',
		h3: 'text-4xl 3xl:text-5xl 4xl:text-6xl',
		h4: 'text-3xl 3xl:text-4xl 4xl:text-5xl',
		h5: 'text-2xl 3xl:text-3xl 4xl:text-4xl',
		h6: 'text-xl md:text-sm lg:text-xl 3xl:text-2xl 4xl:text-3xl'
	};
</script>

<svelte:element
	this={as}
	{...$$restProps}
	class={cls(textSizes[size], 'w-full font-degular-display', $$props.class)}
>
	<TextTransition type="heading" enabled={animated}>
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
