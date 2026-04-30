import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const base =
  (globalThis as any).process?.env?.BASE_PATH ??
  ((globalThis as any).process?.env?.NODE_ENV === 'production'
    ? '/licensing-visualizer/'
    : '/')

export default defineConfig({
  base,
  plugins: [react()],
  server: { host: true, port: 5174 },
  build: { outDir: 'dist', sourcemap: false, target: 'es2020' },
})
