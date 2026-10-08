

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Globe, Handshake, ArrowRight, Lightbulb, Rocket, RefreshCw, Search, PenTool, Code2, Headphones } from 'lucide-react';
import ServicesSection from './ServicesSection';
import SectorsSection from './SectorsSection';
import ProductShowcase from './ProductShowcase';
import WhyChooseUsSection from './WhyChooseUsSection';
import AsymmetricGallerySection from '../../components/AsymmetricGallerySection';
import OurClientsSection from '../../components/OurClientsSection';
import CtaSection from '../../components/CtaSection';
import TestimonialsSection from '../../components/TestimonialsSection';

const mapLocations = [
  {
    name: 'Perth',
    pos: {
      320: { top: '67%', left: '27%' },
      375: { top: '69%', left: '28%' },
      425: { top: '71%', left: '28%' },
      768: { top: '61%', left: '23%' },
      1024: { top: '65%', left: '30%' },
      1440: { top: '60%', left: '27%' },
      2560: { top: '60%', left: '27%' },
    },
    labelPos: {
      320: { top: '50%', right: '100%', transform: 'translateY(-50%)', marginRight: '6px' },
      375: { top: '50%', right: '100%', transform: 'translateY(-50%)', marginRight: '6px' },
      425: { top: '50%', right: '100%', transform: 'translateY(-50%)', marginRight: '6px' },
      768: { top: '50%', right: '100%', transform: 'translateY(-50%)', marginRight: '6px' },
      1024: { top: '50%', right: '100%', transform: 'translateY(-50%)', marginRight: '6px' },
      1440: { top: '50%', right: '100%', transform: 'translateY(-50%)', marginRight: '8px' },
      2560: { top: '50%', right: '100%', transform: 'translateY(-50%)', marginRight: '10px' },
    }
  },
  {
    name: 'Adelaide',
    pos: {
      320: { top: '69%', left: '58%' },
      375: { top: '69%', left: '57%' },
      425: { top: '72%', left: '57.5%' },
      768: { top: '65%', left: '53%' },
      1024: { top: '68%', left: '54%' },
      1440: { top: '63%', left: '54%' },
      2560: { top: '63%', left: '54%' },
    },
    labelPos: {
      320: { bottom: '100%', right: '50%', marginBottom: '4px', marginRight: '-12px' },
      375: { bottom: '100%', right: '50%', marginBottom: '4px', marginRight: '-12px' },
      425: { bottom: '100%', right: '50%', marginBottom: '4px', marginRight: '-12px' },
      768: { bottom: '100%', right: '50%', marginBottom: '4px', marginRight: '-12px' },
      1024: { bottom: '100%', right: '50%', marginBottom: '4px', marginRight: '-12px' },
      1440: { bottom: '100%', right: '50%', marginBottom: '5px', marginRight: '-14px' },
      2560: { bottom: '100%', right: '50%', marginBottom: '6px', marginRight: '-16px' },
    }
  },
  {
    name: 'Melbourne',
    pos: {
      320: { top: '72.5%', left: '68%' },
      375: { top: '75%', left: '66%' },
      425: { top: '78%', left: '65.5%' },
      768: { top: '72%', left: '61%' },
      1024: { top: '82%', left: '60%' },
      1440: { top: '73%', left: '62%' },
      2560: { top: '73%', left: '62%' },
    },
    labelPos: {
      320: { top: '100%', right: '50%', marginTop: '4px', marginRight: '-12px' },
      375: { top: '100%', right: '50%', marginTop: '4px', marginRight: '-12px' },
      425: { top: '100%', right: '50%', marginTop: '4px', marginRight: '-12px' },
      768: { top: '100%', right: '50%', marginTop: '4px', marginRight: '-12px' },
      1024: { top: '100%', right: '50%', marginTop: '4px', marginRight: '-12px' },
      1440: { top: '100%', right: '50%', marginTop: '5px', marginRight: '-14px' },
      2560: { top: '100%', right: '50%', marginTop: '6px', marginRight: '-16px' },
    }
  },
  {
    name: 'Sydney',
    pos: {
      320: { top: '68%', left: '77%' },
      375: { top: '70%', left: '77%' },
      425: { top: '72%', left: '77%' },
      768: { top: '65%', left: '75%' },
      1024: { top: '68.5%', left: '70%' },
      1440: { top: '63%', left: '73%' },
      2560: { top: '63%', left: '73%' },
    },
    labelPos: {
      320: { top: '50%', left: '100%', transform: 'translateY(-50%)', marginLeft: '6px' },
      375: { top: '50%', left: '100%', transform: 'translateY(-50%)', marginLeft: '6px' },
      425: { top: '50%', left: '100%', transform: 'translateY(-50%)', marginLeft: '6px' },
      768: { top: '50%', left: '100%', transform: 'translateY(-50%)', marginLeft: '6px' },
      1024: { top: '50%', left: '100%', transform: 'translateY(-50%)', marginLeft: '6px' },
      1440: { top: '50%', left: '100%', transform: 'translateY(-50%)', marginLeft: '8px' },
      2560: { top: '50%', left: '100%', transform: 'translateY(-50%)', marginLeft: '10px' },
    }
  },
  {
    name: 'Brisbane',
    pos: {
      320: { top: '63%', left: '73%' },
      375: { top: '64%', left: '72%' },
      425: { top: '66%', left: '73%' },
      768: { top: '50%', left: '72%' },
      1024: { top: '54%', left: '67.5%' },
      1440: { top: '54%', left: '71%' },
      2560: { top: '54%', left: '71%' },
    },
    labelPos: {
      320: { bottom: '100%', left: '50%', marginBottom: '4px', marginLeft: '-12px' },
      375: { bottom: '100%', left: '50%', marginBottom: '4px', marginLeft: '-12px' },
      425: { bottom: '100%', left: '50%', marginBottom: '4px', marginLeft: '-12px' },
      768: { bottom: '100%', left: '50%', marginBottom: '4px', marginLeft: '-12px' },
      1024: { bottom: '100%', left: '50%', marginBottom: '4px', marginLeft: '-12px' },
      1440: { bottom: '100%', left: '50%', marginBottom: '5px', marginLeft: '-14px' },
      2560: { bottom: '100%', left: '50%', marginBottom: '6px', marginLeft: '-16px' },
    }
  },
];

// Our Process: 4 steps that travel west to east across the same cities as the hero map
const processSteps = [
  {
    title: 'Discover',
    icon: Search,
    desc: 'A free strategy call to understand your business, your customers and what you want to achieve.',
  },
  {
    title: 'Design',
    icon: PenTool,
    desc: 'We map the user journey and design your UI/UX so you can review and approve every screen up front.',
  },
  {
    title: 'Build',
    icon: Code2,
    desc: 'Our developers build your website, app or custom software, with regular demos so you always know progress.',
  },
  {
    title: 'Support',
    icon: Headphones,
    desc: 'We go live with you, then stay on to maintain, improve and grow your product as your business grows.',
  },
];

// Dashed "kangaroo hop" arcs between the 4 pins (pins sit at 12.5%, 37.5%, 62.5%, 87.5% of the width)
const processArcs = [
  'M125 56 Q250 -22 375 56',
  'M375 56 Q500 -22 625 56',
  'M625 56 Q750 -22 875 56',
];

// Helper to convert React style object to CSS string
const objToCss = (obj) => {
  if (!obj) return '';
  return Object.entries(obj).map(([k, v]) => `${k.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${v};`).join(' ');
};

const AnimatedText = ({ text, delay = 0, className = "" }) => {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: delay + index * 0.12, ease: "easeOut" }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

const AnimatedCharacters = ({ text, delay = 0, className = "" }) => {
  return (
    <span className={className}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.2, delay: delay + index * 0.01, ease: "easeOut" }}
          className={char === " " ? "inline-block w-[0.25em]" : "inline-block"}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

const AnimatedTextScroll = ({ text, delay = 0, className = "" }) => {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.3, delay: delay + index * 0.015, ease: "easeOut" }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

export default function Home() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev >= 6 ? 0 : prev + 1));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 w-full flex flex-col min-h-screen">

      {/* Hero Banner Section with Comprehensive Screen Responsiveness: 320px Mobile, 768px Tablet, 1024px & 1440px Laptop, 2560px Ultra-Wide */}
      <section
        className="relative w-full h-[100svh] min-h-[520px] xs:min-h-[560px] sm:min-h-[600px] md:min-h-[640px] lg:min-h-[700px] 2xl:min-h-[780px] 4xl:min-h-[1000px] flex flex-col items-center justify-start pt-[72px] xs:pt-[80px] sm:pt-[96px] md:pt-[110px] lg:pt-[120px] 2xl:pt-[130px] 4xl:pt-[180px] overflow-hidden"
      >
        {/* Background Image with absolute positioning: optimized for mobile (320px-767px), tablet (768px-1023px), laptop (1024px-1440px), ultrawide (2560px) */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0 bg-[url('/mobileviewbanner.png')] md:bg-[url('/tabview.png')] lg:bg-[url('/banner1.png')]"
        >
          {/* Map Locations Responsive Styles for All Breakpoints */}
          <style>
            {mapLocations.map((loc, i) => `
              .pin-${i} { top: ${loc.pos[320].top}; left: ${loc.pos[320].left}; }
              .label-${i} { ${objToCss(loc.labelPos[320])} }

              @media (min-width: 375px) {
                .pin-${i} { top: ${loc.pos[375].top}; left: ${loc.pos[375].left}; }
                .label-${i} { ${objToCss(loc.labelPos[375])} }
              }
              @media (min-width: 425px) {
                .pin-${i} { top: ${loc.pos[425].top}; left: ${loc.pos[425].left}; }
                .label-${i} { ${objToCss(loc.labelPos[425])} }
              }
              @media (min-width: 768px) {
                .pin-${i} { top: ${loc.pos[768].top}; left: ${loc.pos[768].left}; }
                .label-${i} { ${objToCss(loc.labelPos[768])} }
              }
              @media (min-width: 1024px) {
                .pin-${i} { top: ${loc.pos[1024].top}; left: ${loc.pos[1024].left}; }
                .label-${i} { ${objToCss(loc.labelPos[1024])} }
              }
              @media (min-width: 1440px) {
                .pin-${i} { top: ${loc.pos[1440].top}; left: ${loc.pos[1440].left}; }
                .label-${i} { ${objToCss(loc.labelPos[1440])} }
              }
              @media (min-width: 2560px) {
                .pin-${i} { top: ${loc.pos[2560]?.top || loc.pos[1440].top}; left: ${loc.pos[2560]?.left || loc.pos[1440].left}; }
                .label-${i} { ${objToCss(loc.labelPos[2560] || loc.labelPos[1440])} }
              }
            `).join('')}
          </style>

          {/* Unified Map Locations */}
          <div className="absolute inset-0 w-full h-full">
            {mapLocations.map((loc, index) => (
              <motion.div
                key={loc.name}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: step > index ? 1 : 0,
                  scale: step > index ? 1 : 0.5
                }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
                className={`pin-${index} absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center md:gap-2`}
              >
                <div className="relative flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 xs:w-5 xs:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 2xl:w-8 2xl:h-8 4xl:w-11 4xl:h-11 text-[#2563eb] drop-shadow-[0_4px_6px_rgba(37,99,235,0.6)] relative z-10 transition-transform hover:scale-110">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>

                  {/* Unified Responsive Label */}
                  <span
                    className={`label-${index} absolute text-[8px] xs:text-[9px] md:text-[10px] lg:text-[11px] 2xl:text-[12px] 4xl:text-[15px] font-semibold text-[#111111] bg-white/95 backdrop-blur-md px-1.5 py-0.5 md:px-3 md:py-1 4xl:px-4 4xl:py-1.5 rounded-md shadow-sm md:shadow-[0_4px_12px_rgba(0,0,0,0.15)] 4xl:shadow-[0_6px_18px_rgba(0,0,0,0.2)] border border-white/60 whitespace-normal sm:whitespace-nowrap tracking-wide z-20`}
                  >
                    {loc.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Content Container: Fully Responsive Width and Typography */}
        <div className="relative z-20 max-w-6xl 2xl:max-w-7xl 4xl:max-w-[2100px] mx-auto px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 4xl:px-16 flex flex-col items-center text-center w-full">

          <div className="mb-4 xs:mb-5 sm:mb-6 md:mb-8 4xl:mb-14 w-full flex flex-col items-center">
            <div className="mb-2 xs:mb-3 sm:mb-4 md:mb-6 4xl:mb-8">
              <p className="text-[#0B4F9C] font-bold tracking-wider text-[8.5px] xs:text-[9.5px] sm:text-[10px] md:text-[11px] 2xl:text-xs 4xl:text-base uppercase text-center px-2 sm:px-4 drop-shadow-[0_0_10px_rgba(255,255,255,1)]">
                <AnimatedText text="Software Solutions For A Brighter Australia" delay={0.2} />
              </p>
            </div>

            <h1
              className="text-[clamp(1rem,2.1vw,2.5rem)] font-extrabold text-[#0B4F9C] tracking-tight leading-[1.2] w-full text-center flex flex-col items-center px-2 sm:px-4 drop-shadow-[0_0_15px_rgba(255,255,255,1)]"
            >
              <AnimatedText
                text="Powering Australian Businesses with"
                delay={0.6}
                className="whitespace-normal lg:whitespace-nowrap leading-tight md:leading-[1.1]"
              />
              <AnimatedText
                text="Smarter Software Solutions"
                delay={1.2}
                className="text-white-black-border mt-1.5 xs:mt-2 sm:mt-2.5 md:mt-3 4xl:mt-5 whitespace-normal sm:whitespace-nowrap inline-block text-[clamp(1.4rem,3.3vw,3.75rem)] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] font-extrabold text-[#F97316]"
              />
            </h1>
          </div>

        </div>
      </section>

      {/* About Us Section */}
      <section className="relative w-full py-16 lg:py-24 overflow-hidden bg-white">
        {/* Background image responsive: mobile vs tablet vs desktop */}
        <div
          className="absolute inset-0 w-full h-full bg-[length:100%_100%] sm:bg-cover bg-top lg:bg-center bg-no-repeat opacity-90 pointer-events-none bg-[url('/about/mobileview-bg.png')] md:bg-[url('/about/tabview.png')] lg:bg-[url('/about/bg.png')]"
        />

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-4 xl:gap-8">

            {/* Left Content */}
            <div className="w-full lg:w-[30%] xl:w-[32%] flex flex-col items-start z-20">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-4 mb-3"
              >
                <div className="w-10 h-0.5 bg-[#F97316]"></div>
                <span className="text-[#0B4F9C] font-bold text-sm tracking-widest uppercase">Who We Are</span>
              </motion.div>
              <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-[#0B4F9C] leading-[1.1] mb-5 tracking-tight whitespace-normal sm:whitespace-nowrap">
                <AnimatedCharacters text="Technology" delay={0.0} /><br />
                <AnimatedCharacters text="built around" delay={0.1} /><br />
                <AnimatedCharacters text="your business." delay={0.2} className="text-[#F97316]" />
              </h2>
              <p className="text-[#0B4F9C] text-base lg:text-lg mb-8 leading-relaxed font-normal max-w-sm xl:max-w-md">
                <AnimatedTextScroll text="You bring the idea. We build it, back it, and take it further — just like a kangaroo carries its journey forward" delay={0.3} />
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <a href="/about" className="group inline-flex items-center justify-center px-6 py-3 border-2 border-[#0B4F9C] text-[#0B4F9C] font-semibold rounded-xl hover:bg-[#0B4F9C] hover:text-white transition-all duration-300">
                  Discover Who We Are
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </motion.div>
            </div>

            {/* Center Kangaroo Image */}
            <div className="w-full lg:w-[36%] xl:w-[40%] flex justify-center relative z-10 mt-8 lg:mt-0">
              <motion.img
                initial={{ opacity: 0, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeInOut" }}
                src="/about/animal.png"
                alt="Australian Technology"
                className="w-full max-w-[400px] md:max-w-[550px] lg:max-w-[650px] xl:max-w-[750px] h-auto object-contain transform transition-all duration-500 md:scale-[1.15] lg:scale-[1.15] xl:scale-[1.25] hover:scale-[1.05] md:hover:scale-[1.20] lg:hover:scale-[1.22] xl:hover:scale-[1.32] origin-bottom lg:origin-center drop-shadow-2xl hover:drop-shadow-[0_25px_40px_rgba(11,79,156,0.4)] hover:-translate-y-2 relative z-20 cursor-pointer"
              />
            </div>

            {/* Right Features */}
            <div className="w-full lg:w-[34%] xl:w-[28%] flex flex-col gap-6 lg:pl-6 xl:pl-10 z-20 mt-12 lg:mt-0">

              {/* Feature 1 */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex items-start gap-5 pb-6 border-b border-[#0B4F9C]/15 group"
              >
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center mt-0.5">
                  <Lightbulb className="w-10 h-10 text-[#F97316] transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-[#0B4F9C] text-[17px] xl:text-[19px] whitespace-nowrap xl:whitespace-normal font-bold mb-1.5 tracking-tight">01 — Carry Your Idea</h3>
                  <p className="text-[#111111] leading-relaxed text-[14px] xl:text-[15px] font-normal">
                    You bring the vision. We turn your idea into a powerful digital solution.
                  </p>
                </div>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex items-start gap-5 pb-6 border-b border-[#0B4F9C]/15 group"
              >
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center mt-0.5">
                  <Rocket className="w-10 h-10 text-[#F97316] transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-[#0B4F9C] text-[17px] xl:text-[19px] whitespace-nowrap xl:whitespace-normal font-bold mb-1.5 tracking-tight">02 — Take the Leap</h3>
                  <p className="text-[#111111] leading-relaxed text-[14px] xl:text-[15px] font-normal">
                    Smart technology that transforms opportunities into real business growth.
                  </p>
                </div>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="flex items-start gap-5 group"
              >
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center mt-0.5">
                  <RefreshCw className="w-10 h-10 text-[#F97316] transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-[#0B4F9C] text-[17px] xl:text-[19px] whitespace-nowrap xl:whitespace-normal font-bold mb-1.5 tracking-tight">03 — Keep Moving Forward</h3>
                  <p className="text-[#111111] leading-relaxed text-[14px] xl:text-[15px] font-normal">
                    We build, support, and evolve your technology as your business grows.
                  </p>
                </div>
              </motion.div>

            </div>

          </div>
        </div>
      </section>

      <ServicesSection />
      <SectorsSection />
      <ProductShowcase />


      {/* ===================== OUR PROCESS SECTION ===================== */}
      <section className="relative w-full overflow-hidden py-16 sm:py-20 lg:py-24 4xl:py-32 bg-gradient-to-b from-white via-[#F3F7FF] to-white">
        {/* Soft colour glows (no dots) */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#F97316]/10 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-40 w-[28rem] h-[28rem] rounded-full bg-[#0B4F9C]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 left-1/3 w-80 h-80 rounded-full bg-[#2563eb]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-[1440px] 4xl:max-w-[1900px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl 4xl:max-w-5xl mx-auto mb-12 lg:mb-8 4xl:mb-14"
          >
            <span className="block text-[#0B4F9C] font-bold text-xs sm:text-sm 4xl:text-base tracking-widest uppercase">Our Process</span>
            <span className="block w-10 h-0.5 bg-[#F97316] mx-auto mt-2 mb-4" />
            <h2 className="text-[clamp(1.75rem,4vw,3rem)] 4xl:text-[4rem] font-extrabold text-[#0B4F9C] leading-[1.15] tracking-tight">
              Your journey, <span className="text-[#F97316]">mapped out</span> step by step.
            </h2>
            <p className="mt-4 text-[#111111]/80 text-sm sm:text-base 4xl:text-xl leading-relaxed">
              New to working with a software partner? Here is exactly what happens, from the first conversation to long-term support. No jargon, no guesswork.
            </p>
          </motion.div>

          {/* Desktop journey row: glowing stops joined by dashed hop arcs */}
          <div className="hidden lg:block relative h-[80px] 4xl:h-[96px]">
            <svg
              className="absolute inset-0 w-full h-full overflow-visible"
              viewBox="0 0 1000 80"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
            >
              {processArcs.map((d, i) => (
                <motion.path
                  key={i}
                  d={d}
                  stroke="#F97316"
                  strokeWidth="2.5"
                  strokeDasharray="7 7"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.35, ease: 'easeInOut' }}
                />
              ))}
            </svg>

            {processSteps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, scale: 0.4 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ type: 'spring', bounce: 0.5, duration: 0.6, delay: 0.15 + i * 0.35 }}
                className="absolute top-[56px] -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${12.5 + i * 25}%` }}
              >
                <span className="absolute inset-0 rounded-full bg-[#F97316]/40 animate-ping" style={{ animationDuration: '2.6s' }} />
                <span className="relative flex items-center justify-center w-7 h-7 4xl:w-9 4xl:h-9 rounded-full bg-white ring-[3px] ring-[#F97316] shadow-[0_6px_16px_rgba(249,115,22,0.35)]">
                  <span className="w-2.5 h-2.5 4xl:w-3 4xl:h-3 rounded-full bg-[#0B4F9C]" />
                </span>
              </motion.div>
            ))}
          </div>

          {/* Cards: vertical timeline on mobile/tablet, 4 staggered columns on desktop */}
          <div className="relative max-w-2xl lg:max-w-none mx-auto">
            <div className="lg:hidden absolute left-[13px] top-6 bottom-6 border-l-2 border-dashed border-[#F97316]/60" aria-hidden="true" />

            <ol className="relative pl-12 space-y-6 sm:pl-14 lg:pl-0 lg:space-y-0 lg:grid lg:grid-cols-4">
              {processSteps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.li
                    key={s.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.12, ease: 'easeOut' }}
                    className="relative lg:px-3 xl:px-3.5 4xl:px-5 lg:even:mt-10 4xl:even:mt-14"
                  >
                    {/* Mobile stop */}
                    <span className="lg:hidden absolute -left-12 sm:-left-14 top-7 flex items-center justify-center w-7 h-7 rounded-full bg-white ring-[3px] ring-[#F97316] shadow-[0_6px_16px_rgba(249,115,22,0.35)]">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#0B4F9C]" />
                    </span>

                    <article className="group relative h-full overflow-hidden rounded-3xl bg-white/90 backdrop-blur border border-[#0B4F9C]/10 shadow-[0_12px_32px_rgba(11,79,156,0.09)] p-6 xl:p-7 4xl:p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_22px_48px_rgba(11,79,156,0.2)] hover:border-[#F97316]/40">
                      {/* Big faint icon as a decorative corner */}
                      <Icon
                        className="absolute -bottom-5 -right-5 w-32 h-32 4xl:w-44 4xl:h-44 -rotate-12 text-[#0B4F9C]/[0.06] transition-all duration-500 group-hover:text-[#F97316]/[0.14] group-hover:rotate-0 group-hover:scale-110 pointer-events-none"
                        strokeWidth={1.2}
                        aria-hidden="true"
                      />
                      {/* Glow on hover */}
                      <div className="absolute -top-16 -left-16 w-40 h-40 rounded-full bg-[#F97316]/0 group-hover:bg-[#F97316]/15 blur-2xl transition-all duration-500 pointer-events-none" />

                      <div className="relative">
                        {/* Icon + title */}
                        <div className="flex items-center gap-3.5 mb-3 4xl:mb-5">
                          <div className="w-12 h-12 4xl:w-16 4xl:h-16 shrink-0 rounded-2xl bg-gradient-to-br from-[#0B4F9C] to-[#2563eb] text-white flex items-center justify-center shadow-[0_8px_18px_rgba(11,79,156,0.35)] transition-all duration-300 group-hover:-rotate-6 group-hover:scale-105 group-hover:from-[#F97316] group-hover:to-[#fb923c] group-hover:shadow-[0_8px_18px_rgba(249,115,22,0.4)]">
                            <Icon className="w-6 h-6 4xl:w-8 4xl:h-8" strokeWidth={1.8} />
                          </div>
                          <h3 className="text-[#0B4F9C] font-extrabold text-xl xl:text-2xl 4xl:text-4xl tracking-tight">{s.title}</h3>
                        </div>

                        {/* Accent line grows on hover */}
                        <div className="w-8 group-hover:w-20 h-[3px] rounded-full bg-[#F97316] mb-3 4xl:mb-5 transition-all duration-500" />

                        {/* Paragraph */}
                        <p className="text-[#111111]/80 text-[14px] xl:text-[15px] 4xl:text-xl leading-relaxed">{s.desc}</p>
                      </div>
                    </article>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>
      {/* =================== END OUR PROCESS SECTION =================== */}

      <WhyChooseUsSection />
      <AsymmetricGallerySection />
      <CtaSection />
      <OurClientsSection />
      <TestimonialsSection />

    </div>
  );
}