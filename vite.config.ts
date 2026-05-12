import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    // Allow connections on any host (localhost, 127.0.0.1, etc.)
    host: true,
    // Allow connections from any host (as long as the host is allowed)
    allowedHosts: ['annamaria-semipolitical-nonabsolutely.ngrok-free.dev'],
  },
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss()
  ],
})
