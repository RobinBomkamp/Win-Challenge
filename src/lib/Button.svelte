<script lang="ts">
    let { children, onclick, compact = false } = $props();
</script>

<button
    class={`button${compact ? ' button--compact' : ''}`}
    {onclick}
>
    {@render children()}
</button>

<style lang="scss">
    .button {
        background-color: #374151;
        color: #ffffff;
        font-weight: 600;
        border-radius: 0.25rem;
        box-shadow: 0 1px 2px rgba(55, 65, 81, 0.5);
        padding: 0.5rem 1rem;
        border: none;
        cursor: pointer;

        &:hover {
            background-color: #4b5563;
        }

        &:active {
            background-color: #6b7280;
        }

        &--compact {
            padding: 0.25rem 0.5rem;
            font-size: 0.875rem;
            line-height: 1.25rem;
        }
    }
</style>