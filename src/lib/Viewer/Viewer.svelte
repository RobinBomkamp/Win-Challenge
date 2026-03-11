<script lang="ts">
    import Entry from '$lib/Viewer/Entry.svelte';
    import Title from '$lib/Viewer/Title.svelte';

    let { entries = [] } = $props();

    let currentTime = $state(new Date());
    $effect(() => {
        const interval = setInterval(() => {
            currentTime = new Date();
        }, 1000);
        return () => clearInterval(interval);
    });
</script>

<div class="rounded-lg shadow-lg bg-gray-800 mx-auto max-w-2xl min-w-md flex flex-col max-h-[100%] overflow-hidden">
    <div class="flex-shrink-0">
        <Title {entries} {currentTime} />
    </div>
    <div class="flex-1 overflow-y-auto min-h-0">
        {#each entries as entry}
            <Entry {entry} {currentTime}/>
        {/each}
    </div>
</div>