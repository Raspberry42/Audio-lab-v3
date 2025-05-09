// svelte.config.js
import adapter from "@sveltejs/adapter-static";
// CORRECTION ICI :
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"; // Au lieu de @sveltejs/kit/vite

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Utilisez vitePreprocess ici
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: "index.html", // ou '200.html' ou null si vous n'avez pas de fallback spécifique pour SPA
      precompress: false,
    }),
    // Si vous utilisez des chemins relatifs (ce qui est souvent le cas pour Capacitor)
    // assurez-vous que paths.base est configuré correctement.
    // Pour Capacitor, souvent '' (chaîne vide) ou './' est nécessaire.
    // Cependant, avec adapter-static et un fallback, ce n'est pas toujours critique.
    // paths: {
    //   base: process.env.NODE_ENV === 'production' ? '' : '', // Ajustez si besoin
    // }
  },
};

export default config;
