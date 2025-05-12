<!-- src/routes/+page.svelte -->
<script>
  import AudioImport from './AudioImport.svelte';
  import BoutonParametre from '$lib/components/parametres/Bouton.svelte';
  import SettingsModal from '$lib/components/parametres/SettingsModal.svelte';
  
  // État pour contrôler l'ouverture du modal de paramètres
  let isSettingsOpen = false;
  
  // Fonction pour ouvrir les paramètres
  function openSettings() {
    isSettingsOpen = true;
  }
</script>

<div class="p-4">
  <!-- En-tête avec titre et bouton de paramètres -->
  <div class="flex justify-between items-center mb-4">
    <h1 class="text-3xl font-bold">
      Salut !!!
    </h1>
    
    <!-- Bouton de paramètres avec gestionnaire d'événement -->
    <BoutonParametre onClick={openSettings} />
  </div>
  
  <!-- Composant d'importation audio -->
  <AudioImport />
  
  <!-- Modal des paramètres avec liaison bidirectionnelle -->
  <SettingsModal bind:isOpen={isSettingsOpen} />
</div>

<style lang="postcss">
  @reference "tailwindcss";
  :global(html) {
    background-color: theme(--color-gray-500);
  }
</style>