import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    resolve: {
        alias: {
            "@src/*": "src/*",
            "@typings/*": "typings/*"
        }
    },
    server: {
        port: 3000,
        open: true
    }
})