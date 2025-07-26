<script lang="ts">
    import Button from '$lib/Button.svelte';
    import EntryConfiguration from '$lib/Configuration/EntryConfiguration.svelte';
	import Headline from '$lib/Headline.svelte';
    import Viewer from '$lib/Viewer/Viewer.svelte';

	let { data } = $props();
    let entries = $state(data.entries || []);
    $effect(() => {
        if (data.entries) {
            entries = data.entries;
        }
    });

    function addEntry() {
        entries.push({
            title: 'New Entry',
            description: 'Description of new entry',
            times: []
        });
    }

    function onnewtimer(index: number) {
        const entry = entries[index];
        if (entry.times.length > 0 && entry.times[entry.times.length - 1].type === 'start') {
            entry.times.push({ time: new Date(), type: 'end' });
        } else {
            entry.times.push({ time: new Date(), type: 'start' });
        }
    }
    
    function ondelete(index: number) {
        entries.splice(index, 1);
    }

    function saveConfiguration() {
        console.log('Configuration saved:', entries);
    }
</script>

<div class="float-left">
    <Headline title="Configuration" />
</div>
<div class="float-right">
    <Button onclick={saveConfiguration}>Save</Button>
</div>

<div id="layout" class="flex flex-row w-full gap-4 mt-14">
    <div id="configuration-content" class="flex-1">
        {#each entries as entry, i}
            <EntryConfiguration bind:entry={entries[i]} {onnewtimer} {ondelete} index={i} />
        {/each}
        <Button onclick={addEntry}>Add entry</Button>
    </div>
    <div id="viewer-content" class="flex-0">
        <Viewer entries={entries} />
    </div>
</div>
