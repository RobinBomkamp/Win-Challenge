<script lang="ts">
    import Time from "./Time.svelte";
    import Delta from "./Delta.svelte";
    import ProgressBackground from "./ProgressBackground.svelte";

    let { entry, currentTime } = $props();

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

    let estimatedDuration = $derived.by(() => Math.max(0, (entry.estimtaedTime ?? -1) * 60 * 1000));

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
    
</script>

<div class="entry-card">
    <ProgressBackground current={completedRounds} total={requiredRounds} />
    <div class="entry-card__content" class:entry-card__content--active={(currentDuration > 0 || entry.times.length > 0) && !entry.completed}>
        {#if entry.completed}
        <div class="entry-card__status entry-card__status--completed">✓</div>
        {:else}
        <div class="entry-card__status">•</div>
        {/if}
        <div class="entry-card__info">
            <p>{entry.title}</p>
            {#if entry.description !== ""}
            <p class="md-typescale-body-medium entry-card__description">{entry.description}</p>
            {/if}
        </div>
        <div class="entry-card__time-info">
            <Time times={entry.times} {currentTime} />
            <Delta {currentDuration} {estimatedDuration} />
        </div>
    </div>
</div>

<style lang="scss">
    .entry-card {
        position: relative;
        overflow: hidden;

        &__content {
            position: relative;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 1rem;
            gap: 1rem;

            &--active {
                border-left: 0.25rem solid var(--md-extended-color-success-on-color);
            }
        }

        &__status {
            font-weight: bold;
            color: var(--md-sys-color-outline);

            &--completed {
                color: var(--md-extended-color-success-color);
            }
        }

        &__info {
            flex: 1 1 auto;
        }

        &__description {
            color: var(--md-sys-color-outline);
        }

        &__time-info {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
        }
    }
</style>