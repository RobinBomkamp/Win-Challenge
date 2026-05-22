<script lang="ts">
	import "@material/web/all.js";
	import "../app.css";
	import "../themes/dark.css";
	import "../themes/light.css";

	import { styles as typescaleStyles } from "@material/web/typography/md-typescale-styles.js";

	if (typescaleStyles.styleSheet) {
		document.adoptedStyleSheets.push(typescaleStyles.styleSheet);
	}

	let { children, data } = $props();
</script>

<main class="md-typescale-body-large dark">
	<nav>
		<h1 class="md-typescale-headline-medium">Win-Challenges</h1>
		<md-list>
			{#each data.challenges as challenge}
				<md-list-item type="link" href={`/win-challenge/${challenge.id}`}>{challenge.id}</md-list-item>
			{/each}
		</md-list>
	</nav>

	<div class="content">
		{@render children()}
	</div>
</main>

<style lang="scss">

	md-list-item {
		border-radius: 9999px;
	}

	main {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		padding: 1rem;

		overflow: hidden;
		min-height: 100vh;
		max-height: 100vh;

		background: var(--md-sys-color-background);
		color: var(--md-sys-color-on-background);
	}

	.content {
		padding: 0 1rem;

		max-width: 1200px;
		margin: 0 auto;

		height: calc(100vh - 2rem);
		overflow: auto;
	}
</style>
