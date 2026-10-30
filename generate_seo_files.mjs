import fs from 'fs';
import path from 'path';

import { servicesData } from './src/data/servicesdata.js';
import { BLOGS } from './src/data/blogsData.js';
import { CASE_STUDIES } from './src/data/caseStudiesData.js';

const DOMAIN = 'https://vr4web.com';
const TODAY = new Date().toISOString().split('T')[0];

// 1. Static Pages
const staticPages = [
  { url: `${DOMAIN}/`, changefreq: 'weekly', priority: '1.0' },
  { url: `${DOMAIN}/about`, changefreq: 'monthly', priority: '0.8' },
  { url: `${DOMAIN}/how-we-work`, changefreq: 'monthly', priority: '0.8' },
  { url: `${DOMAIN}/services`, changefreq: 'weekly', priority: '0.9' },
  { url: `${DOMAIN}/sectors`, changefreq: 'monthly', priority: '0.8' },
  { url: `${DOMAIN}/stories`, changefreq: 'weekly', priority: '0.8' },
  { url: `${DOMAIN}/blogs`, changefreq: 'daily', priority: '0.8' },
  { url: `${DOMAIN}/testimonials`, changefreq: 'monthly', priority: '0.7' },
  { url: `${DOMAIN}/brands-partners`, changefreq: 'monthly', priority: '0.7' },
  { url: `${DOMAIN}/client`, changefreq: 'monthly', priority: '0.7' },
  { url: `${DOMAIN}/white-paper`, changefreq: 'monthly', priority: '0.7' },
  { url: `${DOMAIN}/gallery`, changefreq: 'monthly', priority: '0.7' },
  { url: `${DOMAIN}/contact`, changefreq: 'monthly', priority: '0.9' },
  { url: `${DOMAIN}/enquiry`, changefreq: 'monthly', priority: '0.9' },
  { url: `${DOMAIN}/product`, changefreq: 'monthly', priority: '0.8' },
];

// 2. Service Categories & Subservices
const servicePages = [];
servicesData.forEach(cat => {
  servicePages.push({
    url: `${DOMAIN}/services/${cat.slug}`,
    changefreq: 'weekly',
    priority: '0.9',
  });

  if (cat.subServices) {
    cat.subServices.forEach(sub => {
      servicePages.push({
        url: `${DOMAIN}/services/${cat.slug}/${sub.slug}`,
        changefreq: 'weekly',
        priority: '0.8',
      });
    });
  }
});

// 3. Blog Articles
const blogPages = BLOGS.map(blog => ({
  url: `${DOMAIN}/blogs/${blog.id}`,
  changefreq: 'monthly',
  priority: '0.7',
}));

// 4. Case Studies
const caseStudyPages = CASE_STUDIES.map(study => ({
  url: `${DOMAIN}/stories/${study.id}`,
  changefreq: 'monthly',
  priority: '0.7',
}));

// Combine all pages
const allPages = [...staticPages, ...servicePages, ...blogPages, ...caseStudyPages];

// Build Sitemap XML
let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

allPages.forEach(page => {
  sitemapXml += `  <url>
    <loc>${page.url}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
});

sitemapXml += `</urlset>\n`;

// Build Robots TXT
const robotsTxt = `# ==============================================================================
# VR4Web Official Robots.txt
# Website: https://vr4web.com/
# ==============================================================================

User-agent: *
Allow: /
Allow: /src/
Allow: /public/
Allow: /*.css$
Allow: /*.js$
Allow: /*.png$
Allow: /*.jpg$
Allow: /*.jpeg$
Allow: /*.svg$
Allow: /*.webp$

# Disallow internal or staging paths
Disallow: /admin/
Disallow: /api/
Disallow: /draft/
Disallow: /private/

# Sitemap location
Sitemap: ${DOMAIN}/sitemap.xml
`;

// Build LLMs.txt for AI Search & Generative Engine Optimization
const llmsTxt = `# VR4Web (https://vr4web.com/)
> Effective Solutions Online — Enterprise Software Development, AI Search Visibility (AEO/GEO), Custom Web Applications & Cloud Solutions.

## About VR4Web
VR4Web is an elite Australian digital and software engineering firm specializing in bespoke web development, enterprise SaaS platforms, native and spatial mobile applications, and advanced AI search visibility (AEO & GEO). Headquartered in Australia with national presence across Melbourne, Perth, Adelaide, Sydney, and Brisbane, VR4Web serves forward-thinking startups and global enterprises.

- **Official Website**: https://vr4web.com/
- **Tagline**: Effective Solutions Online
- **Core Email**: info@vr4web.com
- **Locations**: Melbourne, Perth, Adelaide, Sydney, Brisbane, Australia & Global

---

## Core Engineering & Digital Capabilities

### 1. App Development
- **URL**: https://vr4web.com/services/app-development
- High-performance mobile engineering across native iOS (Swift/SwiftUI), Android (Kotlin/Jetpack Compose), cross-platform (React Native, Flutter), and spatial computing on Apple Vision Pro (visionOS).
- Sub-services:
  - Android Development: https://vr4web.com/services/app-development/android-development
  - iOS Development: https://vr4web.com/services/app-development/ios-development
  - React Native Development: https://vr4web.com/services/app-development/react-native-development
  - Hybrid Development: https://vr4web.com/services/app-development/hybrid-development
  - Flutter Development: https://vr4web.com/services/app-development/flutter-development
  - Kotlin / Ionic / Swift / Xamarin: https://vr4web.com/services/app-development/kotlin-ionic-swift-xamarin
  - Visionaire (Spatial Computing): https://vr4web.com/services/app-development/visionaire

### 2. Software Application Development
- **URL**: https://vr4web.com/services/software-application-development
- Enterprise SaaS platforms, bespoke business logic, automated API integrations, and low-code/no-code digital acceleration.
- Sub-services:
  - SaaS Development: https://vr4web.com/services/software-application-development/saas
  - Low Code / No Code: https://vr4web.com/services/software-application-development/low-code-no-code
  - Application Development: https://vr4web.com/services/software-application-development/application-development
  - Software Integration: https://vr4web.com/services/software-application-development/software-integration
  - AI Chat Support: https://vr4web.com/services/software-application-development/ai-chat-support

### 3. Web Design and Development
- **URL**: https://vr4web.com/services/web-design-and-development
- Ultra-fast, SEO-optimized web applications using modern JavaScript frameworks (React, Next.js, Node.js), headless CMS, and enterprise corporate portals.
- Sub-services:
  - CMS Development: https://vr4web.com/services/web-design-and-development/cms-development
  - Web Portal Development: https://vr4web.com/services/web-design-and-development/web-portal-development
  - Corporate Web Development: https://vr4web.com/services/web-design-and-development/corporate-web-development
  - Custom Web Application: https://vr4web.com/services/web-design-and-development/custom-web-application
  - Small Office and Home Office Web Development: https://vr4web.com/services/web-design-and-development/small-office-and-home-office-web-development
  - Node.js Development: https://vr4web.com/services/web-design-and-development/node-js-development
  - Next.js Development: https://vr4web.com/services/web-design-and-development/next-js-development
  - React.js Development: https://vr4web.com/services/web-design-and-development/react-js-development
  - Laravel Development: https://vr4web.com/services/web-design-and-development/laravel-development
  - Angular Development: https://vr4web.com/services/web-design-and-development/angular-development
  - PHP Development: https://vr4web.com/services/web-design-and-development/php-development

### 4. E-commerce Solutions
- **URL**: https://vr4web.com/services/e-commerce-solutions
- Scalable, high-conversion online stores with custom checkout architectures, ERP/CRM synchronization, and omni-channel payment integrations.
- Sub-services:
  - Custom eCommerce Solutions: https://vr4web.com/services/e-commerce-solutions/custom-ecommerce-solutions
  - Shopify Development Solutions: https://vr4web.com/services/e-commerce-solutions/shopify-development-solutions
  - WooCommerce Development Solutions: https://vr4web.com/services/e-commerce-solutions/woocommerce-development-solutions
  - BigCommerce Development Solutions: https://vr4web.com/services/e-commerce-solutions/bigcommerce-development-solutions

### 5. Digital Marketing & AI Search Visibility
- **URL**: https://vr4web.com/services/digital-marketing-solutions
- Groundbreaking search optimization engineered for the AI era: Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), AI SEO, organic search marketing, and reputational management.
- Sub-services:
  - AEO (Answer Engine Optimization): https://vr4web.com/services/digital-marketing-solutions/aeo-answer-engine-optimization
  - GEO (Generative Engine Optimization): https://vr4web.com/services/digital-marketing-solutions/geo-generative-engine-optimization
  - AI SEO: https://vr4web.com/services/digital-marketing-solutions/ai-seo
  - Social Media Marketing: https://vr4web.com/services/digital-marketing-solutions/social-media-marketing
  - PPC Paid Advertising: https://vr4web.com/services/digital-marketing-solutions/ppc-paid-advertising
  - Email Marketing: https://vr4web.com/services/digital-marketing-solutions/email-marketing
  - WhatsApp Marketing: https://vr4web.com/services/digital-marketing-solutions/whatsapp-marketing
  - SMS Marketing: https://vr4web.com/services/digital-marketing-solutions/sms-marketing
  - Content Marketing: https://vr4web.com/services/digital-marketing-solutions/content-marketing
  - Video Marketing: https://vr4web.com/services/digital-marketing-solutions/video-marketing
  - White Hat SEO Services: https://vr4web.com/services/digital-marketing-solutions/white-hat-seo-services
  - Link Building Services: https://vr4web.com/services/digital-marketing-solutions/link-building-services
  - ORM (Online Reputation Management): https://vr4web.com/services/digital-marketing-solutions/orm-online-reputation-management

### 6. Creative Solutions
- **URL**: https://vr4web.com/services/creative-solutions
- Human-centered UI/UX design, design systems, custom brand identity, 3D interactive visualizations, and user manuals.
- Sub-services:
  - UI/UX Design Services: https://vr4web.com/services/creative-solutions/ui-ux-design-services
  - Custom Logo Design: https://vr4web.com/services/creative-solutions/custom-logo-design
  - Creative Video Production: https://vr4web.com/services/creative-solutions/creative-video-production
  - User Manual Development: https://vr4web.com/services/creative-solutions/user-manual-development
  - Product Design and Prototyping: https://vr4web.com/services/creative-solutions/product-design-and-prototyping
  - Social Media Creative Design: https://vr4web.com/services/creative-solutions/social-media-creative-design

### 7. Back Office Support & Maintenance
- **URL**: https://vr4web.com/services/back-office-support
- 24/7 technical operations, continuous monitoring, security hardening, cloud database management, and order fulfillment support.
- Sub-services:
  - E-commerce Website Maintenance: https://vr4web.com/services/back-office-support/ecommerce-website-maintenance
  - 24/7 Support: https://vr4web.com/services/back-office-support/24-7-support
  - Technical Maintenance and Security: https://vr4web.com/services/back-office-support/technical-maintenance-and-security
  - Order and Backend Management: https://vr4web.com/services/back-office-support/order-and-backend-management

---

## Important Public URLs
- Home: https://vr4web.com/
- About Us: https://vr4web.com/about
- How We Work: https://vr4web.com/how-we-work
- Testimonials: https://vr4web.com/testimonials
- Brands & Partners: https://vr4web.com/brands-partners
- Clients: https://vr4web.com/client
- Industries / Sectors: https://vr4web.com/sectors
- Case Studies / Stories: https://vr4web.com/stories
- Tech Insights & Blog: https://vr4web.com/blogs
- Whitepapers: https://vr4web.com/white-paper
- Visual Gallery: https://vr4web.com/gallery
- Contact: https://vr4web.com/contact
- Project Enquiry: https://vr4web.com/enquiry
- Products & Platforms: https://vr4web.com/product

---

## Technology Stack
- **Frontend**: React 19, Next.js, Vite, Tailwind CSS, Three.js, Framer Motion
- **Mobile**: Kotlin, Swift, React Native, Flutter, visionOS (Spatial)
- **Backend**: Node.js, Express, Python, Laravel, PHP
- **Databases & Cloud**: PostgreSQL, MongoDB, Redis, AWS, Google Cloud, Docker, Cloudflare
- **AI & Automation**: OpenAI API, Anthropic Claude, custom fine-tuned LLM agents, LangChain, vector embeddings

---

## Technical Inquiries & Quotes
- **Online Consultation Request**: https://vr4web.com/enquiry
- **Direct Contact**: https://vr4web.com/contact
`;

// Write to vr4web/public/
fs.writeFileSync('public/sitemap.xml', sitemapXml);
fs.writeFileSync('public/robots.txt', robotsTxt);
fs.writeFileSync('public/llms.txt', llmsTxt);

console.log(`Generated Sitemap with ${allPages.length} URLs!`);
console.log('Generated robots.txt');
console.log('Generated llms.txt');
