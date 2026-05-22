// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

// Type declarations for @material/web custom elements
declare module 'svelte/elements' {
	interface IntrinsicElements {
		'md-text-button': { [attr: string]: unknown };
		'md-icon-button': { [attr: string]: unknown };
		'md-list': { [attr: string]: unknown };
		'md-list-item': { [attr: string]: unknown };
		'md-divider': { [attr: string]: unknown };
		'md-outlined-text-field': { [attr: string]: unknown };
		'md-icon': { [attr: string]: unknown };
		'md-checkbox': { [attr: string]: unknown };
	}
}

export {};
