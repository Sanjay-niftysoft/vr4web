import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

const BASE_PATH = '/demo/vr4web/'

function assetPrefixPlugin() {
  const assetRegex = /(["'`])(\/(?:[^"'`\r\n<>]+?)\.(?:png|jpg|jpeg|svg|webp|ico|gif|pdf|avif))(["'`])/gi

  return {
    name: 'asset-prefix-plugin',
    enforce: 'pre',
    transform(code, id) {
      const cleanId = id.split('?')[0]
      if (cleanId.includes('node_modules')) return
      if (/\.(jsx?|tsx?|css|html)$/i.test(cleanId)) {
        const transformed = code.replace(assetRegex, (match, p1, p2, p3) => {
          if (p2.startsWith(BASE_PATH)) return match
          const clean = p2.replace(/^\/+/, '')
          return `${p1}${BASE_PATH}${clean}${p3}`
        })
        return { code: transformed, map: null }
      }
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url) return next()

        // 1. Root redirect to base path
        if (req.url === '/' || req.url === '') {
          res.writeHead(302, { Location: BASE_PATH })
          return res.end()
        }

        // 2. Trailing slash redirect for base path
        if (req.url === '/demo/vr4web') {
          res.writeHead(302, { Location: BASE_PATH })
          return res.end()
        }

        // 3. Fallback rewrite for static assets requested without base path
        if (!req.url.startsWith(BASE_PATH) && /\.(png|jpg|jpeg|svg|webp|ico|gif|pdf|avif)(\?.*)?$/i.test(req.url)) {
          req.url = BASE_PATH + req.url.replace(/^\/+/, '')
        }

        next()
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: BASE_PATH,
  plugins: [assetPrefixPlugin(), react(), tailwindcss()],
})
