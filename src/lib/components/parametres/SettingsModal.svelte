<!-- src/lib/components/parametre/SettingsModal.svelte -->
<script>
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  
  // Export classique de Svelte
  export let isOpen = false;
  
  // Fonction pour fermer la modal
  function closeModal() {
    isOpen = false;
  }
  
  // Événement global pour détecter la touche ESC
  function handleKeydown(event) {
    if (event.key === 'Escape') closeModal();
  }
</script>

<svelte:window onkeydown={handleKeydown}/>

{#if isOpen}
  <div class="modal-container">
    <!-- Arrière-plan semi-transparent -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div 
      class="modal-backdrop" 
      on:click={closeModal}
      transition:fade={{ duration: 300 }}
    ></div>
    
    <!-- Panneau latéral avec animation fly -->
    <div 
      class="modal-panel"
      transition:fly={{ x: -300, duration: 300, easing: cubicOut }}
    >
      <!-- En-tête -->
      <div class="modal-header">
        <h2>Paramètres</h2>
        <button class="close-button" on:click={closeModal}>×</button>
      </div>
      
      <!-- Contenu -->
      <div class="modal-content">
        <p>Contenu des paramètres ici.</p>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 50;
    display: flex;
  }
  
  .modal-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
  
  .modal-panel {
    position: absolute;
    top: 0;
    left: 0;
    width: 75%;
    max-width: 300px;
    height: 100%;
    background: white;
    z-index: 2;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid #eee;
  }
  
  .close-button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    padding: 0 5px;
  }
  
  .modal-content {
    padding: 15px;
  }
</style>