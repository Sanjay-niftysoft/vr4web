import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { resolveSEO, SITE_DOMAIN } from '../../data/seoConfig';

/**
 * Sets or creates a <meta> tag with the specified attribute (name or property)
 */
function setMetaTag(attr, attrVal, content) {
  if (!content) return;
  let element = document.head.querySelector(`meta[${attr}="${attrVal}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, attrVal);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Sets or creates a <link> tag
 */
function setLinkTag(rel, href, extraAttrs = {}) {
  if (!href) return;
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
  Object.entries(extraAttrs).forEach(([k, v]) => element.setAttribute(k, v));
}

/**
 * Updates or injects the structured data JSON-LD script
 */
function setJsonLd(schemaData) {
  let script = document.getElementById('vr4web-ldjson');
  if (!script) {
    script = document.createElement('script');
    script.id = 'vr4web-ldjson';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  const payload = Array.isArray(schemaData)
    ? {
        '@context': 'https://schema.org',
        '@graph': schemaData,
      }
    : schemaData;

  script.textContent = JSON.stringify(payload, null, 2);
}

/**
 * Universal SEO component for VR4Web
 * Seamlessly manages document head, Open Graph, Twitter cards, canonical links,
 * and JSON-LD schema across React Router navigations without external peer dependencies.
 */
export default function SEO() {
  const location = useLocation();

  useEffect(() => {
    const seo = resolveSEO(location.pathname);

    // 1. Document Title
    document.title = seo.title;

    // 2. Primary Meta Tags
    setMetaTag('name', 'description', seo.description);
    setMetaTag('name', 'keywords', seo.keywords);
    setMetaTag('name', 'robots', seo.robots);
    setMetaTag('name', 'author', 'VR4Web');
    setMetaTag('name', 'theme-color', '#E8890C');

    // 3. Open Graph Tags
    setMetaTag('property', 'og:site_name', 'VR4Web');
    setMetaTag('property', 'og:type', seo.ogType || 'website');
    setMetaTag('property', 'og:title', seo.title);
    setMetaTag('property', 'og:description', seo.description);
    setMetaTag('property', 'og:url', seo.canonical);
    setMetaTag('property', 'og:image', seo.ogImage);
    setMetaTag('property', 'og:image:secure_url', seo.ogImage);
    setMetaTag('property', 'og:image:alt', seo.title);
    setMetaTag('property', 'og:locale', 'en_AU');

    // 4. Twitter / X Cards
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:site', '@vr4web');
    setMetaTag('name', 'twitter:creator', '@vr4web');
    setMetaTag('name', 'twitter:title', seo.title);
    setMetaTag('name', 'twitter:description', seo.description);
    setMetaTag('name', 'twitter:image', seo.ogImage);
    setMetaTag('name', 'twitter:image:alt', seo.title);

    // 5. Canonical Link
    setLinkTag('canonical', seo.canonical);

    // 6. LLMs AI Search Context Link
    setLinkTag('help', `${SITE_DOMAIN}/llms.txt`, {
      type: 'text/markdown',
      title: 'VR4Web AI LLM Context',
    });

    // 7. Structured Data (JSON-LD)
    if (seo.schema) {
      setJsonLd(seo.schema);
    }
  }, [location.pathname]);

  return null;
}

