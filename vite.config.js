import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs';

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
  plugins: [vue(), insertManifest()]
});
