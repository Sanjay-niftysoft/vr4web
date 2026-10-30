import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ExternalLink, 
  Globe
} from 'lucide-react';

const products = [
  {
    id: 1,
    number: "01 / 04",
    shortNum: "01",
    name: "ORM CONSULT",
    shortName: "ORM",
    headlineBlue: "BUILD A STRONGER",
    headlineOrange: "DIGITAL REPUTATION",
    description: "Build trust with smarter online reputation and review management solutions designed to strengthen brand authority and online credibility.",
    highlightText: "ENTERPRISE REPUTATION AND REVIEW DEFENSE DESIGNED TO SAFEGUARD YOUR DIGITAL BRAND EQUITY.",
    url: "https://ormconsult.com/",
    image: "/orm.png",
    logo: "/partners/orm.png?v=2",
    tags: ["Reputation", "Reviews", "Trust", "Crisis Mgmt", "Google Business", "Sentiment"]
  },
  {
    id: 2,
    number: "02 / 04",
    shortNum: "02",
    name: "SEOAD",
    shortName: "SEOAD",
    headlineBlue: "MAXIMIZE YOUR",
    headlineOrange: "AI SEARCH VISIBILITY",
    description: "Targeted digital solutions that increase AI search visibility across Perplexity, ChatGPT, Gemini, and Google with dedicated AEO and GEO optimization.",
    highlightText: "ENGINEERED DIGITAL SOLUTIONS TO INCREASE AI SEARCH VISIBILITY THROUGH NEXT-GEN AEO AND GEO ARCHITECTURE.",
    url: "https://seoad.in/",
    image: "/seoad.png",
    logo: "/partners/seoad.png?v=2",
    tags: ["AI Search Visibility", "AEO", "GEO", "ChatGPT Search", "AI Overviews", "Organic Traffic"]
  },
  {
    id: 3,
    number: "03 / 04",
    shortNum: "03",
    name: "CHAT SUPPORT",
    shortName: "Chat AI", 
    headlineBlue: "TURN EVERY CONVERSATION",
    headlineOrange: "INTO A BETTER EXPERIENCE",
    description: "Create intelligent customer conversations with AI-powered chat and automated support experiences that convert visitors into loyal clients.",
    highlightText: "AUTONOMOUS CONVERSATIONAL PLATFORM TRAINED TO ENGAGE VISITORS AND RESOLVE INQUIRIES 24/7.",
    url: "https://chatsupport.in/",
    image: "/chatbot.png",
    logo: "/partners/chatbot.png?v=2",
    tags: ["Live Chat", "Instant Reply", "Ticketing", "Multi-Agent", "Lead Bot", "Conversational"]
  },
  {
    id: 4,
    number: "04 / 04",
    shortNum: "04",
    name: "SMM CONSULT",
    shortName: "SMM",
    headlineBlue: "MAKE YOUR BRAND MORE",
    headlineOrange: "SOCIAL & RELEVANT",
    description: "Grow your brand through strategic social media management, content production, and meaningful audience engagement that fuels advocacy.",
    highlightText: "HIGH-IMPACT SOCIAL CAMPAIGNS AND VIRAL REACH STRATEGIES THAT FUEL BRAND ADVOCACY.",
    url: "https://smmconsult.com/",
    image: "/smm.png",
    logo: "/partners/smm.png?v=2",
    tags: ["Social", "Content", "Growth", "Viral Loops", "Brand Identity", "Engagement"]
  }
];

export default function ProductShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const progressIntervalRef = useRef(null);

  const ROTATION_TIME = 3200; // 3.2 seconds
  const activeProduct = products[activeIdx];

  // Preload all 4 images and logos on mount
  useEffect(() => {
    products.forEach((p) => {
      const img = new Image();
      img.src = p.image;
      if (p.logo) {
        const logoImg = new Image();
        logoImg.src = p.logo;
      }
    });
  }, []);

  // Handle Autoplay and Progress Bar
  useEffect(() => {
    if (isPaused) {
      clearInterval(progressIntervalRef.current);
      clearTimeout(timerRef.current);
      return;
    }

    setProgress(0);
    const stepTime = 30;
    const stepIncrement = (stepTime / ROTATION_TIME) * 100;

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + stepIncrement;
      });
    }, stepTime);

    timerRef.current = setTimeout(() => {
      setActiveIdx((prev) => (prev + 1) % products.length);
    }, ROTATION_TIME);

    return () => {
      clearInterval(progressIntervalRef.current);
      clearTimeout(timerRef.current);
    };
  }, [activeIdx, isPaused]);

  const handleSelect = (idx) => {
    if (idx === activeIdx) return;
    setActiveIdx(idx);
    setProgress(0);
  };

  return (
    <section className="relative w-full bg-[#f4f6fa] py-8 sm:py-10 md:py-12 lg:py-14 px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 font-['Inter',sans-serif] selection:bg-[#0F3D2E] selection:text-white overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-72 sm:w-96 h-72 sm:h-96 bg-[#E8890C]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-40 w-72 sm:w-96 h-72 sm:h-96 bg-[#0F3D2E]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-[1440px] 4xl:max-w-[2400px] mx-auto relative z-10 w-full">
        
        {/* TOP CENTER HEADER (Responsive across 320px, 768px, 1024px, 1440px) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-6 sm:mb-8 md:mb-9 lg:mb-10 px-2"
        >
          {/* Eyebrow */}
          <div className="flex flex-col items-center mb-2.5 sm:mb-3">
            <span className="text-[#E8890C] font-extrabold text-[11px] xs:text-[12px] sm:text-[13px] tracking-[0.22em] sm:tracking-[0.25em] uppercase mb-1.5">
              OUR PARTNERS
            </span>
            <div className="w-10 sm:w-12 h-1 bg-[#0F3D2E] rounded-full"></div>
          </div>

          {/* Main Heading */}
          <h2 className="text-[22px] xs:text-[26px] sm:text-[32px] md:text-[38px] lg:text-[44px] xl:text-[48px] font-extrabold text-center leading-[1.16] sm:leading-[1.14] tracking-tight mb-3 max-w-4xl">
            <span className="text-[#E8890C]">Proprietary technology that </span>
            <span className="text-[#0F3D2E]">powers business growth.</span>
          </h2>

          {/* Subtitle */}
          <p className="text-black text-[13px] xs:text-[14px] sm:text-[15px] md:text-[16px] lg:text-lg max-w-2xl text-center leading-relaxed font-normal">
            Explore our specialized digital product ecosystem built to elevate reputation, search dominance, customer support, and brand presence.
          </p>
        </motion.div>

        {/* Outer Reference Canvas Card */}
        <div 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative bg-white rounded-[22px] xs:rounded-[26px] sm:rounded-[34px] md:rounded-[40px] lg:rounded-[46px] border border-slate-200/90 shadow-[0_15px_45px_-10px_rgba(15,23,42,0.06)] sm:shadow-[0_25px_70px_-15px_rgba(15,23,42,0.08)] p-4 xs:p-5 sm:p-6 md:p-7 lg:p-8 xl:p-9 overflow-hidden"
        >

          {/* MAIN EDITORIAL LAYOUT (Stacks on 320px/768px, splits 40/60 on 1024px/1440px) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-start">
            
            {/* LEFT CONTENT AREA */}
            <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-between z-10 w-full">
              
              <div>
                {/* LARGE EDITORIAL HEADLINE */}
                <div className="relative mb-4 sm:mb-5 min-h-[110px] xs:min-h-[125px] sm:min-h-[140px] md:min-h-[150px] lg:min-h-[170px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeProduct.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="flex flex-col"
                    >
                      <h3 className="text-[20px] xs:text-[23px] sm:text-[28px] md:text-[32px] lg:text-[28px] xl:text-[36px] font-extrabold leading-[1.14] tracking-tight uppercase">
                        <span className="text-[#E8890C] block">
                          {activeProduct.headlineBlue}
                          {/* Inline avatar pile decoration */}
                          <span className="inline-flex items-center align-middle ml-2 sm:ml-3 -mt-1 space-x-[-6px] sm:space-x-[-7px]">
                            <span className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 rounded-full border-2 border-white bg-slate-200 overflow-hidden inline-block shadow-sm">
                              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" alt="avatar" className="w-full h-full object-cover" />
                            </span>
                            <span className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 rounded-full border-2 border-white bg-slate-300 overflow-hidden inline-block shadow-sm">
                              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" alt="avatar" className="w-full h-full object-cover" />
                            </span>
                            <span className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 rounded-full border-2 border-white bg-[#E8890C] text-white text-[9px] sm:text-[10px] font-bold inline-flex items-center justify-center shadow-sm">
                              +4k
                            </span>
                          </span>
                        </span>
                        <span className="text-[#0F3D2E] block mt-1">
                          {activeProduct.headlineOrange}
                        </span>
                      </h3>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* EDITORIAL SUMMARY WITH GREEN ACCENT SQUARE */}
                <div className="flex items-start gap-2.5 sm:gap-3.5 mb-5 sm:mb-6 md:mb-7">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-sm bg-[#84cc16] mt-1.5 flex-shrink-0 shadow-sm"></div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeProduct.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-1.5 sm:space-y-2"
                    >
                      <p className="text-[11px] sm:text-[12px] md:text-[13px] font-bold tracking-wider uppercase text-slate-700 leading-snug">
                        {activeProduct.highlightText}
                      </p>
                      <p className="text-black text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed font-normal">
                        {activeProduct.description}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* 4 PRODUCT PREVIEW THUMBNAILS (Responsive grid for 320px, 768px, 1024px, 1440px) */}
                <div className="pt-1 sm:pt-2">
                  <div className="grid grid-cols-4 gap-1.5 xs:gap-2 sm:gap-2.5 md:gap-3 max-w-full sm:max-w-md">
                    {products.map((p, idx) => {
                      const isActive = idx === activeIdx;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => handleSelect(idx)}
                          aria-label={`View ${p.name}`}
                          className={`relative flex flex-col items-center p-1 xs:p-1.5 sm:p-2 rounded-xl sm:rounded-2xl transition-all duration-300 cursor-pointer text-left ${
                            isActive
                              ? 'bg-slate-50 ring-2 ring-[#E8890C] shadow-md scale-102 sm:scale-105 z-10'
                              : 'bg-white hover:bg-slate-50 border border-slate-200/80 opacity-75 hover:opacity-100 scale-100'
                          }`}
                        >
                          {/* Thumbnail Image */}
                          <div className="relative w-full aspect-[16/10] rounded-lg sm:rounded-xl overflow-hidden bg-slate-100 mb-1 border border-slate-200/50">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-full h-full object-cover object-center"
                            />
                            {!isActive && <div className="absolute inset-0 bg-white/20"></div>}
                          </div>

                          {/* Title & Progress */}
                          <div className="w-full flex items-center justify-between px-0.5">
                            <span className={`text-[9px] xs:text-[10px] sm:text-[11px] font-bold uppercase tracking-tight truncate ${isActive ? 'text-[#E8890C]' : 'text-slate-700'}`}>
                              {p.shortName}
                            </span>
                            <span className="text-[8px] xs:text-[9px] font-mono text-slate-400 hidden xs:inline-block">
                              {p.shortNum}
                            </span>
                          </div>

                          {/* Continuous Progress Bar for Active Card */}
                          {isActive && (
                            <div className="w-full mt-1 h-0.5 sm:h-1 bg-slate-200 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-[#E8890C]"
                                style={{ width: `${progress}%` }}
                                transition={{ ease: "linear" }}
                              />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT DOMINANT VISUAL HERO AREA (~60% on desktop) */}
            <div className="lg:col-span-7 xl:col-span-7 relative w-full">
              
              {/* MAIN HERO CONTAINER (Responsive heights: 260px on 320px, 420px on 768px, 500px on 1024px, 560px on 1440px) */}
              <div className="relative w-full h-[260px] xs:h-[300px] sm:h-[380px] md:h-[430px] lg:h-[490px] xl:h-[550px] 2xl:h-[580px] rounded-[20px] xs:rounded-[24px] sm:rounded-[30px] md:rounded-[34px] lg:rounded-[38px] overflow-hidden bg-slate-100 border border-slate-200/80 shadow-lg sm:shadow-2xl group">
                
                {/* CINEMATIC LAYERED IMAGE CROSSFADE */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProduct.id}
                    initial={{ opacity: 0, scale: 1.04, x: 25 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.97, x: -20 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={activeProduct.image}
                      alt={activeProduct.name}
                      className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                      loading="eager"
                    />

                    {/* Gradient Overlay for Tag Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-black/15 pointer-events-none"></div>
                  </motion.div>
                </AnimatePresence>

                {/* VERTICAL LEFT PILL TAG */}
                <div className="absolute top-3.5 left-3.5 sm:top-5 sm:left-5 z-20">
                  <a
                    href={activeProduct.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 sm:gap-2 bg-white/95 hover:bg-white text-slate-900 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-full shadow-md backdrop-blur-md transition-all hover:scale-105 group/tag border border-white/80"
                  >
                    <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover/tag:bg-[#0F3D2E] transition-colors">
                      <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                      {activeProduct.name}
                    </span>
                  </a>
                </div>

                {/* BOTTOM RIGHT PILL TAGS CLUSTER (hidden on mobile + tablet, shown from 1024px) */}
                <div className="hidden lg:flex absolute bottom-6 right-6 z-20 max-w-sm flex-wrap justify-end gap-1.5">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeProduct.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35 }}
                      className="flex flex-wrap justify-end gap-1.5"
                    >
                      {activeProduct.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-black/55 hover:bg-black/80 backdrop-blur-md text-white/95 text-[11px] font-medium px-3 py-1 rounded-full border border-white/15 transition-all hover:border-white/40 cursor-default shadow-sm inline-block"
                        >
                          {tag}
                        </span>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* BOTTOM LEFT PARTNER LOGO BADGE */}
                <div className="absolute bottom-3.5 left-3.5 sm:bottom-6 sm:left-6 z-20">
                  <AnimatePresence mode="wait">
                    <motion.a
                      key={activeProduct.id}
                      href={activeProduct.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.9, y: 12 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 12 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="bg-white hover:bg-slate-50 backdrop-blur-md px-3.5 py-2 xs:px-4.5 xs:py-2.5 sm:px-6 sm:py-3 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/95 flex items-center justify-center transition-all duration-300 hover:scale-105 group/logo cursor-pointer"
                      title={`Visit ${activeProduct.name}`}
                    >
                      <img
                        src={activeProduct.logo}
                        alt={`${activeProduct.name} logo`}
                        className="h-8 xs:h-10 sm:h-13 md:h-15 w-auto max-w-[130px] xs:max-w-[160px] sm:max-w-[210px] md:max-w-[240px] object-contain drop-shadow-sm transition-transform duration-300 group-hover/logo:scale-105"
                      />
                    </motion.a>
                  </AnimatePresence>
                </div>

                {/* DIRECT CTA BUTTON OVERLAY (Desktop & Tablet) */}

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}