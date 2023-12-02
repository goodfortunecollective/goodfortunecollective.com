<script lang="ts">
	export let blok: any;
</script>

<a target="_blank" rel="noopener" class="hover:no-underline" href={blok.url} title={blok.label}>
	<span class={blok.class}>{blok.name}</span>
</a>
