<script lang="ts">
	export let blok: any;
</script>

<a target="_blank" rel="noopener" href={blok.url} title={blok.label}>
	<span class={blok.class}>{blok.name}</span>
</a>
