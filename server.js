
const http = require('http');
const fs = require('fs');
const path = require('path');

/**
 * Enhanced Node.js Server for Hostinger
 * Handles static assets and provides an absolute fallback to index.html for SPA routing.
 */
const port = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.tsx': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.jpeg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  // 1. Normalize path and remove query strings
  let urlPath = req.url.split('?')[0];
  
  // 2. Prevent directory traversal and handle root
  let relativePath = urlPath === '/' ? 'index.html' : urlPath.substring(1);
  let filePath = path.join(__dirname, relativePath);
  
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';

  // 3. Check if the file exists
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // 4. Fallback to index.html for SPA (React Router)
      // This ensures that /stays, /offers, etc., all serve the root entry point
      fs.readFile(path.join(__dirname, 'index.html'), (readErr, content) => {
        if (readErr) {
          res.writeHead(500);
          res.end('Critical Error: index.html not found');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
      });
    } else {
      // 5. Serve the static file (JS, CSS, Images)
      fs.readFile(filePath, (readErr, content) => {
        if (readErr) {
          res.writeHead(500);
          res.end('Error serving static file');
          return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      });
    }
  });
});

server.listen(port, () => {
  console.log(`SPA Server running at http://localhost:${port}/`);
});
