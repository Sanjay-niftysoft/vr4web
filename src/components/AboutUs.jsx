import React from 'react';
import { Link } from 'react-router-dom';
import PageBanner from './common/PageBanner';
import CtaSection from './CtaSection';
import { 
  CheckCircle2, Monitor, BarChart, Settings, Cloud, 
  Smartphone, Lightbulb, Target, Shield, RefreshCw, 
  ArrowRight, ArrowLeft, Users, ChevronRight, MessageSquare, Phone,
  Briefcase, Activity, Map, Cpu, Zap, Globe,
  FileText, Calendar, Star, Search, Rocket, Award
} from 'lucide-react';

const C_WRAPPER = "w-full max-w-[1440px] 4xl:max-w-[1800px] mx-auto px-3 xs:px-4 sm:px-5 lg:px-2.5 xl:px-8 4xl:px-16";
const C_HEADING = "text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-bold leading-tight";
const C_SECTION = "py-10 sm:py-12 lg:py-16 2xl:py-24";

/* If an image link fails, swap in the fallback once */
const imgFallback = (fallback) => (e) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = fallback;
};

/* How We Work background: Sydney skyline (Australia). Falls back to a website analytics photo if the link fails */
const PROCESS_BG = 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=1800';
const PROCESS_BG_FALLBACK = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1800';

/* Why Choose Us background: Melbourne Cricket Ground (MCG), from Wikimedia Commons.
   Special:FilePath redirects to the actual image file. */
const WHY_BG = '/ground.png';
const WHY_BG_FALLBACK = 'https://commons.wikimedia.org/wiki/Special:FilePath/MCG99.jpg?width=1800';

/* ── Auto-changing stacked image slider (Who We Are, left side) ── */
const WHO_SLIDES = [
  { src: '/about-page/1.png', alt: 'Business collaboration', label: 'Business Collaboration' },
  { src: '/about-page/2.png', alt: 'Technology innovation', label: 'Technology Innovation' },
  { src: '/about-page/3.png', alt: 'Team collaboration', label: 'Team Collaboration' },
  { src: '/about-page/1.png', alt: 'Business collaboration', label: 'Business Collaboration' },
  { src: '/about-page/2.png', alt: 'Technology innovation', label: 'Technology Innovation' },
  { src: '/about-page/3.png', alt: 'Team collaboration', label: 'Team Collaboration' },
];

const TAG_ALIGN = {
  center: 'items-center text-center pl-[0.2em]',
  lg: 'items-center lg:items-start text-center lg:text-left pl-[0.2em] lg:pl-0',
  xl: 'items-center xl:items-start text-center xl:text-left pl-[0.2em] xl:pl-0',
};

/* Clean tag: bold blue uppercase text + short red rounded underline */
const SectionTag = ({ children, align = 'center', color = '#0B4F9C', lineColor = '#FB0202', className = '' }) => (
  <div className={`flex flex-col ${className}`}>
    <span
      className={`text-xs sm:text-sm lg:text-base font-bold uppercase tracking-[0.2em] ${TAG_ALIGN[align]}`}
      style={{ color }}
    >
      {children}
    </span>
    <span
      className={`mt-2 sm:mt-2.5 block w-10 sm:w-12 lg:w-14 h-[3px] rounded-full ${
        align === 'center' ? 'self-center' : align === 'lg' ? 'self-center lg:self-start' : 'self-center xl:self-start'
      }`}
      style={{ background: lineColor }}
    ></span>
  </div>
);

/* Speeds (ms): normal = one image every 2s, hover = one image every 0.9s */
const SLIDE_DELAY = 2000;
const SLIDE_DELAY_HOVER = 900;
const SLIDE_ANIM = 650;
const SLIDE_ANIM_HOVER = 500;

/* position of each card in the stack: 0 = front, 1/2 = layers behind, last = flying out */
const stackStyle = (offset, total) => {
  if (offset === 0) return { transform: 'translate3d(0,0,0) scale(1) rotate(0deg)', opacity: 1, zIndex: 30 };
  if (offset === 1) return { transform: 'translate3d(-7%,-5%,0) scale(0.92)', opacity: 0.9, zIndex: 20 };
  if (total >= 4 && offset === 2) return { transform: 'translate3d(-14%,-10%,0) scale(0.84)', opacity: 0.65, zIndex: 10 };
  if (offset === total - 1) return { transform: 'translate3d(30%,4%,0) scale(0.95) rotate(8deg)', opacity: 0, zIndex: 40 };
  return { transform: 'translate3d(-14%,-10%,0) scale(0.76)', opacity: 0, zIndex: 0 };
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
      className={`relative w-full max-w-[420px] sm:max-w-[520px] lg:max-w-none h-[380px] sm:h-[440px] lg:h-auto lg:min-h-[420px] 2xl:min-h-[520px] mx-auto ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* soft green backdrop circle */}
      <div className="absolute top-[8%] right-[-4%] h-[84%] aspect-square bg-[#0F3D2E]/[0.06] rounded-full z-0"></div>

      {/* thin orange ring accent */}
      <div className="absolute top-[3%] right-[-8%] h-[92%] aspect-square rounded-full border border-[#E8890C]/30 z-0"></div>

      {/* stacked cards: fill the full height of the container */}
      <div className="absolute top-[10%] bottom-[3%] right-[2%] w-[78%]">
        {WHO_SLIDES.map((s, i) => {
          const offset = (i - active + total) % total;
          return (
            <div
              key={i}
              aria-hidden={offset !== 0}
              className="absolute inset-0 overflow-hidden rounded-3xl border-[3px] sm:border-[4px] border-white bg-white shadow-[0_24px_55px_rgba(15,61,46,0.28)] will-change-transform"
              style={{
                ...stackStyle(offset, total),
                transition: `transform ${animMs}ms cubic-bezier(0.22,1,0.36,1), opacity ${animMs}ms ease`,
              }}
            >
              <img src={s.src} alt={s.alt} className="w-full h-full object-cover" />
              {/* caption on the front card */}
              <div
                className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-[#0F3D2E]/90 to-transparent transition-opacity duration-500"
                style={{ opacity: offset === 0 ? 1 : 0 }}
              >
                <p className="text-white text-xs sm:text-sm lg:text-base font-bold tracking-wide">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* Who We Are: plain white background (no gradient, no decorations) */
const WhoWeAre = () => (
  <section className="relative overflow-hidden bg-white py-8 sm:py-10 lg:py-12 2xl:py-16">
    <div className={`${C_WRAPPER} relative z-10`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 2xl:gap-20 items-center lg:items-stretch">

        {/* Left Side: Text */}
        <div className="relative z-10 order-1 text-center lg:text-left flex flex-col items-center lg:items-start justify-center">
          <SectionTag align="lg" color="#E8890C" lineColor="#0F3D2E" className="mb-4 sm:mb-5">
            Who We Are
          </SectionTag>

          <h2 className="text-3xl sm:text-4xl lg:text-[40px] xl:text-5xl 2xl:text-6xl font-extrabold leading-[1.15] tracking-tight text-[#0F3D2E] mb-5 sm:mb-6">
            Connecting Australian Businesses with{' '}
            <span className="text-[#E8890C]">Technology</span>
          </h2>

          <p className="text-sm sm:text-base 2xl:text-lg leading-relaxed text-black mb-7 sm:mb-8 max-w-xl">
            We help businesses grow through innovative technology, smart strategies, and reliable digital solutions that simplify operations and enhance customer experiences. Our focus is on understanding your needs and delivering scalable, user-focused solutions that drive efficiency, strengthen connections, and support long-term growth.
          </p>

          {/* buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 w-fit bg-[#0F3D2E] hover:bg-[#E8890C] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold shadow-[0_10px_24px_rgba(15,61,46,0.25)] hover:shadow-[0_10px_24px_rgba(232,137,12,0.35)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Learn More
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/get-a-quote"
              className="inline-flex items-center w-fit bg-white border-2 border-[#0F3D2E] text-[#0F3D2E] hover:bg-[#E8890C] hover:border-[#E8890C] hover:text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold hover:-translate-y-0.5 transition-all duration-300"
            >
              Get a Quote
            </Link>
          </div>
        </div>

        {/* Right Side: auto-changing stacked image slider */}
        <ImageStackSlider className="order-2" />

      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────
   OUR SERVICES — image cards (transparent dark overlay on hover)
   BEFORE hover : title on top + image in the lower part (no text)
   AFTER  hover : image blurs, blue overlay fades in, text builds from bottom to top
   Touch devices: tap a card to toggle
   ───────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    title: "App Development",
    desc: "Custom mobile applications designed for seamless user experiences on iOS and Android. We build scalable, high-performance apps tailored to your specific business requirements.",
    more: "From the first wireframe to the App Store and Play Store launch, we handle design, development, testing and integration with your existing systems, then keep your app updated as your users and devices change.",
    img: "/about-services/appdevelopment.jpg",
  },
  {
    title: "Software Application Development",
    desc: "Robust and scalable software solutions built to streamline your business operations. Our custom development ensures secure, efficient, and easily maintainable enterprise systems.",
    more: "We build cloud-ready platforms with secure access controls, clean architecture and clear documentation, so your team can rely on the software today and extend it easily as your operations grow.",
    img: "/about-services/softwaredevelopment.jpg",
  },
  {
    title: "Web Design and Development",
    desc: "High-performing, responsive websites engineered for optimal engagement and functionality.",
    more: "Every site is built mobile-first, loads fast, follows SEO and accessibility best practices, and is easy for your team to manage, so visitors stay longer and enquiries turn into customers.",
    img: "/about-services/webdevelopment.png",
  },
  {
    title: "E-commerce Solutions",
    desc: "Secure and intuitive digital storefronts optimized for maximum conversions and sales.",
    more: "We set up Shopify, WooCommerce or custom stores with secure payments, inventory and order management, and a smooth checkout that reduces abandoned carts and helps you sell around the clock.",
    img: "/about-services/ecom.png",
  },
  {
    title: "Digital Marketing Solutions",
    desc: "Data-driven strategies that strengthen online visibility and accelerate brand growth.",
    more: "Through SEO, content, paid ads, social media and email campaigns, we attract the right audience and track every result, with clear monthly reports showing what is working and where to invest next.",
    img: "/about-services/digital.png",
  },
  {
    title: "Creative Solutions",
    desc: "Innovative design and branding services that make your company stand out visually.",
    more: "From logos and brand identity to social media creatives, print collateral and motion graphics, we give your business a consistent, memorable look across every place your customers see you.",
    img: "/about-services/creative.png",
  },
  {
    title: "Back Office Support",
    desc: "Reliable administrative and technical support to keep your business running smoothly.",
    more: "Our trained team handles data entry, documentation, customer support and workflow management, freeing you to focus on growth while the daily operations stay accurate, organised and on schedule.",
    img: "/about-services/backoffice.png",
  },
  {
    title: "Website Redesign",
    desc: "Revitalize your digital presence with modern aesthetics and improved user experiences.",
    more: "We audit your current site, refresh the look to match your brand, improve speed, navigation and SEO, and migrate everything safely so you keep your content and search rankings.",
    img: "/about-services/website-redesign.png",
  },
];

const ServiceCard = ({ service }) => {
  const [open, setOpen] = React.useState(false);
  const EASE = 'cubic-bezier(0.22,1,0.36,1)';

  // Bottom-to-top reveal: the lower the element, the earlier it appears
  const reveal = (delay, distance = 70) => ({
    opacity: open ? 1 : 0,
    transform: open ? 'translateY(0)' : `translateY(${distance}px)`,
    clipPath: open ? 'inset(0 0 0 0)' : 'inset(100% 0 0 0)', // wipe from bottom edge upward
    transition: `opacity 700ms ease ${delay}ms, transform 900ms ${EASE} ${delay}ms, clip-path 900ms ${EASE} ${delay}ms`,
    textShadow: '0 1px 4px rgba(0,0,0,0.5)',
  });

  return (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      aria-expanded={open}
      className="group relative isolate block w-full text-left overflow-hidden rounded-xl bg-[#0F3D2E] h-[400px] sm:h-[420px] lg:h-[440px] 2xl:h-[480px] shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-[#E8890C]"
    >
      {/* Background image */}
      <img
        src={service.img}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 z-0 w-full h-full object-cover pointer-events-none transition-[transform,filter] duration-[900ms]"
        style={{
          transitionTimingFunction: EASE,
          filter: open ? 'blur(4px)' : 'blur(0px)',
          transform: open ? 'scale(1.12)' : 'scale(1.02)',
        }}
      />

      {/* Resting gradient */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-black/60 via-transparent to-black/60 transition-opacity duration-500"
        style={{ opacity: open ? 0 : 1 }}
      />

      {/* Transparent dark overlay (no blue): photo stays visible, text area is a little darker */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none transition-opacity duration-700"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.78) 100%)',
          opacity: open ? 1 : 0,
        }}
      />

      {/* Glass border */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none rounded-xl transition-opacity duration-700"
        style={{
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          border: '1px solid rgba(255,255,255,0.18)',
          opacity: open ? 1 : 0,
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full p-6 lg:p-7 flex flex-col">
        <h3
          className="text-xl lg:text-2xl font-semibold leading-tight text-white"
          style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
        >
          {service.title}
        </h3>

        {/* Paragraphs sit at the bottom and build upward */}
        <div className="mt-auto space-y-4">
          {/* Upper paragraph: appears LAST */}
          <p className="text-sm lg:text-base leading-relaxed text-white font-medium" style={reveal(380)}>
            {service.desc}
          </p>

          {/* Lower paragraph: appears FIRST */}
          <p className="text-sm lg:text-[15px] leading-relaxed text-white/90 font-medium" style={reveal(120)}>
            {service.more}
          </p>
        </div>

        {/* Bottom-right action */}
        <div
          className="mt-5 self-end inline-flex items-center gap-1 text-sm lg:text-base font-bold"
          style={{
            color: open ? '#E8890C' : '#FFFFFF',
            transition: 'color 500ms ease',
            textShadow: '0 2px 8px rgba(0,0,0,0.6)',
          }}
        >
          {!open && 'Expand'}
        </div>
      </div>
    </button>
  );
};

const WhatWeDo = () => (
  <section className="py-8 sm:py-10 lg:py-12 2xl:py-16 relative overflow-hidden bg-white">
    <div className={`${C_WRAPPER} relative z-10`}>
      <div className="mb-6 lg:mb-8 text-center">
        <SectionTag align="center" color="#E8890C" lineColor="#0F3D2E" className="mb-3 sm:mb-4">Our Services</SectionTag>
        <h2 className="text-xl sm:text-2xl md:text-[26px] lg:text-4xl 2xl:text-5xl md:whitespace-nowrap font-bold leading-tight text-[#0F3D2E]">
          Turning Technology into Business Opportunities
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        {SERVICES.map((s, i) => (
          <ServiceCard key={i} service={s} />
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────
   WHY CHOOSE US — MCG photo background + dark green overlay
   ───────────────────────────────────────────────────────────── */
const WHY_FEATURES = [
  { icon: Target, title: "Business-First Approach", desc: "Solutions shaped around your objectives, customers, and operational needs." },
  { icon: Activity, title: "Built to Scale", desc: "Flexible digital systems designed to adapt as your business grows." },
  { icon: Shield, title: "Quality-Driven Delivery", desc: "A structured approach focused on usability, reliability, and attention to detail." },
  { icon: Users, title: "Long-Term Partnership", desc: "Collaborative support and practical guidance as your technology needs evolve." },
];

const WhyFeature = ({ f }) => {
  const Icon = f.icon;
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 py-3.5 sm:py-4 group/feature cursor-pointer transition-all duration-300 hover:translate-x-1">
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white bg-[#0F3D2E] flex items-center justify-center shrink-0 group-hover/feature:bg-[#E8890C] group-hover/feature:border-[#E8890C] group-hover/feature:shadow-[0_6px_18px_rgba(232,137,12,0.45)] transition-all duration-300">
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </div>
      <div className="text-center sm:text-left">
        <h3
          className="text-lg sm:text-xl font-bold text-white mb-1"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}
        >
          {f.title}
        </h3>
        <p
          className="text-[13.5px] sm:text-sm text-white/90 font-medium leading-relaxed"
          style={{ textShadow: '0 1px 8px rgba(0,0,0,0.95), 0 0 2px rgba(0,0,0,0.8)' }}
        >
          {f.desc}
        </p>
      </div>
    </div>
  );
};

const WhyChooseUs = () => (
  <section className="group relative overflow-hidden bg-[#0F3D2E] py-6 sm:py-8 lg:py-10 2xl:py-12">
    {/* Background photo + lighter green overlay matching How We Work */}
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={WHY_BG}
        onError={imgFallback(WHY_BG_FALLBACK)}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[2500ms] ease-out"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F3D2E]/85 via-[#0F3D2E]/72 to-[#0F3D2E]/60"></div>
    </div>

    <div className={`${C_WRAPPER} relative z-10`}>
      <div className="flex flex-col xl:flex-row gap-8 lg:gap-10 xl:gap-14 items-center text-center xl:text-left">

        {/* Left Column - Content */}
        <div className="w-full xl:w-1/3 shrink-0 flex flex-col items-center xl:items-start">
          <SectionTag align="xl" color="#FFA726" lineColor="#FFA726" className="mb-3 sm:mb-4">Why Choose Us</SectionTag>

          <h2
            className={`${C_HEADING} text-white mb-3 sm:mb-4 leading-tight`}
            style={{ textShadow: '0 3px 14px rgba(0,0,0,0.85)' }}
          >
            Technology Built Around Your <span className="text-[#FFA726]">Business</span>
          </h2>

          <p
            className="text-sm sm:text-[15px] text-white font-medium leading-relaxed mb-5 sm:mb-6 max-w-md"
            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.95), 0 0 2px rgba(0,0,0,0.8)' }}
          >
            Every business has different goals, challenges, and opportunities. We focus on delivering technology solutions that align with your priorities, simplify complex processes, and create a foundation for long-term growth.
          </p>

          <Link
            to="/contact"
            className="inline-block bg-[#E8890C] hover:bg-white text-white hover:text-[#0F3D2E] font-bold py-2.5 px-7 rounded-[10px] shadow-[0_10px_24px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 transition-all duration-300 uppercase tracking-widest text-xs"
          >
            Learn More
          </Link>
        </div>

        {/* Right Columns - Features Grid */}
        <div className="w-full xl:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-10 relative mt-6 xl:mt-0">
          <div className="hidden md:block absolute top-2 bottom-2 left-1/2 w-px bg-white/40 -translate-x-1/2"></div>

          <div className="flex flex-col md:mt-4">
            <WhyFeature f={WHY_FEATURES[0]} />
            <div className="w-full h-px bg-white/40 my-0.5"></div>
            <WhyFeature f={WHY_FEATURES[1]} />
          </div>

          <div className="flex flex-col">
            <div className="md:hidden w-full h-px bg-white/40 my-0.5"></div>
            <WhyFeature f={WHY_FEATURES[2]} />
            <div className="w-full h-px bg-white/40 my-0.5"></div>
            <WhyFeature f={WHY_FEATURES[3]} />
          </div>
        </div>

      </div>
    </div>
  </section>
);

/* Our Story: photo background + one framed photo (images from Unsplash; each has a fallback if a link fails) */
const STORY_BG = '/story-bg.png';
const STORY_BG_FALLBACK = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1800';
const STORY_PHOTO = '/story.png';
const STORY_PHOTO_FALLBACK = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000';

const OurStory = () => (
  <section className="relative bg-[#0F3D2E] py-10 sm:py-12 lg:py-14 2xl:py-20">
    {/* Background photo + dark green overlay (clipped so the framed photo can overlap outside) */}
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={STORY_BG}
        onError={imgFallback(STORY_BG_FALLBACK)}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F3D2E]/95 via-[#0F3D2E]/85 to-[#0F3D2E]/75"></div>
    </div>

    <div className={`${C_WRAPPER} relative z-10`}>
      <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-14 xl:gap-20 items-center">

        {/* Left: one framed photo that overlaps the section above */}
        <div className="flex justify-center lg:justify-start lg:-mt-8 2xl:-mt-10">
          <div className="relative w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[460px] 2xl:max-w-[520px]">
            <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-full h-full border-2 border-[#E8890C] pointer-events-none"></div>
            <img
              src={STORY_PHOTO}
              onError={imgFallback(STORY_PHOTO_FALLBACK)}
              alt="Our team collaborating on a project"
              className="relative w-full aspect-[4/5] object-cover shadow-[0_30px_70px_rgba(0,0,0,0.45)]"
            />
          </div>
        </div>

        {/* Right: content */}
        <div className="text-center lg:text-left">
          <SectionTag align="lg" color="#E8890C" lineColor="#E8890C" className="mb-4 sm:mb-5">Our Story</SectionTag>

          <h2 className="text-3xl sm:text-4xl lg:text-[40px] xl:text-5xl 2xl:text-6xl font-extrabold leading-[1.15] tracking-tight text-white mb-6 sm:mb-8">
            A Trusted Technology Partner Built on{' '}
            <span className="text-[#E8890C]">Results.</span>
          </h2>

          <div className="space-y-5 text-sm sm:text-base 2xl:text-lg leading-relaxed text-white/90 max-w-2xl mx-auto lg:mx-0">
            <p>
              What began as a dedicated team helping businesses navigate technology has grown into a <strong className="text-[#E8890C] font-bold">full-service digital partner</strong>. Along the way, one thing hasn't changed: we still treat every project like it's the only one that matters, delivering reliable, scalable, and tailored solutions.
            </p>
            <p>
              Today we work with startups, established brands, and everything in between, building digital systems that are <strong className="text-[#E8890C] font-bold">robust, secure</strong>, and built to <strong className="text-[#E8890C] font-bold">drive real business growth</strong>. From web development to digital marketing, our focus remains on turning your challenges into digital opportunities.
            </p>
          </div>

          <Link
            to="/contact"
            className="group mt-8 sm:mt-10 inline-flex items-center gap-2 text-[#E8890C] hover:text-white text-sm sm:text-base font-bold uppercase tracking-[0.22em] transition-colors duration-300"
          >
            Work With Us
            <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </div>
  </section>
);

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
            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-white p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl shadow-xl z-20 flex flex-col items-center">
              <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-[#F5F8FC] rounded-full flex items-center justify-center">
                  <Cpu className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#0B4F9C]" />
                </div>
                <div className="h-[2px] w-4 sm:w-6 lg:w-8 bg-gray-300"></div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-[#FB0202]/10 rounded-full flex items-center justify-center">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#FB0202]" />
                </div>
              </div>
              <p className="text-[9px] sm:text-[10px] lg:text-xs font-bold text-[#0B4F9C] uppercase tracking-wider mt-2 sm:mt-3 lg:mt-4">Tech Integrated</p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <span className="w-8 sm:w-12 h-[2px] bg-[#FB0202]"></span>
              <span className="text-xs sm:text-sm font-bold tracking-widest text-[#FB0202] uppercase">Our Expertise</span>
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
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#FB0202] shrink-0 mt-0.5 sm:mt-1" />
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
            <span className="w-8 sm:w-12 h-[2px] bg-[#FB0202]"></span>
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#FB0202] uppercase">Industries We Support</span>
            <span className="w-8 sm:w-12 h-[2px] bg-[#FB0202]"></span>
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

/* How We Work: flowing curve with numbered stops (x / y are % positions on the curve) */
const PROCESS_STEPS = [
  { title: "Discover", icon: Search, desc: "Understand the business, target audience, challenges, and goals.", x: 19, y: 74 },
  { title: "Strategise", icon: Target, desc: "Define the solution, project scope, technology approach, and delivery plan.", x: 41, y: 60 },
  { title: "Develop", icon: Cpu, desc: "Design, build, integrate, and refine the solution with attention to quality and usability.", x: 62, y: 50 },
  { title: "Deliver & Improve", icon: Rocket, desc: "Launch the solution, review its performance, and identify opportunities for continued improvement.", x: 82, y: 22 },
];

const StopMarker = ({ icon: Icon, active }) => (
  <span className="relative flex items-center justify-center w-11 h-11 2xl:w-12 2xl:h-12">
    <span className="absolute inset-0 rounded-[14px] bg-[#E8890C]/40 animate-ping" style={{ animationDuration: '2.8s' }}></span>
    <span
      className={`relative flex items-center justify-center w-full h-full rounded-[14px] shadow-[0_8px_20px_rgba(0,0,0,0.3)] transition-all duration-500 ${
        active ? 'scale-[1.5] bg-[#E8890C] shadow-[0_14px_30px_rgba(0,0,0,0.45)]' : 'scale-100 bg-white'
      }`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.34,1.56,0.64,1)' }}
    >
      {/* normal dot */}
      <span
        className={`absolute w-4 h-4 rounded-full bg-[#E8890C] transition-all duration-300 ${
          active ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
        }`}
      ></span>
      {/* related icon */}
      <Icon
        className={`absolute w-5 h-5 2xl:w-6 2xl:h-6 text-white transition-all duration-500 ${
          active ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-45'
        }`}
      />
    </span>
  </span>
);

/* viewBox 1000 x 500: the nodes above sit exactly on this path */
const PROCESS_PATH =
  "M 0 320 C 60 350, 120 370, 190 370 C 290 370, 310 300, 410 300 C 515 300, 520 250, 620 250 C 720 250, 720 110, 820 110 C 880 110, 940 114, 1000 122";

const Process = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  // one step at a time: 0 → 1 → 2 → 3 → 0 ...
  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setActiveStep((a) => (a + 1) % PROCESS_STEPS.length), 2200);
    return () => clearInterval(t);
  }, []);

  const intro = (
    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
      <SectionTag align="lg" color="#E8890C" lineColor="#E8890C" className="mb-4">How We Work</SectionTag>
      <h2 className="text-3xl sm:text-4xl lg:text-[34px] xl:text-[40px] 2xl:text-5xl font-extrabold leading-[1.15] tracking-tight text-white mb-4">
        Your Digital Journey,{' '}
        <span className="text-[#E8890C]">Mapped Out</span> Step by Step
      </h2>
      <p className="text-sm sm:text-base 2xl:text-lg leading-relaxed text-white/90 max-w-md mb-6">
        From the first conversation to launch and beyond, we guide your project through four clear steps.
      </p>
      <Link
        to="/how-we-work"
        className="group inline-flex items-center gap-2 w-fit bg-[#E8890C] hover:bg-white text-white hover:text-[#0F3D2E] px-6 sm:px-8 py-3 rounded-[10px] font-bold shadow-[0_10px_24px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 transition-all duration-300"
      >
        How We Work
        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  );

  return (
    <section className="relative overflow-hidden bg-[#0F3D2E] py-6 sm:py-8 lg:py-8 2xl:py-12">
      {/* Background photo + lighter green overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={PROCESS_BG}
          onError={imgFallback(PROCESS_BG_FALLBACK)}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F3D2E]/85 via-[#0F3D2E]/72 to-[#0F3D2E]/60"></div>
      </div>

      <div className={`${C_WRAPPER} relative z-10`}>

        {/* Desktop (1024px+) */}
        <div className="hidden lg:block relative w-full h-[560px] 2xl:h-[620px]">
          <div className="absolute -right-24 top-[6%] w-[420px] h-[420px] 2xl:w-[500px] 2xl:h-[500px] rounded-full bg-white/[0.05] pointer-events-none"></div>

          <svg
            className="absolute inset-0 w-full h-full overflow-visible drop-shadow-[0_14px_10px_rgba(0,0,0,0.25)] pointer-events-none"
            viewBox="0 0 1000 500"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <path d={PROCESS_PATH} stroke="#E8890C" strokeWidth="4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </svg>

          <div className="absolute top-0 left-0 w-[36%] xl:w-[34%] z-20">{intro}</div>

          {PROCESS_STEPS.map((s, i) => (
            <div key={s.title} className="absolute" style={{ left: `${s.x}%`, top: `${s.y}%` }}>
              <div className={`absolute -translate-x-1/2 -translate-y-1/2 ${activeStep === i ? 'z-40' : 'z-20'}`}>
                <StopMarker icon={s.icon} active={activeStep === i} />
              </div>

              <div className="absolute left-[-24px] top-[40px] w-[200px] xl:w-[240px] 2xl:w-[280px]">
                <h3 className="relative z-10 text-base xl:text-lg 2xl:text-xl font-bold text-white mb-1.5">{s.title}</h3>
                <p className="relative z-10 text-[13px] xl:text-sm 2xl:text-[15px] leading-relaxed text-white/90">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile / tablet (below 1024px) */}
        <div className="lg:hidden">
          <div className="mb-8">{intro}</div>

          <div className="relative pl-16 sm:pl-20">
            <div className="absolute left-[20px] sm:left-[20px] top-2 bottom-2 w-[3px] rounded-full bg-gradient-to-b from-[#E8890C] to-white/30"></div>

            {PROCESS_STEPS.map((s, i) => (
              <div key={s.title} className="relative pb-8 last:pb-0">
                <div className={`absolute -left-16 sm:-left-20 top-0 ${activeStep === i ? 'z-30' : 'z-10'}`}>
                  <StopMarker icon={s.icon} active={activeStep === i} />
                </div>
                <span className="absolute -top-4 right-0 text-[90px] sm:text-[110px] font-black leading-none text-white/[0.08] select-none pointer-events-none">
                  {i + 1}
                </span>
                <h3 className="relative z-10 text-lg font-bold text-white mb-1.5">{s.title}</h3>
                <p className="relative z-10 text-sm sm:text-base leading-relaxed text-white/90 max-w-md">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

/* Mission & Vision circle photos (fallback used if a link fails) */
const MISSION_IMG = '/mission.png';
const VISION_IMG = '/vision.png';
const MV_FALLBACK = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800';

const MV_EASE = 'cubic-bezier(0.65,0,0.35,1)';
const MV_DURATION = 1800; // ms for each band to slide open
const MV_VISION_DELAY = 2000; // ms before Vision starts (after Mission)

const MissionVision = () => {
  const sectionRef = React.useRef(null);
  const [started, setStarted] = React.useState(false);

  // Start the sequence when the section scrolls into view
  React.useEffect(() => {
    const reduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || typeof IntersectionObserver === 'undefined') { setStarted(true); return; }
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); io.disconnect(); } },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Mission: reveals right → left.  Vision: reveals left → right.
  const bandStyle = (from, delay) => ({
    clipPath: started
      ? 'inset(-20px -20px -20px -20px)'
      : from === 'right' ? 'inset(-20px -20px -20px 100%)' : 'inset(-20px 100% -20px -20px)',
    transition: `clip-path ${MV_DURATION}ms ${MV_EASE} ${delay}ms`,
  });

  const fadeStyle = (delay) => ({
    opacity: started ? 1 : 0,
    transform: started ? 'translateY(0)' : 'translateY(14px)',
    transition: `opacity 800ms ease ${delay}ms, transform 800ms ease ${delay}ms`,
  });

  const circleClass =
    'relative z-10 mx-auto -mb-12 w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-[0_14px_35px_rgba(0,0,0,0.25)] ' +
    'lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:mx-0 lg:mb-0 lg:w-[200px] lg:h-[200px] 2xl:w-[240px] 2xl:h-[240px]';

  return (
    <section ref={sectionRef} className={`${C_SECTION} bg-white overflow-hidden`}>
      <div className={C_WRAPPER}>

        {/* ── Row 1: heading (left) + Mission (right) ── */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-0">
          <div className="lg:w-[36%] text-center lg:text-left flex flex-col items-center lg:items-start">
            <h2 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black leading-[1.08] tracking-tight text-[#0F3D2E]">
              Our Mission <br className="hidden lg:block" />
              <span className="text-[#E8890C]">&amp; Vision</span>
            </h2>
            <div className="mt-5 flex flex-col gap-1.5 w-24 sm:w-28">
              <span className="block h-[4px] bg-[#0F3D2E]"></span>
              <span className="block h-[4px] bg-[#E8890C]"></span>
            </div>
          </div>

          {/* Mission block (reveals right → left) */}
          <div className="lg:w-[64%] relative lg:flex lg:items-center lg:min-h-[240px] 2xl:min-h-[280px]" style={bandStyle('right', 0)}>
            <div className={circleClass}>
              <img src={MISSION_IMG} onError={imgFallback(MV_FALLBACK)} alt="Our mission" className="w-full h-full object-cover" />
            </div>
            <div className="w-full bg-[#F1F3F2] shadow-[0_4px_10px_rgba(0,0,0,0.12)] pt-16 pb-7 px-6 text-center lg:text-left lg:pt-8 lg:pb-8 lg:ml-[100px] 2xl:ml-[120px] lg:pl-[140px] 2xl:pl-[170px] lg:pr-10 2xl:pr-14">
              <div style={fadeStyle(MV_DURATION - 500)}>
                <h3 className="text-2xl lg:text-3xl 2xl:text-4xl font-black text-[#0F3D2E] mb-3">Mission</h3>
                <p className="text-sm lg:text-[15px] 2xl:text-base leading-relaxed text-black">
                  To deliver innovative, reliable, and scalable technology solutions that empower businesses to thrive in a digital-first world. We focus on solving complex challenges through smart engineering and intuitive design.
                </p>
                <p className="text-sm lg:text-[15px] 2xl:text-base leading-relaxed text-black">
                  By combining deep technical expertise with a clear understanding of your business goals, we bridge the gap between ambitious ideas and functional realities.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Row 2: Vision (left), reveals left → right after Mission ── */}
        <div className="mt-10 lg:mt-12 lg:w-[64%]">
          <div className="relative lg:flex lg:items-center lg:min-h-[240px] 2xl:min-h-[280px]" style={bandStyle('left', MV_VISION_DELAY)}>
            <div className={`${circleClass} lg:left-auto lg:right-0`}>
              <img src={VISION_IMG} onError={imgFallback(MV_FALLBACK)} alt="Our vision" className="w-full h-full object-cover" />
            </div>
            <div className="w-full bg-[#F1F3F2] shadow-[0_4px_10px_rgba(0,0,0,0.12)] pt-16 pb-7 px-6 text-center lg:text-right lg:pt-8 lg:pb-8 lg:mr-[100px] 2xl:mr-[120px] lg:pr-[140px] 2xl:pr-[170px] lg:pl-10 2xl:pl-14">
              <div style={fadeStyle(MV_VISION_DELAY + MV_DURATION - 500)}>
                <h3 className="text-2xl lg:text-3xl 2xl:text-4xl font-black text-[#0F3D2E] mb-3">Vision</h3>
                <p className="text-sm lg:text-[15px] 2xl:text-base leading-relaxed text-black mb-2">
                  To be the leading digital partner for forward-thinking organisations, shaping the future of web and enterprise technology through continuous innovation, collaboration, and a relentless pursuit of excellence.
                </p>
                <p className="text-sm lg:text-[15px] 2xl:text-base leading-relaxed text-black">
                  We envision a landscape where businesses of all sizes can use cutting-edge technology without friction, with partnerships built on trust, transparency, and shared success.
                </p>
              </div>
            </div>
          </div>
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
          <span className="w-8 sm:w-12 h-[2px] bg-[#FB0202]"></span>
          <span className="text-xs sm:text-sm font-bold tracking-widest text-[#FB0202] uppercase">Our Commitment</span>
          <span className="w-8 sm:w-12 h-[2px] bg-[#FB0202]"></span>
        </div>
        <h2 className={`${C_HEADING} text-[#0B4F9C] mb-4 sm:mb-5`}>
          Digital Solutions Designed Around Real Business Needs
        </h2>
        <p className="text-base sm:text-lg 2xl:text-xl text-[#1a1a1a]">
          We are committed to creating digital solutions that balance business objectives, user experience, and technical reliability. By combining thoughtful planning with modern technology, we aim to help organisations improve processes, strengthen digital engagement, and pursue new opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 2xl:gap-10">
        {[
          { Icon: CheckCircle2, color: 'text-[#0B4F9C]', hover: 'hover:border-[#0B4F9C]/40', title: 'Quality in Every Detail', text: 'Thoughtful execution and attention to usability.' },
          { Icon: Lightbulb, color: 'text-[#FB0202]', hover: 'hover:border-[#FB0202]/40', title: 'Innovation with Purpose', text: 'Technology choices driven by real business needs.' },
          { Icon: Users, color: 'text-[#0B4F9C]', hover: 'hover:border-[#0B4F9C]/40', title: 'Growth Through Partnership', text: 'Collaborative thinking focused on long-term value.' },
        ].map(({ Icon, color, hover, title, text }, i) => (
          <div key={i} className={`text-center p-6 sm:p-8 2xl:p-10 bg-[#F5F8FC] rounded-2xl border border-gray-200 ${hover} transition-colors duration-300`}>
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 2xl:w-20 2xl:h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-4 sm:mb-5 lg:mb-6">
              <Icon className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 2xl:w-10 2xl:h-10 ${color}`} />
            </div>
            <h3 className="text-lg sm:text-xl 2xl:text-2xl font-bold text-[#0B4F9C] mb-2 sm:mb-3 lg:mb-4">{title}</h3>
            <p className="text-[#1a1a1a] text-sm sm:text-base 2xl:text-lg">{text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className={`${C_SECTION} bg-[#F5F8FC] border-t border-gray-200`}>
    <div className={C_WRAPPER}>
      <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12 lg:mb-16">
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          <span className="w-8 sm:w-12 h-[2px] bg-[#FB0202]"></span>
          <span className="text-xs sm:text-sm font-bold tracking-widest text-[#FB0202] uppercase">Client Stories</span>
          <span className="w-8 sm:w-12 h-[2px] bg-[#FB0202]"></span>
        </div>
        <h2 className={`${C_HEADING} mb-4 sm:mb-5`}>
          <span className="text-[#0B4F9C]">What Our</span> <span className="text-[#FB0202]">Clients Say</span>
        </h2>
        <p className="text-base sm:text-lg 2xl:text-xl text-[#1a1a1a]">
          Strong partnerships begin with understanding, communication, and a shared commitment to achieving business goals. We value collaborative relationships and the opportunity to help clients turn their ideas into practical digital solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 2xl:gap-10 max-w-6xl 2xl:max-w-7xl mx-auto">
        {[1, 2].map((n) => (
          <div key={n} className="bg-white p-6 sm:p-8 lg:p-10 2xl:p-12 rounded-2xl shadow-md border border-gray-200 relative">
            <MessageSquare className="absolute top-6 right-6 sm:top-8 sm:right-8 lg:top-10 lg:right-10 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gray-100" />
            <div className="flex gap-1 mb-4 sm:mb-5 lg:mb-6">
              {[1,2,3,4,5].map((s) => <span key={s} className="text-[#FB0202] text-lg sm:text-xl 2xl:text-2xl">★</span>)}
            </div>
            <p className="text-sm sm:text-base lg:text-lg 2xl:text-xl text-[#1a1a1a] italic mb-6 lg:mb-8 relative z-10">
              "We are currently gathering feedback from our valued partners. Check back soon for genuine stories about our collaborative projects and the digital solutions we've delivered together."
            </p>
            <div>
              <h4 className="font-bold text-[#0B4F9C] text-base 2xl:text-lg">[Client Name]</h4>
              <p className="text-[#1a1a1a] text-xs sm:text-sm 2xl:text-base font-medium">[Company / Role]</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default function AboutUs() {
  return (
    <main className="w-full min-h-screen bg-white font-sans text-[#1a1a1a]">
      {/* Hero: banner image shown at full brightness; the title keeps a soft text-shadow so the white
          text stays readable. */}
      <div>
        <PageBanner 
          title="About Us" 
          breadcrumbs={[{ label: 'About Us' }]} 
          bgImage="/about-us.png"
          className="!mb-0 lg:!mb-0"
        />
      </div>

      <WhoWeAre />
      <OurStory />
      <WhatWeDo />
      <Process />
      <MissionVision />
      <WhyChooseUs />

      
      <CtaSection />
    </main>
  );
}