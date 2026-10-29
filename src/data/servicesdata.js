/**
 * VR4Web Master Services Dataset
 * Contains complete data for all 7 primary service categories and their nested subservices.
 * Supports dynamic inheritance and child override for individual subservices.
 */

export const BRAND_COLORS = {
    red: '#F21D3D',
    navy: '#10264B',
    lightBlue: '#A9D4F5',
    white: '#FFFFFF',
};

export const slugify = (text = '') => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

// ─── 7 MAIN CATEGORIES WITH RICH TEN-SECTION DATASETS ───
export const servicesData = [
    // ─────────────────────────────────────────────────────────────
    // 1. APP DEVELOPMENT
    // ─────────────────────────────────────────────────────────────
    {
        id: 'app-dev',
        slug: 'app-development',
        name: 'App Development',
        category: 'Mobile & Spatial Engineering',
        tagline: 'High-Performance Mobile & Spatial App Engineering',
        desc: 'Bespoke iOS, Android, cross-platform and spatial applications engineered for ultra-fast performance, rock-solid security, and effortless user retention.',
        hero: {
            title: 'Enterprise-Grade',
            highlight: 'App Development',
            titleSuffix: 'for Global Scale.',
            description: 'We architect and build transformative mobile applications that delight millions of users. From native iOS and Android to spatial computing on Vision Pro, we deliver scalable digital experiences with zero latency.',
            bgImage: '/service.png',
            ctaPrimary: 'Get a Mobile Quote',
            ctaSecondary: 'View App Capabilities',
        },
        about: {
            badge: 'About Our Engineering',
            title: 'Architecting Mobile Experiences That Command Market Leadership',
            description: 'At VR4Web, mobile engineering isn’t just about code—it is about crafting intuitive touchpoints that elevate your brand and drive continuous business revenue. Whether launching a consumer-facing super-app or deploying mission-critical enterprise workflows, our engineers build scalable, cloud-connected mobile solutions.',
            descriptionSecondary: 'We combine human-centric UX with modular architectures (Clean Architecture, MVVM/MVI) to ensure rapid feature iteration, seamless offline capabilities, and bulletproof security compliance (OWASP MASVS, HIPAA, GDPR).',
            image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1000&q=80',
            highlights: [
                { title: 'Sub-Second Cold Starts', desc: 'Optimized binary sizes and async initialization for instant app readiness.' },
                { title: 'Offline-First Sync', desc: 'Reliable local data persistence and automatic two-way cloud reconciliation.' },
                { title: 'Enterprise Encryption', desc: 'Hardware-backed biometric auth, AES-256 local storage, and SSL certificate pinning.' },
                { title: 'Cross-Ecosystem Parity', desc: 'Unified business logic ensuring identical feature delivery across platforms.' }
            ],
            stats: [
                { label: 'Apps Launched', value: '180+' },
                { label: 'Store Rating Avg', value: '4.8★' },
                { label: 'Crash-Free Sessions', value: '99.9%' }
            ]
        },
        features: {
            badge: 'Capabilities & Innovations',
            title: 'Engineered for Performance, Scalability & Retention',
            description: 'Our mobile engineering stack encompasses everything modern mobile applications require to dominate App Store and Play Store charts.',
            items: [
                {
                    title: 'Native High-Throughput Engines',
                    description: 'Leveraging Swift and Kotlin for resource-intensive apps requiring raw graphics power, hardware acceleration, and seamless sensor integration.',
                    iconName: 'Smartphone',
                    badge: 'Native Speed',
                    points: ['Metal & Vulkan rendering', 'BLE & sensor communication', 'Sub-millisecond responsiveness']
                },
                {
                    title: 'Cross-Platform React Native & Flutter',
                    description: 'Maximize budget efficiency with unified codebases delivering true native 60fps/120fps refresh rates across both iOS and Android.',
                    iconName: 'Zap',
                    badge: '60% Cost Efficiency',
                    points: ['Shared logic modules', 'Hot reload agility', 'Native bridge optimization']
                },
                {
                    title: 'Cloud Backend & Microservices Integration',
                    description: 'Seamless connectivity to GraphQL, RESTful APIs, Firebase, AWS AppSync, and custom microservice backends.',
                    iconName: 'Server',
                    badge: 'Cloud Connected',
                    points: ['GraphQL subscriptions', 'Automated push queues', 'Fault-tolerant retries']
                },
                {
                    title: 'Spatial & Augmented Reality (Vision Pro)',
                    description: 'Pioneering immersive VisionOS and AR experiences with depth sensing, spatial audio, and hand-eye gesture interfaces.',
                    iconName: 'Eye',
                    badge: 'Spatial Computing',
                    points: ['RealityKit & ARKit', 'Spatial audio layers', 'Bespoke 3D UI canvases']
                },
                {
                    title: 'Continuous CI/CD Pipeline',
                    description: 'Automated test execution, static analysis, and multi-track TestFlight / Google Play deployment pipelines.',
                    iconName: 'GitBranch',
                    badge: 'DevOps Ready',
                    points: ['Fastlane automation', 'Zero-click store releases', 'Automated smoke testing']
                },
                {
                    title: 'Military-Grade App Security',
                    description: 'Protecting your intellectual property, API keys, and user transactions with dynamic runtime application self-protection (RASP).',
                    iconName: 'ShieldCheck',
                    badge: 'OWASP Certified',
                    points: ['Jailbreak/Root detection', 'Biometric Keychain/Keystore', 'Anti-tamper checks']
                }
            ]
        },
        process: {
            badge: 'Development Lifecycle',
            title: 'Our 5-Stage Mobile Engineering Methodology',
            description: 'From initial prototype to global app store deployment, our agile engineering process guarantees transparency, velocity, and zero surprises.',
            bgImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80',
            steps: [
                {
                    step: '01',
                    title: 'Architecture & UX Wireframing',
                    description: 'We map user journeys, state machines, and system interactions into clickable prototypes and technical architecture diagrams.',
                    deliverables: 'Interactive Figma Prototype & Technical Blueprint'
                },
                {
                    step: '02',
                    title: 'Sprint-Based Core Development',
                    description: 'Two-week agile sprints with working bi-weekly demo builds deployed to your test devices via TestFlight or Firebase App Distribution.',
                    deliverables: 'Testable Sandbox Builds & Bi-Weekly Demos'
                },
                {
                    step: '03',
                    title: 'Automated & Device QA Lab',
                    description: 'Rigorous testing across 50+ real physical handsets, covering varying screen sizes, OS versions, network throttling, and battery drain.',
                    deliverables: 'Comprehensive Device Matrix & Security Report'
                },
                {
                    step: '04',
                    title: 'App Store Launch & Approval',
                    description: 'We manage full compliance, metadata optimization, privacy disclosures, and Apple / Google reviewer back-and-forth for seamless approval.',
                    deliverables: '100% Guaranteed Store Acceptance'
                },
                {
                    step: '05',
                    title: 'Post-Launch Telemetry & Scaling',
                    description: 'Real-time crash monitoring, APM analytics, performance tuning, and phased rollout of new feature releases.',
                    deliverables: 'Crashlytics Monitoring & 24/7 SLA Support'
                }
            ]
        },
        whyChooseUs: {
            badge: 'The VR4Web Advantage',
            title: 'Why Global Brands Trust VR4Web for Mobile Applications',
            description: 'We are more than just app builders—we are technology partners dedicated to turning mobile applications into sustainable profit drivers.',
            image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1000&q=80',
            reasons: [
                {
                    title: 'Senior In-House Engineering',
                    description: 'Zero outsourced junior developers. Every line of code is written and peer-reviewed by vetted senior mobile specialists.',
                    iconName: 'Award'
                },
                {
                    title: 'Strict SLAs & Transparent Timelines',
                    description: 'Guaranteed sprint deliverables, transparent Jira tracking, and dedicated weekly technical syncs.',
                    iconName: 'Clock'
                },
                {
                    title: '100% Complete IP & Code Ownership',
                    description: 'Full repository access, non-disclosure agreements, and complete transfer of all copyright upon milestone signoff.',
                    iconName: 'FileCheck'
                },
                {
                    title: 'Obsession with Micro-Interactions',
                    description: 'Custom haptic feedback, physics-based springs, and fluid transitions that make apps memorable and addicting to use.',
                    iconName: 'Sparkles'
                }
            ],
            guarantees: ['100% IP Transfer', 'Strict NDAs', 'Crash-Free SLA', 'Dedicated PM']
        },
        techStack: {
            badge: 'Modern Technology Stack',
            title: 'Built with Modern, Battle-Tested Frameworks',
            description: 'We select the optimal toolchain to deliver unbeatable rendering speed, modular maintainability, and clean codebases.',
            categories: [
                {
                    name: 'Native Mobile',
                    items: [
                        { name: 'Swift', type: 'iOS Core', iconName: 'Apple' },
                        { name: 'Kotlin', type: 'Android Core', iconName: 'Bot' },
                        { name: 'SwiftUI', type: 'Modern iOS UI', iconName: 'Layers' },
                        { name: 'Jetpack Compose', type: 'Modern Android UI', iconName: 'Boxes' }
                    ]
                },
                {
                    name: 'Cross-Platform',
                    items: [
                        { name: 'React Native', type: 'Hybrid Framework', iconName: 'Atom' },
                        { name: 'Flutter', type: 'Google Dart UI', iconName: 'Zap' },
                        { name: 'Ionic / Capacitor', type: 'Web-to-Mobile', iconName: 'Cpu' },
                        { name: 'VisionOS', type: 'Spatial Reality', iconName: 'Glasses' }
                    ]
                },
                {
                    name: 'Backend & Cloud',
                    items: [
                        { name: 'Node.js / Express', type: 'Microservices', iconName: 'Server' },
                        { name: 'Firebase', type: 'Auth & Firestore', iconName: 'Flame' },
                        { name: 'AWS AppSync', type: 'GraphQL APIs', iconName: 'Cloud' },
                        { name: 'PostgreSQL', type: 'Relational DB', iconName: 'Database' }
                    ]
                },
                {
                    name: 'Testing & DevOps',
                    items: [
                        { name: 'Fastlane', type: 'Build Automation', iconName: 'Terminal' },
                        { name: 'TestFlight', type: 'Beta Delivery', iconName: 'Plane' },
                        { name: 'Datadog', type: 'APM Telemetry', iconName: 'Activity' },
                        { name: 'Sentry', type: 'Error Tracking', iconName: 'AlertCircle' }
                    ]
                }
            ]
        },
        industries: {
            badge: 'Domains & Verticals',
            title: 'Transforming Mobile Journeys Across Global Industries',
            description: 'Our mobile architects have designed, engineered, and maintained mission-critical applications across heavily regulated and consumer-focused verticals.',
            image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80',
            list: [
                {
                    name: 'Fintech & Digital Banking',
                    description: 'Secure mobile wallets, real-time micro-investing, biometric authentication, and PCI-DSS compliant transactions.',
                    useCase: 'Neobank applications with instant peer-to-peer transfers.'
                },
                {
                    name: 'Healthcare & Telemedicine',
                    description: 'HIPAA-compliant patient portals, remote vital diagnostics, live video consultations, and e-prescription routing.',
                    useCase: 'Telehealth apps with end-to-end encrypted video.'
                },
                {
                    name: 'On-Demand Delivery & Logistics',
                    description: 'Sub-second driver telemetry, dynamic route optimization, live GPS fleet tracking, and geofenced push alerts.',
                    useCase: 'Hyperlocal last-mile logistics routing platforms.'
                },
                {
                    name: 'E-Commerce & Quick Commerce',
                    description: 'Lightning-fast checkout, one-tap Apple Pay/Google Pay, personalized AI recommendations, and live order tracking.',
                    useCase: 'Brand flagship shopping apps with 4x conversion rates.'
                },
                {
                    name: 'EdTech & Gamified Learning',
                    description: 'Interactive bite-sized curricula, offline video downloads, real-time quiz battles, and certificate issuance.',
                    useCase: 'Adaptive language learning apps with audio recognition.'
                },
                {
                    name: 'Real Estate & PropTech',
                    description: '3D virtual property tours, AR spatial room measurements, automated tenancy onboarding, and digital leases.',
                    useCase: 'VR-enabled commercial property showcasing apps.'
                }
            ]
        },
        testimonials: {
            badge: 'Client Endorsements',
            title: 'What Enterprise Leaders Say About Our App Engineering',
            description: 'Trusted by ambitious startups and international enterprises across Australia, the US, and Asia.',
            items: [
                {
                    quote: 'VR4Web took our complex cross-platform mobile vision and shipped a rock-solid React Native application in under 4 months. Our app store rating skyrocketed from 3.6 to 4.9 within weeks of launch.',
                    author: 'David Chen',
                    role: 'VP of Product Engineering',
                    company: 'OmniPay Global Australia',
                    rating: 5,
                    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
                },
                {
                    quote: 'The team’s mastery of native iOS and SwiftUI is extraordinary. They engineered hardware-level Bluetooth synchronization that our previous agency claimed was impossible. Exceptional engineering discipline.',
                    author: 'Sarah Jenkins',
                    role: 'Chief Technology Officer',
                    company: 'Aura Health Technologies',
                    rating: 5,
                    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
                },
                {
                    quote: 'Their attention to micro-animations and zero-latency UI sets VR4Web apart. Our daily active users have increased by 240% since the redesign. Truly a tier-1 mobile development partner.',
                    author: 'Marcus Vance',
                    role: 'Head of Digital Channels',
                    company: 'SwiftCourier Logistics',
                    rating: 5,
                    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
                }
            ]
        },
        faqs: {
            badge: 'Got Questions?',
            title: 'Frequently Asked Questions About App Development',
            description: 'Clear answers to help you navigate project scoping, architecture choices, and development timelines.',
            items: [
                {
                    q: 'Should we build Native (iOS/Android) or Cross-Platform (React Native / Flutter)?',
                    a: 'It depends on your app’s performance requirements and budget. If your product requires heavy graphic processing, intricate AR, or low-level Bluetooth/hardware manipulation, native Swift and Kotlin are ideal. For 85% of commercial, e-commerce, and enterprise applications, React Native or Flutter delivers identical 60fps/120fps performance while reducing development costs and timeline by roughly 40%.'
                },
                {
                    q: 'How long does it typically take to develop and launch an application?',
                    a: 'A standard MVP (Minimum Viable Product) typically requires 8 to 12 weeks from discovery to App Store release. Complex enterprise apps with multi-role permissions, complex backend integrations, or spatial features generally require 16 to 24 weeks. We provide clear milestone timelines before any project kickoff.'
                },
                {
                    q: 'Do you assist with Apple App Store and Google Play Store approval?',
                    a: 'Yes, 100%. We handle the entire submission process, including developer account configuration, test accounts, privacy policy documentation, cryptographic compliance declarations, screenshot assets, and direct correspondence with Apple and Google review teams until approval is secured.'
                },
                {
                    q: 'Who owns the source code and intellectual property once the app is built?',
                    a: 'You own 100% of all intellectual property, source code, design files, and documentation upon project milestone payments. We transfer full Git repository ownership and do not retain proprietary lock-in.'
                },
                {
                    q: 'What kind of support and maintenance do you offer post-launch?',
                    a: 'We provide comprehensive 24/7 SLA maintenance packages covering iOS/Android new OS version updates, library upgrades, security patches, crash monitoring via Sentry/Datadog, and ongoing feature enhancements.'
                }
            ]
        },
        cta: {
            badge: 'Ready to Build?',
            title: 'Turn Your Mobile App Vision Into a Market-Dominating Reality',
            description: 'Connect with our principal mobile architects for a comprehensive 30-minute technical discovery session and architectural estimate.',
            buttonText: 'Request an App Proposal',
            secondaryButtonText: 'Schedule Technical Discovery'
        },
        subServices: [
            {
                slug: 'android-development',
                name: 'Android Development',
                desc: 'High-performance native Android applications built with Kotlin and Jetpack Compose for smartphones, tablets, foldables, and wearable ecosystems.',
                hero: {
                    title: 'Native High-Speed',
                    highlight: 'Android Development',
                    titleSuffix: 'for Billions of Devices.',
                    description: 'Harness the full power of modern Android with Kotlin Coroutines, Jetpack Compose, and Material You design. We engineer fluid, battery-efficient apps optimized across all screen form factors.'
                },
                about: {
                    title: 'Unleashing Native Android Power with Modern Kotlin Architecture',
                    description: 'Android commands over 70% of global smartphone users. We engineer custom native Android software that thrives on diversity—handling varying chipsets, RAM capacities, and screen ratios with zero compromises in speed or stability.'
                }
            },
            {
                slug: 'ios-development',
                name: 'iOS Development',
                desc: 'Impeccable native Swift & SwiftUI applications engineered exclusively for the Apple ecosystem—iPhone, iPad, Apple Watch, and Mac.',
                hero: {
                    title: 'World-Class Native',
                    highlight: 'iOS Development',
                    titleSuffix: 'for Apple Ecosystems.',
                    description: 'Leverage Swift, SwiftUI, Combine, and Metal to create stunningly fluid iPhone and iPad apps that strictly adhere to Apple Human Interface Guidelines.'
                },
                about: {
                    title: 'Mastering the iOS Ecosystem with Pure Swift Craftsmanship',
                    description: 'Apple users demand tactile perfection, lightning-fast animations, and rigorous privacy standards. Our senior iOS developers build software that feels native to the hardware, incorporating FaceID, Apple Pay, WidgetKit, and Live Activities.'
                }
            },
            {
                slug: 'react-native-development',
                name: 'React Native Development',
                desc: 'Cross-platform mobile apps with native performance, unified TypeScript codebases, and seamless over-the-air updates.',
                hero: {
                    title: 'High-Velocity',
                    highlight: 'React Native Apps',
                    titleSuffix: 'for iOS & Android.',
                    description: 'One clean TypeScript codebase powering both Apple App Store and Google Play Store with zero performance compromises using Fabric and TurboModules.'
                }
            },
            {
                slug: 'hybrid-development',
                name: 'Hybrid Development',
                desc: 'Single-codebase cross-platform solutions combining web technologies with native device APIs for rapid multi-platform reach.',
                hero: {
                    title: 'Cost-Effective',
                    highlight: 'Hybrid App Development',
                    titleSuffix: 'for Rapid Market Entry.',
                    description: 'Accelerate your go-to-market timeline with unified hybrid architectures engineered for cost efficiency, rapid iteration, and wide device compatibility.'
                }
            },
            {
                slug: 'flutter-development',
                name: 'Flutter Development',
                desc: 'Fast, fluid, multi-screen reactive applications built with Google Dart and Skia/Impeller rendering engines.',
                hero: {
                    title: 'Pixel-Perfect',
                    highlight: 'Flutter Development',
                    titleSuffix: 'Powered by Google Dart.',
                    description: 'Deliver custom UI widgets, consistent 120fps animations, and unified desktop, web, and mobile experiences from a single Flutter repository.'
                }
            },
            {
                slug: 'kotlin-ionic-swift-xamarin',
                name: 'Kotlin / Ionic / Swift / Xamarin',
                desc: 'Multi-framework modern mobile stack tailored to legacy migrations, hybrid enterprises, and specialized framework ecosystems.',
                hero: {
                    title: 'Multi-Framework',
                    highlight: 'Mobile Engineering',
                    titleSuffix: 'for Any Tech Stack.',
                    description: 'Whether modernizing legacy Xamarin architectures or migrating Cordova web assets to modern Ionic & Kotlin, our polyglot team delivers.'
                }
            },
            {
                slug: 'visionaire',
                name: 'Visionaire (Spatial Computing)',
                desc: 'Next-generation spatial computing, visionOS applications, and immersive Apple Vision Pro experiences for enterprise training and commerce.',
                hero: {
                    title: 'Next-Generation',
                    highlight: 'Visionaire Spatial Apps',
                    titleSuffix: 'for Apple Vision Pro.',
                    description: 'Step into the spatial era with volumetric 3D interfaces, RealityKit scene rendering, and intuitive gaze-and-pinch spatial navigation.'
                }
            }
        ]
    },

    // ─────────────────────────────────────────────────────────────
    // 2. SOFTWARE APPLICATION DEVELOPMENT
    // ─────────────────────────────────────────────────────────────
    {
        id: 'software-dev',
        slug: 'software-application-development',
        name: 'Software Application Development',
        category: 'Enterprise Engineering & Automation',
        tagline: 'Enterprise Cloud Architecture & Intelligent Automation',
        desc: 'Scalable SaaS platforms, custom enterprise software, workflow automation, and AI integrations engineered to eliminate operational bottlenecks and drive enterprise valuation.',
        hero: {
            title: 'Resilient Cloud &',
            highlight: 'Custom Software',
            titleSuffix: 'Engineered for Scale.',
            description: 'We design and construct mission-critical software architectures, multi-tenant SaaS platforms, and enterprise data pipelines that withstand massive traffic surges while automating complex business logic.',
            bgImage: '/service.png',
            ctaPrimary: 'Discuss Software Architecture',
            ctaSecondary: 'Explore SaaS Solutions'
        },
        about: {
            badge: 'Enterprise Architecture',
            title: 'Building Resilient Software Foundations for the Modern Enterprise',
            description: 'Off-the-shelf software often forces your company into rigid workflows that slow innovation. VR4Web engineers custom cloud software that fits your exact operational logic, integrates seamlessly with existing ERP/CRM databases, and scales elastically with zero downtime.',
            descriptionSecondary: 'From multi-tenant SaaS platforms with automated billing to internal operations portals handling millions of daily records, we implement domain-driven design, microservices, and event-driven architectures (Kafka, RabbitMQ) that guarantee high availability.',
            image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
            highlights: [
                { title: 'Elastic Cloud Scalability', desc: 'Containerized microservices on Kubernetes that auto-scale with real-time user demand.' },
                { title: 'Zero-Downtime Deployments', desc: 'Canary and blue-green CI/CD pipelines ensuring continuous 99.99% system availability.' },
                { title: 'Multi-Tenant SaaS Isolation', desc: 'Strict data partitioning, row-level security, and custom subdomain tenant routing.' },
                { title: 'Legacy Modernization', desc: 'Decomposing monolithic legacy databases into agile, API-first service layers.' }
            ],
            stats: [
                { label: 'Uptime SLA', value: '99.99%' },
                { label: 'SaaS Platforms', value: '65+' },
                { label: 'Transactions / Day', value: '10M+' }
            ]
        },
        features: {
            badge: 'Core Capabilities',
            title: 'Architected for High Throughput & Unshakable Security',
            description: 'Our software engineering protocols follow enterprise best practices to ensure your platform remains maintainable, secure, and performant.',
            items: [
                {
                    title: 'Custom SaaS Architecture',
                    description: 'Multi-tenant cloud platforms with Stripe/Paddle subscription billing, tiered user permissions, and custom tenant provisioning.',
                    iconName: 'Cloud',
                    badge: 'SaaS Ready',
                    points: ['Multi-tenant isolation', 'Automated metered billing', 'Self-service admin consoles']
                },
                {
                    title: 'Microservices & Event-Driven APIs',
                    description: 'Decoupled services using gRPC, REST, and Apache Kafka for asynchronous event streaming and extreme horizontal scalability.',
                    iconName: 'Network',
                    badge: 'High Throughput',
                    points: ['Kafka/RabbitMQ queues', 'gRPC high-speed RPC', 'Stateless worker pools']
                },
                {
                    title: 'AI & LLM Workflow Automation',
                    description: 'Embedding generative AI, private LLMs, vector search, and autonomous agent loops directly into business workflows.',
                    iconName: 'BrainCircuit',
                    badge: 'AI Powered',
                    points: ['RAG vector databases', 'Automated classification', 'Intelligent copilot tools']
                },
                {
                    title: 'ERP & CRM System Bridges',
                    description: 'Bi-directional real-time data sync with Salesforce, SAP, NetSuite, HubSpot, and proprietary legacy databases.',
                    iconName: 'Binary',
                    badge: 'Zero Data Silos',
                    points: ['Two-way conflict resolution', 'Webhook ingestion engines', 'Audit log validation']
                },
                {
                    title: 'Low-Code / Rapid Prototyping',
                    description: 'Accelerate enterprise tooling and internal portals with modern low-code accelerators without sacrificing custom extensibility.',
                    iconName: 'Sliders',
                    badge: '3x Faster Delivery',
                    points: ['Retool & custom hybrids', 'Role-based dashboards', 'Instant CRUD generators']
                },
                {
                    title: 'SOC2 & ISO 27001 Compliance Ready',
                    description: 'Data encryption at rest and in transit, comprehensive audit logging, vulnerability testing, and role-based access control.',
                    iconName: 'Shield',
                    badge: 'Enterprise Security',
                    points: ['RBAC & ABAC permissions', 'Immutable audit trails', 'Vulnerability scanning']
                }
            ]
        },
        process: {
            badge: 'Development Process',
            title: 'Our Proven Enterprise Software Delivery Framework',
            description: 'A disciplined software development lifecycle engineered to manage complexity and guarantee delivery on time and on budget.',
            bgImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
            steps: [
                {
                    step: '01',
                    title: 'Domain Modeling & Architecture Scoping',
                    description: 'We dissect your business logic, data models, entity relationships, and compliance constraints into a formal technical design document.',
                    deliverables: 'Architecture Document & Database Schema'
                },
                {
                    step: '02',
                    title: 'API-First Backend & Database Setup',
                    description: 'Constructing robust database schemas, indexing strategies, authentication layers (OAuth2/SAML), and core service contracts.',
                    deliverables: 'Swagger/OpenAPI Specs & Migration Scripts'
                },
                {
                    step: '03',
                    title: 'Frontend Portal & Interface Engineering',
                    description: 'Building responsive, reactive web dashboards with Next.js/React featuring real-time data tables, chart visualization, and state machines.',
                    deliverables: 'Full-Fledged Admin & User Portals'
                },
                {
                    step: '04',
                    title: 'Automated CI/CD & Security Hardening',
                    description: 'Rigorous unit, integration, and load testing simulating 10,000+ concurrent requests alongside OWASP vulnerability assessments.',
                    deliverables: 'JMeter Load Test & Security Penetration Report'
                },
                {
                    step: '05',
                    title: 'Cloud Orchestration & 24/7 Monitoring',
                    description: 'Production deployment to AWS/GCP with automated failover, Prometheus metrics, Grafana dashboards, and round-the-clock on-call support.',
                    deliverables: 'Live Deployment & Grafana Dashboard Access'
                }
            ]
        },
        whyChooseUs: {
            badge: 'The VR4Web Advantage',
            title: 'Why CTOs and Enterprise Leaders Partner with Us',
            description: 'We bridge business acumen with deep software engineering rigor to build systems that last decades, not quarters.',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
            reasons: [
                {
                    title: 'Deep Architectural Mastery',
                    description: 'Our software leads bring 12+ years of experience designing multi-million dollar cloud systems for high-growth tech companies.',
                    iconName: 'Cpu'
                },
                {
                    title: 'Clean, Documented Codebases',
                    description: 'Strict linting, automated test coverage above 85%, and modular architectural patterns that make onboarding future devs effortless.',
                    iconName: 'FileCode2'
                },
                {
                    title: 'Cloud Cost Optimization',
                    description: 'We architect serverless and containerized systems that keep cloud infrastructure bills minimal while handling spikes with ease.',
                    iconName: 'TrendingDown'
                },
                {
                    title: 'Transparent Sprint Metrics',
                    description: 'Live burndown charts, real-time staging environments, and weekly stakeholder demos keep you in complete control.',
                    iconName: 'CheckCircle'
                }
            ],
            guarantees: ['SOC2 Readiness', '85%+ Test Coverage', 'Clean Architecture', 'Zero Vendor Lock-in']
        },
        techStack: {
            badge: 'Enterprise Stack',
            title: 'Modern Cloud, Backend, and Database Technologies',
            description: 'We select the right tool for the job—balancing bleeding-edge performance with enterprise-grade reliability.',
            categories: [
                {
                    name: 'Backend Core',
                    items: [
                        { name: 'Node.js / NestJS', type: 'TypeScript API', iconName: 'Server' },
                        { name: 'Python / FastAPI', type: 'Data & AI Services', iconName: 'Terminal' },
                        { name: 'Go (Golang)', type: 'High-Concurrency Services', iconName: 'Cpu' },
                        { name: 'Java / Spring Boot', type: 'Enterprise Systems', iconName: 'Boxes' }
                    ]
                },
                {
                    name: 'Frontend Portals',
                    items: [
                        { name: 'React.js', type: 'Reactive UI', iconName: 'Atom' },
                        { name: 'Next.js 15', type: 'Server-Side Rendering', iconName: 'Rocket' },
                        { name: 'TypeScript', type: 'Strict Typing', iconName: 'Code' },
                        { name: 'Tailwind CSS', type: 'Design System', iconName: 'Palette' }
                    ]
                },
                {
                    name: 'Databases & Queues',
                    items: [
                        { name: 'PostgreSQL', type: 'Relational ACID', iconName: 'Database' },
                        { name: 'MongoDB', type: 'Document Store', iconName: 'HardDrive' },
                        { name: 'Redis', type: 'In-Memory Cache', iconName: 'Zap' },
                        { name: 'Apache Kafka', type: 'Event Streaming', iconName: 'Activity' }
                    ]
                },
                {
                    name: 'Cloud & Infrastructure',
                    items: [
                        { name: 'Amazon Web Services', type: 'Cloud Compute', iconName: 'Cloud' },
                        { name: 'Docker & Kubernetes', type: 'Containerization', iconName: 'Box' },
                        { name: 'Terraform', type: 'Infrastructure as Code', iconName: 'FileCode' },
                        { name: 'GitHub Actions', type: 'Automated CI/CD', iconName: 'GitBranch' }
                    ]
                }
            ]
        },
        industries: {
            badge: 'Sectors We Power',
            title: 'Custom Enterprise Software Tailored to Specific Industries',
            description: 'We architect software platforms that solve domain-specific compliance, transaction volume, and operational challenges.',
            image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80',
            list: [
                {
                    name: 'Banking & Financial Services',
                    description: 'Automated loan origination engines, algorithmic risk calculation, and real-time fraud detection systems.',
                    useCase: 'SaaS compliance portal processing $400M in monthly transactions.'
                },
                {
                    name: 'Supply Chain & Manufacturing',
                    description: 'IoT telemetry ingestion, automated purchase order generation, and dynamic predictive maintenance dashboards.',
                    useCase: 'Warehouse management platform with barcode scanning integration.'
                },
                {
                    name: 'HRTech & Talent Platforms',
                    description: 'Automated candidate screening pipelines, payroll calculation engines, and multi-currency contractor disbursement.',
                    useCase: 'Global contractor onboarding platform supporting 45 countries.'
                },
                {
                    name: 'PropTech & Asset Management',
                    description: 'Commercial lease management, automated tenant billing, and predictive energy consumption analytics.',
                    useCase: 'Multi-tenant commercial property operations portal.'
                },
                {
                    name: 'LegalTech & Compliance',
                    description: 'Secure document vaults, automated redlining with LLMs, and cryptographic chain-of-custody audit logs.',
                    useCase: 'Enterprise contract lifecycle management platform.'
                },
                {
                    name: 'SaaS B2B Marketplaces',
                    description: 'Multi-vendor commerce, automated escrow payouts, seller analytics, and localized tax calculation engines.',
                    useCase: 'Wholesale B2B industrial equipment marketplace.'
                }
            ]
        },
        testimonials: {
            badge: 'Client Validation',
            title: 'Proven Track Record with High-Growth Technology Leaders',
            description: 'Hear directly from enterprise product owners whose core business runs on software built by VR4Web.',
            items: [
                {
                    quote: 'VR4Web architected our multi-tenant SaaS platform from scratch. When our user base jumped 800% after our Series A announcement, the infrastructure didn’t flinch once. Simply incredible engineering quality.',
                    author: 'Alexander Wright',
                    role: 'Founder & CEO',
                    company: 'CloudMetrics Solutions US',
                    rating: 5,
                    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
                },
                {
                    quote: 'The automated workflow integration they built between our legacy ERP and Salesforce saved our operations team over 30 hours per week in manual reconciliation. Their code is clean, documented, and resilient.',
                    author: 'Priya Sharma',
                    role: 'Director of Technology',
                    company: 'Apex Logistics International',
                    rating: 5,
                    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
                },
                {
                    quote: 'Their proactive approach to security and compliance enabled us to pass our SOC2 Type II audit on our very first attempt. VR4Web isn’t an agency; they are an elite engineering department.',
                    author: 'Julian Meyer',
                    role: 'Chief Information Security Officer',
                    company: 'FinGuard Technologies',
                    rating: 5,
                    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80'
                }
            ]
        },
        faqs: {
            badge: 'Technical Inquiries',
            title: 'Frequently Asked Questions About Software Development',
            description: 'Everything you need to know about engaging our enterprise software engineering team.',
            items: [
                {
                    q: 'How do you ensure multi-tenant security in custom SaaS architectures?',
                    a: 'We implement rigorous multi-tenant data isolation using either schema-per-tenant, database-per-tenant, or partitioned row-level security (RLS) with encrypted tenant keys. Every request is verified via cryptographically signed JWT tokens carrying tenant context, ensuring zero risk of cross-tenant data leakage.'
                },
                {
                    q: 'Can you modernize our existing legacy monolithic software without full downtime?',
                    a: 'Yes. We frequently execute the "Strangler Fig" migration pattern. We place an API gateway in front of your legacy system and gradually peel off specific business capabilities into modern microservices one by one. This delivers immediate business value without the catastrophic risk of a massive "big-bang" rewrite.'
                },
                {
                    q: 'What cloud providers do you build on?',
                    a: 'We specialize in AWS, Google Cloud Platform (GCP), and Microsoft Azure. We manage infrastructure as code using Terraform and Ansible, making your cloud deployments fully automated, reproducible, and portable.'
                },
                {
                    q: 'How does VR4Web handle intellectual property and source code?',
                    a: 'All intellectual property, proprietary algorithms, database schemas, and source code belong 100% to you. We provide live Git repository access from day one of sprint execution.'
                },
                {
                    q: 'What happens after the software is deployed to production?',
                    a: 'We offer continuous SLA-backed DevOps support, automated vulnerability patching, database optimization, and scalable team augmentation to help you roll out future roadmap features.'
                }
            ]
        },
        cta: {
            badge: 'Scale Your Infrastructure',
            title: 'Ready to Build Software That Drives Unstoppable Business Value?',
            description: 'Schedule a technical architecture review with our principal software architects today.',
            buttonText: 'Schedule Architecture Review',
            secondaryButtonText: 'View Software Case Studies'
        },
        subServices: [
            {
                slug: 'saas',
                name: 'SaaS Development',
                desc: 'Scalable multi-tenant cloud software products engineered for recurring revenue, high retention, and zero downtime.',
                hero: {
                    title: 'High-Growth',
                    highlight: 'SaaS Platforms',
                    titleSuffix: 'Engineered for Scale.',
                    description: 'Launch multi-tenant cloud software with automated billing, self-service user onboarding, granular role permissions, and enterprise-grade security.'
                }
            },
            {
                slug: 'low-code-no-code',
                name: 'Low Code / No Code',
                desc: 'Rapid prototyping and accelerated enterprise tooling to deploy internal portals and workflows in record time.',
                hero: {
                    title: 'Accelerated',
                    highlight: 'Low Code Solutions',
                    titleSuffix: 'for Fast Enterprise Tooling.',
                    description: 'Cut development time by 60% without sacrificing custom API integrations or enterprise security controls.'
                }
            },
            {
                slug: 'application-development',
                name: 'Application Development',
                desc: 'Bespoke corporate architecture, operational portals, and workflow engines tailored to your exact business rules.',
                hero: {
                    title: 'Custom Enterprise',
                    highlight: 'Application Development',
                    titleSuffix: 'Tailored to Your Operations.',
                    description: 'Eliminate manual bottlenecks with custom corporate web applications built on resilient microservices and relational cloud databases.'
                }
            },
            {
                slug: 'software-integration',
                name: 'Software Integration',
                desc: 'Seamless API, CRM, ERP, and database bridges connecting your entire modern enterprise stack with zero data loss.',
                hero: {
                    title: 'Seamless Enterprise',
                    highlight: 'Software Integration',
                    titleSuffix: 'Bridging Your Entire Stack.',
                    description: 'Connect SAP, Salesforce, HubSpot, Stripe, and legacy databases into unified, real-time automated data pipelines.'
                }
            },
            {
                slug: 'ai-chat-support',
                name: 'AI Chat Support',
                desc: 'Intelligent conversational agents, LLM customer workflows, and RAG-powered automated support systems.',
                hero: {
                    title: 'Intelligent Conversational',
                    highlight: 'AI Chat Support',
                    titleSuffix: 'Trained on Your Knowledge Base.',
                    description: 'Automate 80% of routine customer queries with custom LLM agents connected securely to your internal documentation and real-time CRM.'
                }
            }
        ]
    },

    // ─────────────────────────────────────────────────────────────
    // 3. WEB DESIGN AND DEVELOPMENT
    // ─────────────────────────────────────────────────────────────
    {
        id: 'web-dev',
        slug: 'web-design-and-development',
        name: 'Web Design and Development',
        category: 'Full-Stack Web Engineering & Portals',
        tagline: 'High-Converting Web Experiences & High-Performance Portals',
        desc: 'Award-winning web design and full-stack engineering. We build lightning-fast web applications, corporate websites, headless CMS systems, and client portals that rank top on Google and convert visitors into loyal clients.',
        hero: {
            title: 'World-Class',
            highlight: 'Web Design & Development',
            titleSuffix: 'That Converts.',
            description: 'We blend aesthetic perfection with high-performance web engineering. Ultra-fast page loads, Core Web Vitals mastery, and immersive micro-animations designed to turn casual visitors into high-value clients.',
            bgImage: '/service.png',
            ctaPrimary: 'Request a Web Quote',
            ctaSecondary: 'Explore Web Portfolio'
        },
        about: {
            badge: 'Engineering Excellence',
            title: 'Crafting Digital Frontdoors That Elevate Brands and Drive Revenue',
            description: 'Your website is the single most critical commercial asset your business owns. At VR4Web, we reject generic cookie-cutter templates. We craft bespoke digital experiences from the ground up, combining clean code with conversion-focused UX to deliver undeniable market authority.',
            descriptionSecondary: 'Every website we engineer achieves 90+ Google PageSpeed scores, complies with strict WCAG accessibility guidelines, and features structured semantic data for dominant organic search visibility.',
            image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
            highlights: [
                { title: 'Sub-Second Page Loads', desc: 'Pre-rendered static assets, edge caching, and modern AVIF/WebP image optimization.' },
                { title: 'Technical SEO Built-In', desc: 'JSON-LD schema markup, canonical structures, and perfect semantic heading hierarchies.' },
                { title: 'Fluid Multi-Device Responsive', desc: 'Meticulously tested across 320px mobile viewports up to 4K ultra-wide desktop monitors.' },
                { title: 'Headless CMS Flexibility', desc: 'Empower your marketing team with intuitive content management while keeping code blazing fast.' }
            ],
            stats: [
                { label: 'Websites Launched', value: '350+' },
                { label: 'Avg PageSpeed Score', value: '98/100' },
                { label: 'Conversion Lift Avg', value: '+68%' }
            ]
        },
        features: {
            badge: 'Core Web Capabilities',
            title: 'Everything You Need for a Market-Dominating Web Presence',
            description: 'Our full-stack web engineering team builds sophisticated web platforms combining aesthetic brilliance with rock-solid stability.',
            items: [
                {
                    title: 'Custom Responsive Web Engineering',
                    description: 'Tailored pixel-perfect UI tailored to your brand identity, built with modern React, Next.js, and clean Tailwind CSS.',
                    iconName: 'Layout',
                    badge: 'Bespoke UI',
                    points: ['Pixel-perfect Figma fidelity', 'Dynamic component libraries', 'No bloatware plugins']
                },
                {
                    title: 'Server-Side Rendering & Edge Delivery',
                    description: 'Harness Next.js server components and CDN edge nodes for instantaneous content delivery and superior SEO ranking.',
                    iconName: 'Rocket',
                    badge: 'Instant Speeds',
                    points: ['Next.js App Router', 'Vercel / Cloudflare Edge', 'Automatic static regeneration']
                },
                {
                    title: 'Headless CMS & Content Systems',
                    description: 'Integrate Strapi, Sanity, Contentful, or headless WordPress so non-technical team members can publish effortlessly.',
                    iconName: 'FileCode2',
                    badge: 'Editor Friendly',
                    points: ['Sanity / Strapi / Ghost', 'Granular publishing roles', 'Live visual previews']
                },
                {
                    title: 'Secure Client & Employee Portals',
                    description: 'Private dashboards with role-based access, document repositories, dynamic charts, and automated client onboarding.',
                    iconName: 'Globe2',
                    badge: 'Enterprise Security',
                    points: ['SSO / Multi-factor auth', 'Dynamic data tables', 'Secure PDF generation']
                },
                {
                    title: 'Core Web Vitals & Technical SEO',
                    description: 'Mastery of LCP, FID, and CLS metrics to guarantee your web properties achieve premier Google search positioning.',
                    iconName: 'Activity',
                    badge: 'Top Google Ranks',
                    points: ['Zero layout shifts', 'Font subsetting & preloads', 'Automated XML sitemaps']
                },
                {
                    title: 'Interactive 3D & Micro-Interactions',
                    description: 'Elevate brand perception with physics-based spring animations, smooth scroll experiences, and Three.js 3D elements.',
                    iconName: 'Sparkles',
                    badge: 'Award-Winning UX',
                    points: ['Framer Motion animations', 'Three.js / WebGL touches', 'Delightful haptic feel']
                }
            ]
        },
        process: {
            badge: 'Web Creation Process',
            title: 'From Wireframe to Global Deployment in 5 Transparent Steps',
            description: 'A structured, collaborative workflow designed to ship world-class websites with clarity and speed.',
            bgImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80',
            steps: [
                {
                    step: '01',
                    title: 'Strategic Discovery & IA Blueprint',
                    description: 'We audit your competitors, define conversion funnels, and construct a complete information architecture and sitemap.',
                    deliverables: 'Competitor Audit & Content Architecture'
                },
                {
                    step: '02',
                    title: 'High-Fidelity Figma UI/UX Design',
                    description: 'Our design leads craft responsive desktop and mobile prototypes with your exact typography, color palettes, and interaction states.',
                    deliverables: 'Interactive Figma Prototype for Review'
                },
                {
                    step: '03',
                    title: 'Full-Stack Component Development',
                    description: 'Transforming designs into clean, modular Next.js / React code with strict linting, zero external layout dependencies, and full accessibility.',
                    deliverables: 'Live Staging Environment for Testing'
                },
                {
                    step: '04',
                    title: 'SEO, Performance & Cross-Browser QA',
                    description: 'Exhaustive testing across Chrome, Safari, Firefox, and Edge, paired with Lighthouse performance audits and schema validation.',
                    deliverables: '100% Core Web Vitals Compliance Report'
                },
                {
                    step: '05',
                    title: 'Domain Launch & Post-Launch Handover',
                    description: 'DNS configuration, SSL provisioning, Google Search Console indexing, and recorded video tutorials for your marketing team.',
                    deliverables: 'Live Production Launch & CMS Training'
                }
            ]
        },
        whyChooseUs: {
            badge: 'Why VR4Web',
            title: 'Websites That Outperform the Competition on Every Metric',
            description: 'We combine creative visual flair with engineering discipline so your website doesn’t just look breathtaking—it generates real revenue.',
            image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1000&q=80',
            reasons: [
                {
                    title: 'Zero Slow Page Templates',
                    description: 'We do not build bloated WordPress sites loaded with 50 slow plugins. Every site is built with modern lightweight code.',
                    iconName: 'Zap'
                },
                {
                    title: 'Conversion-Focused Strategy',
                    description: 'Strategic visual hierarchy, clear calls-to-action, and sticky lead capture elements engineered to maximize inquiry rates.',
                    iconName: 'Target'
                },
                {
                    title: 'Guaranteed 95+ PageSpeed',
                    description: 'We optimize every asset, CSS bundle, and script tag to ensure near-instantaneous load times on mobile 4G networks.',
                    iconName: 'Gauge'
                },
                {
                    title: 'Full Intellectual Property Transfer',
                    description: 'You own the complete code, design files, domain assets, and hosting accounts with zero monthly licensing lock-ins.',
                    iconName: 'ShieldCheck'
                }
            ],
            guarantees: ['95+ PageSpeed Guarantee', '100% Responsive', 'Clean Semantic Code', 'Lifetime Source Ownership']
        },
        techStack: {
            badge: 'Modern Web Toolchain',
            title: 'Powered by the Web’s Most Reliable Technologies',
            description: 'We leverage modern web standards to ensure your website remains blazing fast, secure, and easily maintainable for years to come.',
            categories: [
                {
                    name: 'Frontend Frameworks',
                    items: [
                        { name: 'React.js', type: 'Core UI Library', iconName: 'Atom' },
                        { name: 'Next.js 15', type: 'Full-Stack Framework', iconName: 'Rocket' },
                        { name: 'Tailwind CSS', type: 'Design System', iconName: 'Palette' },
                        { name: 'Framer Motion', type: 'Micro-Animations', iconName: 'Sparkles' }
                    ]
                },
                {
                    name: 'Backend & APIs',
                    items: [
                        { name: 'Node.js', type: 'Event-Driven Runtime', iconName: 'Server' },
                        { name: 'PHP / Laravel', type: 'Robust Backends', iconName: 'Flame' },
                        { name: 'GraphQL', type: 'Flexible Data Fetching', iconName: 'Network' },
                        { name: 'RESTful APIs', type: 'Standard Services', iconName: 'Globe' }
                    ]
                },
                {
                    name: 'Content Management',
                    items: [
                        { name: 'Sanity.io', type: 'Headless CMS', iconName: 'FileText' },
                        { name: 'Strapi', type: 'Open-Source Headless', iconName: 'FileCode2' },
                        { name: 'WordPress (Headless)', type: 'Custom Decoupled CMS', iconName: 'FileEdit' },
                        { name: 'Markdown / MDX', type: 'Developer Blogs', iconName: 'Code' }
                    ]
                },
                {
                    name: 'Hosting & CDN',
                    items: [
                        { name: 'Vercel', type: 'Global Edge Hosting', iconName: 'Zap' },
                        { name: 'Cloudflare', type: 'DDoS & CDN Layer', iconName: 'Shield' },
                        { name: 'AWS S3 & CloudFront', type: 'Asset Storage', iconName: 'Cloud' },
                        { name: 'Google Search Console', type: 'Indexing & Telemetry', iconName: 'Search' }
                    ]
                }
            ]
        },
        industries: {
            badge: 'Industry Applications',
            title: 'Delivering Tailored Web Platforms Across High-Value Verticals',
            description: 'From law firms and medical networks to industrial suppliers and SaaS scaleups, our web solutions cater to diverse business goals.',
            image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
            list: [
                {
                    name: 'Professional Services & Consulting',
                    description: 'High-authority corporate web presence with case study showcases, team directories, and integrated scheduling calendars.',
                    useCase: 'Tier-1 commercial law firm website with 4x consultation requests.'
                },
                {
                    name: 'Industrial & Manufacturing',
                    description: 'Interactive product specification catalogs, distributor locators, and RFQ (Request for Quote) automated workflows.',
                    useCase: 'Global chemical manufacturing catalog with multi-currency pricing.'
                },
                {
                    name: 'Healthcare & Medical Practices',
                    description: 'Doctor profiles, online appointment booking, HIPAA patient forms, and location-based clinic finder maps.',
                    useCase: 'Multi-location dental group website with 150+ online bookings weekly.'
                },
                {
                    name: 'Real Estate & Property Developers',
                    description: 'Immersive property listings, interactive master plans, floorplan downloads, and VIP buyer registration funnels.',
                    useCase: 'Luxury residential development showcase with 3D virtual tour.'
                },
                {
                    name: 'Tech Startups & B2B SaaS',
                    description: 'High-converting landing pages, interactive pricing tier calculators, product feature breakdowns, and demo request flows.',
                    useCase: 'Fintech startup website that helped raise an $8M Series A.'
                },
                {
                    name: 'Hospitality & Luxury Travel',
                    description: 'Direct booking engines, room availability calendars, visual experiential galleries, and dining reservation systems.',
                    useCase: 'Boutique resort portal eliminating 30% OTA commission fees.'
                }
            ]
        },
        testimonials: {
            badge: 'What Our Clients Say',
            title: 'Trusted by High-Performing Companies Worldwide',
            description: 'Discover how our web development team transformed our clients’ online presence and bottom line.',
            items: [
                {
                    quote: 'Our new corporate website built by VR4Web immediately positioned us as the clear market leader in our industry. Within 60 days, organic inbound leads increased by 145%. The performance and design quality are unmatched.',
                    author: 'Michael Sterling',
                    role: 'Managing Partner',
                    company: 'Sterling Capital Advisors',
                    rating: 5,
                    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
                },
                {
                    quote: 'The speed of the website is unbelievable. Every page loads under a second, and our Google PageSpeed score is 99 on mobile. VR4Web are the true masters of modern web engineering.',
                    author: 'Elena Rostova',
                    role: 'Head of Brand & Growth',
                    company: 'Lumina Tech Solutions',
                    rating: 5,
                    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
                },
                {
                    quote: 'From our very first discovery call to launch day, VR4Web was professional, communicative, and technically brilliant. They built an intuitive CMS that our marketing team loves using daily.',
                    author: 'James McAvoy',
                    role: 'Chief Marketing Officer',
                    company: 'Pacific Industrial Group',
                    rating: 5,
                    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80'
                }
            ]
        },
        faqs: {
            badge: 'Helpful Information',
            title: 'Frequently Asked Questions About Web Development',
            description: 'Common questions regarding scoping, design rounds, timelines, and hosting setups.',
            items: [
                {
                    q: 'How long does it take to design and launch a custom website?',
                    a: 'A standard custom corporate website typically takes 4 to 8 weeks from kickoff to deployment. Larger web platforms with custom portal dashboards or multi-language localization generally take 8 to 14 weeks. We provide a milestone-driven schedule with guaranteed completion dates.'
                },
                {
                    q: 'Will our marketing team be able to update text, images, and blogs easily?',
                    a: 'Absolutely. We connect your website to an intuitive, modern headless CMS (such as Sanity, Strapi, or headless WordPress) configured specifically for your content needs. We also provide recorded video training sessions so your team can publish updates with zero coding required.'
                },
                {
                    q: 'Do you design the website from scratch or use pre-made templates?',
                    a: 'We design 100% of our websites from scratch in Figma based on your brand guidelines, customer psychology, and business objectives. We never use generic off-the-shelf theme templates.'
                },
                {
                    q: 'How do you ensure our website ranks high on Google?',
                    a: 'We engineer technical SEO directly into the code: semantic HTML5 tags, JSON-LD structured schema markup, automated XML sitemaps, canonical tags, OpenGraph social sharing meta, and sub-second load times that satisfy all Google Core Web Vitals requirements.'
                },
                {
                    q: 'Where will our website be hosted?',
                    a: 'We deploy web applications to premier global edge networks like Vercel, Cloudflare Pages, or AWS, ensuring 99.99% uptime, automatic SSL encryption, and lightning-fast worldwide delivery.'
                }
            ]
        },
        cta: {
            badge: 'Start Your Transformation',
            title: 'Ready for a Website That Establishes Market Authority & Drives Revenue?',
            description: 'Speak with our lead web architects today for a comprehensive site evaluation and fixed-price project scope.',
            buttonText: 'Request a Web Quote',
            secondaryButtonText: 'Schedule a Consultation'
        },
        subServices: [
            {
                slug: 'cms-development',
                name: 'CMS Development',
                desc: 'Headless and enterprise content management systems giving your team total publishing independence with zero code.',
                hero: {
                    title: 'Flexible & Scalable',
                    highlight: 'Headless CMS Systems',
                    titleSuffix: 'for Fast Publishing.',
                    description: 'Empower your editorial team with intuitive content workflows powered by Sanity, Strapi, and headless CMS architectures.'
                }
            },
            {
                slug: 'web-portal-development',
                name: 'Web Portal Development',
                desc: 'Secure client, employee, and partner dashboards featuring dynamic charts, document vaults, and role-based permissions.',
                hero: {
                    title: 'Secure Enterprise',
                    highlight: 'Web Portal Development',
                    titleSuffix: 'for Clients & Partners.',
                    description: 'Streamline collaboration with custom web portals featuring multi-factor authentication, document signing, and real-time telemetry.'
                }
            },
            {
                slug: 'corporate-web-development',
                name: 'Corporate Web Development',
                desc: 'High-converting enterprise web presence engineered to command brand authority and generate qualified B2B leads.',
                hero: {
                    title: 'Authoritative',
                    highlight: 'Corporate Web Development',
                    titleSuffix: 'for Market Leaders.',
                    description: 'Bespoke corporate websites that establish immediate trust, showcase enterprise capabilities, and accelerate business growth.'
                }
            },
            {
                slug: 'custom-web-application',
                name: 'Custom Web Application',
                desc: 'Tailored cloud-native software platforms designed to solve unique operational workflows and automate business logic.',
                hero: {
                    title: 'High-Performance',
                    highlight: 'Custom Web Applications',
                    titleSuffix: 'Built for Scale.',
                    description: 'Replace cumbersome spreadsheets with cloud-native web applications built on reactive components and resilient databases.'
                }
            },
            {
                slug: 'small-office-and-home-office-web-development',
                name: 'Small Office and Home Office Web Development',
                desc: 'Agile, cost-efficient digital starter packages tailored to SMBs, consultants, and growing boutique agencies.',
                hero: {
                    title: 'Agile & Efficient',
                    highlight: 'Small Office Web Solutions',
                    titleSuffix: 'for Rapid Growth.',
                    description: 'Professional, high-impact web presence packages engineered to give emerging businesses an unfair competitive edge online.'
                }
            },
            {
                slug: 'node-js-development',
                name: 'Node.js Development',
                desc: 'Ultra-fast event-driven backend microservices, real-time WebSocket servers, and scalable API gateways.',
                hero: {
                    title: 'Ultra-Fast',
                    highlight: 'Node.js Development',
                    titleSuffix: 'for Real-Time Backends.',
                    description: 'Harness the non-blocking I/O power of Node.js and TypeScript for high-concurrency real-time web applications.'
                }
            },
            {
                slug: 'next-js-development',
                name: 'Next.js Development',
                desc: 'Production-ready server-side rendered web apps and static sites with instantaneous page navigation and top SEO scores.',
                hero: {
                    title: 'Production-Grade',
                    highlight: 'Next.js Development',
                    titleSuffix: 'with Server Components.',
                    description: 'Build the fastest web applications on earth with Next.js 15, React Server Components, and edge-rendered architectures.'
                }
            },
            {
                slug: 'react-js-development',
                name: 'React.js Development',
                desc: 'Dynamic, reactive component-driven interfaces delivering smooth single-page application experiences.',
                hero: {
                    title: 'Modular & Reactive',
                    highlight: 'React.js Development',
                    titleSuffix: 'for Modern Interfaces.',
                    description: 'Craft fluid, state-driven user interfaces with reusable component architectures and seamless API integrations.'
                }
            },
            {
                slug: 'laravel-development',
                name: 'Laravel Development',
                desc: 'Robust, elegant PHP backend architecture, enterprise database ORM, and secure RESTful API foundations.',
                hero: {
                    title: 'Robust & Elegant',
                    highlight: 'Laravel Development',
                    titleSuffix: 'for Complex Web Platforms.',
                    description: 'Leverage Laravel’s battle-tested security, Eloquent ORM, and queue workers for dependable enterprise web applications.'
                }
            },
            {
                slug: 'angular-development',
                name: 'Angular Development',
                desc: 'Structured, large-scale enterprise single-page applications with strong typing and rigorous architectural patterns.',
                hero: {
                    title: 'Enterprise-Grade',
                    highlight: 'Angular Development',
                    titleSuffix: 'for Structured SPAs.',
                    description: 'Build mission-critical enterprise single-page applications with Angular’s robust dependency injection and modular design.'
                }
            },
            {
                slug: 'php-development',
                name: 'PHP Development',
                desc: 'Reliable, proven server-side database systems and legacy modernization for established corporate platforms.',
                hero: {
                    title: 'Reliable & Proven',
                    highlight: 'PHP Development',
                    titleSuffix: 'and Modern Database Systems.',
                    description: 'Modern PHP 8+ engineering delivering high-speed execution, rock-solid security, and seamless database connectivity.'
                }
            }
        ]
    },

    // ─────────────────────────────────────────────────────────────
    // 4. E-COMMERCE SOLUTIONS
    // ─────────────────────────────────────────────────────────────
    {
        id: 'ecommerce',
        slug: 'e-commerce-solutions',
        name: 'E-commerce Solutions',
        category: 'Digital Commerce & Marketplaces',
        tagline: 'High-Converting Digital Storefronts & Scalable Marketplaces',
        desc: 'Custom e-commerce platforms, bespoke Shopify Plus stores, high-volume WooCommerce, and headless commerce architectures engineered to maximize average order value (AOV) and streamline checkout conversion.',
        hero: {
            title: 'High-Converting',
            highlight: 'E-Commerce Solutions',
            titleSuffix: 'Built to Scale Revenue.',
            description: 'We build digital storefronts that turn casual shoppers into repeat customers. From bespoke Shopify Plus custom themes to high-volume headless marketplaces, we optimize every pixel for maximum conversion and lightning-fast checkout.',
            bgImage: '/service.png',
            ctaPrimary: 'Grow Your Store',
            ctaSecondary: 'Explore E-Commerce Solutions'
        },
        about: {
            badge: 'Commerce Growth',
            title: 'Architecting Online Stores That Dominate High-Volume Retail',
            description: 'In modern e-commerce, every 100-millisecond delay in checkout speed cuts conversion rates by 7%. VR4Web builds ultra-optimized e-commerce experiences engineered to eliminate friction, showcase merchandise with breathtaking clarity, and automate backend inventory sync.',
            descriptionSecondary: 'Whether launching a direct-to-consumer (D2C) brand, scaling an enterprise B2B wholesale catalog with tiered wholesale pricing, or migrating from a clunky legacy platform to Shopify Plus, we ensure zero downtime and immediate ROI.',
            image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1000&q=80',
            highlights: [
                { title: 'One-Page Fast Checkout', desc: 'Integrated Apple Pay, Google Pay, Shop Pay, Klarna, and local multi-currency gateways.' },
                { title: 'Dynamic Upsell Engines', desc: 'Post-purchase and in-cart AI recommendations proven to boost AOV by up to 28%.' },
                { title: 'Automated ERP & Stock Sync', desc: 'Real-time synchronization with warehouse management systems (WMS), NetSuite, and POS.' },
                { title: 'Headless Commerce Speed', desc: 'Decoupled frontend architectures delivering sub-second product pages on mobile 4G.' }
            ],
            stats: [
                { label: 'GMV Processed', value: '$120M+' },
                { label: 'Checkout Conversion', value: '+34%' },
                { label: 'Avg Mobile Page Load', value: '0.8s' }
            ]
        },
        features: {
            badge: 'Commerce Capabilities',
            title: 'End-to-End Solutions for Modern Retail Success',
            description: 'Everything required to launch, scale, and automate an international retail empire online.',
            items: [
                {
                    title: 'Custom Shopify Plus Theme Design',
                    description: 'Tailored Liquid and Hydrogen codebases engineered for speed, high brand authority, and full app-block customization.',
                    iconName: 'ShoppingBag',
                    badge: 'Shopify Plus Partner',
                    points: ['Liquid / Hydrogen storefronts', 'Custom checkout UI extensions', 'Zero reliance on generic themes']
                },
                {
                    title: 'Headless & Composable Commerce',
                    description: 'Decouple your Next.js storefront from Shopify or BigCommerce APIs for unmatched page speed and design freedom.',
                    iconName: 'Zap',
                    badge: 'Sub-Second Speed',
                    points: ['Next.js Commerce frontend', 'GraphQL product catalog', 'Omnichannel inventory API']
                },
                {
                    title: 'B2B Wholesale & Customer Portals',
                    description: 'Tiered wholesale pricing, custom quotation requests (RFQ), net-payment terms, and bulk CSV order uploads.',
                    iconName: 'Building',
                    badge: 'B2B Ready',
                    points: ['Custom customer price lists', 'Net 30/60 invoice checkout', 'Bulk SKU order matrices']
                },
                {
                    title: 'WooCommerce & Custom Marketplaces',
                    description: 'High-performance WordPress WooCommerce platforms hardened for large catalogs with 50,000+ SKUs.',
                    iconName: 'Store',
                    badge: 'High SKU Scale',
                    points: ['ElasticSearch product filters', 'Automated tax and shipping rules', 'Custom multi-vendor payouts']
                },
                {
                    title: 'Global Multi-Currency & Localization',
                    description: 'Automatic IP geolocation, localized currency conversion, international duties calculation, and multi-language support.',
                    iconName: 'Globe',
                    badge: 'International Reach',
                    points: ['Multi-currency pricing rules', 'Automated VAT/GST calculation', 'Localized checkout language']
                },
                {
                    title: 'Cart Abandonment & Retention Automation',
                    description: 'Integrated Klaviyo flows, automated SMS recovery sequences, and personalized loyalty reward programs.',
                    iconName: 'MailCheck',
                    badge: 'Retention Engine',
                    points: ['Dynamic Klaviyo webhooks', 'One-click cart recovery links', 'Loyalty point integrations']
                }
            ]
        },
        process: {
            badge: 'Launch Strategy',
            title: 'Our 5-Stage E-Commerce Launch & Optimization Protocol',
            description: 'A disciplined roadmap designed to safely migrate, build, and scale retail stores without losing a single dollar in sales.',
            bgImage: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1600&q=80',
            steps: [
                {
                    step: '01',
                    title: 'Catalog Architecture & Funnel Audit',
                    description: 'We analyze your product categories, SKU variants, tax requirements, and payment gateway infrastructure.',
                    deliverables: 'Catalog Mapping & Conversion Strategy Document'
                },
                {
                    step: '02',
                    title: 'Conversion-Optimized UX Design',
                    description: 'Creating high-fidelity Figma designs for product detail pages (PDP), collections, and friction-free mobile cart drawers.',
                    deliverables: 'Complete Mobile-First Storefront Prototype'
                },
                {
                    step: '03',
                    title: 'Storefront Development & API Integrations',
                    description: 'Developing modular theme sections, third-party logistics (3PL) integrations, and automated payment gateway connections.',
                    deliverables: 'Fully Functional Staging Store with Test Products'
                },
                {
                    step: '04',
                    title: 'Data Migration & End-to-End QA',
                    description: 'Safe migration of historical customers, orders, and products with 100% 301 redirect mapping to preserve SEO rankings.',
                    deliverables: 'Zero-Data-Loss Migration & Payment Simulation Report'
                },
                {
                    step: '05',
                    title: 'Launch Day Switch & Revenue Monitoring',
                    description: 'DNS transition with real-time checkout telemetry, automated order fulfillment checks, and 24/7 on-call engineers.',
                    deliverables: 'Smooth Production Launch & Live Checkout Telemetry'
                }
            ]
        },
        whyChooseUs: {
            badge: 'The VR4Web Advantage',
            title: 'Why Top Retail Brands Trust Our E-Commerce Engineers',
            description: 'We don’t just build pretty stores—we engineer high-velocity retail machines obsessed with conversion rates and average order value.',
            image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80',
            reasons: [
                {
                    title: 'Conversion Rate Obsessed',
                    description: 'Every layout decision is validated against modern buyer psychology to eliminate friction and elevate completed checkouts.',
                    iconName: 'TrendingUp'
                },
                {
                    title: 'Zero Downtime Migrations',
                    description: 'We safely migrate millions in customer and order data from Magento, WooCommerce, or BigCommerce to Shopify Plus with zero lost sales.',
                    iconName: 'ShieldCheck'
                },
                {
                    title: 'Custom App & API Specialists',
                    description: 'When off-the-shelf apps can’t do the job, we build bespoke private apps and custom checkout extensions.',
                    iconName: 'Code2'
                },
                {
                    title: 'Omnichannel ERP Integration',
                    description: 'Seamless integration with NetSuite, Cin7, DEAR, SAP, and physical retail POS terminals for accurate real-time inventory.',
                    iconName: 'Network'
                }
            ],
            guarantees: ['Zero Downtime Migration', 'Sub-Second PDP Speed', 'Full 301 SEO Preservation', 'Post-Launch Support']
        },
        techStack: {
            badge: 'E-Commerce Tech',
            title: 'Built with the World’s Leading Commerce Platforms',
            description: 'We harness modern commerce engines and payment ecosystems to guarantee maximum reliability and scale.',
            categories: [
                {
                    name: 'Commerce Platforms',
                    items: [
                        { name: 'Shopify / Shopify Plus', type: 'Leading SaaS Commerce', iconName: 'ShoppingBag' },
                        { name: 'WooCommerce', type: 'Flexible WordPress Commerce', iconName: 'Store' },
                        { name: 'BigCommerce', type: 'Enterprise Multi-Store', iconName: 'CreditCard' },
                        { name: 'Medusa.js / Next.js', type: 'Open-Source Headless', iconName: 'Zap' }
                    ]
                },
                {
                    name: 'Payment & Checkout',
                    items: [
                        { name: 'Stripe Payments', type: 'Global Payment Gateway', iconName: 'CreditCard' },
                        { name: 'Shop Pay & Apple Pay', type: 'Accelerated Checkout', iconName: 'CheckCircle' },
                        { name: 'Klarna & Afterpay', type: 'BNPL Integration', iconName: 'DollarSign' },
                        { name: 'PayPal Commerce', type: 'Alternative Checkout', iconName: 'Shield' }
                    ]
                },
                {
                    name: 'Marketing & Retention',
                    items: [
                        { name: 'Klaviyo', type: 'Email & SMS Marketing', iconName: 'Mail' },
                        { name: 'Gorgias', type: 'E-Commerce Helpdesk', iconName: 'Headphones' },
                        { name: 'Yotpo / Okendo', type: 'Reviews & UGC', iconName: 'Star' },
                        { name: 'Recharge', type: 'Subscription Engine', iconName: 'Repeat' }
                    ]
                },
                {
                    name: 'Analytics & Search',
                    items: [
                        { name: 'Algolia Search', type: 'Instant Search & AI', iconName: 'Search' },
                        { name: 'Google Analytics 4', type: 'E-Commerce Funnel Tracking', iconName: 'BarChart' },
                        { name: 'Triple Whale', type: 'First-Party Attribution', iconName: 'PieChart' },
                        { name: 'Hotjar', type: 'Heatmaps & Recordings', iconName: 'Eye' }
                    ]
                }
            ]
        },
        industries: {
            badge: 'Retail Sectors',
            title: 'Tailored E-Commerce Architectures for Every Retail Vertical',
            description: 'Our e-commerce platforms handle the nuances of varied retail models—from apparel variants to bulk wholesale equipment.',
            image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80',
            list: [
                {
                    name: 'Fashion, Apparel & Luxury Goods',
                    description: 'High-aesthetic visual storytelling, complex color/size swatch pickers, lookbooks, and virtual fit guides.',
                    useCase: 'Luxury designer brand scaling from $500K to $6M in annual online sales.'
                },
                {
                    name: 'Health, Wellness & Beauty',
                    description: 'Automated recurring subscribe-and-save programs, bundle builders, and dermatologist ingredient showcases.',
                    useCase: 'Organic skincare brand with 40% subscription revenue share.'
                },
                {
                    name: 'Consumer Electronics & Hardware',
                    description: 'Interactive product feature comparison matrices, technical spec sheets, warranty registration, and serial number lookups.',
                    useCase: 'Smart home hardware company shipping across 35 countries.'
                },
                {
                    name: 'Food, Beverage & Grocery Delivery',
                    description: 'Local delivery date/time slot selectors, temperature-controlled shipping calculation, and recurring coffee bean subscriptions.',
                    useCase: 'Artisanal roastery with automated weekly subscriber dispatch.'
                },
                {
                    name: 'B2B Wholesale & Industrial Parts',
                    description: 'Tiered wholesale pricing, tax-exempt business accounts, Net 30 invoices, and bulk CSV order uploads.',
                    useCase: 'Industrial electrical distributor processing 2,500 B2B orders monthly.'
                },
                {
                    name: 'Home, Furniture & Interior Decor',
                    description: 'Room visualizer tools, oversized freight shipping calculation, custom fabric customizers, and trade discount portals.',
                    useCase: 'Custom furniture studio with 3D product visualizer.'
                }
            ]
        },
        testimonials: {
            badge: 'Retailer Feedback',
            title: 'Loved by Founders and E-Commerce Directors',
            description: 'Real testimonials from store owners who accelerated their digital revenue with VR4Web.',
            items: [
                {
                    quote: 'Migrating our $15M store from Magento to Shopify Plus with VR4Web was the best decision we ever made. Not a single minute of downtime, our page load time dropped by 65%, and conversion increased by 28% in month one.',
                    author: 'Harrison Forde',
                    role: 'E-Commerce Director',
                    company: 'Aura Living Furnishings Australia',
                    rating: 5,
                    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
                },
                {
                    quote: 'The custom subscription bundle builder they engineered using Next.js and Shopify Storefront API has completely revolutionized our business model. Customer retention is at an all-time high.',
                    author: 'Claire Delacour',
                    role: 'Founder & CEO',
                    company: 'PureBotanicals Global',
                    rating: 5,
                    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80'
                },
                {
                    quote: 'VR4Web understands conversion rate optimization deeply. Every section of our store was engineered with a clear purpose. Our return on ad spend (ROAS) doubled because our site actually converts visitors.',
                    author: 'Siddharth Patel',
                    role: 'Head of Growth',
                    company: 'UrbanGear Apparel',
                    rating: 5,
                    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
                }
            ]
        },
        faqs: {
            badge: 'E-Commerce FAQs',
            title: 'Frequently Asked Questions About E-Commerce Solutions',
            description: 'Everything you need to know about migrations, platform selection, and payment setups.',
            items: [
                {
                    q: 'Which platform is best for my store: Shopify Plus, WooCommerce, or Custom?',
                    a: 'Shopify Plus is the global benchmark for 90% of scaling D2C and high-volume retail brands due to its 99.99% uptime, zero server maintenance, and world-class checkout. WooCommerce is great if you require deep custom WordPress CMS integration. For highly specialized multi-vendor marketplaces or custom hardware integrations, headless commerce (Next.js + Shopify or Medusa) is ideal.'
                },
                {
                    q: 'Will we lose our Google SEO rankings when migrating from our old store?',
                    a: 'No. We perform an exhaustive 301 URL redirect mapping covering every single legacy product, collection, and blog post. We also preserve product schema markup and meta tags to ensure your search rankings remain intact or improve post-launch.'
                },
                {
                    q: 'Can you integrate our existing warehouse (WMS), ERP, and accounting systems?',
                    a: 'Yes. We frequently integrate e-commerce storefronts with NetSuite, SAP, Cin7, DEAR, Xero, QuickBooks, and custom 3PL logistics APIs for automated inventory deductions and tracking number updates.'
                },
                {
                    q: 'How do you optimize mobile conversion rates on product pages?',
                    a: 'We implement sticky Add-to-Cart buttons, accelerated payment options (Apple Pay, Shop Pay), high-resolution zoomable galleries, expandable accordion specs, and social proof counters that minimize cognitive friction.'
                },
                {
                    q: 'Do you offer ongoing conversion rate optimization (CRO) post-launch?',
                    a: 'Yes. We offer ongoing e-commerce retainer packages focused on A/B testing checkout layouts, PDP copy optimization, seasonal promotional launches, and retention email flows.'
                }
            ]
        },
        cta: {
            badge: 'Scale Your Online Store',
            title: 'Ready to Turn Your Store Into a High-Conversion Sales Engine?',
            description: 'Connect with our e-commerce strategists today for a complimentary store audit and roadmap consultation.',
            buttonText: 'Claim Your Free Store Audit',
            secondaryButtonText: 'Talk to an E-Commerce Specialist'
        },
        subServices: [
            {
                slug: 'custom-ecommerce-solutions',
                name: 'Custom eCommerce Solutions',
                desc: 'Tailored enterprise-grade commerce platforms built with headless architectures, custom checkout flows, and specialized ERP connectors.',
                hero: {
                    title: 'Tailored Enterprise',
                    highlight: 'Custom eCommerce Solutions',
                    titleSuffix: 'for Unique Business Models.',
                    description: 'When standard e-commerce platforms limit your capabilities, we build bespoke headless commerce systems engineered for unlimited scalability.'
                }
            },
            {
                slug: 'shopify-development-solutions',
                name: 'Shopify Development solutions',
                desc: 'Bespoke Shopify and Shopify Plus store design, custom Liquid themes, private app development, and checkout extensions.',
                hero: {
                    title: 'World-Class',
                    highlight: 'Shopify Development Solutions',
                    titleSuffix: 'for High-Growth Brands.',
                    description: 'Leverage the world’s most powerful commerce ecosystem with bespoke Shopify Plus themes, frictionless checkouts, and custom app integrations.'
                }
            },
            {
                slug: 'woocommerce-development-solutions',
                name: 'WooCommerce Development solutions',
                desc: 'Scalable WordPress-based storefronts optimized for high SKU counts, custom subscriptions, and content-rich shopping experiences.',
                hero: {
                    title: 'Scalable & Flexible',
                    highlight: 'WooCommerce Development',
                    titleSuffix: 'Powered by WordPress.',
                    description: 'Harness total data ownership and open-source flexibility with high-performance WooCommerce storefronts optimized for speed and conversion.'
                }
            },
            {
                slug: 'bigcommerce-development-solutions',
                name: 'BigCommerce Development Solutions',
                desc: 'High-volume scalable enterprise stores with multi-storefront capability, advanced B2B wholesale pricing, and zero transaction fees.',
                hero: {
                    title: 'High-Volume Enterprise',
                    highlight: 'BigCommerce Solutions',
                    titleSuffix: 'with Multi-Storefront Scale.',
                    description: 'Deliver robust B2B and B2C digital commerce with BigCommerce’s enterprise catalog architecture and zero additional platform transaction fees.'
                }
            }
        ]
    },

    // ─────────────────────────────────────────────────────────────
    // 5. DIGITAL MARKETING SOLUTIONS
    // ─────────────────────────────────────────────────────────────
    {
        id: 'digital-marketing',
        slug: 'digital-marketing-solutions',
        name: 'Digital Marketing Solutions',
        category: 'Search, AI Optimization & Growth',
        tagline: 'Data-Driven Growth, Generative Search & Brand Visibility',
        desc: 'Cutting-edge digital growth solutions spanning AI Search Optimization (AEO/GEO), technical SEO, high-ROI paid media (PPC), social growth, and multi-channel marketing campaigns that generate measurable revenue.',
        hero: {
            title: 'Next-Generation',
            highlight: 'Digital Marketing & AI Growth',
            titleSuffix: 'That Drives Real Pipeline.',
            description: 'Dominate traditional search engines and AI generative models alike. We combine technical SEO, Answer Engine Optimization (AEO/GEO), high-ROI paid media, and automated multi-channel campaigns to systematically scale your revenue.',
            bgImage: '/service.png',
            ctaPrimary: 'Get a Growth Audit',
            ctaSecondary: 'Explore Marketing Channels'
        },
        about: {
            badge: 'Growth Architecture',
            title: 'Pioneering Search & Growth in the Era of AI-Powered Discovery',
            description: 'The search landscape has fundamentally transformed. Consumers no longer just type keywords into Google—they ask ChatGPT, consult Perplexity, and seek conversational answers on Copilot. VR4Web leads the industry in Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO).',
            descriptionSecondary: 'We combine algorithmic AI visibility with white-hat technical SEO, data-driven paid advertising (Google & Meta Ads), and omnichannel marketing funnels to ensure your business captures demand at every stage of the buyer journey.',
            image: '/services-images-set2/digital-marketing.png',
            highlights: [
                { title: 'AEO & GEO Leadership', desc: 'Optimize brand citations to ensure ChatGPT, Perplexity, and Gemini cite you as the #1 authority.' },
                { title: 'High-ROI Paid Advertising', desc: 'Targeted Google Ads, Meta, and LinkedIn B2B campaigns with strict cost-per-acquisition (CPA) targets.' },
                { title: 'Authoritative White-Hat SEO', desc: 'Sustainable organic rankings built on deep technical foundations and genuine high-authority backlinks.' },
                { title: 'Omnichannel Automation', desc: 'Unified WhatsApp, SMS, and email marketing funnels that nurture leads on autopilot.' }
            ],
            stats: [
                { label: 'Avg ROAS Achieved', value: '4.8x' },
                { label: 'Organic Traffic Lift', value: '+210%' },
                { label: 'Ad Spend Managed', value: '$25M+' }
            ]
        },
        features: {
            badge: 'Growth Engine',
            title: 'Full-Funnel Digital Marketing That Converts Traffic into Revenue',
            description: 'Comprehensive digital marketing capabilities designed to capture intent, build brand equity, and generate consistent qualified pipeline.',
            items: [
                {
                    title: 'AEO & Generative Engine Optimization',
                    description: 'Position your brand as the primary reference source for AI search engines like ChatGPT, Gemini, and Perplexity.',
                    iconName: 'Sparkles',
                    badge: 'Next-Gen Search',
                    points: ['LLM entity citation mapping', 'Conversational query capture', 'Semantic vector schema']
                },
                {
                    title: 'High-Intent (PPC) Paid Advertising',
                    description: 'Precision targeting on Google Search, Meta Ads, and LinkedIn campaigns optimized for high return on ad spend (ROAS).',
                    iconName: 'Target',
                    badge: '4.8x Avg ROAS',
                    points: ['Negative keyword hardening', 'Dynamic landing page routing', 'Real-time conversion tracking']
                },
                {
                    title: 'White Hat Technical SEO',
                    description: 'Comprehensive technical audits, Core Web Vitals optimization, structured schema markup, and on-page authority building.',
                    iconName: 'Award',
                    badge: 'Page 1 Rankings',
                    points: ['Zero algorithmic penalties', 'JSON-LD entity markup', 'Competitor keyword conquesting']
                },
                {
                    title: 'High-Authority Link Building',
                    description: 'Editorial outreach securing top-tier backlinks from real, high-domain-authority industry publications.',
                    iconName: 'Link2',
                    badge: 'Domain Authority',
                    points: ['DR 60+ real editorial placements', 'Zero PBN networks', 'Contextual anchor text distribution']
                },
                {
                    title: 'WhatsApp & SMS Direct Marketing',
                    description: 'Drive immediate engagement with automated WhatsApp Business API broadcasts, conversational commerce, and SMS alerts.',
                    iconName: 'MessageCircle',
                    badge: '98% Open Rates',
                    points: ['Verified green badge setup', 'Automated CRM drip flows', 'Instant transaction notifications']
                },
                {
                    title: 'Online Reputation Management (ORM)',
                    description: 'Protect your brand sentiment, curate genuine positive customer reviews, and mitigate negative search results.',
                    iconName: 'BadgeCheck',
                    badge: 'Brand Protection',
                    points: ['Review acceleration funnels', 'Crisis mitigation protocols', 'Knowledge Graph control']
                }
            ]
        },
        process: {
            badge: 'Marketing Framework',
            title: 'Our Data-Driven Growth & Acquisition Methodology',
            description: 'We don’t rely on guesswork. Every marketing dollar is tracked, tested, and optimized through rigorous data loops.',
            bgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
            steps: [
                {
                    step: '01',
                    title: 'Audience & Search Landscape Audit',
                    description: 'We analyze your target personas, competitor keyword share, paid ad budgets, and current organic visibility gaps.',
                    deliverables: 'Competitor Intelligence Report & Growth Blueprint'
                },
                {
                    step: '02',
                    title: 'Tracking & Conversion Architecture',
                    description: 'Configuring server-side tracking (Google Tag Manager, Meta CAPI), GA4 event funnels, and CRM attribution pipelines.',
                    deliverables: '100% Verified Attribution & Tracking Infrastructure'
                },
                {
                    step: '03',
                    title: 'Campaign & Content Asset Launch',
                    description: 'Deploying high-converting ad copy, responsive landing pages, SEO-optimized authority guides, and automated drip sequences.',
                    deliverables: 'Live Ad Campaigns & Published Content Assets'
                },
                {
                    step: '04',
                    title: 'A/B Testing & Algorithmic Optimization',
                    description: 'Continuous split testing of headlines, creatives, bidding strategies, and keyword negatives to ruthlessly drive down CPA.',
                    deliverables: 'Weekly Optimization Logs & ROAS Dashboards'
                },
                {
                    step: '05',
                    title: 'Scale & Channel Expansion',
                    description: 'Doubling down on winning channels, expanding into emerging AI answer engines, and scaling revenue predictably.',
                    deliverables: 'Monthly Executive ROI Review & Strategic Roadmap'
                }
            ]
        },
        whyChooseUs: {
            badge: 'Why VR4Web Marketing',
            title: 'We Measure Success by Revenue, Not Vanity Metrics',
            description: 'Unlike traditional agencies that boast about meaningless impressions, we focus strictly on customer acquisition cost (CAC) and closed pipeline.',
            image: '/services-images-set2/digital-marketing.png',
            reasons: [
                {
                    title: 'Pioneers in AEO & GEO Search',
                    description: 'We are among the few global agencies actively engineering search visibility for AI models like ChatGPT and Perplexity.',
                    iconName: 'Brain'
                },
                {
                    title: 'Server-Side Tracking Accuracy',
                    description: 'We bypass iOS tracking restrictions with robust server-side Meta Conversions API (CAPI) and Google Tag Manager setups.',
                    iconName: 'Shield'
                },
                {
                    title: 'No Long-Term Hostage Contracts',
                    description: 'We earn your partnership every single month through transparent performance, verified data, and measurable pipeline.',
                    iconName: 'CheckCircle2'
                },
                {
                    title: 'Dedicated Senior Growth Strategist',
                    description: 'Direct communication with seasoned marketing directors—never junior account managers who just read automated reports.',
                    iconName: 'Users'
                }
            ],
            guarantees: ['Zero Vanity Metrics', '100% Attribution Transparency', 'Strict White-Hat Practices', 'Weekly Performance Reports']
        },
        techStack: {
            badge: 'Marketing Toolchain',
            title: 'Powered by Enterprise Analytics & Advertising Platforms',
            description: 'We harness premier analytics, SEO intelligence, and ad-tech platforms to maintain an unfair competitive edge.',
            categories: [
                {
                    name: 'Search & SEO Intelligence',
                    items: [
                        { name: 'Semrush', type: 'Competitive Keyword Research', iconName: 'Search' },
                        { name: 'Ahrefs', type: 'Backlink & Content Intelligence', iconName: 'Link' },
                        { name: 'Screaming Frog', type: 'Technical Crawl Audits', iconName: 'Terminal' },
                        { name: 'Google Search Console', type: 'Direct Indexing Telemetry', iconName: 'Globe' }
                    ]
                },
                {
                    name: 'Paid Advertising',
                    items: [
                        { name: 'Google Ads', type: 'Search, Shopping & Display', iconName: 'Target' },
                        { name: 'Meta Ads Manager', type: 'Instagram & Facebook Ads', iconName: 'Share2' },
                        { name: 'LinkedIn Campaign Manager', type: 'B2B Precision Targeting', iconName: 'Briefcase' },
                        { name: 'Bing Ads', type: 'Enterprise Search Ads', iconName: 'Laptop' }
                    ]
                },
                {
                    name: 'Analytics & Attribution',
                    items: [
                        { name: 'Google Analytics 4', type: 'Multi-Touch Attribution', iconName: 'BarChart' },
                        { name: 'Google Tag Manager', type: 'Server-Side Tagging', iconName: 'Code' },
                        { name: 'Looker Studio', type: 'Real-Time ROI Dashboards', iconName: 'PieChart' },
                        { name: 'Triple Whale', type: 'E-Commerce Attribution', iconName: 'Activity' }
                    ]
                },
                {
                    name: 'Automation & Messaging',
                    items: [
                        { name: 'WhatsApp Business API', type: 'Conversational Messaging', iconName: 'MessageCircle' },
                        { name: 'Klaviyo', type: 'Automated Retention Funnels', iconName: 'Mail' },
                        { name: 'Twilio SMS', type: 'Direct SMS Gateway', iconName: 'Smartphone' },
                        { name: 'HubSpot Marketing Hub', type: 'Inbound CRM Automation', iconName: 'Users' }
                    ]
                }
            ]
        },
        industries: {
            badge: 'Proven Results Across Industries',
            title: 'Scaling Customer Acquisition for Diverse Business Models',
            description: 'Our data-driven campaigns generate qualified leads and sales across B2B, B2C, and high-ticket service industries.',
            image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1000&q=80',
            list: [
                {
                    name: 'B2B Enterprise SaaS',
                    description: 'High-intent LinkedIn ABM and Google search campaigns targeting decision-makers with specific software purchase intent.',
                    useCase: 'Cybersecurity SaaS achieving 52 qualified enterprise demos monthly.'
                },
                {
                    name: 'High-Growth E-Commerce Brands',
                    description: 'Omnichannel Meta, Google Shopping, and TikTok ads paired with retention WhatsApp and email automations.',
                    useCase: 'D2C electronics brand scaling to $450K monthly at 5.2x ROAS.'
                },
                {
                    name: 'Legal & Financial Advisory',
                    description: 'High-converting local Google Ads, AEO citation building, and reputation management that secures high-ticket retainers.',
                    useCase: 'Commercial litigation firm acquiring $2.4M in new case billings.'
                },
                {
                    name: 'Healthcare & Specialized Clinics',
                    description: 'HIPAA-compliant patient acquisition funnels, local Google Maps top-3 optimization, and review acceleration.',
                    useCase: 'Cosmetic surgery clinic generating 90+ monthly procedure consultations.'
                },
                {
                    name: 'Real Estate & Property Developers',
                    description: 'Targeted high-net-worth investor campaigns, automated WhatsApp inquiry qualification, and virtual tour lead capture.',
                    useCase: 'Luxury waterfront development generating 420 qualified buyer inquiries.'
                },
                {
                    name: 'Education & Online Learning Platforms',
                    description: 'Student enrollment funnels, webinar acquisition campaigns, and automated multi-channel follow-up sequences.',
                    useCase: 'EdTech coding bootcamp scaling enrollments by 180% year-over-year.'
                }
            ]
        },
        testimonials: {
            badge: 'Client Validation',
            title: 'Real Revenue Growth Shared by Our Partners',
            description: 'Discover how VR4Web’s digital marketing team drives transformative business growth.',
            items: [
                {
                    quote: 'VR4Web completely transformed our customer acquisition. Their AEO and AI SEO strategies got our brand cited across ChatGPT and Perplexity, while their Google Ads management cut our cost-per-lead by 42%.',
                    author: 'Nathaniel Cross',
                    role: 'Chief Commercial Officer',
                    company: 'FinTrack Software Global',
                    rating: 5,
                    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80'
                },
                {
                    quote: 'Their WhatsApp marketing automation and paid social campaigns helped us generate over $1.2M in additional revenue in under six months. Outstanding transparency, communication, and technical acumen.',
                    author: 'Ananya Deshmukh',
                    role: 'Head of Growth & Performance',
                    company: 'LuxeLiving Retail India',
                    rating: 5,
                    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
                },
                {
                    quote: 'We had been burned by three previous SEO agencies who delivered empty promises. VR4Web got us to rank #1 on Google for our top commercial keywords within 5 months through honest, high-authority white hat SEO.',
                    author: 'Robert Sterling',
                    role: 'Managing Director',
                    company: 'Sterling Legal Group Australia',
                    rating: 5,
                    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
                }
            ]
        },
        faqs: {
            badge: 'Marketing FAQs',
            title: 'Frequently Asked Questions About Digital Marketing',
            description: 'Transparent answers regarding ad spend management, SEO timelines, and AI search optimization.',
            items: [
                {
                    q: 'What is AEO and GEO, and why does my business need it?',
                    a: 'AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization) optimize your brand content, structured schema, and citations so AI models like ChatGPT, Gemini, Copilot, and Perplexity recommend your business as the definitive answer when users ask conversational buying questions.'
                },
                {
                    q: 'How quickly can we expect to see results from SEO vs PPC?',
                    a: 'PPC (Google & Meta Ads) can start driving qualified traffic and conversions within 48 to 72 hours of campaign launch. SEO is a compounding long-term asset that typically begins generating significant organic traffic and top rankings within 3 to 6 months.'
                },
                {
                    q: 'Who pays for the advertising budget on Google or Meta?',
                    a: 'You pay Google and Meta directly through your own ad accounts. We never markup your ad spend. You retain 100% ownership and visibility into every cent spent on advertising.'
                },
                {
                    q: 'Do you provide detailed weekly and monthly performance reports?',
                    a: 'Yes. You receive live 24/7 access to a dedicated Looker Studio dashboard tracking real-time conversions, ROAS, keyword rankings, and pipeline revenue, accompanied by bi-weekly strategy syncs.'
                },
                {
                    q: 'Are your SEO practices compliant with Google Search guidelines?',
                    a: '100%. We practice strict White Hat SEO. We never use automated link farms, private blog networks (PBNs), or spammy tactics that could put your business at risk of Google algorithmic penalties.'
                }
            ]
        },
        cta: {
            badge: 'Accelerate Growth',
            title: 'Ready to Dominate Search Engines & Acquire High-Value Customers?',
            description: 'Claim your comprehensive digital growth audit and competitor gap analysis today.',
            buttonText: 'Claim Your Growth Audit',
            secondaryButtonText: 'Schedule Strategy Call'
        },
        subServices: [
            {
                slug: 'aeo-answer-engine-optimization',
                name: 'AEO (Answer Engine Optimization)',
                desc: 'AI answer engine visibility and conversational query targeting to make your brand the definitive answer on AI assistants.',
                hero: {
                    title: 'Dominate Conversational',
                    highlight: 'Answer Engine Optimization',
                    titleSuffix: 'on Modern AI Assistants.',
                    description: 'Position your business as the primary source cited by ChatGPT, Siri, Google Gemini, and voice assistants.'
                },
                about: {
                    image: '/services-images-set2/aeo.png'
                },
                whyChooseUs: {
                    image: '/services-images-set2/aeo.png'
                }
            },
            {
                slug: 'geo-generative-engine-optimization',
                name: 'GEO (Generative Engine Optimization)',
                desc: 'Optimization for ChatGPT, Gemini, Copilot, and Perplexity to capture customer demand generated by LLMs.',
                hero: {
                    title: 'Pioneering',
                    highlight: 'Generative Engine Optimization',
                    titleSuffix: 'for LLM Discovery.',
                    description: 'Ensure your brand, products, and services are consistently recommended by generative AI search engines.'
                },
                about: {
                    image: '/services-images-set2/image.png'
                },
                whyChooseUs: {
                    image: '/services-images-set2/image.png'
                }
            },
            {
                slug: 'ai-seo',
                name: 'AI SEO',
                desc: 'Next-gen algorithmic and semantic search intelligence blending machine learning with technical search architecture.',
                hero: {
                    title: 'Next-Generation',
                    highlight: 'AI-Powered SEO',
                    titleSuffix: 'for Sustainable Organic Growth.',
                    description: 'Harness semantic search intelligence, topical authority clustering, and neural matching to rank top on Google.'
                },
                about: {
                    image: '/services-images-set2/Ai.png'
                },
                whyChooseUs: {
                    image: '/services-images-set2/Ai.png'
                }
            },
            {
                slug: 'social-media-marketing',
                name: 'Social Media Marketing',
                desc: 'Omnichannel brand awareness, viral campaigns, community reach, and high-impact social advertising across Meta and LinkedIn.',
                hero: {
                    title: 'High-Impact',
                    highlight: 'Social Media Marketing',
                    titleSuffix: 'That Builds Loyal Communities.',
                    description: 'Build organic brand equity and high-converting paid social campaigns across LinkedIn, Instagram, and YouTube.'
                },
                about: {
                    image: '/services-images-set2/digital-marketing.png'
                },
                whyChooseUs: {
                    image: '/services-images-set2/digital-marketing.png'
                }
            },
            {
                slug: 'ppc-paid-advertising',
                name: '(PPC) Paid Advertising',
                desc: 'High-ROI Google, Meta, Bing, and LinkedIn targeted ad campaigns optimized for maximum return on ad spend.',
                hero: {
                    title: 'Precision-Targeted',
                    highlight: 'PPC Paid Advertising',
                    titleSuffix: 'with Measurable ROAS.',
                    description: 'Turn ad spend into predictable revenue with data-backed search and display campaigns engineered for high conversion.'
                },
                about: {
                    image: '/services-images-set2/ppc.png'
                },
                whyChooseUs: {
                    image: '/services-images-set2/ppc.png'
                }
            },
            {
                slug: 'email-marketing',
                name: 'Email Marketing',
                desc: 'Automated newsletters, drip sequences, behavioral trigger emails, and customer retention funnels.',
                hero: {
                    title: 'Automated',
                    highlight: 'Email Marketing Funnels',
                    titleSuffix: 'That Boost LTV.',
                    description: 'Nurture leads into customers and drive high lifetime value with behavioral email flows and personalized campaigns.'
                },
                about: {
                    image: '/services-images-set2/email-marketing.png'
                },
                whyChooseUs: {
                    image: '/services-images-set2/email-marketing.png'
                }
            },
            {
                slug: 'whatsapp-marketing',
                name: 'WhatsApp Marketing',
                desc: 'Direct conversational commerce, broadcast alerts, and automated CRM engagement with 98% open rates.',
                hero: {
                    title: 'Conversational',
                    highlight: 'WhatsApp Marketing',
                    titleSuffix: 'with 98% Read Rates.',
                    description: 'Engage customers directly on WhatsApp with official Business API automations, instant catalog checkouts, and CRM alerts.'
                },
                about: {
                    image: '/services-images-set2/whatapp-marketing.png'
                },
                whyChooseUs: {
                    image: '/services-images-set2/whatapp-marketing.png'
                }
            },
            {
                slug: 'sms-marketing',
                name: 'SMS Marketing',
                desc: 'Instant deliverability text campaigns, flash sale notifications, and high-converting promotional alerts.',
                hero: {
                    title: 'Instant Deliverability',
                    highlight: 'SMS Marketing',
                    titleSuffix: 'for Rapid Response.',
                    description: 'Reach customers instantly with targeted SMS alerts and time-sensitive promotions that drive immediate action.'
                },
                about: {
                    image: '/services-images-set2/sms.png'
                },
                whyChooseUs: {
                    image: '/services-images-set2/sms.png'
                }
            },
            {
                slug: 'content-marketing',
                name: 'Content Marketing',
                desc: 'High-authority industry thought leadership, technical whitepapers, case studies, and conversion-focused copywriting.',
                hero: {
                    title: 'High-Authority',
                    highlight: 'Content Marketing',
                    titleSuffix: 'That Establishes Leadership.',
                    description: 'Attract high-intent buyers with compelling technical thought leadership, articles, and comprehensive guides.'
                },
                about: {
                    image: '/services-images-set2/content.png'
                },
                whyChooseUs: {
                    image: '/services-images-set2/content.png'
                }
            },
            {
                slug: 'video-marketing',
                name: 'Video Marketing',
                desc: 'Engaging video campaigns, YouTube channel growth, short-form reels, and commercial brand video production.',
                hero: {
                    title: 'Engaging Commercial',
                    highlight: 'Video Marketing',
                    titleSuffix: 'That Commands Attention.',
                    description: 'Tell your brand story with compelling video creative optimized for YouTube, Instagram Reels, and conversion landing pages.'
                },
                about: {
                    image: '/services-images-set2/video.png'
                },
                whyChooseUs: {
                    image: '/services-images-set2/video.png'
                }
            },
            {
                slug: 'white-hat-seo-services',
                name: 'White Hat SEO Services',
                desc: 'Ethical, sustainable long-term top organic search rankings built strictly within Google Webmaster Guidelines.',
                hero: {
                    title: '100% Compliant',
                    highlight: 'White Hat SEO Services',
                    titleSuffix: 'for Long-Term Rankings.',
                    description: 'Build enduring organic authority that withstands Google algorithmic updates and systematically scales your organic pipeline.'
                },
                about: {
                    image: '/services-images-set2/white-hat-seo.png'
                },
                whyChooseUs: {
                    image: '/services-images-set2/white-hat-seo.png'
                }
            },
            {
                slug: 'link-building-services',
                name: 'Link Building Services',
                desc: 'High-authority backlink outreach, digital PR, and genuine editorial placements that dramatically boost domain authority.',
                hero: {
                    title: 'High-Authority',
                    highlight: 'Link Building Services',
                    titleSuffix: 'from Real Publications.',
                    description: 'Acquire high-DR editorial backlinks from genuine industry publications to establish dominant domain authority.'
                },
                about: {
                    image: '/services-images-set2/link.png'
                },
                whyChooseUs: {
                    image: '/services-images-set2/link.png'
                }
            },
            {
                slug: 'orm-online-reputation-management',
                name: 'ORM (Online Reputation Management)',
                desc: 'Brand sentiment monitoring, positive review curation, and crisis mitigation across Google, Trustpilot, and social networks.',
                hero: {
                    title: 'Proactive',
                    highlight: 'Online Reputation Management',
                    titleSuffix: 'Protecting Your Brand.',
                    description: 'Take control of your digital narrative, accelerate 5-star customer reviews, and protect your hard-earned corporate reputation.'
                },
                about: {
                    image: '/services-images-set2/orm.png'
                },
                whyChooseUs: {
                    image: '/services-images-set2/orm.png'
                }
            }
        ]
    },

    // ─────────────────────────────────────────────────────────────
    // 6. CREATIVE SOLUTIONS
    // ─────────────────────────────────────────────────────────────
    {
        id: 'creative-solutions',
        slug: 'creative-solutions',
        name: 'Creative Solutions',
        category: 'Branding, UI/UX & Visual Storytelling',
        tagline: 'Cutting-Edge Design, Branding & Visual Storytelling',
        desc: 'Bespoke corporate identity, human-centric UI/UX design, 3D motion graphics, brand design systems, and digital product prototyping that captivates audiences and establishes unmistakable brand authority.',
        hero: {
            title: 'Visionary Brand Design &',
            highlight: 'Creative Solutions',
            titleSuffix: 'That Inspire Action.',
            description: 'We translate complex brand philosophies into stunning visual identities, intuitive user interfaces, and immersive multimedia content that leaves an indelible impression on your target audience.',
            bgImage: '/service.png',
            ctaPrimary: 'Explore Design Services',
            ctaSecondary: 'View Creative Portfolio'
        },
        about: {
            badge: 'Visual Craftsmanship',
            title: 'Elevating Brands Through Human-Centric Design & Visual Precision',
            description: 'In an oversaturated digital world, generic design is invisible. At VR4Web, our creative studio blends behavioral psychology with avant-garde aesthetics to design corporate marks, digital products, and motion graphics that demand immediate respect.',
            descriptionSecondary: 'From complete brand identity systems (typography, iconography, color theory) to complex enterprise UI/UX wireframes tested on real users, we craft visual assets that tell a coherent, unforgettable story across every touchpoint.',
            image: '/services-set3/logo.png',
            highlights: [
                { title: 'Human-Centric UX Architecture', desc: 'Wireframing, customer journey mapping, and interactive prototypes tested for cognitive ease.' },
                { title: 'Distinctive Corporate Identity', desc: 'Memorable brand marks, comprehensive style guides, and complete digital design systems.' },
                { title: '3D Motion Graphics & Video', desc: 'High-definition 3D product animations and commercial video assets that stop the scroll.' },
                { title: 'Design System Governance', desc: 'Figma component libraries and design tokens bridging the gap between designers and developers.' }
            ],
            stats: [
                { label: 'Brand Identities Created', value: '140+' },
                { label: 'Design Awards Won', value: '18' },
                { label: 'Prototypes Delivered', value: '300+' }
            ]
        },
        features: {
            badge: 'Creative Capabilities',
            title: 'Full-Spectrum Creative Design & Visual Engineering',
            description: 'Everything your brand needs to command attention, convey prestige, and deliver delightful digital interactions.',
            items: [
                {
                    title: 'UI/UX Design & Design Systems',
                    description: 'Comprehensive user journeys, wireframes, high-fidelity prototypes, and scalable Figma design systems.',
                    iconName: 'LayoutGrid',
                    badge: 'Figma Mastery',
                    points: ['Design tokens & atomic components', 'Usability testing sessions', 'Dark & light mode parity']
                },
                {
                    title: 'Custom Corporate Logo & Brand Identity',
                    description: 'Distinctive brand marks, complete color palettes, custom typography, and multi-page brand guideline manuals.',
                    iconName: 'PenTool',
                    badge: 'Iconic Branding',
                    points: ['Vector master files (SVG/AI)', 'Brand typography hierarchy', 'Stationery & digital collateral']
                },
                {
                    title: 'Creative Video Production & 3D Motion',
                    description: 'High-definition brand commercials, 3D product renderings, explanatory animations, and promotional teasers.',
                    iconName: 'Film',
                    badge: 'Cinema Quality',
                    points: ['Cinema 4D / After Effects', 'Sound design & voiceovers', 'Social-optimized aspect ratios']
                },
                {
                    title: 'Product Design & Rapid Prototyping',
                    description: 'End-to-end digital product design from initial napkin sketches to interactive, clickable prototypes ready for user testing.',
                    iconName: 'Box',
                    badge: 'Investor Ready',
                    points: ['Micro-interaction states', 'Realistic dummy data feeds', 'Developer handover tokens']
                },
                {
                    title: 'Technical User Manuals & Documentation',
                    description: 'Illustrated technical documentation, onboarding guides, and interactive user manuals that simplify complex systems.',
                    iconName: 'BookOpenCheck',
                    badge: 'Crystal Clarity',
                    points: ['Isometric technical illustrations', 'Step-by-step visual flows', 'PDF & web-interactive formats']
                },
                {
                    title: 'Social Media Creative & Ad Visuals',
                    description: 'High-converting social graphics, carousel templates, banner ads, and marketing collateral engineered to maximize engagement.',
                    iconName: 'ImagePlus',
                    badge: 'Viral Engagement',
                    points: ['High-CTR ad creative variations', 'Cohesive brand aesthetic', 'Modular Canva & Figma kits']
                }
            ]
        },
        process: {
            badge: 'Creative Workflow',
            title: 'Our 5-Stage Creative & Design Thinking Methodology',
            description: 'A disciplined, iterative design process that aligns creative brilliance with strategic business outcomes.',
            bgImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80',
            steps: [
                {
                    step: '01',
                    title: 'Brand Immersion & Moodboarding',
                    description: 'We explore your company culture, competitive differentiation, and target demographic psychology through moodboards.',
                    deliverables: 'Visual Direction Moodboard & Brand Archetype'
                },
                {
                    step: '02',
                    title: 'Wireframing & Structural Exploration',
                    description: 'Creating low-fidelity wireframes and structural sketches to establish information hierarchy without aesthetic bias.',
                    deliverables: 'Low-Fidelity Wireframes & User Journey Maps'
                },
                {
                    step: '03',
                    title: 'High-Fidelity Concept Development',
                    description: 'Rendering detailed visual concepts, custom typography combinations, color swatches, and micro-interaction states.',
                    deliverables: 'Interactive Figma Prototype for Review'
                },
                {
                    step: '04',
                    title: 'Usability Validation & Refinement',
                    description: 'Testing designs against real user scenarios, refining contrast ratios for accessibility (WCAG), and perfecting polish.',
                    deliverables: 'User Feedback Matrix & Polish Sprints'
                },
                {
                    step: '05',
                    title: 'Design System Delivery & Asset Export',
                    description: 'Delivering comprehensive Figma component libraries, design token specifications, and export-ready vector assets.',
                    deliverables: 'Complete Design System & Master Vector Assets'
                }
            ]
        },
        whyChooseUs: {
            badge: 'Why VR4Web Creative',
            title: 'Designs That Elevate Brand Valuation and Captivate Audiences',
            description: 'We bridge fine art with conversion science to create designs that aren’t merely decorative—they achieve strategic commercial goals.',
            image: '/services-set3/uiux.png',
            reasons: [
                {
                    title: 'Obsession with Typography & Details',
                    description: 'Every kerning pair, line-height ratio, and drop shadow is calibrated with surgical precision for visual balance.',
                    iconName: 'Sparkles'
                },
                {
                    title: 'Seamless Developer Collaboration',
                    description: 'Our designers code. We structure Figma files with auto-layout and design tokens so developers build pixel-perfect software.',
                    iconName: 'Code'
                },
                {
                    title: 'WCAG AAA Accessibility Standards',
                    description: 'We ensure color contrast, tap targets, and typography comply with global accessibility standards for all users.',
                    iconName: 'Eye'
                },
                {
                    title: '100% Vector Master File Ownership',
                    description: 'You receive all raw vector source files (Figma, Illustrator, After Effects) with unrestricted commercial copyright.',
                    iconName: 'FolderCheck'
                }
            ],
            guarantees: ['100% Source File Transfer', 'WCAG Compliant', 'Zero Template Reuse', 'Unlimited Revision Rounds']
        },
        techStack: {
            badge: 'Design Arsenal',
            title: 'Built with the World’s Premier Creative Toolchain',
            description: 'We utilize state-of-the-art design, 3D, and motion software to produce stunning visual artifacts.',
            categories: [
                {
                    name: 'UI/UX & Prototyping',
                    items: [
                        { name: 'Figma', type: 'Design Systems & UI', iconName: 'Layout' },
                        { name: 'ProtoPie', type: 'Advanced Sensor Prototyping', iconName: 'Smartphone' },
                        { name: 'Framer', type: 'Interactive Web Motion', iconName: 'Zap' },
                        { name: 'Miro', type: 'User Journey Mapping', iconName: 'Grid' }
                    ]
                },
                {
                    name: 'Graphic & Brand Identity',
                    items: [
                        { name: 'Adobe Illustrator', type: 'Vector Typography & Logos', iconName: 'PenTool' },
                        { name: 'Adobe Photoshop', type: 'High-Res Asset Retouching', iconName: 'Image' },
                        { name: 'Adobe InDesign', type: 'Editorial & Brand Manuals', iconName: 'Book' },
                        { name: 'Glyphs', type: 'Custom Font Crafting', iconName: 'Type' }
                    ]
                },
                {
                    name: '3D & Motion Production',
                    items: [
                        { name: 'Cinema 4D', type: '3D Product Rendering', iconName: 'Box' },
                        { name: 'Adobe After Effects', type: 'Motion Graphics & VFX', iconName: 'Film' },
                        { name: 'Blender', type: 'Open-Source 3D Modeling', iconName: 'Layers' },
                        { name: 'DaVinci Resolve', type: 'Color Grading & Film Finish', iconName: 'Video' }
                    ]
                },
                {
                    name: 'Design Tokens & Handoff',
                    items: [
                        { name: 'Tokens Studio', type: 'Figma Design Tokens', iconName: 'Sliders' },
                        { name: 'Storybook', type: 'Component Documentation', iconName: 'BookOpen' },
                        { name: 'Zeplin', type: 'Spec Inspection', iconName: 'CheckSquare' },
                        { name: 'Lottie', type: 'Lightweight Web Animations', iconName: 'PlayCircle' }
                    ]
                }
            ]
        },
        industries: {
            badge: 'Creative Domains',
            title: 'Crafting Visual Identities Across Diverse Sectors',
            description: 'From luxury lifestyle brands to enterprise software interfaces, our creative solutions resonate globally.',
            image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1000&q=80',
            list: [
                {
                    name: 'Luxury Goods & High Fashion',
                    description: 'Editorial brand marks, minimalist typography, and tactile print packaging that communicates supreme luxury.',
                    useCase: 'Haute horlogerie brand identity and luxury packaging design.'
                },
                {
                    name: 'Fintech & Digital Banking',
                    description: 'Trust-inspiring dark mode UI dashboards, micro-animated transaction confirmations, and crystal-clear data visualization.',
                    useCase: 'Modern investment banking mobile app interface.'
                },
                {
                    name: 'Consumer Electronics & Hardware',
                    description: 'Photorealistic 3D product renders, exploded view animations, and unboxing packaging design.',
                    useCase: 'Premium wireless headphone 3D commercial and product packaging.'
                },
                {
                    name: 'Healthcare & Biotech Startups',
                    description: 'Scientific isometric infographics, clean patient portal UI, and humanizing healthcare brand identities.',
                    useCase: 'Genomics startup visual identity and interactive web portal.'
                },
                {
                    name: 'Hospitality & Luxury Resorts',
                    description: 'Sensory visual storytelling, custom guest collateral, restaurant menus, and experiential digital guides.',
                    useCase: 'Five-star eco-resort complete brand identity and guest companion app.'
                },
                {
                    name: 'B2B Enterprise SaaS',
                    description: 'Modern design systems with 200+ modular components that reduce development time by 40%.',
                    useCase: 'Cloud infrastructure monitoring platform UI/UX redesign.'
                }
            ]
        },
        testimonials: {
            badge: 'Creative Feedback',
            title: 'Endorsed by Visionary Founders and Product Leaders',
            description: 'Read how our creative solutions elevated brands and won over discerning audiences.',
            items: [
                {
                    quote: 'VR4Web’s UI/UX team redesigned our SaaS platform from the ground up. Our user onboarding drop-off rate fell by 55%, and our users constantly compliment how intuitive and gorgeous the interface feels.',
                    author: 'Camilla Valenti',
                    role: 'Chief Product Officer',
                    company: 'Krypton Analytics Milan',
                    rating: 5,
                    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
                },
                {
                    quote: 'The 3D product video and brand identity they produced for our hardware launch was cinema-grade. It helped us generate $1.8M in pre-orders within our first 72 hours of going live.',
                    author: 'Thomas Sterling',
                    role: 'Co-Founder',
                    company: 'Veloce Audio Technologies UK',
                    rating: 5,
                    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80'
                },
                {
                    quote: 'Their attention to typographic nuance, brand guidelines, and design system architecture is truly world-class. They didn’t just give us a logo—they gave us an enduring brand identity.',
                    author: 'Maya Lin',
                    role: 'Global Marketing Director',
                    company: 'Aetheria Hospitality Group',
                    rating: 5,
                    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
                }
            ]
        },
        faqs: {
            badge: 'Creative FAQs',
            title: 'Frequently Asked Questions About Creative Solutions',
            description: 'Clear details on design deliverables, revision rounds, and format handovers.',
            items: [
                {
                    q: 'What deliverables are included with a brand identity project?',
                    a: 'A complete corporate identity package includes your primary logo mark, secondary lockups, favicon, complete color palette (RGB, CMYK, Pantone), custom typography system, brand usage guidelines (PDF manual), stationery templates, and all raw vector master files (AI, SVG, EPS).'
                },
                {
                    q: 'How many design concepts and revisions are included?',
                    a: 'We typically present 3 distinctly different creative visual directions during the conceptual stage. Once a direction is chosen, we iterate through collaborative feedback rounds until you are 100% satisfied with the outcome.'
                },
                {
                    q: 'Do you hand over the design files so our internal team can edit them?',
                    a: 'Yes, 100%. All design work is created in Figma and Adobe Creative Cloud. We transfer full project ownership, component libraries, and master vector assets directly to your team upon completion.'
                },
                {
                    q: 'Can you work within our existing brand guidelines for new product UI?',
                    a: 'Absolutely. We routinely ingest established brand books and design systems, extending them with new components and design patterns while strictly honoring your brand’s visual heritage.'
                },
                {
                    q: 'Do your UI/UX designs include mobile and tablet responsive layouts?',
                    a: 'Yes. Every screen is designed across mobile (375px/390px), tablet (768px/1024px), and desktop (1440px) breakpoints with comprehensive micro-interaction states.'
                }
            ]
        },
        cta: {
            badge: 'Elevate Your Brand',
            title: 'Ready for a Visual Identity That Commands Market Respect?',
            description: 'Speak directly with our design director to discuss your brand vision and creative roadmap.',
            buttonText: 'Start a Creative Project',
            secondaryButtonText: 'View Design Portfolio'
        },
        subServices: [
            {
                slug: 'ui-ux-design-services',
                name: 'UI/UX Design Services',
                desc: 'Human-centric user journeys, wireframing, interactive prototypes, and design systems tested on real users.',
                hero: {
                    title: 'Human-Centric',
                    highlight: 'UI/UX Design Services',
                    titleSuffix: 'for Web & Mobile Apps.',
                    description: 'Transform complex workflows into elegant, intuitive interfaces with research-backed UX architecture and pixel-perfect UI.'
                },
                about: {
                    image: '/services-set3/uiux.png'
                },
                whyChooseUs: {
                    image: '/services-set3/uiux.png'
                }
            },
            {
                slug: 'custom-logo-design',
                name: 'Custom Logo Design',
                desc: 'Distinctive, memorable corporate brand marks, typography guidelines, and complete vector identity assets.',
                hero: {
                    title: 'Distinctive & Timeless',
                    highlight: 'Custom Logo Design',
                    titleSuffix: 'and Corporate Identity.',
                    description: 'Stand out in any market with an iconic, scientifically balanced corporate brand mark that commands immediate prestige.'
                },
                about: {
                    image: '/services-set3/logo.png'
                },
                whyChooseUs: {
                    image: '/services-set3/logo.png'
                }
            },
            {
                slug: 'creative-video-production',
                name: 'Creative Video Production',
                desc: 'High-definition brand commercials, 3D motion graphics, product trailers, and promotional animated teasers.',
                hero: {
                    title: 'Cinematic & Dynamic',
                    highlight: 'Video Production',
                    titleSuffix: 'and 3D Motion Graphics.',
                    description: 'Captivate your audience with high-definition video storytelling and photorealistic 3D product motion graphics.'
                },
                about: {
                    image: '/services-set3/video.png'
                },
                whyChooseUs: {
                    image: '/services-set3/video.png'
                }
            },
            {
                slug: 'user-manual-development',
                name: 'User Manual Development',
                desc: 'Comprehensive technical documentation, visual onboarding guides, and interactive operational manuals.',
                hero: {
                    title: 'Clear & Engaging',
                    highlight: 'User Manual Development',
                    titleSuffix: 'and Technical Guides.',
                    description: 'Demystify complex hardware and software systems with beautifully illustrated technical guides and interactive manuals.'
                },
                about: {
                    image: '/services-set3/user-management.png'
                },
                whyChooseUs: {
                    image: '/services-set3/user-management.png'
                }
            },
            {
                slug: 'product-design-and-prototyping',
                name: 'Product Design and Prototyping',
                desc: 'End-to-end digital and physical product UX, interactive Figma prototypes, and 3D industrial modeling.',
                hero: {
                    title: 'Investor-Ready',
                    highlight: 'Product Design & Prototyping',
                    titleSuffix: 'for Innovative Ideas.',
                    description: 'Accelerate stakeholder buy-in and user validation with interactive clickable prototypes and 3D visual models.'
                },
                about: {
                    image: '/services-set3/product-design.png'
                },
                whyChooseUs: {
                    image: '/services-set3/product-design.png'
                }
            },
            {
                slug: 'social-media-creative-design',
                name: 'Social Media Creative Design',
                desc: 'Eye-catching social graphics, carousels, banner ads, and viral creative assets engineered to stop the scroll.',
                hero: {
                    title: 'High-Converting',
                    highlight: 'Social Media Creative Design',
                    titleSuffix: 'Engineered to Stop the Scroll.',
                    description: 'Supercharge your organic engagement and paid ad CTRs with cohesive, trend-aware social media graphics and carousels.'
                },
                about: {
                    image: '/services-set3/social-media.png'
                },
                whyChooseUs: {
                    image: '/services-set3/social-media.png'
                }
            }
        ]
    },

    // ─────────────────────────────────────────────────────────────
    // 7. BACK OFFICE SUPPORT
    // ─────────────────────────────────────────────────────────────
    {
        id: 'back-office',
        slug: 'back-office-support',
        name: 'Back Office Support',
        category: 'Operations, SLA Support & Security',
        tagline: 'Continuous Operational, Technical & Administrative Excellence',
        desc: 'Round-the-clock 24/7 technical monitoring, e-commerce store maintenance, database security hardening, malware scanning, and operational order fulfillment workflows that keep your business running smoothly.',
        hero: {
            title: 'Always-On 24/7',
            highlight: 'Back Office Support',
            titleSuffix: '& Technical Maintenance.',
            description: 'Protect your revenue and peace of mind. We provide enterprise-grade 24/7 technical helpdesk, proactive malware monitoring, server hardening, e-commerce store upkeep, and backend data processing so your team can focus on growth.',
            bgImage: '/service.png',
            ctaPrimary: 'Explore Support Plans',
            ctaSecondary: 'Request SLA Details'
        },
        about: {
            badge: 'Operational Continuity',
            title: 'Guaranteed Uptime, Rock-Solid Security & Seamless Daily Operations',
            description: 'A broken checkout, unpatched security vulnerability, or slow customer resolution can instantly wipe out months of hard-earned goodwill. VR4Web provides proactive, round-the-clock operational and technical support to eliminate downtime before it affects your customers.',
            descriptionSecondary: 'From managing catalog inventory updates and resolving order processing issues to conducting automated weekly security vulnerability scans and core framework updates, our dedicated team acts as an extension of your company.',
            image: '/services-set4/support.png',
            highlights: [
                { title: '15-Minute Critical SLA', desc: 'Guaranteed rapid response times for production outages and severe operational incidents.' },
                { title: 'Proactive Malware & Vulnerability Audits', desc: 'Continuous automated vulnerability scans, core patches, and firewall monitoring.' },
                { title: 'E-Commerce Store Upkeep', desc: 'Catalog updates, variant pricing sync, broken link remediation, and plugin compatibility testing.' },
                { title: 'Backend Order Processing', desc: 'Fulfillment queue reconciliation, customer data verification, and billing dispute processing.' }
            ],
            stats: [
                { label: 'Uptime Maintained', value: '99.98%' },
                { label: 'Avg Ticket Resolution', value: '< 28 min' },
                { label: 'Threats Blocked / Month', value: '45K+' }
            ]
        },
        features: {
            badge: 'Support Capabilities',
            title: 'Comprehensive Operations, Maintenance & Threat Mitigation',
            description: 'Everything required to safeguard your digital infrastructure and ensure frictionless daily operations.',
            items: [
                {
                    title: '24/7/365 Monitoring & SLA Helpdesk',
                    description: 'Round-the-clock server health monitoring, incident alerting, and immediate human response to critical outages.',
                    iconName: 'Clock',
                    badge: '15-Min Response SLA',
                    points: ['Datadog & PagerDuty integration', 'Real-time server uptime metrics', 'Dedicated emergency escalation hotline']
                },
                {
                    title: 'E-Commerce Website Maintenance',
                    description: 'Regular checkout simulations, inventory stock reconciliation, plugin security updates, and database indexing.',
                    iconName: 'Wrench',
                    badge: 'Zero Checkout Glitches',
                    points: ['Daily automated checkout tests', 'Plugin conflict sandboxing', 'Product catalog updates']
                },
                {
                    title: 'Security Hardening & Malware Scanning',
                    description: 'Proactive web application firewall (WAF) management, daily malware scans, SSL renewal, and DDoS mitigation.',
                    iconName: 'Lock',
                    badge: 'Zero Breaches',
                    points: ['Automated daily offsite backups', 'Vulnerability penetration scans', 'WAF & brute-force blocking']
                },
                {
                    title: 'Order & Backend Data Management',
                    description: 'Managing catalog updates, tracking logistics exceptions, processing customer refunds, and cleansing database records.',
                    iconName: 'ClipboardCheck',
                    badge: 'Flawless Operations',
                    points: ['Order exception triage', 'Customer CRM hygiene', 'Inventory stock level audits']
                },
                {
                    title: 'Core & Database Optimization',
                    description: 'Scheduled database defragmentation, query optimization, CDN cache purging, and framework version upgrades.',
                    iconName: 'Database',
                    badge: 'Peak Performance',
                    points: ['Slow query optimization', 'Storage auto-scaling', 'Routine log purging']
                },
                {
                    title: 'Disaster Recovery & Hot Backups',
                    description: 'Automated hourly and daily encrypted snapshots stored in geographically isolated cloud vaults with instant restore.',
                    iconName: 'ShieldAlert',
                    badge: '1-Hour RTO Guarantee',
                    points: ['Geo-redundant encrypted snapshots', 'Tested 1-hour recovery time', 'Zero data corruption']
                }
            ]
        },
        process: {
            badge: 'Operational Framework',
            title: 'Our 5-Stage Proactive Support & Monitoring Protocol',
            description: 'How our engineers ensure your systems run continuously with zero unexpected downtime.',
            bgImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80',
            steps: [
                {
                    step: '01',
                    title: 'System Health & Security Audit',
                    description: 'We audit your current server configurations, database indexing, plugin dependencies, and security vulnerabilities.',
                    deliverables: 'Comprehensive Security & Health Baseline Report'
                },
                {
                    step: '02',
                    title: 'Automated Telemetry & Alert Setup',
                    description: 'Installing server agents, uptime monitors, synthetic checkout robots, and PagerDuty alert escalation matrices.',
                    deliverables: 'Live Telemetry Dashboard & Alert Verification'
                },
                {
                    step: '03',
                    title: 'Disaster Recovery & Backup Automation',
                    description: 'Configuring automated daily encrypted cloud snapshots with tested recovery procedures and zero-data-loss validation.',
                    deliverables: 'Tested Disaster Recovery Runbook'
                },
                {
                    step: '04',
                    title: 'Daily Maintenance & Patch Execution',
                    description: 'Applying verified security patches in sandbox environments before deployment, alongside continuous database tuning.',
                    deliverables: 'Weekly Changelog & Patch Verification'
                },
                {
                    step: '05',
                    title: 'Monthly Incident & Performance Review',
                    description: 'Reviewing uptime percentages, resolved support tickets, blocked threats, and optimization recommendations.',
                    deliverables: 'Executive Monthly Uptime & Security Report'
                }
            ]
        },
        whyChooseUs: {
            badge: 'Why VR4Web Support',
            title: 'Enterprise Reliability Without the Overhead of a 24/7 In-House Team',
            description: 'Building an in-house 24/7/365 engineering operations team costs hundreds of thousands annually. We provide elite coverage at a fraction of the cost.',
            image: '/services-set4/tech-management.png',
            reasons: [
                {
                    title: 'Guaranteed 15-Minute Critical SLA',
                    description: 'When production issues occur at 2 AM on a Sunday, our on-call senior engineers are actively resolving them within 15 minutes.',
                    iconName: 'Clock'
                },
                {
                    title: 'Proactive, Never Reactive',
                    description: 'We fix disk space warnings, query bottlenecks, and memory leaks before they ever impact your customers.',
                    iconName: 'ShieldCheck'
                },
                {
                    title: 'Staging Sandbox Testing',
                    description: 'We never test plugin updates or database migrations on live production environments. Everything is validated on staging first.',
                    iconName: 'Layers'
                },
                {
                    title: 'Transparent Ticketing Portal',
                    description: 'Real-time visibility into every support ticket, resolution notes, and SLA compliance timestamp in our client portal.',
                    iconName: 'FileText'
                }
            ],
            guarantees: ['15-Min Response SLA', '99.98% Uptime Target', 'Hourly Cloud Backups', 'Zero Production Disruption']
        },
        techStack: {
            badge: 'Operations & Security Stack',
            title: 'Powered by Industry-Standard Monitoring & Security Infrastructure',
            description: 'We employ the same enterprise monitoring tools utilized by Fortune 500 tech companies to safeguard your platforms.',
            categories: [
                {
                    name: 'Monitoring & APM',
                    items: [
                        { name: 'Datadog', type: 'Full-Stack APM & Logs', iconName: 'Activity' },
                        { name: 'New Relic', type: 'Application Telemetry', iconName: 'Cpu' },
                        { name: 'UptimeRobot', type: 'Global Synthetic Pings', iconName: 'Globe' },
                        { name: 'Sentry', type: 'Real-Time Error Tracking', iconName: 'AlertTriangle' }
                    ]
                },
                {
                    name: 'Security & Firewalls',
                    items: [
                        { name: 'Cloudflare Enterprise', type: 'WAF & DDoS Shield', iconName: 'Shield' },
                        { name: 'Sucuri Security', type: 'Malware Scanning & Removal', iconName: 'Lock' },
                        { name: 'AWS GuardDuty', type: 'Intelligent Threat Detection', iconName: 'Eye' },
                        { name: 'Let’s Encrypt / DigiCert', type: 'Automated SSL Management', iconName: 'Key' }
                    ]
                },
                {
                    name: 'Backup & Recovery',
                    items: [
                        { name: 'AWS S3 Glacier', type: 'Immutable Cold Storage', iconName: 'Cloud' },
                        { name: 'Veeam Backup', type: 'Enterprise Server Snapshots', iconName: 'HardDrive' },
                        { name: 'UpdraftPlus Enterprise', type: 'Automated CMS Snapshots', iconName: 'RotateCcw' },
                        { name: 'HashiCorp Vault', type: 'Secret & Key Management', iconName: 'Lock' }
                    ]
                },
                {
                    name: 'Ticketing & Operations',
                    items: [
                        { name: 'Jira Service Management', type: 'SLA Ticket Tracking', iconName: 'CheckSquare' },
                        { name: 'PagerDuty', type: 'Automated On-Call Escalation', iconName: 'Bell' },
                        { name: 'Slack Enterprise Connect', type: 'Real-Time Emergency Chat', iconName: 'MessageSquare' },
                        { name: 'Zendesk', type: 'Multi-Channel Customer Desk', iconName: 'Headphones' }
                    ]
                }
            ]
        },
        industries: {
            badge: 'Sectors Supported',
            title: 'Mission-Critical Operations Across Regulated Verticals',
            description: 'Our back-office and SLA engineers support industries where downtime or security lapses carry severe financial consequences.',
            image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=1000&q=80',
            list: [
                {
                    name: 'High-Volume E-Commerce Retail',
                    description: 'Zero-downtime Black Friday / Cyber Monday surge monitoring, checkout health checks, and rapid inventory updates.',
                    useCase: 'Multi-brand retail store processing 4,000 orders daily without a hitch.'
                },
                {
                    name: 'Healthcare & Patient Management',
                    description: 'HIPAA-compliant server hardening, automated encrypted backup rotation, and real-time telehealth connectivity monitoring.',
                    useCase: 'Telemedicine network with 24/7/365 operational server uptime.'
                },
                {
                    name: 'Financial Services & Payment Portals',
                    description: 'PCI-DSS compliance maintenance, SSL key rotation, automated intrusion detection, and audit trail preservation.',
                    useCase: 'Fintech transaction gateway with 99.99% availability.'
                },
                {
                    name: 'Logistics & 24/7 Fleet Tracking',
                    description: 'Continuous API bridge monitoring, driver GPS telemetry server maintenance, and order dispatch queue triage.',
                    useCase: 'Freight logistics platform dispatching 800 trucks daily.'
                },
                {
                    name: 'B2B Enterprise SaaS',
                    description: 'Multi-tenant database defragmentation, automated customer provisioning, and SLA ticket resolution for business clients.',
                    useCase: 'Global SaaS enterprise supporting users across 14 time zones.'
                },
                {
                    name: 'Online Education & Streaming',
                    description: 'Video streaming bandwidth balancing, student exam server surge capacity, and payment gateway health monitoring.',
                    useCase: 'Certification platform supporting 50,000 simultaneous test-takers.'
                }
            ]
        },
        testimonials: {
            badge: 'Client Endorsements',
            title: 'Trusted by Founders Who Value Sleep and Rock-Solid Stability',
            description: 'Read how our 24/7 back-office and SLA support gives business leaders complete peace of mind.',
            items: [
                {
                    quote: 'During our biggest Black Friday sale of the year, our database hit 95% CPU capacity at 1 AM. VR4Web’s on-call team caught the alert, scaled our cloud instances in 4 minutes, and saved us an estimated $200,000 in lost orders.',
                    author: 'Jonathan Hayes',
                    role: 'Chief Operating Officer',
                    company: 'Stride Footwear Global',
                    rating: 5,
                    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
                },
                {
                    quote: 'Having VR4Web manage our technical maintenance and security has eliminated all the stress of server updates. Their weekly reports are detailed, transparent, and our uptime has been a flawless 99.99%.',
                    author: 'Rebecca Thorne',
                    role: 'VP of Technology',
                    company: 'Nexus Health Systems',
                    rating: 5,
                    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
                },
                {
                    quote: 'Their backend data management and customer order exception handling has saved our internal team 20 hours every week. Fast, reliable, and completely dependable.',
                    author: 'Karan Mehra',
                    role: 'Director of E-Commerce Operations',
                    company: 'Velocita Parts India',
                    rating: 5,
                    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
                }
            ]
        },
        faqs: {
            badge: 'Support FAQs',
            title: 'Frequently Asked Questions About Back Office & SLA Support',
            description: 'Everything you need to know about our response times, monitoring setup, and maintenance schedules.',
            items: [
                {
                    q: 'What is included in your 24/7 SLA maintenance package?',
                    a: 'Our comprehensive SLA plans include 24/7 automated uptime monitoring, a guaranteed 15-minute response time for critical outages, daily offsite cloud backups, regular malware and vulnerability scanning, monthly core and plugin updates tested on staging, database optimization, and dedicated monthly development hours for ongoing fixes.'
                },
                {
                    q: 'How do you alert us when an incident occurs?',
                    a: 'Our telemetry systems immediately alert our on-call engineering team via PagerDuty and SMS. Simultaneously, an automated incident notification is posted to your dedicated private Slack/Teams channel and client portal with real-time resolution updates.'
                },
                {
                    q: 'Do you test plugin and server updates before applying them to our live site?',
                    a: 'Always. We follow a strict zero-downtime protocol. We clone your live environment into a dedicated staging sandbox, apply all security and framework updates, run automated regression tests, and only push changes to production once everything is validated.'
                },
                {
                    q: 'Can you help us recover our website if it has already been hacked or infected with malware?',
                    a: 'Yes. We offer emergency disaster recovery services. We clean all malicious scripts, replace core infected files, purge backdoor shells, change all cryptographic keys, and implement Cloudflare enterprise WAF rules to prevent future intrusions.'
                },
                {
                    q: 'Can your team manage our routine catalog updates and inventory data?',
                    a: 'Yes. Our back-office team regularly handles SKU additions, variant price adjustments, promotional banner swaps, and order exception triage directly within your CMS or ERP.'
                }
            ]
        },
        cta: {
            badge: 'Protect Your Business',
            title: 'Never Worry About Website Crashes or Security Breaches Again',
            description: 'Partner with VR4Web’s 24/7 technical operations team for continuous peace of mind and guaranteed uptime.',
            buttonText: 'Get 24/7 Support Coverage',
            secondaryButtonText: 'Request an SLA Audit'
        },
        subServices: [
            {
                slug: 'ecommerce-website-maintenance',
                name: 'E-commerce Website Maintenance',
                desc: 'Store upkeep, checkout monitoring, inventory sync, plugin security patches, and database indexing.',
                hero: {
                    title: 'Flawless 24/7',
                    highlight: 'E-Commerce Maintenance',
                    titleSuffix: 'for Uninterrupted Sales.',
                    description: 'Keep your online store running at peak speed with daily checkout simulation tests, inventory sync, and proactive plugin security updates.'
                },
                about: {
                    image: '/services-set4/E-commerce Website Maintenance.png'
                },
                whyChooseUs: {
                    image: '/services-set4/E-commerce Website Maintenance.png'
                }
            },
            {
                slug: '24-7-support',
                name: '24/7 Support',
                desc: 'Round-the-clock SLA helpdesk, live incident resolution, and emergency engineering escalation.',
                hero: {
                    title: 'Round-the-Clock',
                    highlight: '24/7 Technical Support',
                    titleSuffix: 'with 15-Minute SLAs.',
                    description: 'Never face a middle-of-the-night server crash alone. Our senior on-call engineers monitor your infrastructure 24/7/365.'
                },
                about: {
                    image: '/services-set4/support.png'
                },
                whyChooseUs: {
                    image: '/services-set4/support.png'
                }
            },
            {
                slug: 'technical-maintenance-and-security',
                name: 'Technical Maintenance and Security',
                desc: 'Server hardening, malware scanning, core upgrades, vulnerability penetration audits, and DDoS mitigation.',
                hero: {
                    title: 'Proactive Enterprise',
                    highlight: 'Technical Security',
                    titleSuffix: '& Vulnerability Hardening.',
                    description: 'Protect your intellectual property and customer records with automated daily vulnerability scanning and firewall management.'
                },
                about: {
                    image: '/services-set4/tech-management.png'
                },
                whyChooseUs: {
                    image: '/services-set4/tech-management.png'
                }
            },
            {
                slug: 'order-and-backend-management',
                name: 'Order and Backend Management',
                desc: 'Fulfillment workflows, catalog management, customer data processing, and order exception resolution.',
                hero: {
                    title: 'Frictionless',
                    highlight: 'Order & Backend Management',
                    titleSuffix: 'for Seamless Operations.',
                    description: 'Eliminate operational bottlenecks with dedicated catalog updates, inventory reconciliation, and customer order triage.'
                },
                about: {
                    image: '/services-set4/order-mangement.png'
                },
                whyChooseUs: {
                    image: '/services-set4/order-mangement.png'
                }
            }
        ]
    }
];

const CATEGORY_ALIASES = {
    'software-development': 'software-application-development',
    'web-development': 'web-design-and-development',
    'ecommerce': 'e-commerce-solutions',
    'creative': 'creative-solutions',
    'back-office': 'back-office-support',
};

// ─── QUERY & SLUG RESOLVER WITH SAFE FALLBACKS & INHERITANCE ───
export const getServiceData = (categorySlug, subServiceSlug) => {
    // 1. Find category by slug or id or fallback to first category
    const rawSlug = slugify(categorySlug || '');
    const targetCatSlug = CATEGORY_ALIASES[rawSlug] || rawSlug;
    let category = servicesData.find(
        (c) => c.slug === targetCatSlug || c.id === targetCatSlug || slugify(c.name) === targetCatSlug
    );

    if (!category) {
        category = servicesData[0];
    }

    // 2. If subservice requested, find matching subservice
    let subService = null;
    if (subServiceSlug) {
        const targetSubSlug = slugify(subServiceSlug);
        subService = category.subServices?.find(
            (s) => s.slug === targetSubSlug || slugify(s.name) === targetSubSlug
        );
    }

    // If no subservice matched but slug was provided, try searching across all categories
    if (!subService && subServiceSlug) {
        const targetSubSlug = slugify(subServiceSlug);
        for (const cat of servicesData) {
            const match = cat.subServices?.find(
                (s) => s.slug === targetSubSlug || slugify(s.name) === targetSubSlug
            );
            if (match) {
                category = cat;
                subService = match;
                break;
            }
        }
    }

    // 3. Construct merged payload with subservice overrides and safe fallbacks
    const activeTitle = subService ? subService.name : category.name;
    const isSubService = Boolean(subService);

    return {
        isSubService,
        categoryName: category.name,
        categorySlug: category.slug,
        subServiceName: subService ? subService.name : null,
        subServiceSlug: subService ? subService.slug : null,
        allCategories: servicesData.map((c) => ({
            name: c.name,
            slug: c.slug,
            desc: c.desc,
            id: c.id
        })),
        subServicesList: category.subServices || [],

        // 1. HERO SECTION (Desktop fixed height 309px)
        hero: {
            title: subService?.hero?.title || category.hero.title,
            highlight: subService?.hero?.highlight || category.hero.highlight || activeTitle,
            titleSuffix: subService?.hero?.titleSuffix || category.hero.titleSuffix || '',
            description: subService?.hero?.description || subService?.desc || category.hero.description,
            bgImage: subService?.hero?.bgImage || category.hero?.bgImage || '/service.png',
            ctaPrimary: subService?.hero?.ctaPrimary || category.hero.ctaPrimary,
            ctaSecondary: subService?.hero?.ctaSecondary || category.hero.ctaSecondary
        },

        // 2. ABOUT
        about: {
            badge: subService?.about?.badge || category.about.badge,
            title: subService?.about?.title || `${activeTitle}: ${category.about.title}`,
            description: subService?.about?.description || category.about.description,
            descriptionSecondary: subService?.about?.descriptionSecondary || category.about.descriptionSecondary,
            image: subService?.about?.image || category.about.image,
            highlights: subService?.about?.highlights || category.about.highlights,
            stats: subService?.about?.stats || category.about.stats
        },

        // 3. KEY FEATURES & BENEFITS
        features: {
            badge: subService?.features?.badge || category.features.badge,
            title: subService?.features?.title || `Key Capabilities & Features of ${activeTitle}`,
            description: subService?.features?.description || category.features.description,
            items: subService?.features?.items || category.features.items
        },

        // 4. DEVELOPMENT OR DELIVERY PROCESS
        process: {
            badge: subService?.process?.badge || category.process.badge,
            title: subService?.process?.title || `${activeTitle} Delivery Framework`,
            description: subService?.process?.description || category.process.description,
            bgImage: subService?.process?.bgImage || category.process.bgImage,
            steps: subService?.process?.steps || category.process.steps
        },

        // 5. WHY CHOOSE US
        whyChooseUs: {
            badge: subService?.whyChooseUs?.badge || category.whyChooseUs.badge,
            title: subService?.whyChooseUs?.title || `Why Choose VR4Web for ${activeTitle}`,
            description: subService?.whyChooseUs?.description || category.whyChooseUs.description,
            image: subService?.whyChooseUs?.image || category.whyChooseUs.image,
            reasons: subService?.whyChooseUs?.reasons || category.whyChooseUs.reasons,
            guarantees: subService?.whyChooseUs?.guarantees || category.whyChooseUs.guarantees
        },

        // 6. TECH STACK
        techStack: {
            badge: subService?.techStack?.badge || category.techStack.badge,
            title: subService?.techStack?.title || `Technologies & Tools We Master for ${activeTitle}`,
            description: subService?.techStack?.description || category.techStack.description,
            categories: subService?.techStack?.categories || category.techStack.categories
        },

        // 7. INDUSTRIES
        industries: {
            badge: subService?.industries?.badge || category.industries.badge,
            title: subService?.industries?.title || `Industries We Empower with ${activeTitle}`,
            description: subService?.industries?.description || category.industries.description,
            image: subService?.industries?.image || category.industries.image,
            list: subService?.industries?.list || category.industries.list
        },

        // 8. TESTIMONIALS
        testimonials: {
            badge: subService?.testimonials?.badge || category.testimonials.badge,
            title: subService?.testimonials?.title || `Client Feedback on Our ${activeTitle}`,
            description: subService?.testimonials?.description || category.testimonials.description,
            items: subService?.testimonials?.items || category.testimonials.items
        },

        // 9. FAQS
        faqs: {
            badge: subService?.faqs?.badge || category.faqs.badge,
            title: subService?.faqs?.title || `Frequently Asked Questions About ${activeTitle}`,
            description: subService?.faqs?.description || category.faqs.description,
            items: subService?.faqs?.items || category.faqs.items
        },

        // 10. CTA
        cta: {
            badge: subService?.cta?.badge || category.cta.badge,
            title: subService?.cta?.title || `Ready to Transform Your Business with ${activeTitle}?`,
            description: subService?.cta?.description || category.cta.description,
            buttonText: subService?.cta?.buttonText || category.cta.buttonText,
            secondaryButtonText: subService?.cta?.secondaryButtonText || category.cta.secondaryButtonText
        }
    };
};

// ─── COMPATIBILITY RESOLVER FOR QUERY PARAMS (?category=...&item=...) ───
export const getServiceByQuery = (categoryName, itemName) => {
    const catSlug = categoryName ? slugify(categoryName) : 'app-development';
    const itemSlug = itemName ? slugify(itemName) : null;
    return getServiceData(catSlug, itemSlug);
};
