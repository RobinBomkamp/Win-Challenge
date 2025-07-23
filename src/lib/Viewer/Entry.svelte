<script lang="ts">
    import Time from "./Time.svelte";

    let { entry, currentTime } = $props();
</script>

<div class="flex flex-row justify-between p-4 bg-gray-800">
    <div>
        <p>{entry.title}</p>
        {#if entry.description !== ""}
        <p class="text-sm text-gray-400">{entry.description}</p>
        {/if}
    </div>
    <Time times={entry.times} {currentTime} />
</div>