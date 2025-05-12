<!-- src/lib/AppInitService.svelte -->
<script>
  import { onMount } from 'svelte';
  import { Filesystem, Directory } from '@capacitor/filesystem';

  // Nom du dossier pour les fichiers audio
  const AUDIO_FOLDER = 'audio_files';
  
  // Fonction pour initialiser l'application
  async function initializeApp() {
    try {
      // Vérifier si nous sommes sur un appareil natif
      if (typeof window !== 'undefined' && window.Capacitor && window.Capacitor.isNativePlatform()) {
        console.log('Initialisation du système de fichiers...');
        
        // Vérifier si le dossier audio_files existe déjà
        try {
          // On essaie de lister le contenu du dossier
          await Filesystem.readdir({
            path: AUDIO_FOLDER,
            directory: Directory.Data
          });
          console.log(`Le dossier ${AUDIO_FOLDER} existe déjà.`);
        } catch (err) {
          // Si on arrive ici, le dossier n'existe pas, donc on le crée
          console.log(`Le dossier ${AUDIO_FOLDER} n'existe pas. Création en cours...`);
          await Filesystem.mkdir({
            path: AUDIO_FOLDER,
            directory: Directory.Data,
            recursive: true
          });
          console.log(`Dossier ${AUDIO_FOLDER} créé avec succès.`);
        }
      }
    } catch (error) {
      console.error('Erreur lors de l\'initialisation de l\'application:', error);
    }
  }

  // Exécuter l'initialisation au montage du composant
  onMount(() => {
    initializeApp();
  });
</script>