<script lang="ts">
	export let url = '';
</script>

<a href={url} {...$$restProps}>
	<slot />
</a>
