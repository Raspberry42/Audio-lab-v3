<!-- src/routes/+layout.svelte -->
<script>
  let { children } = $props();
  import "../app.css";
  import AppInitService from '../lib/services/AppInitService.svelte';
</script>

<!-- Component qui s'exécute au démarrage -->
<AppInitService />

{@render children()}