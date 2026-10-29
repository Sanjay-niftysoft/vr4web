import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import {
    motion, AnimatePresence, MotionConfig, useScroll, useSpring, useMotionValue,
    useTransform, useInView, animate, useReducedMotion,
} from 'framer-motion';
import CtaSection from '../../components/CtaSection';
import IosCapabilities from '../../components/IosCapabilities';
import {
    ChevronRight, ChevronDown, Home, CheckCircle2, ArrowRight, Star, ShieldCheck, Zap,
    Smartphone, Code2, Layout, ShoppingCart, Megaphone, Palette, Headphones,
    Server, Cloud, Database, Lock, Clock, Award, Globe, Layers, Terminal, Activity, Check,
    HelpCircle, TrendingUp, FileText, MessageCircle, Eye, Box, Sliders, DollarSign, Users,
    Search, CheckSquare, Rocket, Cpu, Gauge, Wrench, Network, Bug, PenTool, BarChart3,
    GitBranch, MousePointerClick, Landmark, HeartPulse, Truck, GraduationCap, Plane,
    Building2, Film, Gamepad2, UtensilsCrossed, Factory, Briefcase, Quote,
} from 'lucide-react';
import { getServiceData, getServiceByQuery } from '../../data/servicesdata';

/* ───────────────────────────────────────────────────────────────
   PALETTE  (navy · white · red · yellow)
   NAVY #0B1F4B   RED #D92B1F   YELLOW #FFC62B   Tint border #CFE1FA
   BACKGROUNDS = WHITE / LIGHT BLUE (#EDF7F6) ONLY. Navy is used for
   buttons, icon boxes and small blocks, never as a section background.
   (Exception: the iOS capabilities banner, see IosCapabilities.jsx)
   About W · Features LB · Process W · Why LB · Tech W ·
   Industries LB · Testimonials W · FAQ LB
─────────────────────────────────────────────────────────────── */

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

/* ───────── real technology logos (Devicon SVGs via CDN) ───────── */
const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons';
const TECH_LOGOS = [
    [/react/, 'react'], [/swift|combine|metal|testflight/, 'swift'], [/kotlin/, 'kotlin'],
    [/objective-?c/, 'objectivec'], [/xcode/, 'xcode'], [/android studio/, 'androidstudio'],
    [/android|jetpack/, 'android'], [/\bios\b|apple|uikit/, 'apple'], [/flutter/, 'flutter'],
    [/dart/, 'dart'], [/firebase|crashlytics/, 'firebase'], [/graphql/, 'graphql'],
    [/aws|amazon/, 'amazonwebservices'], [/azure/, 'azure'], [/google cloud|gcp/, 'googlecloud'],
    [/docker/, 'docker'], [/kubernetes|k8s/, 'kubernetes'], [/jenkins/, 'jenkins'],
    [/gitlab/, 'gitlab'], [/github/, 'github'], [/\bgit\b/, 'git'], [/jira/, 'jira'],
    [/figma/, 'figma'], [/node/, 'nodejs'], [/express/, 'express'], [/python/, 'python'],
    [/django/, 'django'], [/laravel/, 'laravel'], [/php/, 'php'], [/typescript/, 'typescript'],
    [/javascript/, 'javascript'], [/\bjava\b/, 'java'], [/next\.?js/, 'nextjs'], [/vue/, 'vuejs'],
    [/angular/, 'angularjs'], [/tailwind/, 'tailwindcss'], [/html/, 'html5'], [/css/, 'css3'],
    [/wordpress/, 'wordpress'], [/postgres/, 'postgresql'], [/mongo/, 'mongodb'], [/mysql/, 'mysql'],
    [/redis/, 'redis'], [/sqlite/, 'sqlite'], [/selenium/, 'selenium'], [/jest/, 'jest'],
    [/postman/, 'postman'], [/swagger|openapi/, 'swagger'], [/terraform/, 'terraform'],
    [/nginx/, 'nginx'], [/unity/, 'unity'], [/c#|csharp|\.net/, 'csharp'], [/ruby/, 'ruby'],
    [/golang|\bgo\b/, 'go'], [/rust/, 'rust'], [/electron/, 'electron'], [/ionic/, 'ionic'],
    [/xamarin/, 'xamarin'], [/redux/, 'redux'], [/grafana/, 'grafana'], [/sentry/, 'sentry'],
];
const logoSlug = (name = '') => {
    const t = name.toLowerCase();
    for (const [re, slug] of TECH_LOGOS) if (re.test(t)) return slug;
    return null;
};

function TechLogo({ name, iconName, idx = 0 }) {
    const slug = logoSlug(name);
    const variants = slug ? [`${slug}-original`, `${slug}-plain`] : [];
    const [v, setV] = useState(0);
    if (!slug || v >= variants.length) {
        const Fallback = smartIcon(iconName, name, idx);
        return <Fallback className="w-8 h-8 text-[#D92B1F]" />;
    }
    return (
        <img
            src={`${DEVICON}/${slug}/${variants[v]}.svg`}
            alt={`${name} logo`}
            loading="lazy"
            onError={() => setV((n) => n + 1)}
            className="w-9 h-9 object-contain"
        />
    );
}

/* ───────── reusable pieces ───────── */

/** Last word(s) of a title in accent colour (red on white, yellow on navy) */
const TitleWords = ({ text, accent = 'text-[#D92B1F]', count = 1 }) => {
    const words = String(text || '').trim().split(/\s+/);
    const n = Math.min(Math.max(count, 1), words.length);
    const tail = words.splice(words.length - n, n).join(' ');
    return <>{words.join(' ')}{words.length ? ' ' : ''}<span className={accent}>{tail}</span></>;
};

const Badge = ({ children, dark = false }) => (
    <span className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold border mb-3 ${
        dark ? 'bg-white/10 text-white border-white/25' : 'bg-white text-[#0B1F4B] border-[#D92B1F]/30'
    }`}>
        <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${dark ? 'bg-[#FFC62B]' : 'bg-[#D92B1F]'}`} />
        {children}
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

const SectionHeading = ({ badge, title, description, dark = false, center = true, accentWords = 1 }) => (
    <Reveal className={`${center ? 'text-center mx-auto' : ''} max-w-3xl mb-8 sm:mb-10`}>
        {badge && <Badge dark={dark}>{badge}</Badge>}
        <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight mb-3 ${dark ? 'text-white' : 'text-[#0B1F4B]'}`}>
            <TitleWords text={title} count={accentWords} accent={dark ? 'text-[#FFC62B]' : 'text-[#D92B1F]'} />
        </h2>
        <span className={`block h-1 w-16 rounded-full ${dark ? 'bg-[#FFC62B]' : 'bg-[#D92B1F]'} ${center ? 'mx-auto' : ''} mb-4`} />
        {description && <p className={`text-sm sm:text-base leading-relaxed ${dark ? 'text-white' : 'text-black'}`}>{description}</p>}
    </Reveal>
);

const SplitHeading = ({ badge, title, dark = false }) => (
    <>
        <Badge dark={dark}>{badge}</Badge>
        <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4 leading-tight ${dark ? 'text-white' : 'text-[#0B1F4B]'}`}>
            <TitleWords text={title} accent={dark ? 'text-[#FFC62B]' : 'text-[#D92B1F]'} />
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
const ZoomImage = ({ src, alt, className = '' }) => (
    <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110 ${className}`}
    />
);

const DotGrid = ({ className = '', dark = false }) => (
    <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 [background-size:22px_22px] ${
            dark
                ? '[background-image:radial-gradient(rgba(255,255,255,0.10)_1px,transparent_1px)]'
                : '[background-image:radial-gradient(rgba(217,43,31,0.14)_1px,transparent_1px)]'
        } ${className}`}
    />
);

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
        window.scrollTo({ top: 0, behavior: 'smooth' });
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

    /* iOS page gets the redesigned capabilities + delivery framework styling.
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
    const step = steps[activeStep] || steps[0] || {};
    const ActiveStepIcon = stepIcon(step.title, activeStep);
    const nextStep = steps[activeStep + 1];

    /* "…Delivery Framework" → highlight both words on the iOS page */
    const processAccentWords = isIos && /delivery framework\s*$/i.test(processData.title || '') ? 2 : 1;

    return (
        <MotionConfig reducedMotion="user">
            <div className="w-full min-h-screen bg-white font-sans text-black selection:bg-[#FFC62B] selection:text-[#0B1F4B] overflow-x-hidden">
                <motion.div
                    style={{ scaleX: progress }}
                    className="fixed top-0 left-0 right-0 h-1 origin-left bg-[#D92B1F] z-[70]"
                />

                {/* ───────────── 1. HERO (NAVY) ───────────── */}
                <section className="relative w-full overflow-hidden mt-[68px] sm:mt-[76px] lg:mt-[82px] xl:mt-[88px] min-h-[370px] sm:h-[390px] lg:h-[410px] flex items-center justify-center bg-[#0B1F4B]">
                    <motion.img
                        src={hero.bgImage || '/banner/5.png'}
                        alt={currentTitle}
                        loading="eager"
                        initial={{ scale: 1 }}
                        animate={{ scale: 1.12 }}
                        transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                        className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
                    />
                    {/* single plain navy layer for text legibility (no orbs / colour smoke) */}
                    <div className="absolute inset-0 bg-[#0B1F4B]/60" />

                    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6 flex flex-col items-center text-center">
                        <motion.div
                            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
                            className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-white bg-[#0B1F4B]/75 px-3.5 py-1.5 rounded-full backdrop-blur-md border border-white/25 mb-3"
                        >
                            <Link to="/" className="flex items-center gap-1 hover:text-[#FFC62B] transition-colors"><Home className="w-3 h-3" /><span>Home</span></Link>
                            <ChevronRight className="w-3 h-3 text-white/60" />
                            <Link to="/services" className="hover:text-[#FFC62B] transition-colors">Services</Link>
                            <ChevronRight className="w-3 h-3 text-white/60" />
                            <Link to={`/services/${activeCatSlug}`} className={`hover:text-[#FFC62B] transition-colors ${!isSubService ? 'font-bold text-[#FFC62B]' : ''}`}>{categoryName}</Link>
                            {isSubService && (
                                <>
                                    <ChevronRight className="w-3 h-3 text-white/60" />
                                    <span className="font-extrabold truncate max-w-[200px] sm:max-w-none">{subServiceName}</span>
                                </>
                            )}
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[46px] font-extrabold tracking-tight leading-tight mb-2 text-white drop-shadow-[0_2px_12px_rgba(11,31,75,0.8)]"
                        >
                            <TitleWords text={currentTitle || 'Our Services'} accent="text-[#FFC62B]" />
                        </motion.h1>
                        <motion.span
                            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: 0.4 }}
                            className="block h-1 w-20 origin-center rounded-full bg-[#D92B1F] mb-3"
                        />
                        <motion.p
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}
                            className="text-white text-xs sm:text-[15px] leading-relaxed max-w-2xl mb-6 line-clamp-2 drop-shadow-[0_1px_4px_rgba(11,31,75,0.7)]"
                        >
                            {reducedDescription}
                        </motion.p>

                        {/* rectangular buttons with rounded corners */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}
                            className="flex flex-wrap items-center justify-center gap-3"
                        >
                            <Link
                                to="/contact"
                                className="group relative overflow-hidden inline-flex items-center gap-2 bg-[#FFC62B] hover:bg-[#FFD454] text-[#0B1F4B] text-xs sm:text-sm font-extrabold px-6 py-3 rounded-lg shadow-md hover:-translate-y-0.5 transition-all duration-200"
                            >
                                <span className="absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/50 group-hover:left-[130%] transition-all duration-700" />
                                <span className="relative">{hero.ctaPrimary || 'Get a Quote'}</span>
                                <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <a
                                href="#features-section"
                                className="inline-flex items-center gap-1.5 bg-transparent hover:bg-[#D92B1F] hover:border-[#D92B1F] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-lg border-2 border-white/70 transition-all duration-200"
                            >
                                {hero.ctaSecondary || 'Explore Capabilities'}
                            </a>
                        </motion.div>
                    </div>
                </section>

                {/* ───────────── SUB-SERVICE NAV (NAVY) ───────────── */}
                <nav aria-label="Services Navigation" className="w-full bg-white border-b border-[#CFE1FA] sticky top-[68px] sm:top-[76px] lg:top-[82px] xl:top-[88px] z-30 shadow-md">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-2 overflow-x-auto py-2.5 text-xs [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            <span className="text-[#D92B1F] font-bold uppercase tracking-wider text-[11px] mr-1 hidden sm:inline-block flex-shrink-0">Subservices:</span>
                            <Link
                                to={`/services/${activeCatSlug}`}
                                className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all flex-shrink-0 ${!isSubService ? 'bg-[#0B1F4B] text-white font-bold shadow-sm' : 'text-[#0B1F4B] hover:bg-[#EDF7F6]'}`}
                            >
                                Overview ({categoryName})
                            </Link>
                            {subServicesList.map((sub) => (
                                <Link
                                    key={sub.slug}
                                    to={`/services/${activeCatSlug}/${sub.slug}`}
                                    className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all flex-shrink-0 ${activeSubSlug === sub.slug ? 'bg-[#0B1F4B] text-white font-bold shadow-sm' : 'text-[#0B1F4B] hover:bg-[#EDF7F6]'}`}
                                >
                                    {sub.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </nav>

                {/* ───────────── 2. ABOUT (WHITE) ───────────── */}
                <section className="relative py-10 sm:py-14 overflow-hidden bg-white">
                    <DotGrid className="opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
                        <div className="lg:col-span-7 flex flex-col justify-center">
                            <Reveal>
                                <SplitHeading badge={about.badge} title={about.title} />
                                <p className="text-black text-sm sm:text-base leading-relaxed mb-4">{about.description}</p>
                                {about.descriptionSecondary && (
                                    <p className="text-black text-sm sm:text-[15px] leading-relaxed mb-5">{about.descriptionSecondary}</p>
                                )}
                            </Reveal>

                            {about.highlights?.length > 0 && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
                                    {about.highlights.map((h, idx) => (
                                        <Reveal key={idx} delay={idx * 0.07} y={16}>
                                            <div className="h-full p-4 rounded-xl bg-white border border-[#CFE1FA] border-l-4 border-l-[#D92B1F] shadow-sm hover:shadow-[0_10px_28px_rgba(217,43,31,0.18)] hover:-translate-y-1 hover:border-l-[#FFC62B] transition-all duration-300">
                                                <div className="flex items-start gap-2.5">
                                                    <div className="w-6 h-6 rounded-full bg-[#FFC62B] text-[#0B1F4B] flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-bold text-[#0B1F4B] leading-snug">{h.title}</h4>
                                                        <p className="text-xs text-black mt-0.5 leading-snug">{h.desc}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Reveal>
                                    ))}
                                </div>
                            )}

                            {about.stats?.length > 0 && (
                                <div className="grid grid-cols-3 gap-3 rounded-2xl bg-[#0B1F4B] p-5 sm:p-6 shadow-[0_16px_40px_rgba(11,31,75,0.25)] border-b-4 border-[#D92B1F]">
                                    {about.stats.map((st, idx) => (
                                        <div key={idx} className="text-center">
                                            <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#FFC62B] tracking-tight"><CountUp value={st.value} /></p>
                                            <p className="text-xs sm:text-sm text-white font-semibold mt-0.5">{st.label}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Reveal className="lg:col-span-5" y={30}>
                            <TiltCard max={5} className="min-h-[380px]">
                                <div className="group relative h-full min-h-[380px] rounded-3xl overflow-hidden shadow-[0_24px_60px_rgba(11,31,75,0.28)] border-4 border-white ring-1 ring-[#CFE1FA]">
                                    <ZoomImage src={about.image} alt={currentTitle} />
                                    <motion.div
                                        animate={{ y: [0, -6, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                                        className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg"
                                        style={{ transform: 'translateZ(40px)' }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-[#FFC62B] text-[#0B1F4B] flex items-center justify-center shadow-md"><Award className="w-5 h-5" /></div>
                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-wider text-[#D92B1F]">VR4Web Assurance</p>
                                                <p className="text-sm font-extrabold text-[#0B1F4B]">100% Quality &amp; SLA Guaranteed</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </TiltCard>
                        </Reveal>
                    </div>
                </section>

                {/* ───────────── 3. FEATURES / CAPABILITIES ───────────── */}
                {isIos ? (
                    <IosCapabilities features={features} resolveIcon={smartIcon} />
                ) : (
                    <section id="features-section" className="relative py-10 sm:py-14 bg-[#EDF7F6] overflow-hidden scroll-mt-32">
                        <DotGrid className="opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
                        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <SectionHeading badge={features.badge} title={features.title} description={features.description} />

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-6">
                                {features.items.map((item, idx) => {
                                    const ItemIcon = smartIcon(item.iconName, `${item.title} ${item.badge || ''}`, idx);
                                    const total = features.items.length;
                                    const lone = idx === total - 1 && total % 2 === 1;
                                    const wide = idx % 4 === 0 || idx % 4 === 3;
                                    const span = lone ? 'lg:col-span-12' : wide ? 'lg:col-span-7' : 'lg:col-span-5';
                                    return (
                                        <Reveal key={idx} delay={idx * 0.07} className={`${span} ${lone ? 'md:col-span-2' : ''}`}>
                                            <div className="group relative h-full overflow-hidden flex flex-col rounded-3xl bg-white border border-[#CFE1FA] p-6 sm:p-8 shadow-[0_10px_30px_rgba(11,31,75,0.07)] hover:shadow-[0_22px_50px_rgba(11,31,75,0.16)] hover:-translate-y-1.5 hover:border-[#0B1F4B] transition-all duration-300">
                                                {/* large faded icon watermark */}
                                                <ItemIcon aria-hidden="true" className="absolute -right-6 -bottom-6 w-44 h-44 text-[#0B1F4B]/[0.05] group-hover:rotate-6 group-hover:scale-110 transition-transform duration-500" />
                                                {/* accent edge */}
                                                <span className="absolute left-0 top-6 bottom-6 w-1.5 rounded-r-full bg-gradient-to-b from-[#D92B1F] to-[#FFC62B]" />

                                                <div className="relative flex items-start justify-between gap-4 mb-5">
                                                    <span className="w-14 h-14 rounded-2xl bg-[#0B1F4B] group-hover:bg-[#D92B1F] flex items-center justify-center shadow-md transition-colors duration-300">
                                                        <ItemIcon className="w-7 h-7 text-[#FFC62B]" />
                                                    </span>
                                                    {item.badge && <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#FFC62B] text-[#0B1F4B]">{item.badge}</span>}
                                                </div>

                                                <h3 className="relative text-xl font-extrabold text-[#0B1F4B] mb-2 leading-snug">{item.title}</h3>
                                                <p className="relative text-sm sm:text-[15px] text-black leading-relaxed mb-5">{item.description}</p>

                                                {item.points?.length > 0 && (
                                                    <div className="relative mt-auto flex flex-wrap gap-2">
                                                        {item.points.map((pt, p) => (
                                                            <span key={p} className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B1F4B] bg-[#EDF7F6] border border-[#CFE1FA] rounded-full px-3 py-1.5">
                                                                <CheckCircle2 className="w-3.5 h-3.5 text-[#D92B1F] flex-shrink-0" />
                                                                {pt}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </Reveal>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}

                {/* ───────────── 4. PROCESS / DELIVERY FRAMEWORK (WHITE) — click-to-view tabs ───────────── */}
                <section className={`relative overflow-hidden bg-white ${isIos ? 'pt-14 pb-10 sm:pt-20 sm:pb-14' : 'py-10 sm:py-14'}`}>
                    <DotGrid className="opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
                    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <SectionHeading
                            badge={isIos ? 'DEVELOPMENT APPROACH' : processData.badge}
                            title={processData.title}
                            description={processData.description}
                            accentWords={processAccentWords}
                        />

                        {/* step names in a row */}
                        <div className="flex flex-wrap lg:flex-nowrap gap-2.5">
                            {steps.map((st, idx) => {
                                const TabIcon = stepIcon(st.title, idx);
                                const active = activeStep === idx;
                                return (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => setActiveStep(idx)}
                                        aria-pressed={active}
                                        className={`flex-1 min-w-[46%] lg:min-w-0 flex items-center gap-2.5 text-left px-3.5 py-3 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                                            active
                                                ? 'bg-[#D92B1F] text-white border-[#D92B1F] shadow-[0_10px_24px_rgba(217,43,31,0.35)] -translate-y-0.5'
                                                : 'bg-white text-[#0B1F4B] border-[#CFE1FA] hover:border-[#D92B1F]'
                                        }`}
                                    >
                                        <span className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${active ? 'bg-white/20 text-white' : 'bg-[#FFF6D9] text-[#D92B1F]'}`}>
                                            <TabIcon className="w-[18px] h-[18px]" />
                                        </span>
                                        <span className="text-xs sm:text-[13px] font-bold leading-snug">{st.title}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* details of the selected step */}
                        <div className="mt-5 rounded-2xl overflow-hidden bg-white border border-[#CFE1FA] shadow-[0_14px_40px_rgba(11,31,75,0.1)]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeStep}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.25 }}
                                    className="grid grid-cols-1 md:grid-cols-5"
                                >
                                    <div className="md:col-span-3 p-6 sm:p-8 flex flex-col justify-center">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="w-12 h-12 rounded-xl bg-[#D92B1F] text-white flex items-center justify-center flex-shrink-0 shadow-[0_6px_16px_rgba(217,43,31,0.35)]">
                                                <ActiveStepIcon className="w-6 h-6" />
                                            </span>
                                            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1F4B] leading-tight">{step.title}</h3>
                                        </div>
                                        <p className="text-sm sm:text-base text-black leading-relaxed mb-5">{step.description}</p>
                                        <button
                                            type="button"
                                            onClick={() => setActiveStep(nextStep ? activeStep + 1 : 0)}
                                            className="group inline-flex items-center gap-2 self-start text-sm font-bold text-[#D92B1F] cursor-pointer"
                                        >
                                            {nextStep ? `Next: ${nextStep.title}` : 'Start over'}
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>

                                    <div className="md:col-span-2 bg-[#0B1F4B] border-t-4 md:border-t-0 md:border-l-4 border-[#D92B1F] p-6 sm:p-8 flex flex-col justify-center">
                                        <span className="w-11 h-11 rounded-full bg-[#FFC62B] text-[#0B1F4B] flex items-center justify-center mb-4">
                                            <CheckCircle2 className="w-6 h-6" />
                                        </span>
                                        <p className="text-[11px] uppercase font-bold tracking-wider text-[#FFC62B] mb-1.5">Deliverable</p>
                                        <p className="text-base sm:text-lg font-bold text-white leading-snug">{step.deliverables}</p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </section>

                {/* ───────────── 5. WHY CHOOSE US (LIGHT BLUE) ───────────── */}
                <section className="relative py-10 sm:py-14 overflow-hidden bg-[#EDF7F6]">
                    <DotGrid className="opacity-70 [mask-image:linear-gradient(to_top,black,transparent_75%)]" />
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
                        <Reveal className="lg:col-span-5 order-2 lg:order-1" y={30}>
                            <TiltCard max={5} className="min-h-[400px]">
                                <div className="group relative h-full min-h-[400px] rounded-3xl overflow-hidden shadow-[0_24px_60px_rgba(11,31,75,0.22)] border-4 border-white ring-1 ring-[#CFE1FA]">
                                    <ZoomImage src={whyChooseUs.image} alt="Why Choose VR4Web" />
                                    <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-[#0B1F4B]/95 backdrop-blur-md border border-[#D92B1F]/60 text-white" style={{ transform: 'translateZ(40px)' }}>
                                        <p className="text-xs font-bold text-[#FFC62B] uppercase tracking-wider mb-2">Enterprise Commitment</p>
                                        <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                                            {whyChooseUs.guarantees?.map((g, i) => (
                                                <div key={i} className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#FFC62B]" strokeWidth={3} /><span className="truncate">{g}</span></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </TiltCard>
                        </Reveal>

                        <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-center">
                            <Reveal>
                                <SplitHeading badge={whyChooseUs.badge} title={whyChooseUs.title} />
                                <p className="text-black text-sm sm:text-base leading-relaxed mb-6">{whyChooseUs.description}</p>
                            </Reveal>
                            <div className="space-y-3.5">
                                {whyChooseUs.reasons.map((r, idx) => {
                                    const ReasonIcon = smartIcon(r.iconName, r.title, idx);
                                    return (
                                        <Reveal key={idx} delay={idx * 0.08} y={18}>
                                            <div className="group p-4 rounded-2xl bg-white border border-[#CFE1FA] shadow-sm hover:shadow-[0_14px_34px_rgba(217,43,31,0.2)] hover:border-[#D92B1F] hover:translate-x-2 transition-all duration-300 flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D92B1F] to-[#0B1F4B] flex items-center justify-center flex-shrink-0 shadow-md group-hover:rotate-6 transition-transform">
                                                    <ReasonIcon className="w-6 h-6 text-[#FFC62B]" />
                                                </div>
                                                <div>
                                                    <h4 className="text-base font-bold text-[#0B1F4B] mb-0.5">{r.title}</h4>
                                                    <p className="text-sm text-black leading-relaxed">{r.description}</p>
                                                </div>
                                            </div>
                                        </Reveal>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ───────────── 6. TECH STACK (WHITE) — real logos ───────────── */}
                <section className="relative py-10 sm:py-14 bg-white overflow-hidden">
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
                                        className={`relative px-5 py-2 rounded-full text-xs sm:text-sm font-bold cursor-pointer transition-colors ${active ? 'text-white' : 'text-[#0B1F4B] bg-white border border-[#CFE1FA] hover:border-[#D92B1F]'}`}
                                    >
                                        {active && <motion.span layoutId="techPill" className="absolute inset-0 rounded-full bg-[#D92B1F] shadow-md" transition={{ type: 'spring', stiffness: 350, damping: 30 }} />}
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
                                        <div className="group h-full bg-white rounded-2xl p-5 border border-[#CFE1FA] shadow-sm hover:shadow-[0_18px_40px_rgba(217,43,31,0.2)] hover:border-[#D92B1F] transition-all flex flex-col items-center text-center">
                                            <div className="w-14 h-14 rounded-2xl bg-[#F4F7FC] border border-[#E3ECF8] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform" style={{ transform: 'translateZ(30px)' }}>
                                                <TechLogo name={tech.name} iconName={tech.iconName} idx={idx} />
                                            </div>
                                            <h4 className="text-sm sm:text-base font-bold text-[#0B1F4B] mb-0.5">{tech.name}</h4>
                                            <p className="text-xs text-black font-medium">{tech.type}</p>
                                        </div>
                                    </TiltCard>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ───────────── 7. INDUSTRIES (LIGHT BLUE) — auto-scrolling marquee ───────────── */}
                <section className="relative py-10 sm:py-14 overflow-hidden bg-[#EDF7F6]">
                    <DotGrid className="opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
                    <div className="relative">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <SectionHeading badge={industries.badge} title={industries.title} description={industries.description} />
                        </div>

                        {/* no edge fade — cards scroll straight across */}
                        <div className="overflow-hidden">
                            <div className="flex w-max py-3 animate-[svcMarquee_45s_linear_infinite] motion-reduce:animate-none hover:[animation-play-state:paused]">
                                {[0, 1].map((dup) => (
                                    <div key={dup} className="flex shrink-0" aria-hidden={dup === 1 ? 'true' : undefined}>
                                        {[...industries.list, ...industries.list].map((ind, idx) => {
                                            const IndIcon = industryIcon(ind.name);
                                            return (
                                                <article
                                                    key={`${dup}-${idx}`}
                                                    className="group w-[285px] sm:w-[330px] mr-5 flex-shrink-0 flex flex-col overflow-hidden rounded-2xl bg-white border border-[#CFE1FA] shadow-[0_16px_38px_rgba(11,31,75,0.14)] hover:-translate-y-2 hover:shadow-[0_22px_48px_rgba(255,198,43,0.35)] transition-all duration-300"
                                                >
                                                    {/* coloured header: icon + industry name */}
                                                    <header className="relative overflow-hidden bg-gradient-to-br from-[#FFC62B] to-[#FFD966] px-5 py-5">
                                                        <IndIcon aria-hidden="true" className="absolute -right-3 -bottom-4 w-24 h-24 text-[#0B1F4B]/10 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500" />
                                                        <span className="relative inline-flex w-12 h-12 rounded-xl bg-[#0B1F4B] items-center justify-center mb-3 shadow-md">
                                                            <IndIcon className="w-6 h-6 text-[#FFC62B]" />
                                                        </span>
                                                        <h3 className="relative text-lg sm:text-xl font-extrabold text-[#0B1F4B] leading-tight pr-10">{ind.name}</h3>
                                                    </header>

                                                    {/* description */}
                                                    <div className="px-5 pt-4 pb-3">
                                                        <p className="text-sm sm:text-[15px] text-[#1a1a1a] leading-relaxed">{ind.description}</p>
                                                    </div>

                                                    {/* typical project */}
                                                    <footer className="mt-auto mx-4 mb-4 rounded-xl bg-[#0B1F4B] px-4 py-3.5">
                                                        <div className="flex items-center gap-2 mb-1.5">
                                                            <Quote className="w-4 h-4 text-[#FFC62B] fill-[#FFC62B]" />
                                                            <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#FFC62B]">Typical project</span>
                                                        </div>
                                                        <p className="text-sm font-semibold text-white leading-snug">{ind.useCase}</p>
                                                    </footer>
                                                </article>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ───────────── 9. FAQ (LIGHT BLUE) ───────────── */}
                <section className="relative py-10 sm:py-14 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#EDF7F6]">
                    <DotGrid className="opacity-70 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
                    <div className="relative max-w-4xl mx-auto">
                        <SectionHeading badge={faqs.badge} title={faqs.title} description={faqs.description} />
                        <div className="space-y-3">
                            {faqs.items.map((item, idx) => {
                                const isOpen = openFaqIndex === idx;
                                return (
                                    <Reveal key={idx} delay={idx * 0.05} y={14}>
                                        <div className={`bg-white rounded-2xl border overflow-hidden transition-all duration-300 ${isOpen ? 'border-[#D92B1F] shadow-[0_14px_34px_rgba(217,43,31,0.3)]' : 'border-[#CFE1FA] shadow-sm hover:border-[#D92B1F]'}`}>
                                            <button
                                                type="button"
                                                onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                                                aria-expanded={isOpen}
                                                className={`w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base cursor-pointer transition-colors ${isOpen ? 'text-[#D92B1F]' : 'text-[#0B1F4B] hover:text-[#D92B1F]'}`}
                                            >
                                                <span>{item.q}</span>
                                                <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen ? 'bg-[#D92B1F] text-white rotate-180' : 'bg-[#FFC62B] text-[#0B1F4B]'}`}>
                                                    <ChevronDown className="w-4 h-4" />
                                                </span>
                                            </button>
                                            <AnimatePresence initial={false}>
                                                {isOpen && (
                                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }}>
                                                        <div className="px-5 pb-5 pt-3 text-sm text-black leading-relaxed border-t border-[#CFE1FA]">{item.a}</div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </Reveal>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ───────────── CTA ───────────── */}
                <div className="[&>*]:!py-8 sm:[&>*]:!py-10 [&>*]:!my-0">
                    <CtaSection />
                </div>

                <style>{`@keyframes svcMarquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
            </div>
        </MotionConfig>
    );
}