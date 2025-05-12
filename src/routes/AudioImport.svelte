<script>
  // AudioImport.svelte
  import { onMount } from 'svelte';
  import { Filesystem, Directory } from '@capacitor/filesystem';

  // Nom du dossier pour les fichiers audio
  const AUDIO_FOLDER = 'audio_files';
  
  let status = "";
  let isUploading = false;
  let progress = 0;
  let selectedFileName = "";
  
  // Référence à l'élément input invisible
  let fileInput;
  
  onMount(() => {
    // Vérifier que nous sommes dans un environnement Capacitor et non dans le navigateur
    const isNativePlatform = typeof window !== 'undefined' && window.Capacitor && window.Capacitor.isNativePlatform();
    if (isNativePlatform) {
      status = "Prêt à importer des fichiers audio";
    } else {
      status = "Environnement navigateur détecté. Cette fonctionnalité ne fonctionnera que sur l'appareil.";
    }
  });

  async function handleFileSelect() {
    try {
      // Déclencher le dialogue de sélection de fichier
      fileInput.click();
    } catch (error) {
      status = `Erreur lors de l'ouverture du sélecteur de fichier: ${error.message}`;
      console.error("Erreur lors de l'ouverture du sélecteur", error);
    }
  }

  async function handleFileChange(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    isUploading = true;
    progress = 10;
    selectedFileName = file.name;
    status = `Préparation de l'importation de: ${file.name}`;
    
    try {
      // Convertir le fichier en base64
      progress = 30;
      status = "Lecture du fichier...";
      const base64Data = await readFileAsBase64(file);
      
      progress = 50;
      status = "Enregistrement dans le stockage de l'application...";
      
      // Déterminer l'extension du fichier pour le type MIME
      const fileExt = file.name.split('.').pop().toLowerCase();
      
      // Créer un nom de fichier unique
      const fileName = `audio_${new Date().getTime()}.${fileExt}`;
      
      // Chemin complet avec le dossier audio_files
      const filePath = `${AUDIO_FOLDER}/${fileName}`;
      
      // Enregistrer le fichier dans le stockage privé de l'application
      const result = await Filesystem.writeFile({
        path: filePath,
        data: base64Data,
        directory: Directory.Data,
        recursive: true
      });
      
      progress = 100;
      status = `Fichier audio "${file.name}" importé avec succès!`;
      console.log("Fichier importé:", result.uri);
      
      // Lister les fichiers pour vérifier
      const files = await Filesystem.readdir({
        path: AUDIO_FOLDER,
        directory: Directory.Data
      });
      
      console.log("Fichiers dans le répertoire:", files.files);
      
    } catch (error) {
      // Gestion des erreurs plus spécifique
      if (error.message.includes("permission")) {
        status = "Permission refusée pour accéder au stockage. Vérifiez les paramètres de l'application.";
      } else if (error.message.includes("storage") || error.message.includes("space")) {
        status = "Espace de stockage insuffisant";
      } else {
        status = `Erreur lors de l'importation: ${error.message}`;
      }
      console.error("Erreur d'importation", error);
    } finally {
      setTimeout(() => {
        isUploading = false;
        progress = 0;
      }, 2000);
    }
  }

  function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        // Extraire seulement la partie base64 (sans le préfixe data:audio/...)
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }
</script>

<div class="p-4 max-w-md mx-auto">
  <h2 class="text-xl font-bold mb-4">Importation de fichier audio</h2>
  
  <!-- Input de fichier caché -->
  <input
    type="file"
    accept="audio/*"
    style="display: none"
    bind:this={fileInput}
    on:change={handleFileChange}
  />
  
  <!-- Bouton visible -->
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 w-full"
    on:click={handleFileSelect}
    disabled={isUploading}
  >
    {isUploading ? 'Importation en cours...' : 'Importer un fichier audio'}
  </button>
  
  <!-- Affichage du statut -->
  <div class="mt-4">
    {#if selectedFileName}
      <p class="text-sm font-medium">Fichier: {selectedFileName}</p>
    {/if}
    
    {#if status}
      <p class="text-sm mt-2">{status}</p>
    {/if}
    
    {#if isUploading}
      <div class="w-full bg-gray-200 rounded-full h-2.5 mt-2">
        <div class="bg-blue-600 h-2.5 rounded-full" style="width: {progress}%"></div>
      </div>
    {/if}
  </div>
</div>