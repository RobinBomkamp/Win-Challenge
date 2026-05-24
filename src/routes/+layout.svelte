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
	let navExpanded = $state(false);
</script>


<main class="md-typescale-body-large dark">
	<div class="menu-button">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<md-icon-button onclick={() => navExpanded = !navExpanded}>
			<md-icon>menu</md-icon>
		</md-icon-button>
	</div>
	{#if navExpanded}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div class="backdrop" onclick={() => navExpanded = false}></div>
	{/if}

	<nav class:open={navExpanded}>
		<div class="nav-header">
			<a class="md-typescale-headline-medium" href="/">Win-Challenges</a>
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<md-icon-button class="close-button" onclick={() => navExpanded = false}>
				<md-icon>close</md-icon>
			</md-icon-button>
		</div>
		<md-list>
			{#each data.challenges as challenge}
				<md-list-item type="link" href={`/win-challenge/${challenge.id}`}>{challenge.name ?? challenge.id}</md-list-item>
			{/each}
		</md-list>
	</nav>

	<div class="content">
		{@render children()}
	</div>
</main>

<style lang="scss">

	a {
		text-decoration: none;
		color: inherit;
	}

	md-list-item {
		border-radius: 9999px;
	}

	main {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		padding: 1rem;

		overflow: hidden;
		min-height: calc(100vh - 2rem);
		max-height: calc(100vh - 2rem);

		background: var(--md-sys-color-background);
		color: var(--md-sys-color-on-background);
	}

	.menu-button {
		display: none;
	}

	.backdrop {
		display: none;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	nav {
		position: relative;
		width: 280px;
		min-width: 280px;
		
		display: flex;
		flex-direction: column;
		gap: 1rem;
		
		background: var(--md-sys-color-surface);
		overflow-y: auto;

		.nav-header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 0.5rem;

			.close-button {
				display: none;
			}
		}

		md-list {
			overflow-y: auto;
			flex: 1;
		}
	}

	.content {
		padding: 0 1rem;
		margin: 0 auto;
		flex: 1;

		height: calc(100vh - 2rem);
		overflow: auto;
	}

	/* Mobile styles - modal navigation */
	@media (max-width: 768px) {
		.menu-button {
			display: block;
			position: fixed;
			margin-left: -1rem;
			margin-top: -1rem;
			background: var(--md-sys-color-background);
			border-bottom-right-radius: 1rem;
			z-index: 2
		}

		.backdrop {
			display: block;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(0, 0, 0, 0.5);
			z-index: 999;
			animation: fadeIn 0.3s ease;
		}

		nav {
			position: fixed;
			top: 0;
			left: -18rem;
			bottom: 0;
			width: 16rem;
			min-width: 16rem;
			z-index: 1000;
			padding: 1rem;
			box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
			transition: left 0.3s ease;

			.nav-header {
				.close-button {
					display: inline-flex;
				}
			}

			&.open {
				left: 0;
			}
		}

		.content {
			margin-left: 0;
			padding: 0;
		}
	}
</style>
