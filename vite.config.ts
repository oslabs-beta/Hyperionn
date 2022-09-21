 import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
    test: {
      globals: true,
      environment: 'jsdom',
      //setupFiles: ["./src/setupTest.js"],
    },
    esbuild: {
      loader: "jsx",
      include: /src\/.*\.jsx?$/,
      exclude: [],
      jsxFactory: 'h',
      jsxFragment: 'Fragment'
    },
    assetsInclude: ['**/*.gltf'],

})