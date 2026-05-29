import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { fileURLToPath, URL } from 'node:url'

const base = '/NEERO-KIDS/'

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'vite.svg'],
      manifest: {
        name: 'НейроЛето',
        short_name: 'НейроЛето',
        description: 'Когнитивное развитие для детей 7–11 лет',
        theme_color: '#0284c7',
        background_color: '#f8fafc',
        display: 'standalone',
        orientation: 'portrait-primary',
        lang: 'ru',
        start_url: base,
        scope: base,
        icons: [
          {
            src: `${base}icon.svg`,
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: `${base}icon.svg`,
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,svg,woff2}'],
        navigateFallback: 'index.html',
        navigateFallbackDenylist: [/^\/api/],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
