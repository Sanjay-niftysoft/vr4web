import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, ChevronRight, Home } from 'lucide-react';
import { getAllCaseStudies } from '../../data/caseStudiesData';
import CtaSection from '../../components/CtaSection';

/* ───────── Theme ───────── */
const NAVY = '#102448';
const RED = '#D7192D';

/* Hero background image */
const HERO_BG = '/banner/5.png';

/* ───────── 3D tilt wrapper ───────── */
function TiltCard({ children, className = '' }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 200, damping: 20 });

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.article
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={{ z: 20 }}
        className={className}
      >
        {children}
      </motion.article>
    </div>
  );
}

export default function CaseStudies() {
  const caseStudies = getAllCaseStudies();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="w-full min-h-screen bg-white font-sans text-[#102448] selection:bg-[#D7192D] selection:text-white">
      {/* ─── 1. HERO (short, single background image) ─── */}
      <section
        className="relative w-full overflow-hidden px-4 md:px-8 pt-32 pb-12 md:pt-36 md:pb-14 bg-cover bg-center border-b border-slate-200"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      >
        <div className="absolute inset-0 bg-white/75 backdrop-blur-[1px] z-0" />
        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 leading-tight text-[#102448]"
          >
            Our Successful <span className="text-[#D7192D]">Case Studies</span>
          </motion.h1>

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
            <span className="font-semibold">Case Studies</span>
          </motion.div>
        </div>
      </section>

      {/* ─── 2. SELECTED WORKS ─── */}
      <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-[#D7192D]/10 border border-[#D7192D]/30 text-[#D7192D] text-sm font-bold mb-4">
            Selected Works
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            <span className="text-[#102448]">Real Projects,</span>{' '}
            <span className="text-[#D7192D]">Real Impact</span>
          </h2>

          <p className="text-black text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Explore how we build tailored, high-performance systems and user interfaces for diverse business domains.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {caseStudies.map((study, idx) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="h-full"
            >
              <TiltCard
                className="group h-full flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white text-[#102448]
                           shadow-[0_10px_30px_-12px_rgba(16,36,72,0.25)]
                           transition-colors duration-500 ease-out
                           hover:bg-[#102448] hover:border-[#102448]
                           hover:shadow-[0_30px_60px_-15px_rgba(16,36,72,0.6)]"
              >
                {/* Image — full bleed, fills the whole top of the card */}
                <div className="relative w-full h-56 sm:h-64 overflow-hidden" style={{ transform: 'translateZ(25px)' }}>
                  <img
                    src={study.cardImage}
                    alt={study.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                {/* Body */}
                <div className="px-6 sm:px-7 py-4 flex-1 flex flex-col justify-between" style={{ transform: 'translateZ(15px)' }}>
                  <div>
                    <h3 className="text-base sm:text-lg font-medium tracking-tight leading-snug mb-4 text-[#102448] group-hover:text-white transition-colors duration-500">
                      {study.title}
                    </h3>
                  </div>

                  <div className="pt-3 flex justify-center border-t border-slate-200 group-hover:border-white/20 transition-colors duration-500">
                    {/* Rectangle button with circle arrow box — lifts forward on hover / press */}
                    <Link
                      to={`/stories/${study.id}`}
                      style={{ transform: 'translateZ(0)' }}
                      className="inline-flex items-center gap-3 pl-5 pr-2 py-2 rounded-xl bg-[#D7192D] text-white text-sm sm:text-base font-bold
                                 shadow-[0_6px_0_0_#9d0f1f]
                                 transition-all duration-200 ease-out
                                 hover:-translate-y-1.5 hover:shadow-[0_12px_0_0_#9d0f1f,0_18px_28px_-6px_rgba(215,25,45,0.55)]
                                 active:translate-y-1 active:shadow-[0_2px_0_0_#9d0f1f]
                                 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#D7192D]/40"
                    >
                      <span>Read Case Study</span>
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-[#D7192D] transition-transform duration-300 group-hover:rotate-[-45deg]">
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </Link>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── 3. CTA ─── */}
      <CtaSection />
    </div>
  );
}