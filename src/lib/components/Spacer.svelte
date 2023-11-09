<script lang="ts">
	import { cva } from 'class-variance-authority';

	export let gap: 'small' | 'medium' | 'large';

	const variants = cva('', {
		variants: {
			gap: {
				small: 'h-2',
				medium: 'h-8',
				large: 'h-16'
			}
		},
		defaultVariants: {
			gap: 'medium'
		}
	});
</script>

<div class={variants({ gap })} />
