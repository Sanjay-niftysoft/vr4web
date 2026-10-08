import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CtaSection() {
  return (
    <section className="relative w-full bg-white overflow-hidden py-0 my-0">
      {/* ─────────────────────────────────────────────────────────────
          MAIN CTA CONTAINER (Sleek, Proportional Organic Ribbon)
      ───────────────────────────────────────────────────────────── */}
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

          {/* ─────────────────────────────────────────────────────────
              TOP WAVE CUTOUT
          ───────────────────────────────────────────────────────── */}
          <div className="absolute top-0 left-0 right-0 w-full pointer-events-none z-20 select-none overflow-hidden h-[28px] sm:h-[36px] md:h-[48px] lg:h-[60px] xl:h-[70px] 4xl:h-[85px]">
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

          {/* ─────────────────────────────────────────────────────────
              BOTTOM WAVE CUTOUT
          ───────────────────────────────────────────────────────── */}
          <div className="absolute bottom-0 left-0 right-0 w-full pointer-events-none z-20 select-none overflow-hidden h-[28px] sm:h-[36px] md:h-[48px] lg:h-[60px] xl:h-[70px] 4xl:h-[85px]">
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

          {/* ─────────────────────────────────────────────────────────
              LEFT AUSTRALIAN VISUAL (Realistic Waving Flag Fabric)
          ───────────────────────────────────────────────────────── */}
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

          {/* ─────────────────────────────────────────────────────────
              RIGHT AUSTRALIAN VISUAL (Famous Cricket Stadium: SCG / cricket.png)
          ───────────────────────────────────────────────────────── */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="absolute right-0 bottom-0 top-0 w-[44%] sm:w-[40%] md:w-[36%] lg:w-[35%] xl:w-[32%] 4xl:w-[28%] pointer-events-none z-10 select-none overflow-hidden"
          >
            <div 
              className="relative w-full h-full opacity-20 sm:opacity-55 md:opacity-75 lg:opacity-90 xl:opacity-100"
              style={{
                maskImage: 'radial-gradient(ellipse 95% 90% at 88% 55%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.88) 45%, rgba(0,0,0,0.2) 75%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 95% 90% at 88% 55%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.88) 45%, rgba(0,0,0,0.2) 75%, rgba(0,0,0,0) 100%)',
              }}
            >
              <img 
                src="/cricket.png" 
                alt="Famous Australian Cricket Stadium"
                className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.05]"
              />
              <div 
                className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0B4F9C]/30 to-[#0B4F9C]"
              />
            </div>
          </motion.div>

          {/* ─────────────────────────────────────────────────────────
              CONTENT CONTAINER
              Mobile 320px: Compact reduced button, clean vertical stack.
              Tablet 768px: Text moved to right (away from flag), compact button stacked underneath.
              1440px & 2560px: PRESERVED EXACTLY AS PERFECT.
          ───────────────────────────────────────────────────────── */}
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
                  <span className="text-[#F97316]">a technology provider</span>
                </h2>
              </motion.div>

              {/* Right Column: CTA Button */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="flex flex-col items-start lg:items-end justify-center flex-shrink-0"
              >
                <a
                  href="/contact"
                  className="group relative inline-flex items-center justify-between gap-2 xs:gap-2.5 sm:gap-3 md:gap-3.5 lg:gap-4 xl:gap-5 bg-[#F97316] hover:bg-[#ff7b21] active:scale-[0.98] text-white font-bold text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[17px] 4xl:text-[21px] px-3 xs:px-3.5 sm:px-4 md:px-4.5 lg:px-6 xl:px-8 4xl:px-11 py-2 xs:py-2.5 sm:py-2.5 md:py-3 lg:py-3.5 xl:py-5 4xl:py-6 rounded-[9px] xs:rounded-[10px] sm:rounded-xl md:rounded-[14px] lg:rounded-[18px] xl:rounded-[22px] 4xl:rounded-[28px] shadow-[0_6px_16px_rgba(249,115,22,0.32)] md:shadow-[0_8px_20px_rgba(249,115,22,0.36)] xl:shadow-[0_14px_30px_rgba(249,115,22,0.48)] transform hover:-translate-y-0.5 md:hover:-translate-y-1 transition-all duration-300 w-auto box-border"
                >
                  <span className="tracking-tight whitespace-nowrap">
                    Let's Build Your Next Solution
                  </span>

                  {/* White circular arrow container */}
                  <div className="w-5 h-5 xs:w-6 xs:h-6 sm:w-6.5 sm:h-6.5 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-11 xl:h-11 4xl:w-14 4xl:h-14 rounded-full bg-white flex items-center justify-center text-[#F97316] shadow-sm flex-shrink-0 group-hover:translate-x-1 sm:group-hover:translate-x-1.5 transition-transform duration-300 ml-1 xs:ml-1.5 md:ml-2">
                    <ArrowRight className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-4.5 lg:h-4.5 xl:w-5 xl:h-5 4xl:w-7 4xl:h-7 stroke-[2.4]" />
                  </div>
                </a>
              </motion.div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
