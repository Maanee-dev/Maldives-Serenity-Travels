
const http = require('http');
const fs = require('fs');
const path = require('path');

/**
 * Robust Node.js Server for Hostinger
 * Handles static files and provides a catch-all route for the SPA.
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
  // Normalize path and remove query strings
  let urlPath = req.url.split('?')[0];
  let filePath = path.join(__dirname, urlPath === '/' ? 'index.html' : urlPath);
  
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // If file not found or is a directory, fallback to index.html for SPA routing
      fs.readFile(path.join(__dirname, 'index.html'), (err, content) => {
        if (err) {
          res.writeHead(500);
          res.end('Error loading index.html');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
      });
    } else {
      // Serve the static file
      fs.readFile(filePath, (err, content) => {
        if (err) {
          res.writeHead(500);
          res.end('Error serving file');
          return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      });
    }
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
