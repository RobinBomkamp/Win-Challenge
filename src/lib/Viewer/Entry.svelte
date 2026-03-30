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

    let viewerCardClass = $derived.by(() => {
        const hasTime = currentDuration > 0 || entry.times.length > 0;
        
        if (!hasTime) {
            return 'bg-gray-800/85';
        }
        
        if (entry.completed) {
            return 'bg-emerald-500/40 border-l-4 border-emerald-400';
        }
        
        return 'bg-gray-800/85 border-l-4 border-emerald-600/70';
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

    let estimatedDelta = $derived.by(() => {
        return estimatedDuration - currentDuration;
    });

    let estimatedDeltaPrefix = $derived.by(() => {
        return estimatedDelta >= 0 ? '-' : '+';
    });

    function formatDuration(durationInMs: number): string {
        const safeDuration = Math.max(0, Math.abs(durationInMs));
        const hour = Math.floor(safeDuration / 3600 / 1000);
        const minute = Math.floor((safeDuration % (3600 * 1000)) / 60000);
        const second = Math.floor((safeDuration % 60000) / 1000);
        return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
    }
</script>

<div class="relative overflow-hidden">
    {#if !entry.completed}
        <div class="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 via-emerald-500/80 to-emerald-500/40 transition-all duration-500 ease-out" style={`width: ${progressPercent}%;`}></div>
    {/if}
    <div class={`relative z-10 flex flex-row justify-between p-4 transition-colors duration-300 ${viewerCardClass}`}>
        <div class="flex flex-row gap-3">
            {#if entry.completed}
            <div class="pt-0.5 text-green-300 font-bold">✓</div>
            {:else}
            <div class="pt-0.5 text-gray-500 font-bold">•</div>
            {/if}
            <div>
                <p>{entry.title}</p>
                {#if entry.description !== ""}
                <p class="text-sm text-gray-400">{entry.description}</p>
                {/if}
            </div>
        </div>
        <div class="flex flex-col items-end">
            <Time times={entry.times} {currentTime} />
            {#if estimatedDuration > 0}
            <p class="text-sm text-gray-300 {runningTimeColorClass}">{estimatedDeltaPrefix} {formatDuration(estimatedDelta)}</p>
            {/if}
        </div>
    </div>
</div>