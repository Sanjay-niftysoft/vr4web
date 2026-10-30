import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Target, 
  TrendingUp, 
  MessageSquare, 
  Handshake, 
  ArrowRight
} from 'lucide-react';

export default function WhyChooseUsSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-[#F8FCFF] py-8 sm:py-10 md:py-12 lg:py-14 px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 font-['Inter',sans-serif] overflow-hidden selection:bg-[#0F3D2E] selection:text-white"
    >
      {/* ========================================================================= */}
      {/* FUTURISTIC ARCHITECTURAL BACKGROUND (Central Towers, Sunrise & Plaza)     */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Background Architectural Canvas */}
        <img 
          src="/whychoose/bg_architecture.jpg"
          alt="Architectural Background"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-85 transition-opacity duration-1000 select-none pointer-events-none"
        />

        {/* Ambient Top & Side Vignette to ensure maximum text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8FCFF] via-[#F8FCFF]/40 to-[#F8FCFF]/70" />
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#F8FCFF] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#F8FCFF] to-transparent" />

        {/* Subtle Light Rays / Golden Center Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-[#0F3D2E]/10 via-[#F59E0B]/15 to-[#E8890C]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-[1440px] 4xl:max-w-[2400px] mx-auto relative z-10 flex flex-col justify-between h-full">

        {/* ========================================================================= */}
        {/* TOP SECTION: EYEBROW, TWO-TONE HEADING & PROCESS LINE                     */}
        {/* ========================================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-6 sm:mb-8 lg:mb-9"
        >
          {/* Tag: bold gold uppercase text + short green rounded underline */}
          <div className="flex flex-col items-center mb-3 sm:mb-4">
            <span className="text-[#E8890C] font-bold text-xs sm:text-sm lg:text-base tracking-[0.2em] pl-[0.2em] uppercase text-center">
              Why Choose Us
            </span>
            <span className="mt-2 sm:mt-2.5 block w-10 sm:w-12 lg:w-14 h-[3px] rounded-full bg-[#0F3D2E]"></span>
          </div>

          {/* Main Heading */}
          <h2 className="text-[20px] xs:text-[24px] sm:text-[34px] md:text-[42px] lg:text-[48px] font-extrabold text-center leading-[1.18] tracking-tight mb-2.5 sm:mb-4 px-2">
            <span className="text-[#E8890C] block">Technology built around</span>
            <span className="text-[#0F3D2E] block mt-0.5 sm:mt-1">your business.</span>
          </h2>


          {/* CENTER PROCESS LINE */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center flex-wrap justify-center gap-1.5 xs:gap-2 sm:gap-3 px-3 sm:px-5 py-1.5 sm:py-2 rounded-xl sm:rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-sm max-w-full text-center"
          >
            <span className="text-[9px] xs:text-[10px] sm:text-[12px] font-bold tracking-[0.1em] sm:tracking-[0.18em] uppercase text-[#E8890C]">IDEAS</span>
            <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#0F3D2E] flex-shrink-0" />
            <span className="text-[9px] xs:text-[10px] sm:text-[12px] font-bold tracking-[0.1em] sm:tracking-[0.18em] uppercase text-[#E8890C]">SOLUTIONS</span>
            <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#0F3D2E] flex-shrink-0" />
            <span className="text-[9px] xs:text-[10px] sm:text-[12px] font-bold tracking-[0.1em] sm:tracking-[0.18em] uppercase text-[#E8890C]">AI SEARCH VISIBILITY</span>
            <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#0F3D2E] flex-shrink-0" />
            <span className="text-[9px] xs:text-[10px] sm:text-[12px] font-bold tracking-[0.1em] sm:tracking-[0.18em] uppercase text-[#E8890C]">GROWTH</span>
          </motion.div>
        </motion.div>

        {/* ========================================================================= */}
        {/* FOUR 3D FEATURE CARDS (Framing the central architecture symmetrically)   */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 xl:gap-12 my-auto py-2 sm:py-5 [perspective:1400px]">
          
          {/* ----------------------------------------------------------------------- */}
          {/* CARD 01 (TOP LEFT): BUSINESS FIRST                                      */}
          {/* ----------------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, x: -40, rotateY: 8 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, scale: 1.02, rotateY: 3 }}
            className="group relative bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-[30px] border border-white/90 shadow-[0_20px_50px_rgba(232,137,12,0.07)] hover:shadow-[0_25px_60px_rgba(15,61,46,0.12)] transition-all duration-500 overflow-hidden flex flex-col sm:flex-row items-stretch min-h-[190px] sm:min-h-[220px]"
          >
            {/* Left Content */}
            <div className="flex-1 p-4 xs:p-5 sm:p-6 lg:p-7 flex flex-col justify-between z-10">
              <div>

                {/* Heading */}
                <h3 className="text-base xs:text-lg sm:text-2xl font-bold text-[#E8890C] tracking-tight mb-1">
                  Business First
                </h3>
                <div className="w-7 h-0.5 bg-[#0F3D2E] rounded-full mb-2.5"></div>

                {/* Description */}
                <p className="text-[#111111] text-[13px] sm:text-[14px] leading-relaxed font-normal max-w-xs">
                  We start with your business goals and build technology solutions that deliver real outcomes. Every solution is shaped around your priorities, customers and long-term growth.
                </p>
              </div>
            </div>

            {/* Right Diagonal Cut Architectural Image */}
            <div 
              className="relative w-full sm:w-[42%] h-28 xs:h-32 sm:h-auto overflow-hidden flex-shrink-0"
              style={{
                clipPath: 'polygon(12% 0, 100% 0, 100% 100%, 0% 100%)'
              }}
            >
              <img 
                src="/whychoose/card1_business.jpg" 
                alt="Business First Architecture"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* ----------------------------------------------------------------------- */}
          {/* CARD 02 (TOP RIGHT): BUILT TO SCALE                                     */}
          {/* ----------------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotateY: -8 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, scale: 1.02, rotateY: -3 }}
            className="group relative bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-[30px] border border-white/90 shadow-[0_20px_50px_rgba(232,137,12,0.07)] hover:shadow-[0_25px_60px_rgba(232,137,12,0.12)] transition-all duration-500 overflow-hidden flex flex-col-reverse sm:flex-row items-stretch min-h-[190px] sm:min-h-[220px]"
          >
            {/* Left Diagonal Cut Architectural Image */}
            <div 
              className="relative w-full sm:w-[42%] h-28 xs:h-32 sm:h-auto overflow-hidden flex-shrink-0"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 88% 100%, 0% 100%)'
              }}
            >
              <img 
                src="/whychoose/card2_scale.jpg" 
                alt="Built to Scale Architecture"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-white/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Right Content */}
            <div className="flex-1 p-4 xs:p-5 sm:p-6 lg:p-7 flex flex-col justify-between z-10">
              <div>


                {/* Heading */}
                <h3 className="text-base xs:text-lg sm:text-2xl font-bold text-[#E8890C] tracking-tight mb-1">
                  Built to Scale
                </h3>
                <div className="w-7 h-0.5 bg-[#0F3D2E] rounded-full mb-2.5"></div>

                {/* Description */}
                <p className="text-[#111111] text-[13px] sm:text-[14px] leading-relaxed font-normal max-w-xs">
                  We create scalable digital solutions that increase AI search visibility. Built with future-ready AEO and GEO frameworks, our technology evolves as AI engines grow.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ----------------------------------------------------------------------- */}
          {/* CARD 03 (BOTTOM LEFT): CLEAR DELIVERY                                   */}
          {/* ----------------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, x: -40, rotateY: 8 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, scale: 1.02, rotateY: 3 }}
            className="group relative bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-[30px] border border-white/90 shadow-[0_20px_50px_rgba(232,137,12,0.07)] hover:shadow-[0_25px_60px_rgba(232,137,12,0.12)] transition-all duration-500 overflow-hidden flex flex-col sm:flex-row items-stretch min-h-[190px] sm:min-h-[220px]"
          >
            {/* Left Content */}
            <div className="flex-1 p-4 xs:p-5 sm:p-6 lg:p-7 flex flex-col justify-between z-10">
              <div>


                {/* Heading */}
                <h3 className="text-base xs:text-lg sm:text-2xl font-bold text-[#E8890C] tracking-tight mb-1">
                  Clear Delivery
                </h3>
                <div className="w-7 h-0.5 bg-[#0F3D2E] rounded-full mb-2.5"></div>

                {/* Description */}
                <p className="text-[#111111] text-[13px] sm:text-[14px] leading-relaxed font-normal max-w-xs">
We believe in transparent communication, predictable processes and reliable delivery. From planning to launch, you always know what is happening and what comes next.                </p>
              </div>
            </div>

            {/* Right Diagonal Cut Architectural Image */}
            <div 
              className="relative w-full sm:w-[42%] h-28 xs:h-32 sm:h-auto overflow-hidden flex-shrink-0"
              style={{
                clipPath: 'polygon(12% 0, 100% 0, 100% 100%, 0% 100%)'
              }}
            >
              <img 
                src="/whychoose/card3_delivery.jpg" 
                alt="Clear Delivery Architecture"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* ----------------------------------------------------------------------- */}
          {/* CARD 04 (BOTTOM RIGHT): LONG-TERM PARTNERSHIP                            */}
          {/* ----------------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotateY: -8 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, scale: 1.02, rotateY: -3 }}
            className="group relative bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-[30px] border border-white/90 shadow-[0_20px_50px_rgba(232,137,12,0.07)] hover:shadow-[0_25px_60px_rgba(15,61,46,0.12)] transition-all duration-500 overflow-hidden flex flex-col-reverse sm:flex-row items-stretch min-h-[190px] sm:min-h-[220px]"
          >
            {/* Left Diagonal Cut Architectural Image */}
            <div 
              className="relative w-full sm:w-[42%] h-28 xs:h-32 sm:h-auto overflow-hidden flex-shrink-0"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 88% 100%, 0% 100%)'
              }}
            >
              <img 
                src="/whychoose/card4_partnership.jpg" 
                alt="Long-Term Partnership Architecture"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-white/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Right Content */}
            <div className="flex-1 p-4 xs:p-5 sm:p-6 lg:p-7 flex flex-col justify-between z-10">
              <div>
                {/* Header Icon + Number Badge */}


                {/* Heading */}
                <h3 className="text-base xs:text-lg sm:text-2xl font-bold text-[#E8890C] tracking-tight mb-1">
                  Long-Term Partnership
                </h3>
                <div className="w-7 h-0.5 bg-[#0F3D2E] rounded-full mb-2.5"></div>

                {/* Description */}
                <p className="text-[#111111] text-[13px] sm:text-[14px] leading-relaxed font-normal max-w-xs">
                  We stay involved beyond launch to continuously improve and support your technology. As your business evolves, we help your digital solutions evolve with it.                </p>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}