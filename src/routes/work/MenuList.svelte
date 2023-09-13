<script lang="ts">
	let clazz: string;
	export { clazz as class };

	let isOpen = true;

	function toggleDropdown() {
		isOpen = !isOpen;
	}
</script>

<div class={clazz + (isOpen ? ' opened' : '')} id="menu-list">
	<button class="w-12 h-12 px-4 py-2 text-white bg-black rounded-full" on:click={toggleDropdown}>
		<span class="text-2xl">{isOpen ? '-' : '+'}</span>
	</button>
	<div class="pr-6 mr-6 list">
		{#if isOpen}
			<ul><slot /></ul>
		{/if}
	</div>
</div>

<style lang="scss">
	@import '../../vars.scss';

	#menu-list {
		position: relative;
		z-index: 15;
		overflow: hidden;
		padding-left: 40px;
		// height: 0;
		transition: 0.5s height ease-out;
		text-align: right;
		// &.opened {
		// 	height: auto;
		// }

		&.opened {
			.list {
				&:after {
					transform: scaleY(1);
				}
			}
		}

		.list {
			position: relative;
			&:after {
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				transform: scaleY(0);
				width: 1px;
				background: #a3b2b6;
				transform-origin: 0 0;
				transition: 0.4s transform ease-out;
				content: '';
			}
		}
		@media (min-width: $media-md) {
			position: absolute;
			right: 0;
			margin-right: 20px;
		}
	}
</style>
