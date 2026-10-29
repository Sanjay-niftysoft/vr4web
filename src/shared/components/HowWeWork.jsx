import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Target,
  FileText,
  Search,
  ClipboardList,
  Paintbrush,
  Code2,
  ShieldCheck,
  Rocket,
  Monitor,
  Megaphone,
  Smartphone,
  Headset,
  ArrowRight,
  Users,
  MessageSquare,
  Star,
  Clock,
  TrendingUp,
  ChevronRight,
} from 'lucide-react';
import PageBanner from '../../components/common/PageBanner';
import CtaSection from '../../components/CtaSection';

// ─────────────────────────────────────────────────────────────────────────────
// REAL PHOTOS (High-resolution curated CDN images)
// ─────────────────────────────────────────────────────────────────────────────
const IMAGES = {
  heroBanner: '/banner/image.png',
  approachConsultation: '/OURAPPROACH.png',
  processBg: '/how-we-work/process.png',
  serviceWeb: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80',
  serviceMarketing: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
  serviceApp: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
  serviceSupport: '/backoffice.jpg',
  collabTeam: '/collebration.png',
  qualityAnalytics: '/quality.png',
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 01 — OUR APPROACH
// ─────────────────────────────────────────────────────────────────────────────
function OurApproachSection() {
  const approachPoints = [
    {
      line1: 'Understand',
      line2: 'Your Goals',
      icon: Target,
    },
    {
      line1: 'Analyze',
      line2: 'Opportunities',
      icon: FileText,
    },
    {
      line1: 'Plan the',
      line2: 'Right Solution',
      icon: Rocket,
    },
  ];

  return (
    <section className="w-full bg-white pt-8 sm:pt-10 lg:pt-14 pb-10 sm:pb-12 lg:pb-16 overflow-hidden relative">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column (Approx 52%) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="lg:col-span-7 space-y-6"
          >
            {/* Section label */}
            <motion.div variants={fadeInUp} className="flex items-center gap-2.5">
              <span className="w-8 h-[2.5px] bg-[#E31837] rounded-full" />
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.2em] uppercase text-[#E31837]">
                01. OUR APPROACH
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-[54px] font-black leading-[1.08] tracking-tight"
            >
              <span className="text-[#102448] block">We Understand</span>
              <span className="text-[#E31837] block mt-1">Your Business First</span>
            </motion.h2>

            {/* Red & Pale-Blue Decorative Divider */}
            <motion.div variants={fadeInUp} className="flex items-center gap-2 pt-1 pb-1">
              <span className="w-10 h-[3px] bg-[#E31837] rounded-full" />
              <span className="w-16 h-[1.5px] bg-[#D2E2F6] rounded-full" />
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="text-sm sm:text-[15.5px] text-black leading-[1.7] max-w-[530px]"
            >
              Every project starts with understanding your goals, challenges, and audience. We take time to listen, analyze, and recommend the right strategy and technology that truly fits your business needs.
            </motion.p>

            {/* Three horizontal process steps connected by line & center red dots */}
            <motion.div
              variants={fadeInUp}
              className="pt-6 max-w-[540px]"
            >
              <div className="flex items-center justify-between w-full">
                {approachPoints.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <React.Fragment key={index}>
                      {/* Step Item */}
                      <div className="flex flex-col items-center text-center flex-shrink-0 w-24 sm:w-28">
                        {/* Pale-pink circular background with red outline icon */}
                        <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#FEECEF] flex items-center justify-center text-[#E31837] shadow-sm transition-transform duration-300 hover:scale-105">
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
                        </div>
                        {/* Bold navy two-line label */}
                        <div className="mt-3 text-xs sm:text-[13px] font-bold text-[#102448] leading-tight">
                          <span>{item.line1}</span>
                          <br />
                          <span>{item.line2}</span>
                        </div>
                      </div>

                      {/* Connecting Line with Center Red Dot (between steps 1-2 and 2-3) */}
                      {index < approachPoints.length - 1 && (
                        <div className="flex-1 flex items-center justify-center px-1 sm:px-2 relative -mt-7 sm:-mt-8">
                          <div className="w-full h-[1.5px] bg-[#E2E8F0] relative flex items-center justify-center">
                            <span className="w-2 h-2 rounded-full bg-[#E31837] shadow-[0_0_6px_rgba(227,24,55,0.4)]" />
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column (Approx 48%) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="lg:col-span-5 relative flex justify-center lg:justify-end mt-6 lg:mt-0"
          >
            <div className="relative w-full max-w-[490px] sm:max-w-[530px]">
              
              {/* Main photograph container with rounded corners and realistic shadow */}
              <div className="relative rounded-[26px] sm:rounded-[30px] overflow-hidden shadow-[0_20px_50px_rgba(16,35,66,0.14)] border border-[#E8EEF6] bg-slate-100 aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src={IMAGES.approachConsultation}
                  alt="Professional consultant holding laptop in modern office"
                  className="w-full h-full object-cover object-top sm:object-center"
                  loading="lazy"
                />

                {/* Tasteful red gradient overlay along lower-left edge */}
                <div
                  className="absolute bottom-0 left-0 w-3/5 h-3/5 bg-gradient-to-tr from-[#E31837]/55 via-[#E31837]/15 to-transparent pointer-events-none z-10 rounded-bl-[26px] sm:rounded-bl-[30px]"
                  aria-hidden="true"
                />
              </div>

              {/* Compact dark navy floating card overlapping bottom-left corner */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="absolute -bottom-5 left-3 sm:-bottom-6 sm:-left-8 z-20 bg-[#102342] text-white px-5 py-4 rounded-2xl shadow-[0_20px_45px_rgba(10,22,41,0.45)] border border-white/10 flex items-center justify-between gap-5 min-w-[210px] sm:min-w-[230px]"
              >
                {/* Left side text */}
                <div>
                  <div className="w-6 h-[3px] bg-[#E31837] rounded-full mb-2" />
                  <p className="text-[12.5px] sm:text-[13px] font-bold text-white leading-tight">Your Vision</p>
                  <p className="text-[12.5px] sm:text-[13px] font-bold text-white leading-tight mt-0.5">Our Strategy</p>
                  <p className="text-[12.5px] sm:text-[13px] font-bold text-[#E31837] leading-tight mt-0.5">Real Growth</p>
                </div>

                {/* Right side minimal decorative growth-chart graphic */}
                <div className="flex items-end gap-1.5 h-8 pl-3 border-l border-white/10" aria-hidden="true">
                  <span className="w-1.5 h-2.5 rounded-full bg-blue-400/50" />
                  <span className="w-1.5 h-4 rounded-full bg-blue-400/70" />
                  <span className="w-1.5 h-6 rounded-full bg-blue-400/90" />
                  <span className="w-1.5 h-8 rounded-full bg-[#E31837] shadow-[0_0_8px_rgba(227,24,55,0.7)]" />
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 02 — OUR WORKING PROCESS
// ─────────────────────────────────────────────────────────────────────────────
function WorkingProcessSection() {
  const steps = [
    {
      num: '01',
      title: 'Discover',
      desc: 'Understand your business goals and requirements.',
      icon: Search,
      iconColor: '#0B1F3A',
      arcColor: '#0B1F3A',
      numColor: 'text-[#1673D1]',
    },
    {
      num: '02',
      title: 'Plan',
      desc: 'Create a strategic plan with the right technology and roadmap.',
      icon: ClipboardList,
      iconColor: '#D71932',
      arcColor: '#D71932',
      numColor: 'text-[#D71932]',
    },
    {
      num: '03',
      title: 'Design',
      desc: 'Build intuitive and modern designs focused on your users.',
      icon: Paintbrush,
      iconColor: '#1673D1',
      arcColor: '#1673D1',
      numColor: 'text-[#1673D1]',
    },
    {
      num: '04',
      title: 'Develop',
      desc: 'Develop robust and scalable solutions with best practices.',
      icon: Code2,
      iconColor: '#D71932',
      arcColor: '#D71932',
      numColor: 'text-[#D71932]',
    },
    {
      num: '05',
      title: 'Test',
      desc: 'Rigorous testing for performance, security and quality.',
      icon: ShieldCheck,
      iconColor: '#0B1F3A',
      arcColor: '#0B1F3A',
      numColor: 'text-[#1673D1]',
    },
    {
      num: '06',
      title: 'Launch',
      desc: 'Deploy and ensure a smooth launch with ongoing support.',
      icon: Rocket,
      iconColor: '#D71932',
      arcColor: '#D71932',
      numColor: 'text-[#D71932]',
    },
  ];

  return (
    <section className="relative w-full pt-10 sm:pt-12 lg:pt-14 pb-6 sm:pb-8 lg:pb-8 overflow-hidden bg-white">
      {/* 1. Full-width architectural workspace photograph background */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: `url(${IMAGES.processBg})` }}
        aria-hidden="true"
      />

      {/* 2. Soft white & pale-blue gradient overlay (strongest on left for text legibility) */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-white/60 pointer-events-none"
        aria-hidden="true"
      />



      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Heading positioned upper-left */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="mb-8 sm:mb-10 lg:mb-12 max-w-[620px]"
        >
          {/* Section label */}
          <motion.div variants={fadeInUp} className="flex items-center gap-2.5">
            <span className="w-8 h-[2.5px] bg-[#C91F32] rounded-full" />
            <span className="text-xs sm:text-[13px] font-bold tracking-[0.2em] uppercase text-[#C91F32]">
              02. OUR WORKING PROCESS
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={fadeInUp}
            className="text-4xl sm:text-5xl lg:text-[54px] font-black leading-[1.08] tracking-tight mt-3 text-[#102448]"
          >
            A Clear Process <br />
            for <span className="text-[#C91F32]">Better Results</span>
          </motion.h2>

          {/* Description - black text */}
          <motion.p
            variants={fadeInUp}
            className="text-sm sm:text-[15px] text-black font-medium leading-relaxed mt-3 max-w-[500px]"
          >
            We follow a structured and transparent process to ensure smooth execution, on-time delivery and outstanding results.
          </motion.p>
        </motion.div>

        {/* Six-step horizontal workflow */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-8 gap-x-4 lg:gap-x-2 relative items-start"
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.num}
                variants={fadeInUp}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Connecting dotted line & circular arrow pill on desktop (between steps 1-5) */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:flex items-center justify-center absolute top-10 left-[calc(50%+44px)] w-[calc(100%-88px)] -z-0">
                    {/* Left dotted line */}
                    <div className="flex-1 border-t border-dashed border-[#1673D1]/45" />
                    {/* Circular arrow marker */}
                    <div className="w-5 h-5 rounded-full bg-[#415C7E] flex items-center justify-center text-white mx-1 flex-shrink-0 shadow-sm">
                      <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    {/* Right dotted line */}
                    <div className="flex-1 border-t border-dashed border-[#1673D1]/45" />
                  </div>
                )}

                {/* White Circular Icon Container with Partial Colored Arc */}
                <div className="relative w-20 h-20 rounded-full bg-white shadow-[0_12px_28px_rgba(11,31,58,0.12)] flex items-center justify-center z-10 transition-transform duration-300 group-hover:scale-105 border border-slate-100">
                  {/* Partial colored arc at top edge */}
                  <svg
                    className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] pointer-events-none -rotate-45"
                    viewBox="0 0 100 100"
                    aria-hidden="true"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="46"
                      fill="none"
                      stroke={step.arcColor}
                      strokeWidth="4"
                      strokeDasharray="72 220"
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Icon */}
                  <Icon
                    className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2]"
                    style={{ color: step.iconColor }}
                  />
                </div>

                {/* Step Number */}
                <span className={`text-sm sm:text-base font-bold mt-3 tracking-wider uppercase ${step.numColor}`}>
                  {step.num}
                </span>

                {/* Step Title */}
                <h3 className="text-base sm:text-[17px] font-black text-[#102448] mt-0.5 mb-1 tracking-tight">
                  {step.title}
                </h3>

                {/* Step Description - black text */}
                <p className="text-xs sm:text-[12.5px] text-black font-medium leading-relaxed max-w-[18ch] sm:max-w-[20ch]">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
// ─────────────────────────────────────────────────────────────────────────────
// SECTION 03 — SERVICES BUILT AROUND YOUR GOALS (improved)
// Fixes: equal-height cards, aligned titles/descriptions/arrows,
//        full-bleed images that fill the card, all gray text -> black
// ─────────────────────────────────────────────────────────────────────────────
function DigitalSolutionsSection() {
  const cards = [
    {
      title: 'Website Development',
      desc: 'Modern, responsive and high-performance websites tailored to your brand.',
      icon: Monitor,
      iconBg: 'bg-[#D7192D]',
      image: IMAGES.serviceWeb,
    },
    {
      title: 'Digital Marketing',
      desc: 'SEO, social media, paid ads and content strategies to grow your online presence.',
      icon: Megaphone,
      iconBg: 'bg-[#1672E8]',
      image: IMAGES.serviceMarketing,
    },
    {
      title: 'Application Development',
      desc: 'Custom web and mobile applications built for performance and scalability.',
      icon: Smartphone,
      iconBg: 'bg-[#D7192D]',
      image: IMAGES.serviceApp,
    },
    {
      title: 'Back-Office Support',
      desc: 'Reliable and efficient support services to streamline your business operations.',
      icon: Headset,
      iconBg: 'bg-[#0B1F3A]',
      image: IMAGES.serviceSupport,
    },
  ];

  return (
    <section className="w-full bg-white py-12 sm:py-14 lg:py-20 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ───────── Header ───────── */}
        <div className="mb-10 lg:mb-14">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="space-y-4 max-w-[760px]"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-2.5">
              <span className="w-8 h-[3px] bg-[#D7192D] rounded-full" />
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.16em] uppercase text-[#D7192D]">
                03. Services built around your goals
              </span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#102448] leading-[1.12] tracking-tight"
            >
              Complete Digital Solutions <br className="hidden sm:block" />
              <span className="text-[#D7192D]">Under One Roof</span>
            </motion.h2>

            <motion.p variants={fadeInUp} className="text-base sm:text-lg text-black leading-relaxed max-w-[640px]">
              From websites to marketing, mobile apps to back-office support, we provide
              end-to-end digital solutions to help your business grow faster and smarter.
            </motion.p>
          </motion.div>
        </div>

        {/* ───────── Cards: 4 desktop / 2 tablet / 1 mobile, all equal height ───────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch"
        >
          {cards.map((card, idx) => {
            const Icon = card.icon;

            return (
              <motion.article
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="group h-full flex flex-col bg-white rounded-3xl border border-[#E3E9F2] shadow-[0_8px_30px_rgba(11,31,58,0.07)] hover:shadow-[0_22px_50px_rgba(11,31,58,0.15)] hover:border-[#D7192D]/30 transition-shadow duration-300 overflow-hidden"
              >
                {/* Text block — grows so every image sits at the same level */}
                <div className="flex flex-col flex-1 p-6">
                  <div
                    className={`w-14 h-14 rounded-2xl ${card.iconBg} text-white flex items-center justify-center shadow-lg mb-5 transition-transform duration-300 group-hover:scale-105`}
                  >
                    <Icon className="w-7 h-7" strokeWidth={2} />
                  </div>

                  {/* Fixed 2-line height on desktop keeps descriptions aligned */}
                  <h3 className="text-xl font-extrabold text-[#102448] tracking-tight leading-snug mb-3 lg:min-h-[56px]">
                    {card.title}
                  </h3>

                  <p className="text-[14.5px] text-black leading-relaxed mb-5">
                    {card.desc}
                  </p>

                  {/* Pinned to the bottom of the text block */}
                  <a
                    href="#"
                    aria-label={`Learn more about ${card.title}`}
                    className="mt-auto inline-flex items-center gap-2.5 text-sm font-bold text-[#102448] group-hover:text-[#D7192D] transition-colors duration-300"
                  >
                    <span className="w-9 h-9 rounded-full bg-red-50 text-[#D7192D] group-hover:bg-[#D7192D] group-hover:text-white flex items-center justify-center transition-colors duration-300">
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                    Learn more
                  </a>
                </div>

                {/* Full-bleed image: fills edge to edge, same size on every card */}
                <div className="relative w-full h-48 sm:h-52 shrink-0 overflow-hidden bg-slate-100">
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Soft top fade blends the image into the card */}
                  <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white/70 to-transparent pointer-events-none" />
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
// ─────────────────────────────────────────────────────────────────────────────
// SECTION 04 — COLLABORATION & COMMUNICATION
// ─────────────────────────────────────────────────────────────────────────────
function CollaborationSection() {
  const benefits = [
    { label: 'Regular Updates', icon: MessageSquare },
    { label: 'Dedicated Project Team', icon: Users },
    { label: 'Transparent Communication', icon: FileText },
    { label: 'Your Feedback Matters', icon: Star },
  ];

  return (
    <section
      className="w-full bg-[#102448] py-12 sm:py-16 lg:py-20 text-white overflow-hidden relative"
      style={{
        backgroundColor: '#102448',
      }}
    >
      {/* Decorative ambient glowing accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#1672E8]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#D7192D]/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="lg:col-span-6 space-y-6"
          >
            {/* Section label */}
            <motion.div variants={fadeInUp} className="flex items-center gap-2.5">
              <span className="w-8 h-[2.5px] bg-[#D7192D] rounded-full" />
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.18em] uppercase text-[#D7192D]">
                04. COLLABORATION & COMMUNICATION
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-[46px] font-black text-white leading-[1.14] tracking-tight"
            >
              Your Vision, Our Expertise <br />
              <span className="text-[#D7192D]">One Collaborative Team</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="text-sm sm:text-base text-white/85 leading-relaxed max-w-[52ch]"
            >
              We believe the best results come from close collaboration. Our team keeps you involved at every stage with regular updates, open communication and quick feedback loops.
            </motion.p>

            {/* Button - Rounded Rectangle Box with circular icon container */}
            <motion.div variants={fadeInUp} className="pt-2">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-between gap-3 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-[#D7192D] text-white font-bold text-sm sm:text-base shadow-[0_12px_28px_rgba(215,25,45,0.35)] hover:bg-[#b51426] hover:shadow-[0_18px_36px_rgba(215,25,45,0.45)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <span className="tracking-tight">Let's Work Together</span>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#D7192D] transition-all duration-300 flex-shrink-0">
                  <ArrowRight className="w-4 h-4 stroke-[2.4] group-hover:translate-x-0.5 transition-transform duration-300" />
                </div>
              </Link>
            </motion.div>

            {/* 4 Benefits in 2x2 grid with interactive hover pop / come front */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-2 gap-4 sm:gap-6 pt-6 border-t border-white/20"
            >
              {benefits.map((b, idx) => {
                const Icon = b.icon;
                return (
                  <div
                    key={idx}
                    className="group/item flex items-center gap-3 cursor-pointer select-none transition-all duration-300 ease-out hover:-translate-y-1 hover:translate-x-1"
                  >
                    {/* Icon container - pops forward, scales up and elevates on hover */}
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 text-white shadow-sm transition-all duration-300 ease-out group-hover/item:scale-125 group-hover/item:bg-[#D7192D] group-hover/item:text-white group-hover/item:border-[#D7192D] group-hover/item:shadow-[0_10px_25px_rgba(215,25,45,0.4)]">
                      <Icon className="w-4 h-4 stroke-[2.2] transition-transform duration-300 group-hover/item:scale-110" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-white/90 leading-tight transition-all duration-300 group-hover/item:text-white group-hover/item:translate-x-0.5">
                      {b.label}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="lg:col-span-6 relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[520px]">
              {/* Main photograph */}
              <div className="relative rounded-[32px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.35)] border-2 border-white/20 bg-white aspect-[4/3] sm:aspect-[16/11] z-10">
                <img
                  src={IMAGES.collabTeam}
                  alt="Connected collaboration team network"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>

              {/* Small floating info card */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="absolute -bottom-5 left-4 sm:-left-6 z-20 bg-white px-5 py-4 rounded-2xl shadow-[0_16px_36px_rgba(0,0,0,0.25)] border border-[#E8EEF6]"
              >
                <p className="text-[13px] font-bold text-[#102448] leading-tight">Ideas</p>
                <p className="text-[13px] font-bold text-[#102448] leading-tight">Discussion</p>
                <p className="text-[13px] font-bold text-[#102448] leading-tight">Solutions</p>
                <p className="text-[13px] font-bold text-[#102448] leading-tight">Success</p>
                <div className="w-8 h-1 bg-[#D7192D] rounded-full mt-2" />
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 05 — QUALITY, DELIVERY & CONTINUOUS IMPROVEMENT
// ─────────────────────────────────────────────────────────────────────────────
function QualityDeliverySection() {
  const features = [
    {
      title: 'Quality Assurance',
      desc: 'Multi-level testing for bug-free and secure solutions.',
      icon: ShieldCheck,
    },
    {
      title: 'On-Time Delivery',
      desc: 'We respect your time and deliver as committed.',
      icon: Clock,
    },
    {
      title: 'Continuous Improvement',
      desc: 'Regular updates and feature enhancements.',
      icon: TrendingUp,
    },
    {
      title: 'Long-Term Support',
      desc: 'Ongoing support to keep your business running smoothly.',
      icon: Headset,
    },
  ];

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-28 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="lg:col-span-6 space-y-6"
          >
            {/* Section label */}
            <motion.div variants={fadeInUp} className="flex items-center gap-2.5">
              <span className="w-6 h-[2px] bg-[#D7192D] rounded-full" />
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.18em] uppercase text-[#D7192D]">
                05. QUALITY, DELIVERY & CONTINUOUS IMPROVEMENT
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#102448] leading-[1.12] tracking-tight"
            >
              We Deliver Quality <br />
              and <span className="text-[#D7192D]">Keep Improving</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="text-sm sm:text-base text-black leading-relaxed max-w-[54ch]"
            >
              Our commitment doesn't end at launch. We ensure high-quality delivery, continuous improvements and long-term support to keep your digital solutions performing at their best.
            </motion.p>

            {/* 4 Feature Items in 2-Column Grid */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#E8EEF6]"
            >
              {features.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-red-50 text-[#D7192D] border border-[#D7192D]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 stroke-[2]" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-[15px] font-bold text-[#102448] leading-tight mb-1">
                        {feat.title}
                      </h4>
                      <p className="text-xs sm:text-[13px] text-black leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="lg:col-span-6 relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[520px]">
              {/* Pale-blue decorative backing shape */}
              <div
                className="absolute -bottom-4 -right-4 w-[96%] h-[96%] rounded-[36px] bg-[#EAF4FF] -z-10"
                aria-hidden="true"
              />

              {/* Main photograph */}
              <div className="relative rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(11,31,58,0.12)] border border-[#E8EEF6] bg-slate-100 aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src={IMAGES.qualityAnalytics}
                  alt="Quality performance and continuous growth analytics chart"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>

              {/* Small floating info card on top-left of image */}
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="absolute -top-5 left-4 sm:-left-6 z-20 bg-white/95 backdrop-blur-md px-5 py-4 rounded-2xl shadow-[0_16px_36px_rgba(11,31,58,0.14)] border border-[#E8EEF6]"
              >
                <p className="text-[13px] font-bold text-[#102448] leading-tight">Better Solutions</p>
                <p className="text-[13px] font-bold text-[#102448] leading-tight">Stronger Performance</p>
                <p className="text-[13px] font-bold text-[#102448] leading-tight">Long-Term Growth</p>
                <div className="w-8 h-1 bg-[#D7192D] rounded-full mt-2" />
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE EXPORT
// ─────────────────────────────────────────────────────────────────────────────
export default function HowWeWork() {
  return (
    <div className="w-full min-h-screen bg-white font-sans text-[#102448] selection:bg-[#D7192D] selection:text-white">
      
      {/* 1. EXISTING HERO SECTION (PRESERVED AS IS) */}
      <PageBanner
        title="How We Work"
        breadcrumbs={[{ label: 'How We Work' }]}
        bgImage={IMAGES.heroBanner}
        className="!mb-0 lg:!mb-0"
      />

      {/* 2. SECTION 01 — OUR APPROACH */}
      <OurApproachSection />

      {/* 3. SECTION 02 — OUR WORKING PROCESS */}
      <WorkingProcessSection />

      {/* 4. SECTION 03 — SERVICES BUILT AROUND YOUR GOALS */}
      <DigitalSolutionsSection />

      {/* 5. SECTION 04 — COLLABORATION & COMMUNICATION */}
      <CollaborationSection />

      {/* 6. SECTION 05 — QUALITY, DELIVERY & CONTINUOUS IMPROVEMENT */}
      <QualityDeliverySection />

      {/* 7. EXISTING CTA SECTION (PRESERVED AS IS) */}
      <CtaSection />
      
    </div>
  );
}