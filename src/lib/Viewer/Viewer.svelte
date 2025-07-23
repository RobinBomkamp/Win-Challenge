<script lang="ts">
    import type { EntryModel } from '$lib/model/entry';
    import Entry from '$lib/Viewer/Entry.svelte';
    import Title from '$lib/Viewer/Title.svelte';

    let currentTime = $state(new Date());
    $effect(() => {
        const interval = setInterval(() => {
            currentTime = new Date();
        }, 1000);
        return () => clearInterval(interval);
    });

    const entries: EntryModel[] = [
        { title: 'Brotato', description: '1 Win auf Danger 5', times: [{ time: new Date(2025, 6, 24, 0, 0, 0), type: 'start'}] },
        { title: 'Fortnite', description: '1 Win in Null Bauen', times: [
            { time: new Date(2025, 6, 23, 1, 0, 0), type: 'start'},
            { time: new Date(2025, 6, 23, 1, 20, 0), type: 'end'}
        ] },
        { title: 'League of Legends', description: '1 Win im Ranked', times: [] },
        { title: 'Marvel Rivals', description: '1 Win in einer normalen Runde', times: [] }
    ];
</script>

<div class="rounded-lg shadow-lg bg-gray-800 overflow-hidden mx-auto max-w-2xl min-w-md">
    <Title {entries} {currentTime} />
    {#each entries as entry}
        <Entry {entry} {currentTime} />
    {/each}
</div>