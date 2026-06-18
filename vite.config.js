import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const hmrHost = env.VITE_HMR_HOST || 'localhost';

    return {
        plugins: [
            laravel({
                input: 'resources/js/app.tsx',
                refresh: true,
            }),
            react(),
            tailwindcss(),
        ],
        server: {
            host: '0.0.0.0',
            port: 5173,
            strictPort: true,
            hmr: {
                host: hmrHost,
            },
            watch: {
                usePolling: true,
            },
        },
    };
});
