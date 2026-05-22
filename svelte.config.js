import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const webComponentA11yIgnore = new Set([
	'a11y_click_events_have_key_events',
	'a11y_no_static_element_interactions',
]);

// Custom elements are identified by a hyphen in the tag name (HTML spec requirement).
const isCustomElement = (warning) => /<[a-z][a-z0-9]*-[a-z0-9-]+/.test(warning.frame ?? warning.message);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	compilerOptions: {
		warningFilter: (warning) =>
			!(webComponentA11yIgnore.has(warning.code) && isCustomElement(warning)),
	},

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter()
	}
};

export default config;
