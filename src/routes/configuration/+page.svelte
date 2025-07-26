<script lang="ts">
    import Button from '$lib/Button.svelte';
    import EntryConfiguration from '$lib/Configuration/EntryConfiguration.svelte';
	import Headline from '$lib/Headline.svelte';
    import Viewer from '$lib/Viewer/Viewer.svelte';

	let { data } = $props();
    let challenge = $state(data.challenge || { entries: [] });
    $effect(() => {
        if (data.challenge) {
            challenge = data.challenge;
        }
    });

    function addEntry() {
        challenge.entries.push({
            title: 'New Entry',
            description: 'Description of new entry',
            times: []
        });
    }

    async function onnewtimer(index: number) {
        const entry = challenge.entries[index];
        if (entry.times.length > 0 && entry.times[entry.times.length - 1].type === 'start') {
            entry.times.push({ time: new Date(), type: 'end' });
        } else {
            entry.times.push({ time: new Date(), type: 'start' });
        }

        challenge.entries.forEach((x, i) => {
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

<div id="layout" class="flex flex-row w-full gap-4 mt-14">
    <div id="configuration-content" class="flex-1">
        {#each challenge.entries as entry, i}
            <EntryConfiguration bind:entry={challenge.entries[i]} {onnewtimer} {ondelete} index={i} />
        {/each}
        <Button onclick={addEntry}>Add entry</Button>
    </div>
    <div id="viewer-content" class="flex-0">
        <Viewer entries={challenge.entries} />
    </div>
</div>
