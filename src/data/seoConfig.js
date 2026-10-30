import { servicesData } from './servicesdata';
import { BLOGS } from './blogsData';
import { CASE_STUDIES } from './caseStudiesData';

export const SITE_DOMAIN = 'https://vr4web.com';
export const SITE_NAME = 'VR4Web';
export const SITE_TAGLINE = 'Effective Solutions Online';
export const DEFAULT_OG_IMAGE = `${SITE_DOMAIN}/vr4web.png`;

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_DOMAIN}/#organization`,
  name: SITE_NAME,
  legalName: 'VR4Web Digital Solutions',
  alternateName: ['VR4Web', 'VR4Web.com', 'VR4Web Australia'],
  url: SITE_DOMAIN,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_DOMAIN}/vr4web.png`,
    caption: 'VR4Web Logo',
  },
  image: `${SITE_DOMAIN}/vr4web.png`,
  description:
    'VR4Web is an elite Australian digital and software engineering firm delivering custom software, website development, mobile apps, AEO, GEO, and AI solutions.',
  slogan: SITE_TAGLINE,
  parentOrganization: {
    '@type': 'Organization',
    name: 'Niftysoft',
    url: 'https://niftysoft.com',
    sameAs: ['https://niftysoft.com', 'https://niftysoft.in'],
  },
  email: 'info@vr4web.com',
  telephone: '+61 489 986 622',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+61 489 986 622',
      contactType: 'customer service',
      areaServed: 'AU',
      availableLanguage: 'English',
    },
    {
      '@type': 'ContactPoint',
      telephone: '+91 94441 16316',
      contactType: 'technical support',
      areaServed: 'IN',
      availableLanguage: 'English',
    },
  ],
  priceRange: '$$$',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'AU',
    addressLocality: 'Melbourne',
    addressRegion: 'VIC',
  },
  areaServed: [
    { '@type': 'Country', name: 'Australia' },
    { '@type': 'City', name: 'Melbourne' },
    { '@type': 'City', name: 'Perth' },
    { '@type': 'City', name: 'Adelaide' },
    { '@type': 'City', name: 'Sydney' },
    { '@type': 'City', name: 'Brisbane' },
    { '@type': 'AdministrativeArea', name: 'Global' },
  ],
  sameAs: [
    'https://www.linkedin.com/company/vr4web',
    'https://twitter.com/vr4web',
    'https://github.com/Sanjay-niftysoft/vr4web',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'VR4Web Digital Engineering & Marketing Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'App Development',
          description: 'Native iOS, Android, and cross-platform mobile apps.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Software Application Development',
          description: 'Enterprise SaaS, custom software, and system integrations.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Web Design and Development',
          description: 'Custom web applications, Next.js, React, and corporate portals.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'E-commerce Solutions',
          description: 'Custom eCommerce, Shopify, WooCommerce, and BigCommerce architectures.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Digital Marketing & AI Optimization',
          description: 'Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), and AI SEO.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Creative Solutions',
          description: 'UI/UX design, brand identity, 3D prototyping, and creative video production.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Back Office Support',
          description: '24/7 technical maintenance, security monitoring, and backend operations.',
        },
      },
    ],
  },
};

export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_DOMAIN}/#website`,
  url: SITE_DOMAIN,
  name: SITE_NAME,
  alternateName: 'VR4Web Digital Solutions',
  description: 'Effective Solutions Online — AI Search Visibility, Custom Software & Web Development',
  publisher: {
    '@id': `${SITE_DOMAIN}/#organization`,
  },
  inLanguage: 'en-AU',
};

export const STATIC_PAGES_SEO = {
  '/': {
    title: 'Digital Solutions & Software Development Company | VR4Web',
    description:
      'VR4Web delivers high-performance website development, custom software engineering, AI search visibility (AEO/GEO), and digital marketing for growing businesses.',
    keywords:
      'digital solutions, web development company, custom software development, AEO, GEO, AI search visibility, answer engine optimization, VR4Web',
    canonical: `${SITE_DOMAIN}/`,
    ogType: 'website',
    ogImage: `${SITE_DOMAIN}/banner1.png`,
    schema: [
      WEBSITE_SCHEMA,
      ORGANIZATION_SCHEMA,
    ],
  },
  '/about': {
    title: 'About Us | Australian Digital & Software Engineering Firm | VR4Web',
    description:
      'Discover VR4Web: our mission, values, and engineering leadership delivering high-impact web design, custom software, and AI search visibility worldwide.',
    keywords:
      'about VR4Web, software engineering team, Australian digital agency, tech consulting company, digital transformation partners',
    canonical: `${SITE_DOMAIN}/about`,
    ogType: 'article',
    ogImage: `${SITE_DOMAIN}/about.png`,
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        '@id': `${SITE_DOMAIN}/about#webpage`,
        url: `${SITE_DOMAIN}/about`,
        name: 'About VR4Web',
        description:
          'Discover VR4Web: our mission, values, and engineering leadership delivering high-impact web design, custom software, and AI search visibility worldwide.',
        isPartOf: { '@id': `${SITE_DOMAIN}/#website` },
        about: { '@id': `${SITE_DOMAIN}/#organization` },
      },
    ],
  },
  '/how-we-work': {
    title: 'How We Work | Agile Engineering & Delivery Framework | VR4Web',
    description:
      'Explore VR4Web agile delivery methodology: from discovery workshops and architecture design to iterative sprints, automated QA, and continuous scaling.',
    keywords:
      'how we work, agile development process, software delivery framework, web project workflow, agile sprint methodology, VR4Web process',
    canonical: `${SITE_DOMAIN}/how-we-work`,
    ogType: 'article',
    ogImage: `${SITE_DOMAIN}/how-we-work-banner.jpg`,
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${SITE_DOMAIN}/how-we-work#webpage`,
        url: `${SITE_DOMAIN}/how-we-work`,
        name: 'How We Work — Agile Software Delivery Framework',
        description: 'Explore VR4Web agile delivery methodology from discovery to continuous scaling.',
        isPartOf: { '@id': `${SITE_DOMAIN}/#website` },
      },
    ],
  },
  '/testimonials': {
    title: 'Client Testimonials & Verified Reviews | VR4Web',
    description:
      'Read verified reviews and testimonials from founders, CTOs, and digital leaders who partnered with VR4Web for web, mobile, and custom software success.',
    keywords:
      'VR4Web reviews, client testimonials, software agency ratings, verified customer feedback, client success stories',
    canonical: `${SITE_DOMAIN}/testimonials`,
    ogType: 'website',
    ogImage: `${SITE_DOMAIN}/banner2.png`,
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${SITE_DOMAIN}/testimonials#webpage`,
        url: `${SITE_DOMAIN}/testimonials`,
        name: 'Client Testimonials & Verified Reviews | VR4Web',
        description: 'Read verified reviews and testimonials from founders and CTOs who partnered with VR4Web.',
        isPartOf: { '@id': `${SITE_DOMAIN}/#website` },
      },
    ],
  },
  '/brands-partners': {
    title: 'Brands & Strategic Technology Partners | VR4Web',
    description:
      'Explore VR4Web strategic alliances with leading cloud providers, technology platforms, and digital brands that power our scalable software solutions.',
    keywords:
      'technology partners, cloud alliances, software partner ecosystem, VR4Web brands, enterprise partnerships',
    canonical: `${SITE_DOMAIN}/brands-partners`,
    ogType: 'website',
    ogImage: `${SITE_DOMAIN}/brand.png`,
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${SITE_DOMAIN}/brands-partners#webpage`,
        url: `${SITE_DOMAIN}/brands-partners`,
        name: 'Brands & Technology Partners | VR4Web',
        description: 'Explore VR4Web strategic alliances with leading cloud providers and technology platforms.',
        isPartOf: { '@id': `${SITE_DOMAIN}/#website` },
      },
    ],
  },
  '/client': {
    title: 'Our Clients | Global Brands & Growing Enterprises | VR4Web',
    description:
      'Discover the global startups, mid-market businesses, and enterprises that trust VR4Web for mission-critical software, web apps, and digital growth.',
    keywords:
      'VR4Web clients, client portfolio, trusted software partner, enterprise client list, digital success stories',
    canonical: `${SITE_DOMAIN}/client`,
    ogType: 'website',
    ogImage: `${SITE_DOMAIN}/client/1.png`,
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${SITE_DOMAIN}/client#webpage`,
        url: `${SITE_DOMAIN}/client`,
        name: 'Our Clients | VR4Web',
        description: 'Discover the businesses and enterprises that trust VR4Web for mission-critical software.',
        isPartOf: { '@id': `${SITE_DOMAIN}/#website` },
      },
    ],
  },
  '/services': {
    title: 'Digital Engineering & Software Development Services | VR4Web',
    description:
      'Explore VR4Web full suite of digital services: mobile app development, custom software, web design, e-commerce, digital marketing (AEO/GEO), and 24/7 support.',
    keywords:
      'digital engineering services, custom software development, mobile app development, web design services, e-commerce solutions, AEO, GEO, VR4Web services',
    canonical: `${SITE_DOMAIN}/services`,
    ogType: 'website',
    ogImage: `${SITE_DOMAIN}/services.png`,
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${SITE_DOMAIN}/services#service`,
        serviceType: 'Digital Engineering & Software Development',
        provider: { '@id': `${SITE_DOMAIN}/#organization` },
        name: 'VR4Web Digital Engineering Services',
        description:
          'End-to-end digital engineering services spanning mobile applications, enterprise software, modern web platforms, e-commerce, and generative AI search optimization.',
        areaServed: { '@type': 'Country', name: 'Australia' },
      },
    ],
  },
  '/sectors': {
    title: 'Industries & Sectors We Serve | Specialized Solutions | VR4Web',
    description:
      'Tailored digital solutions and custom software for finance, healthcare, education, construction, logistics, real estate, and retail sectors.',
    keywords:
      'industry software solutions, fintech development, healthcare web design, construction tech solutions, edtech platforms, proptech development, VR4Web sectors',
    canonical: `${SITE_DOMAIN}/sectors`,
    ogType: 'website',
    ogImage: `${SITE_DOMAIN}/sector.png`,
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${SITE_DOMAIN}/sectors#webpage`,
        url: `${SITE_DOMAIN}/sectors`,
        name: 'Industries We Serve | VR4Web',
        description: 'Tailored digital solutions and software for specialized industries across Australia and globally.',
        isPartOf: { '@id': `${SITE_DOMAIN}/#website` },
      },
    ],
  },
  '/stories': {
    title: 'Case Studies & Client Success Stories | Proven Results | VR4Web',
    description:
      'Detailed case studies showing how VR4Web built bespoke software, modernized legacy systems, and scaled digital revenue for clients across industries.',
    keywords:
      'software case studies, client stories, web development case study, digital transformation results, VR4Web portfolio',
    canonical: `${SITE_DOMAIN}/stories`,
    ogType: 'website',
    ogImage: `${SITE_DOMAIN}/case-studies/smm-hero.png`,
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${SITE_DOMAIN}/stories#collection`,
        url: `${SITE_DOMAIN}/stories`,
        name: 'Case Studies & Client Success Stories | VR4Web',
        description: 'Real-world software engineering case studies and verified client outcomes from VR4Web.',
        isPartOf: { '@id': `${SITE_DOMAIN}/#website` },
      },
    ],
  },
  '/case-studies': {
    title: 'Case Studies & Client Success Stories | Proven Results | VR4Web',
    description:
      'Detailed case studies showing how VR4Web built bespoke software, modernized legacy systems, and scaled digital revenue for clients across industries.',
    keywords:
      'software case studies, client stories, web development case study, digital transformation results, VR4Web portfolio',
    canonical: `${SITE_DOMAIN}/stories`,
    ogType: 'website',
    ogImage: `${SITE_DOMAIN}/case-studies/smm-hero.png`,
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${SITE_DOMAIN}/stories#collection`,
        url: `${SITE_DOMAIN}/stories`,
        name: 'Case Studies & Client Success Stories | VR4Web',
        description: 'Real-world software engineering case studies and verified client outcomes from VR4Web.',
        isPartOf: { '@id': `${SITE_DOMAIN}/#website` },
      },
    ],
  },
  '/blogs': {
    title: 'Tech Blog, AI Insights & Software Guides | VR4Web',
    description:
      'Expert articles on mobile app architecture, e-commerce ERP/CRM integration, Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), and modern web stacks.',
    keywords:
      'tech blog, software engineering articles, mobile app development guide, AEO tips, GEO guide, ERP CRM ecommerce integration, VR4Web insights',
    canonical: `${SITE_DOMAIN}/blogs`,
    ogType: 'blog',
    ogImage: `${SITE_DOMAIN}/blogs/blogs-banner.png`,
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        '@id': `${SITE_DOMAIN}/blogs#blog`,
        url: `${SITE_DOMAIN}/blogs`,
        name: 'VR4Web Technology & Engineering Blog',
        description: 'Expert engineering insights, AI search visibility guides, and software architecture articles.',
        publisher: { '@id': `${SITE_DOMAIN}/#organization` },
      },
    ],
  },
  '/journal': {
    title: 'Tech Blog, AI Insights & Software Guides | VR4Web',
    description:
      'Expert articles on mobile app architecture, e-commerce ERP/CRM integration, Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), and modern web stacks.',
    keywords:
      'tech blog, software engineering articles, mobile app development guide, AEO tips, GEO guide, ERP CRM ecommerce integration, VR4Web insights',
    canonical: `${SITE_DOMAIN}/blogs`,
    ogType: 'blog',
    ogImage: `${SITE_DOMAIN}/blogs/blogs-banner.png`,
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        '@id': `${SITE_DOMAIN}/blogs#blog`,
        url: `${SITE_DOMAIN}/blogs`,
        name: 'VR4Web Technology & Engineering Blog',
        description: 'Expert engineering insights, AI search visibility guides, and software architecture articles.',
        publisher: { '@id': `${SITE_DOMAIN}/#organization` },
      },
    ],
  },
  '/white-paper': {
    title: 'Technology Whitepapers & Research Reports | VR4Web',
    description:
      'Download in-depth technical whitepapers on AI search indexing, spatial computing, cloud scalability, and modern software architectures from VR4Web.',
    keywords:
      'tech whitepapers, software research reports, AI search visibility research, spatial computing whitepaper, VR4Web publications',
    canonical: `${SITE_DOMAIN}/white-paper`,
    ogType: 'article',
    ogImage: `${SITE_DOMAIN}/banner1.png`,
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${SITE_DOMAIN}/white-paper#webpage`,
        url: `${SITE_DOMAIN}/white-paper`,
        name: 'Technology Whitepapers & Engineering Research | VR4Web',
        description: 'Download in-depth technical whitepapers and industry research from VR4Web.',
        isPartOf: { '@id': `${SITE_DOMAIN}/#website` },
      },
    ],
  },
  '/gallery': {
    title: 'Visual Showcase & Interactive Digital Gallery | VR4Web',
    description:
      'Explore our interactive visual gallery: high-fidelity UI/UX design concepts, 3D brand assets, mobile interfaces, and digital product designs by VR4Web.',
    keywords:
      'digital gallery, UI UX portfolio, product design showcase, 3D visual showcase, VR4Web gallery',
    canonical: `${SITE_DOMAIN}/gallery`,
    ogType: 'website',
    ogImage: `${SITE_DOMAIN}/gallery/gallery_01.jpg`,
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'ImageGallery',
        '@id': `${SITE_DOMAIN}/gallery#gallery`,
        url: `${SITE_DOMAIN}/gallery`,
        name: 'VR4Web Visual Showcase & Interactive Gallery',
        description: 'High-fidelity UI/UX design concepts and digital product snapshots.',
        isPartOf: { '@id': `${SITE_DOMAIN}/#website` },
      },
    ],
  },
  '/contact': {
    title: 'Contact Us | Consult With Senior Software Architects | VR4Web',
    description:
      'Connect with VR4Web engineering team in Melbourne, Perth, Adelaide, and Sydney. Discuss your project, request a quote, or schedule an architectural consultation.',
    keywords:
      'contact VR4Web, software consultation, hire web developers Australia, app development inquiry, get in touch VR4Web',
    canonical: `${SITE_DOMAIN}/contact`,
    ogType: 'website',
    ogImage: `${SITE_DOMAIN}/vr4web.png`,
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        '@id': `${SITE_DOMAIN}/contact#webpage`,
        url: `${SITE_DOMAIN}/contact`,
        name: 'Contact VR4Web',
        description: 'Connect with VR4Web senior digital architects and software consultants.',
        isPartOf: { '@id': `${SITE_DOMAIN}/#website` },
        mainEntity: { '@id': `${SITE_DOMAIN}/#organization` },
      },
    ],
  },
  '/enquiry': {
    title: 'Request a Quote | Free Project Scope & Consultation | VR4Web',
    description:
      'Submit your project details to receive a comprehensive scope breakdown, technology stack recommendations, and transparent cost estimates from VR4Web.',
    keywords:
      'request a quote, software project estimate, free digital consultation, web development proposal, VR4Web project inquiry',
    canonical: `${SITE_DOMAIN}/enquiry`,
    ogType: 'website',
    ogImage: `${SITE_DOMAIN}/vr4web.png`,
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        '@id': `${SITE_DOMAIN}/enquiry#webpage`,
        url: `${SITE_DOMAIN}/enquiry`,
        name: 'Project Enquiry & Scope Request | VR4Web',
        description: 'Submit your project details for an in-depth estimate and technical roadmap.',
        isPartOf: { '@id': `${SITE_DOMAIN}/#website` },
      },
    ],
  },
  '/get-a-quote': {
    title: 'Request a Quote | Free Project Scope & Consultation | VR4Web',
    description:
      'Submit your project details to receive a comprehensive scope breakdown, technology stack recommendations, and transparent cost estimates from VR4Web.',
    keywords:
      'request a quote, software project estimate, free digital consultation, web development proposal, VR4Web project inquiry',
    canonical: `${SITE_DOMAIN}/enquiry`,
    ogType: 'website',
    ogImage: `${SITE_DOMAIN}/vr4web.png`,
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        '@id': `${SITE_DOMAIN}/enquiry#webpage`,
        url: `${SITE_DOMAIN}/enquiry`,
        name: 'Project Enquiry & Scope Request | VR4Web',
        description: 'Submit your project details for an in-depth estimate and technical roadmap.',
        isPartOf: { '@id': `${SITE_DOMAIN}/#website` },
      },
    ],
  },
  '/product': {
    title: 'Turnkey Software Products & SaaS Platforms | VR4Web',
    description:
      'Discover VR4Web ready-to-deploy digital platforms, embeddable business modules, and proprietary SaaS products designed for rapid market launch.',
    keywords:
      'turnkey software products, proprietary SaaS platforms, business automation tools, embeddable software, VR4Web products',
    canonical: `${SITE_DOMAIN}/product`,
    ogType: 'website',
    ogImage: `${SITE_DOMAIN}/chatbot.png`,
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'VR4Web Enterprise Software Solutions',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Cloud-based',
        provider: { '@id': `${SITE_DOMAIN}/#organization` },
        description: 'Proprietary software platforms and embeddable modules for business automation.',
      },
    ],
  },
};

/**
 * Dynamic SEO resolver that produces complete meta tags, canonical URL,
 * Open Graph, Twitter cards, and JSON-LD schema for any route in VR4Web.
 */
export function resolveSEO(rawPathname = '/') {
  // Strip basename if passed
  let path = rawPathname.replace(/^\/demo\/vr4web/, '');
  if (!path.startsWith('/')) path = `/${path}`;
  // Strip trailing slashes unless root
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }

  // 1. Direct Static Match
  if (STATIC_PAGES_SEO[path]) {
    return {
      ...STATIC_PAGES_SEO[path],
      robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    };
  }

  // 2. Dynamic Service Category / Subservice Match: /services/:catSlug or /services/:catSlug/:subSlug
  const serviceMatch = path.match(/^\/services\/([^/]+)(?:\/([^/]+))?$/);
  if (serviceMatch) {
    const catSlug = serviceMatch[1];
    const subSlug = serviceMatch[2];

    const category = servicesData.find(c => c.slug === catSlug);
    if (category) {
      if (subSlug) {
        // Child Subservice Match
        const subService = category.subServices?.find(s => s.slug === subSlug);
        if (subService) {
          const canonicalUrl = `${SITE_DOMAIN}/services/${category.slug}/${subService.slug}`;
          const title = `${subService.name} Services | ${category.name} | VR4Web`;
          const rawDesc = subService.desc || subService.hero?.description || category.desc;
          const description = `${rawDesc.slice(0, 150).trim()}... Partner with VR4Web for high-performance engineering.`;
          const keywords = `${subService.name.toLowerCase()}, ${category.name.toLowerCase()}, ${subService.name} agency Australia, enterprise ${subService.name.toLowerCase()}, VR4Web`;

          const serviceSchema = {
            '@context': 'https://schema.org',
            '@type': 'Service',
            '@id': `${canonicalUrl}#service`,
            name: `${subService.name} — VR4Web`,
            serviceType: subService.name,
            provider: { '@id': `${SITE_DOMAIN}/#organization` },
            description: subService.desc || category.desc,
            url: canonicalUrl,
            category: category.name,
            offers: {
              '@type': 'Offer',
              priceCurrency: 'AUD',
              price: 'Contact for Quote',
              url: canonicalUrl,
            },
          };

          const breadcrumbSchema = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_DOMAIN}/` },
              { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_DOMAIN}/services` },
              { '@type': 'ListItem', position: 3, name: category.name, item: `${SITE_DOMAIN}/services/${category.slug}` },
              { '@type': 'ListItem', position: 4, name: subService.name, item: canonicalUrl },
            ],
          };

          return {
            title,
            description,
            keywords,
            canonical: canonicalUrl,
            ogType: 'service',
            ogImage: DEFAULT_OG_IMAGE,
            robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
            schema: [serviceSchema, breadcrumbSchema],
          };
        }
      }

      // Category Level Match
      const canonicalUrl = `${SITE_DOMAIN}/services/${category.slug}`;
      const title = `${category.name} Services | VR4Web Australia`;
      const description = `${(category.desc || category.hero?.description || '').slice(0, 150).trim()}... Delivered by VR4Web senior digital architects.`;
      const keywords = `${category.name.toLowerCase()}, enterprise ${category.name.toLowerCase()}, ${category.category?.toLowerCase() || ''}, digital solutions Australia, VR4Web`;

      const categorySchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${canonicalUrl}#service`,
        name: `${category.name} — VR4Web`,
        serviceType: category.name,
        provider: { '@id': `${SITE_DOMAIN}/#organization` },
        description: category.desc,
        url: canonicalUrl,
      };

      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_DOMAIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_DOMAIN}/services` },
          { '@type': 'ListItem', position: 3, name: category.name, item: canonicalUrl },
        ],
      };

      return {
        title,
        description,
        keywords,
        canonical: canonicalUrl,
        ogType: 'service',
        ogImage: DEFAULT_OG_IMAGE,
        robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
        schema: [categorySchema, breadcrumbSchema],
      };
    }
  }

  // 3. Dynamic Blog Match: /blogs/:id or /blog/:id
  const blogMatch = path.match(/^\/(?:blogs|blog)\/([^/]+)$/);
  if (blogMatch) {
    const blogId = blogMatch[1];
    const blog = BLOGS.find(b => b.id === blogId);
    if (blog) {
      const canonicalUrl = `${SITE_DOMAIN}/blogs/${blog.id}`;
      const title = `${blog.title.slice(0, 50)} | VR4Web Blog`;
      const description = (blog.excerpt || blog.title).slice(0, 155);
      const keywords = `${blog.category ? blog.category.toLowerCase() + ', ' : ''}software engineering blog, web development tips, VR4Web insights`;
      const ogImage = blog.image ? (blog.image.startsWith('http') ? blog.image : `${SITE_DOMAIN}${blog.image.startsWith('/') ? '' : '/'}${blog.image}`) : DEFAULT_OG_IMAGE;

      const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        '@id': `${canonicalUrl}#article`,
        headline: blog.title,
        description: blog.excerpt,
        image: ogImage,
        datePublished: blog.date || '2025-01-01',
        author: {
          '@type': 'Organization',
          name: blog.author || 'VR4Web Engineering Team',
          url: SITE_DOMAIN,
        },
        publisher: { '@id': `${SITE_DOMAIN}/#organization` },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl,
        },
      };

      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_DOMAIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_DOMAIN}/blogs` },
          { '@type': 'ListItem', position: 3, name: blog.title, item: canonicalUrl },
        ],
      };

      return {
        title,
        description,
        keywords,
        canonical: canonicalUrl,
        ogType: 'article',
        ogImage,
        robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
        schema: [articleSchema, breadcrumbSchema],
      };
    }
  }

  // 4. Dynamic Case Study Match: /stories/:id or /case-studies/:id
  const studyMatch = path.match(/^\/(?:stories|case-studies)\/([^/]+)$/);
  if (studyMatch) {
    const studyId = studyMatch[1];
    const study = CASE_STUDIES.find(c => c.id === studyId);
    if (study) {
      const canonicalUrl = `${SITE_DOMAIN}/stories/${study.id}`;
      const title = `${study.client || study.title.slice(0, 45)} Case Study | VR4Web`;
      const description = (study.overview || study.excerpt || study.title).slice(0, 155);
      const keywords = `${study.client ? study.client.toLowerCase() + ', ' : ''}case study, software development results, client success story, VR4Web portfolio`;
      const ogImage = study.cardImage ? (study.cardImage.startsWith('http') ? study.cardImage : `${SITE_DOMAIN}${study.cardImage.startsWith('/') ? '' : '/'}${study.cardImage}`) : DEFAULT_OG_IMAGE;

      const caseStudySchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        '@id': `${canonicalUrl}#casestudy`,
        headline: study.title,
        description: study.overview || study.excerpt,
        image: ogImage,
        publisher: { '@id': `${SITE_DOMAIN}/#organization` },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl,
        },
      };

      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_DOMAIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Case Studies', item: `${SITE_DOMAIN}/stories` },
          { '@type': 'ListItem', position: 3, name: study.title, item: canonicalUrl },
        ],
      };

      return {
        title,
        description,
        keywords,
        canonical: canonicalUrl,
        ogType: 'article',
        ogImage,
        robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
        schema: [caseStudySchema, breadcrumbSchema],
      };
    }
  }

  // 5. Default Fallback
  return {
    title: 'VR4Web | Effective Solutions Online · Software & Digital Engineering',
    description:
      'VR4Web delivers transformative digital solutions, custom software development, mobile applications, and AI search visibility optimization across Australia and globally.',
    keywords: 'VR4Web, digital solutions, software development, web development Australia, AI search visibility',
    canonical: `${SITE_DOMAIN}${path}`,
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    schema: [ORGANIZATION_SCHEMA],
  };
}

