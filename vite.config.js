import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs';
import path from 'path';

function insertManifest() {
  return {
    apply: 'build',
    enforce: 'post',
    generateBundle() {
      setTimeout(() => {
        fs.copyFileSync('manifest.json', 'dist/manifest.json');
      }, 100);
    }
  };
}

export default defineConfig({
  build: {
    sourcemap: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src')
    }
  },
  plugins: [vue(), insertManifest()],
});
