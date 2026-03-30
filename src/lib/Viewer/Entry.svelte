<script lang="ts">
    import Time from "./Time.svelte";

    let { entry, currentTime } = $props();

    let isRunning = $derived.by(() => {
        return entry.times.length > 0 && entry.times[entry.times.length - 1].type === 'start';
    });

    let currentDuration = $derived.by(() => {
        let combinedTimes: { start: Date; end: Date }[] = [];
        for (const time of entry.times) {
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

    let estimatedDuration = $derived.by(() => {
        return Math.max(0, (entry.estimtaedTime ?? -1) * 60 * 1000);
    });

    let requiredRounds = $derived.by(() => {
        const parsedValue = Number(entry.requiredRounds ?? 1);
        return Number.isFinite(parsedValue) ? Math.max(1, Math.floor(parsedValue)) : 1;
    });

    let completedRounds = $derived.by(() => {
        const parsedValue = Number(entry.completedRounds ?? 0);
        if (!Number.isFinite(parsedValue)) {
            return 0;
        }
        return Math.min(requiredRounds, Math.max(0, Math.floor(parsedValue)));
    });

    let progressPercent = $derived.by(() => {
        return Math.max(0, Math.min(100, (completedRounds / requiredRounds) * 100));
    });

    let cardStyle = $derived.by(() => {
        return `background: linear-gradient(90deg, rgba(74, 222, 128, 0.24) 0%, rgba(74, 222, 128, 0.24) ${progressPercent}%, rgba(31, 41, 55, 1) ${progressPercent}%, rgba(31, 41, 55, 1) 100%);`;
    });

    let runningTimeColorClass = $derived.by(() => {
        if (estimatedDuration <= 0) {
            return '';
        }
        if (currentDuration > estimatedDuration) {
            return 'text-red-400';
        }
        if (isRunning && currentDuration < estimatedDuration) {
            return 'text-green-400';
        }
        return '';
    });

    function formatDuration(durationInMs: number): string {
        const hour = Math.floor(durationInMs / 3600 / 1000);
        const minute = Math.floor((durationInMs % (3600 * 1000)) / 60000);
        const second = Math.floor((durationInMs % 60000) / 1000);
        return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
    }
</script>

<div class="flex flex-row justify-between p-4" style={cardStyle}>
    <div>
        <p>{entry.title}</p>
        {#if entry.description !== ""}
        <p class="text-sm text-gray-400">{entry.description}</p>
        {/if}
    </div>
    <div class="flex flex-col items-end">
        <Time times={entry.times} {currentTime} textClass={runningTimeColorClass} />
        {#if estimatedDuration > 0}
        <p class="text-sm text-gray-300">Est. {formatDuration(estimatedDuration)}</p>
        {/if}
    </div>
</div>