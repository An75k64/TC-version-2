import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
// Optional: Import the visualizer plugin for analyzing bundle size
// import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    // Optional: Use this plugin to generate a visualization of your bundle size
    // visualizer({ open: true }), // Will automatically open the stats page after build
  ],
  build: {
    // Set the warning limit for chunk size (in KB)
    chunkSizeWarningLimit: 2000, // Adjust this as needed (e.g., 2000KB)

    // Rollup options for manual chunking
    rollupOptions: {
      output: {
        // Dynamically split vendor (node_modules) code into separate chunks
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString();
          }
        },
      },
    },
    sourcemap: false, // Disable sourcemaps for production builds to prevent errors

    // Enable minification (terser for smaller bundle size)
    minify: 'terser', // You can choose 'esbuild' for faster minification, or 'terser' for better compression

    // Split CSS into separate files (useful for large stylesheets)
    cssCodeSplit: true,

    // Set target to the latest browser versions for better performance
    target: 'esnext',

    // Enable tree shaking to remove unused code
    treeShaking: true,

    // Enable gzip compression for faster transfers (use in conjunction with CloudFront)
    compress: true, 

    // Ensure assets are cached for long durations
    assetsDir: 'assets',
  },

  // Optimize dependencies for faster initial load
  optimizeDeps: {
    include: ['react', 'react-dom'],
    esbuildOptions: {
      target: 'esnext',
    },
  },

  // Optional: Preload important files for faster initial load
  define: {
    'process.env.NODE_ENV': '"production"',
  },

  // Server settings for local development
  server: {
    proxy: {
      '/api': 'http://localhost:5000', // Example API proxy for local dev environment
    },
  },
});