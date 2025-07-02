import { defineConfig } from 'rolldown';

export default defineConfig({
  input: 'src/index.tsx',
  output: [
    {
      dir: 'dist',
      format: 'esm',
      sourcemap: true,
    },
  ],
  external: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
  target: 'esnext',
});
