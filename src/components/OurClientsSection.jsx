import React from 'react';

// Actual Client Logos from public/client
export const CLIENT_LOGOS = [
  {
    id: 'bsquare',
    name: 'B Square',
    src: '/client/image copy 5.png',
  },
  {
    id: 'sreekpj',
    name: 'Sree KPJ Gems',
    src: '/client/image copy 2.png',
  },
  {
    id: 'ebz',
    name: 'eBz Software Solutions',
    src: '/client/image copy 6.png',
  },
];

/**
 * OurClientsSection
 * Static display of 3 prominent clients flanked symmetrically by Blue Laurel Branches.
 * - Header matches Why Choose Us typography (2-tone Blue #0B3B82 & Orange #D92419).
 * - Static layout, no scrolling.
 * - Laurel branches on left and right sides.
 * - Responsive from 320px mobile to 2560px ultra-wide.
 */
export default function OurClientsSection({ className = '' }) {

  return (
    <section 
      aria-label="Our Clients"
      className={`relative w-full bg-white text-[#111111] pt-3 sm:pt-4 md:pt-5 lg:pt-6 pb-6 sm:pb-8 md:pb-10 px-2 xs:px-4 sm:px-6 md:px-8 overflow-hidden select-none font-['Inter',sans-serif] ${className}`}
    >
      {/* Static layout styling */}

      <div className="w-full max-w-[1240px] xl:max-w-[1320px] 2xl:max-w-[1400px] mx-auto flex flex-col items-center">

        {/* ============================================================== */}
        {/* HEADER AREA: EXACT WHY CHOOSE US DESIGN SYSTEM                 */}
        {/* ============================================================== */}
        <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-7 md:mb-9">
          
          {/* Eyebrow with Red Bar */}
          <div className="flex flex-col items-center mb-2.5 sm:mb-3">
            <span className="text-[#0B3B82] font-extrabold text-[11px] xs:text-[12px] sm:text-[13px] tracking-[0.25em] uppercase mb-1.5">
              OUR CLIENTS
            </span>
            <div className="w-12 h-1 bg-[#D92419] rounded-full"></div>
          </div>

          {/* Main 2-Tone Heading (Blue Line 1, Orange Line 2) */}
          <h2 className="text-[26px] xs:text-[32px] sm:text-[42px] md:text-[48px] lg:text-[54px] font-extrabold text-center leading-[1.12] tracking-tight mb-2 sm:mb-3">
            <span className="text-[#0B3B82] block">World-Class</span>
            <span className="text-[#D92419] block mt-0.5 sm:mt-1">Digital Solutions.</span>
          </h2>

          {/* Supporting Paragraph (Clean 2-line layout) */}
          <p className="text-[#111111] font-medium text-xs sm:text-[13.5px] md:text-[14.5px] leading-relaxed max-w-[880px] mx-auto px-2">
            Empowering ambitious brands with digital solutions that increase AI search visibility, digital engineering,and cutting-edge AEO &  GEO architectures that accelerate organic reach and measurable growth.
          </p>
        </div>

        {/* ============================================================== */}
        {/* STATIC LAYOUT: 3 BIG CLIENTS FLANKED BY BLUE LAUREL BRANCHES  */}
        {/* ============================================================== */}
        <div className="w-full flex items-center justify-between gap-1 xs:gap-2 sm:gap-4 md:gap-6 lg:gap-8">

          {/* Left Laurel Branch */}
          <div 
            aria-hidden="true"
            className="flex flex-shrink-0 items-center justify-center pointer-events-none z-10"
          >
            <img 
              src="/client/reference/laurel-left.png" 
              alt="" 
              className="w-auto h-[60px] xs:h-[75px] sm:h-[95px] md:h-[115px] lg:h-[130px] xl:h-[140px] object-contain"
              loading="lazy"
            />
          </div>

          {/* Infinite Marquee Client Logos */}
          <div className="flex-1 overflow-hidden relative flex items-center h-full py-4 [mask-image:_linear-gradient(to_right,transparent_0,_black_40px,_black_calc(100%-40px),transparent_100%)] sm:[mask-image:_linear-gradient(to_right,transparent_0,_black_80px,_black_calc(100%-80px),transparent_100%)]">
            <style>
              {`
                @keyframes scrollLeft {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                  display: flex;
                  width: max-content;
                  animation: scrollLeft 30s linear infinite;
                }
                .animate-marquee:hover {
                  animation-play-state: paused;
                }
              `}
            </style>
            
            <div className="animate-marquee gap-8 sm:gap-16 md:gap-20 lg:gap-32 items-center px-4">
              {/* Duplicate the logos array enough times to fill ultra-wide screens and loop seamlessly */}
              {[...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, index) => (
                <div 
                  key={`${logo.id}-${index}`}
                  className="flex items-center justify-center transition-transform duration-300 hover:scale-110 cursor-pointer shrink-0"
                >
                  <img 
                    src={logo.src} 
                    alt={logo.name} 
                    className="max-h-16 xs:max-h-20 sm:max-h-24 md:max-h-28 lg:max-h-32 w-auto max-w-[140px] xs:max-w-[180px] sm:max-w-[220px] md:max-w-[260px] object-contain filter grayscale-[20%] hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Laurel Branch */}
          <div 
            aria-hidden="true"
            className="flex flex-shrink-0 items-center justify-center pointer-events-none z-10"
          >
            <img 
              src="/client/reference/laurel-right.png" 
              alt="" 
              className="w-auto h-[60px] xs:h-[75px] sm:h-[95px] md:h-[115px] lg:h-[130px] xl:h-[140px] object-contain"
              loading="lazy"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
