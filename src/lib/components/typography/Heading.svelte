<script lang="ts">
	import { cls } from '$lib/styles';

	export let as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h1';
	export let size: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h1';

	const textSizes = {
		h1: 'text-5xl',
		h2: 'text-4xl',
		h3: 'text-3xl',
		h4: 'text-2xl',
		h5: 'text-xl',
		h6: 'text-lg'
	};
</script>

<svelte:element
	this={as}
	{...$$restProps}
	class={cls(textSizes[size], 'w-full font-degular-display', $$props.class)}
>
	<slot />
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
