// filepath: /c:/Users/User/Desktop/MyMental/project/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Test/', // Replace with your actual repository name
});