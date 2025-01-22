import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../Backend/API/wwwroot',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router'],
          quering: ['axios', 'react-query', 'react-query/devtools'],
          styling: ['@emotion/react', '@emotion/styled'],
          materialui: ['@mui/material', '@mui/icons-material'],
        },
      },
    },
  },
})
