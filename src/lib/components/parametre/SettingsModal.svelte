<!-- src/lib/components/parametre/SettingsModal.svelte -->
<script>
  // En Svelte 5, la syntaxe correcte pour $props avec $bindable
  let { isOpen = $bindable(false) } = $props();
  
  // Fonction pour fermer la modal
  function closeModal() {
    isOpen = false;
  }
  
  // Fonction pour gérer la touche Escape
  function handleKeydown(event) {
    if (event.key === 'Escape' && isOpen) {
      closeModal();
    }
  }
</script>

<!-- 
  La modal utilise une combinaison de classes Tailwind pour:
  1. Positionner absolument la modal sur tout l'écran
  2. Gérer la transition avec translate-x
  3. Ajouter une ombre et arrière-plan
 -->
<div 
  class="fixed inset-0 z-50 overflow-hidden flex pointer-events-none"
  class:pointer-events-auto={isOpen}
  role="dialog"
  aria-modal={isOpen}
  aria-labelledby="modal-title"
>
  <!-- Arrière-plan semi-transparent avec transition d'opacité -->
  <div 
    class="absolute inset-0 bg-black transition-opacity duration-300 ease-in-out"
    class:opacity-0={!isOpen}
    class:opacity-50={isOpen}
    onclick={closeModal}
    onkeydown={handleKeydown}
    role="button"
    tabindex="0"
    aria-label="Fermer les paramètres"
  ></div>
  
  <!-- Conteneur de la modal avec transition par la gauche -->
  <div 
    class="absolute top-0 left-0 h-full w-3/4 max-w-md bg-white shadow-lg transform transition-transform duration-300 ease-in-out"
    class:translate-x-0={isOpen}
    class:-translate-x-full={!isOpen}
  >
    <!-- En-tête avec titre et bouton de fermeture -->
    <div class="flex items-center justify-between p-4 border-b">
      <h2 id="modal-title" class="text-lg font-bold">Paramètres</h2>
      <button 
        type="button"
        class="p-2 rounded-full hover:bg-gray-100 transition-colors"
        onclick={closeModal}
        onkeydown={handleKeydown}
        aria-label="Fermer les paramètres"
      >
        <!-- Icône X simple -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    <!-- Contenu de la modal -->
    <div class="p-4">
      <p>Contenu des paramètres ici.</p>
    </div>
  </div>
</div>