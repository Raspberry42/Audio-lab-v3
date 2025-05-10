<script>
  import AudioImport from './AudioImport.svelte';
</script>

<div class="p-4">
  <h1 class="text-3xl font-bold underline mb-6">
    Salut !!!!!!!
  </h1>
  
  <AudioImport />
</div>

<style lang="postcss">
  @reference "tailwindcss";
  :global(html) {
    background-color: theme(--color-gray-500);
  }
</style>
