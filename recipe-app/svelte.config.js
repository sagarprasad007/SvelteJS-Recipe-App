import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  compilerOptions: {
    // Svelte 5 runes mode enabled by default in Svelte 5
  },
  kit: {
    adapter: adapter(),
    alias: {
      '$lib': 'src/lib',
      '$lib/*': 'src/lib/*'
    }
  }
};

export default config;
