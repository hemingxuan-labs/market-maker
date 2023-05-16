import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': join(__dirname, './src')
            // '~element-plus': resolve(__dirname, 'node_modules/element-plus')
        }
    },
    server: {
        hmr: true,
        proxy: {
            '/market': {
                target: 'http://192.168.0.21:10088/',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/market/, 'market')
            }
        }
    }
})
