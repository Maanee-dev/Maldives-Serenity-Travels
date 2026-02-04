import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article' | 'hotel';
  schema?: object;
}

/**
 * SEO Component: Manages document head metadata including titles, descriptions,
 * Open Graph tags, and JSON-LD schema for search engine optimization.
 */
const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  image = 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1200', 
  type = 'website',
  schema 
}) => {
  const location = useLocation();
  const fullTitle = `${title} | Serenity Maldives`;
  const canonical = `https://maldives-serenitytravels.com${location.pathname}`;

  useEffect(() => {
    document.title = fullTitle;
    
    // Update Meta Tags
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute('content', description);

    // Update Open Graph
    const setOg = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setOg('og:title', fullTitle);
    setOg('og:description', description);
    setOg('og:image', image);
    setOg('og:url', canonical);
    setOg('og:type', type);

    // Inject Schema JSON-LD
    if (schema) {
      const scriptId = 'schema-jsonld';
      // Use casting to HTMLScriptElement to satisfy TypeScript's type checking for the 'type' property
      const script = document.getElementById(scriptId) as HTMLScriptElement | null;
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
      // Clean up dynamic schema on unmount if needed
    };
  }, [fullTitle, description, image, canonical, type, schema]);

  return null;
};

export default SEO;
