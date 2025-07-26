<script lang="ts">
	import '../app.css';
	
	let { children } = $props();
</script>

<div class="min-h-screen bg-gray-900 text-white">
	<div class="p-4">
		{@render children()}
	</div>
</div>
