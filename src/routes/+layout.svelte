<script lang="ts">
	import '../app.css';
	
	let { children } = $props();
</script>

<div class="min-h-screen max-h-screen bg-gray-900 text-white overflow-hidden p-4">
	<div class="px-4 max-w-7xl mx-auto h-[calc(100vh-2rem)] overflow-auto">
		{@render children()}
	</div>
</div>
