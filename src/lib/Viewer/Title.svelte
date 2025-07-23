<script lang="ts">
    import type { EntryModel } from "$lib/model/entry";
    import Time from "./Time.svelte";

    let { entries, currentTime }: { entries: EntryModel[], currentTime: Date } = $props();

    let times = $derived.by(() => entries.flatMap(entry => entry.times));
</script>

<div class="flex flex-row justify-between p-4 bg-gray-800 border-b-2 border-gray-700">
    <h2 class="text-lg font-bold">Win-Challenge</h2>
    <Time {times} {currentTime} showAsTitle={true} />
</div>