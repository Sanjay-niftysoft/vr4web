import React from 'react';

// Actual Client Logos from public/client
export const CLIENT_LOGOS = [
  {
    id: 'sterling',
    name: 'Sterling Reprographics',
    src: '/client/1.png',
  },
  {
    id: 'bizalom',
    name: 'Bizalom',
    src: '/client/image copy 4.png',
  },
  {
    id: 'athveka',
    name: 'Athveka',
    src: '/client/image copy 3.png',
  },
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
  {
    id: 'areg',
    name: 'AREG',
    src: '/client/image copy 7.png',
  },
  {
    id: 'bhoomibay',
    name: 'Bhoomi Bay',
    src: '/client/image copy 8.png',
  },
];

/**
 * OurClientsSection
 * Single-Row Infinite Running Carousel (Marquee) flanked symmetrically by Blue Laurel Branches.
 * - Header matches Why Choose Us typography (2-tone Blue #0B3B82 & Orange #F97316).
 * - Single continuous auto-scrolling row running smoothly right-to-left.
 * - Laurel branches on left and right sides.
 * - Seamless edge masks so logos fade smoothly near the laurels.
 * - Responsive from 320px mobile to 2560px ultra-wide.
 */
export default function OurClientsSection({ className = '' }) {
  // Double array for seamless infinite looping
  const marqueeLogos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section 
      aria-label="Our Clients"
      className={`relative w-full bg-white text-[#111111] pt-3 sm:pt-4 md:pt-5 lg:pt-6 pb-6 sm:pb-8 md:pb-10 px-2 xs:px-4 sm:px-6 md:px-8 overflow-hidden select-none font-['Inter',sans-serif] ${className}`}
    >
      <style>{`
        @keyframes clientMarqueeScroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .client-marquee-track {
          display: flex;
          width: max-content;
          animation: clientMarqueeScroll 26s linear infinite;
          will-change: transform;
        }
        .client-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="w-full max-w-[1240px] xl:max-w-[1320px] 2xl:max-w-[1400px] mx-auto flex flex-col items-center">

        {/* ============================================================== */}
        {/* HEADER AREA: EXACT WHY CHOOSE US DESIGN SYSTEM                 */}
        {/* ============================================================== */}
        <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-7 md:mb-9">
          
          {/* Eyebrow with Orange Bar */}
          <div className="flex flex-col items-center mb-2.5 sm:mb-3">
            <span className="text-[#0B3B82] font-extrabold text-[11px] xs:text-[12px] sm:text-[13px] tracking-[0.25em] uppercase mb-1.5">
              OUR CLIENTS
            </span>
            <div className="w-12 h-1 bg-[#F97316] rounded-full"></div>
          </div>

          {/* Main 2-Tone Heading (Blue Line 1, Orange Line 2) */}
          <h2 className="text-[26px] xs:text-[32px] sm:text-[42px] md:text-[48px] lg:text-[54px] font-extrabold text-center leading-[1.12] tracking-tight mb-2 sm:mb-3">
            <span className="text-[#0B3B82] block">World-Class</span>
            <span className="text-[#F97316] block mt-0.5 sm:mt-1">Digital Solutions.</span>
          </h2>

          {/* Supporting Paragraph (Clean 2-line layout) */}
          <p className="text-[#111111] font-medium text-xs sm:text-[13.5px] md:text-[14.5px] leading-relaxed max-w-[880px] mx-auto px-2">
            Empowering ambitious brands with high-performance web development,digital engineering
            <br className="hidden sm:inline" />{' '}
            Trusted by forward-thinking businesses to accelerate growth and drive measurable results.
          </p>
        </div>

        {/* ============================================================== */}
        {/* SINGLE-ROW RUNNING CAROUSEL FLANKED BY BLUE LAUREL BRANCHES   */}
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

          {/* Single Continuous Running Row (Marquee) */}
          <div 
            className="flex-1 overflow-hidden relative py-2"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
            }}
          >
            <div className="client-marquee-track items-center">
              {marqueeLogos.map((logo, index) => (
                <div 
                  key={`${logo.id}-${index}`}
                  className="flex-shrink-0 flex items-center justify-center h-12 xs:h-14 sm:h-16 md:h-18 px-4 xs:px-6 sm:px-8 md:px-10 lg:px-12 transition-transform duration-300 hover:scale-108 cursor-pointer"
                >
                  <img 
                    src={logo.src} 
                    alt={logo.name} 
                    className="max-h-8 xs:max-h-9 sm:max-h-11 md:max-h-13 w-auto max-w-[110px] xs:max-w-[130px] sm:max-w-[150px] md:max-w-[170px] object-contain filter grayscale-[20%] hover:grayscale-0 transition-all duration-300"
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
