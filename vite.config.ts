import { fileURLToPath, URL } from 'node:url'
import path from "path"
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteSSR from 'vite-ssr/plugin.js'

import tailwind from "tailwindcss"
import autoprefixer from "autoprefixer"


// https://vitejs.dev/config/
export default defineConfig({
  base: `/Crm-vite/`,
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [
    viteSSR(),
    vue(),
  ],
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url)),
      "@": path.resolve(__dirname, "./src"),
    }
  }
})
