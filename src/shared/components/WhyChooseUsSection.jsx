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
      className="relative w-full bg-[#F8FCFF] py-8 sm:py-10 md:py-12 lg:py-14 px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 font-['Inter',sans-serif] overflow-hidden selection:bg-[#F97316] selection:text-white"
    >
      {/* ========================================================================= */}
      {/* FUTURISTIC ARCHITECTURAL BACKGROUND (Central Towers, Sunrise & Plaza)     */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Background Architectural Canvas */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-85 transition-opacity duration-1000"
          style={{ backgroundImage: `url('/whychoose/bg_architecture.jpg')` }}
        />

        {/* Ambient Top & Side Vignette to ensure maximum text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8FCFF] via-[#F8FCFF]/40 to-[#F8FCFF]/70" />
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#F8FCFF] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#F8FCFF] to-transparent" />

        {/* Subtle Light Rays / Golden Center Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-[#F97316]/10 via-[#F59E0B]/15 to-[#38BDF8]/10 rounded-full blur-3xl pointer-events-none" />
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
          {/* Eyebrow */}
          <div className="flex flex-col items-center mb-2.5 sm:mb-3">
            <span className="text-[#0B3B82] font-extrabold text-[11px] xs:text-[12px] sm:text-[13px] tracking-[0.25em] uppercase mb-1.5">
              WHY CHOOSE US
            </span>
            <div className="w-12 h-1 bg-[#F97316] rounded-full"></div>
          </div>

          {/* Main Heading */}
          <h2 className="text-[28px] xs:text-[34px] sm:text-[44px] md:text-[50px] lg:text-[56px] font-extrabold text-center leading-[1.12] tracking-tight mb-3 sm:mb-4">
            <span className="text-[#0B3B82] block">Technology built around</span>
            <span className="text-[#F97316] block mt-0.5 sm:mt-1">your business.</span>
          </h2>


          {/* CENTER PROCESS LINE */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center flex-wrap justify-center gap-2 xs:gap-3 sm:gap-4 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full bg-white/70 backdrop-blur-md border border-slate-200/60 shadow-sm"
          >
            <span className="text-[11px] xs:text-[12px] sm:text-[13px] font-bold tracking-[0.2em] uppercase text-[#0B3B82]">IDEAS</span>
            <ArrowRight className="w-3 h-3 text-[#F97316]" />
            <span className="text-[11px] xs:text-[12px] sm:text-[13px] font-bold tracking-[0.2em] uppercase text-[#0B3B82]">SOLUTIONS</span>
            <ArrowRight className="w-3 h-3 text-[#F97316]" />
            <span className="text-[11px] xs:text-[12px] sm:text-[13px] font-bold tracking-[0.2em] uppercase text-[#0B3B82]">GROWTH</span>
            <ArrowRight className="w-3 h-3 text-[#F97316]" />
            <span className="text-[11px] xs:text-[12px] sm:text-[13px] font-bold tracking-[0.2em] uppercase text-[#0B3B82]">TOGETHER</span>
          </motion.div>
        </motion.div>

        {/* ========================================================================= */}
        {/* FOUR 3D FEATURE CARDS (Framing the central architecture symmetrically)   */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-x-20 lg:gap-y-8 xl:gap-x-28 my-auto py-4 sm:py-6 [perspective:1400px]">
          
          {/* ----------------------------------------------------------------------- */}
          {/* CARD 01 (TOP LEFT): BUSINESS FIRST                                      */}
          {/* ----------------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, x: -40, rotateY: 8 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, scale: 1.02, rotateY: 3 }}
            className="group relative bg-white/90 backdrop-blur-xl rounded-[28px] sm:rounded-[34px] border border-white/90 shadow-[0_20px_50px_rgba(11,59,130,0.07)] hover:shadow-[0_25px_60px_rgba(249,115,22,0.12)] transition-all duration-500 overflow-hidden flex flex-col sm:flex-row items-stretch min-h-[190px] sm:min-h-[220px]"
          >
            {/* Left Content */}
            <div className="flex-1 p-5 sm:p-6 lg:p-7 flex flex-col justify-between z-10">
              <div>


                {/* Heading */}
                <h3 className="text-xl sm:text-2xl font-bold text-[#0B3B82] tracking-tight mb-1">
                  Business First
                </h3>
                <div className="w-7 h-0.5 bg-[#F97316] rounded-full mb-2.5"></div>

                {/* Description */}
                <p className="text-[#111111] text-[13px] sm:text-[14px] leading-relaxed font-normal max-w-xs">
                  We start with your business goals and build technology solutions that deliver real outcomes. Every solution is shaped around your priorities, customers and long-term growth.                </p>
              </div>
            </div>

            {/* Right Diagonal Cut Architectural Image */}
            <div 
              className="relative w-full sm:w-[42%] h-40 sm:h-auto overflow-hidden flex-shrink-0"
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
            className="group relative bg-white/90 backdrop-blur-xl rounded-[28px] sm:rounded-[34px] border border-white/90 shadow-[0_20px_50px_rgba(11,59,130,0.07)] hover:shadow-[0_25px_60px_rgba(11,59,130,0.12)] transition-all duration-500 overflow-hidden flex flex-col-reverse sm:flex-row items-stretch min-h-[190px] sm:min-h-[220px]"
          >
            {/* Left Diagonal Cut Architectural Image */}
            <div 
              className="relative w-full sm:w-[42%] h-40 sm:h-auto overflow-hidden flex-shrink-0"
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
            <div className="flex-1 p-5 sm:p-6 lg:p-7 flex flex-col justify-between z-10">
              <div>


                {/* Heading */}
                <h3 className="text-xl sm:text-2xl font-bold text-[#0B3B82] tracking-tight mb-1">
                  Built to Scale
                </h3>
                <div className="w-7 h-0.5 bg-[#F97316] rounded-full mb-2.5"></div>

                {/* Description */}
                <p className="text-[#111111] text-[13px] sm:text-[14px] leading-relaxed font-normal max-w-xs">
                  We create flexible and scalable solutions that grow alongside your business. Our technology is built to adapt as your needs evolve and new opportunities emerge.                </p>
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
            className="group relative bg-white/90 backdrop-blur-xl rounded-[28px] sm:rounded-[34px] border border-white/90 shadow-[0_20px_50px_rgba(11,59,130,0.07)] hover:shadow-[0_25px_60px_rgba(11,59,130,0.12)] transition-all duration-500 overflow-hidden flex flex-col sm:flex-row items-stretch min-h-[190px] sm:min-h-[220px]"
          >
            {/* Left Content */}
            <div className="flex-1 p-5 sm:p-6 lg:p-7 flex flex-col justify-between z-10">
              <div>


                {/* Heading */}
                <h3 className="text-xl sm:text-2xl font-bold text-[#0B3B82] tracking-tight mb-1">
                  Clear Delivery
                </h3>
                <div className="w-7 h-0.5 bg-[#F97316] rounded-full mb-2.5"></div>

                {/* Description */}
                <p className="text-[#111111] text-[13px] sm:text-[14px] leading-relaxed font-normal max-w-xs">
We believe in transparent communication, predictable processes and reliable delivery. From planning to launch, you always know what is happening and what comes next.                </p>
              </div>
            </div>

            {/* Right Diagonal Cut Architectural Image */}
            <div 
              className="relative w-full sm:w-[42%] h-40 sm:h-auto overflow-hidden flex-shrink-0"
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
            className="group relative bg-white/90 backdrop-blur-xl rounded-[28px] sm:rounded-[34px] border border-white/90 shadow-[0_20px_50px_rgba(11,59,130,0.07)] hover:shadow-[0_25px_60px_rgba(249,115,22,0.12)] transition-all duration-500 overflow-hidden flex flex-col-reverse sm:flex-row items-stretch min-h-[190px] sm:min-h-[220px]"
          >
            {/* Left Diagonal Cut Architectural Image */}
            <div 
              className="relative w-full sm:w-[42%] h-40 sm:h-auto overflow-hidden flex-shrink-0"
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
            <div className="flex-1 p-5 sm:p-6 lg:p-7 flex flex-col justify-between z-10">
              <div>
                {/* Header Icon + Number Badge */}


                {/* Heading */}
                <h3 className="text-xl sm:text-2xl font-bold text-[#0B3B82] tracking-tight mb-1">
                  Long-Term Partnership
                </h3>
                <div className="w-7 h-0.5 bg-[#F97316] rounded-full mb-2.5"></div>

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
