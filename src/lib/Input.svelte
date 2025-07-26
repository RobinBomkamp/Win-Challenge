<script lang="ts">
    let { value = $bindable(), label, id } = $props();
</script>

<div class="flex flex-row margin-bottom-4">
    <label for="{id}-input" class="flex-0 basis-3xs font-bold mb-2 mt-2">{label}</label>
    <input id="{id}-input" type="text" bind:value={value} class="flex-auto rounded-lg bg-gray-800"/>
</div>
