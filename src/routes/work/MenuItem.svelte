<script lang="ts">
	import { fade } from 'svelte/transition';

	import { zeroPad } from '$lib/utils/text';
	import { cls } from '$lib/styles';

	export let name: string;
	export let url: string;
	export let sup: number;
	export let selected: boolean;
	export let delay: number = 0;

	console.log(selected);
</script>

<li
	in:fade|global={{ delay }}
	out:fade|global
	class={cls(
		'mb-2 text-sm font-bold tracking-wider text-right uppercase menu-item whitespace-nowrap' +
			(selected ? ' active' : '')
	)}
>
	<a href={url}>
		<span class={cls(selected && 'font-bold')}>{name}</span>
		<sup class="text-xs font-normal number font-features sups">{zeroPad(sup)}</sup>
	</a>
</li>

<style lang="scss">
	@import '../../vars.scss';

	.menu-item {
		position: relative;
		color: #a7a89a;
		transition: 0.4s color ease-out, 0.4s transform ease-out;
		&:after {
			position: absolute;
			right: -40px;
			width: 4px;
			height: 4px;
			border-radius: 100%;
			top: 50%;
			margin-top: -2px;
			background: $black;
			opacity: 0;
			content: '';
			transition: 0.4s opacity ease-out, 0.4s transform ease-out;
		}
		&.active {
			color: #596669;
			transform: translate(-40px, 0);
			cursor: default;
			&:after {
				opacity: 1;
			}
		}
		@media (min-width: $media-md) {
			&:hover {
				color: #596669;
				transform: translate(-40px, 0);
				&:after {
					opacity: 1;
				}
			}
		}
	}

	.number {
		margin-top: -2px;
	}
</style>
