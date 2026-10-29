import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function TestimonialsSection({ className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const existingScript = containerRef.current.querySelector('script[src*="widget.js"]');
    if (existingScript) existingScript.remove();

    const script = document.createElement('script');
    script.src = 'https://backend.ormconsult.com/embed/widget.js';
    script.setAttribute('data-widget-id', '43');
    script.setAttribute('data-widget-type', 'google_reviews');
    script.setAttribute('data-api-base', 'https://backend.ormconsult.com');
    script.async = true;

    containerRef.current.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <section 
      aria-label="Client Stories"
      className={`relative w-full bg-[#F8FCFF] py-10 sm:py-14 md:py-16 lg:py-20 px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 font-['Inter',sans-serif] overflow-hidden select-none ${className}`}
    >
      {/* ─────────────────────────────────────────────────────────
          SUBTLE AMBIENT BACKGROUND ACCENTS (Matching WhyChooseUs & Home)
      ───────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft radial glow in center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#E8890C]/5 via-[#0F3D2E]/5 to-[#E8890C]/5 rounded-full blur-3xl" />
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #E8890C 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="w-full max-w-[1240px] xl:max-w-[1320px] 2xl:max-w-[1400px] mx-auto relative z-10 flex flex-col items-center">
        
        {/* ─────────────────────────────────────────────────────────
            HEADER AREA: EXACT WHY CHOOSE US & CLIENTS DESIGN SYSTEM
        ───────────────────────────────────────────────────────── */}
        <motion.div 
          initial={{ opacity: 0, y: -18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12 lg:mb-14"
        >
          {/* Eyebrow with Green Accent Bar */}
          <div className="flex flex-col items-center mb-2.5 sm:mb-3">
            <span className="text-[#E8890C] font-extrabold text-[11px] xs:text-[12px] sm:text-[13px] tracking-[0.25em] uppercase mb-1.5">
              CLIENT STORIES
            </span>
            <div className="w-12 h-1 bg-[#0F3D2E] rounded-full" />
          </div>

          {/* Main 2-Tone Heading */}
          <h2 className="text-[26px] xs:text-[32px] sm:text-[40px] md:text-[46px] lg:text-[52px] font-extrabold text-center leading-[1.12] tracking-tight mb-2.5 sm:mb-3.5">
            <span className="text-[#E8890C]">What Our </span>
            <span className="text-[#0F3D2E]">Clients Say</span>
          </h2>

          {/* Supporting Paragraph */}
          <p className="text-[#111111] font-medium text-xs sm:text-[13.5px] md:text-[14.5px] leading-relaxed max-w-[660px] mx-auto px-2">
            Real experiences from clients who trusted us to deliver quality, reliability, and exceptional results.
          </p>
        </motion.div>

        {/* ─────────────────────────────────────────────────────────
            LIVE WIDGETCRAFT GOOGLE REVIEWS / TESTIMONIALS WIDGET
        ───────────────────────────────────────────────────────── */}
        <div ref={containerRef} className="w-full min-h-[360px] pt-2 pb-4">
          <div id="widgetcraft-43"></div>
        </div>

      </div>
    </section>
  );
}
