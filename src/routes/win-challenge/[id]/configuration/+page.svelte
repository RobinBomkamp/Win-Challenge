<script lang="ts">
    import { goto, invalidateAll } from "$app/navigation";
    import EntryConfiguration from "$lib/Configuration/EntryConfiguration.svelte";

    let { data } = $props();

    let challenge = $state(data.challenge);
    $effect(() => {
        challenge = data.challenge;
    });

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
        challenge.entries.push({
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
        const entry = challenge.entries[index];
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
            challenge.entries.forEach((x: any, i: number) => {
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
        const entry = challenge.entries[index];
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
        const entry = challenge.entries[index];
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
        const entry = challenge.entries[index];
        normalizeEntry(entry);

        entry.completedRounds = Math.max(0, (entry.completedRounds ?? 0) - 1);
        normalizeEntry(entry);

        await saveConfiguration();
    }

    function ondelete(index: number) {
        challenge.entries.splice(index, 1);
    }

    async function resetTimer() {
        for (const entry of challenge.entries) {
            entry.times = [];
            entry.completedRounds = 0;
            entry.completed = false;
        }
        await saveConfiguration();
    }

    async function deleteChallenge() {
        if (!confirm(`Are you sure you want to delete "${challenge.name}"? This action cannot be undone.`)) {
            return;
        }

        const response = await fetch(`/win-challenge/${challenge.id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            alert("Failed to delete challenge.");
        } else {
            goto("/");
            invalidateAll();
        }
    }

    async function saveConfiguration() {
        challenge.entries.forEach(normalizeEntry);
        const response = await fetch(`/win-challenge/${challenge.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(challenge),
        });

        if (!response.ok) {
            alert("Failed to save challenge configuration.");
        } else {
            const result = await response.json();
            challenge.id = result.id;
        }
        goto(`/win-challenge/${challenge.id}/configuration`);
        invalidateAll();
    }
</script>

<div class="container">
    <div class="header">
        <md-outlined-text-field label="Challenge name" value={challenge.name ?? ''} onchange={(event: Event) => (challenge.name = (event.target as HTMLInputElement).value)}></md-outlined-text-field>

        <div>
            <md-text-button onclick={deleteChallenge}>Delete</md-text-button>
            <md-text-button onclick={resetTimer}>Reset</md-text-button>
            <md-text-button onclick={saveConfiguration}>Save</md-text-button>
        </div>
    </div>

    <div class="entries">
        {#each challenge.entries as entry, i}
            <EntryConfiguration
                bind:entry={challenge.entries[i]}
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
        margin-top: 1rem;
    }

    md-outlined-text-field {
        width: 16rem;
    }

    .container {
        display: flex;
        flex-direction: column;
        height: calc(100vh - 2.25rem);
        gap: 1rem;

        .entries {
            flex: 1 1 auto;
        }

        .entries {
            overflow: auto;
            scrollbar-gutter: stable;
            padding-right: 1rem;
        }
    }
</style>
