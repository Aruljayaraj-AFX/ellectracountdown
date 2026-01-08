import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  
  plugins: [react()],
  server: {
    allowedHosts: ["4b0fca4ff9de.ngrok-free.app"],   // <- your ngrok hostname
    host: true,              // allow external access
    port: 5173,              // or whatever port you use
  },
  theme: {
  extend: {
    keyframes: {
      bgSlideRightToLeft: {
        '0%': {
          transform: 'translateX(120%)',
          opacity: '0',
        },
        '100%': {
          transform: 'translateX(0)',
          opacity: '1',
        },
      },
    },
    animation: {
      bgSlideRTL: 'bgSlideRightToLeft 1.4s ease-out forwards',
    },
  },
},
});