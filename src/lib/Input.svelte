<script lang="ts">
    let { value = $bindable(), label = '', id, type = "text", suffix = '' } = $props();
</script>

<div class="flex flex-row margin-bottom-4 items-center gap-2">
    {#if label}
    <label for="{id}-input" class="flex-0 basis-3xs font-bold mb-2 mt-2">{label}</label>
    {/if}
    <div class="flex flex-auto">
        <div class="relative flex-auto">
            <input id="{id}-input" {type} bind:value={value} class={`flex-auto w-full rounded-lg bg-gray-800 ${(suffix || type === 'number') ? 'text-right' : ''} ${suffix ? 'pr-10' : ''}`}/>
            {#if suffix}
            <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-300 whitespace-nowrap">{suffix}</span>
            {/if}
        </div>
    </div>
</div>
