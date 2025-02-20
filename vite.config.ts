import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
   plugins: [react(), tsConfigPaths()],
   server: {
      host: '0.0.0.0', // Permite accesos externos
      port: 5173
   }
})
