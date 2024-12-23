import { defineConfig } from 'vite'
import { barrel } from 'vite-plugin-barrel';
import environmentPlugin from "vite-plugin-environment";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import commonjs from 'vite-plugin-commonjs'
import react from '@vitejs/plugin-react-swc';
import million from "million/compiler";
import path from "path";

export default defineConfig({
  plugins: [
    commonjs(),
    ...(process.env.NODE_ENV === "development" ? [
      barrel({ packages: ['@mui/material', '@mui/icons-material'] }),
    ] : []),
    million.vite({
      auto: true,
    }),
    react(),
    nodePolyfills({
      protocolImports: true,
    }),
    environmentPlugin("all", { prefix: "CC_" }),
  ],
  build: {
    target: "esnext",
    outDir: "build",
    minify: "terser",
    assetsInlineLimit: 0,
  },
  server: {
    hmr: false,
    proxy: {
      '/8082': 'http://localhost:80/',
    },
  },
  resolve: {
    alias: {
      "react/jsx-runtime": path.resolve(__dirname, "./lib/jsx-runtime"),
      "react/jsx-dev-runtime": path.resolve(__dirname, "./lib/jsx-dev-runtime"),
      '@': path.resolve(__dirname, './src'),
    },
  },
})
