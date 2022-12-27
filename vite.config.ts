import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// 一定要使用绝对路径,不然index省略失败
const resolve = dir => path.resolve(__dirname, dir);

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve('src'),
    },
    // extensions: ['.tsx', '.ts', '.json', '.mjs', '.js'],
  },

  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCase',
      scopeBehaviour: 'local',
      generateScopedName: 'lc__[local]___[hash:base64:5]',
      hashPrefix: 'prefix',
    },
    postcss: {},
  },
});
