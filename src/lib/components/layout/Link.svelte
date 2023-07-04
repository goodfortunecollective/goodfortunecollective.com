<script lang="ts">
	export let href = { url: '' };
	export let label = '';
	export let isExternal = false;
</script>

<a
	{...$$restProps}
	href={href.url}
	target={isExternal ? '_blank' : undefined}
	rel={isExternal ? 'noopener' : undefined}
	class="uppercase font-bold text-sm tracking-widest"
>
	<span class="pr-4">{label}</span>
	<span class="text-4xl relative"
		><span class="z-10 absolute">&#10230;</span><span
			class="block left-3 w-12 h-12 bg-gray-300 rounded-full absolute top-0"
		/></span
	>
</a>
