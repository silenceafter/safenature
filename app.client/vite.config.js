import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [plugin()],
    server: {
        proxy: {
            '^/weatherforecast': {
                target: 'https://localhost:7158', // Замените на http://localhost:7158, если нужно
                secure: false
            },
            '^/auth': {
                target: 'http://localhost:7058',
                secure: false
            }
        },
        port: 5173, // Порт для Vite dev server
        https: false, // Отключаем HTTPS
    }
});
