<script lang="ts">
    import type { EntryModel } from "$lib/model/entry";
    import { MdCheckbox, MdOutlinedTextField } from "@material/web/all";

    let { entry = $bindable(), onnewtimer, ondelete, oncomplete, onprogress, onprogressdown, index } : { entry: EntryModel, onnewtimer: Function, ondelete: Function, oncomplete: Function, onprogress: Function, onprogressdown: Function, index: number } = $props();
    
    let internalEntry = $state(entry);
    $effect(() => {
        internalEntry = entry;
    });

    let isActive = $derived(() => internalEntry.times.length > 0 && internalEntry.times[internalEntry.times.length - 1].type === 'start');

    function onchange(event: Event, field: keyof EntryModel = 'title') {
        const target = event.target as HTMLInputElement;
        (internalEntry[field] as any) = typeof internalEntry[field] === 'number' ? Number(target.value) : target.value;
        entry = internalEntry;
    }
    
</script>

<div class="entry-config">
    <div class="entry-config__content">
        <div class="entry-config__fields">
            <div class="entry-config__row">
                <md-outlined-text-field label="Name" value={internalEntry.title ?? ''} onchange={(event: Event) => onchange(event, 'title')}></md-outlined-text-field>
                <md-outlined-text-field type="number" suffix-text="min" value={internalEntry.estimatedTime ?? 0} onchange={(event: Event) => onchange(event, 'estimatedTime')}></md-outlined-text-field>
            </div>
            <div class="entry-config__row">
                <md-outlined-text-field label="Description" value={internalEntry.description ?? ''} onchange={(event: Event) => onchange(event, 'description')}></md-outlined-text-field>
                <md-outlined-text-field type="number" suffix-text="x" value={internalEntry.requiredRounds ?? 0} onchange={(event: Event) => onchange(event, 'requiredRounds')}></md-outlined-text-field>
            </div>
        </div>
        <div class="entry-config__actions">
            <div class="entry-config__action-row">
                <md-icon-button onclick={() => onprogressdown(index)}><md-icon>skip_previous</md-icon></md-icon-button>
                <md-icon-button onclick={() => onnewtimer(index)}><md-icon>{internalEntry.completed ? 'stop' : isActive() ? 'pause' : 'play_arrow'}</md-icon></md-icon-button>
                <md-icon-button onclick={() => onprogress(index)}><md-icon>skip_next</md-icon></md-icon-button>
            </div>
            <div class="entry-config__action-row">
                <md-icon-button onclick={() => oncomplete(index)}><md-icon>check</md-icon></md-icon-button>
                <md-icon-button onclick={() => ondelete(index)}><md-icon>close</md-icon></md-icon-button>
            </div>
            <div>
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <label>
                    <md-checkbox touch-target="wrapper" checked={internalEntry.independentStart} onchange={({target}: {target: MdCheckbox}) => (internalEntry.independentStart = target.checked)}></md-checkbox>
                    <span>Independent</span>
                </label>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    :global(.entry-config md-outlined-text-field) {
        flex: 1 1 auto;
    }

    :global(.entry-config md-outlined-text-field ~ md-outlined-text-field) {
        width: 7.5rem;
    }

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
    }
    
    label > span {
        display: inline-block;
        margin-top: 0.75rem;
    }
</style>