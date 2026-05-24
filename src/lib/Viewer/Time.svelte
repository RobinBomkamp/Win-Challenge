<script lang="ts">
    import { EntryTimeModel } from '$lib/model/entry';

    let { times, currentTime, textClass = '' }: { times: EntryTimeModel[], currentTime: Date, textClass?: string } = $props();

    let time = $derived.by(() => {
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

    let formatedDuration = $derived.by(() => {
         const safeDuration = Math.max(0, Math.abs(time));
         const hour = Math.floor(safeDuration / 3600 / 1000);
         const minute = Math.floor((safeDuration % (3600 * 1000)) / 60000);
         const second = Math.floor((safeDuration % 60000) / 1000);
         return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
    });
</script>

{#if time > 0}
<p class="md-typescale-body-large {textClass}">{formatedDuration}</p>
{/if}
