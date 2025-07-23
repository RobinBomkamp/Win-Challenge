<script lang="ts">
	import Headline from '$lib/Headline.svelte';
    import Viewer from '$lib/Viewer/Viewer.svelte';
</script>

<Headline title="Configuration" />

<div id="layout" class="flex flex-row w-full">
    <div id="configuration-content" class="flex-1 p-4">
        <h2 class="text-xl font-bold mb-4">Configuration Section</h2>
    </div>
    <div id="viewer-content" class="p-4 bg-gray-400 flex-0 rounded-lg shadow-lg">
        <Viewer />
    </div>
</div>