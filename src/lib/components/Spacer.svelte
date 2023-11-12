<script lang="ts">
	import { cva } from 'class-variance-authority';

	export let gap: 'small' | 'medium' | 'large';

	const variants = cva('', {
		variants: {
			gap: {
				small: 'h-2' /* 8px */,
				medium: 'h-8' /* 32px */,
				base: 'h-12' /* 48px */,
				large: 'h-16' /* 64px */
			}
		},
		defaultVariants: {
			gap: 'large'
		}
	});
</script>

<div class={variants({ gap })} />
