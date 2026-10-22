import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Download,
  CheckCircle2,
  ChevronRight,
  Home,
  X,
  Bell,
  Loader2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import CtaSection from '../../components/CtaSection';

/*  Palette
    white      #FFFFFF
    light blue #E3EEFB / #F2F7FD / banner gradient #9cc6ee → #76a7e2
    navy       #102448
    red        #D7192D
*/

// ─── Whitepapers Dataset ───
const WHITEPAPERS = [
  {
    id: 'estimated-website-pricing',
    category: 'Web Design',
    categoryTheme: 'red',
    status: 'Free PDF',
    isAvailable: true,
    title: 'Estimated Website Pricing',
    description:
      'A complete breakdown of website development pricing in India, including costs, timelines, and what’s included.',
    topBorder: 'border-t-[#D7192D]',
    pdfUrl: '/white-paper/white-1.pdf',
    fileName: 'VR4Web-Estimated-Website-Pricing-Whitepaper.pdf',
    fileSize: '2.4 MB',
    pages: '12 Pages',
  },
  {
    id: 'ai-automation-business',
    category: 'AI & Automation',
    categoryTheme: 'blue',
    status: 'Coming Soon',
    isAvailable: false,
    title: "AI & Automation for Business: What's Actually Worth Investing In",
    description:
      'Cutting through the hype — practical AI use cases that deliver measurable ROI for businesses with limited budgets.',
    topBorder: 'border-t-[#102448]',
  },
  {
    id: 'cloud-migration-playbook',
    category: 'Cloud Solutions',
    categoryTheme: 'red',
    status: 'Coming Soon',
    isAvailable: false,
    title: 'Cloud Migration for Small Businesses: A Step-by-Step Playbook',
    description:
      'Everything you need to know before moving your business systems to the cloud, including cost comparisons and security considerations.',
    topBorder: 'border-t-[#8fb9e8]',
  },
  {
    id: 'mobile-app-development-india',
    category: 'Mobile Apps',
    categoryTheme: 'blue',
    status: 'Coming Soon',
    isAvailable: false,
    title: 'Mobile App Development in India: Costs, Timelines & What to Expect',
    description:
      'A transparent breakdown of what it really costs to build a mobile app, with realistic timelines and what to watch out for.',
    topBorder: 'border-t-[#D7192D]',
  },
  {
    id: 'crm-selection-guide',
    category: 'CRM Solutions',
    categoryTheme: 'red',
    status: 'Coming Soon',
    isAvailable: false,
    title: 'CRM Selection Guide for Growing Indian Businesses',
    description:
      'How to evaluate, choose, and implement a CRM system that actually fits how your sales team works — without enterprise price tags.',
    topBorder: 'border-t-[#102448]',
  },
  {
    id: 'seo-website-performance',
    category: 'SEO & Performance',
    categoryTheme: 'blue',
    status: 'Coming Soon',
    isAvailable: false,
    title: 'SEO & Website Performance: The Technical Foundation Your Business Needs',
    description:
      'Technical SEO and Core Web Vitals explained for business owners — what matters, what doesn’t, and what to fix first.',
    topBorder: 'border-t-[#8fb9e8]',
  },
];

export default function Whitepaper() {
  const [downloadState, setDownloadState] = useState('idle'); // 'idle' | 'downloading' | 'completed'
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // ─── Automatic Download with Interactive Animation ───
  const handleDownload = (paper) => {
    if (downloadState === 'downloading') return;

    setDownloadState('downloading');

    try {
      confetti({
        particleCount: 55,
        spread: 60,
        origin: { y: 0.75 },
        colors: ['#D7192D', '#102448', '#9cc6ee', '#ffffff'],
      });
    } catch (e) {
      // Ignore if confetti fails
    }

    setTimeout(() => {
      const link = document.createElement('a');
      link.href = paper.pdfUrl;
      link.download = paper.fileName;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadState('completed');

      setTimeout(() => {
        setDownloadState('idle');
      }, 4000);
    }, 1200);
  };

  const showComingSoonToast = (title) => {
    setToastMessage(`"${title}" is currently in final review and will be released shortly.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  return (
    <div className="w-full min-h-screen bg-white font-sans text-[#111111] selection:bg-[#D7192D] selection:text-white">
      {/* ─── 1. HERO BANNER (matching Stories page banner height) ─── */}
      <section
        className="relative w-full overflow-hidden px-4 md:px-8 pt-32 pb-12 md:pt-36 md:pb-14 bg-cover bg-center border-b border-slate-200"
        style={{ backgroundImage: `url('/banner/5.png')` }}
      >
        <div className="absolute inset-0 bg-[#102448]/20 z-0" />

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 leading-tight text-white drop-shadow-[0_4px_16px_rgba(16,36,72,0.45)]"
          >
            Actionable Insights &amp; <span className="text-[#102448]">Whitepapers.</span>
          </motion.h1>

          {/* Breadcrumbs Pill */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium bg-[#102448] text-white px-4 py-1.5 rounded-full shadow-md"
          >
            <Link to="/" className="flex items-center gap-1 hover:text-red-300 transition-colors">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/60" />
            <span className="font-semibold">Whitepapers &amp; Playbooks</span>
          </motion.div>
        </div>
      </section>

      {/* ─── 2. WHITEPAPERS GRID ─── */}
      <section className="bg-[#F2F7FD]">
        <div className="py-14 sm:py-18 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {WHITEPAPERS.map((paper, index) => {
              const isRed = paper.categoryTheme === 'red';

              return (
                <motion.div
                  key={paper.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className={`relative flex flex-col justify-between bg-white rounded-[22px] border border-[#D6E4F5] border-t-4 ${paper.topBorder} p-6 sm:p-7 shadow-[0_10px_30px_rgba(16,36,72,0.06)] hover:shadow-[0_20px_45px_rgba(16,36,72,0.12)] hover:-translate-y-1 transition-all duration-300`}
                >
                  <div>
                    {/* Category pill & status */}
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <span
                        className={`inline-block px-3.5 py-1 rounded-full text-xs font-bold ${
                          isRed ? 'bg-red-50 text-[#D7192D]' : 'bg-[#E3EEFB] text-[#102448]'
                        }`}
                      >
                        {paper.category}
                      </span>

                      <span
                        className={`text-xs font-semibold ${
                          paper.isAvailable ? 'text-[#D7192D] font-bold' : 'text-[#102448] font-medium'
                        }`}
                      >
                        {paper.status}
                      </span>
                    </div>

                    {/* Title with document icon */}
                    <div className="flex items-start gap-3.5 mb-4">
                      <div
                        className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ${
                          isRed ? 'bg-red-50 text-[#D7192D]' : 'bg-[#E3EEFB] text-[#102448]'
                        }`}
                      >
                        <FileText className="w-5 h-5" />
                      </div>

                      <h3 className="text-lg sm:text-[19px] font-extrabold text-[#102448] leading-snug tracking-tight">
                        {paper.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-black leading-relaxed font-normal mb-8">
                      {paper.description}
                    </p>
                  </div>

                  {/* Action */}
                  <div className="pt-2">
                    {paper.isAvailable ? (
                      <button
                        type="button"
                        onClick={() => handleDownload(paper)}
                        disabled={downloadState === 'downloading'}
                        className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-[#D7192D] hover:bg-[#102448] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-95 disabled:opacity-90"
                      >
                        {downloadState === 'idle' && (
                          <>
                            <Download className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                            <span>Read Whitepaper</span>
                          </>
                        )}

                        {downloadState === 'downloading' && (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-white" />
                            <span>Downloading Whitepaper...</span>
                          </>
                        )}

                        {downloadState === 'completed' && (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-white" />
                            <span>Downloaded Successfully!</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => showComingSoonToast(paper.title)}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#102448] hover:bg-[#D7192D] text-white text-xs sm:text-sm font-semibold transition-colors duration-200 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 opacity-80" />
                        <span>Coming Soon</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 3. TOAST ─── */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-6 lg:right-10 z-50 max-w-md bg-[#102448] text-white p-4 rounded-2xl shadow-2xl border border-white/20 flex items-start gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-[#D7192D] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Bell className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 pr-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-0.5">
                Playbook Update
              </h4>
              <p className="text-xs text-white/90 leading-relaxed font-normal">{toastMessage}</p>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 4. CTA ─── */}
      <div className="w-full bg-white">
        <CtaSection />
      </div>
    </div>
  );
}