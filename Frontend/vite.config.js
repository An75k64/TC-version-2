import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";
import imageminPlugin from "vite-plugin-imagemin";
import { VitePWA } from "vite-plugin-pwa";

// Import PostCSS plugins using ES Module syntax
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true }),
    imageminPlugin({
      gifsicle: { interlaced: true },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 85 },
      pngquant: { quality: [0.6, 0.8] },
      svgo: {
        plugins: [{ removeViewBox: false }],
      },
    }),
    VitePWA({
      manifest: {
        name: "My App",
        short_name: "App",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ffffff",
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/cdn\.example\.com/,
            handler: "CacheFirst",
            options: {
              cacheName: "cdn-cache",
              expiration: {
                maxEntries: 50,
              },
            },
          },
        ],
      },
    }),
  ],
  build: {
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
    sourcemap: false,
  },
  css: {
    postcss: {
      plugins: [autoprefixer, cssnano],
    },
  },
});
