<script lang="ts">
    import Button from '$lib/Button.svelte';
    import Input from '$lib/Input.svelte';

    let { entry = $bindable(), onnewtimer, ondelete, oncomplete, onprogress, onprogressdown, index } = $props();

    let isActive = $derived(() => {
        return entry.times.length > 0 && entry.times[entry.times.length - 1].type === 'start';
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
</script>

<div class="entry-config">
    <div class="entry-config__content">
        <div class="entry-config__fields">
            <div class="entry-config__row">
                <md-outlined-text-field label="Name" name="title" id="{index}-name" class="entry-config__field"></md-outlined-text-field>
                <md-outlined-text-field type="number" suffix-text="min" name="estimatedTime" id="{index}-estimated-time" class="entry-config__field entry-config__field--narrow-time"></md-outlined-text-field>
            </div>
            <div class="entry-config__row">
                <md-outlined-text-field label="Description" name="description" id="{index}-description" class="entry-config__field"></md-outlined-text-field>
                <md-outlined-text-field type="number" suffix-text="x" name="requiredRounds" id="{index}-required-rounds" class="entry-config__field entry-config__field--narrow-rounds"></md-outlined-text-field>
            </div>
        </div>
        <div class="entry-config__actions">
            <div class="entry-config__action-row">
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <md-icon-button onclick={() => onprogressdown(index)}><md-icon>skip_previous</md-icon></md-icon-button>
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <md-icon-button onclick={() => onnewtimer(index)}><md-icon>{entry.completed ? 'stop' : isActive() ? 'pause' : 'play_arrow'}</md-icon></md-icon-button>
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <md-icon-button onclick={() => onprogress(index)}><md-icon>skip_next</md-icon></md-icon-button>
            </div>
            <div class="entry-config__action-row">
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <md-icon-button onclick={() => oncomplete(index)}><md-icon>check</md-icon></md-icon-button>
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <md-icon-button onclick={() => ondelete(index)}><md-icon>close</md-icon></md-icon-button>
            </div>
            <div>
                <md-checkbox id="independent-start-{index}" name="independentStart" touch-target="wrapper"></md-checkbox>
                <label for="independent-start-{index}">Independent</label>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    .entry-config {
        border-radius: 1rem;
        background-color: var(--md-sys-color-surface-container-low);
        overflow: hidden;
        margin-bottom: 1rem;

        &__content,
        &__fields,
        &__row {
            display: flex;
            flex-direction: row;
            gap: 1rem;
        }

        &__content {
            padding: 1rem;
        }

        &__fields {
            flex-direction: column;
            flex: 1 1 auto;
        }

        &__field {
            flex: 1 1 auto;

            &--narrow-time,
            &--narrow-rounds {
                width: 7.5rem;
            }
        }

        &__actions {
            flex: 0 0 auto;
            display: flex;
            flex-direction: column;
        }

        &__action-row {
            display: flex;
            flex-direction: row;
            gap: 0.5rem;
        }

        label {
            display: inline-block;
            margin-top: 0.75rem;
        }
    }
</style>