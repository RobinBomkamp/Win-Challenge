<script lang="ts">
    import { EntryTimeModel } from '$lib/model/entry';

    let { times, currentTime, showAsTitle = false }: { times: EntryTimeModel[], currentTime: Date, showAsTitle?: boolean } = $props();

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

    let hour = $derived(Math.floor(time / 3600 / 1000));
    let minute = $derived(Math.floor((time % (3600 * 1000)) / 60000));
    let second = $derived(Math.floor((time % (60000)) / 1000));
</script>

{#if time > 0}
<p class={showAsTitle ? 'text-lg font-bold' : ''}>{String(hour).padStart(2, '0')}:{String(minute).padStart(2, '0')}:{String(second).padStart(2, '0')}</p>
{/if}
