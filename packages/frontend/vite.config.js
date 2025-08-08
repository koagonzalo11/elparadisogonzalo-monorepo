 HEAD
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
=======
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';

export default {
  plugins: [wasm(), topLevelAwait()],
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020'
    }
  }
};
04fc1bb49 (Update .gitcookies)
