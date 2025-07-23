<script lang="ts">
    import { EntryTimeModel } from '$lib/model/entry';

    let { times, currentTime, showAsTitle = false }: { times: EntryTimeModel[], currentTime: Date, showAsTitle?: boolean } = $props();

    let time = $derived.by(() => {
        let sortedTimes = times.sort((a, b) => a.time.getTime() - b.time.getTime());
        let combinedTimes: { start: Date; end: Date }[] = [];
        for (const time of sortedTimes) {
            if (time.type === 'start') {
                combinedTimes.push({ start: time.time, end: currentTime });
            } else if (combinedTimes.length > 0) {
                combinedTimes[combinedTimes.length - 1].end = time.time;
            }
        }
        let totalDuration = 0;
        for (const combinedTime of combinedTimes) {
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
