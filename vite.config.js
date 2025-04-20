import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'build', // Specify output directory as 'build'
    rollupOptions: {
      output: {
        // Optional: To ensure correct output handling for Vite, you can configure the output format and naming conventions.
        // This section is only required if you want to specify custom settings for the build output.
      },
    },
  },
  optimizeDeps: {
    // Ensure jspdf and jspdf-autotable are correctly included in optimization for faster builds.
    include: ['jspdf', 'jspdf-autotable'],
  },
});
