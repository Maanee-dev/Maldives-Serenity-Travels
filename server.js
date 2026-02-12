
const http = require('http');
const fs = require('fs');
const path = require('path');

/**
 * Enhanced Node.js SEO & SPA Server
 * 
 * Intercepts incoming requests to inject dynamic metadata into the index.html shell.
 * This ensures 'View Source' shows unique content and bots can index the site effectively.
 */
const port = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.tsx': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.jpeg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain'
};

// Optimized SEO Map with high-value keywords for Maldives luxury travel
const SEO_MAP = {
  '/': {
    title: 'Serenity Maldives | Luxury Travel Agency & Bespoke Private Island Journeys',
    description: 'The premier boutique agency for luxury Maldives travel. We curate bespoke journeys to the most exclusive private islands, overwater villas, and hidden atolls. Start your Maldivian escape here.'
  },
  '/stays': {
    title: 'Luxury Maldives Resorts & Overwater Villas | The Serenity Portfolio',
    description: 'Browse our hand-picked collection of the finest 5-star resorts in the Maldives. Filter by Atoll, transfer type, and villa style to find your perfect island sanctuary.'
  },
  '/offers': {
    title: 'Exclusive Maldives Holiday Offers 2026 | Luxury Honeymoon & Early Bird Deals',
    description: 'Unlock seasonal privileges and exclusive discounts at top-tier Maldivian resorts. Negotiated rates for honeymooners, families, and luxury seekers. Limited availability.'
  },
  '/experiences': {
    title: 'Curated Maldives Experiences | Whale Shark Safaris & Private Island Dining',
    description: 'Explore bespoke Maldivian adventures. From UNESCO Biosphere diving to private sandbank soirées, we define your unique perspective on the archipelago.'
  },
  '/stories': {
    title: 'The Serenity Journal | Maldives Travel Guides, Insights & Atoll Dispatches',
    description: 'Editorial insights into the luxury travel world of the Maldives. Read expert guides on seaplane arrivals, atoll weather, and the finest overwater architecture.'
  },
  '/plan': {
    title: 'Bespoke Maldives Holiday Planning | Personal Travel Concierge',
    description: 'Initiate your custom planning journey. Our Maldivian travel specialists curate unique itineraries tailored to your aesthetic and vision for luxury.'
  },
  '/about': {
    title: 'About Serenity Maldives | The Curators of Silent Luxury',
    description: 'Based in Addu City, Serenity Maldives is defined by perspective. Learn about our heritage and our mission to curate the silence of the Maldivian atolls.'
  },
  '/contact': {
    title: 'Contact Our Maldives Travel Specialists | Inquire for Bespoke Luxury',
    description: 'Connect with our specialists in the Maldives for expert advice on your next holiday. Available via WhatsApp, phone, or our digital inquiry channel.'
  }
};

/**
 * Helper to generate readable titles from URL slugs
 */
function titleFromSlug(slug) {
  if (!slug) return '';
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const server = http.createServer((req, res) => {
  const rawUrl = req.url || '/';
  const urlPath = rawUrl.split('?')[0];
  
  let relativePath = urlPath === '/' ? 'index.html' : urlPath.substring(1);
  const filePath = path.join(__dirname, relativePath);
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile() && !urlPath.endsWith('.html') && urlPath !== '/') {
      fs.readFile(filePath, (readErr, content) => {
        if (readErr) {
          res.writeHead(500);
          res.end('Error serving static asset');
          return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      });
    } 
    else {
      const indexPath = path.join(__dirname, 'index.html');
      fs.readFile(indexPath, 'utf-8', (readErr, html) => {
        if (readErr) {
          res.writeHead(500);
          res.end('Critical Error: index.html not found');
          return;
        }

        let meta = SEO_MAP[urlPath];

        if (!meta) {
          if (urlPath.startsWith('/stays/')) {
            const slug = urlPath.split('/').pop();
            const resortName = titleFromSlug(slug);
            meta = {
              title: `${resortName} | Luxury Overwater Villas & Beach Suites | Serenity Maldives`,
              description: `Experience ${resortName}, an iconic Maldivian sanctuary. Book bespoke stays at ${resortName} featuring private pools and butler service with Serenity Travels.`
            };
          } else if (urlPath.startsWith('/stories/')) {
            const slug = urlPath.split('/').pop();
            const storyTitle = titleFromSlug(slug);
            meta = {
              title: `${storyTitle} | The Serenity Journal Dispatch`,
              description: `Read "${storyTitle}" in our latest journal entry. Gain deep insights into Maldivian heritage, luxury aesthetics, and expert travel intelligence.`
            };
          } else {
            meta = SEO_MAP['/'];
          }
        }

        const finalHtml = html
          .replace(/__TITLE__/g, meta.title)
          .replace(/__DESCRIPTION__/g, meta.description)
          .replace(/__URL__/g, `https://maldives-serenitytravels.com${urlPath}`);

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(finalHtml, 'utf-8');
      });
    }
  });
});

server.listen(port, () => {
  console.log(`SEO-Aware Server running at http://localhost:${port}/`);
});
