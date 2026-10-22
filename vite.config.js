import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// The public address goes into the share tags in index.html: WhatsApp and
// Facebook only show the preview card when og:image is an absolute URL.
// Set VITE_SITE_URL in Vercel (or .env) once the final domain is known.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const site = (env.VITE_SITE_URL || 'https://shaikh-family-nikah.vercel.app').replace(/\/$/, '')
  return {
    plugins: [
      react(),
      { name: 'site-url', transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', site) }
    ],
    server: { port: 5175, open: true }
  }
})
