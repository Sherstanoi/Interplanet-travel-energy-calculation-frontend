import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    port: 3000,
    host: true,       // слушать на всех интерфейсах (IPv4 и IPv6)
    strictPort: true, // если 3000 занят, не уезжать на другой порт, а сообщить об ошибке
  },
  plugins: [react()],
})
