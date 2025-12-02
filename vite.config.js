import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/my_portfolio/',   // ⭐ repo 이름과 동일하게
})
