import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ["src/setupTest.js"],
    },
    esbuild: {
      loader: "jsx",
      include: /src\/.*\.jsx?$/,
      // loader: "tsx",
      // include: /src\/.*\.[tj]sx?$/,
      exclude: [],
      jsxFactory: 'h',
      jsxFragment: 'Fragment'
    },
    assetsInclude: ['**/*.gltf'],
    // resolve: {
      // extensions: [
      //   ".mjs",
      //   ".js",
      //   ".ts",
      //   ".jsx",
      //   ".tsx",
      //   ".json",
      //   ".scss",
      //   "react"
      // ],
  // }

})