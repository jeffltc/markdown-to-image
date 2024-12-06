import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path from 'path'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import dts from 'vite-plugin-dts'

const resolvePath = (str: string) => path.resolve(__dirname, str)

export default defineConfig({
  base: '/',
  plugins: [react(), dts({ include: ['src/packages'] })],
  esbuild: {
    pure: ['console.log'],
    drop: ['debugger'],
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          'monaco-editor': ['@monaco-editor/react']
        },
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      },
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  server: {
    host: 'localhost',
    port: 5173,
  },
  optimizeDeps: {
    include: ['@monaco-editor/react']
  },
})
