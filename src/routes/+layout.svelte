<script lang="ts">
	import '../app.css';
	
	let { children } = $props();
</script>

<div class="min-h-screen bg-gray-900 text-white">
	<div class="p-4 max-w-7xl mx-auto">
		{@render children()}
	</div>
</div>
