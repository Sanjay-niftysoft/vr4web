import React from 'react';
import PageBanner from './common/PageBanner';
import CtaSection from './CtaSection';
import { 
  CheckCircle2, Monitor, BarChart, Settings, Cloud, 
  Smartphone, Lightbulb, Target, Shield, RefreshCw, 
  ArrowRight, ArrowLeft, Users, ChevronRight, MessageSquare, Phone,
  Briefcase, Activity, Map, Cpu, Zap, Globe,
  FileText, Calendar, Star, Search, Rocket, Award
} from 'lucide-react';

const C_WRAPPER = "w-full max-w-[1440px] 4xl:max-w-[2400px] mx-auto px-3 xs:px-4 sm:px-5 lg:px-2.5 xl:px-8 4xl:px-16";
const C_HEADING = "text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-bold leading-tight";
const C_SECTION = "py-10 sm:py-12 lg:py-16 2xl:py-24";

/* ── Auto-changing stacked image slider (Who We Are, left side) ── */
const WHO_SLIDES = [
  { src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1000', alt: 'Business collaboration', label: 'Business Collaboration' },
  { src: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1000', alt: 'Technology innovation', label: 'Technology Innovation' },
  { src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000', alt: 'Team collaboration', label: 'Team Collaboration' },
  { src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1000', alt: 'Developers at work', label: 'Developers at Work' },
  { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000', alt: 'Strategy session', label: 'Strategy Sessions' },
];

/* Speeds (ms): normal = one image every 2s, hover = one image every 0.9s */
const SLIDE_DELAY = 2000;
const SLIDE_DELAY_HOVER = 900;
const SLIDE_ANIM = 650;
const SLIDE_ANIM_HOVER = 500;

/* position of each card in the stack: 0 = front, 1/2 = layers behind, last = flying out */
const stackStyle = (offset, total) => {
  if (offset === 0) return { transform: 'translate3d(0,0,0) scale(1) rotate(0deg)', opacity: 1, zIndex: 30 };
  if (offset === 1) return { transform: 'translate3d(7%,-5%,0) scale(0.92)', opacity: 0.9, zIndex: 20 };
  if (offset === 2) return { transform: 'translate3d(14%,-10%,0) scale(0.84)', opacity: 0.65, zIndex: 10 };
  if (offset === total - 1) return { transform: 'translate3d(-30%,4%,0) scale(0.95) rotate(-8deg)', opacity: 0, zIndex: 40 };
  return { transform: 'translate3d(14%,-10%,0) scale(0.76)', opacity: 0, zIndex: 0 };
};

const ImageStackSlider = ({ className = '' }) => {
  const [active, setActive] = React.useState(0);
  const [hovered, setHovered] = React.useState(false);
  const total = WHO_SLIDES.length;

  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const delay = hovered ? SLIDE_DELAY_HOVER : SLIDE_DELAY;
    const t = setInterval(() => setActive((a) => (a + 1) % total), delay);
    return () => clearInterval(t);
  }, [hovered, total]);

  const animMs = hovered ? SLIDE_ANIM_HOVER : SLIDE_ANIM;

  return (
    <div
      className={`relative w-full aspect-square max-w-[340px] sm:max-w-[400px] lg:max-w-[440px] 2xl:max-w-[520px] mx-auto ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* soft backdrop circle */}
      <div className="absolute top-[2%] left-[-4%] w-[84%] aspect-square bg-[#EEF5F9]/80 rounded-full z-0"></div>

      {/* dotted accent */}
      <div className="absolute bottom-[10%] left-[-2%] z-0 text-[#96E0D1] opacity-80">
        <svg width="90" height="90" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 sm:w-[90px] sm:h-[90px]">
          <pattern id="plus" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </pattern>
          <rect x="0" y="0" width="100" height="100" fill="url(#plus)" />
        </svg>
      </div>

      {/* stacked cards */}
      <div className="absolute top-[12%] left-[4%] w-[74%] h-[72%]">
        {WHO_SLIDES.map((s, i) => {
          const offset = (i - active + total) % total;
          return (
            <div
              key={i}
              aria-hidden={offset !== 0}
              className="absolute inset-0 overflow-hidden rounded-3xl border-[6px] sm:border-[8px] border-white bg-white shadow-[0_24px_55px_rgba(11,31,75,0.25)] will-change-transform"
              style={{
                ...stackStyle(offset, total),
                transition: `transform ${animMs}ms cubic-bezier(0.22,1,0.36,1), opacity ${animMs}ms ease`,
              }}
            >
              <img src={s.src} alt={s.alt} className="w-full h-full object-cover" />
              {/* caption on the front card */}
              <div
                className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-[#0B1F4B]/85 to-transparent transition-opacity duration-500"
                style={{ opacity: offset === 0 ? 1 : 0 }}
              >
                <p className="text-white text-xs sm:text-sm lg:text-base font-bold tracking-wide">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* experience badge */}
      <div className="absolute bottom-[6%] right-[0%] z-40 flex items-center gap-2 sm:gap-3 bg-white rounded-2xl shadow-[0_14px_36px_rgba(11,31,75,0.18)] border border-[#C9E2FF] px-2.5 py-2 sm:px-4 sm:py-3">
        <span className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl bg-[#D92419] flex items-center justify-center shrink-0">
          <Award className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
        </span>
        <div className="leading-tight">
          <p className="text-base sm:text-2xl font-black text-[#0B4F9C]">10+</p>
          <p className="text-[9px] sm:text-xs font-bold uppercase tracking-wider text-[#64748B]">Years</p>
        </div>
      </div>

      {/* dots */}
      <div className="absolute bottom-[1%] left-[4%] z-40 flex items-center gap-2">
        {WHO_SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show image ${i + 1}`}
            onClick={() => setActive(i)}
            className={`h-2 rounded-full transition-all duration-300 ${i === active ? 'w-7 bg-[#D92419]' : 'w-2 bg-[#0B4F9C]/30 hover:bg-[#0B4F9C]/60'}`}
          />
        ))}
      </div>
    </div>
  );
};

/* Who We Are — background image: /public/aboutus.png (responsive on every screen) */
const WhoWeAre = () => (
  <section
    className="py-6 sm:py-8 lg:py-8 2xl:py-10 relative overflow-hidden bg-white bg-no-repeat bg-cover bg-center lg:bg-right-top"
    style={{ backgroundImage: "url('/aboutus.png')" }}
  >
    {/* light overlay so the text stays readable on every screen size */}
    <div className="absolute inset-0 bg-white/60 sm:bg-white/40 lg:bg-white/20 pointer-events-none z-0"></div>

    <div className={`${C_WRAPPER} relative z-10`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 2xl:gap-16 items-center">
        
        {/* Left Side: auto-changing stacked image slider */}
        <ImageStackSlider className="order-2 lg:order-1 mt-2 lg:mt-0" />

        {/* Right Side: Text */}
        <div className="relative z-10 lg:pl-10 order-1 lg:order-2">
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <span className="w-8 sm:w-12 h-[2px] bg-[#D92419]"></span>
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#D92419] uppercase">Who We Are</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-bold leading-tight text-[#0B4F9C] mb-3 sm:mb-4">
            Connecting Australian Businesses with Technology
          </h2>
          <div className="text-sm sm:text-base 2xl:text-lg text-black mb-4 sm:mb-5 space-y-3">
            <p>
              We help businesses grow through innovative technology, smart strategies, and reliable digital solutions that simplify operations and enhance customer experiences. Our focus is on understanding your needs and delivering scalable, user-focused solutions that drive efficiency, strengthen connections, and support long-term growth.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button className="bg-[#24B4A5] hover:bg-[#1D9E90] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 shadow-xl shadow-teal-500/20 w-fit">
              Learn More
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-[#0B4F9C] hover:bg-[#083a73] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold transition-all duration-300 shadow-xl shadow-blue-900/20 w-fit">
              Get a Quote
            </button>
          </div>
        </div>

      </div>
    </div>
  </section>
);

const TiltCard = ({ children, className }) => {
  const cardRef = React.useRef(null);
  const [style, setStyle] = React.useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: 'all 0.5s ease',
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    const tiltX = (y - 0.5) * -15; 
    const tiltY = (x - 0.5) * 15;
    
    setStyle({
      transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      zIndex: 10,
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'all 0.5s ease',
      boxShadow: 'none',
      zIndex: 1,
    });
  };

  return (
    <div
      ref={cardRef}
      className={className}
      style={{ ...style, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

const WhatWeDo = () => {
  const services = [
    {
      icon: Smartphone,
      title: "App Development",
      desc: "Custom mobile applications designed for seamless user experiences on iOS and Android. We build scalable, high-performance apps tailored to your specific business requirements."
    },
    {
      icon: Settings,
      title: "Software Application Development",
      desc: "Robust and scalable software solutions built to streamline your business operations. Our custom development ensures secure, efficient, and easily maintainable enterprise systems."
    },
    {
      icon: Monitor,
      title: "Web Design and Development",
      desc: "High-performing, responsive websites engineered for optimal engagement and functionality."
    },
    {
      icon: Briefcase,
      title: "E-commerce Solutions",
      desc: "Secure and intuitive digital storefronts optimized for maximum conversions and sales."
    },
    {
      icon: BarChart,
      title: "Digital Marketing Solutions",
      desc: "Data-driven strategies that strengthen online visibility and accelerate brand growth."
    },
    {
      icon: Lightbulb,
      title: "Creative Solutions",
      desc: "Innovative design and branding services that make your company stand out visually."
    },
    {
      icon: Users,
      title: "Back Office Support",
      desc: "Reliable administrative and technical support to keep your business running smoothly."
    },
    {
      icon: RefreshCw,
      title: "Website Redesign",
      desc: "Revitalize your digital presence with modern aesthetics and improved user experiences."
    }
  ];

  return (
    <section 
      className="py-8 sm:py-10 lg:py-10 2xl:py-12 relative text-white bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg1.png')" }}
    >
      <div className="absolute inset-0 bg-[#061834]/70 mix-blend-multiply pointer-events-none"></div>
      <div className={`${C_WRAPPER} relative z-10`}>

        {/* Compact heading row (keeps the section short) */}
        <div className="mb-5 lg:mb-6 max-w-3xl">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 sm:w-12 h-[2px] bg-[#D92419]"></span>
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#D92419] uppercase">Our Services</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
            Turning Technology into Business Opportunities
          </h2>
        </div>

        {/* 8 cards: 4 columns x 2 rows on desktop = one screen */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-4">
          {services.map((service, idx) => (
            <TiltCard 
              key={idx} 
              className="group flex flex-col bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl p-4 lg:p-5 hover:bg-white/20 hover:border-white/40 transition-all duration-300 cursor-pointer"
            >
              <div>
                <div 
                  className="flex items-center gap-3 mb-3"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <div className="w-10 h-10 lg:w-11 lg:h-11 shrink-0 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-[#D92419] transition-colors duration-300">
                    <service.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <h3 className="text-base lg:text-[17px] 2xl:text-lg font-bold leading-tight">
                    {service.title}
                  </h3>
                </div>
                <p 
                  className="text-white leading-snug text-[13px] lg:text-sm 2xl:text-[15px] font-medium"
                  style={{ transform: 'translateZ(20px)' }}
                >
                  {service.desc}
                </p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyChooseUs = () => {
  const features = [
    {
      icon: Target,
      title: "Business-First Approach",
      desc: "Solutions shaped around your objectives, customers, and operational needs."
    },
    {
      icon: Activity,
      title: "Built to Scale",
      desc: "Flexible digital systems designed to adapt as your business grows."
    },
    {
      icon: Shield,
      title: "Quality-Driven Delivery",
      desc: "A structured approach focused on usability, reliability, and attention to detail."
    },
    {
      icon: Users,
      title: "Long-Term Partnership",
      desc: "Collaborative support and practical guidance as your technology needs evolve."
    }
  ];

  const Icon0 = features[0].icon;
  const Icon1 = features[1].icon;
  const Icon2 = features[2].icon;
  const Icon3 = features[3].icon;

  return (
    <section className={`py-6 sm:py-8 lg:py-12 bg-white relative overflow-hidden`}>
      <div className={`${C_WRAPPER} relative z-10`}>
        <div className="flex flex-col xl:flex-row gap-12 lg:gap-16 2xl:gap-28 items-center text-center xl:text-left">
          
          {/* Left Column - Content */}
          <div className="w-full xl:w-1/3 shrink-0 flex flex-col items-center xl:items-start">
            <div className="mb-6">
              <span className="text-xs sm:text-sm font-bold tracking-widest text-[#D92419] uppercase block mb-1">Why Choose Us</span>
              <div className="w-10 h-1 bg-[#D92419]"></div>
            </div>
            
            <h2 className={`${C_HEADING} text-[#0B4F9C] mb-6 leading-tight`}>
              Technology Built Around Your <span className="text-[#D92419]">Business</span>
            </h2>
            
            <p className="text-sm sm:text-[15px] lg:text-base text-[#1a1a1a] font-medium leading-relaxed mb-8 max-w-md">
              Every business has different goals, challenges, and opportunities. We focus on delivering technology solutions that align with your priorities, simplify complex processes, and create a foundation for long-term growth.
            </p>
            
            <button className="bg-[#D92419] hover:bg-[#b01e15] text-white font-bold py-3 px-8 rounded shadow-md hover:shadow-lg transition-all duration-300 uppercase tracking-widest text-xs sm:text-sm">
              Learn More
            </button>
          </div>
          
          {/* Right Columns - Features Grid */}
          <div className="w-full xl:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 relative mt-8 xl:mt-0">
            {/* Vertical divider on desktop */}
            <div className="hidden md:block absolute top-4 bottom-4 left-1/2 w-px bg-gray-200 transform -translate-x-1/2"></div>
            
            {/* Column 1 (Features 0 and 1) */}
            <div className="flex flex-col md:mt-16">
              {/* Feature 0 */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 py-6 group cursor-pointer transition-all duration-300 hover:translate-x-1">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-[1.5px] border-[#D92419] flex items-center justify-center shrink-0 group-hover:bg-[#D92419] group-hover:shadow-[0_4px_12px_rgba(217,36,25,0.3)] transition-all duration-300">
                  <Icon0 className="w-6 h-6 sm:w-7 sm:h-7 text-[#D92419] group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#1a1a1a] mb-2">{features[0].title}</h3>
                  <p className="text-[15px] sm:text-base text-[#111111] leading-relaxed font-medium">{features[0].desc}</p>
                </div>
              </div>
              
              {/* Horizontal Divider */}
              <div className="w-full h-px bg-gray-200 my-1"></div>
              
              {/* Feature 1 */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 py-6 group cursor-pointer transition-all duration-300 hover:translate-x-1">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-[1.5px] border-[#D92419] flex items-center justify-center shrink-0 group-hover:bg-[#D92419] group-hover:shadow-[0_4px_12px_rgba(217,36,25,0.3)] transition-all duration-300">
                  <Icon1 className="w-6 h-6 sm:w-7 sm:h-7 text-[#D92419] group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#1a1a1a] mb-2">{features[1].title}</h3>
                  <p className="text-[15px] sm:text-base text-[#111111] leading-relaxed font-medium">{features[1].desc}</p>
                </div>
              </div>
            </div>
            
            {/* Column 2 (Features 2 and 3) */}
            <div className="flex flex-col">
              {/* Horizontal Divider (only on mobile, between Col 1 and Col 2) */}
              <div className="md:hidden w-full h-px bg-gray-200 my-1"></div>

              {/* Feature 2 */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 py-6 group cursor-pointer transition-all duration-300 hover:translate-x-1">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-[1.5px] border-[#D92419] flex items-center justify-center shrink-0 group-hover:bg-[#D92419] group-hover:shadow-[0_4px_12px_rgba(217,36,25,0.3)] transition-all duration-300">
                  <Icon2 className="w-6 h-6 sm:w-7 sm:h-7 text-[#D92419] group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#1a1a1a] mb-2">{features[2].title}</h3>
                  <p className="text-[15px] sm:text-base text-[#111111] leading-relaxed font-medium">{features[2].desc}</p>
                </div>
              </div>
              
              {/* Horizontal Divider */}
              <div className="w-full h-px bg-gray-200 my-1"></div>
              
              {/* Feature 3 */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 py-6 group cursor-pointer transition-all duration-300 hover:translate-x-1">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-[1.5px] border-[#D92419] flex items-center justify-center shrink-0 group-hover:bg-[#D92419] group-hover:shadow-[0_4px_12px_rgba(217,36,25,0.3)] transition-all duration-300">
                  <Icon3 className="w-6 h-6 sm:w-7 sm:h-7 text-[#D92419] group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#1a1a1a] mb-2">{features[3].title}</h3>
                  <p className="text-[15px] sm:text-base text-[#111111] leading-relaxed font-medium">{features[3].desc}</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

const AnimatedCounter = ({ endValue, suffix = "" }) => {
  const [count, setCount] = React.useState(0);
  const [inView, setInView] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const increment = endValue / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= endValue) {
        setCount(endValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, endValue]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
};

const OurStory = () => {
  const stats = [
    { number: 150, suffix: "+", label: "PROJECTS DELIVERED", icon: FileText },
    { number: 10, suffix: "+", label: "YEARS IN BUSINESS", icon: Calendar },
    { number: 20, suffix: "+", label: "INDUSTRIES SERVED", icon: Users },
    { number: 100, suffix: "%", label: "CLIENT SATISFACTION", icon: Star }
  ];

  /* Palette: Red, Yellow, Light Blue, Navy Blue */
  const RED = '#D92419';
  const YELLOW = '#FFC20E';
  const LIGHT_BLUE = '#E5F1FF';
  const NAVY = '#102D61';

  /* tick goes up forever: card = tick % 4 comes to the front one by one,
     colour = red on even ticks, yellow on odd ticks */
  const [tick, setTick] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (paused) return;
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setTick((n) => n + 1), 1800);
    return () => clearInterval(t);
  }, [paused]);

  const activeIdx = tick % stats.length;
  const accent = tick % 2 === 0 ? RED : YELLOW;
  const accentText = tick % 2 === 0 ? '#FFFFFF' : NAVY;

  return (
    <section className={`${C_SECTION} bg-white relative overflow-hidden`}>
      {/* Soft light-blue bubble on the left */}
      <div className="absolute top-1/2 left-[-40%] sm:left-[-20%] lg:left-[-8%] w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] lg:w-[540px] lg:h-[540px] 2xl:w-[680px] 2xl:h-[680px] bg-[#F1F7F8] rounded-full z-0 transform -translate-y-1/2 pointer-events-none"></div>
      
      {/* Decorative yellow bubble on the far right */}
      <div className="hidden lg:block absolute top-[25%] -right-[3%] w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full z-0 opacity-80 pointer-events-none" style={{ background: YELLOW }}></div>
      
      <div className={`${C_WRAPPER} relative z-10`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 2xl:gap-24 items-center relative z-10">
          
          {/* Left Side: Content */}
          <div>
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <span className="w-8 sm:w-12 h-[2px] bg-[#D92419]"></span>
              <span className="text-xs sm:text-sm font-bold tracking-widest text-[#D92419] uppercase">Our Story</span>
            </div>
            <h2 className={`${C_HEADING} text-[#0B4F9C] mb-4 sm:mb-6 leading-tight`}>
              A Trusted Technology Partner Built on Results.
            </h2>
            <div className="text-base sm:text-lg 2xl:text-xl text-[#1a1a1a] space-y-6">
              <p>
                What began as a dedicated team helping businesses navigate technology has grown into a <strong className="text-[#0B4F9C]">full-service digital partner</strong>. Along the way, one thing hasn't changed: we still treat every project like it's the only one that matters — delivering reliable, scalable, and tailored solutions.
              </p>
              <p>
                Today we work with startups, established brands, and everything in between — building digital systems that are <strong className="text-[#0B4F9C]">robust, secure</strong>, and built to <strong className="text-[#0B4F9C]">drive real business growth</strong>. From web development to digital marketing, our focus remains on turning your challenges into digital opportunities.
              </p>
            </div>
          </div>

          {/* Right Side: Stats Grid — cards come to the front one by one */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6"
            onMouseLeave={() => setPaused(false)}
          >
            {stats.map((stat, idx) => {
              const isActive = idx === activeIdx;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => { setPaused(true); setTick(tick - (tick % 4) + idx); }}
                  className="group relative overflow-hidden rounded-[24px] p-6 lg:p-8 flex items-center cursor-pointer bg-white"
                  style={{
                    border: `2px solid ${isActive ? accent : '#C9E2FF'}`,
                    background: idx % 3 === 0 ? '#F3F8FE' : '#FFFFFF',
                    transform: isActive ? 'translateY(-10px) scale(1.05)' : 'translateY(0) scale(1)',
                    zIndex: isActive ? 20 : 1,
                    boxShadow: isActive
                      ? `0 28px 50px -12px ${accent}66, 0 10px 20px rgba(16,45,97,0.18)`
                      : '0 2px 6px rgba(16,45,97,0.05)',
                    transition: 'transform 700ms cubic-bezier(0.22,1,0.36,1), box-shadow 700ms ease, border-color 500ms ease',
                  }}
                >
                  {/* Decorative bottom-right circle: light blue, turns accent when active */}
                  <div
                    className="absolute -bottom-10 -right-10 w-28 h-28 lg:w-36 lg:h-36 rounded-full pointer-events-none"
                    style={{
                      background: isActive ? accent : LIGHT_BLUE,
                      opacity: isActive ? 0.22 : 0.8,
                      transform: isActive ? 'scale(1.25)' : 'scale(1)',
                      transition: 'all 700ms ease',
                    }}
                  ></div>
                  
                  {/* Icon container: light blue -> red / yellow when active */}
                  <div
                    className="relative z-10 w-16 h-16 lg:w-[86px] lg:h-[86px] rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background: isActive ? accent : LIGHT_BLUE,
                      transition: 'background 500ms ease',
                    }}
                  >
                    <stat.icon
                      className="w-6 h-6 lg:w-8 lg:h-8"
                      strokeWidth={1.5}
                      style={{
                        color: isActive ? accentText : NAVY,
                        transform: isActive ? 'scale(1.2)' : 'scale(1)',
                        transition: 'all 500ms ease',
                      }}
                    />
                  </div>
                  
                  {/* Vertical divider */}
                  <div
                    className="relative z-10 h-14 lg:h-[70px] w-px mx-4 lg:mx-6 shrink-0"
                    style={{ background: isActive ? accent : '#C9E2FF', transition: 'background 500ms ease' }}
                  ></div>
                  
                  {/* Text content */}
                  <div className="relative z-10 flex flex-col justify-center">
                    <div className="text-4xl lg:text-[40px] xl:text-[48px] 2xl:text-[52px] font-black leading-none mb-1 lg:mb-2 tracking-tight whitespace-nowrap" style={{ color: NAVY }}>
                      <AnimatedCounter endValue={stat.number} suffix={stat.suffix} />
                    </div>
                    <div className="text-[11px] lg:text-[13px] font-bold tracking-wider text-[#64748B] uppercase">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
        </div>
      </div>
    </section>
  );
};

const Expertise = () => {
  const capabilities = [
    "Modern web and application development",
    "Digital transformation and integration",
    "Business workflow automation",
    "Data-driven digital experiences",
    "Scalable technology solutions",
    "User-focused interface design"
  ];

  return (
    <section className={`${C_SECTION} bg-white`}>
      <div className={C_WRAPPER}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 2xl:gap-24 items-center">
          <div className="order-2 lg:order-1 relative mt-8 lg:mt-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0B4F9C] to-[#07366b] rounded-3xl transform -translate-x-3 translate-y-3 sm:-translate-x-4 sm:translate-y-4"></div>
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200" 
              alt="Digital Analytics Dashboard" 
              className="relative z-10 rounded-2xl sm:rounded-3xl w-full h-64 sm:h-80 lg:h-[450px] 2xl:h-[600px] object-cover shadow-2xl"
            />
            {/* Abstract connected node visual */}
            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-white p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl shadow-xl z-20 flex flex-col items-center">
              <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-[#F5F8FC] rounded-full flex items-center justify-center">
                  <Cpu className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#0B4F9C]" />
                </div>
                <div className="h-[2px] w-4 sm:w-6 lg:w-8 bg-gray-300"></div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-[#D92419]/10 rounded-full flex items-center justify-center">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#D92419]" />
                </div>
              </div>
              <p className="text-[9px] sm:text-[10px] lg:text-xs font-bold text-[#0B4F9C] uppercase tracking-wider mt-2 sm:mt-3 lg:mt-4">Tech Integrated</p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <span className="w-8 sm:w-12 h-[2px] bg-[#D92419]"></span>
              <span className="text-xs sm:text-sm font-bold tracking-widest text-[#D92419] uppercase">Our Expertise</span>
            </div>
            <h2 className={`${C_HEADING} text-[#0B4F9C] mb-4 sm:mb-6`}>
              Digital Capabilities That Move Businesses Forward
            </h2>
            <p className="text-base sm:text-lg 2xl:text-xl text-[#1a1a1a] mb-6 sm:mb-8 leading-relaxed">
              We bring together modern development practices, thoughtful design, and practical technology integration to help businesses create efficient digital experiences and improve how they operate.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-y-4 gap-x-4 sm:gap-x-6 lg:gap-x-8">
              {capabilities.map((cap, idx) => (
                <div key={idx} className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#D92419] shrink-0 mt-0.5 sm:mt-1" />
                  <span className="text-[#1a1a1a] font-medium text-sm sm:text-base 2xl:text-lg">{cap}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Industries = () => {
  const industries = [
    { title: "Finance & Professional Services", desc: "Secure digital portals and client solutions.", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" },
    { title: "Retail & E-commerce", desc: "Scalable storefronts and operational systems.", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800" },
    { title: "Construction & Infrastructure", desc: "Digital management and presence tools.", img: "https://images.unsplash.com/photo-1541888086925-eb3225f6c8d4?auto=format&fit=crop&q=80&w=800" },
    { title: "Healthcare & Education", desc: "Accessible, user-focused digital platforms.", img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800" },
    { title: "Manufacturing & Industrial", desc: "Technology to streamline complex workflows.", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" },
    { title: "Small & Medium Businesses", desc: "Practical technology for sustained growth.", img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800" },
  ];

  return (
    <section className={`${C_SECTION} bg-gray-50`}>
      <div className={C_WRAPPER}>
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12 lg:mb-16">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <span className="w-8 sm:w-12 h-[2px] bg-[#D92419]"></span>
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#D92419] uppercase">Industries We Support</span>
            <span className="w-8 sm:w-12 h-[2px] bg-[#D92419]"></span>
          </div>
          <h2 className={`${C_HEADING} text-[#0B4F9C] mb-4 sm:mb-5`}>
            Technology for Industries That Keep Business Moving
          </h2>
          <p className="text-base sm:text-lg 2xl:text-xl text-[#1a1a1a]">
            Different industries face different digital challenges. We focus on adaptable technology solutions that help organisations improve workflows, enhance customer experiences, and make better use of digital opportunities.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 2xl:gap-8">
          {industries.map((ind, idx) => (
            <div key={idx} className="group relative h-56 sm:h-64 lg:h-72 2xl:h-96 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg cursor-pointer">
              <img 
                src={ind.img} 
                alt={ind.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B4F9C] via-[#0B4F9C]/70 to-transparent opacity-90 transition-opacity duration-300"></div>
              <div className="absolute inset-0 p-5 sm:p-6 lg:p-8 flex flex-col justify-end">
                <h3 className="text-lg sm:text-xl lg:text-2xl 2xl:text-3xl font-bold text-white mb-1 sm:mb-2 translate-y-2 sm:translate-y-3 lg:translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{ind.title}</h3>
                <p className="text-white/90 text-xs sm:text-sm lg:text-base 2xl:text-lg opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">{ind.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  /* x / y are PERCENTAGES of the timeline box, so the dots always sit exactly
     on the curve at every screen size (curve points: 15%/50%, 40%/60%, 65%/40%, 85%/52%). */
  const steps = [
    { 
      num: "01", 
      title: "Discover", 
      desc: "Understand the business, target audience, challenges, and goals.",
      icon: Search,
      theme: "blue",
      position: "top",
      x: "15%",
      y: 46
    },
    { 
      num: "02", 
      title: "Strategise", 
      desc: "Define the solution, project scope, technology approach, and delivery plan.",
      icon: Lightbulb,
      theme: "red",
      position: "bottom",
      x: "40%",
      y: 58
    },
    { 
      num: "03", 
      title: "Develop", 
      desc: "Design, build, integrate, and refine the solution with attention to quality and usability.",
      icon: Settings,
      theme: "blue-strong",
      position: "top",
      x: "65%",
      y: 42
    },
    { 
      num: "04", 
      title: "Deliver & Improve", 
      desc: "Launch the solution, review its performance, and identify opportunities for continued improvement.",
      icon: Rocket,
      theme: "red",
      position: "bottom",
      x: "85%",
      y: 54
    }
  ];

  return (
    <section 
      className="py-8 sm:py-10 lg:py-10 relative overflow-hidden bg-cover bg-center bg-no-repeat bg-white"
      style={{ backgroundImage: "url('/bg-aboutus.png')" }}
    >
      <div className="absolute inset-0 bg-white/40"></div> {/* Optional light overlay to ensure text readability */}

      <div className={`${C_WRAPPER} relative z-10`}>
        
        {/* Left-Aligned Heading */}
        <div className="max-w-3xl mb-6 lg:mb-0 relative z-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-[#EF2929]"></span>
            <span className="text-xs font-bold tracking-widest text-[#EF2929] uppercase">How We Work</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B4FA3] mb-2 leading-[1.15] tracking-tight">
            Your Digital Journey,<br />Mapped Out Step by Step
          </h2>

        </div>

        {/* Desktop Flowing Timeline (Hidden on mobile) — taller box = more room above/below the nodes */}
        <div className="hidden lg:block relative w-full h-[540px] 2xl:h-[560px] mt-0">
          {/* SVG Curved Path */}
          <svg width="100%" height="100%" viewBox="0 0 1000 500" preserveAspectRatio="none" className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="timeline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="40%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EF2929" />
              </linearGradient>
            </defs>
            <path 
              d="M -50 230 C 50 230, 100 230, 150 230 C 250 230, 300 290, 400 290 C 500 290, 550 210, 650 210 C 750 210, 750 270, 850 270 C 925 270, 1050 250, 1050 250" 
              fill="none" 
              stroke="url(#timeline-gradient)" 
              strokeWidth="2.5" 
              vectorEffect="non-scaling-stroke" 
            />
            {/* Animated Traveling Ball */}
            <circle r="6" fill="#0B4FA3">
              <animateMotion 
                dur="8s" 
                repeatCount="indefinite" 
                path="M -50 230 C 50 230, 100 230, 150 230 C 250 230, 300 290, 400 290 C 500 290, 550 210, 650 210 C 750 210, 750 270, 850 270 C 925 270, 1050 250, 1050 250"
              />
            </circle>
            <circle r="4" fill="#60A5FA">
              <animateMotion 
                dur="8s" 
                repeatCount="indefinite" 
                path="M -50 230 C 50 230, 100 230, 150 230 C 250 230, 300 290, 400 290 C 500 290, 550 210, 650 210 C 750 210, 750 270, 850 270 C 925 270, 1050 250, 1050 250"
              />
            </circle>
          </svg>

          {/* Desktop Nodes */}
          {steps.map((step, idx) => {
            const isTop = step.position === 'top';
            const isBlue = step.theme.includes('blue');
            const isStrong = step.theme === 'blue-strong';
            
            const dotColor = isBlue ? 'bg-[#3B82F6]' : 'bg-[#EF2929]';
            const dotGlow = isStrong 
              ? 'shadow-[0_0_20px_6px_rgba(59,130,246,0.5)] scale-[1.35]' 
              : isBlue 
                ? 'shadow-[0_0_12px_2px_rgba(59,130,246,0.3)]' 
                : 'shadow-[0_0_12px_2px_rgba(239,41,41,0.3)]';
                
            const iconBg = isBlue ? 'bg-[#EFF6FF]' : 'bg-[#FEF2F2]';
            const iconColor = isBlue ? 'text-[#0B4FA3]' : 'text-[#EF2929]';
            const lineGradient = isBlue 
              ? (isTop ? 'bg-gradient-to-t from-[#3B82F6] to-transparent' : 'bg-gradient-to-b from-[#3B82F6] to-transparent')
              : (isTop ? 'bg-gradient-to-t from-[#EF2929] to-transparent' : 'bg-gradient-to-b from-[#EF2929] to-transparent');

            return (
              <div 
                key={idx}
                className="absolute w-[240px] flex flex-col items-center group cursor-default"
                style={{ 
                  left: step.x, 
                  top: `${step.y}%`,
                  transform: isTop ? 'translate(-50%, calc(-100% + 10px))' : 'translate(-50%, -10px)'
                }}
              >
                {isTop && (
                  <>
                    <div className="relative flex flex-col items-center text-center mb-2">
                      <div className={`relative z-10 w-11 h-11 ${iconBg} rounded-xl flex items-center justify-center mb-2 shadow-sm border border-white group-hover:-translate-y-1 transition-transform duration-300`}>
                        <step.icon className={`w-6 h-6 ${iconColor}`} />
                      </div>
                      <div className="relative">
                        <h3 className="relative z-10 text-xl font-bold text-[#0B4FA3] mb-1">{step.title}</h3>
                        <p className="relative z-10 text-[13.5px] text-[#1a1a1a] font-medium leading-snug px-2">{step.desc}</p>
                      </div>
                    </div>
                    <div className={`w-[1px] h-8 ${lineGradient} mb-1 opacity-60`}></div>
                    <div className={`w-[20px] h-[20px] rounded-full ${dotColor} border-[4px] border-white ${dotGlow} relative z-20 transition-all duration-300`}></div>
                  </>
                )}
                
                {!isTop && (
                  <>
                    <div className={`w-[20px] h-[20px] rounded-full ${dotColor} border-[4px] border-white ${dotGlow} relative z-20 transition-all duration-300`}></div>
                    <div className={`w-[1px] h-8 ${lineGradient} mt-1 opacity-60`}></div>
                    <div className="relative flex flex-col items-center text-center mt-2">
                      <div className={`relative z-10 w-11 h-11 ${iconBg} rounded-xl flex items-center justify-center mb-2 shadow-sm border border-white group-hover:translate-y-1 transition-transform duration-300`}>
                        <step.icon className={`w-6 h-6 ${iconColor}`} />
                      </div>
                      <div className="relative">
                        <h3 className="relative z-10 text-xl font-bold text-[#0B4FA3] mb-1">{step.title}</h3>
                        <p className="relative z-10 text-[13.5px] text-[#1a1a1a] font-medium leading-snug px-2">{step.desc}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile/Tablet Vertical Timeline */}
        <div className="lg:hidden relative mt-12 pl-8">
          <div className="absolute top-4 bottom-4 left-[15px] w-[2px] bg-gradient-to-b from-[#3B82F6] via-[#8B5CF6] to-[#EF2929] opacity-40"></div>
          
          <div className="flex flex-col gap-10">
            {steps.map((step, idx) => {
              const isBlue = step.theme.includes('blue');
              const isStrong = step.theme === 'blue-strong';
              const dotColor = isBlue ? 'bg-[#3B82F6]' : 'bg-[#EF2929]';
              const dotGlow = isStrong ? 'shadow-[0_0_15px_4px_rgba(59,130,246,0.4)] scale-110' : 'shadow-md';
              const iconBg = isBlue ? 'bg-[#EFF6FF]' : 'bg-[#FEF2F2]';
              const iconColor = isBlue ? 'text-[#0B4FA3]' : 'text-[#EF2929]';

              return (
                <div key={idx} className="relative group">
                  <div className={`absolute -left-[33px] top-4 w-[18px] h-[18px] rounded-full ${dotColor} border-[3px] border-white ${dotGlow} z-10`}></div>
                  
                  <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_rgb(0,0,0,0.04)] border border-gray-50 relative overflow-hidden">
                    <div className="relative z-10">
                      <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center mb-4 border border-white shadow-sm`}>
                        <step.icon className={`w-5 h-5 ${iconColor}`} />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#0B4FA3] mb-3">{step.title}</h3>
                      <p className="text-sm sm:text-base text-[#475569] leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

const MissionVision = () => {
  const [activeId, setActiveId] = React.useState(null);
  const [isMobile, setIsMobile] = React.useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const panels = [
    {
      id: 0,
      bg: 'bg-[#8B0000]',
      title: 'OUR MISION',
      desc: [
        'To deliver innovative, reliable, and scalable technology solutions that empower businesses to thrive in a digital-first world. We focus on solving complex challenges through smart engineering and intuitive design.',
        'By combining our deep technical expertise with a clear understanding of your business goals, we bridge the gap between ambitious ideas and functional realities, ensuring every project delivers measurable, long-term impact.'
      ],
      extraDesc: 'Our team is driven by a passion for continuous learning and adaptation. We don’t just write code; we craft digital ecosystems that scale with your business and respond intelligently to market shifts.'
    },
    {
      id: 1,
      bg: 'bg-white',
      img: '/1.png'
    },
    {
      id: 2,
      bg: 'bg-white',
      img: '/2.png'
    },
    {
      id: 3,
      bg: 'bg-[#0877D1]',
      title: 'OUR VISION',
      desc: [
        'To be the leading digital partner for forward-thinking organizations, shaping the future of web and enterprise technology through continuous innovation, collaboration, and a relentless pursuit of excellence.',
        'We envision a digital landscape where businesses of all sizes can leverage cutting-edge technology without friction. We strive to set new industry standards and foster partnerships built on trust, transparency, and shared success.'
      ],
      extraDesc: 'We believe that technology should be an enabler, not a barrier. By breaking down technical silos and building open, extensible architectures, we aim to build a future where every digital interaction is seamless and powerful.'
    }
  ];

  const gridStyle = isMobile ? {
    gridTemplateColumns: '1fr',
    gridTemplateRows: activeId === 0 ? '2fr 1fr' : activeId === 3 ? '1fr 2fr' : '1fr 1fr'
  } : {
    gridTemplateColumns: activeId === 0 || activeId === 2 ? '65% 35%' : activeId === 1 || activeId === 3 ? '35% 65%' : '50% 50%',
    gridTemplateRows: activeId === 0 || activeId === 1 ? '65% 35%' : activeId === 2 || activeId === 3 ? '35% 65%' : '50% 50%'
  };

  return (
    <section className={`${C_SECTION} bg-[#F5F8FC]`}>
      <div className={C_WRAPPER}>
        
        {/* Section Heading */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12 lg:mb-16">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <span className="w-8 sm:w-12 h-[2px] bg-[#D92419]"></span>
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#D92419] uppercase">Purpose & Future</span>
            <span className="w-8 sm:w-12 h-[2px] bg-[#D92419]"></span>
          </div>
          <h2 className={`${C_HEADING} text-[#0B4F9C]`}>
            Our Mission & Vision
          </h2>
        </div>

        <div 
          className="w-full grid h-[600px] md:h-[600px] lg:h-[700px] transition-[grid-template-columns,grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden rounded-2xl shadow-xl"
          style={gridStyle}
        >
          {panels.map((panel, idx) => {
            if (isMobile && panel.img) return null;
            return (
              <div 
                key={idx}
                onClick={() => setActiveId(activeId === idx ? null : idx)}
                className={`relative group cursor-pointer overflow-hidden ${panel.bg} flex flex-col justify-center items-center`}
              >
            {/* Subtle Gradient Shadow */}
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"></div>

            {panel.title ? (
              <div className="w-full h-full p-8 sm:p-12 lg:p-16 xl:p-24 flex flex-col justify-center relative z-10 transition-transform duration-500 group-hover:scale-[1.02]">
                {activeId === idx && (
                  <button 
                    className="absolute top-4 left-4 lg:top-8 lg:left-8 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-xl flex items-center justify-center backdrop-blur-sm transition-colors z-50 shadow-sm"
                    onClick={(e) => { e.stopPropagation(); setActiveId(null); }}
                    aria-label="Close panel"
                  >
                    <ArrowLeft className="w-5 h-5 text-white" />
                  </button>
                )}
                <div className={`flex flex-col h-full w-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${activeId === idx ? 'justify-center items-start' : 'justify-center items-center'}`}>
                  <h3 className={`font-black text-white uppercase transition-all duration-700 ease-in-out ${activeId === idx ? 'text-3xl lg:text-5xl 2xl:text-6xl mb-6 text-left tracking-tight' : 'text-4xl sm:text-5xl lg:text-6xl 2xl:text-[80px] mb-4 lg:mb-6 text-center leading-[1.05] tracking-tighter'}`}>
                    {panel.title.split(' ').map((word, i) => (
                      <span key={i} className={activeId === idx ? "inline-block mr-3 lg:mr-4" : "block"}>{word}</span>
                    ))}
                  </h3>
                  
                  <div className={`transition-all duration-700 max-w-lg flex flex-col ${activeId === idx ? 'text-left items-start' : 'text-center items-center'}`}>
                    <p className={`text-white/95 text-sm lg:text-base 2xl:text-[17px] font-medium leading-relaxed transition-all duration-700 ${activeId === idx ? '' : 'line-clamp-2'}`}>
                      {Array.isArray(panel.desc) ? panel.desc[0] : panel.desc}
                    </p>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeId === idx ? 'max-h-0 opacity-0 mt-0' : 'max-h-[40px] opacity-100 mt-3 sm:mt-4'}`}>
                      <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-white/80 hover:text-white uppercase tracking-widest transition-colors duration-300 group-hover:text-white">
                        See More <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${activeId === idx ? 'max-h-[800px] opacity-100 mt-4 lg:mt-5' : 'max-h-0 opacity-0 mt-0'}`}
                  >
                    <div className="space-y-4 lg:space-y-5">
                      {Array.isArray(panel.desc) && panel.desc.length > 1 && panel.desc.slice(1).map((p, i) => (
                        <p key={i} className="text-white/95 text-sm lg:text-base 2xl:text-[17px] font-medium max-w-lg leading-relaxed">{p}</p>
                      ))}
                      <p className="text-white/80 text-xs sm:text-sm lg:text-[15px] 2xl:text-base leading-relaxed max-w-lg pt-2">{panel.extraDesc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full flex items-center justify-center z-10 p-10">
                {activeId === idx && (
                  <button 
                    className="absolute top-4 left-4 lg:top-8 lg:left-8 w-10 h-10 bg-black/5 hover:bg-black/10 rounded-xl flex items-center justify-center backdrop-blur-sm transition-colors z-50 shadow-sm"
                    onClick={(e) => { e.stopPropagation(); setActiveId(null); }}
                    aria-label="Close panel"
                  >
                    <ArrowLeft className="w-5 h-5 text-[#555]" />
                  </button>
                )}
                <img 
                  src={panel.img} 
                  alt="Illustration" 
                  className={`max-w-[70%] max-h-[70%] object-contain mix-blend-multiply transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${activeId === idx ? 'scale-[1.15]' : 'group-hover:scale-110 group-hover:-translate-y-2'}`} 
                />
              </div>
            )}
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Commitment = () => (
  <section className={`${C_SECTION} bg-white`}>
    <div className={C_WRAPPER}>
      <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12 lg:mb-16">
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          <span className="w-8 sm:w-12 h-[2px] bg-[#D92419]"></span>
          <span className="text-xs sm:text-sm font-bold tracking-widest text-[#D92419] uppercase">Our Commitment</span>
          <span className="w-8 sm:w-12 h-[2px] bg-[#D92419]"></span>
        </div>
        <h2 className={`${C_HEADING} text-[#0B4F9C] mb-4 sm:mb-5`}>
          Digital Solutions Designed Around Real Business Needs
        </h2>
        <p className="text-base sm:text-lg 2xl:text-xl text-[#1a1a1a]">
          We are committed to creating digital solutions that balance business objectives, user experience, and technical reliability. By combining thoughtful planning with modern technology, we aim to help organisations improve processes, strengthen digital engagement, and pursue new opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 2xl:gap-10">
        <div className="text-center p-6 sm:p-8 2xl:p-10 bg-[#F5F8FC] rounded-2xl border border-gray-200 hover:border-[#0B4F9C]/40 transition-colors duration-300">
          <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 2xl:w-20 2xl:h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-4 sm:mb-5 lg:mb-6">
            <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 2xl:w-10 2xl:h-10 text-[#0B4F9C]" />
          </div>
          <h3 className="text-lg sm:text-xl 2xl:text-2xl font-bold text-[#0B4F9C] mb-2 sm:mb-3 lg:mb-4">Quality in Every Detail</h3>
          <p className="text-[#1a1a1a] text-sm sm:text-base 2xl:text-lg">Thoughtful execution and attention to usability.</p>
        </div>
        <div className="text-center p-6 sm:p-8 2xl:p-10 bg-[#F5F8FC] rounded-2xl border border-gray-200 hover:border-[#D92419]/40 transition-colors duration-300">
          <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 2xl:w-20 2xl:h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-4 sm:mb-5 lg:mb-6">
            <Lightbulb className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 2xl:w-10 2xl:h-10 text-[#D92419]" />
          </div>
          <h3 className="text-lg sm:text-xl 2xl:text-2xl font-bold text-[#0B4F9C] mb-2 sm:mb-3 lg:mb-4">Innovation with Purpose</h3>
          <p className="text-[#1a1a1a] text-sm sm:text-base 2xl:text-lg">Technology choices driven by real business needs.</p>
        </div>
        <div className="text-center p-6 sm:p-8 2xl:p-10 bg-[#F5F8FC] rounded-2xl border border-gray-200 hover:border-[#0B4F9C]/40 transition-colors duration-300">
          <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 2xl:w-20 2xl:h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-4 sm:mb-5 lg:mb-6">
            <Users className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 2xl:w-10 2xl:h-10 text-[#0B4F9C]" />
          </div>
          <h3 className="text-lg sm:text-xl 2xl:text-2xl font-bold text-[#0B4F9C] mb-2 sm:mb-3 lg:mb-4">Growth Through Partnership</h3>
          <p className="text-[#1a1a1a] text-sm sm:text-base 2xl:text-lg">Collaborative thinking focused on long-term value.</p>
        </div>
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className={`${C_SECTION} bg-[#F5F8FC] border-t border-gray-200`}>
    <div className={C_WRAPPER}>
      <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12 lg:mb-16">
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          <span className="w-8 sm:w-12 h-[2px] bg-[#D92419]"></span>
          <span className="text-xs sm:text-sm font-bold tracking-widest text-[#D92419] uppercase">Client Stories</span>
          <span className="w-8 sm:w-12 h-[2px] bg-[#D92419]"></span>
        </div>
        <h2 className={`${C_HEADING} mb-4 sm:mb-5`}>
          <span className="text-[#0B4F9C]">What Our</span> <span className="text-[#D92419]">Clients Say</span>
        </h2>
        <p className="text-base sm:text-lg 2xl:text-xl text-[#1a1a1a]">
          Strong partnerships begin with understanding, communication, and a shared commitment to achieving business goals. We value collaborative relationships and the opportunity to help clients turn their ideas into practical digital solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 2xl:gap-10 max-w-6xl 2xl:max-w-7xl mx-auto">
        {/* Placeholder Testimonial 1 */}
        <div className="bg-white p-6 sm:p-8 lg:p-10 2xl:p-12 rounded-2xl shadow-md border border-gray-200 relative">
          <MessageSquare className="absolute top-6 right-6 sm:top-8 sm:right-8 lg:top-10 lg:right-10 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gray-100" />
          <div className="flex gap-1 mb-4 sm:mb-5 lg:mb-6">
            {[1,2,3,4,5].map((s) => <span key={s} className="text-[#D92419] text-lg sm:text-xl 2xl:text-2xl">★</span>)}
          </div>
          <p className="text-sm sm:text-base lg:text-lg 2xl:text-xl text-[#1a1a1a] italic mb-6 lg:mb-8 relative z-10">
            "We are currently gathering feedback from our valued partners. Check back soon for genuine stories about our collaborative projects and the digital solutions we've delivered together."
          </p>
          <div>
            <h4 className="font-bold text-[#0B4F9C] text-base 2xl:text-lg">[Client Name]</h4>
            <p className="text-[#1a1a1a] text-xs sm:text-sm 2xl:text-base font-medium">[Company / Role]</p>
          </div>
        </div>

        {/* Placeholder Testimonial 2 */}
        <div className="bg-white p-6 sm:p-8 lg:p-10 2xl:p-12 rounded-2xl shadow-md border border-gray-200 relative">
          <MessageSquare className="absolute top-6 right-6 sm:top-8 sm:right-8 lg:top-10 lg:right-10 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gray-100" />
          <div className="flex gap-1 mb-4 sm:mb-5 lg:mb-6">
            {[1,2,3,4,5].map((s) => <span key={s} className="text-[#D92419] text-lg sm:text-xl 2xl:text-2xl">★</span>)}
          </div>
          <p className="text-sm sm:text-base lg:text-lg 2xl:text-xl text-[#1a1a1a] italic mb-6 lg:mb-8 relative z-10">
            "We are currently gathering feedback from our valued partners. Check back soon for genuine stories about our collaborative projects and the digital solutions we've delivered together."
          </p>
          <div>
            <h4 className="font-bold text-[#0B4F9C] text-base 2xl:text-lg">[Client Name]</h4>
            <p className="text-[#1a1a1a] text-xs sm:text-sm 2xl:text-base font-medium">[Company / Role]</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default function AboutUs() {
  return (
    <main className="w-full min-h-screen bg-white font-sans text-[#1a1a1a]">
      {/* Hero: a navy tint is laid over the light banner image so the white
          "About Us" title + breadcrumb are clearly visible on every screen size. */}
      <div
        className="relative
                   [&_h1]:relative [&_h1]:z-10 [&_h1]:!text-white [&_h1]:[text-shadow:0_3px_16px_rgba(11,31,75,0.85)]
                   [&_nav]:relative [&_nav]:z-10 [&_a]:relative [&_a]:z-10
                   [&_img]:brightness-[0.8]"
      >
        <PageBanner 
          title="About Us" 
          breadcrumbs={[{ label: 'About Us' }]} 
          bgImage="/about-us.png"
          className="!mb-0 lg:!mb-0"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[5] pointer-events-none bg-gradient-to-b from-[#0B1F4B]/60 via-[#0B1F4B]/50 to-[#0B1F4B]/65"
        />
      </div>

      <WhoWeAre />
      <OurStory />
      <WhatWeDo />



      <WhyChooseUs />
            <Process />
                  <MissionVision />
            <CtaSection />


    </main>
  );
}