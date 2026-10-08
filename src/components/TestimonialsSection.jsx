import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle2 } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   CLIENT TESTIMONIALS DATA
───────────────────────────────────────────────────────────── */
const testimonials = [
  {
    id: 1,
    quote: "The entire experience was smooth, professional, and thoughtfully executed. The quality and attention to detail exceeded our expectations.",
    author: "Arun Kumar",
    role: "Business Owner",
    initial: "A",
    rating: 5,
    highlight: false,
    tag: "Verified Client",
  },
  {
    id: 2,
    quote: "From the first interaction to the final delivery, the team was responsive, reliable, and focused on getting every detail right.",
    author: "Priya Sharma",
    role: "Marketing Director",
    initial: "P",
    rating: 5,
    highlight: true, // Center editorial card
    tag: "Featured Story",
  },
  {
    id: 3,
    quote: "A highly professional team with excellent communication and outstanding execution. We would confidently recommend their work.",
    author: "Rahul Menon",
    role: "Project Manager",
    initial: "R",
    rating: 5,
    highlight: false,
    tag: "Verified Client",
  },
];

export default function TestimonialsSection({ className = '' }) {
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#0B3B82]/5 via-[#F97316]/5 to-[#38BDF8]/5 rounded-full blur-3xl" />
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #0B3B82 1px, transparent 0)',
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
          {/* Eyebrow with Orange Accent Bar */}
          <div className="flex flex-col items-center mb-2.5 sm:mb-3">
            <span className="text-[#0B3B82] font-extrabold text-[11px] xs:text-[12px] sm:text-[13px] tracking-[0.25em] uppercase mb-1.5">
              CLIENT STORIES
            </span>
            <div className="w-12 h-1 bg-[#F97316] rounded-full" />
          </div>

          {/* Main 2-Tone Heading */}
          <h2 className="text-[26px] xs:text-[32px] sm:text-[40px] md:text-[46px] lg:text-[52px] font-extrabold text-center leading-[1.12] tracking-tight mb-2.5 sm:mb-3.5">
            <span className="text-[#0B3B82]">What Our </span>
            <span className="text-[#F97316]">Clients Say</span>
          </h2>

          {/* Supporting Paragraph */}
          <p className="text-[#111111] font-medium text-xs sm:text-[13.5px] md:text-[14.5px] leading-relaxed max-w-[660px] mx-auto px-2">
            Real experiences from clients who trusted us to deliver quality, reliability, and exceptional results.
          </p>
        </motion.div>

        {/* ─────────────────────────────────────────────────────────
            TESTIMONIAL CARDS (3-Column Editorial Grid)
        ───────────────────────────────────────────────────────── */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 items-stretch pt-2 pb-4">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ 
                duration: 0.7, 
                delay: idx * 0.15, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              whileHover={{ y: -6 }}
              className={`group relative bg-white rounded-[24px] sm:rounded-[28px] transition-all duration-400 p-6 sm:p-7 md:p-8 flex flex-col justify-between overflow-hidden shadow-[0_10px_32px_rgba(11,59,130,0.06)] hover:shadow-[0_20px_45px_rgba(11,59,130,0.12)] ${
                item.highlight
                  ? 'lg:-translate-y-2.5 shadow-[0_16px_40px_rgba(11,59,130,0.09)]'
                  : ''
              } ${idx === 2 ? 'md:col-span-2 lg:col-span-1 md:max-w-md md:mx-auto lg:max-w-none' : ''}`}
            >
              {/* ── CARD TOP: Simple 5-Star Rating (No Quote Marks) ── */}
              <div>
                <div className="flex items-center gap-1 mb-4 sm:mb-5" aria-label="5 out of 5 stars">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-4 h-4 fill-[#F97316] text-[#F97316]" 
                    />
                  ))}
                </div>

                {/* Testimonial Quote Text */}
                <p className="text-[#111111] text-[14px] xs:text-[14.5px] sm:text-[15px] md:text-[15.5px] leading-relaxed font-normal mb-6 relative z-10">
                  {item.quote}
                </p>
              </div>

              {/* ── CARD BOTTOM: Author Info & A, P, R Letter Avatars (No Divider Line) ── */}
              <div className="pt-2 sm:pt-3 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3 sm:gap-3.5">
                  {/* Clean Borderless Initial Avatar Circle (A, P, R) */}
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0B3B82] text-white flex items-center justify-center font-bold text-[16px] sm:text-[17px] shadow-sm flex-shrink-0">
                    {item.initial}
                  </div>

                  {/* Name and Role */}
                  <div className="flex flex-col">
                    <h3 className="text-[#0B3B82] font-bold text-[14.5px] sm:text-[15.5px] tracking-tight group-hover:text-[#0B3B82] transition-colors">
                      {item.author}
                    </h3>
                    <span className="text-[#F97316] font-semibold text-[11.5px] sm:text-[12.5px] tracking-wide">
                      {item.role}
                    </span>
                  </div>
                </div>

                {/* Black Color Verified / Featured Indicator */}
                <div className="hidden xs:inline-flex items-center gap-1.5 text-[11px] font-bold text-black bg-black/[0.04] border border-black/10 px-2.5 py-1 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                  <span className="text-black">{item.tag}</span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
