import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Share2, Bookmark, ChevronRight, ArrowRight, CheckCircle2, Home,
  Copy, Check, Plus, Minus, Calendar, Clock, Sparkles
} from 'lucide-react';
import { getBlogById, BLOGS } from '../../data/blogsData';
import CtaSection from '../../components/CtaSection';

/* ─────────────────────────────────────────────────────────────
   THEME : Green (#0F3D2E) + Yellow (#E8890C) + White (#FFFFFF) + Blue (#2563EB)
   FONT  : Poppins
   LAYOUT: Centered Panoramic Hero Banner + 2-Column Body with Next 2 Blogs in Sidebar
   ───────────────────────────────────────────────────────────── */

const FONT = "font-['Poppins',sans-serif]";

/* Topic-specific, wide uncropped visuals & metadata */
const BLOG_EXPANDED_DATA = {
  'mobile-application-development-services': {
    heroLandscape: '/mobile.png', // User's custom 2000x625 mobile banner
    inlineLandscape: '/blog1.png',
    inlineCaption: '"Agile Sprint Architecture" High-Fidelity Mobile App Prototyping & Cross-Platform Engineering',
    cardImage: '/blog-images/2.png',
  },
  'mobile-apps-better-digital-experiences': {
    heroLandscape: '/mobile2.png', // User's custom mobile banner
    inlineLandscape: '/blog2.png',
    inlineCaption: '"User-Centric Architecture" Streamlined Touchpoints & Omnichannel Experience Optimization',
    cardImage: '/blog-images/1.png',
  },
  'erp-crm-transform-ecommerce-operations': {
    heroLandscape: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=80', // Wide modern automated eCommerce fulfillment & distribution center
    inlineLandscape: '/blog3.png', // Enterprise CRM customer relationship management & pipeline analytics
    inlineCaption: '"Unified CRM & ERP Operations" Multi-Channel Customer Lifecycle & Enterprise Telemetry',
    cardImage: '/blogs/erp-crm-ecommerce.png', // Enterprise eCommerce systems
  },
};

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = getBlogById(id);

  // Accordion Toggles
  const [openSummary, setOpenSummary] = useState(true);
  const [openHistory, setOpenHistory] = useState(false);
  const [openPasses, setOpenPasses] = useState(true);

  // Interactive Action states
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setOpenSummary(true);
    setOpenHistory(false);
    setOpenPasses(true);
  }, [id]);

  // Find the other 2 blogs to display in the right sidebar
  const otherBlogs = useMemo(() => {
    return BLOGS.filter((b) => b.id !== blog?.id).slice(0, 2);
  }, [blog?.id]);

  if (!blog) {
    return (
      <div className={`${FONT} min-h-[70vh] flex flex-col items-center justify-center px-4 bg-white`}>
        <h2 className="text-2xl font-bold text-[#0F3D2E] mb-4">Blog Article Not Found</h2>
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0F3D2E] text-white font-medium hover:bg-[#E8890C] transition-colors"
        >
          Back to All Blogs
        </Link>
      </div>
    );
  }

  const extras = BLOG_EXPANDED_DATA[blog.id] || BLOG_EXPANDED_DATA['mobile-application-development-services'];
  const introParagraphs = blog.content?.intro || [];
  const sections = blog.content?.sections || [];

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className={`${FONT} w-full min-h-screen bg-[#FDFEFE] text-slate-800 selection:bg-[#E8890C] selection:text-white`}>

      {/* ════════════════ 1. CENTERED HERO BANNER ════════════════ */}
      {/* ════════════════ 1. CENTERED HERO BANNER ════════════════ */}
<section className="relative w-full pt-28 sm:pt-32 pb-14 sm:pb-16 min-h-[320px] sm:min-h-[380px] flex items-center justify-center bg-[rgb(240,231,195)] border-b border-slate-200">
  <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col items-center text-center">

    {/* Category Pill */}
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8890C] text-[#0F3D2E] text-xs font-black uppercase tracking-widest shadow-md mb-5">
      <Sparkles className="w-3.5 h-3.5" />
      <span>{blog.category}</span>
      <span>•</span>
      <span>{blog.readTime}</span>
    </div>

    {/* Main Title */}
    <motion.h1
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-black text-[#0F3D2E] tracking-tight leading-[1.15] max-w-[900px]"
    >
      {blog.title}
    </motion.h1>

    {/* Author and Date */}
    <p className="mt-5 text-xs sm:text-sm text-[#0F3D2E]/80 font-medium flex items-center justify-center gap-2">
      <span>By {blog.author}</span>
      <span>•</span>
      <span>Published {blog.date}</span>
    </p>

    {/* Breadcrumbs */}
    <nav
      aria-label="Breadcrumb"
      className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-[#0F3D2E] px-5 py-2 rounded-full shadow-sm"
    >
      <Link to="/" className="hover:text-[#E8890C] transition-colors flex items-center gap-1.5">
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>
      <ChevronRight className="w-3.5 h-3.5 text-white/60" />
      <Link to="/blogs" className="hover:text-[#E8890C] transition-colors">
        Blogs
      </Link>
      <ChevronRight className="w-3.5 h-3.5 text-[#E8890C]" />
      <span className="text-[#E8890C] font-extrabold">{blog.category}</span>
    </nav>
  </div>
</section>

      {/* ════════════════ 2. MAIN CONTENT + RIGHT SIDEBAR (NEXT 2 BLOGS) ════════════════ */}
      <main className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_400px] gap-10 lg:gap-14 items-start">

          {/* ───────────────── LEFT: ARTICLE ACCORDION BODY ───────────────── */}
          <article className="min-w-0">

            {/* Section 1: Summary (Collapsible Accordion) */}
            <div className="pb-8 border-b border-slate-200">
              <button
                type="button"
                onClick={() => setOpenSummary(!openSummary)}
                className="w-full flex items-center justify-between text-left group"
                aria-expanded={openSummary}
              >
                <h2 className="text-2xl sm:text-[26px] font-black text-[#0F3D2E] group-hover:text-[#2563EB] transition-colors">
                  Summary & Overview
                </h2>
                <span className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-[#0F3D2E] group-hover:text-white flex items-center justify-center text-slate-600 transition-colors">
                  {openSummary ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openSummary && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className="pt-5 space-y-5">
                      {introParagraphs[0] && (
                        <p className="text-[16.5px] sm:text-[17.5px] leading-[1.85] text-slate-700">
                          <span className="float-left text-5xl sm:text-6xl font-black font-['Poppins',sans-serif] leading-none mr-3 mt-1 text-[#0F3D2E] select-none">
                            {introParagraphs[0].charAt(0)}
                          </span>
                          {introParagraphs[0].slice(1)}
                        </p>
                      )}

                      {introParagraphs[1] && (
                        <p className="text-[16.5px] sm:text-[17.5px] leading-[1.85] text-slate-700">
                          {introParagraphs[1]}
                        </p>
                      )}

                      {/* Inline Landscape Photo with Caption */}
                      <figure className="my-7">
                        <div className="overflow-hidden rounded-2xl aspect-[16/10] sm:aspect-[16/9] shadow-md border border-slate-200 bg-slate-100">
                          <img
                            src={extras.inlineLandscape}
                            alt={blog.title}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                          />
                        </div>
                        <figcaption className="mt-2.5 text-xs text-slate-500 italic text-center sm:text-left">
                          {extras.inlineCaption}
                        </figcaption>
                      </figure>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Section 2: Technical Evolution (Collapsible Accordion) */}
            <div className="py-8 border-b border-slate-200">
              <button
                type="button"
                onClick={() => setOpenHistory(!openHistory)}
                className="w-full flex items-center justify-between text-left group"
                aria-expanded={openHistory}
              >
                <h2 className="text-2xl sm:text-[26px] font-black text-[#0F3D2E] group-hover:text-[#2563EB] transition-colors">
                  Technical Evolution & Architecture
                </h2>
                <span className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-[#0F3D2E] group-hover:text-white flex items-center justify-center text-slate-600 transition-colors">
                  {openHistory ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openHistory && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className="pt-5 space-y-4">
                      <p className="text-[16.5px] leading-[1.85] text-slate-700">
                        Over the past decade, enterprise applications transitioned from monolithic codebases into modular, cloud-native services. Organizations that invested in modern mobile-first ecosystems unlocked rapid time-to-market, resilient uptime, and sustained customer lifetime value.
                      </p>
                      <p className="text-[16.5px] leading-[1.85] text-slate-700">
                        Modern engineering standards prioritize sub-second interface responses, end-to-end encrypted transactions, and automated telemetry that delivers predictable business ROI.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Section 3: Core Frameworks & Implementation (Open Accordion) */}
            <div className="py-8 border-b border-slate-200">
              <button
                type="button"
                onClick={() => setOpenPasses(!openPasses)}
                className="w-full flex items-center justify-between text-left group"
                aria-expanded={openPasses}
              >
                <h2 className="text-2xl sm:text-[26px] font-black text-[#0F3D2E] group-hover:text-[#2563EB] transition-colors">
                  Core Frameworks & Implementation
                </h2>
                <span className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-[#0F3D2E] group-hover:text-white flex items-center justify-center text-slate-600 transition-colors">
                  {openPasses ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openPasses && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className="pt-6 space-y-8">
                      {sections.map((sec, sIdx) => (
                        <div key={sec.id || sIdx} className="space-y-3">
                          <h3 className="text-lg sm:text-xl font-black text-[#0F3D2E]">
                            {sec.heading}
                          </h3>
                          {sec.paragraphs?.map((p, pIdx) => (
                            <p key={pIdx} className="text-[16px] leading-[1.85] text-slate-700">
                              {p}
                            </p>
                          ))}
                          {sec.bullets && (
                            <ul className="space-y-2.5 pt-2">
                              {sec.bullets.map((b, bIdx) => (
                                <li key={bIdx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-800">
                                  <span className="w-6 h-6 rounded-lg bg-[#2563EB] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                  </span>
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </article>

          {/* ───────────────── RIGHT SIDEBAR: NEXT 2 BLOGS (USER REQUEST) ───────────────── */}
          <aside className="space-y-6 lg:sticky lg:top-28">

            {/* Sidebar Title */}
            <div className="border-b-2 border-[#0F3D2E] pb-3 flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-black text-[#0F3D2E] uppercase tracking-wider flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E8890C]" /> Next Articles
              </h3>
              <span className="text-xs font-bold text-[#2563EB] bg-[#2563EB]/10 px-2.5 py-0.5 rounded-full">
                2 Reads
              </span>
            </div>

            {/* Next 2 Blog Cards with Direct Links */}
            <div className="space-y-5">
              {otherBlogs.map((b) => {
                const bThumb = b.cardImage || BLOG_EXPANDED_DATA[b.id]?.cardImage || b.heroImage;
                return (
                  <Link
                    key={b.id}
                    to={`/blogs/${b.id}`}
                    className="group block rounded-2xl overflow-hidden bg-white border-2 border-slate-200 hover:border-[#2563EB] shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    {/* Thumbnail Image */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                      <img
                        src={bThumb}
                        alt={b.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-md bg-[#2563EB] text-white text-[11px] font-black uppercase tracking-wider shadow">
                        {b.category}
                      </span>
                    </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#E8890C]" />
                      <span>{b.date}</span>
                      <span>•</span>
                      <span>{b.readTime}</span>
                    </div>

                    <h4 className="text-[15px] sm:text-base font-black text-[#0F3D2E] group-hover:text-[#2563EB] transition-colors leading-snug line-clamp-2">
                      {b.title}
                    </h4>

                    <p className="mt-2 text-xs sm:text-[13px] text-slate-600 line-clamp-2 leading-relaxed">
                      {b.summary}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#2563EB] group-hover:text-[#E8890C] transition-colors">
                      <span>Read Article</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
            </div>

            {/* Quick Share / Bookmark Capsule Bar */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
              <button
                onClick={() => setBookmarked(!bookmarked)}
                type="button"
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  bookmarked ? 'bg-[#E8890C] text-white' : 'bg-white text-slate-700 border border-slate-200 hover:border-[#E8890C]'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-white' : ''}`} />
                <span>{bookmarked ? 'Saved' : 'Bookmark'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={copyUrl}
                  type="button"
                  title="Copy Link"
                  className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-[#2563EB] flex items-center justify-center transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                </button>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Share on LinkedIn"
                  className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-[#2563EB] flex items-center justify-center transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </a>
              </div>
            </div>

          </aside>

        </div>
      </main>

      {/* Global CTA Section */}
      <CtaSection />

    </div>
  );
}