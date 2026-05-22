<script lang="ts">
    let { value = $bindable(), label = '', id, type = "text", suffix = '' } = $props();
</script>

<div class="input-field">
    {#if label}
    <label for="{id}-input" class="input-field__label">{label}</label>
    {/if}
    <div class="input-field__wrapper">
        <div class="input-field__inner">
            <input
                id="{id}-input"
                {type}
                bind:value={value}
                class={`input-field__input${(suffix || type === 'number') ? ' input-field__input--right' : ''}${suffix ? ' input-field__input--with-suffix' : ''}`}
            />
            {#if suffix}
            <span class="input-field__suffix">{suffix}</span>
            {/if}
        </div>
    </div>
</div>

<style lang="scss">
    .input-field {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;

        &__label {
            flex: 0 0 auto;
            font-weight: 700;
            margin-bottom: 0.5rem;
            margin-top: 0.5rem;
        }

        &__wrapper {
            display: flex;
            flex: 1 1 auto;
        }

        &__inner {
            position: relative;
            flex: 1 1 auto;
        }

        &__input {
            width: 100%;
            border-radius: 0.5rem;
            background-color: #1f2937;

            &--right {
                text-align: right;
            }

            &--with-suffix {
                padding-right: 2.5rem;
            }
        }

        &__suffix {
            pointer-events: none;
            position: absolute;
            right: 0.75rem;
            top: 50%;
            transform: translateY(-50%);
            font-size: 0.875rem;
            line-height: 1.25rem;
            color: #d1d5db;
            white-space: nowrap;
        }
    }
</style>
