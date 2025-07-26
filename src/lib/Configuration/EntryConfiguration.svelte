<script lang="ts">
    import Button from '$lib/Button.svelte';
    import Input from '$lib/Input.svelte';

    let { entry = $bindable(), onnewtimer, ondelete, index } = $props();

    let isActive = $derived(() => {
        return entry.times.length > 0 && entry.times[entry.times.length - 1].type === 'start';
    });
</script>

<div class="flex flex-row p-4 gap-4 bg-gray-700 rounded-lg shadow-lg mb-4">
    <div class="flex flex-col gap-4 flex-auto">
        <Input label="Name" bind:value={entry.title} id="{index}-name"/>
        <Input label="Description" bind:value={entry.description} id="{index}-description"/>
    </div>
    <div class="flex-[0_0_0] flex flex-col justify-between">
        <Button onclick={() => onnewtimer(index)}>{isActive() ? 'Stop' : 'Start'}</Button>
        <Button onclick={() => ondelete(index)}>Delete</Button>
    </div>
</div>