import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  keywords?: string[];
  type?: 'website' | 'article' | 'hotel';
  schema?: object;
}

/**
 * Enhanced SEO Component: Manages document head metadata including titles, descriptions,
 * Open Graph tags, Twitter cards, keywords, and JSON-LD schema.
 */
const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  image = 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1200', 
  keywords = [
    'Maldives luxury travel', 'private island resorts Maldives', 'overwater villas Maldives', 
    'Maldives honeymoon packages', 'Maldives diving trips', 'bespoke Maldives travel', 
    'Serenity Maldives', 'luxury travel agency Maldives'
  ],
  type = 'website',
  schema 
}) => {
  const location = useLocation();
  const fullTitle = `${title} | Serenity Maldives`;
  const canonical = `https://maldives-serenitytravels.com${location.pathname}`;

  useEffect(() => {
    document.title = fullTitle;
    
    // Helper to set meta tags
    const setMeta = (attr: string, value: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${value}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, value);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Standard Meta Tags
    setMeta('name', 'description', description);
    setMeta('name', 'keywords', keywords.join(', '));
    setMeta('name', 'author', 'Serenity Maldives');

    // Open Graph / Facebook
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:site_name', 'Serenity Maldives');

    // Twitter Card
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', image);

    // Canonical link
    let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonical);

    // Inject Schema JSON-LD
    if (schema) {
      const scriptId = 'schema-jsonld';
      let script = document.getElementById(scriptId) as HTMLScriptElement | null;
      if (script) {
        script.textContent = JSON.stringify(schema);
      } else {
        const newScript = document.createElement('script');
        newScript.id = scriptId;
        newScript.type = 'application/ld+json';
        newScript.textContent = JSON.stringify(schema);
        document.head.appendChild(newScript);
      }
    }

    return () => {
      // Optional: Cleanup specific tags on unmount if they shouldn't persist
    };
  }, [fullTitle, description, image, canonical, type, schema, keywords]);

  return null;
};

export default SEO;
