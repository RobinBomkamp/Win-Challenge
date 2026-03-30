<script lang="ts">
    let { children, onclick, compact = false } = $props();
</script>

<button
    class={`bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white font-semibold rounded shadow-2xs shadow-gray-700 ${compact ? 'py-1 px-2 text-sm' : 'py-2 px-4'}`}
    {onclick}
>
    {@render children()}
</button>