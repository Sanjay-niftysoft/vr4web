import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  GraduationCap, 
  HeartPulse, 
  TrendingUp, 
  Building2, 
  Home, 
  Truck, 
  Users, 
  ArrowRight, 
  ArrowLeft 
} from 'lucide-react';

// Exact 8 Sectors with 100% verified daylight high-key photography
const sectors = [
  {
    id: '06',
    title: 'Retail',
    desc: 'Modern retail experiences with scalable digital solutions.',
    icon: ShoppingCart,
    iconColor: '#F97316',
    iconBg: '#FFF7ED',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    link: '/sectors'
  },
  {
    id: '04',
    title: 'Education',
    desc: 'Interactive learning platforms for a smarter future.',
    icon: GraduationCap,
    iconColor: '#0B4F9C',
    iconBg: '#EFF6FF',
    image: '/sectors/education.jpg',
    link: '/sectors'
  },
  {
    id: '02',
    title: 'Healthcare',
    desc: 'Next-gen healthcare systems for better care and outcomes.',
    icon: HeartPulse,
    iconColor: '#F97316',
    iconBg: '#FFF7ED',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    link: '/sectors'
  },
  {
    id: '01',
    title: 'Finance',
    desc: 'Secure, scalable and intelligent financial solutions.',
    icon: TrendingUp,
    iconColor: '#F97316',
    iconBg: '#FFF7ED',
    image: '/sectors/finance.jpg',
    link: '/sectors'
  },
  {
    id: '03',
    title: 'Construction',
    desc: 'Digital solutions for a smarter and safer construction ecosystem.',
    icon: Building2,
    iconColor: '#0B4F9C',
    iconBg: '#EFF6FF',
    image: '/sectors/construction.jpg',
    link: '/sectors'
  },
  {
    id: '05',
    title: 'Real Estate',
    desc: 'Virtual property solutions and intelligent real estate platforms.',
    icon: Home,
    iconColor: '#F97316',
    iconBg: '#FFF7ED',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    link: '/sectors'
  },
  {
    id: '07',
    title: 'Logistics',
    desc: 'Connected logistics and supply chain solutions.',
    icon: Truck,
    iconColor: '#0B4F9C',
    iconBg: '#EFF6FF',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    link: '/sectors'
  },
  {
    id: '08',
    title: 'Professional Services',
    desc: 'Digital tools for modern professional businesses.',
    icon: Users,
    iconColor: '#F97316',
    iconBg: '#FFF7ED',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    link: '/sectors'
  }
];

export default function SectorsSection() {
  // Center Finance (index 3) is active by default
  const [activeIndex, setActiveIndex] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });

  useEffect(() => {
    if (isInView) {
      // Allow entrance deck fan-out animation to complete before auto-scroll starts
      const enterTimer = setTimeout(() => {
        setHasEntered(true);
      }, 1000);
      return () => clearTimeout(enterTimer);
    }
  }, [isInView]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % sectors.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + sectors.length) % sectors.length);
  };

  // Auto-scroll one by one every 3.8s (pauses on user hover)
  useEffect(() => {
    if (isPaused || !hasEntered) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % sectors.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [isPaused, hasEntered]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden bg-white font-['Inter',sans-serif]"
    >
      
      {/* BACKGROUND TECHNOLOGY ORBIT DECORATION (Subtle lines & glowing nodes) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        {/* Soft ambient radial glow */}
        <div className="absolute w-[1200px] h-[550px] bg-gradient-to-b from-[#F97316]/5 via-[#0B4F9C]/5 to-transparent rounded-full blur-3xl opacity-50 transform -translate-y-8"></div>
        
        {/* Orbit Arc SVG */}
        <svg 
          viewBox="0 0 1600 600" 
          className="w-full max-w-[1700px] h-[500px] absolute top-[52%] -translate-y-1/2 opacity-65"
          fill="none"
        >
          <defs>
            <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F97316" stopOpacity="0.1" />
              <stop offset="25%" stopColor="#F97316" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#F97316" stopOpacity="0.75" />
              <stop offset="75%" stopColor="#0B4F9C" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#0B4F9C" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="subtleDashed" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0B4F9C" stopOpacity="0.04" />
              <stop offset="50%" stopColor="#0B4F9C" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0B4F9C" stopOpacity="0.04" />
            </linearGradient>
          </defs>

          {/* Primary Arched Orbit Path */}
          <path 
            d="M 50,470 Q 800,200 1550,470" 
            stroke="url(#orbitGrad)" 
            strokeWidth="2" 
            strokeLinecap="round"
          />

          {/* Secondary Dashed Ambient Path */}
          <path 
            d="M 120,430 Q 800,250 1480,430" 
            stroke="url(#subtleDashed)" 
            strokeWidth="1.5" 
            strokeDasharray="6 6"
          />

          {/* Floating Orbit Nodes / Spheres */}
          <circle cx="280" cy="390" r="9" fill="#F97316" opacity="0.85" className="filter drop-shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
          <circle cx="480" cy="280" r="12" fill="#38BDF8" opacity="0.75" className="filter drop-shadow-[0_0_14px_rgba(56,189,248,0.6)]" />
          <circle cx="1180" cy="285" r="7" fill="#F97316" opacity="0.85" className="filter drop-shadow-[0_0_8px_rgba(249,115,22,0.7)]" />
          <circle cx="1280" cy="395" r="9" fill="#F97316" opacity="0.8" className="filter drop-shadow-[0_0_10px_rgba(249,115,22,0.7)]" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-[1440px] 4xl:max-w-[2400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 flex flex-col items-center">
        
        {/* TOP CENTER HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-10 lg:mb-14"
        >
          {/* Eyebrow */}
          <div className="flex flex-col items-center mb-3">
            <span className="text-[#0B4F9C] font-extrabold text-[12px] sm:text-[13px] tracking-[0.25em] uppercase mb-1.5">
              OUR SECTORS
            </span>
            <div className="w-12 h-1 bg-[#F97316] rounded-full"></div>
          </div>

          {/* Main Heading */}
          <h2 className="text-[clamp(1.9rem,4vw,3.25rem)] font-extrabold text-center leading-[1.14] tracking-tight mb-3.5">
            <span className="text-[#0B4F9C]">Technology for industries that</span><br />
            <span className="text-[#F97316]">keep business moving.</span>
          </h2>

          {/* Subtitle */}
          <p className="text-black text-[15px] sm:text-lg max-w-2xl text-center leading-relaxed font-normal">
            We build digital solutions around the unique challenges, workflows and opportunities of every industry we serve.
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* DESKTOP 3D-STYLE SECTOR CAROUSEL FAN (>= 1280px xl)                        */}
        {/* ========================================================================= */}
        <div 
          className="hidden xl:flex relative w-full h-[510px] items-center justify-center overflow-visible my-3 [perspective:1400px]"
          style={{ transformStyle: 'preserve-3d' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {sectors.map((sector, index) => {
            const Icon = sector.icon;
            
            // Calculate relative offset from activeIndex
            let offset = index - activeIndex;
            // Circular wrapping offset calculation for 8 items (-4 to +4)
            if (offset > 4) offset -= sectors.length;
            if (offset < -3) offset += sectors.length;

            const isActive = offset === 0;

            // Mathematical 3D fanning configuration with depth (z) and 3D perspective rotation (rotateY)
            const configByOffset = {
              0: { x: 0, y: 0, z: 60, scale: 1.05, zIndex: 40, rotateY: 0, rotateZ: 0, opacity: 1 },
              1: { x: 215, y: 18, z: -20, scale: 0.95, zIndex: 30, rotateY: -8, rotateZ: 2, opacity: 1 },
              '-1': { x: -215, y: 18, z: -20, scale: 0.95, zIndex: 30, rotateY: 8, rotateZ: -2, opacity: 1 },
              2: { x: 410, y: 48, z: -80, scale: 0.88, zIndex: 22, rotateY: -15, rotateZ: 4.2, opacity: 0.98 },
              '-2': { x: -410, y: 48, z: -80, scale: 0.88, zIndex: 22, rotateY: 15, rotateZ: -4.2, opacity: 0.98 },
              3: { x: 590, y: 84, z: -140, scale: 0.82, zIndex: 15, rotateY: -22, rotateZ: 6.5, opacity: 0.94 },
              '-3': { x: -590, y: 84, z: -140, scale: 0.82, zIndex: 15, rotateY: 22, rotateZ: -6.5, opacity: 0.94 },
              4: { x: 745, y: 122, z: -200, scale: 0.76, zIndex: 10, rotateY: -28, rotateZ: 8.5, opacity: 0.88 }
            };

            const currentConfig = configByOffset[offset] || { x: offset * 220, y: 150, z: -250, scale: 0.7, zIndex: 5, rotateY: 0, rotateZ: 0, opacity: 0 };

            // SCROLL-ENTRANCE DECK FAN-OUT ANIMATION:
            // When user enters section, cards start tucked under each other in center, then fan out left & right one by one!
            const targetX = isInView ? currentConfig.x : 0;
            const targetY = isInView ? currentConfig.y : 35;
            const targetZ = isInView ? currentConfig.z : -50 * Math.abs(offset);
            const targetRotateY = isInView ? currentConfig.rotateY : 0;
            const targetRotateZ = isInView ? currentConfig.rotateZ : 0;
            const targetScale = isInView ? currentConfig.scale : (isActive ? 0.95 : 0.85);
            const targetOpacity = isInView ? currentConfig.opacity : (isActive ? 1 : 0.35);

            // Stagger delay when entering the viewport so cards fan out one by one
            const transitionDelay = hasEntered ? 0 : Math.abs(offset) * 0.12;

            return (
              <motion.div
                key={sector.id}
                animate={{
                  x: targetX,
                  y: targetY,
                  z: targetZ,
                  scale: targetScale,
                  zIndex: currentConfig.zIndex,
                  rotateY: targetRotateY,
                  rotate: targetRotateZ,
                  opacity: targetOpacity
                }}
                transition={{
                  duration: 0.8,
                  delay: transitionDelay,
                  ease: [0.16, 1, 0.3, 1]
                }}
                onClick={() => setActiveIndex(index)}
                className="absolute cursor-pointer origin-bottom [transform-style:preserve-3d]"
                style={{
                  width: isActive ? '310px' : '265px',
                  height: isActive ? '435px' : '395px'
                }}
              >
                <Link
                  to={sector.link}
                  className="block w-full h-full focus:outline-none"
                >
                  <motion.div 
                    whileHover={{ 
                      y: -8, 
                      scale: 1.02,
                      transition: { duration: 0.25, ease: "easeOut" } 
                    }}
                    className={`w-full h-full rounded-[24px] bg-white flex flex-col justify-between overflow-hidden transition-all duration-300 group ${
                      isActive 
                        ? 'border-[1.5px] border-[#F97316]/75 shadow-[0_25px_50px_-10px_rgba(11,79,156,0.18),0_10px_25px_-5px_rgba(249,115,22,0.18)] ring-1 ring-[#F97316]/20' 
                        : 'border border-slate-200/90 shadow-[0_16px_35px_-8px_rgba(11,79,156,0.08)] hover:border-[#F97316]/50 hover:shadow-[0_20px_40px_-5px_rgba(249,115,22,0.14)]'
                    }`}
                  >
                    {/* Top Content Area: Icon + Title together, with description */}
                    <div className="p-4 sm:p-5 pb-2.5 flex flex-col">
                      
                      {/* Icon + Title Row */}
                      <div className="flex items-center gap-3 mb-2">
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-xs border border-black/[0.04] transition-transform duration-300 group-hover:scale-105"
                          style={{ backgroundColor: sector.iconBg }}
                        >
                          <Icon className="w-5 h-5" style={{ color: sector.iconColor }} />
                        </div>

                        <h3 className={`font-extrabold tracking-tight text-[#0B4F9C] transition-colors duration-200 group-hover:text-[#F97316] ${
                          isActive ? 'text-[20px] sm:text-[21px]' : 'text-[17px] sm:text-[18px]'
                        }`}>
                          {sector.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className={`text-black font-normal leading-relaxed ${
                        isActive ? 'text-[13px] line-clamp-2' : 'text-[12px] line-clamp-2'
                      }`}>
                        {sector.desc}
                      </p>
                    </div>

                    {/* Framed Image Container: Clean rounded photograph that doesn't cut card */}
                    <div className="mx-3.5 mb-3.5 rounded-[18px] overflow-hidden relative flex-1 min-h-[175px] bg-slate-100 border border-slate-100 shadow-xs">
                      <img 
                        src={sector.image} 
                        alt={sector.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />

                      {/* Subtle Image Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* TABLET & MOBILE TOUCH CAROUSEL (< 1280px)                                  */}
        {/* ========================================================================= */}
        <div 
          className="flex xl:hidden w-full flex-col items-center my-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative w-full max-w-[340px] sm:max-w-[420px] h-[440px]">
            <AnimatePresence mode="wait">
              {(() => {
                const sector = sectors[activeIndex];
                const Icon = sector.icon;
                return (
                  <motion.div
                    key={sector.id}
                    initial={{ opacity: 0, scale: 0.94, x: 30 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.94, x: -30 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-full h-full rounded-[24px] bg-white border-[1.5px] border-[#F97316]/75 shadow-[0_18px_40px_rgba(11,79,156,0.10),0_6px_16px_rgba(249,115,22,0.10)] flex flex-col justify-between overflow-hidden"
                  >
                    <Link to={sector.link} className="block w-full h-full flex flex-col justify-between">
                      {/* Top Content: Icon + Title */}
                      <div className="p-5 pb-2.5 flex flex-col">
                        <div className="flex items-center gap-3 mb-2.5">
                          <div 
                            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 shadow-xs border border-black/[0.04]"
                            style={{ backgroundColor: sector.iconBg }}
                          >
                            <Icon className="w-5 h-5" style={{ color: sector.iconColor }} />
                          </div>
                          <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B4F9C] tracking-tight">
                            {sector.title}
                          </h3>
                        </div>

                        <p className="text-black text-sm leading-relaxed">
                          {sector.desc}
                        </p>
                      </div>

                      {/* Framed Bottom Image */}
                      <div className="mx-4 mb-4 rounded-[18px] overflow-hidden relative flex-1 min-h-[210px] bg-slate-100 border border-slate-100 shadow-xs">
                        <img 
                          src={sector.image} 
                          alt={sector.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2.5 right-2.5 w-9 h-9 rounded-full bg-white/95 border border-[#0B4F9C]/15 shadow-md flex items-center justify-center text-[#0B4F9C]">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CAROUSEL CONTROLS: Left Arrow, Pagination Dots, Right Arrow                */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-center gap-6 mt-8 sm:mt-10 z-20">
          
          {/* Left Arrow Button */}
          <button 
            onClick={handlePrev}
            aria-label="Previous Sector"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#0B4F9C]/20 bg-white text-[#0B4F9C] hover:border-[#F97316] hover:text-[#F97316] hover:bg-orange-50/40 shadow-sm hover:shadow-md flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Pagination Dots */}
          <div className="flex items-center gap-2">
            {sectors.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to sector ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === activeIndex
                    ? 'w-6 h-2 bg-[#F97316] shadow-[0_0_8px_rgba(249,115,22,0.5)]'
                    : 'w-2 h-2 bg-[#0B4F9C]/20 hover:bg-[#0B4F9C]/50'
                }`}
              />
            ))}
          </div>

          {/* Right Arrow Button */}
          <button 
            onClick={handleNext}
            aria-label="Next Sector"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#0B4F9C]/20 bg-white text-[#0B4F9C] hover:border-[#F97316] hover:text-[#F97316] hover:bg-orange-50/40 shadow-sm hover:shadow-md flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

        </div>

      </div>
    </section>
  );
}
