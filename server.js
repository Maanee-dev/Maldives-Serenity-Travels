const http = require('http');
const fs = require('fs');
const path = require('path');

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

// Simplified SEO Definitions
const SEO_MAP = {
  '/': {
    title: 'Serenity Maldives | Best Maldives Luxury Travel Agency',
    description: 'A boutique travel agency helping you find the perfect luxury holiday in the Maldives. Discover private islands and overwater villas.'
  },
  '/stays': {
    title: 'Maldives Luxury Resorts & Hotels | Serenity Maldives',
    description: 'Browse our list of the best luxury resorts and water villas in the Maldives. Find your perfect island hotel.'
  },
  '/offers': {
    title: 'Best Maldives Holiday Deals & Special Offers',
    description: 'Get the best travel deals in the Maldives. Exclusive honeymoon packages, early bird discounts, and seasonal offers.'
  },
  '/experiences': {
    title: 'Top Maldives Activities | Diving, Surfing & Private Tours',
    description: 'Find fun things to do in the Maldives. From whale shark tours to private dinners on the beach.'
  },
  '/stories': {
    title: 'Maldives Travel Blog | Expert Tips & Island Guides',
    description: 'Read our latest travel tips and island guides. Learn more about luxury travel and local culture in the Maldives.'
  },
  '/plan': {
    title: 'Plan Your Trip | Custom Maldives Holiday Packages',
    description: 'Let us help you plan your dream holiday. Our experts create custom Maldives itineraries just for you.'
  },
  '/about': {
    title: 'About Us | The Maldives Travel Experts',
    description: 'Serenity Maldives is a team of experts dedicated to helping you find the best luxury holidays in the Maldives.'
  },
  '/contact': {
    title: 'Contact Us | Talk to a Travel Expert',
    description: 'Contact our Maldives travel experts for help with planning your luxury holiday.'
  }
};

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
              title: `${resortName} | Best Maldives Luxury Resorts`,
              description: `Plan your stay at ${resortName} in the Maldives. Luxury water villas and island hotels booked with Serenity Travels.`
            };
          } else if (urlPath.startsWith('/stories/')) {
            const slug = urlPath.split('/').pop();
            const storyTitle = titleFromSlug(slug);
            meta = {
              title: `${storyTitle} | Maldives Travel Blog`,
              description: `Read our latest story: ${storyTitle}. Expert advice on travel, culture, and luxury in the Maldives.`
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
  console.log(`Server running at http://localhost:${port}/`);
});