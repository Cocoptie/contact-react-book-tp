import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

function getPath(dir: string): string {
  return path.resolve(__dirname, dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': getPath('./src/')
    }
  }
})
