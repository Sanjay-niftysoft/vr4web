import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  ArrowUpRight,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  MessageSquare,
  TrendingUp,
  FileText,
  Share2,
  Shield,
  Link2,
  Target,
  Globe,
  Building2,
  ShieldCheck,
  Lock,
  Sparkles,
} from 'lucide-react';
import PageBanner from '../../components/common/PageBanner';
import CtaSection from '../../components/CtaSection';

// ─────────────────────────────────────────────────────────────────────────────
// PARTNERS SECTION BACKGROUND PHOTO (Sydney, same as the About / Collaboration look)
// To change the photo, replace the two links below.
// ─────────────────────────────────────────────────────────────────────────────
const PARTNERS_BG = 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=1800';
const PARTNERS_BG_FALLBACK = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1800';

/* If an image link fails, swap in the fallback once */
const imgFallback = (fallback) => (e) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = fallback;
};

// ─────────────────────────────────────────────────────────────────────────────
// BRAND LOGO RENDERER
// ─────────────────────────────────────────────────────────────────────────────

function BrandLogo({ logo, name, className = 'h-14 w-auto' }) {
  if (typeof logo === 'string') {
    return (
      <div className="inline-flex items-center gap-2.5">
        <img
          src={logo}
          alt={name}
          className={`${className} object-contain select-none`}
          loading="lazy"
        />
        {name === 'Content Consult' && (
          <div className="flex flex-col leading-tight select-none">
            <span className="text-[11.5px] font-black tracking-tight text-[#0F3D2E] uppercase">Content</span>
            <span className="text-[12px] font-black tracking-tight text-[#E8890C] uppercase">Consult</span>
          </div>
        )}
      </div>
    );
  }
  const LogoComponent = logo;
  return <LogoComponent className={className} />;
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const BRANDS_DATA = [
  {
    id: 'niftyweblinks',
    name: 'NIFTY WEB LINKS',
    domain: 'niftyweblinks.com',
    url: 'https://niftyweblinks.com',
    desc: 'Global Web Directory & Link Building Solutions',
    fullDesc:
      'Curated global web directory, high-authority link outreach, and search visibility architecture engineered to elevate domain authority.',
    tags: ['Web Directory', 'Link Outreach', 'Domain Authority'],
    stats: 'High Authority',
    logo: '/logo-2/niftyweblinks.png',
    accent: '#E8890C',
    tint: 'rgba(232,137,12,0.10)',
    glow: 'rgba(232,137,12,0.35)',
  },
  {
    id: 'lowcostwebdesign',
    name: 'LOW COST WEB DESIGN',
    domain: 'lowcostwebdesign.in',
    url: 'https://lowcostwebdesign.in',
    desc: 'Affordable & Professional Web Design Services',
    fullDesc:
      'Cost-effective, modern, and mobile-first website solutions designed to help startups and local businesses build an exceptional online presence.',
    tags: ['Affordable Web', 'Mobile First', 'CMS Setup'],
    stats: '500+ Projects',
    logo: '/logo/lcwd.png',
    accent: '#0F3D2E',
    tint: 'rgba(15,61,46,0.10)',
    glow: 'rgba(15,61,46,0.35)',
  },
  {
    id: '100dollarwebdesign',
    name: '100 DOLLAR WEBSITE DESIGN',
    domain: 'a100dollarwebsitedesign.com',
    url: 'https://a100dollarwebsitedesign.com/',
    desc: 'Flat-Rate $100 Starter Website Packages',
    fullDesc:
      'High-impact, budget-friendly starter websites engineered for startups, freelancers, and small businesses looking for an immediate online presence at just $100.',
    tags: ['$100 Web Design', 'Mobile-Ready', 'Rapid 48h Launch'],
    stats: 'Flat $100 Package',
    logo: '/logo/100dollar.svg',
    accent: '#E8890C',
    tint: 'rgba(232,137,12,0.10)',
    glow: 'rgba(232,137,12,0.35)',
  },
  {
    id: 'businessmailsolutions',
    name: 'BUSINESS MAIL SOLUTIONS',
    domain: 'businessmailsolutions.in',
    url: 'https://businessmailsolutions.in',
    desc: 'Reliable Business Email Solutions',
    fullDesc:
      'High-security corporate email hosting with zero spam tolerance, automated daily backups, and 99.9% uptime SLA.',
    tags: ['Corporate Email', 'Spam Guard', '99.9% Uptime'],
    stats: 'Zero Data Loss',
    logo: '/logo/email.png',
    accent: '#E8890C',
    tint: 'rgba(232,137,12,0.09)',
    glow: 'rgba(232,137,12,0.32)',
  },
  {
    id: 'networkcare',
    name: 'NETWORK CARE',
    domain: 'networkcare.in',
    url: 'https://networkcare.in',
    desc: 'IT & Network Support Services',
    fullDesc:
      'Comprehensive enterprise IT infrastructure management, cyber security monitoring, firewall governance, and remote tech assistance.',
    tags: ['Server Care', 'Network Security', '24/7 Monitoring'],
    stats: '< 15m Response',
    logo: '/logo/networkcare.png',
    accent: '#0F3D2E',
    tint: 'rgba(15,61,46,0.10)',
    glow: 'rgba(15,61,46,0.38)',
  },
];

const PARTNERS_DATA = [
  {
    id: 'chatsupport',
    name: 'Chat Support',
    domain: 'chatsupport.in',
    url: 'https://chatsupport.in',
    icon: MessageSquare,
    desc: 'Live Chat & Customer Support',
    fullDesc:
      'Omnichannel live chat agents and AI-augmented conversational support to convert visitors and delight existing customers 24/7.',
    badge: 'Customer Care',
    tags: ['24/7 Live Chat', 'Helpdesk Agents', 'AI Escalation'],
    points: ['Trained agents reply to your visitors in real time', 'AI answers routine questions and hands the rest to a person', 'Chat history shows what customers ask most'],
    logo: '/partners/chatbot.png',
    banner: '/PARTERNS-BANNER/CHATBOT.png',
  },
  {
    id: 'leadseo',
    name: 'Lead SEO',
    domain: 'leadseo.in',
    url: 'https://leadseo.com',
    icon: TrendingUp,
    desc: 'Lead Generation & SEO Services',
    fullDesc:
      'Strategic organic search dominance and performance lead funnels that capture high-intent buyers and skyrocket conversion rates.',
    badge: 'Search & Leads',
    tags: ['Technical SEO', 'Lead Gen Funnels', 'Keyword Growth'],
    points: ['Site audits that find what holds your rankings back', 'Keywords chosen around what buyers actually search', 'Reports that track leads, not just traffic'],
    logo: '/logo-2/leadseo.png',
    banner: '/PARTERNS-BANNER/LEADSEO.png',
  },
  {
    id: 'contentconsult',
    name: 'Content Consult',
    domain: 'contentconsult.in',
    url: 'https://contentconsult.in',
    icon: FileText,
    desc: 'Content Strategy & Content Marketing',
    fullDesc:
      'High-impact copywriting, editorial strategy, and multi-channel content pipelines crafted to establish thought leadership and rank on Google.',
    badge: 'Content Strategy',
    tags: ['Brand Voice', 'Editorial Content', 'SEO Copywriting'],
    points: ['Articles and pages written for your audience', 'An editorial calendar built around your goals', 'Copy that reads well and ranks'],
    logo: '/logo-2/content.png',
    banner: '/PARTERNS-BANNER/CONSUILT.png',
  },
  {
    id: 'smmconsult',
    name: 'SMM Consult',
    domain: 'smmconsult.com',
    url: 'https://smmconsult.com',
    icon: Share2,
    desc: 'Social Media Marketing Solutions',
    fullDesc:
      'Full-service social media campaigns, viral short-form creative production, and community management across Instagram, LinkedIn, and Meta.',
    badge: 'Social Media',
    tags: ['Viral Campaigns', 'Paid Social', 'Audience Building'],
    points: ['Posts and short videos made for each platform', 'Paid campaigns aimed at the right audience', 'Comments and messages handled for you'],
    logo: '/partners/smm.png',
    banner: '/PARTERNS-BANNER/SMM.png',
  },
  {
    id: 'ormconsult',
    name: 'ORM Consult',
    domain: 'ormconsult.com',
    url: 'https://ormconsult.com',
    icon: Shield,
    desc: 'Online Reputation Management',
    fullDesc:
      'Proactive brand protection, corporate review moderation, crisis PR management, and search result suppression for executive reputations.',
    badge: 'Brand Protection',
    tags: ['Review Shield', 'Executive PR', 'Sentiment Recovery'],
    points: ['Reviews and mentions monitored as they appear', 'Professional replies to negative feedback', 'Positive content pushed higher in search results'],
    logo: '/partners/orm.png',
    banner: '/PARTERNS-BANNER/orm.png',
  },
  {
    id: 'seoad',
    name: 'SEO AD',
    domain: 'seoad.in',
    url: 'https://seoad.in',
    icon: Target,
    desc: 'SEO & Online Advertising',
    fullDesc:
      'Precision pay-per-click management across Google Search, Display, and Retargeting engineered for maximal ROAS and lowest CPA.',
    badge: 'Performance Ads',
    tags: ['Google Ads', 'PPC Optimization', 'Conversion Tracking'],
    points: ['Campaigns set up on Google Search and Display', 'Retargeting that brings past visitors back', 'Conversion tracking that shows what each click earns'],
    logo: '/partners/seoad.png',
    banner: '/PARTERNS-BANNER/seoad.png',
  },
];

const FAQS_DATA = [
  {
    id: 'faq-1',
    question: 'What is the difference between your brands and partners?',
    answer:
      'Our brands are businesses owned and operated by our group, delivering core services like web development, business email, IT support and digital solutions. Our partners are specialist companies we work closely with, bringing deep domain expertise in areas like SEO, content, social media, lead generation and more.',
  },
  {
    id: 'faq-2',
    question: 'How do these businesses work together?',
    answer:
      'Our brands and partners operate within a single, seamlessly connected ecosystem. When you partner with us, you receive a dedicated account strategist who coordinates across relevant specialists. This ensures unified execution, shared data insights, and consistent quality without the administrative burden of managing multiple isolated agencies.',
  },
  {
    id: 'faq-3',
    question: 'Can I choose services from multiple brands?',
    answer:
      'Yes, absolutely! You have complete flexibility to select individual standalone services or mix-and-match capabilities across our brands and partners into an integrated package tailored to your exact business goals, budget, and growth roadmap.',
  },
  {
    id: 'faq-4',
    question: 'Who should I contact for the right solution?',
    answer:
      'You can reach out through any specific brand website or submit an inquiry through our central contact portal. Our consulting team will evaluate your needs, conduct a complimentary scoping consultation, and connect you directly with the appropriate specialists within our network.',
  },
  {
    id: 'faq-5',
    question: 'Are your partner services available globally?',
    answer:
      'Yes, both our in-house brands and strategic partner network operate internationally, serving clients across Australia, New Zealand, the United Kingdom, the United States, India, and worldwide with 24/7 dedicated support and localized domain expertise.',
  },
  {
    id: 'faq-6',
    question: 'How do you guarantee consistent quality across all partners?',
    answer:
      'Every partner organization undergoes strict verification covering delivery excellence, cybersecurity compliance, and ongoing performance KPIs. We uphold unified Service Level Agreements (SLAs) and centralized project governance so your standards are never compromised.',
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

// ─────────────────────────────────────────────────────────────────────────────
// SHARED STYLES (marquee + drifting blobs)
// ─────────────────────────────────────────────────────────────────────────────

function PageStyles() {
  return (
    <style>{`
      @keyframes bp-marquee { to { transform: translateX(-50%); } }
      @keyframes bp-drift   { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(40px,-30px) scale(1.12); } }
      @keyframes bp-pulse   { 0% { transform: scale(1); opacity: .6; } 100% { transform: scale(2.6); opacity: 0; } }
      @keyframes bp-dot     { 0%,80%,100% { transform: translateY(0); opacity: .4; } 40% { transform: translateY(-5px); opacity: 1; } }
      .bp-marquee { animation: bp-marquee 38s linear infinite; }
      .bp-marquee:hover { animation-play-state: paused; }
      .bp-drift   { animation: bp-drift 14s ease-in-out infinite; }
      .bp-pulse   { animation: bp-pulse 1.8s ease-out infinite; }
      .bp-dot     { animation: bp-dot 1s ease-in-out infinite; }
      @media (prefers-reduced-motion: reduce) {
        .bp-marquee, .bp-drift, .bp-pulse, .bp-dot { animation: none; }
      }
    `}</style>
  );
}

/* `compact` = smaller heading and tighter spacing (used by the Partners section) */
function SectionHeading({ title, sub, text, light = false, align = 'center', compact = false }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={stagger}
      style={light ? { textShadow: '0 2px 10px rgba(0,0,0,0.45)' } : undefined}
      className={`max-w-[780px] ${compact ? 'mb-5 sm:mb-6' : 'mb-8 sm:mb-10'} ${align === 'center' ? 'mx-auto text-center' : ''
        }`}
    >
      <motion.h2
        variants={fadeInUp}
        className={`font-black tracking-tight leading-[1.05] ${compact ? 'text-3xl sm:text-4xl lg:text-[44px]' : 'text-4xl sm:text-5xl lg:text-[56px]'
          } ${light ? 'text-white' : 'text-[#0F3D2E]'}`}
      >
        {title}
      </motion.h2>
      <motion.div
        variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.7, ease: 'easeOut' } } }}
        style={{ originX: align === 'center' ? 0.5 : 0 }}
        className={`h-1 w-24 bg-[#E8890C] rounded-full ${compact ? 'mt-3' : 'mt-4'} ${align === 'center' ? 'mx-auto' : ''}`}
      />
      <motion.p
        variants={fadeInUp}
        className={`font-bold text-[#E8890C] ${compact ? 'mt-3 text-base sm:text-lg' : 'mt-5 text-lg sm:text-xl'}`}
      >
        {sub}
      </motion.p>
      <motion.p
        variants={fadeInUp}
        className={`text-sm sm:text-base leading-relaxed max-w-[640px] ${compact ? 'mt-1.5' : 'mt-2'} ${align === 'center' ? 'mx-auto' : ''
          } ${light ? 'text-white' : 'text-black'}`}
      >
        {text}
      </motion.p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 01 — OUR BRANDS: click-to-expand cards (all 4 stay in ONE row)
// ─────────────────────────────────────────────────────────────────────────────

function BrandCard({ item, open, onToggle }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 180, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 180, damping: 18 });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
    if (!open && !reduce) {
      mx.set(px - 0.5);
      my.set(py - 0.5);
    }
  };
  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const highlights = [...item.tags, item.stats];

  return (
    <motion.div
      ref={ref}
      layout
      transition={{ layout: { type: 'spring', stiffness: 260, damping: 30 } }}
      variants={fadeInUp}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ '--accent': item.accent, '--glow': item.glow, '--tint': item.tint, '--mx': '50%', '--my': '50%', perspective: 900 }}
      className={`group relative rounded-[26px] w-full min-w-0 ${open ? 'lg:flex-[1.6]' : 'lg:flex-1'
        }`}
    >
      <motion.div
        layout="position"
        style={{ rotateX: open ? 0 : rotateX, rotateY: open ? 0 : rotateY, transformStyle: 'preserve-3d' }}
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
          }
        }}
        className={`relative overflow-hidden rounded-[26px] bg-white cursor-pointer border outline-none focus-visible:ring-4 focus-visible:ring-[#E8890C]/30 transition-shadow duration-500 ${open
            ? 'border-[color:var(--accent)] shadow-[0_24px_50px_-20px_rgba(15,23,42,0.3)]'
            : 'border-[#E5EBF2] shadow-[0_14px_32px_-20px_rgba(15,23,42,0.25)] hover:shadow-[0_22px_44px_-18px_rgba(15,23,42,0.3)]'
          }`}
      >
        {/* Accent bar that fills on hover/open */}
        <div
          className={`absolute top-0 left-0 h-1.5 bg-[color:var(--accent)] transition-all duration-500 ${open ? 'w-full' : 'w-0 group-hover:w-full'
            }`}
        />

        <div className="relative z-10 p-6 sm:p-7">
          {/* Open / close indicator */}
          <div
            className={`absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${open
                ? 'bg-[color:var(--accent)] text-white'
                : 'border-2 border-[color:var(--accent)] text-[color:var(--accent)] group-hover:bg-[color:var(--accent)] group-hover:text-white'
              }`}
          >
            <ChevronDown className={`w-4 h-4 stroke-[3] transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
          </div>

          {/* Logo */}
          <motion.div
            layout="position"
            className={`flex items-center h-20 sm:h-22 ${open ? 'justify-start' : 'justify-center'} transition-transform duration-300 group-hover:scale-[1.04]`}
            style={{ transform: 'translateZ(30px)' }}
          >
            <BrandLogo logo={item.logo} name={item.name} className="h-14 sm:h-16 max-h-16 max-w-[85%] sm:max-w-[90%] w-auto" />
          </motion.div>

          {/* Name */}
          <motion.h3
            layout="position"
            className={`mt-5 text-[17px] font-black tracking-tight text-[#0F3D2E] ${open ? 'text-left' : 'text-center'}`}
          >
            {item.name}
          </motion.h3>

          {/* Description */}
          <motion.p
            layout="position"
            className={`mt-2 text-[13.5px] leading-relaxed text-black ${open ? 'text-left' : 'text-center line-clamp-2'
              }`}
          >
            {item.fullDesc}
          </motion.p>

          {/* Collapsed hint */}
          {!open && (
            <p className="mt-4 text-center text-xs font-semibold text-[color:var(--accent)] opacity-70 group-hover:opacity-100 transition-opacity">
              Click to explore
            </p>
          )}

          {/* Expanded content */}
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="more"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <div className="pt-6">
                  <p className="text-sm font-bold text-[#0F3D2E] mb-3">What you get</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {highlights.map((h, i) => (
                      <motion.li
                        key={h}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.12 + i * 0.07, duration: 0.35 }}
                        className="flex items-center gap-3 rounded-xl bg-[#F8FAFC] border border-slate-200/80 px-4 py-3"
                      >
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-[color:var(--accent)]" />
                        <span className="text-sm font-bold text-[#0F3D2E]">{h}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-6 flex w-full flex-nowrap items-center justify-center gap-2.5 whitespace-nowrap px-5 py-3 rounded-[10px] bg-[#E8890C] text-white font-bold text-sm shadow-[0_10px_24px_-8px_rgba(232,137,12,0.7)] hover:bg-[#d67d0a] transition-colors"
                  >
                    Visit Website
                    <span className="min-w-0 truncate text-white font-semibold">{item.domain}</span>
                    <ExternalLink className="w-4 h-4 flex-shrink-0" />
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 00 — PARENT BRAND & PORTFOLIO SHOWCASE
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 00 — PARENT BRAND & PORTFOLIO (light, professional, 3D cards)
//
// Replace the old ParentBrandSection in Brands&Partners.jsx with everything below.
// Imports needed (already in your file): motion, useMotionValue, useSpring,
// useTransform, useReducedMotion, ExternalLink, ArrowUpRight, CheckCircle2.
// You can now remove the unused imports: Sparkles, Lock (and ShieldCheck if unused).
// ─────────────────────────────────────────────────────────────────────────────

/* Layered shadow = the "raised box" look. Used on every card in this section. */
const CARD_SHADOW =
  'shadow-[0_1px_2px_rgba(15,61,46,0.06),0_10px_20px_-6px_rgba(15,61,46,0.10),0_30px_60px_-20px_rgba(15,61,46,0.18)]';

/* Soft 3D tilt that follows the mouse. Turned off when reduced motion is on. */
function Tilt3D({ children, className = '', max = 4 }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [max, -max]), { stiffness: 200, damping: 22 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-max, max]), { stiffness: 200, damping: 22 });

  const onMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div style={{ perspective: 1100 }} className={className}>
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: reduce ? 0 : rotateX, rotateY: reduce ? 0 : rotateY, transformStyle: 'preserve-3d' }}
        className="h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

export function ParentBrandSection() {
  return (
    <section className="relative w-full bg-[#F3F6F4] py-10 lg:py-14 border-b border-slate-200">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-[720px] mb-8 lg:mb-10">
          <h2 className="font-black tracking-tight leading-[1.1] text-2xl sm:text-3xl lg:text-[36px] text-[#0F3D2E]">
            Our Parent Brand &amp; Global Portfolio
          </h2>
          <div className="h-1 w-16 bg-[#E8890C] rounded-full mt-3" />
          <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-slate-600">
            VR4Web is backed by Niftysoft. Explore our parent company and browse the commercial portfolio behind our work.
          </p>
        </div>

        {/* 2 Reduced-Width Cards Side-by-Side: Left = Parent Brand | Right = Portfolio */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          
          {/* Card 1: Parent Company (niftysoft.com) */}
          <Tilt3D max={2.5}>
            <div
              className={`relative overflow-hidden rounded-2xl bg-white border border-slate-200/80 border-b-4 border-b-[#0F3D2E] p-6 sm:p-7 flex flex-col justify-between h-full ${CARD_SHADOW}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
                  <a
                    href="https://niftysoft.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Visit Niftysoft"
                    className="flex-shrink-0 self-start sm:self-center rounded-xl bg-white border border-slate-200 p-3.5 shadow-xs transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    <img src="/brand/niftysoft.png" alt="Niftysoft Global" className="h-9 sm:h-10 w-auto object-contain" />
                  </a>

                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-[#E8890C]">Parent company</p>
                    <h3 className="mt-0.5 text-xl sm:text-2xl font-black tracking-tight text-[#0F3D2E]">
                      Niftysoft Global
                    </h3>
                    <p className="mt-1 text-xs sm:text-[13.5px] leading-relaxed text-slate-600">
                      Enterprise software development, cloud infrastructure and digital transformation.
                    </p>
                  </div>
                </div>

                <a
                  href="https://niftysoft.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm:self-center inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[10px] bg-[#E8890C] hover:bg-[#d67d0a] text-white font-bold text-xs sm:text-sm shadow-[0_8px_20px_-6px_rgba(232,137,12,0.6)] transition-all whitespace-nowrap self-start"
                >
                  Visit niftysoft.com
                  <ExternalLink className="w-4 h-4 flex-shrink-0" />
                </a>
              </div>
            </div>
          </Tilt3D>

          {/* Card 2: Portfolio Showcase (niftysoft.in) */}
          <Tilt3D max={2.5}>
            <div
              className={`relative overflow-hidden rounded-2xl bg-white border border-slate-200/80 border-b-4 border-b-[#E8890C] p-6 sm:p-7 flex flex-col justify-between h-full ${CARD_SHADOW}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
                  <a
                    href="https://niftysoft.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View Portfolio at niftysoft.in"
                    className="flex-shrink-0 self-start sm:self-center rounded-xl bg-white border border-slate-200 p-3.5 shadow-xs transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    <img src="/brand/niftysoft.png" alt="Niftysoft Portfolio" className="h-9 sm:h-10 w-auto object-contain" />
                  </a>

                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-[#0F3D2E]">Global portfolio</p>
                    <h3 className="mt-0.5 text-xl sm:text-2xl font-black tracking-tight text-[#0F3D2E]">
                      See our work at niftysoft.in
                    </h3>
                    <p className="mt-1 text-xs sm:text-[13.5px] leading-relaxed text-slate-600">
                      Browse 500+ live production systems, case studies and enterprise solutions.
                    </p>
                  </div>
                </div>

                <a
                  href="https://niftysoft.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm:self-center inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[10px] bg-[#0F3D2E] hover:bg-[#155440] text-white font-bold text-xs sm:text-sm shadow-[0_8px_20px_-6px_rgba(15,61,46,0.6)] transition-all whitespace-nowrap self-start"
                >
                  Visit niftysoft.in
                  <ExternalLink className="w-4 h-4 flex-shrink-0" />
                </a>
              </div>
            </div>
          </Tilt3D>

        </div>
      </div>
    </section>
  );
}

export function OurBrandsSection() {
  const [openId, setOpenId] = useState(null);

  return (
    /* WHITE background */
    <section id="brands" className="relative w-full bg-white py-10 lg:py-14 overflow-hidden">
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Brands"
          sub="Specialist solutions. One connected ecosystem."
          text="Our own brands deliver core digital, web, email and IT solutions, helping businesses establish, manage and grow their online presence with uncompromised reliability."
        />

        <motion.div
          layout
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row gap-5 xl:gap-6 items-start"
        >
          {BRANDS_DATA.map((brand) => (
            <BrandCard
              key={brand.id}
              item={brand}
              open={openId === brand.id}
              onToggle={() => setOpenId(openId === brand.id ? null : brand.id)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BRIDGE — logo marquee
// ─────────────────────────────────────────────────────────────────────────────

function LogoMarquee() {
  const all = [...BRANDS_DATA, ...PARTNERS_DATA];
  const loop = [...all, ...all];

  return (
    /* GREEN strip (slightly deeper than the Partners section so they stay separate) */
    <section className="relative w-full bg-transparent py-5 overflow-hidden border-y border-slate-200">
      <div className="bp-marquee flex w-max gap-5">
        {loop.map((it, i) => (
          <div
            key={`${it.id}-${i}`}
            className="flex items-center justify-center h-18 px-8 rounded-2xl bg-white border border-slate-200 shadow-[0_8px_22px_-12px_rgba(15,23,42,0.25)]"
          >
            <BrandLogo logo={it.logo} name={it.name} className="h-10 sm:h-11 max-h-11 max-w-[160px] w-auto" />
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 02 — OUR PARTNERS (compact bento layout on a Sydney photo + green overlay)
// ─────────────────────────────────────────────────────────────────────────────

const ROTATE_MS = 6000;

export function OurPartnersSection() {
  const [active, setActive] = useState(0);
  const auto = true;
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!auto || reduce) return undefined;
    const t = setTimeout(() => setActive((a) => (a + 1) % PARTNERS_DATA.length), ROTATE_MS);
    return () => clearTimeout(t);
  }, [active, auto, reduce]);

  // Clicking a tab or arrow jumps to that partner; the timer then restarts and keeps rotating.
  const select = (i) => setActive(i);

  const p = PARTNERS_DATA[active];

  return (
    /* GREEN overlay on top of a Sydney photo (same look as the About page) */
    <section id="partners" className="relative w-full bg-[#0F3D2E] py-8 lg:py-10 overflow-hidden">
      {/* Background photo + green overlay (strong enough so the content stays easy to read) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <img
          src={PARTNERS_BG}
          onError={imgFallback(PARTNERS_BG_FALLBACK)}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#14573F]/75 via-[#1A6B4E]/65 to-[#1F7A58]/55" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          light
          compact
          title="Our Partners"
          sub="Specialist expertise. Shared ambition."
          text="Our partner companies bring deep domain expertise in digital marketing, content, reputation management and more, helping us deliver greater value together."
        />

        {/* Partner tabs */}
        <div
          role="tablist"
          aria-label="Partners"
          className="flex gap-2.5 overflow-x-auto pb-3 mb-5 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] justify-start lg:justify-center"
        >
          {PARTNERS_DATA.map((item, i) => {
            const isActive = i === active;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => select(i)}
                className={`group relative flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-300 outline-none ${isActive
                    ? 'bg-[#E8890C] text-white shadow-[0_10px_24px_-6px_rgba(232,137,12,0.7)]'
                    : 'bg-[#0F3D2E]/45 backdrop-blur-sm text-white hover:bg-white/15 border border-white/30'
                  }`}
              >
                <Icon className="w-4 h-4 text-white" strokeWidth={isActive ? 2.5 : 2} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* ── BENTO SPOTLIGHT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
          {/* LEFT: main card + feature cards */}
          <div className="lg:col-span-7 flex flex-col gap-4 lg:gap-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="flex flex-col gap-4 lg:gap-5 flex-1"
              >
                {/* White main card */}
                <div className="relative flex-1 overflow-hidden rounded-[24px] bg-white p-6 sm:p-7 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)]">

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center gap-3">
                      <BrandLogo logo={p.logo} name={p.name} className="h-8 max-h-8 max-w-[150px] w-auto" />
                      <span className="ml-1 pl-3 border-l border-slate-200 text-[#0F3D2E] font-extrabold text-[11px] tracking-[0.18em] uppercase">
                        {p.badge}
                      </span>
                    </div>

                    <h3 className="mt-4 text-xl sm:text-2xl lg:text-[1.75rem] font-black text-[#0F3D2E] tracking-tight leading-tight">
                      {p.desc}
                    </h3>
                    <p className="mt-2 text-sm sm:text-[14.5px] leading-relaxed text-slate-600 max-w-[560px]">
                      {p.fullDesc}
                    </p>

                    <ul className="mt-4 space-y-2">
                      {p.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-3 text-sm sm:text-[14.5px] leading-snug text-slate-700">
                          <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#E8890C] flex-shrink-0" />
                          {pt}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-5 flex items-center justify-between gap-4">
                      <button
                        onClick={() => select((active - 1 + PARTNERS_DATA.length) % PARTNERS_DATA.length)}
                        aria-label="Previous partner"
                        className="w-10 h-10 rounded-[10px] bg-slate-100 hover:bg-slate-200 text-[#0F3D2E] flex items-center justify-center transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      <motion.a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-[10px] bg-[#E8890C] text-white font-bold text-sm shadow-[0_12px_28px_-8px_rgba(232,137,12,0.8)] hover:bg-[#d67d0a] transition-colors"
                      >
                        Visit Website
                        <span className="w-9 h-9 rounded-lg bg-white text-[#E8890C] flex items-center justify-center shrink-0">
                          <ArrowUpRight className="w-4 h-4 stroke-[2.8]" />
                        </span>
                      </motion.a>

                      <button
                        onClick={() => select((active + 1) % PARTNERS_DATA.length)}
                        aria-label="Next partner"
                        className="w-10 h-10 rounded-[10px] bg-[#0F3D2E] hover:bg-[#124A37] text-white flex items-center justify-center transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Feature cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5">
                  {p.tags.map((t, i) => (
                    <motion.div
                      key={t}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.07 }}
                      className="group flex items-center gap-3 rounded-[10px] bg-[#0F3D2E]/45 backdrop-blur-sm hover:bg-[#0F3D2E]/65 border border-white/30 px-4 py-3 transition-colors"
                    >
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-[#E8890C] group-hover:text-white transition-colors" />
                      <p className="text-sm sm:text-[14.5px] font-bold text-white leading-snug">{t}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT: tall image card */}
          <div className="lg:col-span-5">
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="group relative h-[260px] sm:h-[320px] lg:h-full lg:min-h-[380px] overflow-hidden rounded-[24px] bg-[#0A291E] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)] ring-1 ring-white/20"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={p.id}
                  src={p.banner}
                  alt={p.name}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.65, ease: 'easeInOut' }}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 03 — FAQ as a chat conversation
// ─────────────────────────────────────────────────────────────────────────────

function ChatAnswer({ text }) {
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setTyping(false), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.3 }}
      style={{ originX: 0, originY: 0 }}
      className="flex items-start gap-3 mt-3 w-full"
    >
      <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#0F3D2E] text-white text-sm font-black flex items-center justify-center ring-4 ring-white shadow">
        N
      </span>
      <div className="flex-1 rounded-[10px] bg-white border border-slate-200 shadow-[0_12px_30px_-14px_rgba(15,61,46,0.35)] px-5 py-4">
        {typing ? (
          <div className="flex items-center gap-1.5 h-5" aria-label="Typing">
            {[0, 1, 2].map((d) => (
              <span
                key={d}
                className="bp-dot w-2 h-2 rounded-full bg-[#0F3D2E]"
                style={{ animationDelay: `${d * 0.15}s` }}
              />
            ))}
          </div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[14.5px] leading-relaxed text-black"
          >
            {text}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

export function FaqSection() {
  const [openId, setOpenId] = useState('faq-1');

  return (
    /* WHITE background */
    <section id="faqs" className="relative w-full bg-white py-8 lg:py-12 overflow-hidden">
      <div className="relative z-10 max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[360px_1fr] gap-6 lg:gap-12">
        {/* Left: sticky intro */}
        <div className="lg:sticky lg:top-28 self-start">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.05] text-[#0F3D2E]">
              Got questions? Ask away.
            </motion.h2>
            <motion.div
              variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.7 } } }}
              style={{ originX: 0 }}
              className="h-1 w-24 bg-[#E8890C] rounded-full mt-4"
            />
            <motion.p variants={fadeInUp} className="mt-5 text-[15px] leading-relaxed text-black">
              Tap a question to see our answer. Need something that isn&apos;t covered? Our specialists will map the right
              solution for your business.
            </motion.p>

            <motion.div variants={fadeInUp}>
              <Link
                to="/contact"
                className="group mt-6 inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-[10px] bg-[#E8890C] text-white font-bold text-sm shadow-[0_12px_28px_-8px_rgba(232,137,12,0.7)] hover:bg-[#d67d0a] transition-colors"
              >
                Talk to an Expert
                <span className="w-9 h-9 rounded-lg bg-white text-[#E8890C] flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4 stroke-[2.8]" />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Right: conversation */}
        <div className="space-y-3">
          {FAQS_DATA.map((faq, i) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.05 }}
              >
                <div>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className={`group flex w-full items-center justify-between gap-3 text-left rounded-[10px] px-5 py-3.5 font-bold text-[14.5px] sm:text-[15px] transition-all duration-300 outline-none focus-visible:ring-4 focus-visible:ring-[#E8890C]/30 ${isOpen
                        ? 'bg-[#E8890C] text-white shadow-[0_16px_34px_-12px_rgba(232,137,12,0.7)]'
                        : 'bg-white text-[#0F3D2E] border border-slate-200 shadow-sm hover:border-[#E8890C]/50 hover:-translate-y-0.5 hover:shadow-md'
                      }`}
                  >
                    <span>{faq.question}</span>
                    <span
                      className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-white/20 text-white' : 'bg-[#FFF3E0] text-[#E8890C]'
                        }`}
                    >
                      <ChevronDown className={`w-4 h-4 stroke-[3] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </span>
                  </button>
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && <ChatAnswer key={`${faq.id}-answer`} text={faq.answer} />}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function BrandsAndPartners() {
  return (
    <div className="w-full min-h-screen bg-white font-sans text-[#0F3D2E] selection:bg-[#E8890C] selection:text-white">
      <PageStyles />

      <PageBanner
        title="Our Brands & Partners"
        breadcrumbs={[{ label: 'Brands & Partners' }]}
        bgImage="/brand-partner-banner.png"
        className="!mb-0 lg:!mb-0"
      />

      {/* Parent Brand & Portfolio Section */}
      <ParentBrandSection />

      <OurBrandsSection />

      <OurPartnersSection />
      <FaqSection />
      <div className="[&>*]:!py-6 lg:[&>*]:!py-8 [&>*]:!my-0">
        <CtaSection />
      </div>
    </div>
  );
}