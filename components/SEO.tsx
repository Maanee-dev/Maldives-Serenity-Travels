
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  keywords?: string[];
  type?: 'website' | 'article' | 'hotel';
  schema?: object;
  isOrganization?: boolean;
}

/**
 * Production-grade SEO Component
 * Optimized for Google indexing with structured data and canonical normalization.
 */
const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  image = 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1200', 
  keywords = [
    'Maldives luxury travel', 'private island resorts Maldives', 'overwater villas Maldives', 
    'bespoke Maldives travel', 'Maldives Serenity Travels', 'Baa Atoll Resorts', 'North Male Atoll'
  ],
  type = 'website',
  schema,
  isOrganization = false
}) => {
  const location = useLocation();
  const canonical = `https://maldives-serenitytravels.com${location.pathname === '/' ? '' : location.pathname}`;

  useEffect(() => {
    document.title = title;
    
    const setMeta = (attr: string, value: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${value}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, value);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('name', 'description', description);
    setMeta('name', 'keywords', keywords.join(', '));
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:site_name', 'Maldives Serenity Travels');
    setMeta('property', 'og:locale', 'en_US');

    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', image);

    let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonical);

    // Schema Logic
    const scriptId = 'schema-jsonld';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    
    // BreadcrumbList Schema
    const pathParts = location.pathname.split('/').filter(Boolean);
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://maldives-serenitytravels.com"
        },
        ...pathParts.map((part, i) => ({
          "@type": "ListItem",
          "position": i + 2,
          "name": part.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          "item": `https://maldives-serenitytravels.com/${pathParts.slice(0, i + 1).join('/')}`
        }))
      ]
    };

    const orgSchema = isOrganization ? {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Maldives Serenity Travels",
      "url": "https://maldives-serenitytravels.com",
      "logo": "https://maldives-serenitytravels.com/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+960-725-9060",
        "contactType": "customer service",
        "areaServed": "MV",
        "availableLanguage": ["en"]
      },
      "sameAs": [
        "https://instagram.com/maldives_serenitytravels",
        "https://wa.me/9607259060"
      ]
    } : null;

    const combinedSchema = schema ? { ...breadcrumbSchema, ...orgSchema, ...schema } : breadcrumbSchema;

    if (script) {
      script.textContent = JSON.stringify(combinedSchema);
    } else {
      const newScript = document.createElement('script');
      newScript.id = scriptId;
      newScript.type = 'application/ld+json';
      newScript.textContent = JSON.stringify(combinedSchema);
      document.head.appendChild(newScript);
    }
  }, [title, description, image, canonical, type, schema, keywords, isOrganization, location.pathname]);

  return null;
};

export default SEO;
