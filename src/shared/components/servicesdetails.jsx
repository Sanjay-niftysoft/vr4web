import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import {
    motion, AnimatePresence, MotionConfig, useScroll, useSpring, useMotionValue,
    useTransform, useInView, animate, useReducedMotion,
} from 'framer-motion';
import CtaSection from '../../components/CtaSection';
import FeatureCards from '../../components/FeatureCards';
import {
    ChevronRight, ChevronLeft, ChevronDown, Home, CheckCircle2, ArrowRight, Star, ShieldCheck, Zap,
    Smartphone, Code2, Layout, ShoppingCart, Megaphone, Palette, Headphones,
    Server, Cloud, Database, Lock, Clock, Award, Globe, Layers, Terminal, Activity, Check,
    HelpCircle, TrendingUp, FileText, MessageCircle, Eye, Box, Sliders, DollarSign, Users,
    Search, CheckSquare, Rocket, Cpu, Gauge, Wrench, Network, Bug, PenTool, BarChart3,
    GitBranch, MousePointerClick, Landmark, HeartPulse, Truck, GraduationCap, Plane,
    Building2, Film, Gamepad2, UtensilsCrossed, Factory, Briefcase, Quote,
    Mail, Video, Link2, BookOpen, Share2, Bot, ClipboardList,
} from 'lucide-react';
import { getServiceData, getServiceByQuery } from '../../data/servicesdata';
import authService from '../../services/authService';


/* ───────── Section background photos + green overlay (like the "How We Work" banner) ─────────
   Each section uses a DIFFERENT photo. To change one, replace the link only. */
/* Why section: Melbourne */
const BG_WHY = 'https://unsplash.com/photos/IFjKJKzgh3s/download?force=true&w=1800';            // Melbourne skyline, Southbank
const BG_WHY_FALLBACK = 'https://unsplash.com/photos/NOxhXpk43hQ/download?force=true&w=1800';   // Melbourne, Flinders Street

/* Industries section: Gold Coast */
const BG_IND = 'https://unsplash.com/photos/O3ji6Tv0PtY/download?force=true&w=1800';            // Surfers Paradise aerial, Gold Coast
const BG_IND_FALLBACK = 'https://unsplash.com/photos/YiaGblobOGI/download?force=true&w=1800';  // Gold Coast skyline at sunrise

/* `overlay` = the green gradient on top of the photo. Lower numbers (e.g. /50) = less green. */
function PhotoBackdrop({ src, fallback, overlay = 'from-[#0F3D2E]/90 via-[#0F3D2E]/80 to-[#124A37]/75' }) {
    return (
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
            <img
                src={src}
                alt=""
                loading="lazy"
                decoding="async"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallback; }}
                className="absolute inset-0 w-full h-full object-cover"
            />
            {/* green overlay: strong enough that the text is never disturbed */}
            <div className={`absolute inset-0 bg-gradient-to-br ${overlay}`} />
        </div>
    );
}

/* ───────────────────────────────────────────────────────────────
   THEME: Yellow #E8890C · Dark Green #0F3D2E
   Yellow #E8890C   Dark Green #0F3D2E
   Hero = amber gradient with navy text. Features + Industries = dark navy sections.
   About / Process / Tech = white. Why Choose / FAQ = warm cream.
   Titles are navy (white on dark sections) with the highlighted words in amber.
─────────────────────────────────────────────── */

/* ───────── icons (no sparkle / "AI" icons anywhere) ───────── */
const ICON_MAP = {
    Smartphone, Code2, Layout, ShoppingCart, Megaphone, Palette, Headphones, Server, Cloud,
    Database, Lock, Clock, Award, Globe, Layers, Terminal, Activity, Zap, ShieldCheck,
    CheckCircle2, HelpCircle, TrendingUp, FileText, MessageCircle, Eye, Box, Sliders,
    DollarSign, Users, Search, CheckSquare, Rocket, Cpu, Gauge, Wrench, Network, Bug,
    PenTool, BarChart3, GitBranch, MousePointerClick,
};

const KEYWORD_ICONS = [
    [/devops|ci\/cd|pipeline/, GitBranch],
    [/senior|in-house|team|expert/, Users],
    [/ownership|\bip\b|repository|source code/, FileText],
    [/micro-?interaction|haptic|animat|motion/, MousePointerClick],
    [/security|secure|owasp|compliance|nda|encrypt/, ShieldCheck],
    [/cloud|backend|microservice|\bapi\b/, Cloud],
    [/cross-platform|react native|flutter/, Layers],
    [/spatial|\bar\b|\bvr\b|vision/, Eye],
    [/native|engine|performance|speed|throughput/, Cpu],
    [/\bsla\b|timeline|deadline|schedule/, Clock],
    [/test|\bqa\b|quality/, Bug],
    [/analytics|telemetry|monitor|scal|growth/, BarChart3],
    [/launch|release|store|approval/, Rocket],
    [/design|wireframe|architecture|blueprint|prototype/, PenTool],
    [/support|maintenance/, Headphones],
    [/price|cost|budget|pricing/, DollarSign],
];
const FALLBACK_ICONS = [Smartphone, Code2, Layers, Gauge, Wrench, Network];

/** icon from data → else best keyword match → else rotating neutral icon */
const smartIcon = (name, text = '', idx = 0) => {
    if (name && name !== 'Sparkles' && ICON_MAP[name]) return ICON_MAP[name];
    const t = String(text).toLowerCase();
    for (const [re, Icon] of KEYWORD_ICONS) if (re.test(t)) return Icon;
    return FALLBACK_ICONS[idx % FALLBACK_ICONS.length];
};

const STEP_ICONS = [PenTool, Code2, Bug, Rocket, BarChart3];
const stepIcon = (title = '', idx = 0) => {
    const t = title.toLowerCase();
    if (/telemetry|scal|monitor|post-launch/.test(t)) return BarChart3;
    if (/test|\bqa\b|quality/.test(t)) return Bug;
    if (/launch|approval|release|deploy/.test(t)) return Rocket;
    if (/develop|sprint|build|engineer/.test(t)) return Code2;
    if (/wireframe|architecture|design|discover|plan|strategy/.test(t)) return PenTool;
    return STEP_ICONS[idx % STEP_ICONS.length];
};

const INDUSTRY_ICONS = [
    [/fintech|bank|financ|insur/, Landmark],
    [/health|medic|clinic|pharma/, HeartPulse],
    [/deliver|logistic|transport|fleet|supply/, Truck],
    [/commerce|retail|shop|market/, ShoppingCart],
    [/educat|learn|school|e-?learning/, GraduationCap],
    [/travel|hospitality|tour|airline/, Plane],
    [/real estate|property|construction/, Building2],
    [/media|entertain|stream|video/, Film],
    [/gam(e|ing)/, Gamepad2],
    [/social|communit|dating/, Users],
    [/food|restaurant|beverage/, UtensilsCrossed],
    [/manufactur|industr|energy|automotive/, Factory],
];
const industryIcon = (name = '') => {
    const t = name.toLowerCase();
    for (const [re, Icon] of INDUSTRY_ICONS) if (re.test(t)) return Icon;
    return Briefcase;
};

/* ───────── real technology logos ─────────
   Every tool tries these sources in order, first one that loads wins:
   1. Simple Icons  (brand-coloured SVG)
   2. Devicon       (dev tools: React, Swift, Docker …)
   3. Website favicon via Google (real logo of the tool's own site)
   4. Lucide icon   (only if everything above fails)
   To add a tool: add ONE line to TOOL_LOGOS → [name pattern, simple-icons slug or null, website domain]
─────────────────────────────────────────────── */
const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons';
const SIMPLE = 'https://cdn.simpleicons.org';

const TOOL_LOGOS = [
    /* ── design, motion, 3D, collaboration ── */
    [/figma/, 'figma', 'figma.com'],
    [/protopie/, 'protopie', 'protopie.io'],
    [/framer/, 'framer', 'framer.com'],
    [/miro/, 'miro', 'miro.com'],
    [/sketch/, 'sketch', 'sketch.com'],
    [/invision/, 'invision', 'invisionapp.com'],
    [/zeplin/, 'zeplin', 'zeplin.io'],
    [/canva/, 'canva', 'canva.com'],
    [/blender/, 'blender', 'blender.org'],
    [/cinema ?4d/, 'cinema4d', 'maxon.net'],
    [/zbrush/, 'zbrush', 'maxon.net'],
    [/unreal/, 'unrealengine', 'unrealengine.com'],
    [/spline/, 'spline', 'spline.design'],
    [/lottie/, 'lottiefiles', 'lottiefiles.com'],
    [/webflow/, 'webflow', 'webflow.com'],
    [/storybook/, 'storybook', 'storybook.js.org'],
    [/notion/, 'notion', 'notion.so'],
    [/adobe xd|\bxd\b/, 'adobexd', 'adobe.com'],
    [/photoshop/, 'adobephotoshop', 'adobe.com'],
    [/illustrator/, 'adobeillustrator', 'adobe.com'],
    [/after effects/, 'adobeaftereffects', 'adobe.com'],
    [/premiere/, 'adobepremierepro', 'adobe.com'],
    [/davinci|resolve/, 'davinciresolve', 'blackmagicdesign.com'],
    [/maya/, 'autodesk', 'autodesk.com'],
    [/tokens studio/, 'figma', 'tokens.studio'],
    [/style dictionary/, null, 'amzn.github.io'],
    [/principle/, null, 'principleformac.com'],
    [/trello/, 'trello', 'trello.com'],
    [/asana/, 'asana', 'asana.com'],

    /* ── spatial / mobile / api / data ── */
    [/visionos|vision pro|realitykit|arkit/, 'apple', 'apple.com'],
    [/spatial reality/, 'sony', 'sony.com'],
    [/appsync|guardduty/, null, 'aws.amazon.com'],
    [/datadog/, 'datadog', 'datadoghq.com'],
    [/fastlane/, 'fastlane', 'fastlane.tools'],
    [/kafka/, 'apachekafka', 'kafka.apache.org'],
    [/restful|rest api/, 'swagger', 'swagger.io'],

    /* ── CMS & content ── */
    [/sanity/, 'sanity', 'sanity.io'],
    [/strapi/, 'strapi', 'strapi.io'],
    [/\bmdx\b/, 'mdx', 'mdxjs.com'],
    [/markdown/, 'markdown', 'markdownguide.org'],
    [/contentful/, 'contentful', 'contentful.com'],
    [/prismic/, 'prismic', 'prismic.io'],

    /* ── hosting, storage, backup, security ── */
    [/cloudflare/, 'cloudflare', 'cloudflare.com'],
    [/s3|glacier|cloudfront/, 'amazons3', 'aws.amazon.com'],
    [/sucuri/, null, 'sucuri.net'],
    [/let.?s encrypt|digicert/, 'letsencrypt', 'letsencrypt.org'],
    [/vault/, 'vault', 'vaultproject.io'],
    [/veeam/, 'veeam', 'veeam.com'],
    [/updraft/, null, 'updraftplus.com'],

    /* ── monitoring & incident ── */
    [/new ?relic/, 'newrelic', 'newrelic.com'],
    [/uptimerobot|uptime robot/, 'uptimerobot', 'uptimerobot.com'],
    [/sentry/, 'sentry', 'sentry.io'],
    [/grafana/, 'grafana', 'grafana.com'],
    [/pagerduty|on-call/, 'pagerduty', 'pagerduty.com'],
    [/opsgenie/, 'opsgenie', 'atlassian.com'],

    /* ── messaging, CRM, support ── */
    [/slack/, 'slack', 'slack.com'],
    [/zendesk/, 'zendesk', 'zendesk.com'],
    [/twilio/, 'twilio', 'twilio.com'],
    [/whatsapp/, 'whatsapp', 'whatsapp.com'],
    [/klaviyo/, 'klaviyo', 'klaviyo.com'],
    [/hubspot/, 'hubspot', 'hubspot.com'],
    [/intercom/, 'intercom', 'intercom.com'],
    [/freshdesk/, 'freshworks', 'freshdesk.com'],

    /* ── SEO & analytics ── */
    [/ahrefs/, 'ahrefs', 'ahrefs.com'],
    [/screaming ?frog/, null, 'screamingfrog.co.uk'],
    [/semrush/, 'semrush', 'semrush.com'],
    [/search console/, 'googlesearchconsole', 'search.google.com'],
    [/google analytics|\bga4\b/, 'googleanalytics', 'analytics.google.com'],
    [/tag manager|\bgtm\b/, 'googletagmanager', 'tagmanager.google.com'],
    [/looker/, 'looker', 'lookerstudio.google.com'],
    [/triple ?whale/, null, 'triplewhale.com'],
    [/hotjar/, 'hotjar', 'hotjar.com'],
    [/mixpanel/, 'mixpanel', 'mixpanel.com'],
    [/segment/, 'segment', 'segment.com'],
    [/amplitude/, 'amplitude', 'amplitude.com'],

    /* ── commerce & payments ── */
    [/shopify/, 'shopify', 'shopify.com'],
    [/woocommerce/, 'woocommerce', 'woocommerce.com'],
    [/bigcommerce/, 'bigcommerce', 'bigcommerce.com'],
    [/magento/, 'magento', 'magento.com'],
    [/stripe/, 'stripe', 'stripe.com'],
    [/paypal/, 'paypal', 'paypal.com'],
    [/razorpay/, 'razorpay', 'razorpay.com'],
    [/algolia/, 'algolia', 'algolia.com'],
];

/* developer tools: Devicon slugs (word boundaries stop false matches) */
const TECH_LOGOS = [
    [/react/, 'react'], [/swift|combine|testflight/, 'swift'], [/kotlin/, 'kotlin'],
    [/objective-?c/, 'objectivec'], [/xcode/, 'xcode'], [/android studio/, 'androidstudio'],
    [/android|jetpack/, 'android'], [/\bios\b|\bapple\b|uikit/, 'apple'], [/flutter/, 'flutter'],
    [/\bdart\b/, 'dart'], [/firebase|crashlytics/, 'firebase'], [/graphql/, 'graphql'],
    [/\baws\b|amazon/, 'amazonwebservices'], [/azure/, 'azure'], [/google cloud|\bgcp\b/, 'googlecloud'],
    [/docker/, 'docker'], [/kubernetes|k8s/, 'kubernetes'], [/jenkins/, 'jenkins'],
    [/gitlab/, 'gitlab'], [/github/, 'github'], [/\bgit\b/, 'git'], [/jira/, 'jira'],
    [/\bnode/, 'nodejs'], [/\bexpress\b/, 'express'], [/python/, 'python'],
    [/django/, 'django'], [/laravel/, 'laravel'], [/\bphp\b/, 'php'], [/typescript/, 'typescript'],
    [/javascript/, 'javascript'], [/\bjava\b/, 'java'], [/next\.?js/, 'nextjs'], [/\bvue/, 'vuejs'],
    [/angular/, 'angularjs'], [/tailwind/, 'tailwindcss'], [/\bhtml/, 'html5'], [/\bcss/, 'css3'],
    [/wordpress/, 'wordpress'], [/postgres/, 'postgresql'], [/mongo/, 'mongodb'], [/mysql/, 'mysql'],
    [/redis/, 'redis'], [/sqlite/, 'sqlite'], [/selenium/, 'selenium'], [/\bjest\b/, 'jest'],
    [/postman/, 'postman'], [/swagger|openapi/, 'swagger'], [/terraform/, 'terraform'],
    [/nginx/, 'nginx'], [/\bunity\b/, 'unity'], [/c#|csharp|\.net/, 'csharp'], [/\bruby\b/, 'ruby'],
    [/golang|\bgo\b/, 'go'], [/\brust\b/, 'rust'], [/electron/, 'electron'], [/ionic/, 'ionic'],
    [/xamarin/, 'xamarin'], [/redux/, 'redux'],
];

const logoSources = (name = '') => {
    const t = name.toLowerCase();
    const urls = [];
    const tool = TOOL_LOGOS.find(([re]) => re.test(t));
    if (tool?.[1]) urls.push(`${SIMPLE}/${tool[1]}`);
    const dev = TECH_LOGOS.find(([re]) => re.test(t));
    if (dev) urls.push(`${DEVICON}/${dev[1]}/${dev[1]}-original.svg`, `${DEVICON}/${dev[1]}/${dev[1]}-plain.svg`);
    if (tool?.[2]) urls.push(`https://www.google.com/s2/favicons?domain=${tool[2]}&sz=128`);
    return urls;
};

function TechLogo({ name, iconName, idx = 0 }) {
    const sources = useMemo(() => logoSources(name), [name]);
    const [v, setV] = useState(0);
    if (v >= sources.length) {
        const Fallback = smartIcon(iconName, name, idx);
        return <Fallback className="w-8 h-8 text-[#E8890C]" />;
    }
    return (
        <img
            src={sources[v]}
            alt={`${name} logo`}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setV((n) => n + 1)}
            className="w-9 h-9 object-contain"
        />
    );
}

/* ───────── reusable pieces ───────── */

/** Last word(s) of a title in accent colour (yellow by default) */
const TitleWords = ({ text, accent = 'text-[#E8890C]', count = 1 }) => {
    const words = String(text || '').trim().split(/\s+/);
    const n = Math.min(Math.max(count, 1), words.length);
    const tail = words.splice(words.length - n, n).join(' ');
    return <>{words.join(' ')}{words.length ? ' ' : ''}<span className={accent}>{tail}</span></>;
};

/** Section tag: blue spaced label with a short thick red underline */
const Badge = ({ children, dark = false, center = false }) => (
    <span className={`inline-flex flex-col mb-3 ${center ? 'items-center' : 'items-start'}`}>
        <span className={`text-xs sm:text-sm font-extrabold tracking-[0.25em] uppercase ${dark ? 'text-[#E8890C]' : 'text-[#0F3D2E]'}`}>
            {children}
        </span>
        <span className={`mt-2 block h-1 w-[70px] rounded-full bg-[#E8890C]`} />
    </span>
);

const Reveal = ({ children, delay = 0, y = 24, className = '' }) => (
    <motion.div
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, delay, ease: 'easeOut' }}
        className={className}
    >
        {children}
    </motion.div>
);

/** Title whose words slide up out of a mask one by one (use inside a motion parent with hidden/show variants) */
const WordReveal = ({ text, accentCount = 1, accent = 'text-[#E8890C]' }) => {
    const words = String(text || '').trim().split(/\s+/);
    const firstAccent = words.length - Math.min(accentCount, words.length);
    return (
        <>
            {words.map((w, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.15em] -mb-[0.15em] mr-[0.25em]">
                    <motion.span
                        className={`inline-block ${i >= firstAccent ? accent : ''}`}
                        variants={{ hidden: { y: '115%' }, show: { y: 0 } }}
                        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {w}
                    </motion.span>
                </span>
            ))}
        </>
    );
};

const SectionHeading = ({ badge, title, description, dark = false, center = true, accentWords = 1, className = '' }) => (
    <Reveal className={`${center ? 'text-center mx-auto' : ''} max-w-3xl ${className || 'mb-8 sm:mb-10'}`}>
        {badge && <Badge dark={dark} center={center}>{badge}</Badge>}
        <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight mb-3 ${dark ? 'text-white' : 'text-[#0F3D2E]'}`}>
            <TitleWords text={title} count={accentWords} accent="text-[#E8890C]" />
        </h2>
        <span className={`block h-1 w-16 rounded-full bg-[#E8890C] ${center ? 'mx-auto' : ''} mb-4`} />
        {description && <p className={`text-sm sm:text-base leading-relaxed ${dark ? 'text-white' : 'text-black'}`}>{description}</p>}
    </Reveal>
);

const SplitHeading = ({ badge, title, dark = false }) => (
    <>
        <Badge dark={dark}>{badge}</Badge>
        <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4 leading-tight ${dark ? 'text-white' : 'text-[#0F3D2E]'}`}>
            <TitleWords text={title} accent="text-[#E8890C]" />
        </h2>
    </>
);

/** 3-D tilt on hover (mouse devices only, disabled for reduced-motion) */
function TiltCard({ children, className = '', max = 8 }) {
    const reduce = useReducedMotion();
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), { stiffness: 220, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), { stiffness: 220, damping: 20 });
    const onMove = (e) => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
    };
    const onLeave = () => { x.set(0); y.set(0); };
    return (
        <div style={{ perspective: 1000 }} className="h-full">
            <motion.div
                onMouseMove={onMove}
                onMouseLeave={onLeave}
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                className={`h-full ${className}`}
            >
                {children}
            </motion.div>
        </div>
    );
}

/** Counts up numbers like "150+", "99%", "24/7" when scrolled into view */
function CountUp({ value }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const m = String(value ?? '').match(/^([^\d]*)([\d,.]+)(.*)$/);
    const target = m ? parseFloat(m[2].replace(/,/g, '')) : 0;
    const decimals = m ? (m[2].split('.')[1] || '').length : 0;
    const [n, setN] = useState(0);
    useEffect(() => {
        if (!inView || !m) return;
        const c = animate(0, target, { duration: 1.6, ease: 'easeOut', onUpdate: setN });
        return () => c.stop();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView, target]);
    if (!m) return <span ref={ref}>{value}</span>;
    return <span ref={ref}>{m[1]}{decimals ? n.toFixed(decimals) : Math.round(n).toLocaleString()}{m[3]}</span>;
}

/** Image that zooms on hover, always fills its box. No colour filter on top. */
const ZoomImage = ({ src, alt, className = '' }) => {
    const list = (Array.isArray(src) ? src : [src]).filter(Boolean);
    const key = list.join('|');
    const [i, setI] = useState(0);
    useEffect(() => { setI(0); }, [key]);
    if (i >= list.length) return null;
    return (
        <img
            key={list[i]}
            src={list[i]}
            alt={alt}
            loading="lazy"
            onError={() => setI((n) => n + 1)}
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110 ${className}`}
        />
    );
};

const DotGrid = ({ className = '', dark = false }) => (
    <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 [background-size:22px_22px] ${dark
            ? '[background-image:radial-gradient(rgba(255,255,255,0.10)_1px,transparent_1px)]'
            : '[background-image:radial-gradient(rgba(245,166,35,0.14)_1px,transparent_1px)]'
            } ${className}`}
    />
);

/* ───────── page visuals: one different picture per service AND per sub-service ─────────
   Every page gets two visuals: [About, Why-choose-us]. No people anywhere.
   1. A real Unsplash photo (devices, screens, hardware) when one fits the topic.
   2. Otherwise a generated topic illustration (icon scene in the brand colours),
      so each topic always has its own related, never-repeated picture.
   To use your own photo for a page, add it to PAGE_IMAGE_OVERRIDES
   (key = lower-case name, value = [aboutUrl, whyUrl]). If a photo fails to load,
   the page falls back to the image from servicesdata.
─────────────────────────────────────────────── */
const U = (id) => (!id ? '' : id.startsWith('/') || id.startsWith('http') ? id : `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1000&q=80`);

const PAGE_IMAGE_OVERRIDES = {
    // Digital Marketing Solutions
    'digital marketing solutions': ['/services-images-set2/digital-marketing.png', '/services-images-set2/digital-marketing.png'],
    'digital marketing': ['/services-images-set2/digital-marketing.png', '/services-images-set2/digital-marketing.png'],
    'aeo': ['/services-images-set2/aeo.png', '/services-images-set2/aeo.png'],
    'aeo (answer engine optimization)': ['/services-images-set2/aeo.png', '/services-images-set2/aeo.png'],
    'answer engine optimization': ['/services-images-set2/aeo.png', '/services-images-set2/aeo.png'],
    'geo': ['/services-images-set2/image.png', '/services-images-set2/image.png'],
    'geo (generative engine optimization)': ['/services-images-set2/image.png', '/services-images-set2/image.png'],
    'generative engine optimization': ['/services-images-set2/image.png', '/services-images-set2/image.png'],
    'ai seo': ['/services-images-set2/Ai.png', '/services-images-set2/Ai.png'],
    'social media marketing': ['/services-images-set2/digital-marketing.png', '/services-images-set2/digital-marketing.png'],
    'ppc': ['/services-images-set2/ppc.png', '/services-images-set2/ppc.png'],
    '(ppc) paid advertising': ['/services-images-set2/ppc.png', '/services-images-set2/ppc.png'],
    'paid advertising': ['/services-images-set2/ppc.png', '/services-images-set2/ppc.png'],
    'email marketing': ['/services-images-set2/email-marketing.png', '/services-images-set2/email-marketing.png'],
    'whatsapp marketing': ['/services-images-set2/whatapp-marketing.png', '/services-images-set2/whatapp-marketing.png'],
    'sms marketing': ['/services-images-set2/sms.png', '/services-images-set2/sms.png'],
    'content marketing': ['/services-images-set2/content.png', '/services-images-set2/content.png'],
    'video marketing': ['/services-images-set2/video.png', '/services-images-set2/video.png'],
    'white hat seo services': ['/services-images-set2/white-hat-seo.png', '/services-images-set2/white-hat-seo.png'],
    'white hat seo': ['/services-images-set2/white-hat-seo.png', '/services-images-set2/white-hat-seo.png'],
    'link building services': ['/services-images-set2/link.png', '/services-images-set2/link.png'],
    'link building': ['/services-images-set2/link.png', '/services-images-set2/link.png'],
    'orm': ['/services-images-set2/orm.png', '/services-images-set2/orm.png'],
    'orm (online reputation management)': ['/services-images-set2/orm.png', '/services-images-set2/orm.png'],
    'online reputation management': ['/services-images-set2/orm.png', '/services-images-set2/orm.png'],

    // Creative Solutions
    'creative solutions': ['/services-set3/logo.png', '/services-set3/uiux.png'],
    'creative': ['/services-set3/logo.png', '/services-set3/uiux.png'],
    'ui/ux design services': ['/services-set3/uiux.png', '/services-set3/uiux.png'],
    'ui/ux design': ['/services-set3/uiux.png', '/services-set3/uiux.png'],
    'ui/ux': ['/services-set3/uiux.png', '/services-set3/uiux.png'],
    'custom logo design': ['/services-set3/logo.png', '/services-set3/logo.png'],
    'logo design': ['/services-set3/logo.png', '/services-set3/logo.png'],
    'creative video production': ['/services-set3/video.png', '/services-set3/video.png'],
    'creative video': ['/services-set3/video.png', '/services-set3/video.png'],
    'user manual development': ['/services-set3/user-management.png', '/services-set3/user-management.png'],
    'user manual': ['/services-set3/user-management.png', '/services-set3/user-management.png'],
    'product design and prototyping': ['/services-set3/product-design.png', '/services-set3/product-design.png'],
    'product design': ['/services-set3/product-design.png', '/services-set3/product-design.png'],
    'social media creative design': ['/services-set3/social-media.png', '/services-set3/social-media.png'],
    'social media creative': ['/services-set3/social-media.png', '/services-set3/social-media.png'],

    // E-commerce Solutions
    'e-commerce solutions': ['/services-section-home-page/E-commerce Solutions/Custom eCommerce Solutions.png', '/services-section-home-page/E-commerce Solutions/Shopify Development Solutions.png'],
    'e-commerce': ['/services-section-home-page/E-commerce Solutions/Custom eCommerce Solutions.png', '/services-section-home-page/E-commerce Solutions/Shopify Development Solutions.png'],
    'ecommerce': ['/services-section-home-page/E-commerce Solutions/Custom eCommerce Solutions.png', '/services-section-home-page/E-commerce Solutions/Shopify Development Solutions.png'],
    'custom ecommerce solutions': ['/services-section-home-page/E-commerce Solutions/Custom eCommerce Solutions.png', '/services-section-home-page/E-commerce Solutions/Custom eCommerce Solutions.png'],
    'custom e-commerce solutions': ['/services-section-home-page/E-commerce Solutions/Custom eCommerce Solutions.png', '/services-section-home-page/E-commerce Solutions/Custom eCommerce Solutions.png'],
    'shopify development solutions': ['/services-section-home-page/E-commerce Solutions/Shopify Development Solutions.png', '/services-section-home-page/E-commerce Solutions/Shopify Development Solutions.png'],
    'shopify development': ['/services-section-home-page/E-commerce Solutions/Shopify Development Solutions.png', '/services-section-home-page/E-commerce Solutions/Shopify Development Solutions.png'],
    'woocommerce development solutions': ['/services-section-home-page/E-commerce Solutions/WooCommerce Development Solutions.png', '/services-section-home-page/E-commerce Solutions/WooCommerce Development Solutions.png'],
    'woocommerce development': ['/services-section-home-page/E-commerce Solutions/WooCommerce Development Solutions.png', '/services-section-home-page/E-commerce Solutions/WooCommerce Development Solutions.png'],
    'bigcommerce development solutions': ['/services-section-home-page/E-commerce Solutions/BigCommerce Development Solutions.png', '/services-section-home-page/E-commerce Solutions/BigCommerce Development Solutions.png'],
    'bigcommerce development': ['/services-section-home-page/E-commerce Solutions/BigCommerce Development Solutions.png', '/services-section-home-page/E-commerce Solutions/BigCommerce Development Solutions.png'],

    // App Development
    'app development': ['/services-section-home-page/app-development/Android Development.png', '/services-set2/iOS Development.png'],
    'android development': ['/services-section-home-page/app-development/Android Development.png', '/services-set2/Android Development.png'],
    'ios development': ['/services-section-home-page/app-development/iOS Development.png', '/services-set2/iOS Development.png'],
    'react native development': ['/services-section-home-page/app-development/React Native Development.png', '/services-set2/React Native Development.png'],
    'hybrid development': ['/services-section-home-page/app-development/Hybrid Development.png', '/services-set2/Hybrid Development.png'],
    'flutter development': ['/services-section-home-page/app-development/flutter.png', '/services-set2/Flutter Development.png'],
    'kotlin / ionic / swift': ['/services-section-home-page/app-development/kolitein.png', '/services-set2/Kotlin-Ionic-Swift-Xamarin.png'],
    'kotlin-ionic-swift-xamarin': ['/services-section-home-page/app-development/kolitein.png', '/services-set2/Kotlin-Ionic-Swift-Xamarin.png'],
    'visionaire': ['/services-section-home-page/app-development/Visionaire.png', '/services-set2/Visionaire-Spatial Development.png'],
    'visionaire (spatial computing)': ['/services-section-home-page/app-development/Visionaire.png', '/services-set2/Visionaire-Spatial Development.png'],

    // Software Application Development
    'software application development': ['/services-section-home-page/Software Application Development/saas.png', '/services-set2/Software Application Development/Application Development.png'],
    'software development': ['/services-section-home-page/Software Application Development/saas.png', '/services-set2/Software Application Development/Application Development.png'],
    'saas': ['/services-section-home-page/Software Application Development/saas.png', '/services-set2/Software Application Development/saas.png'],
    'low code / no code': ['/services-section-home-page/Software Application Development/Low Code-No Code.png', '/services-set2/Software Application Development/lowcode.png'],
    'low code': ['/services-section-home-page/Software Application Development/Low Code-No Code.png', '/services-set2/Software Application Development/lowcode.png'],
    'low-code-no-code': ['/services-section-home-page/Software Application Development/Low Code-No Code.png', '/services-set2/Software Application Development/lowcode.png'],
    'application development': ['/services-section-home-page/Software Application Development/Application Development.png', '/services-set2/Software Application Development/Application Development.png'],
    'software integration': ['/services-section-home-page/Software Application Development/Software Integration.png', '/services-set2/Software Application Development/Software Integration.png'],
    'ai chat support': ['/services-section-home-page/Software Application Development/AI Chat Support.png', '/services-set2/Software Application Development/AI Chat Support.png'],

    // Web Design and Development
    'web design and development': ['/services-section-home-page/Web Design and Development/Corporate Web Development.png', '/services-section-home-page/Web Design and Development/Web Portal Development.png'],
    'web development': ['/services-section-home-page/Web Design and Development/Corporate Web Development.png', '/services-section-home-page/Web Design and Development/Web Portal Development.png'],
    'cms development': ['/services-section-home-page/Web Design and Development/CMS Development.png', '/services-section-home-page/Web Design and Development/CMS Development.png'],
    'web portal development': ['/services-section-home-page/Web Design and Development/Web Portal Development.png', '/services-section-home-page/Web Design and Development/Web Portal Development.png'],
    'corporate web development': ['/services-section-home-page/Web Design and Development/Corporate Web Development.png', '/services-section-home-page/Web Design and Development/Corporate Web Development.png'],
    'react.js development': ['/services-section-home-page/Web Design and Development/React.js Development.png', '/services-section-home-page/Web Design and Development/React.js Development.png'],
    'next.js development': ['/services-section-home-page/Web Design and Development/Next.js Development.png', '/services-section-home-page/Web Design and Development/Next.js Development.png'],
    'angular development': ['/services-section-home-page/Web Design and Development/Angular Development.png', '/services-section-home-page/Web Design and Development/Angular Development.png'],
    'node.js development': ['/services-section-home-page/Web Design and Development/Node.js Development.png', '/services-section-home-page/Web Design and Development/Node.js Development.png'],
    'laravel development': ['/services-section-home-page/Web Design and Development/Laravel Development.png', '/services-section-home-page/Web Design and Development/Laravel Development.png'],
    'php development': ['/services-section-home-page/Web Design and Development/PHP Development.png', '/services-section-home-page/Web Design and Development/PHP Development.png'],

    // Back Office Support
    'back office support': ['/services-set4/support.png', '/services-set4/tech-management.png'],
    'back office': ['/services-set4/support.png', '/services-set4/tech-management.png'],
    'e-commerce website maintenance': ['/services-set4/E-commerce Website Maintenance.png', '/services-set4/E-commerce Website Maintenance.png'],
    'ecommerce website maintenance': ['/services-set4/E-commerce Website Maintenance.png', '/services-set4/E-commerce Website Maintenance.png'],
    '24/7 support': ['/services-set4/support.png', '/services-set4/support.png'],
    'technical maintenance and security': ['/services-set4/tech-management.png', '/services-set4/tech-management.png'],
    'technical maintenance': ['/services-set4/tech-management.png', '/services-set4/tech-management.png'],
    'order and backend management': ['/services-set4/order-mangement.png', '/services-set4/order-mangement.png'],
    'order management': ['/services-set4/order-mangement.png', '/services-set4/order-mangement.png'],
};

/* sub-services: [name pattern, [about photo id, why photo id]], null = generated illustration */
const SUB_IMAGE_RULES = [
    [/vision|spatial|\bvr\b|metaverse/i, ['/services-section-home-page/app-development/Visionaire.png', '/services-set2/Visionaire-Spatial Development.png']],
    [/kotlin|ionic|xamarin|swift/i, ['/services-section-home-page/app-development/kolitein.png', '/services-set2/Kotlin-Ionic-Swift-Xamarin.png']],
    [/react native/i, ['/services-section-home-page/app-development/React Native Development.png', '/services-set2/React Native Development.png']],
    [/flutter/i, ['/services-section-home-page/app-development/flutter.png', '/services-set2/Flutter Development.png']],
    [/hybrid/i, ['/services-section-home-page/app-development/Hybrid Development.png', '/services-set2/Hybrid Development.png']],
    [/android/i, ['/services-section-home-page/app-development/Android Development.png', '/services-set2/Android Development.png']],
    [/\bios\b|iphone/i, ['/services-section-home-page/app-development/iOS Development.png', '/services-set2/iOS Development.png']],

    /* ── E-commerce Solutions Sub-services ── */
    [/custom e-?commerce/i, ['/services-section-home-page/E-commerce Solutions/Custom eCommerce Solutions.png', '/services-section-home-page/E-commerce Solutions/Custom eCommerce Solutions.png']],
    [/shopify/i, ['/services-section-home-page/E-commerce Solutions/Shopify Development Solutions.png', '/services-section-home-page/E-commerce Solutions/Shopify Development Solutions.png']],
    [/woocommerce/i, ['/services-section-home-page/E-commerce Solutions/WooCommerce Development Solutions.png', '/services-section-home-page/E-commerce Solutions/WooCommerce Development Solutions.png']],
    [/bigcommerce/i, ['/services-section-home-page/E-commerce Solutions/BigCommerce Development Solutions.png', '/services-section-home-page/E-commerce Solutions/BigCommerce Development Solutions.png']],

    /* ── Software Application Development Sub-services ── */
    [/\bsaas\b/i, ['/services-section-home-page/Software Application Development/saas.png', '/services-set2/Software Application Development/saas.png']],
    [/low code|no code/i, ['/services-section-home-page/Software Application Development/Low Code-No Code.png', '/services-set2/Software Application Development/lowcode.png']],
    [/application development/i, ['/services-section-home-page/Software Application Development/Application Development.png', '/services-set2/Software Application Development/Application Development.png']],
    [/software integration|integrations/i, ['/services-section-home-page/Software Application Development/Software Integration.png', '/services-set2/Software Application Development/Software Integration.png']],
    [/ai chat|chat support/i, ['/services-section-home-page/Software Application Development/AI Chat Support.png', '/services-set2/Software Application Development/AI Chat Support.png']],

    /* ── Web Design and Development Sub-services ── */
    [/\bcms\b|content management/i, ['/services-section-home-page/Web Design and Development/CMS Development.png', '/services-section-home-page/Web Design and Development/CMS Development.png']],
    [/web portal|portal development/i, ['/services-section-home-page/Web Design and Development/Web Portal Development.png', '/services-section-home-page/Web Design and Development/Web Portal Development.png']],
    [/corporate web/i, ['/services-section-home-page/Web Design and Development/Corporate Web Development.png', '/services-section-home-page/Web Design and Development/Corporate Web Development.png']],
    [/react\.js|react web/i, ['/services-section-home-page/Web Design and Development/React.js Development.png', '/services-section-home-page/Web Design and Development/React.js Development.png']],
    [/next\.js/i, ['/services-section-home-page/Web Design and Development/Next.js Development.png', '/services-section-home-page/Web Design and Development/Next.js Development.png']],
    [/angular/i, ['/services-section-home-page/Web Design and Development/Angular Development.png', '/services-section-home-page/Web Design and Development/Angular Development.png']],
    [/node\.js/i, ['/services-section-home-page/Web Design and Development/Node.js Development.png', '/services-section-home-page/Web Design and Development/Node.js Development.png']],
    [/laravel/i, ['/services-section-home-page/Web Design and Development/Laravel Development.png', '/services-section-home-page/Web Design and Development/Laravel Development.png']],
    [/\bphp\b/i, ['/services-section-home-page/Web Design and Development/PHP Development.png', '/services-section-home-page/Web Design and Development/PHP Development.png']],

    /* ── Digital Marketing Solutions Sub-services ── */
    [/\baeo\b|answer engine/i, ['/services-images-set2/aeo.png', '/services-images-set2/aeo.png']],
    [/\bgeo\b|generative engine/i, ['/services-images-set2/image.png', '/services-images-set2/image.png']],
    [/ai seo/i, ['/services-images-set2/Ai.png', '/services-images-set2/Ai.png']],
    [/social media creative/i, ['/services-set3/social-media.png', '/services-set3/social-media.png']],
    [/social media/i, ['/services-images-set2/digital-marketing.png', '/services-images-set2/digital-marketing.png']],
    [/\bppc\b|paid advertising/i, ['/services-images-set2/ppc.png', '/services-images-set2/ppc.png']],
    [/email/i, ['/services-images-set2/email-marketing.png', '/services-images-set2/email-marketing.png']],
    [/whatsapp/i, ['/services-images-set2/whatapp-marketing.png', '/services-images-set2/whatapp-marketing.png']],
    [/\bsms\b/i, ['/services-images-set2/sms.png', '/services-images-set2/sms.png']],
    [/content marketing/i, ['/services-images-set2/content.png', '/services-images-set2/content.png']],
    [/creative video/i, ['/services-set3/video.png', '/services-set3/video.png']],
    [/video marketing/i, ['/services-images-set2/video.png', '/services-images-set2/video.png']],
    [/white hat/i, ['/services-images-set2/white-hat-seo.png', '/services-images-set2/white-hat-seo.png']],
    [/link building/i, ['/services-images-set2/link.png', '/services-images-set2/link.png']],
    [/\borm\b|reputation/i, ['/services-images-set2/orm.png', '/services-images-set2/orm.png']],

    /* ── Creative Solutions Sub-services ── */
    [/ui\/ux/i, ['/services-set3/uiux.png', '/services-set3/uiux.png']],
    [/logo/i, ['/services-set3/logo.png', '/services-set3/logo.png']],
    [/user manual/i, ['/services-set3/user-management.png', '/services-set3/user-management.png']],
    [/product design/i, ['/services-set3/product-design.png', '/services-set3/product-design.png']],

    /* ── Back Office Support Sub-services ── */
    [/e-?commerce website maintenance/i, ['/services-set4/E-commerce Website Maintenance.png', '/services-set4/E-commerce Website Maintenance.png']],
    [/24\/7/i, ['/services-set4/support.png', '/services-set4/support.png']],
    [/technical maintenance|security/i, ['/services-set4/tech-management.png', '/services-set4/tech-management.png']],
    [/order and backend|backend management/i, ['/services-set4/order-mangement.png', '/services-set4/order-mangement.png']],
];

/* service categories (left side of the menu) */
const CAT_IMAGE_RULES = [
    [/app dev/i, ['/services-section-home-page/app-development/Android Development.png', '/services-set2/iOS Development.png']],
    [/software/i, ['/services-section-home-page/Software Application Development/saas.png', '/services-set2/Software Application Development/Application Development.png']],
    [/web/i, ['/services-section-home-page/Web Design and Development/Corporate Web Development.png', '/services-section-home-page/Web Design and Development/Web Portal Development.png']],
    [/commerce/i, ['/services-section-home-page/E-commerce Solutions/Custom eCommerce Solutions.png', '/services-section-home-page/E-commerce Solutions/Shopify Development Solutions.png']],
    [/digital marketing/i, ['/services-images-set2/digital-marketing.png', '/services-images-set2/digital-marketing.png']],
    [/creative/i, ['/services-set3/logo.png', '/services-set3/uiux.png']],
    [/back office/i, ['/services-set4/support.png', '/services-set4/tech-management.png']],
];

/* unknown sub-services inside Software / Web categories use this code & screen pool */
const SUB_IMAGE_POOL = [
    '1517180102446-f3ece451e9d8', '1555952494-efd681c7e3f9', '1555949963-ff9fe0c870eb',
    '1487058792275-0ad4aaf24ca7', '1529101091764-c3526daf38fe', '1524135329990-07660cd5bf10',
    '1519397154350-533cea5b8bff', '1489389944381-3471b5b30f04', '1505238680356-667803448bb6',
    '1515879218367-8466d910aaa4', '1508921108053-9f757ead871c', '1505685296765-3a2736de412f',
    '1488590528505-98d2b5aba04b', '1504164996022-09080787b6b3', '1461749280684-dccba630e2f6',
    '1511707171634-5f897ff02aa9', '1657868203197-627e5ab86e19', '1547658719-da2b51169166',
];

const hashStr = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

/** → { src } for a photo, or { art, variant } for a generated topic illustration */
const pageVisual = (subName = '', catName = '', variant = 0) => {
    const key = String(subName || '').toLowerCase().trim();
    const cat = String(catName || '').toLowerCase().trim();
    const v = variant % 2;

    if (!key) {
        const ov = PAGE_IMAGE_OVERRIDES[cat];
        if (ov) return { src: ov[v] || ov[0] };
        const c = CAT_IMAGE_RULES.find(([re]) => re.test(cat));
        return c ? { src: U(c[1][v]) } : { art: catName, variant: v };
    }
    const ov = PAGE_IMAGE_OVERRIDES[key];
    if (ov) return { src: ov[v] || ov[0] };
    const rule = SUB_IMAGE_RULES.find(([re]) => re.test(key));
    if (rule) return rule[1][v] ? { src: U(rule[1][v]) } : { art: subName, variant: v };
    if (/software|web/.test(cat)) {
        const start = hashStr(key) % SUB_IMAGE_POOL.length;
        return { src: U(SUB_IMAGE_POOL[(start + v * 5) % SUB_IMAGE_POOL.length]) };
    }
    const catRule = CAT_IMAGE_RULES.find(([re]) => re.test(cat));
    if (catRule && catRule[1][v]) return { src: U(catRule[1][v]) };
    return { art: subName, variant: v };
};

const ART_ICONS = [
    [/answer engine|\baeo\b/, HelpCircle],
    [/generative|\bgeo\b|\bai\b/, Bot],
    [/seo|search|optimi[sz]ation/, Search],
    [/social/, Share2],
    [/ppc|paid|advertis/, MousePointerClick],
    [/email|newsletter/, Mail],
    [/whatsapp|sms|messag/, MessageCircle],
    [/content|manual|document/, BookOpen],
    [/video|film/, Video],
    [/link building|backlink/, Link2],
    [/reputation|\borm\b|review/, Star],
    [/ui\/ux|\bui\b|\bux\b|wireframe/, Layout],
    [/logo|brand|identity/, PenTool],
    [/product design|prototyp/, Box],
    [/bigcommerce|commerce|store|shop/, ShoppingCart],
    [/order|backend|fulfil|catalog/, ClipboardList],
    [/24\/7|helpdesk|support/, Headphones],
    [/security|technical|server/, ShieldCheck],
    [/maintenance|upkeep/, Wrench],
    [/marketing|digital/, Megaphone],
    [/creative|design/, Palette],
    [/back office/, Headphones],
];
const ART_ORBITS = [
    [BarChart3, Globe, Rocket], [Zap, Layers, Star], [Cpu, Network, Award],
    [Eye, Gauge, TrendingUp], [Code2, Cloud, Lock],
];

/** generated, related, human-free illustration for topics without a fitting photo */
function TopicArt({ name = '', variant = 0 }) {
    const t = String(name).toLowerCase();
    const found = ART_ICONS.find(([re]) => re.test(t));
    const Icon = found ? found[1] : Layers;
    const [O1, O2, O3] = ART_ORBITS[hashStr(t) % ART_ORBITS.length];
    const dark = variant % 2 === 0;
    return (
        <div
            aria-hidden="true"
            className={`absolute inset-0 overflow-hidden ${dark ? 'bg-gradient-to-br from-[#0A291E] via-[#0F3D2E] to-[#124A37]' : 'bg-gradient-to-br from-[#FFF8EE] via-white to-[#F2EFE9]'}`}
        >
            <DotGrid dark={dark} />
            <span className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#E8890C]/25" />
            <span className="absolute -bottom-20 -left-12 w-72 h-72 rounded-full bg-[#E8890C]/20" />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-44 h-44 rounded-[2rem] shadow-2xl flex items-center justify-center transition-transform duration-[1200ms] ease-out group-hover:scale-110 ${dark ? 'bg-white/10 border border-white/25' : 'bg-white border border-[#EFE1C6]'}`}>
                    <Icon className="w-24 h-24 text-[#E8890C]" strokeWidth={1.4} />
                </div>
            </div>
            <span className={`absolute top-[14%] left-[12%] w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${dark ? 'bg-[#E8890C] text-[#0F3D2E]' : 'bg-[#0F3D2E] text-[#E8890C]'}`}><O1 className="w-7 h-7" /></span>
            <span className={`absolute top-[22%] right-[10%] w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${dark ? 'bg-[#E8890C] text-[#0F3D2E]' : 'bg-[#E8890C] text-[#0F3D2E]'}`}><O2 className="w-6 h-6" /></span>
            <span className={`absolute bottom-[30%] left-[9%] w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${dark ? 'bg-white text-[#0F3D2E]' : 'bg-[#E8890C] text-[#0F3D2E]'}`}><O3 className="w-6 h-6" /></span>
        </div>
    );
}

function Visual({ v, fallback, alt }) {
    if (v && v.src) return <ZoomImage src={[v.src, fallback]} alt={alt} />;
    if (fallback) return <ZoomImage src={fallback} alt={alt} />;
    if (v && v.art !== undefined) return <TopicArt name={v.art} variant={v.variant} />;
    return null;
}

/* ───────── process showcase: auto-advancing 3-D card deck ─────────
   Left: numbered step list (a progress line fills, then the next step opens).
   Right: a tilting 3-D card with a stack of coloured cards behind it.
   The deliverable panel changes colour per step: light blue, light yellow, dark green, lavender, sand.
   Hover or focus pauses the auto-play. No red anywhere.
─────────────────────────────────────────────── */
const STEP_MS = 5000;
const STEP_THEMES = [
    { panel: '#FFF3DC', ink: '#0F3D2E', soft: '#E8890C', dark: false }, // warm yellow tint
    { panel: '#EAF3EE', ink: '#0F3D2E', soft: '#0F3D2E', dark: false }, // light green tint
    { panel: '#0F3D2E', ink: '#FFFFFF', soft: '#E8890C', dark: true },  // dark green
    { panel: '#FFF8EC', ink: '#0F3D2E', soft: '#E8890C', dark: false }, // light cream
    { panel: '#F0F6F2', ink: '#0F3D2E', soft: '#0F3D2E', dark: false }, // soft green
];

function ProcessShowcase({ steps, active, setActive }) {
    const reduce = useReducedMotion();
    const [paused, setPaused] = useState(false);
    const total = steps.length;
    if (!total) return null;

    const step = steps[active] || steps[0];
    const theme = STEP_THEMES[active % STEP_THEMES.length];
    const ghost1 = STEP_THEMES[(active + 1) % STEP_THEMES.length];
    const ghost2 = STEP_THEMES[(active + 2) % STEP_THEMES.length];
    const Icon = stepIcon(step.title, active);
    const next = (active + 1) % total;

    return (
        <div
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
        >
            {/* ── step list ── */}
            <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-4 lg:flex lg:flex-col gap-2 sm:gap-2.5 w-full">
                {steps.map((st, idx) => {
                    const on = idx === active;
                    return (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => setActive(idx)}
                            aria-current={on ? 'step' : undefined}
                            className={`relative w-full overflow-hidden text-left flex items-center gap-2 sm:gap-3 lg:gap-3.5 rounded-xl sm:rounded-2xl border p-2.5 sm:p-3 lg:px-4 lg:py-3.5 cursor-pointer transition-all duration-300 ${on
                                ? 'bg-[#0F3D2E] border-[#0F3D2E] text-white shadow-[0_16px_34px_rgba(15,61,46,0.28)] lg:translate-x-2'
                                : 'bg-white border-[#EFE1C6] text-[#0F3D2E] hover:border-[#E8890C] hover:shadow-md'
                                }`}
                        >
                            <span className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-lg sm:rounded-xl flex items-center justify-center text-xs sm:text-sm font-black tracking-wide transition-colors ${on ? 'bg-[#E8890C] text-[#0F3D2E]' : 'bg-[#FFF3DC] text-[#E8890C]'}`}>
                                {String(idx + 1).padStart(2, '0')}
                            </span>
                            <span className="min-w-0 text-xs sm:text-[13px] lg:text-sm font-bold leading-tight truncate sm:truncate-none sm:line-clamp-2">{st.title}</span>
                            {on && (
                                <span
                                    aria-hidden="true"
                                    className="absolute left-0 bottom-0 h-[3px] w-full origin-left bg-[#E8890C]"
                                    style={{
                                        animation: reduce ? 'none' : `procFill ${STEP_MS}ms linear forwards`,
                                        animationPlayState: paused ? 'paused' : 'running',
                                    }}
                                    onAnimationEnd={() => setActive(next)}
                                />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* ── 3-D card deck ── */}
            <div className="lg:col-span-8">
                <div className="relative mr-4 mb-4 sm:mr-8 sm:mb-8">
                    <span
                        aria-hidden="true"
                        className="absolute inset-0 rounded-3xl translate-x-4 translate-y-4 sm:translate-x-8 sm:translate-y-8 rotate-[2.5deg] opacity-70 transition-colors duration-500"
                        style={{ background: ghost2.panel }}
                    />
                    <span
                        aria-hidden="true"
                        className="absolute inset-0 rounded-3xl translate-x-2 translate-y-2 sm:translate-x-4 sm:translate-y-4 rotate-[1.2deg] transition-colors duration-500"
                        style={{ background: ghost1.panel }}
                    />

                    <TiltCard max={4} className="relative">
                        <div className="relative rounded-3xl bg-white border border-[#EFE1C6] shadow-[0_30px_70px_rgba(15,61,46,0.18)] overflow-hidden min-h-[340px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={active}
                                    style={{ transformPerspective: 1400 }}
                                    initial={{ opacity: 0, rotateY: -22, x: 30 }}
                                    animate={{ opacity: 1, rotateY: 0, x: 0 }}
                                    exit={{ opacity: 0, rotateY: 18, x: -24 }}
                                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                    className="grid grid-cols-1 md:grid-cols-5 min-h-[340px]"
                                >
                                    {/* description */}
                                    <div className="md:col-span-3 relative min-w-0 p-6 sm:p-9 flex flex-col justify-center">
                                        <div className="relative flex items-center gap-3 mb-4">
                                            <span className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: theme.panel }}>
                                                <Icon className="w-6 h-6" style={{ color: theme.soft }} strokeWidth={1.7} />
                                            </span>
                                            <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#E8890C]">
                                                Step {active + 1} / {total}
                                            </span>
                                        </div>
                                        <h3 className="relative break-words text-xl sm:text-3xl font-extrabold text-[#0F3D2E] leading-tight mb-3">{step.title}</h3>
                                        <p className="relative text-sm sm:text-base text-[#1a1a1a] leading-relaxed mb-6">{step.description}</p>
                                        <button
                                            type="button"
                                            onClick={() => setActive(next)}
                                            className="group relative self-start inline-flex items-center gap-2 rounded-full bg-[#0F3D2E] px-5 py-2.5 text-xs sm:text-sm font-bold text-white cursor-pointer hover:bg-[#124A37] transition-colors"
                                        >
                                            {active < total - 1 ? `Next: ${steps[next].title}` : 'Start over'}
                                            <ArrowRight className="w-4 h-4 text-[#E8890C] group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>

                                    {/* deliverable panel (colour changes per step) */}
                                    <div
                                        className="md:col-span-2 relative min-w-0 overflow-hidden p-6 sm:p-8 flex flex-col justify-center transition-colors duration-500"
                                        style={{ background: theme.panel, color: theme.ink }}
                                    >
                                        <span aria-hidden="true" className="absolute -right-12 -bottom-12 w-44 h-44 rounded-full opacity-20" style={{ background: theme.soft }} />
                                        <span aria-hidden="true" className="absolute -left-8 -top-8 w-24 h-24 rounded-full opacity-10" style={{ background: theme.soft }} />
                                        <span
                                            className="relative w-11 h-11 rounded-full flex items-center justify-center mb-4"
                                            style={{ background: theme.soft, color: theme.dark ? '#0F3D2E' : '#FFFFFF' }}
                                        >
                                            <CheckCircle2 className="w-6 h-6" />
                                        </span>
                                        <p className="relative text-[11px] uppercase font-extrabold tracking-[0.2em] mb-1.5" style={{ color: theme.soft }}>
                                            Deliverable
                                        </p>
                                        <p className="relative break-words text-base sm:text-xl font-bold leading-snug">{step.deliverables}</p>
                                        <div className="relative mt-6 flex items-center gap-1.5" aria-hidden="true">
                                            {steps.map((_, i) => (
                                                <span
                                                    key={i}
                                                    className="h-1.5 rounded-full transition-all duration-300"
                                                    style={{ width: i === active ? 28 : 8, background: theme.ink, opacity: i === active ? 0.85 : 0.25 }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </TiltCard>
                </div>
            </div>
        </div>
    );
}

/* ───────── why-choose-us showcase ─────────
   Heading, then a 2-column grid of reason cards, then a guarantees bar.
   Every card sits in a FIXED-HEIGHT slot. The opened card floats over the layout
   (it never pushes anything), so the section height, and the background photo, never change.
   Cards are dark green and mostly solid so they stay visible on top of the photo.
   Hover pauses the auto-play. Uses the `procFill` keyframe defined at the bottom of this file.
─────────────────────────────────────────────── */
/* ───────── why choose us: clean natural accordion ─────────
   In-flow accordion: cards expand naturally in document flow without overlapping
   the cards or guarantees below. Background photo expands smoothly with the content.
─────────────────────────────────────────────── */
function WhyShowcase({ why, visual, fallback2, visual2, alt }) {
    const reasons = why.reasons || [];
    const [active, setActive] = useState(0);

    return (
        <div className="relative w-full">
            {/* ── Centered Header ── */}
            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8 sm:mb-10">
                <Reveal>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white mb-3 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                        <TitleWords text={why.title} accent="text-[#E8890C]" />
                    </h2>
                    <span className="block h-1 w-14 rounded-full bg-[#E8890C] mx-auto mt-3" />
                    {why.description && (
                        <p className="text-white text-xs sm:text-sm md:text-base leading-relaxed mt-3.5 max-w-2xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
                            {why.description}
                        </p>
                    )}
                </Reveal>
            </div>

            {/* ── Reason cards: stable 2x2 grid where all descriptions are shown cleanly, eliminating layout shifts and preventing background image height changes ── */}
            <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-8 sm:mb-10 items-stretch">
                {reasons.map((r, idx) => {
                    const ReasonIcon = smartIcon(r.iconName, r.title, idx);
                    const on = idx === active;
                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            className="relative w-full h-full"
                        >
                            <div
                                role="button"
                                tabIndex={0}
                                onClick={() => setActive(idx)}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActive(idx); }}
                                className={`relative w-full h-full flex flex-col justify-start overflow-hidden rounded-2xl border-2 p-5 sm:p-6 cursor-pointer backdrop-blur-md transition-all duration-300 ${
                                    on
                                        ? 'bg-[#071712]/95 border-[#E8890C] shadow-[0_18px_40px_rgba(0,0,0,0.6)] ring-1 ring-[#E8890C]/50'
                                        : 'bg-[#0F3D2E]/80 border-white/30 shadow-[0_10px_26px_rgba(0,0,0,0.4)] hover:bg-[#0F3D2E]/90 hover:border-[#E8890C]/70'
                                }`}
                            >
                                <div className="flex items-center gap-3.5 sm:gap-4 mb-3">
                                    <span
                                        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                                            on
                                                ? 'border-[#E8890C] bg-[#E8890C]/20 text-[#E8890C] shadow-[0_0_15px_rgba(232,137,12,0.3)]'
                                                : 'border-white/30 bg-white/10 text-[#E8890C]'
                                        }`}
                                    >
                                        <ReasonIcon className="w-5 h-5" />
                                    </span>
                                    <h4 className="flex-1 min-w-0 text-sm sm:text-base font-bold text-white leading-snug">
                                        {r.title}
                                    </h4>
                                </div>

                                <p className="text-xs sm:text-sm leading-relaxed text-white/90">
                                    {r.description}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* ── Bottom Guarantees Bar ── */}
            {why.guarantees?.length > 0 && (
                <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="rounded-xl sm:rounded-2xl bg-[#0F3D2E]/80 border-2 border-white/30 backdrop-blur-md shadow-[0_10px_26px_rgba(0,0,0,0.4)] px-3 sm:px-8 py-3 sm:py-4 grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-around gap-2.5 sm:gap-6"
                    >
                        {why.guarantees.map((g, i) => (
                            <div key={i} className="flex items-center gap-1.5 sm:gap-2.5">
                                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-[#E8890C] bg-[#E8890C]/15 flex items-center justify-center text-[#E8890C] flex-shrink-0">
                                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" strokeWidth={3} />
                                </span>
                                <span className="text-[11px] sm:text-sm font-semibold text-white tracking-wide truncate">{g}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            )}
        </div>
    );
}


/* ───────── industries: orbit wheel ─────────
   Industries sit on a ring around a glowing hub. Click one (or let auto-play run)
   and the whole ring spins so that industry swings round to face the detail card.
   - Left: detail card (changes colour per industry, text reveals line by line)
   - Right: orbit wheel. Icons stay upright while the ring turns.
   - Auto-plays with a progress bar, pauses on hover / focus. Arrow buttons + keyboard work.
   - Mobile: wheel goes on top, detail card underneath.
   Usage:  <IndustryCoverflow list={industries.list || []} />
─────────────────────────────────────────────── */
const IND_MS = 5200;

/** one icon on the ring; stays upright while the ring rotates */
function OrbitNode({ a, rot, on, theme, Icon, label, onPick }) {
    const counter = useTransform(rot, (v) => -(v + a));
    return (
        <div className="absolute inset-0 flex justify-center items-start" style={{ transform: `rotate(${a}deg)` }}>
            <div className="-translate-y-1/2">
                <motion.button
                    type="button"
                    onClick={onPick}
                    aria-label={label}
                    aria-current={on ? 'true' : undefined}
                    title={label}
                    style={{ rotate: counter, background: on ? theme.panel : undefined }}
                    animate={{ scale: on ? 1.35 : 1 }}
                    whileHover={{ scale: on ? 1.35 : 1.18 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                    className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#E8890C] ${on
                        ? 'ring-2 ring-[#E8890C] shadow-[0_0_0_5px_rgba(232,137,12,0.25),0_14px_32px_rgba(0,0,0,0.5)]'
                        : 'bg-white/10 border border-white/25 backdrop-blur-sm hover:bg-white/20'
                        }`}
                >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: on ? theme.soft : '#FFFFFF' }} strokeWidth={1.8} />
                </motion.button>
            </div>
        </div>
    );
}

function IndustryCoverflow({ list }) {
    const reduce = useReducedMotion();
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);
    const rot = useMotionValue(270);          // ring rotation (deg)
    const n = list.length;
    const step = n ? 360 / n : 0;
    const angleOf = (i) => i * step;

    /* spin the ring so the active item faces left (270°), always by the shortest way */
    useEffect(() => {
        if (!n) return;
        const want = 270 - angleOf(active);
        const cur = rot.get();
        const delta = ((((want - cur) % 360) + 540) % 360) - 180;
        const target = cur + delta;
        if (reduce) { rot.set(target); return; }
        const c = animate(rot, target, { type: 'spring', stiffness: 70, damping: 16, mass: 0.9 });
        return () => c.stop();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active, n, reduce]);

    if (!n) return null;
    const go = (i) => setActive(((i % n) + n) % n);

    const ind = list[active];
    const theme = STEP_THEMES[active % STEP_THEMES.length];
    const ActiveIcon = industryIcon(ind.name);

    const line = {
        hidden: { opacity: 0, y: 18, filter: 'blur(5px)' },
        show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
    };

    return (
        <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            onKeyDown={(e) => {
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') go(active + 1);
                if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') go(active - 1);
            }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center"
        >
            {/* ───────── detail card ───────── */}
            <div className="lg:col-span-5 order-2 lg:order-1">
                <TiltCard max={4}>
                    <div className="relative rounded-[22px] bg-white overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.4)] flex flex-col">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active}
                                initial="hidden"
                                animate="show"
                                exit={{ opacity: 0, x: -30, transition: { duration: 0.18 } }}
                                variants={{ show: { transition: { staggerChildren: 0.1 } } }}
                                className="flex flex-col flex-1"
                            >
                                {/* coloured header strip */}
                                <motion.div variants={line} className="relative h-[60px] sm:h-[64px] overflow-hidden flex items-center px-5 sm:px-6" style={{ background: theme.panel }}>
                                    <span aria-hidden="true" className="absolute -right-8 -top-10 w-28 h-28 rounded-full opacity-25" style={{ background: theme.soft }} />
                                    <span className="relative w-10 h-10 rounded-lg bg-white shadow-md flex items-center justify-center">
                                        <ActiveIcon className="w-5 h-5" style={{ color: theme.soft }} strokeWidth={1.7} />
                                    </span>
                                    <span className="relative ml-auto text-xs sm:text-sm font-black tabular-nums" style={{ color: theme.ink }}>
                                        {String(active + 1).padStart(2, '0')} <span className="opacity-50">/ {String(n).padStart(2, '0')}</span>
                                    </span>
                                </motion.div>

                                <div className="flex-1 flex flex-col px-5 sm:px-6 pt-4 pb-4 sm:pb-5">
                                    <motion.h3 variants={line} className="text-xl sm:text-2xl font-extrabold leading-tight text-[#0F3D2E] line-clamp-2">
                                        {ind.name}
                                    </motion.h3>
                                    <motion.p variants={line} className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-2 sm:line-clamp-3">
                                        {ind.description}
                                    </motion.p>
                                    <motion.div variants={line} className="mt-3 pt-2">
                                        <div className="rounded-xl px-3.5 py-2.5 border-l-4 bg-[#F8FAFC]" style={{ borderColor: theme.soft }}>
                                            <p className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.16em] mb-0.5" style={{ color: theme.soft }}>
                                                Typical project
                                            </p>
                                            <p className="text-xs sm:text-sm font-bold leading-snug text-[#0F3D2E] line-clamp-2">{ind.useCase}</p>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* auto-play progress */}
                        <span
                            key={`p-${active}`}
                            aria-hidden="true"
                            className="absolute left-0 bottom-0 h-1 w-full origin-left"
                            style={{
                                background: theme.soft,
                                animation: reduce ? 'none' : `procFill ${IND_MS}ms linear forwards`,
                                animationPlayState: paused ? 'paused' : 'running',
                            }}
                            onAnimationEnd={() => go(active + 1)}
                        />
                    </div>
                </TiltCard>

                {/* arrows */}
                <div className="mt-2.5 flex items-center justify-center lg:justify-start gap-2.5">
                    <button
                        type="button"
                        onClick={() => go(active - 1)}
                        aria-label="Previous industry"
                        className="w-9 h-9 rounded-full border border-white/30 bg-white/10 text-white flex items-center justify-center cursor-pointer hover:bg-[#E8890C] hover:text-[#0F3D2E] hover:border-[#E8890C] transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => go(active + 1)}
                        aria-label="Next industry"
                        className="w-9 h-9 rounded-full border border-white/30 bg-white/10 text-white flex items-center justify-center cursor-pointer hover:bg-[#E8890C] hover:text-[#0F3D2E] hover:border-[#E8890C] transition-colors"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* ───────── orbit wheel ───────── */}
            <div className="lg:col-span-7 order-1 lg:order-2 flex justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.85, rotate: -30 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full max-w-[250px] sm:max-w-[300px] lg:max-w-[340px] aspect-square"
                >
                    {/* decorative spinning dashed rings */}
                    <motion.span
                        aria-hidden="true"
                        animate={reduce ? undefined : { rotate: 360 }}
                        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-0 rounded-full border border-dashed border-white/20"
                    />
                    <motion.span
                        aria-hidden="true"
                        animate={reduce ? undefined : { rotate: -360 }}
                        transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-[22%] rounded-full border border-dashed border-[#E8890C]/35"
                    />

                    {/* the ring that carries the icons */}
                    <motion.div style={{ rotate: rot }} className="absolute inset-[8%] rounded-full border border-white/25">
                        {/* travelling light dots */}
                        {!reduce && [0, 1].map((d) => (
                            <motion.span
                                key={d}
                                aria-hidden="true"
                                className="absolute inset-0"
                                animate={{ rotate: d ? -360 : 360 }}
                                transition={{ duration: d ? 14 : 9, repeat: Infinity, ease: 'linear' }}
                            >
                                <span className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E8890C] shadow-[0_0_14px_4px_rgba(232,137,12,0.7)] ${d ? 'w-1.5 h-1.5' : 'w-2 h-2'}`} />
                            </motion.span>
                        ))}

                        {list.map((it, i) => (
                            <OrbitNode
                                key={i}
                                a={angleOf(i)}
                                rot={rot}
                                on={i === active}
                                theme={STEP_THEMES[i % STEP_THEMES.length]}
                                Icon={industryIcon(it.name)}
                                label={it.name}
                                onPick={() => setActive(i)}
                            />
                        ))}
                    </motion.div>

                    {/* centre hub */}
                    <div className="absolute inset-[28%] flex items-center justify-center">
                        {!reduce && [0, 1, 2].map((r) => (
                            <motion.span
                                key={r}
                                aria-hidden="true"
                                className="absolute inset-0 rounded-full border-2 border-[#E8890C]/50"
                                animate={{ scale: [0.9, 1.5], opacity: [0.6, 0] }}
                                transition={{ duration: 3.2, repeat: Infinity, delay: r * 1.05, ease: 'easeOut' }}
                            />
                        ))}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active}
                                initial={{ opacity: 0, scale: 0.6, rotate: -40 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                exit={{ opacity: 0, scale: 0.6, rotate: 40 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                className="relative w-full h-full rounded-full flex flex-col items-center justify-center text-center p-2.5 shadow-[0_0_50px_rgba(232,137,12,0.3)]"
                                style={{ background: theme.panel, color: theme.ink }}
                            >
                                <ActiveIcon className="w-8 h-8 sm:w-11 sm:h-11" style={{ color: theme.soft }} strokeWidth={1.5} />
                                <span className="mt-1 text-[10px] sm:text-xs font-extrabold leading-tight line-clamp-2 px-1">{ind.name}</span>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* pointer notch on the left where the active icon docks */}
                    <span
                        aria-hidden="true"
                        className="hidden lg:block absolute left-[-14px] top-1/2 -translate-y-1/2 w-0 h-0 border-y-[9px] border-y-transparent border-l-[12px] border-l-[#E8890C]"
                    />
                </motion.div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════ */
export default function ServicesDetails() {
    const { categorySlug, subServiceSlug } = useParams();
    const [searchParams] = useSearchParams();

    const [openFaqIndex, setOpenFaqIndex] = useState(0);
    const [activeTechCategory, setActiveTechCategory] = useState(0);
    const [activeStep, setActiveStep] = useState(0);

    const queryCategory = searchParams.get('category');
    const queryItem = searchParams.get('item');

    const currentData = useMemo(() => {
        if (queryCategory) return getServiceByQuery(queryCategory, queryItem);
        return getServiceData(categorySlug, subServiceSlug);
    }, [categorySlug, subServiceSlug, queryCategory, queryItem]);

    useEffect(() => {
        window.scrollTo(0, 0);
        setOpenFaqIndex(0);
        setActiveTechCategory(0);
        setActiveStep(0);
    }, [categorySlug, subServiceSlug, queryCategory, queryItem]);

    const {
        categoryName, categorySlug: activeCatSlug, subServiceName, subServiceSlug: activeSubSlug,
        isSubService, subServicesList, hero, about, features, process: processData, whyChooseUs,
        techStack, industries, testimonials, faqs,
    } = currentData;

    const currentTitle = subServiceName || categoryName;

    // Live Case Studies and Blogs State from Admin
    const [liveCaseStudies, setLiveCaseStudies] = useState([]);
    const [liveBlogs, setLiveBlogs] = useState([]);
    const [loadingLiveContent, setLoadingLiveContent] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const fetchLiveContent = async () => {
            try {
                setLoadingLiveContent(true);
                const [csRes, blogRes] = await Promise.allSettled([
                    authService.getPublicCaseStudies({ limit: 12 }),
                    authService.getPublicBlogs({ status: 'published', limit: 6 })
                ]);

                if (isMounted && csRes.status === 'fulfilled' && csRes.value?.success) {
                    setLiveCaseStudies(csRes.value.data || []);
                }
                if (isMounted && blogRes.status === 'fulfilled' && blogRes.value?.success) {
                    setLiveBlogs(blogRes.value.data || []);
                }
            } catch (err) {
                console.warn('Failed to load live case studies or blogs in servicesdetails:', err);
            } finally {
                if (isMounted) setLoadingLiveContent(false);
            }
        };

        fetchLiveContent();
        return () => { isMounted = false; };
    }, [categorySlug, subServiceSlug]);

    const displayCaseStudies = useMemo(() => {
        if (!liveCaseStudies.length) return [];
        const needle = `${categoryName || ''} ${subServiceName || ''} ${activeCatSlug || ''} ${activeSubSlug || ''}`.toLowerCase();

        const matched = liveCaseStudies.filter((item) => {
            const cat = (item.category || '').toLowerCase();
            const ind = (item.industry || '').toLowerCase();
            const services = (item.servicesProvided || []).map((s) => s.toLowerCase());
            const tech = (item.technologiesUsed || []).map((t) => t.toLowerCase());

            return (
                needle.includes(cat) ||
                cat.includes(categoryName?.toLowerCase() || '') ||
                needle.includes(ind) ||
                services.some((s) => needle.includes(s) || s.includes(subServiceName?.toLowerCase() || '')) ||
                tech.some((t) => needle.includes(t))
            );
        });

        return matched.length > 0 ? matched.slice(0, 4) : liveCaseStudies.slice(0, 4);
    }, [liveCaseStudies, categoryName, subServiceName, activeCatSlug, activeSubSlug]);

    const displayBlogs = useMemo(() => {
        if (!liveBlogs.length) return [];
        return liveBlogs.slice(0, 3);
    }, [liveBlogs]);

    /* iOS page keeps its "Delivery Framework" heading styling.
       Adjust this regex if your iOS slug/name differs. */
    const isIos = /\bios\b/i.test(`${activeCatSlug || ''} ${activeSubSlug || ''} ${categoryName || ''} ${subServiceName || ''}`.replace(/-/g, ' '));

    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

    const reducedDescription = useMemo(() => {
        const raw = hero?.description || subServiceName || categoryName || '';
        if (!raw) return '';
        const m = raw.match(/^.*?[.!?](?:\s|$)/);
        return m ? m[0].trim() : raw;
    }, [hero?.description, subServiceName, categoryName]);

    const tickerItems = useMemo(
        () => (features?.items || []).map((f) => f.title).filter(Boolean),
        [features]
    );

    const steps = processData.steps || [];

    /* "…Delivery Framework" → highlight both words on the iOS page */
    const processAccentWords = isIos && /delivery framework\s*$/i.test(processData.title || '') ? 2 : 1;

    return (
        <MotionConfig reducedMotion="user">
            <div className="w-full min-h-screen bg-white font-sans text-black selection:bg-[#E8890C] selection:text-[#0F3D2E] overflow-x-hidden">
                <motion.div
                    style={{ scaleX: progress }}
                    className="fixed top-0 left-0 right-0 h-1 origin-left bg-[#E8890C] z-[70]"
                />
                {/* ───────────── 1. HERO ───────────── */}
                <section className="relative w-full overflow-hidden mt-[68px] sm:mt-[76px] lg:mt-[82px] xl:mt-[88px] py-6 sm:py-8 lg:py-10 flex items-center justify-center bg-[rgb(240,231,195)]">
                    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-1 sm:py-2 flex flex-col items-center text-center">
                        <motion.div
                            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
                            className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] min-[400px]:text-xs sm:text-sm font-bold text-[#0F3D2E] bg-white/85 px-3 sm:px-4 py-1.5 rounded-xl sm:rounded-full shadow-sm border border-white/70 mb-3 backdrop-blur-md max-w-full text-center"
                        >
                            <Link to="/" className="flex items-center gap-1 hover:text-[#E8890C] transition-colors"><Home className="w-3.5 h-3.5 flex-shrink-0" /><span>Home</span></Link>
                            <ChevronRight className="w-3.5 h-3.5 text-[#0F3D2E]/50 flex-shrink-0" />
                            <Link to="/services" className="hover:text-[#E8890C] transition-colors flex-shrink-0">Services</Link>
                            <ChevronRight className="w-3.5 h-3.5 text-[#0F3D2E]/50 flex-shrink-0" />
                            <Link to={`/services/${activeCatSlug}`} className={`hover:text-[#E8890C] transition-colors ${!isSubService ? 'font-extrabold text-[#0F3D2E]' : ''}`}>{categoryName}</Link>
                            {isSubService && (
                                <>
                                    <ChevronRight className="w-3.5 h-3.5 text-[#0F3D2E]/50 flex-shrink-0" />
                                    <span className="font-extrabold text-[#0F3D2E]">{subServiceName}</span>
                                </>
                            )}
                        </motion.div>

                        {/* Frosted Glass Content Panel: softer white tint so it blends naturally into the banner */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.97, y: 8 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.45, delay: 0.08 }}
                            className="w-full max-w-2xl rounded-2xl sm:rounded-3xl bg-white/55 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_rgba(15,61,46,0.08)] px-6 py-4 sm:px-8 sm:py-5 flex flex-col items-center mb-3.5"
                        >
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black tracking-tight leading-tight mb-2 text-[#0F3D2E]">
                                <TitleWords text={currentTitle || 'Our Services'} accent="text-[#E8890C]" />
                            </h1>
                            <span className="block h-1 w-20 origin-center rounded-full bg-[#E8890C] mb-2.5 shadow-sm" />
                            <p className="text-[#0F3D2E] font-semibold text-xs sm:text-sm md:text-[15px] leading-relaxed max-w-xl">
                                {reducedDescription}
                            </p>
                        </motion.div>

                        {/* rectangular buttons with rounded corners */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}
                            className="flex flex-wrap items-center justify-center gap-3.5"
                        >
                            <Link
                                to="/contact"
                                className="group relative overflow-hidden inline-flex items-center gap-2 bg-[#0F3D2E] hover:bg-[#0A291E] text-white text-xs sm:text-sm font-bold px-7 py-2.5 sm:py-3 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                            >
                                <span className="absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/20 group-hover:left-[130%] transition-all duration-700" />
                                <span className="relative">{hero.ctaPrimary || 'Get a Quote'}</span>
                                <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <a
                                href="#features-section"
                                className="inline-flex items-center gap-1.5 bg-white/90 hover:bg-[#0F3D2E] hover:border-[#0F3D2E] hover:text-white text-[#0F3D2E] text-xs sm:text-sm font-bold px-7 py-2.5 sm:py-3 rounded-xl border-2 border-[#0F3D2E] shadow-sm hover:shadow-md transition-all duration-200"
                            >
                                {hero.ctaSecondary || 'Explore Capabilities'}
                            </a>
                        </motion.div>
                    </div>
                </section>

                {/* ───────────── 2. ABOUT (WHITE) — photo + overlapping text card, animated reveal ───────────── */}
                <section className="relative pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-10 lg:pb-16 overflow-hidden bg-white font-['Poppins',sans-serif]">
                    {/* short pastel blocks, offset up / down, that grow in */}
                    <motion.span
                        aria-hidden="true"
                        initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="hidden sm:block absolute left-0 top-[8%] h-[54%] w-[20%] origin-top bg-[#FFE3B8]"
                    />
                    <motion.span
                        aria-hidden="true"
                        initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="hidden sm:block absolute right-0 bottom-[8%] h-[54%] w-[20%] origin-bottom bg-[#FFE9BE]"
                    />

                    <div className="relative max-w-7xl xl:max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8 xl:gap-12">
                            {/* photo: wipes in, then settles from a slow zoom - 903x590 frame */}
                            <div className="relative z-0 w-full lg:w-[56%] xl:w-[58%] flex-shrink-0 flex justify-center lg:justify-start">
                                <div
                                    className="group relative w-full max-w-[903px] rounded-2xl sm:rounded-3xl shadow-[0_24px_60px_rgba(15,61,46,0.18)]"
                                    style={{ aspectRatio: '903/590', minHeight: '280px', maxHeight: '590px' }}
                                >
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, ease: 'easeOut' }}
                                        className="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-100"
                                    >
                                        <div className="absolute inset-0">
                                            <Visual v={pageVisual(subServiceName, categoryName, 0)} fallback={about.image} alt={currentTitle} />
                                        </div>
                                    </motion.div>
                                </div>
                            </div>

                            {/* text card: slides in, no negative overlap so photo is completely visible */}
                            <motion.div
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: '-80px' }}
                                variants={{
                                    hidden: { opacity: 0, x: 40 },
                                    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.12, delayChildren: 0.25 } },
                                }}
                                className="relative z-10 w-full lg:flex-1 rounded-2xl bg-white p-6 sm:p-8 lg:p-10 shadow-[0_24px_60px_rgba(15,61,46,0.14)] border border-[#EFE1C6]"
                            >

                                <motion.div variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.5 }}>
                                    <Badge>Our Capabilities</Badge>
                                </motion.div>

                                <motion.h2
                                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
                                    className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight leading-tight mb-5 text-[#0F3D2E]"
                                >
                                    <WordReveal text={about.title} />
                                </motion.h2>

                                <motion.p
                                    variants={{ hidden: { opacity: 0, y: 16, filter: 'blur(6px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)' } }}
                                    transition={{ duration: 0.7 }}
                                    className="text-black text-[15px] sm:text-base font-medium leading-relaxed mb-4"
                                >
                                    {about.description}
                                </motion.p>
                                {about.descriptionSecondary && (
                                    <motion.p
                                        variants={{ hidden: { opacity: 0, y: 16, filter: 'blur(6px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)' } }}
                                        transition={{ duration: 0.7 }}
                                        className="text-black text-sm sm:text-[15px] leading-relaxed"
                                    >
                                        {about.descriptionSecondary}
                                    </motion.p>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ───────────── 3. FEATURES / CAPABILITIES (navy · white · gold cards) ───────────── */}
                <FeatureCards features={features} resolveIcon={smartIcon} />

                {/* ───────────── 4. PROCESS / DELIVERY FRAMEWORK (WHITE) — click-to-view tabs ───────────── */}
                <section className={`relative overflow-hidden bg-white ${isIos ? 'pt-8 pb-8 sm:pt-10 sm:pb-10' : 'py-8 sm:py-10 lg:py-12'}`}>
                    <DotGrid className="opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
                    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <SectionHeading
                            badge={isIos ? 'DEVELOPMENT APPROACH' : processData.badge}
                            title={processData.title}
                            description={processData.description}
                            accentWords={processAccentWords}
                        />

                        <ProcessShowcase steps={steps} active={activeStep} setActive={setActiveStep} />
                    </div>
                </section>

                {/* ───────────── 5. WHY CHOOSE US — photo + lighter natural overlay, compact height ───────────── */}
                <section className="relative py-8 sm:py-10 lg:py-12 overflow-hidden bg-[#071712]">
                    <PhotoBackdrop
                        src={BG_WHY}
                        fallback={BG_WHY_FALLBACK}
                        overlay="from-black/75 via-[#0F3D2E]/35 to-black/70"
                    />
                    <DotGrid dark className="opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
                    <WhyShowcase
                        why={whyChooseUs}
                        visual={pageVisual(subServiceName, categoryName, 1)}
                        visual2={pageVisual(subServiceName, categoryName, 0)}
                        fallback2={about.image}
                        alt="Why Choose VR4Web"
                    />
                </section>

                {/* ───────────── 6. TECH STACK (WHITE) — real logos ───────────── */}
                <section className="relative py-8 sm:py-10 lg:py-12 bg-white overflow-hidden">
                    <DotGrid className="opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <SectionHeading badge={techStack.badge} title={techStack.title} description={techStack.description} />

                        <div className="flex flex-wrap items-center justify-center gap-2 -mt-3 mb-8">
                            {techStack.categories.map((cat, idx) => {
                                const active = activeTechCategory === idx;
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveTechCategory(idx)}
                                        className={`relative px-5 py-2 rounded-full text-xs sm:text-sm font-bold cursor-pointer transition-colors ${active ? 'text-white' : 'text-[#0F3D2E] bg-white border border-[#EFE1C6] hover:border-[#E8890C]'}`}
                                    >
                                        {active && <motion.span layoutId="techPill" className="absolute inset-0 rounded-full bg-[#E8890C] shadow-md" transition={{ type: 'spring', stiffness: 350, damping: 30 }} />}
                                        <span className="relative">{cat.name}</span>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
                            {techStack.categories[activeTechCategory]?.items.map((tech, idx) => (
                                <motion.div
                                    key={`${activeTechCategory}-${idx}`}
                                    initial={{ opacity: 0, scale: 0.9, y: 16 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                                >
                                    <TiltCard max={12}>
                                        <div className="group h-full bg-white rounded-2xl p-5 border border-[#EFE1C6] shadow-sm hover:shadow-[0_18px_40px_rgba(232,137,12,0.2)] hover:border-[#E8890C] transition-all flex flex-col items-center text-center">
                                            <div className="w-14 h-14 rounded-2xl bg-[#FFF8EC] border border-[#F1E3C8] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform" style={{ transform: 'translateZ(30px)' }}>
                                                <TechLogo name={tech.name} iconName={tech.iconName} idx={idx} />
                                            </div>
                                            <h4 className="text-sm sm:text-base font-bold text-[#0F3D2E] mb-0.5">{tech.name}</h4>
                                            <p className="text-xs text-black font-medium">{tech.type}</p>
                                        </div>
                                    </TiltCard>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
                {/* ───────────── 7. INDUSTRIES — photo + lighter green overlay, compact height ───────────── */}
                <section className="relative py-8 sm:py-10 lg:py-12 overflow-hidden bg-[#0F3D2E]">
                    <PhotoBackdrop
                        src={BG_IND}
                        fallback={BG_IND_FALLBACK}
                        overlay="from-[#0F3D2E]/55 via-[#0F3D2E]/40 to-[#124A37]/35"
                    />
                    <DotGrid dark className="opacity-25 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <SectionHeading dark badge={industries.badge} title={industries.title} description={industries.description} className="mb-5 sm:mb-6" />
                        <IndustryCoverflow list={industries.list || []} />
                    </div>
                </section>

                {/* ───────────── 8. CASE STUDIES & CLIENT STORIES (WHITE / LIGHT) — Live Admin-Synced ───────────── */}
                {(displayCaseStudies.length > 0 || displayBlogs.length > 0) && (
                    <section className="relative py-12 sm:py-16 lg:py-20 bg-[#F8FAF9] overflow-hidden border-t border-[#E5E7EB]">
                        <DotGrid className="opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
                        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                            {/* Section Header */}
                            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
                                <span className="inline-block px-4 py-1.5 rounded-full bg-[#E8890C]/15 border border-[#E8890C]/40 text-[#E8890C] text-xs font-black uppercase tracking-wider mb-3.5 shadow-xs">
                                    Client Success Stories
                                </span>
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0F3D2E] tracking-tight leading-tight">
                                    Real Projects, <span className="text-[#E8890C]">Measurable Results</span>
                                </h2>
                                <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                                    Discover how we build scalable architectures, modern engineering pipelines, and verified digital solutions for {currentTitle}.
                                </p>
                            </div>

                            {/* Case Studies Grid */}
                            {displayCaseStudies.length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
                                    {displayCaseStudies.map((study) => {
                                        const studySlug = study.slug || study._id;
                                        const studyImg = study.featuredImage || study.cardImage || '/case-study/ad.png';
                                        const metricsList = Array.isArray(study.metrics) ? study.metrics.slice(0, 2) : [];
                                        const tagsList = [
                                            study.industry,
                                            ...(Array.isArray(study.technologiesUsed) ? study.technologiesUsed.slice(0, 3) : []),
                                            ...(Array.isArray(study.servicesProvided) ? study.servicesProvided.slice(0, 2) : [])
                                        ].filter(Boolean);

                                        return (
                                            <div
                                                key={study._id || study.slug}
                                                className="group bg-white rounded-2xl sm:rounded-3xl border border-[#E5E7EB] hover:border-[#E8890C] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
                                            >
                                                <div>
                                                    {/* Image Frame */}
                                                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                                                        <img
                                                            src={studyImg}
                                                            alt={study.title}
                                                            loading="lazy"
                                                            onError={(e) => {
                                                                e.currentTarget.onerror = null;
                                                                e.currentTarget.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80';
                                                            }}
                                                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                                        />
                                                        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                                                            <span className="px-3 py-1 rounded-full bg-[#0F3D2E]/90 text-white text-[11px] font-bold backdrop-blur-md shadow-xs">
                                                                {study.category || 'Case Study'}
                                                            </span>
                                                            {study.clientName && (
                                                                <span className="px-2.5 py-1 rounded-full bg-white/95 text-[#0F3D2E] text-[11px] font-extrabold backdrop-blur-md shadow-xs">
                                                                    {study.clientName}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Content Body */}
                                                    <div className="p-5 sm:p-7">
                                                        <h3 className="text-xl sm:text-2xl font-black text-[#0F3D2E] group-hover:text-[#E8890C] transition-colors leading-snug mb-2.5">
                                                            <Link to={`/case-study/${studySlug}`}>
                                                                {study.title}
                                                            </Link>
                                                        </h3>
                                                        <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
                                                            {study.shortDescription || study.projectOverview || study.summary || study.challenge || 'Custom enterprise solution engineered with modern performance benchmarks.'}
                                                        </p>

                                                        {/* Metrics Row */}
                                                        {metricsList.length > 0 && (
                                                            <div className="grid grid-cols-2 gap-3 mb-4 p-3 rounded-xl bg-[#F8FAF9] border border-[#E5E7EB]">
                                                                {metricsList.map((m, mIdx) => (
                                                                    <div key={mIdx}>
                                                                        <span className="text-lg sm:text-xl font-black text-[#0F3D2E] block">
                                                                            {m.value}
                                                                        </span>
                                                                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                                                                            {m.label}
                                                                        </span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}

                                                        {/* Tags */}
                                                        {tagsList.length > 0 && (
                                                            <div className="flex flex-wrap gap-1.5 mb-2">
                                                                {tagsList.map((tag, tIdx) => (
                                                                    <span
                                                                        key={tIdx}
                                                                        className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold"
                                                                    >
                                                                        {tag}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Action Footer */}
                                                <div className="px-5 sm:px-7 pb-5 sm:pb-7 flex items-center justify-between border-t border-[#E5E7EB]/60 pt-4">
                                                    <Link
                                                        to={`/case-study/${studySlug}`}
                                                        className="inline-flex items-center gap-2 text-sm font-bold text-[#0F3D2E] hover:text-[#E8890C] transition-colors group/link"
                                                    >
                                                        <span>View Full Case Study</span>
                                                        <ArrowRight className="w-4 h-4 text-[#E8890C] group-hover/link:translate-x-1 transition-transform" />
                                                    </Link>
                                                    {study.projectUrl && (
                                                        <a
                                                            href={study.projectUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-xs font-semibold text-slate-500 hover:text-[#0F3D2E] transition-colors"
                                                        >
                                                            Live Project ↗
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Blogs / Industry Insights Section */}
                            {displayBlogs.length > 0 && (
                                <div className="mt-12 pt-10 border-t border-[#E5E7EB]">
                                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                                        <div>
                                            <span className="text-xs font-black uppercase tracking-wider text-[#E8890C] block mb-1">
                                                Technical Insights & Research
                                            </span>
                                            <h3 className="text-xl sm:text-2xl font-black text-[#0F3D2E]">
                                                Related Articles & Best Practices
                                            </h3>
                                        </div>
                                        <Link
                                            to="/blogs"
                                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0F3D2E] hover:text-[#E8890C] transition-colors"
                                        >
                                            <span>Explore All Insights</span>
                                            <ChevronRight className="w-4 h-4 text-[#E8890C]" />
                                        </Link>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {displayBlogs.map((b) => (
                                            <Link
                                                key={b._id || b.slug}
                                                to={`/blog/${b.slug || b._id}`}
                                                className="group bg-white rounded-2xl border border-[#E5E7EB] hover:border-[#E8890C] p-5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                                            >
                                                <div>
                                                    <div className="aspect-[16/9] w-full rounded-xl overflow-hidden mb-4 bg-slate-100">
                                                        <img
                                                            src={b.imageUrl || '/blogs/blogs-banner.png'}
                                                            alt={b.title}
                                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                        />
                                                    </div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="text-[11px] font-bold text-[#E8890C] uppercase tracking-wider">
                                                            {b.category || 'Tech'}
                                                        </span>
                                                        <span className="text-slate-300">•</span>
                                                        <span className="text-[11px] text-slate-500 font-medium">
                                                            {b.readTime || '5 min read'}
                                                        </span>
                                                    </div>
                                                    <h4 className="text-base font-bold text-[#0F3D2E] group-hover:text-[#E8890C] transition-colors line-clamp-2 leading-snug mb-2">
                                                        {b.title}
                                                    </h4>
                                                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                                                        {b.summary || 'In-depth architectural analysis and engineering methodology.'}
                                                    </p>
                                                </div>
                                                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0F3D2E]">
                                                    <span>Read Article</span>
                                                    <ArrowRight className="w-3.5 h-3.5 text-[#E8890C] group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Bottom Link to Stories Listing */}
                            <div className="text-center mt-10">
                                <Link
                                    to="/stories"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0F3D2E] hover:bg-[#E8890C] text-white font-bold text-sm shadow-md transition-all duration-200"
                                >
                                    <span>Browse All Client Success Stories</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </section>
                )}

                {/* ───────────── 9. FAQ (WHITE / CREAM) — 3-D accordion + contact card ───────────── */}
                <section className="relative py-8 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-white via-[#F6FAF7] to-white">
                    <span aria-hidden="true" className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#0F3D2E]/5 blur-3xl" />
                    <span aria-hidden="true" className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#E8890C]/10 blur-3xl" />
                    <div className="relative max-w-6xl mx-auto">
                        <SectionHeading badge={faqs.badge} title={faqs.title} description={faqs.description} />

                        <div className="max-w-4xl mx-auto space-y-3">
                            {faqs.items.map((item, idx) => {
                                const isOpen = openFaqIndex === idx;
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 30, rotateX: -25 }}
                                        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                                        viewport={{ once: true, margin: '-40px' }}
                                        transition={{ duration: 0.55, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
                                        style={{ transformPerspective: 1200 }}
                                    >
                                        <div
                                            className={`relative overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${isOpen
                                                ? 'border-[#0F3D2E]/30 shadow-[0_24px_50px_rgba(15,61,46,0.18)]'
                                                : 'border-[#D9E6E0] shadow-sm hover:-translate-y-0.5 hover:border-[#0F3D2E]/30 hover:shadow-[0_14px_30px_rgba(15,61,46,0.12)]'
                                                }`}
                                        >
                                            <span
                                                aria-hidden="true"
                                                className={`absolute left-0 top-0 h-full w-1 transition-all duration-300 ${isOpen ? 'bg-[#E8890C]' : 'bg-transparent'}`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                                                aria-expanded={isOpen}
                                                className="w-full text-left px-5 py-4 sm:py-5 flex items-center gap-4 cursor-pointer"
                                            >
                                                <span className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${isOpen ? 'bg-[#0F3D2E] text-[#E8890C]' : 'bg-[#EAF3EE] text-[#0F3D2E]'}`}>
                                                    <HelpCircle className="w-5 h-5" />
                                                </span>
                                                <span className={`flex-1 font-bold text-sm sm:text-base transition-colors ${isOpen ? 'text-[#E8890C]' : 'text-[#0F3D2E]'}`}>{item.q}</span>
                                                <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen ? 'bg-[#E8890C] text-white rotate-180' : 'bg-[#EAF3EE] text-[#0F3D2E]'}`}>
                                                    <ChevronDown className="w-4 h-4" />
                                                </span>
                                            </button>
                                            <AnimatePresence initial={false}>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <p className="px-5 pb-5 sm:pl-[76px] text-sm sm:text-[15px] text-slate-600 leading-relaxed">{item.a}</p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ───────────── CTA ───────────── */}
                <div className="[&>*]:!py-8 sm:[&>*]:!py-10 [&>*]:!my-0">
                    <CtaSection />
                </div>

                <style>{`@keyframes svcMarquee { from { transform: translateX(0) } to { transform: translateX(-50%) } } @keyframes procFill { from { transform: scaleX(0) } to { transform: scaleX(1) } }`}</style>
            </div>
        </MotionConfig>
    );
}