import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mdPlugin from 'vite-plugin-md'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    mdPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.md'],
  },
})
