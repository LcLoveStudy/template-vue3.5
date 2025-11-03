import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  esbuild: {
    // 打包后去掉console，debugger
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },
  plugins: [
    vue(),
    vueDevTools(), // 自动引入依赖
    tailwindcss(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: './src/auto-imports.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // js和css分离
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        // 分包
        manualChunks: {
          vue: ['vue', 'pinia', 'vue-router'],
          elementPlus: ['element-plus'],
          elementIcons: ['@element-plus/icons-vue'],
        },
      },
    },
    sourcemap: false,
  },
  server: {
    // 开启局域网
    host: true,
    port: 8000,
    open: true,
    proxy: {
      '/nursingworkers': {
        target: 'http://172.16.31.108:1203', //陈
        ws: true,
        changeOrigin: true,
      },
    },
  },
})
