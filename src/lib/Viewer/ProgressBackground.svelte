<script lang="ts">
    let { current, total } = $props();

    let widthPercent = $derived.by(() => {
        if (total <= 0) {
            return 0;
        }
        return Math.max(0, Math.min(100, (current / total) * 100));
    });
</script>


<div class="progress" class:completed={current >= total} style:width="{widthPercent}%"></div>

<style lang="scss">
    .progress {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        background: linear-gradient(to right, var(--md-extended-color-success-on-color), var(--md-extended-color-success-color-container));
        transition: width background 500ms ease-out;

        filter: opacity(0.5);

        &.completed {
            background: var(--md-extended-color-success-color-container);
            filter: unset;
        }
    }
</style>