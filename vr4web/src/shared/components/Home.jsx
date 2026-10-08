import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

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
    },
    labelPos: {
      320: { top: '50%', right: '100%', transform: 'translateY(-50%)', marginRight: '6px' },
      375: { top: '50%', right: '100%', transform: 'translateY(-50%)', marginRight: '6px' },
      425: { top: '50%', right: '100%', transform: 'translateY(-50%)', marginRight: '6px' },
      768: { top: '50%', right: '100%', transform: 'translateY(-50%)', marginRight: '6px' },
      1024: { top: '50%', right: '100%', transform: 'translateY(-50%)', marginRight: '6px' },
      1440: { top: '50%', right: '100%', transform: 'translateY(-50%)', marginRight: '6px' },
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
    },
    labelPos: {
      320: { bottom: '100%', right: '50%', marginBottom: '4px', marginRight: '-12px' },
      375: { bottom: '100%', right: '50%', marginBottom: '4px', marginRight: '-12px' },
      425: { bottom: '100%', right: '50%', marginBottom: '4px', marginRight: '-12px' },
      768: { bottom: '100%', right: '50%', marginBottom: '4px', marginRight: '-12px' },
      1024: { bottom: '100%', right: '50%', marginBottom: '4px', marginRight: '-12px' },
      1440: { bottom: '100%', right: '50%', marginBottom: '4px', marginRight: '-12px' },
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
    },
    labelPos: {
      320: { top: '100%', right: '50%', marginTop: '4px', marginRight: '-12px' },
      375: { top: '100%', right: '50%', marginTop: '4px', marginRight: '-12px' },
      425: { top: '100%', right: '50%', marginTop: '4px', marginRight: '-12px' },
      768: { top: '100%', right: '50%', marginTop: '4px', marginRight: '-12px' },
      1024: { top: '100%', right: '50%', marginTop: '4px', marginRight: '-12px' },
      1440: { top: '100%', right: '50%', marginTop: '4px', marginRight: '-12px' },
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
    },
    labelPos: {
      320: { top: '50%', left: '100%', transform: 'translateY(-50%)', marginLeft: '6px' },
      375: { top: '50%', left: '100%', transform: 'translateY(-50%)', marginLeft: '6px' },
      425: { top: '50%', left: '100%', transform: 'translateY(-50%)', marginLeft: '6px' },
      768: { top: '50%', left: '100%', transform: 'translateY(-50%)', marginLeft: '6px' },
      1024: { top: '50%', left: '100%', transform: 'translateY(-50%)', marginLeft: '6px' },
      1440: { top: '50%', left: '100%', transform: 'translateY(-50%)', marginLeft: '6px' },
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
    },
    labelPos: {
      320: { bottom: '100%', left: '50%', marginBottom: '4px', marginLeft: '-12px' },
      375: { bottom: '100%', left: '50%', marginBottom: '4px', marginLeft: '-12px' },
      425: { bottom: '100%', left: '50%', marginBottom: '4px', marginLeft: '-12px' },
      768: { bottom: '100%', left: '50%', marginBottom: '4px', marginLeft: '-12px' },
      1024: { bottom: '100%', left: '50%', marginBottom: '4px', marginLeft: '-12px' },
      1440: { bottom: '100%', left: '50%', marginBottom: '4px', marginLeft: '-12px' },
    }
  },
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

      {/* Hero Banner Section */}
      <section
        className="relative w-full h-[100vh] min-h-[600px] flex flex-col items-center justify-start pt-[100px] md:pt-[120px] overflow-hidden"
      >
        {/* Background Image with absolute positioning */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0 bg-[url('/mobileviewbanner.png')] md:bg-[url('/tabview.png')] lg:bg-[url('/banner1.png')]"
        >
          {/* Map Locations Responsive Styles */}
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
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-[#2563eb] drop-shadow-[0_4px_6px_rgba(37,99,235,0.6)] relative z-10">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  
                  {/* Unified Responsive Label */}
                  <span 
                    className={`label-${index} absolute text-[10px] md:text-[12px] lg:text-[13px] font-semibold text-slate-800 bg-white/95 backdrop-blur-md px-2 py-0.5 md:px-3 md:py-1 rounded-md shadow-sm md:shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-white/60 whitespace-nowrap tracking-wide z-20`}
                  >
                    {loc.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-20 max-w-6xl mx-auto px-6 flex flex-col items-center text-center w-full">

          <div className="mb-6">
            <p className="text-blue-950 font-semibold tracking-widest text-[10px] md:text-sm uppercase text-center px-4">
              <AnimatedText text="Software Solutions For A Brighter Australia" delay={0.2} />
            </p>
          </div>

          <h1
            className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-blue-950 tracking-tight leading-[1.1] mb-6 w-full text-center flex flex-col items-center px-4"
          >
            <AnimatedText 
              text="Powering Australian Businesses with" 
              delay={0.6} 
              className="whitespace-normal md:whitespace-nowrap leading-tight md:leading-[1.1]" 
            />
            <AnimatedText 
              text="Smarter Software" 
              delay={1.2} 
              className="text-white-black-border mt-2 md:mt-2 whitespace-nowrap inline-block" 
            />
          </h1>



        </div>
      </section>

      {/* Next Example Section to demonstrate scroll animations */}
      <section className="w-full bg-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Our Services</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">Delivering world-class digital solutions designed to scale your business.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-blue-600 font-bold text-xl">{item}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Service Package {item}</h3>
                <p className="text-slate-600 leading-relaxed">Comprehensive features and benefits designed to optimize your workflow and increase ROI across your entire organization.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
