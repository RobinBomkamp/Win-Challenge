<script lang="ts">
    import Button from '$lib/Button.svelte';
    import Input from '$lib/Input.svelte';

    let { entry = $bindable(), onnewtimer, ondelete, oncomplete, onprogress, index } = $props();

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

    let cardStyle = $derived.by(() => {
        return `background: linear-gradient(90deg, rgba(74, 222, 128, 0.24) 0%, rgba(74, 222, 128, 0.24) ${progressPercent}%, rgba(55, 65, 81, 1) ${progressPercent}%, rgba(55, 65, 81, 1) 100%);`;
    });
</script>

<div class="flex flex-row p-4 gap-4 rounded-lg shadow-lg mb-4" style={cardStyle}>
    <div class="flex flex-col gap-4 flex-auto">
        <div class="flex flex-row gap-4 items-end">
            <div class="flex-auto">
                <Input label="Name" bind:value={entry.title} id="{index}-name"/>
            </div>
            <div class="w-30">
                <Input type="number" suffix="min" bind:value={entry.estimtaedTime} id="{index}-estimated-time"/>
            </div>
            <div class="w-20">
                <Input type="number" suffix="x" bind:value={entry.requiredRounds} id="{index}-required-rounds"/>
            </div>
        </div>
        <Input label="Description" bind:value={entry.description} id="{index}-description"/>
        <p class="text-xs text-gray-300">Progress: {completedRounds}/{requiredRounds}</p>
    </div>
    <div class="flex-[0_0_0] flex flex-col justify-between">
        <Button onclick={() => onnewtimer(index)}>{entry.completed ? 'Closed' : isActive() ? 'Stop' : 'Start'}</Button>
        <Button onclick={() => onprogress(index)}>{entry.completed ? 'Done' : '+1 Round'}</Button>
        <Button onclick={() => oncomplete(index)}>{entry.completed ? 'Reopen' : 'Complete'}</Button>
        <Button onclick={() => ondelete(index)}>Delete</Button>
    </div>
</div>