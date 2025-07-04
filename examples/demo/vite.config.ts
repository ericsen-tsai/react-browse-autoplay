import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), svgr(), tailwindcss()],
    base: env.VITE_DEMO_PAGE_BASE_URL,
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: true,
    },
    optimizeDeps: {
      include: ['react', 'react-dom'],
      force: true,
    },
    server: {
      fs: {
        allow: ['../..'],
      },
    },
  };
});
