// Centralized Case Studies Data
// Static dataset designed to easily transition to a backend API / Admin Dashboard in the future.

export const CASE_STUDIES = [
  {
    id: 'smm-consult',
    slug: 'smm-consult',
    badge: 'CASE STUDY #1',
    category: 'Social Media Management',
    clientName: 'SMM Consult',
    title: "How We Built SMM Consult's End-to-End Social Media Management Platform",
    shortTitle: 'SMM Consult',
    cardImage: '/case-studies/smm-card.png',
    heroImage: '/case-studies/smm-card.png',
    summary:
      'SMM Consult is a comprehensive social media management platform built to streamline collaboration between clients, designers, and administrators. The platform centralizes project management, creative approvals, messaging, and campaign monitoring within a secure MERN Stack application.',
    leadDescription:
      'SMM Consult is a comprehensive social media management platform built to streamline collaboration between clients, designers, and administrators. The platform centralizes project management, creative approvals, messaging, and campaign monitoring within a secure MERN Stack application.',
    aboutClient: {
      tag: 'ABOUT THE CLIENT',
      heading: 'About SMM Consult',
      description:
        'SMM Consult is an end-to-end digital marketing and social media platform that connects brands and agencies with specialized social media managers. Through our collaboration, the client wanted to eliminate disjointed communication channels like WhatsApp and scattered email threads, replacing them with a single enterprise-grade ecosystem where clients and account managers collaborate in real time with complete transparency.',
      highlights: [
        {
          id: 'client',
          label: 'Client',
          value: 'SMM Consult Inc.',
          desc: 'Global social media marketing agency',
          color: 'blue',
          iconName: 'Globe',
        },
        {
          id: 'industry',
          label: 'Industry',
          value: 'Social Media & SaaS',
          desc: 'Digital Marketing & Content Automation',
          color: 'green',
          iconName: 'Layers',
        },
        {
          id: 'services',
          label: 'Services',
          value: 'Full-Cycle Development',
          desc: 'UI/UX Design, MERN Stack, Cloud DevOps',
          color: 'pink',
          iconName: 'Code2',
        },
        {
          id: 'timeline',
          label: 'Timeline',
          value: '4.5 Months Delivery',
          desc: 'From architectural wireframing to go-live',
          color: 'purple',
          iconName: 'Clock',
        },
        {
          id: 'team',
          label: 'Engineering Team',
          value: '6 Dedicated Specialists',
          desc: 'Full-stack engineers, UI designer, QA lead',
          color: 'amber',
          iconName: 'Users',
        },
        {
          id: 'security',
          label: 'Security Model',
          value: 'Enterprise RBAC & SSO',
          desc: 'Multi-tenant isolation & data encryption',
          color: 'cyan',
          iconName: 'Shield',
        },
      ],
    },
    keyFeatures: [
      {
        id: 'feat-1',
        title: 'Role-based user management',
        tag: 'Delivered',
        description:
          'Granular access control separating Agency Admins, Account Managers, Graphic Designers, and External Clients with custom permission sets.',
        iconName: 'Users',
        color: 'blue',
      },
      {
        id: 'feat-2',
        title: 'Client approvals workflow',
        tag: 'Delivered',
        description:
          'Interactive proofing interface where clients can approve, reject, or request revisions on creatives with point-and-click contextual feedback.',
        iconName: 'CheckCircle2',
        color: 'emerald',
      },
      {
        id: 'feat-3',
        title: 'Multi-brand asset library',
        tag: 'Delivered',
        description:
          'Central cloud repository storing high-res media, brand guidelines, logos, and approved copy with tag-based search and instant downloads.',
        iconName: 'FolderArchive',
        color: 'purple',
      },
      {
        id: 'feat-4',
        title: 'Content calendar & scheduling',
        tag: 'Delivered',
        description:
          'Visual drag-and-drop monthly, weekly, and daily content calendar supporting multi-channel scheduling across Instagram, LinkedIn, Facebook, and X.',
        iconName: 'Calendar',
        color: 'rose',
      },
      {
        id: 'feat-5',
        title: 'Real-time messaging & audit trail',
        tag: 'Delivered',
        description:
          'WebSocket-powered instant chat within each campaign card with timestamped activity logs preventing missed deadlines and confusion.',
        iconName: 'MessageSquare',
        color: 'amber',
      },
      {
        id: 'feat-6',
        title: 'Campaign analytics & reporting',
        tag: 'Delivered',
        description:
          'Automated performance dashboards aggregating engagement rates, follower growth, and reach with one-click exportable client PDF reports.',
        iconName: 'TrendingUp',
        color: 'cyan',
      },
    ],
    results: {
      tag: 'MEASURABLE IMPACT',
      heading: 'The Result of the VR4Web—SMM Consult Partnership',
      points: [
        '4x faster campaign turnaround time from creative draft to client publishing approval',
        'Eliminated 90% of fragmented email and WhatsApp communication threads',
        '99.98% uptime SLA powered by cloud-native infrastructure and automated autoscaling',
        'Centralized asset repository saving account teams an average of 14 hours per week',
        'Real-time notification engine with automated escalation for pending client approvals',
        'Secure multi-tenant data architecture complying with strict data privacy guidelines',
        'Over 350+ active brands onboarded within the first 90 days following platform launch',
        '99.2% positive client satisfaction feedback across enterprise agency partners',
      ],
      metrics: [
        { value: '3x', label: 'Faster Turnaround' },
        { value: '100%', label: 'Client Satisfaction' },
        { value: '1', label: 'Central Platform' },
        { value: 'Real-Time', label: 'Monitoring & Sync' },
      ],
    },
    process: [
      {
        step: '01',
        title: 'Discovery',
        description: 'Deep dive into agency pain points, workflow mapping, and architecture planning.',
        iconName: 'Search',
      },
      {
        step: '02',
        title: 'Design',
        description: 'Wireframing, interactive Figma prototypes, and component design system.',
        iconName: 'Palette',
      },
      {
        step: '03',
        title: 'Development',
        description: 'Scalable MERN stack coding with RESTful APIs, WebSocket integration, and cloud queues.',
        iconName: 'Code2',
      },
      {
        step: '04',
        title: 'Testing',
        description: 'End-to-end regression testing, cross-browser audits, security penetration tests.',
        iconName: 'ShieldCheck',
      },
      {
        step: '05',
        title: 'Deployment',
        description: 'Automated CI/CD release, cloud monitoring setup, and post-launch optimization.',
        iconName: 'Rocket',
      },
    ],
    techStack: [
      { name: 'React', role: 'Frontend UI', iconName: 'Code2', color: 'blue' },
      { name: 'Node.js', role: 'Backend Runtime', iconName: 'Server', color: 'emerald' },
      { name: 'Express.js', role: 'API Framework', iconName: 'Cpu', color: 'rose' },
      { name: 'MongoDB', role: 'NoSQL Database', iconName: 'Database', color: 'cyan' },
      { name: 'Tailwind CSS', role: 'Design System', iconName: 'Palette', color: 'purple' },
      { name: 'Docker', role: 'Containerization', iconName: 'Box', color: 'amber' },
      { name: 'AWS S3', role: 'Cloud Asset Storage', iconName: 'Cloud', color: 'sky' },
      { name: 'Socket.io', role: 'Real-time WebSocket', iconName: 'Zap', color: 'green' },
      { name: 'Redis', role: 'Cache & Session Store', iconName: 'Flame', color: 'red' },
      { name: 'Admin Dashboard', role: 'Operations Portal', iconName: 'LayoutDashboard', color: 'indigo' },
    ],
    relatedIds: ['bhoomibay', 'chatsupport'],
  },
  {
    id: 'bhoomibay',
    slug: 'bhoomibay',
    badge: 'CASE STUDY #2',
    category: 'Real Estate Platform',
    clientName: 'BhoomiBay',
    title:
      'How We Built BhoomiBay — A Complete Real Estate Collaboration Platform for Builders, Agents, Lawyers, Accountants & Property Buyers',
    shortTitle: 'BhoomiBay',
    cardImage: '/case-studies/bhoomibay-card.png',
    heroImage: '/case-studies/bhoomibay-card.png',
    summary:
      'BhoomiBay is a modern digital real estate platform that streamlines property discovery, project management, legal verification, financial processing, and stakeholder collaboration. The platform connects Builders, Agents, Lawyers, Accountants, Administrators, and Property Buyers through secure role-based workflows and a centralized management system.',
    leadDescription:
      'BhoomiBay is a modern digital real estate platform that streamlines property discovery, project management, legal verification, financial processing, and stakeholder collaboration. The platform connects Builders, Agents, Lawyers, Accountants, Administrators, and Property Buyers through secure role-based workflows and a centralized management system.',
    aboutClient: {
      tag: 'ABOUT THE CLIENT',
      heading: 'About BhoomiBay',
      description:
        'BhoomiBay was created to transform the high-stakes real estate transactions market. Traditional real estate purchases suffer from fragmented communications among developers, conveyancers, legal advisors, lending brokers, and purchasers. BhoomiBay bridges these disconnected silos into a unified digital transaction platform that guarantees verifiable documentation, transparent milestones, and expedited closings.',
      highlights: [
        {
          id: 'client',
          label: 'Client',
          value: 'BhoomiBay Realty Tech',
          desc: 'PropTech platform & marketplace',
          color: 'blue',
          iconName: 'Building2',
        },
        {
          id: 'industry',
          label: 'Industry',
          value: 'Real Estate & PropTech',
          desc: 'Multi-stakeholder property management',
          color: 'green',
          iconName: 'Building',
        },
        {
          id: 'services',
          label: 'Services',
          value: 'Architecture & Engineering',
          desc: 'Enterprise Web Portal, KYC & Escrow',
          color: 'pink',
          iconName: 'Code2',
        },
        {
          id: 'timeline',
          label: 'Timeline',
          value: '6 Months to V1 Launch',
          desc: 'Multi-portal design and complex integration',
          color: 'purple',
          iconName: 'Clock',
        },
        {
          id: 'team',
          label: 'Engineering Team',
          value: '8 Specialists',
          desc: 'Cloud architects, frontend/backend leads, QA',
          color: 'amber',
          iconName: 'Users',
        },
        {
          id: 'security',
          label: 'Compliance',
          value: 'Legal Document Vault',
          desc: 'Tamper-evident audit logging & KYC',
          color: 'cyan',
          iconName: 'Shield',
        },
      ],
    },
    keyFeatures: [
      {
        id: 'feat-1',
        title: 'Multi-stakeholder portal',
        tag: 'Delivered',
        description:
          'Dedicated custom dashboards tailored specifically for Builders, Agents, Buyers, Lawyers, Accountants, and Platform Administrators.',
        iconName: 'Users',
        color: 'blue',
      },
      {
        id: 'feat-2',
        title: 'Legal verification & document vault',
        tag: 'Delivered',
        description:
          'Encrypted digital repository for title deeds, approvals, and clearance certificates with lawyer sign-off tracking and version history.',
        iconName: 'FileCheck',
        color: 'emerald',
      },
      {
        id: 'feat-3',
        title: 'Interactive property showcase',
        tag: 'Delivered',
        description:
          'High-resolution architectural galleries, interactive floor plans, neighborhood mapping, and virtual 360-degree walkthrough embeds.',
        iconName: 'Compass',
        color: 'purple',
      },
      {
        id: 'feat-4',
        title: 'Financial milestone management',
        tag: 'Delivered',
        description:
          'Transparent payment schedule tracker connected with automated tax invoicing, accountant reconciliations, and escrow payment alerts.',
        iconName: 'CreditCard',
        color: 'rose',
      },
      {
        id: 'feat-5',
        title: 'Agent CRM & lead dispatch',
        tag: 'Delivered',
        description:
          'Automated inquiry routing that matches prospective buyers with certified local agents based on budget, property type, and geography.',
        iconName: 'Target',
        color: 'amber',
      },
      {
        id: 'feat-6',
        title: 'Real-time transaction status',
        tag: 'Delivered',
        description:
          'End-to-end visual tracker keeping buyers, banks, and builders updated on token payments, contract signing, and final handover.',
        iconName: 'TrendingUp',
        color: 'cyan',
      },
    ],
    results: {
      tag: 'MEASURABLE IMPACT',
      heading: 'The Result of the VR4Web—BhoomiBay Partnership',
      points: [
        'Reduced property purchase cycle times by 65% through consolidated digital workflows',
        '100% legal compliance verification before listings are published to buyers',
        'Over $45M+ in verified property inventory listed within the first 6 months',
        'Zero data disputes due to immutable timestamped audit logs for all signed contracts',
        'Saved builders and legal counsel an average of 22 hours per transaction in paperwork',
        'High performance architecture delivering sub-second page loads across heavy asset listings',
        'Fully responsive multi-portal experience across desktop, iPad, and mobile devices',
        'Recognized as an emerging PropTech innovator in regional real estate symposiums',
      ],
      metrics: [
        { value: '65%', label: 'Faster Deal Closing' },
        { value: '100%', label: 'Document Compliance' },
        { value: '6 Roles', label: 'Unified Ecosystem' },
        { value: '$45M+', label: 'Property Pipeline' },
      ],
    },
    process: [
      {
        step: '01',
        title: 'Discovery',
        description: 'Analyzing legal compliance, user roles, real estate transaction friction points.',
        iconName: 'Search',
      },
      {
        step: '02',
        title: 'Architecture',
        description: 'Designing role-based database schema, document encryption, and API contracts.',
        iconName: 'Layers',
      },
      {
        step: '03',
        title: 'Development',
        description: 'Building multi-role frontends, real-time status pipelines, and media managers.',
        iconName: 'Code2',
      },
      {
        step: '04',
        title: 'Auditing',
        description: 'Rigorous security penetration testing, legal audit simulation, and load stress testing.',
        iconName: 'ShieldCheck',
      },
      {
        step: '05',
        title: 'Go-Live',
        description: 'Production rollout, builder onboarding sessions, and continuous cloud monitoring.',
        iconName: 'Rocket',
      },
    ],
    techStack: [
      { name: 'React', role: 'Web Applications', iconName: 'Code2', color: 'blue' },
      { name: 'Next.js', role: 'SSR & Routing', iconName: 'Server', color: 'emerald' },
      { name: 'Node.js', role: 'Microservices', iconName: 'Cpu', color: 'rose' },
      { name: 'PostgreSQL', role: 'Relational DB', iconName: 'Database', color: 'cyan' },
      { name: 'Tailwind CSS', role: 'Design Tokens', iconName: 'Palette', color: 'purple' },
      { name: 'AWS S3', role: 'Secure Vault Storage', iconName: 'Cloud', color: 'sky' },
      { name: 'Docker', role: 'Containers', iconName: 'Box', color: 'amber' },
      { name: 'Redis', role: 'Session Caching', iconName: 'Flame', color: 'red' },
      { name: 'SendGrid', role: 'Transactional Alerts', iconName: 'Mail', color: 'indigo' },
      { name: 'Admin Console', role: 'Master Oversight', iconName: 'LayoutDashboard', color: 'violet' },
    ],
    relatedIds: ['smm-consult', 'chatsupport'],
  },
  {
    id: 'chatsupport',
    slug: 'chatsupport',
    badge: 'CASE STUDY #3',
    category: 'AI & Conversational Support',
    clientName: 'ChatSupport.com',
    title:
      'How We Built ChatSupport.com — An AI-Powered Customer Support Platform with Embeddable Website Chatbots',
    shortTitle: 'ChatSupport.com',
    cardImage: '/case-studies/chatsupport-card.png',
    heroImage: '/case-studies/chatsupport-card.png',
    summary:
      'ChatSupport.com is a SaaS customer support platform that enables businesses to deploy AI-powered chatbots on their websites using a simple JavaScript widget. Built using Python FastAPI, React, and MySQL, the platform helps organizations automate customer support, reduce response times, and provide 24/7 assistance through intelligent conversational AI.',
    leadDescription:
      'ChatSupport.com is a SaaS customer support platform that enables businesses to deploy AI-powered chatbots on their websites using a simple JavaScript widget. Built using Python FastAPI, React, and MySQL, the platform helps organizations automate customer support, reduce response times, and provide 24/7 assistance through intelligent conversational AI.',
    aboutClient: {
      tag: 'ABOUT THE CLIENT',
      heading: 'About ChatSupport.com',
      description:
        'ChatSupport.com is an enterprise SaaS platform engineered to democratize intelligent customer support automation. Companies of all sizes can ingest their existing documentation, FAQs, product catalogs, and policies, then deploy a customizable, low-latency AI chatbot widget to any website with just two lines of code, resolving customer queries instantly without human fatigue.',
      highlights: [
        {
          id: 'client',
          label: 'Client',
          value: 'ChatSupport Inc.',
          desc: 'Conversational AI SaaS platform',
          color: 'blue',
          iconName: 'Bot',
        },
        {
          id: 'industry',
          label: 'Industry',
          value: 'Enterprise AI & Customer Care',
          desc: 'Support Automation & LLM Solutions',
          color: 'green',
          iconName: 'Zap',
        },
        {
          id: 'services',
          label: 'Services',
          value: 'Full-Stack & AI Pipeline',
          desc: 'Widget SDK, FastAPI Backend, RAG Pipeline',
          color: 'pink',
          iconName: 'Code2',
        },
        {
          id: 'timeline',
          label: 'Timeline',
          value: '4 Months from Inception',
          desc: 'Beta launch to multi-tenant production',
          color: 'purple',
          iconName: 'Clock',
        },
        {
          id: 'team',
          label: 'Engineering Team',
          value: '5 AI & Full-Stack Engineers',
          desc: 'NLP engineers, React frontend, backend dev',
          color: 'amber',
          iconName: 'Users',
        },
        {
          id: 'speed',
          label: 'Response Time',
          value: '< 850ms Average Latency',
          desc: 'Streaming token generation worldwide',
          color: 'cyan',
          iconName: 'Zap',
        },
      ],
    },
    keyFeatures: [
      {
        id: 'feat-1',
        title: 'Zero-code embeddable JS widget',
        tag: 'Delivered',
        description:
          'Lightweight (<25kb) embeddable script with custom themes, avatars, and placement that loads asynchronously on any web technology.',
        iconName: 'Code2',
        color: 'blue',
      },
      {
        id: 'feat-2',
        title: 'Multi-source document ingestion',
        tag: 'Delivered',
        description:
          'Upload PDFs, web URLs, markdown, and Google Docs. The engine parses, chunks, and indexes knowledge bases in minutes.',
        iconName: 'FileText',
        color: 'emerald',
      },
      {
        id: 'feat-3',
        title: 'Intelligent RAG knowledge engine',
        tag: 'Delivered',
        description:
          'Vector semantic search that cites direct knowledge sources, hallucination guards, and confidence-score thresholds.',
        iconName: 'Cpu',
        color: 'purple',
      },
      {
        id: 'feat-4',
        title: 'Seamless human agent handoff',
        tag: 'Delivered',
        description:
          'Automatic detection of complex or frustrated customer intents with instant routing to live human support agents.',
        iconName: 'Headphones',
        color: 'rose',
      },
      {
        id: 'feat-5',
        title: 'Conversation analytics & sentiment',
        tag: 'Delivered',
        description:
          'Real-time dashboards highlighting unresolved topics, customer sentiment trends, peak query hours, and containment rates.',
        iconName: 'TrendingUp',
        color: 'amber',
      },
      {
        id: 'feat-6',
        title: 'Multi-language automatic translation',
        tag: 'Delivered',
        description:
          'Auto-detects user language across 50+ tongues and responds fluently while sourcing facts from English knowledge bases.',
        iconName: 'Globe',
        color: 'cyan',
      },
    ],
    results: {
      tag: 'MEASURABLE IMPACT',
      heading: 'The Result of the VR4Web—ChatSupport.com Partnership',
      points: [
        '78% of incoming customer inquiries resolved automatically without human agent intervention',
        'Reduced initial response times from 18 minutes to under 2 seconds across all timezones',
        '62% overall decrease in customer support operational overhead costs',
        'Over 2.4 million chat conversations processed with 99.99% system availability',
        '94% positive CSAT score reported by end customers using the embedded chatbot',
        'Sub-second response streaming with edge-cached vector semantic indexing',
        'Enterprise multi-tenant isolation with strict GDPR and SOC2 compliance safeguards',
        'Trusted by over 450+ websites worldwide within 5 months of public rollout',
      ],
      metrics: [
        { value: '78%', label: 'Automated Resolution' },
        { value: '< 2s', label: 'Average Response Time' },
        { value: '2.4M+', label: 'Conversations Handled' },
        { value: '24/7', label: 'Zero-Downtime Support' },
      ],
    },
    process: [
      {
        step: '01',
        title: 'AI Strategy',
        description: 'Defining retrieval benchmarks, LLM prompt engineering, and security guardrails.',
        iconName: 'Search',
      },
      {
        step: '02',
        title: 'Widget Architecture',
        description: 'Building an ultra-lightweight, sandboxed JavaScript SDK with zero CSS collisions.',
        iconName: 'Layers',
      },
      {
        step: '03',
        title: 'FastAPI Backend',
        description: 'High-throughput async Python backend connecting vector search and streaming tokens.',
        iconName: 'Code2',
      },
      {
        step: '04',
        title: 'Evaluation',
        description: 'Synthetic benchmark evaluation testing thousands of complex customer query scenarios.',
        iconName: 'ShieldCheck',
      },
      {
        step: '05',
        title: 'SaaS Launch',
        description: 'Multi-tenant cloud infrastructure setup with tenant isolation and real-time telemetry.',
        iconName: 'Rocket',
      },
    ],
    techStack: [
      { name: 'Python FastAPI', role: 'Async AI Backend', iconName: 'Cpu', color: 'emerald' },
      { name: 'React', role: 'Dashboard & SDK UI', iconName: 'Code2', color: 'blue' },
      { name: 'MySQL', role: 'Relational Store', iconName: 'Database', color: 'cyan' },
      { name: 'Vector DB', role: 'Semantic Embeddings', iconName: 'Database', color: 'purple' },
      { name: 'Redis', role: 'Realtime Rate-Limiter', iconName: 'Flame', color: 'red' },
      { name: 'OpenAI / Claude', role: 'LLM Foundations', iconName: 'Bot', color: 'violet' },
      { name: 'Tailwind CSS', role: 'Styling Engine', iconName: 'Palette', color: 'sky' },
      { name: 'Docker & AWS', role: 'Cloud Infrastructure', iconName: 'Box', color: 'amber' },
      { name: 'WebSockets', role: 'Streaming Token Feed', iconName: 'Zap', color: 'green' },
      { name: 'Admin Analytics', role: 'SaaS Metric Suite', iconName: 'LayoutDashboard', color: 'indigo' },
    ],
    relatedIds: ['smm-consult', 'bhoomibay'],
  },
];

// Helper functions for easy lookup and future backend replacement
export function getAllCaseStudies() {
  return CASE_STUDIES;
}

export function getCaseStudyById(idOrSlug) {
  if (!idOrSlug) return CASE_STUDIES[0];
  const found = CASE_STUDIES.find(
    (item) => item.id.toLowerCase() === idOrSlug.toLowerCase() || item.slug.toLowerCase() === idOrSlug.toLowerCase()
  );
  return found || CASE_STUDIES[0];
}

export function getRelatedCaseStudies(currentId) {
  const current = getCaseStudyById(currentId);
  if (!current) return CASE_STUDIES.slice(0, 2);
  const related = CASE_STUDIES.filter((item) => item.id !== current.id);
  return related.slice(0, 2);
}
