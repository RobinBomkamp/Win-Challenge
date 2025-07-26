<script lang="ts">
    import Viewer from '$lib/Viewer/Viewer.svelte';
    import { onMount } from 'svelte';
    import { invalidateAll } from '$app/navigation';

    let { data } = $props();

    onMount(() => {
		const interval = setInterval(() => {
			invalidateAll();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<Viewer entries={data.challenge.entries} />