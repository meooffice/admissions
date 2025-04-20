import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'build', // Output directory for Vercel deployment

    // Optional: Suppress large chunk warning (adjust as needed)
    chunkSizeWarningLimit: 1000, // in KB (default is 500)

    rollupOptions: {
      output: {
        // Manual chunk splitting (especially helpful for large node_modules or libraries)
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // puts all node_modules into a separate chunk
          }
        },
      },
    },
  },
  optimizeDeps: {
    include: ['jspdf', 'jspdf-autotable'],
  },
});
