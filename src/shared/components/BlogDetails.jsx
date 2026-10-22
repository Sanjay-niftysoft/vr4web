import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, Calendar, Clock, Share2, ChevronRight, ChevronDown, Home,
  Bookmark, CheckCircle2, User, Check, ImageIcon,
} from 'lucide-react';
import { getBlogById, getRelatedBlogs } from '../../data/blogsData';
import CtaSection from '../../components/CtaSection';

/* ───────────── Icons ───────────── */
const FacebookIcon = (p) => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4" {...p}>
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
  </svg>
);
const LinkedInIcon = (p) => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4" {...p}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m1.4 9.74V9.97H5.06v8.53h2.8z" />
  </svg>
);
const TwitterIcon = (p) => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4" {...p}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

/* ───────────── Images (Unsplash, related to each section) ───────────── */
const U = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1400&q=80`;

const IMAGES = {
  'mobile-application-development-services': {
    hero: U('1512941937669-90a1b58e7e9c'),
    'why-mobile': U('1551650975-87deedd944c3'),
    'key-services': U('1555066931-4365d14bab8c'),
    technologies: U('1498050108023-c5249f4df085'),
    lifecycle: U('1522071820081-009f0129c71c'),
    'business-impact': U('1551288049-bebda4e38f71'),
    'next-steps': U('1519389950473-47ba0277781c'),
  },
  'mobile-apps-better-digital-experiences': {
    hero: U('1551650975-87deedd944c3'),
    'mobile-first': U('1512941937669-90a1b58e7e9c'),
    pillars: U('1555066931-4365d14bab8c'),
    'bridging-touchpoints': U('1556742049-0cfed4f6a45d'),
    'internal-operations': U('1519389950473-47ba0277781c'),
    'measuring-success': U('1460925895917-afdab827c52f'),
    conclusion: U('1522071820081-009f0129c71c'),
  },
  'erp-crm-transform-ecommerce-operations': {
    hero: U('1586528116311-ad8dd3c8310d'),
    complexity: U('1565793298595-6a879b1d9492'),
    'erp-role': U('1553877522-43269d4ea984'),
    'crm-power': U('1551288049-bebda4e38f71'),
    'integration-synergy': U('1460925895917-afdab827c52f'),
    implementation: U('1522071820081-009f0129c71c'),
    conclusion: U('1556742049-0cfed4f6a45d'),
  },
};

/* Image with graceful gradient fallback if a URL fails */
function SmartImage({ src, alt, className = '' }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div className={`bg-gradient-to-br from-[#102448] via-[#1b3a73] to-[#D7192D] flex items-center justify-center ${className}`}>
        <ImageIcon className="w-10 h-10 text-white/50" />
      </div>
    );
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={className} />;
}

/* Simple banner image (calm, like the reference) */
function BannerImage({ src, alt }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6 }}
      className="relative h-48 sm:h-64 rounded-2xl overflow-hidden shadow-md shadow-slate-900/10 bg-slate-100"
    >
      <SmartImage src={src} alt={alt} className="w-full h-full object-cover" />
    </motion.figure>
  );
}

/* Split "Title: description" bullets */
const splitBullet = (text) => {
  const clean = text.replace(/^\d+\.\s*/, '');
  const i = clean.indexOf(':');
  return i > 0 && i < 70
    ? { title: clean.slice(0, i), body: clean.slice(i + 1).trim() }
    : { title: '', body: clean };
};
const isSteps = (bullets) => bullets.every((b) => /^\d+\.\s/.test(b));

/* Vertical timeline for numbered steps */
function Timeline({ bullets }) {
  return (
    <div className="relative pl-12 sm:pl-14 space-y-4">
      <div className="absolute left-[19px] sm:left-[21px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#D7192D] to-[#102448]/20" />
      {bullets.map((b, i) => {
        const { title, body } = splitBullet(b);
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className="relative bg-white rounded-2xl p-4 border border-slate-200 shadow-sm"
          >
            <span className="absolute -left-12 sm:-left-14 top-3 w-10 h-10 rounded-full bg-gradient-to-br from-[#D7192D] to-[#a5111f] text-white font-extrabold flex items-center justify-center ring-4 ring-white shadow-md">
              {i + 1}
            </span>
            {title && <h4 className="font-extrabold text-[#102448] mb-1">{title}</h4>}
            <p className="text-black text-sm leading-relaxed">{body}</p>
          </motion.div>
        );
      })}
    </div>
  );
}

/* Feature cards for regular bullets (single column inside the narrow reading area) */
function CardGrid({ bullets }) {
  return (
    <div className="grid grid-cols-1 gap-3">
      {bullets.map((b, i) => {
        const { title, body } = splitBullet(b);
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            className="flex items-start gap-3 rounded-2xl p-4 bg-white border border-slate-200 hover:border-[#D7192D]/40 hover:shadow-md transition"
          >
            <span className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-xl bg-red-50 text-[#D7192D] flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </span>
            <div>
              {title && <h4 className="font-extrabold text-[#102448] leading-snug mb-0.5">{title}</h4>}
              <p className="text-black text-sm leading-relaxed">{body}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* FAQ accordion (reads blog.faqs = [{ question, answer }] or [{ q, a }]) */
function Faq({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="space-y-3">
      {items.map((f, i) => {
        const q = f.question || f.q;
        const a = f.answer || f.a;
        const isOpen = open === i;
        return (
          <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 font-bold text-[#102448]"
              aria-expanded={isOpen}
            >
              <span className="text-sm sm:text-[15px]">{q}</span>
              <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#D7192D]' : ''}`} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="px-5 pb-5 text-sm text-black leading-relaxed">{a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* ───────────── Page ───────────── */
export default function BlogDetails() {
  const { id } = useParams();
  const blog = getBlogById(id);
  const relatedBlogs = getRelatedBlogs(blog?.id);
  const [activeSection, setActiveSection] = useState('intro');
  const [copied, setCopied] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('intro');
  }, [id]);

  // ScrollSpy
  useEffect(() => {
    if (!blog) return;
    const ids = ['intro', ...(blog.content.sections?.map((s) => s.id) || [])];
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 300) {
        setActiveSection(ids[ids.length - 1]);
        return;
      }
      let current = ids[0];
      ids.forEach((sId) => {
        const el = document.getElementById(sId);
        if (el && el.getBoundingClientRect().top <= 200) current = sId;
      });
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [blog]);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 110, behavior: 'smooth' });
  };

  const url = typeof window !== 'undefined' ? window.location.href : '';
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) { /* ignore */ }
  };

  if (!blog) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl font-bold text-[#102448] mb-4">Blog Article Not Found</h2>
        <Link to="/blogs" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#102448] text-white font-medium hover:bg-[#D7192D] transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Blogs</span>
        </Link>
      </div>
    );
  }

  const imgs = IMAGES[blog.id] || {};
  const faqs = blog.faqs || blog.faq || [];

  const shareLinks = [
    { label: 'Facebook', Icon: FacebookIcon, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { label: 'LinkedIn', Icon: LinkedInIcon, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { label: 'X', Icon: TwitterIcon, href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(blog.title)}` },
  ];

  return (
    <div className="w-full min-h-screen bg-white font-sans text-[#111111] selection:bg-[#D7192D] selection:text-white">
      {/* Reading progress bar */}
      <motion.div style={{ scaleX: progress }} className="fixed top-0 left-0 right-0 h-1 origin-left bg-gradient-to-r from-[#D7192D] to-[#ff6b7a] z-[60]" />

      {/* ─── 1. BANNER ─── */}
      <header
        className="relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url('/banner/5.png')` }}
      >
        <div className="absolute inset-0 bg-[#102448]/15 z-0" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-6 sm:pb-8 text-center flex flex-col items-center">
          {blog.category && (
            <motion.span
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-block bg-[#D7192D] text-white text-xs font-bold px-3 py-1 rounded-[10px] mb-3"
            >
              {blog.category}
            </motion.span>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            style={{ textShadow: '0 4px 22px rgba(16,36,72,0.35)' }}
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-[1.18] max-w-4xl"
          >
            {blog.title}
          </motion.h1>

          {/* Breadcrumb pill */}
          <motion.nav
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 inline-flex items-center gap-2.5 rounded-full bg-white/25 backdrop-blur-sm px-5 py-2 text-xs sm:text-sm text-white"
          >
            <Link to="/" className="flex items-center gap-1.5 font-medium hover:opacity-80 transition-opacity">
              <Home className="w-3.5 h-3.5" /><span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/80" />
            <Link to="/blogs" className="font-extrabold hover:opacity-80 transition-opacity">Blogs</Link>
          </motion.nav>
        </div>
      </header>

      {/* ─── 2. BODY: fixed TOC (left) + scrolling article (right) ─── */}
      <section className="pt-8 pb-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Mobile TOC chips */}
        <div className="lg:hidden mb-6 sticky top-24 z-20 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-black uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Bookmark className="w-3.5 h-3.5 text-[#D7192D]" /><span>Table of contents</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {blog.tableOfContents.map((toc) => (
              <button
                key={toc.id}
                onClick={() => scrollToSection(toc.id)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-[10px] text-xs font-semibold transition-colors flex-shrink-0 ${
                  activeSection === toc.id ? 'bg-[#D7192D] text-white' : 'bg-slate-100 text-black hover:bg-red-50 hover:text-[#D7192D]'
                }`}
              >
                {toc.title}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-10 items-start">
          {/* LEFT: fixed (sticky) compact TOC card */}
          <aside className="hidden lg:block sticky top-28 self-start z-30">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-lg shadow-slate-900/5 max-h-[calc(100vh-140px)] overflow-y-auto">
              <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-[#D7192D] mb-4">
                Table of contents
              </h3>
              <nav className="flex flex-col gap-1">
                {blog.tableOfContents.map((toc, i) => {
                  const active = activeSection === toc.id;
                  return (
                    <button
                      key={toc.id}
                      onClick={() => scrollToSection(toc.id)}
                      className={`flex items-start gap-3 text-left rounded-xl px-2.5 py-2.5 transition-colors cursor-pointer w-full ${
                        active ? 'bg-red-50' : 'hover:bg-slate-50'
                      }`}
                    >
                      <span
                        className={`flex-shrink-0 w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-colors ${
                          active ? 'bg-[#D7192D] text-white' : 'bg-slate-100 text-black'
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span className={`text-sm leading-snug pt-0.5 ${active ? 'text-[#102448] font-bold' : 'text-black font-medium'}`}>
                        {toc.title}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* RIGHT: scrolling article */}
          <article className="max-w-[760px] space-y-10 text-black leading-relaxed text-sm sm:text-base">
            {/* Intro */}
            <div id="intro" className="space-y-4 scroll-mt-28">
              {blog.content.intro.map((p, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? 'text-lg sm:text-xl text-[#102448] font-bold leading-relaxed'
                      : 'text-base sm:text-[17px] text-black'
                  }
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Sections */}
            {blog.content.sections?.map((section) => (
              <section key={section.id} id={section.id} className="space-y-4 scroll-mt-28">
                <BannerImage src={imgs[section.id]} alt={section.heading} />

                <h2 className="text-2xl sm:text-[28px] font-extrabold text-[#102448] tracking-tight leading-snug pt-2">
                  {section.heading}
                </h2>

                {section.paragraphs?.map((p, i) => (
                  <p key={i} className="text-black text-base sm:text-[17px] leading-relaxed">{p}</p>
                ))}

                {section.bullets?.length > 0 &&
                  (isSteps(section.bullets) ? <Timeline bullets={section.bullets} /> : <CardGrid bullets={section.bullets} />)}

                {section.note && (
                  <p className="text-sm font-medium text-black bg-red-50/60 p-4 rounded-xl border border-red-100">{section.note}</p>
                )}
              </section>
            ))}

            {/* Inline CTA card (end of article) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6">
              <div>
                <h3 className="text-lg font-extrabold text-[#102448]">Have a project in mind?</h3>
                <p className="text-sm text-black">Talk to our team and get a tailored plan.</p>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#D7192D] hover:bg-[#102448] text-white text-sm font-bold px-5 py-3 rounded-[10px] transition-colors whitespace-nowrap"
              >
                <span>Get in touch</span><ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Share row */}
            <div className="flex items-center gap-3 pt-6 border-t border-slate-200">
              <span className="text-sm font-bold text-[#102448] flex items-center gap-1.5">
                <Share2 className="w-4 h-4 text-[#D7192D]" /> Share
              </span>
              {shareLinks.map(({ label, Icon, href }) => (
                <a
                  key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${label}`}
                  className="w-10 h-10 rounded-[10px] bg-slate-100 text-[#102448] flex items-center justify-center hover:bg-[#D7192D] hover:text-white transition-colors"
                >
                  <Icon />
                </a>
              ))}
              <button
                onClick={copyLink} aria-label="Copy link"
                className="w-10 h-10 rounded-[10px] bg-slate-100 text-[#102448] flex items-center justify-center hover:bg-[#102448] hover:text-white transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
          </article>
        </div>

        {/* ─── FAQ (full width, below the article, like the reference) ─── */}
        {faqs.length > 0 && (
          <div className="mt-14 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102448] tracking-tight mb-6">
              Frequently asked questions
            </h2>
            <Faq items={faqs} />
          </div>
        )}
      </section>

      {/* ─── 3. CTA ─── */}
      <div className="[&>*]:!py-8 sm:[&>*]:!py-10 [&>*]:!my-0">
        <CtaSection />
      </div>

      {/* ─── 4. RELATED ─── */}
      <section className="py-10 bg-slate-50 border-t border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102448] tracking-tight">Related Articles</h2>
            <Link to="/blogs" className="text-xs sm:text-sm font-bold text-[#D7192D] hover:underline flex items-center gap-1">
              <span>View All Blogs</span><ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedBlogs.map((rel, i) => (
              <motion.div
                key={rel.id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-3 bg-slate-900">
                    <SmartImage
                      src={IMAGES[rel.id]?.hero || rel.cardImage} alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <span className="text-xs font-bold text-[#D7192D] uppercase tracking-wider block mb-1.5">{rel.date} • {rel.readTime}</span>
                  <h3 className="text-lg font-extrabold text-[#102448] group-hover:text-[#D7192D] transition-colors line-clamp-2 mb-2">
                    <Link to={`/blogs/${rel.id}`}>{rel.title}</Link>
                  </h3>
                  <p className="text-sm text-black line-clamp-2 mb-5 leading-relaxed">{rel.summary}</p>
                </div>
                <Link to={`/blogs/${rel.id}`} className="inline-flex items-center gap-1.5 text-sm font-bold text-[#102448] group-hover:text-[#D7192D] transition-colors">
                  <span>Read article</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}