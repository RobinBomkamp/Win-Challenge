<script>
    import Viewer from "$lib/Viewer/Viewer.svelte";
    
	let { data, children } = $props();
</script>

<div class="configuration">
    <div class="configuration__content">{@render children()}</div>
    <div class="configuration__viewer">
        <Viewer entries={data.challenge.entries} />
    </div>
</div>

<style lang="scss">
    .configuration {
        display: flex;
        flex-direction: row;
        gap: 1rem;
    }

    .configuration__content {
        flex: 1 1 auto;
        overflow: auto;
        height: calc(100vh - 2rem);
    }

    .configuration__viewer {
        flex: 1 1 30rem;
    }
</style>
