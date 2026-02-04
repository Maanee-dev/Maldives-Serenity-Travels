
import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  path?: string;
}

/**
 * SEO Component: Orchestrates dynamic metadata for better search engine presence.
 */
const SEO: React.FC<SEOProps> = ({ title, description, image, path }) => {
  useEffect(() => {
    // 1. Update Document Title
    document.title = `${title} | Serenity Maldives`;

    // 2. Update Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    const defaultDesc = "A bespoke boutique agency crafting unrivaled journeys across the Maldivian atolls. Defined by Perspective.";
    if (metaDesc) {
      metaDesc.setAttribute('content', description || defaultDesc);
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = description || defaultDesc;
      document.head.appendChild(meta);
    }

    // 3. Handle Canonical URL
    const baseUrl = "https://maldivesserenity.com";
    const currentPath = path || window.location.pathname;
    const fullUrl = `${baseUrl}${currentPath === '/' ? '' : currentPath}`;
    
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);

    // 4. Update OpenGraph Tags for Social Sharing
    const ogTags: Record<string, string> = {
      'og:title': `${title} | Serenity Maldives`,
      'og:description': description || defaultDesc,
      'og:url': fullUrl,
      'og:image': image || 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=90&w=1200',
      'og:type': 'website'
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    // 5. Update Twitter Tags
    const twitterTags: Record<string, string> = {
      'twitter:card': 'summary_large_image',
      'twitter:title': `${title} | Serenity Maldives`,
      'twitter:description': description || defaultDesc,
      'twitter:image': image || 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=90&w=1200',
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        // Fixed: Use setAttribute for generic Element types in TS
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

  }, [title, description, image, path]);

  return null;
};

export default SEO;
