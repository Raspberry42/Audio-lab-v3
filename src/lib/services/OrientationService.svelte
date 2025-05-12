<!-- src/lib/services/OrientationService.svelte -->
<script>
  import { onMount } from 'svelte';

  /**
   * Ce service gère l'orientation de l'écran et la verrouille en mode paysage
   * pour toutes les plateformes supportées.
   */
  onMount(async () => {
    try {
      // Vérifier si nous sommes sur une plateforme native
      if (typeof window !== 'undefined' && window.Capacitor && window.Capacitor.isNativePlatform()) {
        console.log('Configuration de l\'orientation paysage...');
        
        // Charger dynamiquement le plugin ScreenOrientation pour éviter les erreurs en web
        const { ScreenOrientation } = await import('@capacitor/screen-orientation');
        
        // Verrouiller l'orientation en mode paysage
        await ScreenOrientation.lock({
          orientation: 'landscape'
        });
        
        console.log('Orientation verrouillée en mode paysage');
      } else {
        console.log('Non exécuté sur une plateforme native, le verrouillage d\'orientation est ignoré');
      }
    } catch (error) {
      console.error('Erreur lors du verrouillage de l\'orientation:', error);
    }
  });
</script>