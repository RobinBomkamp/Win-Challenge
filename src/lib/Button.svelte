<script lang="ts">
    let { children, onclick } = $props();
</script>

<button class="bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white font-semibold py-2 px-4 rounded shadow-2xs
 shadow-gray-700" {onclick}>{@render children()}</button>