import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",  // Allows external access
    allowedHosts: ["aman", "localhost","bee3-122-163-15-51.ngrok-free.app"], // Add your hostname here
    port: 5173, // Ensure the correct port is set
  },
  resolve: {
    
    alias: {
      "@": path.resolve(__dirname, "./src"),
      
    },
  },
})
