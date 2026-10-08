import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, 
  Code2, 
  Monitor, 
  ShoppingCart, 
  Megaphone, 
  Palette, 
  Headphones,
  ArrowRight,
  Cloud,
  BarChart3,
  Settings
} from 'lucide-react';

const services = [
  {
    id: '01',
    title: 'App Development',
    desc: 'Powerful mobile experiences to connect your customers and grow your business.',
    icon: Smartphone,
    position: 'top', // top center
    color: '#F97316'
  },
  {
    id: '02',
    title: 'Software Application Development',
    desc: 'Scalable software solutions designed around your unique business needs.',
    icon: Code2,
    position: 'top-left',
    color: '#0B4F9C'
  },
  {
    id: '03',
    title: 'Web Design & Development',
    desc: 'High-performing websites that engage users and deliver real results.',
    icon: Monitor,
    position: 'top-right',
    color: '#0B4F9C'
  },
  {
    id: '04',
    title: 'E-commerce Solutions',
    desc: 'Digital commerce experiences to drive your business growth.',
    icon: ShoppingCart,
    position: 'mid-left',
    color: '#F97316'
  },
  {
    id: '05',
    title: 'Digital Marketing Solutions',
    desc: 'Data-driven strategies to reach, engage and convert your audience.',
    icon: Megaphone,
    position: 'mid-right',
    color: '#F97316'
  },
  {
    id: '06',
    title: 'Creative Solutions',
    desc: 'Design and digital experiences that make your brand stand out.',
    icon: Palette,
    position: 'bottom-left',
    color: '#0B4F9C'
  },
  {
    id: '07',
    title: 'Back Office Support',
    desc: 'Reliable operational support to help your business run efficiently.',
    icon: Headphones,
    position: 'bottom-right',
    color: '#0B4F9C'
  }
];

// Helper to determine exact absolute positions for desktop orbit
const getOrbitPosition = (position) => {
  switch(position) {
    case 'top': return { top: '2%', left: '33%', transform: 'translate(-50%, -50%)' };
    case 'top-left': return { top: '23%', left: '2%', transform: 'translateY(-50%)' };
    case 'top-right': return { top: '23%', right: '2%', transform: 'translateY(-50%)' };
    case 'mid-left': return { top: '55%', left: '0%', transform: 'translateY(-50%)' };
    case 'mid-right': return { top: '55%', right: '0%', transform: 'translateY(-50%)' };
    case 'bottom-left': return { top: '81%', left: '12%', transform: 'translateY(-50%)' };
    case 'bottom-right': return { top: '81%', right: '12%', transform: 'translateY(-50%)' };
    default: return {};
  }
};

export default function ServicesSection() {
  const [activeService, setActiveService] = useState(null);

  return (
    <section className="relative w-full py-10 lg:py-16 overflow-hidden bg-[#0B4F9C] font-['Inter',sans-serif]">
      
      <div className="relative z-10 w-full max-w-[1440px] 4xl:max-w-[2400px] mx-auto px-3 xs:px-4 sm:px-6 lg:px-7 xl:px-10 4xl:px-16 flex flex-col xl:flex-row items-center xl:items-start justify-between gap-12 xl:gap-6">
        
        {/* LEFT SIDE CONTENT - Aligned with Header Logo */}
        <div className="w-full xl:w-[30%] flex flex-col items-start z-20 pt-10 xl:pt-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-0.5 bg-[#F97316]"></div>
            <span className="text-white font-medium text-sm tracking-[0.2em] uppercase">Our Services</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[clamp(3rem,5vw,4.5rem)] font-extrabold leading-[1.05] tracking-tight mb-8"
          >
            <span className="text-white">From idea to</span><br />
            <span className="text-[#F97316]">impact.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white text-lg lg:text-[22px] leading-relaxed font-light max-w-md mb-12"
          >
            Seven capabilities. One technology partner to build, grow and simplify your business.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a href="/services" className="group inline-flex items-center justify-center px-8 py-4 border border-white/30 text-white font-medium rounded-xl hover:bg-white hover:text-[#0B4F9C] transition-all duration-300 backdrop-blur-sm">
              View All Services 
              <ArrowRight className="w-5 h-5 ml-3 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>

        {/* RIGHT SIDE: ORBITAL ECOSYSTEM (Desktop/Tablet) - Sized to align with 'Get a Quote' button */}
        <div className="hidden xl:flex w-full xl:w-[70%] relative min-h-[780px] items-center justify-center mt-10 xl:mt-0">
          
          {/* Orbital Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute w-[540px] h-[540px] border border-white/30 rounded-full border-dashed"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
              className="absolute w-[720px] h-[720px] border-2 border-[#F97316]/65 rounded-full shadow-[0_0_35px_rgba(249,115,22,0.35)]"
            >
              {/* Multiple Animated Orbital Balls - Exactly locked onto circular track */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                className="w-full h-full absolute inset-0 pointer-events-none"
              >
                {/* Orange Ball 1 - 0° */}
                <div className="absolute inset-0">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[#F97316] rounded-full shadow-[0_0_15px_#F97316,0_0_25px_#F97316]" />
                </div>

                {/* White Ball 1 - 72° */}
                <div className="absolute inset-0 rotate-[72deg]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_12px_#ffffff,0_0_20px_#ffffff]" />
                </div>

                {/* Orange Ball 2 - 144° */}
                <div className="absolute inset-0 rotate-[144deg]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#F97316] rounded-full shadow-[0_0_15px_#F97316]" />
                </div>

                {/* White Ball 2 - 216° */}
                <div className="absolute inset-0 rotate-[216deg]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_12px_#ffffff]" />
                </div>

                {/* Orange Ball 3 - 288° */}
                <div className="absolute inset-0 rotate-[288deg]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#F97316] rounded-full shadow-[0_0_15px_#F97316]" />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Central Technology Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="absolute z-10 w-[400px] h-[400px] flex items-center justify-center"
          >
            <motion.div 
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {/* Image rendered with mix-blend mode to drop its background slightly if not perfect, though it's solid blue */}
              <div className="relative w-full h-full flex items-center justify-center drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                 <img src="/services-home.png" alt="Technology Dashboard" className="w-[115%] h-auto max-w-none object-contain absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              
              {/* Floating UI Elements removed as per user request */}

            </motion.div>
          </motion.div>

          {/* Service Cards Orbiting */}
          <div className="absolute inset-0 w-full h-full">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isActive = activeService === service.id;
              
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                  className="absolute z-30"
                  style={getOrbitPosition(service.position)}
                  onMouseEnter={() => setActiveService(service.id)}
                  onMouseLeave={() => setActiveService(null)}
                >
                  <motion.div
                    animate={{ y: [-3, 3, -3] }}
                    transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className={`w-[215px] bg-white rounded-2xl p-2.5 px-3 shadow-[0_15px_35px_rgba(0,0,0,0.2)] border flex items-center gap-2.5 cursor-pointer transition-all duration-300 group ${isActive ? 'border-[#F97316] -translate-y-2 shadow-[0_20px_40px_rgba(249,115,22,0.15)]' : 'border-white/10 hover:-translate-y-1'}`}>
                      
                      {/* Icon Container */}
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300" style={{ backgroundColor: service.color }}>
                        <Icon className="w-4.5 h-4.5 text-white" />
                      </div>

                      <div className="flex-1 flex items-center justify-start">
                        <h3 className="text-[#0B4F9C] font-bold text-[12.5px] leading-snug tracking-tight">{service.title}</h3>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* MOBILE & TABLET FALLBACK: Stacked List */}
        <div className="flex xl:hidden w-full flex-col z-20 space-y-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full bg-white rounded-[20px] p-3.5 px-4 shadow-[0_15px_30px_rgba(0,0,0,0.15)] flex items-center gap-4 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: service.color }}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 flex items-center justify-start">
                  <h3 className="text-[#0B4F9C] font-bold text-[15px] leading-tight">{service.title}</h3>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
