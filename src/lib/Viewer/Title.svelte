<script lang="ts">
    import type { EntryModel } from "$lib/model/entry";
    import Delta from "./Delta.svelte";
    import ProgressBackground from "./ProgressBackground.svelte";
    import Time from "./Time.svelte";

    let { entries, currentTime }: { entries: EntryModel[], currentTime: Date } = $props();

    let times = $derived.by(() => entries.filter(entry => !entry.independentStart).flatMap(entry => entry.times));

    let estimatedDuration = $derived.by(() => entries
            .filter(entry => !entry.independentStart)
            .reduce((sum, entry) => sum + Math.max(0, (entry.estimatedTime ?? -1) * 60 * 1000), 0));

    let currentDuration = $derived.by(() => {
        let combinedTimes: { start: Date; end: Date }[] = [];
        for (const time of times) {
            if (time.type === 'start') {
                combinedTimes.push({ start: new Date(time.time), end: currentTime });
            } else if (combinedTimes.length > 0) {
                combinedTimes[combinedTimes.length - 1].end = new Date(time.time);
            }
        }

        let totalDuration = 0;
        for (const combinedTime of combinedTimes) {
            if (!combinedTime?.start || !combinedTime.end) {
                continue;
            }
            totalDuration += combinedTime.end.getTime() - combinedTime.start.getTime();
        }
        return totalDuration;
    });

    let totalEntries = $derived.by(() => entries.length);
    let completedEntries = $derived.by(() => entries.filter(entry => entry.completed).length);
</script>

<div class="title-bar">
    <ProgressBackground current={completedEntries} total={totalEntries} />
    <div class="title-bar__content">
        <h2 class="md-typescale-headline-small">Win-Challenge</h2>
        <div class="title-bar__time-info">
            <Time {times} {currentTime}/>
            <Delta {currentDuration} {estimatedDuration}/>
        </div>
    </div>
    <md-divider></md-divider>
</div>

<style lang="scss">
    .title-bar {
        position: relative;
        overflow: hidden;

        &__content {
            position: relative;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 1rem;
        }

        h2 {
            color: var(--md-sys-color-primary);
        }

        &__time-info {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
        }
    }
</style>