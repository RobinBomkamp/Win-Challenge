<script lang="ts">
    let { currentDuration, estimatedDuration } = $props();

    let estimatedDelta = $derived.by(() => estimatedDuration - currentDuration);
    let estimatedDeltaPrefix = $derived.by(() => estimatedDelta >= 0 ? '-' : '+');

    let formatedDuration = $derived.by(() => {
         const safeDuration = Math.max(0, Math.abs(estimatedDelta));
         const hour = Math.floor(safeDuration / 3600 / 1000);
         const minute = Math.floor((safeDuration % (3600 * 1000)) / 60000);
         const second = Math.floor((safeDuration % 60000) / 1000);
         return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
    });

</script>

{#if estimatedDuration > 0}
    <p 
        class="md-typescale-body-medium"
        class:over-time={currentDuration > estimatedDuration} 
        class:under-time={currentDuration < estimatedDuration}
        >{estimatedDeltaPrefix} {formatedDuration}</p>
{/if}

<style lang="scss">
    .over-time {
        color: var(--md-sys-color-error);
    }

    .under-time {
        color: var(--md-extended-color-success-on-color-container);
    }
</style>