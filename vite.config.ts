import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { readFileSync } from 'fs'

// Single source of truth for the displayed version: package.json. The
// SettingsPanel renders `v${__APP_VERSION__}` so a stale hardcoded number
// can never drift from the real release.
const pkg = JSON.parse(readFileSync(path.resolve(__dirname, 'package.json'), 'utf-8'))

export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
    // ISO timestamp of the build. Embedded so the UI can prove which
    // bundle is running — when a user reports a layout bug, we can
    // verify they're on the bundle that contains the fix instead of
    // chasing phantom regressions caused by stale browser cache.
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/client'),
    },
  },
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8099',
        changeOrigin: true,
      },
      '/ws': {
        target: 'ws://localhost:8099',
        ws: true,
      },
    },
  },
})
