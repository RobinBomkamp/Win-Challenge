<script lang="ts">
    import Entry from '$lib/Viewer/Entry.svelte';
    import Title from '$lib/Viewer/Title.svelte';

    let { entries = [] } = $props();

    let currentTime = $state(new Date());
    $effect(() => {
        const interval = setInterval(() => {
            currentTime = new Date();
        }, 1000);
        return () => clearInterval(interval);
    });
</script>

<div class="viewer">
    <div class="viewer__title">
        <Title {entries} {currentTime} />
    </div>
    <div class="viewer__list">
        {#each entries as entry}
            <Entry {entry} {currentTime}/>
        {/each}
    </div>
</div>

<style lang="scss">
    .viewer {
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        overflow: hidden;
        
        max-width: 42rem;
        min-width: 20rem;
        max-height: 100%;

        border-radius: 1rem;

        background-color: var(--md-sys-color-surface-container);

        &__title {
            flex-shrink: 0;
        }

        &__list {
            flex: 1 1 auto;

            overflow-y: auto;
            min-height: 0;
        }
    }
</style>