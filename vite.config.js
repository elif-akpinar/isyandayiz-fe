import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    {
      name: 'serve-admin-panel',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/admin' || req.url === '/admin/') {
            res.writeHead(301, { Location: '/admin/index.html' });
            res.end();
            return;
          }
          if (req.url.startsWith('/admin/')) {
            const filePath = path.join(process.cwd(), 'cms-admin', req.url.replace('/admin/', ''));
            if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
              const content = fs.readFileSync(filePath);
              const ext = path.extname(filePath);
              const contentType = ext === '.html' ? 'text/html' : (ext === '.yml' ? 'text/yaml' : 'application/javascript');
              res.setHeader('Content-Type', contentType);
              res.end(content);
              return;
            }
          }
          next();
        });
      }
    }
  ],
})
