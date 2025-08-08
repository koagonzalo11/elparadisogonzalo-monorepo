import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 5120, // 5120 KB = 5 MB
    rollupOptions: {
      // You can customize manualChunks here if needed
      // output: {
      //   manualChunks(id) {
      //     if (id.includes('node_modules')) {
      //       return 'vendor'
      //     }
      //   }
      // }
    }
  }
})

