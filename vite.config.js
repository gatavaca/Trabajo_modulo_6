import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import fs from 'fs'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/Trabajo_modulo_6/' : '/',
  plugins: [
    vue(),
    {
      name: 'dev-html-rewrite',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/' || req.url === '/index.html') {
            req.url = '/index.dev.html'
          }
          next()
        })
      },
      closeBundle() {
        const distDev = path.resolve(__dirname, 'dist/index.dev.html')
        const distProd = path.resolve(__dirname, 'dist/index.html')
        const dist404 = path.resolve(__dirname, 'dist/404.html')
        if (fs.existsSync(distDev)) {
          fs.copyFileSync(distDev, distProd)
          fs.copyFileSync(distDev, dist404)
        }
        // Sincronizar automáticamente en la raíz para GitHub Pages
        const rootProd = path.resolve(__dirname, 'index.html')
        const root404 = path.resolve(__dirname, '404.html')
        const distAssets = path.resolve(__dirname, 'dist/assets')
        const rootAssets = path.resolve(__dirname, 'assets')
        if (fs.existsSync(distDev)) {
          fs.copyFileSync(distDev, rootProd)
          fs.copyFileSync(distDev, root404)
        }
        if (fs.existsSync(distAssets)) {
          fs.cpSync(distAssets, rootAssets, { recursive: true, force: true })
        }
      }
    }
  ],
  server: {
    watch: {
      ignored: [
        '**/Capturas/**',
        '**/*.docx',
        '**/*.pdf',
        '**/*.tmp',
        '**/~*'
      ]
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'index.dev.html')
    }
  }
})
