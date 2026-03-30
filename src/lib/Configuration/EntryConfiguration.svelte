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

    let cardStyle = $derived.by(() => {
        return `background: linear-gradient(90deg, rgba(74, 222, 128, 0.24) 0%, rgba(74, 222, 128, 0.24) ${progressPercent}%, rgba(55, 65, 81, 1) ${progressPercent}%, rgba(55, 65, 81, 1) 100%);`;
    });
</script>

<div class="relative rounded-lg shadow-lg mb-4 bg-gray-700 overflow-hidden">
    <div class="absolute inset-y-0 left-0 bg-green-400/25 transition-all duration-500 ease-out" style={`width: ${progressPercent}%;`}></div>
    <div class="relative z-10 flex flex-row p-4 gap-4">
        <div class="flex flex-col gap-4 flex-auto">
            <div class="flex flex-row gap-4 items-end">
                <div class="flex-auto">
                    <Input label="Name" bind:value={entry.title} id="{index}-name"/>
                </div>
                <div class="w-30">
                    <Input type="number" suffix="min" bind:value={entry.estimtaedTime} id="{index}-estimated-time"/>
                </div>
            </div>
            <div class="flex flex-row gap-4 items-end">
                <div class="flex-auto">
                    <Input label="Description" bind:value={entry.description} id="{index}-description"/>
                </div>
                <div class="w-20">
                    <Input type="number" suffix="x" bind:value={entry.requiredRounds} id="{index}-required-rounds"/>
                </div>
            </div>
        </div>
        <div class="flex-[0_0_0] flex flex-col gap-2 w-full">
            <div class="flex flex-row gap-1 w-full">
                <Button compact={true} onclick={() => onprogressdown(index)}>⏮</Button>
                <Button compact={true} onclick={() => onnewtimer(index)}>{entry.completed ? '‐' : isActive() ? '⏸' : '▶'}</Button>
                <Button compact={true} onclick={() => onprogress(index)}>⏭</Button>
            </div>
            <div class="flex flex-row gap-1 w-full">
                <Button compact={true} onclick={() => oncomplete(index)}>✓</Button>
                <Button compact={true} onclick={() => ondelete(index)}>✕</Button>
            </div>
        </div>
    </div>
</div>