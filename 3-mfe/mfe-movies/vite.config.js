import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        federation({
            name: 'movies',
            filename: 'moviesRemoteEntry.js',
            exposes: {
                './Movies': './src/App.jsx'
            },
            shared: ['react', 'react-dom', 'zustand']
        })
    ],
    build: {
        modulePreload: false,
        target: "esnext",
        minify: false,
        cssCodeSplit: false,
    },
})
