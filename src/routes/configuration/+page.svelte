<script lang="ts">
    import Button from '$lib/Button.svelte';
    import EntryConfiguration from '$lib/Configuration/EntryConfiguration.svelte';
	import Headline from '$lib/Headline.svelte';
    import Viewer from '$lib/Viewer/Viewer.svelte';

	let { data } = $props();
    function normalizeEntry(entry: any) {
        const parsedRequiredRounds = Number(entry.requiredRounds ?? 1);
        const safeRequiredRounds = Number.isFinite(parsedRequiredRounds) ? Math.max(1, Math.floor(parsedRequiredRounds)) : 1;

        const defaultCompletedRounds = entry.completed ? safeRequiredRounds : 0;
        const parsedCompletedRounds = Number(entry.completedRounds ?? defaultCompletedRounds);
        const safeCompletedRounds = Number.isFinite(parsedCompletedRounds)
            ? Math.min(safeRequiredRounds, Math.max(0, Math.floor(parsedCompletedRounds)))
            : defaultCompletedRounds;

        entry.requiredRounds = safeRequiredRounds;
        entry.completedRounds = safeCompletedRounds;
        entry.completed = safeCompletedRounds >= safeRequiredRounds;
    }

    function initializeChallenge(source: any) {
        const nextChallenge = structuredClone(source || { entries: [] });
        nextChallenge.entries.forEach(normalizeEntry);
        return nextChallenge;
    }

    let challenge = $state(initializeChallenge(data.challenge));

    function addEntry() {
        challenge.entries.push({
            title: 'New Entry',
            description: 'Description of new entry',
            times: [],
            completed: false,
            requiredRounds: 1,
            completedRounds: 0
        });
    }

    async function onnewtimer(index: number) {
        const entry = challenge.entries[index];
        if (entry.completed) {
            return;
        }
        if (entry.times.length > 0 && entry.times[entry.times.length - 1].type === 'start') {
            entry.times.push({ time: new Date(), type: 'end' });
        } else {
            entry.times.push({ time: new Date(), type: 'start' });
        }

        challenge.entries.forEach((x: any, i: number) => {
            if (x.times.length === 0 || i === index) {
                return;
            }
            if (x.times[x.times.length - 1]?.type === 'start') {
                console.log('Adding end time for entry:', x.title);
                x.times.push({ time: new Date(), type: 'end' });
            }
        });
        await saveConfiguration();
    }

    async function oncomplete(index: number) {
        const entry = challenge.entries[index];
        const becomesCompleted = !entry.completed;
        entry.completed = becomesCompleted;
        entry.completedRounds = becomesCompleted ? Math.max(1, entry.requiredRounds ?? 1) : 0;

        // Auto-close a running timer when an entry gets completed.
        if (becomesCompleted && entry.times.length > 0 && entry.times[entry.times.length - 1].type === 'start') {
            entry.times.push({ time: new Date(), type: 'end' });
        }

        await saveConfiguration();
    }

    async function onprogress(index: number) {
        const entry = challenge.entries[index];
        normalizeEntry(entry);
        if (entry.completed) {
            return;
        }

        entry.completedRounds = (entry.completedRounds ?? 0) + 1;
        normalizeEntry(entry);

        // Auto-close a running timer when an entry reaches all rounds.
        if (entry.completed && entry.times.length > 0 && entry.times[entry.times.length - 1].type === 'start') {
            entry.times.push({ time: new Date(), type: 'end' });
        }

        await saveConfiguration();
    }
    
    function ondelete(index: number) {
        challenge.entries.splice(index, 1);
    }

    async function resetTimer() {
        for (const entry of challenge.entries) {
            entry.times = [];
        }
        await saveConfiguration();
    }

    async function saveConfiguration() {
        challenge.entries.forEach(normalizeEntry);
        await fetch('/win-challenge', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(challenge)
        });
    }
</script>

<div class="float-left">
    <Headline title="Configuration" />
</div>
<div class="float-right">
    <Button onclick={resetTimer}>Reset</Button>
    <Button onclick={saveConfiguration}>Save</Button>
</div>

<div id="layout" class="flex flex-row w-full gap-4 mt-14 h-[calc(100vh-6rem)] overflow-auto">
    <div id="configuration-content" class="flex-1">
        {#each challenge.entries as entry, i}
            <EntryConfiguration bind:entry={challenge.entries[i]} {onnewtimer} {ondelete} {oncomplete} {onprogress} index={i} />
        {/each}
        <Button onclick={addEntry}>Add entry</Button>
    </div>
    <div id="viewer-content" class="flex-0">
        <Viewer entries={challenge.entries} />
    </div>
</div>
