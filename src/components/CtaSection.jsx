import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function CtaSection({ isHome: isHomeProp }) {
  const location = useLocation();
  const isHome = isHomeProp !== undefined ? isHomeProp : (location.pathname === '/' || location.pathname === '');

  // ─────────────────────────────────────────────────────────────
  // OTHER PAGES VARIANT: lighter blue box, no dark shadow / border
  // ─────────────────────────────────────────────────────────────
  if (!isHome) {
    return (
      <section className="relative z-10 w-full bg-white py-8 sm:py-10 lg:py-12 overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="relative w-full rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-none border-0 outline-none flex items-center justify-center min-h-[200px] sm:min-h-[220px] lg:min-h-[240px]"
            style={{
              /* lighter, brighter blue (was very dark navy) */
              background: 'linear-gradient(135deg, #4A9BE8 0%, #2A86DE 50%, #1479D6 100%)',
            }}
          >
            {/* Subtle dot texture */}
            <div
              className="absolute inset-0 opacity-[0.06] pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
                backgroundSize: '28px 28px',
              }}
            />

            {/* Soft light glow (replaces the dark vignette) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[700px] h-[200px] md:h-[280px] bg-white/15 rounded-full blur-[80px] md:blur-[100px] pointer-events-none" />

            {/* Content Container */}
            <div className="relative z-30 w-full px-6 sm:px-8 md:px-12 lg:px-16 py-7 sm:py-8 lg:py-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-12 w-full">
                {/* Left Column: Headline */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-full lg:max-w-2xl xl:max-w-3xl"
                >
                  <h2 className="text-white font-extrabold text-[20px] xs:text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[40px] leading-[1.15] tracking-tight">
                    A technology partner<br />
                    <span className="text-white">not just </span>
                    <span className="text-[#FFD43B]">a technology provider</span>
                  </h2>
                  <p className="text-white text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px] font-normal mt-2 sm:mt-3 max-w-xl leading-relaxed">
                    Ready to deploy digital solutions that increase AI search visibility? Power your brand with advanced AEO and GEO technology today.
                  </p>
                </motion.div>

                {/* Right Column: CTA Button */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="flex flex-col items-start lg:items-end justify-center flex-shrink-0"
                >
                  <Link
                    to="/contact"
                    className="group relative inline-flex items-center justify-between gap-3 sm:gap-4 bg-[#D92419] hover:bg-[#C21E14] active:scale-[0.98] text-white font-bold text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] px-5 sm:px-7 lg:px-8 py-3 sm:py-3.5 lg:py-4 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 w-auto box-border"
                  >
                    <span className="tracking-tight whitespace-nowrap">
                      Let's Build Your Next Solution
                    </span>
                    <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full bg-white flex items-center justify-center text-[#D92419] flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300">
                      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 stroke-[2.4]" />
                    </div>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // HOME PAGE VARIANT: Waving organic ribbon, ONLY Australian flag (unchanged)
  // ─────────────────────────────────────────────────────────────
  return (
    <section className="relative z-10 w-full bg-white overflow-hidden py-0 -my-[2px] !border-0 !shadow-none outline-none">
      <div className="relative w-full mx-auto overflow-hidden">

        {/* Deep Blue Content Canvas - Responsive Height */}
        <div
          className="relative w-full min-h-[200px] xs:min-h-[220px] sm:min-h-[240px] md:min-h-[260px] lg:min-h-[300px] xl:min-h-[320px] 4xl:min-h-[400px] flex items-center justify-center overflow-hidden"
          style={{
            background: 'radial-gradient(ellipse 90% 80% at 50% 50%, #1059ab 0%, #0B4F9C 55%, #083c77 100%)',
          }}
        >
          {/* Subtle Technology Grid / Ambient Texture */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
              backgroundSize: '28px 28px',
            }}
          />

          {/* Soft Center Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[700px] 4xl:w-[1100px] h-[200px] md:h-[280px] 4xl:h-[420px] bg-[#1a6ec9]/25 rounded-full blur-[80px] md:blur-[100px] 4xl:blur-[140px] pointer-events-none" />

          {/* EDGE-SEAM KILLERS */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-white z-[25] pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white z-[25] pointer-events-none" />

          {/* TOP WAVE CUTOUT */}
          <div className="absolute -top-px left-0 right-0 w-full pointer-events-none z-20 select-none overflow-hidden h-[28px] sm:h-[36px] md:h-[48px] lg:h-[60px] xl:h-[70px] 4xl:h-[85px]">
            <svg
              viewBox="0 0 1440 70"
              fill="none"
              preserveAspectRatio="none"
              className="w-full h-full block"
            >
              <path
                d="M 0 0 L 1440 0 L 1440 12 C 1300 16 1180 38 1050 46 C 900 54 740 35 560 24 C 370 12 170 24 0 16 Z"
                fill="#FFFFFF"
              />
            </svg>
          </div>

          {/* BOTTOM WAVE CUTOUT */}
          <div className="absolute -bottom-px left-0 right-0 w-full pointer-events-none z-20 select-none overflow-hidden h-[28px] sm:h-[36px] md:h-[48px] lg:h-[60px] xl:h-[70px] 4xl:h-[85px]">
            <svg
              viewBox="0 0 1440 70"
              fill="none"
              preserveAspectRatio="none"
              className="w-full h-full block"
            >
              <path
                d="M 0 70 L 1440 70 L 1440 32 C 1290 38 1130 52 940 55 C 720 56 520 28 310 25 C 160 22 0 40 0 40 Z"
                fill="#FFFFFF"
              />
            </svg>
          </div>

          {/* LEFT AUSTRALIAN VISUAL (Only Flag Visual, as requested) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-0 bottom-0 w-[32%] sm:w-[28%] md:w-[24%] lg:w-[24%] xl:w-[22%] 4xl:w-[22%] pointer-events-none z-10 select-none overflow-hidden"
          >
            <div
              className="relative w-full h-full opacity-20 sm:opacity-45 md:opacity-75 lg:opacity-90 xl:opacity-100"
              style={{
                maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0) 100%)',
              }}
            >
              <img
                src="/australia-flag-waving.jpg"
                alt="Australian Flag Fabric"
                className="w-full h-full object-cover object-left"
              />
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0B4F9C]/40 to-[#0B4F9C]"
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>
          </motion.div>

          {/* CONTENT CONTAINER */}
          <div className="relative z-30 max-w-7xl 4xl:max-w-[2400px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-18 4xl:px-24 py-6 xs:py-7 sm:py-8 md:py-10 lg:py-14 4xl:py-18 w-full">
            <div className="flex flex-col md:flex-col lg:flex-row lg:items-center lg:justify-between gap-3 xs:gap-4 md:gap-4 lg:gap-12 w-full md:ml-24 lg:ml-12 xl:ml-10 4xl:ml-16">

              {/* Left Column: Headline */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-full md:max-w-xl lg:max-w-2xl xl:max-w-3xl 4xl:max-w-5xl"
              >
                <h2 className="text-white font-extrabold text-[17px] xs:text-[20px] sm:text-[24px] md:text-[27px] lg:text-[38px] xl:text-[46px] 4xl:text-[58px] leading-[1.15] tracking-tight">
                  A technology partner<br />
                  <span className="text-white">not just </span>
                  <span className="text-[#D92419]">a technology provider</span>
                </h2>
                <p className="text-white/85 text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] 4xl:text-[20px] font-normal mt-2 sm:mt-3 max-w-xl leading-relaxed">
                  Ready to deploy digital solutions that increase AI search visibility? Power your brand with advanced AEO and GEO technology today.
                </p>
              </motion.div>

              {/* Right Column: CTA Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="flex flex-col items-start lg:items-end justify-center flex-shrink-0"
              >
                <Link
                  to="/contact"
                  className="group relative inline-flex items-center justify-between gap-2 xs:gap-2.5 sm:gap-3 md:gap-3.5 lg:gap-4 xl:gap-5 bg-[#D92419] hover:bg-[#C21E14] active:scale-[0.98] text-white font-bold text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[17px] 4xl:text-[21px] px-3 xs:px-3.5 sm:px-4 md:px-4.5 lg:px-6 xl:px-8 4xl:px-11 py-2 xs:py-2.5 sm:py-2.5 md:py-3 lg:py-3.5 xl:py-5 4xl:py-6 rounded-[9px] xs:rounded-[10px] sm:rounded-xl md:rounded-[14px] lg:rounded-[18px] xl:rounded-[22px] 4xl:rounded-[28px] shadow-[0_6px_16px_rgba(217,36,25,0.32)] md:shadow-[0_8px_20px_rgba(217,36,25,0.36)] xl:shadow-[0_14px_30px_rgba(217,36,25,0.48)] transform hover:-translate-y-0.5 md:hover:-translate-y-1 transition-all duration-300 w-auto box-border"
                >
                  <span className="tracking-tight whitespace-nowrap">
                    Let's Build Your Next Solution
                  </span>

                  {/* White circular arrow container */}
                  <div className="w-5 h-5 xs:w-6 xs:h-6 sm:w-6.5 sm:h-6.5 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-11 xl:h-11 4xl:w-14 4xl:h-14 rounded-full bg-white flex items-center justify-center text-[#D92419] shadow-sm flex-shrink-0 group-hover:translate-x-1 sm:group-hover:translate-x-1.5 transition-transform duration-300 ml-1 xs:ml-1.5 md:ml-2">
                    <ArrowRight className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-4.5 lg:h-4.5 xl:w-5 xl:h-5 4xl:w-7 4xl:h-7 stroke-[2.4]" />
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}