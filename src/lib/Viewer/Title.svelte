<script lang="ts">
    import type { EntryModel } from "$lib/model/entry";
    import Time from "./Time.svelte";

    let { entries, currentTime }: { entries: EntryModel[], currentTime: Date } = $props();

    let times = $derived.by(() => entries.filter(entry => !entry.independentStart).flatMap(entry => entry.times));

    let estimatedDuration = $derived.by(() => {
        return entries
            .filter(entry => !entry.independentStart)
            .reduce((sum, entry) => sum + Math.max(0, (entry.estimtaedTime ?? -1) * 60 * 1000), 0);
    });

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

    let estimatedDelta = $derived.by(() => {
        return estimatedDuration - currentDuration;
    });

    let estimatedDeltaPrefix = $derived.by(() => {
        return estimatedDelta >= 0 ? '-' : '+';
    });

    let estimatedDeltaColorClass = $derived.by(() => {
        if (estimatedDuration <= 0) {
            return '';
        }
        if (currentDuration > estimatedDuration) {
            return 'text-red-400';
        }
        if (currentDuration < estimatedDuration) {
            return 'text-green-400';
        }
        return '';
    });

    function formatDuration(durationInMs: number): string {
        const safeDuration = Math.max(0, Math.abs(durationInMs));
        const hour = Math.floor(safeDuration / 3600 / 1000);
        const minute = Math.floor((safeDuration % (3600 * 1000)) / 60000);
        const second = Math.floor((safeDuration % 60000) / 1000);
        return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
    }
</script>

<div class="flex flex-row justify-between p-4 bg-gray-800 border-b-2 border-gray-700">
    <h2 class="text-lg font-bold">Win-Challenge</h2>
    <div class="flex flex-col items-end">
        <Time {times} {currentTime} showAsTitle={true} />
        {#if estimatedDuration > 0}
        <p class={`text-sm text-gray-300 ${estimatedDeltaColorClass}`.trim()}>{estimatedDeltaPrefix} {formatDuration(estimatedDelta)}</p>
        {/if}
    </div>
</div>