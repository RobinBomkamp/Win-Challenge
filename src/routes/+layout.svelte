<script lang="ts">
	import '../app.css';
	
	let { children } = $props();
</script>

<div class="min-h-screen bg-gray-900 text-white">

	<div class="flex space-x-4 p-4">
		<a href="/">Home</a>
		<a href="/configuration">Configuration</a>
		<a href="/viewer">Viewer</a>
	</div>

	<div class="p-4">
		{@render children()}
	</div>
</div>
