<script lang="ts">
    import EntryConfiguration from "$lib/Configuration/EntryConfiguration.svelte";

    let { data } = $props();
    function normalizeEntry(entry: any) {
        const parsedRequiredRounds = Number(entry.requiredRounds ?? 1);
        const safeRequiredRounds = Number.isFinite(parsedRequiredRounds)
            ? Math.max(1, Math.floor(parsedRequiredRounds))
            : 1;

        const defaultCompletedRounds = entry.completed ? safeRequiredRounds : 0;
        const parsedCompletedRounds = Number(
            entry.completedRounds ?? defaultCompletedRounds,
        );
        const safeCompletedRounds = Number.isFinite(parsedCompletedRounds)
            ? Math.min(
                  safeRequiredRounds,
                  Math.max(0, Math.floor(parsedCompletedRounds)),
              )
            : defaultCompletedRounds;

        entry.requiredRounds = safeRequiredRounds;
        entry.completedRounds = safeCompletedRounds;
        entry.completed = safeCompletedRounds >= safeRequiredRounds;
        entry.independentStart = !!entry.independentStart;
    }

    function addEntry() {
        data.challenge.entries.push({
            title: "New Entry",
            description: "Description of new entry",
            times: [],
            completed: false,
            requiredRounds: 1,
            completedRounds: 0,
            independentStart: false,
        });
    }

    async function onnewtimer(index: number) {
        const entry = data.challenge.entries[index];
        if (entry.completed) {
            return;
        }
        const isEntryRunning =
            entry.times.length > 0 &&
            entry.times[entry.times.length - 1].type === "start";

        if (isEntryRunning) {
            entry.times.push({ time: new Date(), type: "end" });
        } else {
            entry.times.push({ time: new Date(), type: "start" });
        }

        // Only when starting a non-independent entry, stop other running non-independent entries.
        if (!isEntryRunning && !entry.independentStart) {
            data.challenge.entries.forEach((x: any, i: number) => {
                if (i === index || x.times.length === 0 || x.independentStart) {
                    return;
                }
                if (x.times[x.times.length - 1]?.type === "start") {
                    x.times.push({ time: new Date(), type: "end" });
                }
            });
        }
        await saveConfiguration();
    }

    async function oncomplete(index: number) {
        const entry = data.challenge.entries[index];
        const becomesCompleted = !entry.completed;
        entry.completed = becomesCompleted;
        entry.completedRounds = becomesCompleted
            ? Math.max(1, entry.requiredRounds ?? 1)
            : 0;

        // Auto-close a running timer when an entry gets completed.
        if (
            becomesCompleted &&
            entry.times.length > 0 &&
            entry.times[entry.times.length - 1].type === "start"
        ) {
            entry.times.push({ time: new Date(), type: "end" });
        }

        await saveConfiguration();
    }

    async function onprogress(index: number) {
        const entry = data.challenge.entries[index];
        normalizeEntry(entry);
        if (entry.completed) {
            return;
        }

        entry.completedRounds = (entry.completedRounds ?? 0) + 1;
        normalizeEntry(entry);

        // Auto-close a running timer when an entry reaches all rounds.
        if (
            entry.completed &&
            entry.times.length > 0 &&
            entry.times[entry.times.length - 1].type === "start"
        ) {
            entry.times.push({ time: new Date(), type: "end" });
        }

        await saveConfiguration();
    }

    async function onprogressdown(index: number) {
        const entry = data.challenge.entries[index];
        normalizeEntry(entry);

        entry.completedRounds = Math.max(0, (entry.completedRounds ?? 0) - 1);
        normalizeEntry(entry);

        await saveConfiguration();
    }

    function ondelete(index: number) {
        data.challenge.entries.splice(index, 1);
    }

    async function resetTimer() {
        for (const entry of data.challenge.entries) {
            entry.times = [];
            entry.completedRounds = 0;
            entry.completed = false;
        }
        await saveConfiguration();
    }

    async function saveConfiguration() {
        data.challenge.entries.forEach(normalizeEntry);
        await fetch(`/win-challenge/${data.challenge.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data.challenge),
        });
    }
</script>

<div class="container">
    <div class="header">
        <h1 class="md-typescale-display-medium">Configuration</h1>

        <div>
            <md-text-button onclick={resetTimer}>Reset</md-text-button>
            <md-text-button onclick={saveConfiguration}>Save</md-text-button>
        </div>
    </div>

    <div class="entries">
        {#each data.challenge.entries as entry, i}
            <EntryConfiguration
                bind:entry={data.challenge.entries[i]}
                {onnewtimer}
                {ondelete}
                {oncomplete}
                {onprogress}
                {onprogressdown}
                index={i}
            />
        {/each}
    </div>

    <md-text-button onclick={addEntry}>Add entry</md-text-button>
</div>

<style lang="scss">
    .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 1rem;

        h1 {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
    }

    .container {
        display: flex;
        flex-direction: column;
        height: calc(100vh - 2.25rem);
        gap: 1rem;

        > * {
            flex: 1 1 auto;
        }

        .entries {
            overflow: auto;
            scrollbar-gutter: stable;
            padding-right: 1rem;
        }
    }
</style>
