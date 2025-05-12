<!-- src/routes/+layout.svelte -->
<script>
  let { children } = $props();
  import "../app.css";
  import AppInitService from '../lib/services/AppInitService.svelte';
  import OrientationService from '../lib/services/OrientationService.svelte';
</script>

<!-- Components qui s'exécutent au démarrage -->
<AppInitService />
<OrientationService />

{@render children()}