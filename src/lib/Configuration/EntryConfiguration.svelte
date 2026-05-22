<script lang="ts">
    import type { EntryModel } from "$lib/model/entry";
    import type { MdOutlinedTextField } from "@material/web/all";

    let { entry = $bindable(), onnewtimer, ondelete, oncomplete, onprogress, onprogressdown, index } : { entry: EntryModel, onnewtimer: Function, ondelete: Function, oncomplete: Function, onprogress: Function, onprogressdown: Function, index: number } = $props();

    let isActive = $derived(() => entry.times.length > 0 && entry.times[entry.times.length - 1].type === 'start');
    
    function onchange(event: Event) {
        const { name, value, type } = event.target as MdOutlinedTextField;
        (entry as any)[name] = type === 'number' ? Number(value) : value;
    }
</script>

<div class="entry-config">
    <div class="entry-config__content">
        <div class="entry-config__fields">
            <div class="entry-config__row">
                <md-outlined-text-field label="Name" id="{index}-name" name="title" value={entry.title ?? ''} {onchange}></md-outlined-text-field>
                <md-outlined-text-field id="{index}-estimated-time" type="number" suffix-text="min" name="estimatedTime" value={entry.estimatedTime ?? ''} {onchange}></md-outlined-text-field>
            </div>
            <div class="entry-config__row">
                <md-outlined-text-field label="Description" id="{index}-description" name="description" value={entry.description ?? ''} {onchange}></md-outlined-text-field>
                <md-outlined-text-field id="{index}-required-rounds" type="number" suffix-text="x" name="requiredRounds" value={entry.requiredRounds ?? ''} {onchange}></md-outlined-text-field>
            </div>
        </div>
        <div class="entry-config__actions">
            <div class="entry-config__action-row">
                <md-icon-button onclick={() => onprogressdown(index)}><md-icon>skip_previous</md-icon></md-icon-button>
                <md-icon-button onclick={() => onnewtimer(index)}><md-icon>{entry.completed ? 'stop' : isActive() ? 'pause' : 'play_arrow'}</md-icon></md-icon-button>
                <md-icon-button onclick={() => onprogress(index)}><md-icon>skip_next</md-icon></md-icon-button>
            </div>
            <div class="entry-config__action-row">
                <md-icon-button onclick={() => oncomplete(index)}><md-icon>check</md-icon></md-icon-button>
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

        md-outlined-text-field {
            flex: 1 1 auto;

            & ~ md-outlined-text-field {
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