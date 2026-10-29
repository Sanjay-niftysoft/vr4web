import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
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
// COLOURS (change the whole page here)
//   GREEN  = #103F30
//   YELLOW = #E8890C
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// REAL PHOTOS (High-resolution curated CDN images)
// TIP: convert process.png and quality.png to .webp (much smaller) and update
//      the two paths below, e.g. '/how-we-work/process.webp', '/quality.webp'
// ─────────────────────────────────────────────────────────────────────────────
const IMAGES = {
  heroBanner: '/banner/image.png',
  approachConsultation: '/OURAPPROACH.png',
  processBg: '/how-we-work/process.png',
  serviceWeb: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80',
  serviceMarketing: '/digital-marketing.png',
  serviceApp: '/mobile-application.png',
  serviceSupport: '/backoffice.jpg',
  collabTeam: '/collebration.png',
  qualityAnalytics: '/quality.png',
};

/* Collaboration section background (same Sydney photo as the About page) */
const COLLAB_BG = 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=1800';
const COLLAB_BG_FALLBACK = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1800';

/* If an image link fails, swap in the fallback once */
const imgFallback = (fallback) => (e) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = fallback;
};

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION
// ─────────────────────────────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1];

// Text/children animation used inside every section (small fade-up)
const fadeInUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

// Faster versions used by sections 02 and 05 (everything finishes in about 1 second)
const fadeInUpFast = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } },
};

const staggerFast = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0 } },
};

/* ── Directional reveal (wipe + slide) ──────────────────────────────────────
   from="left-to-right"  → content is uncovered from the left edge to the right
   from="right-to-left"  → content is uncovered from the right edge to the left
   from="top-to-bottom"  → content is uncovered from the top edge downward
   The clip has a 60px bleed so shadows and floating cards are never cut off. */
const BLEED = '60px';
const CLIP_OPEN = `inset(-${BLEED} -${BLEED} -${BLEED} -${BLEED})`;
const WIPES = {
  'left-to-right': { clip: `inset(-${BLEED} 100% -${BLEED} -${BLEED})`, x: -60, y: 0 },
  'right-to-left': { clip: `inset(-${BLEED} -${BLEED} -${BLEED} 100%)`, x: 60, y: 0 },
  'top-to-bottom': { clip: `inset(-${BLEED} -${BLEED} 100% -${BLEED})`, x: 0, y: -50 },
};

function Reveal({ from, children, className = '', duration = 1.1 }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  const w = WIPES[from];

  return (
    // The outer element is never clipped, so the scroll trigger always fires
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }}>
      <motion.div
        className={className}
        variants={{
          hidden: { clipPath: w.clip, opacity: 0, x: w.x, y: w.y },
          visible: {
            clipPath: CLIP_OPEN,
            opacity: 1,
            x: 0,
            y: 0,
            transition: { duration, ease: EASE },
          },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* Sequenced wipe used by sections 01, 02 and 05 (delay = when it starts) */
const wipeVariants = (from, reduce, delay = 0, duration = 1.1) =>
  reduce
    ? { hidden: {}, visible: {} }
    : {
        hidden: { clipPath: WIPES[from].clip, opacity: 0, x: WIPES[from].x, y: WIPES[from].y },
        visible: {
          clipPath: CLIP_OPEN,
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration, delay, ease: EASE },
        },
      };

/* Section 02 steps: they pop in one by one starting from the RIGHT (06 → 01) */
const stepsReverseStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, staggerDirection: -1, delayChildren: 0.1 },
  },
};

/* Section 03 cards: appear one by one, each revealed from top to bottom */
const cardsStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.35, delayChildren: 0.2 } },
};

const cardDrop = {
  hidden: { opacity: 0, y: -50, clipPath: `inset(-${BLEED} -${BLEED} 100% -${BLEED})` },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: CLIP_OPEN,
    transition: { duration: 0.85, ease: EASE },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION TAG — bold yellow uppercase text + short green rounded underline
// Use `dark` on green backgrounds so the text stays readable (white text, yellow line).
// ─────────────────────────────────────────────────────────────────────────────
const HowTag = ({ children, dark = false }) => (
  <motion.div variants={fadeInUp} className="inline-flex flex-col items-center max-w-full">
    <span
      className={`text-xs sm:text-sm lg:text-[15px] font-bold uppercase tracking-[0.2em] pl-[0.2em] text-center leading-snug ${
        dark ? 'text-white' : 'text-[#E8890C]'
      }`}
    >
      {children}
    </span>
    <span
      className={`mt-2 sm:mt-2.5 block w-10 sm:w-12 lg:w-14 h-[3px] rounded-full ${
        dark ? 'bg-[#E8890C]' : 'bg-[#103F30]'
      }`}
    />
  </motion.div>
);

// Same tag but uses the fast fade (for sections 02 and 05)
const HowTagFast = ({ children }) => (
  <motion.div variants={fadeInUpFast} className="inline-flex flex-col items-center max-w-full">
    <span className="text-xs sm:text-sm lg:text-[15px] font-bold uppercase tracking-[0.2em] pl-[0.2em] text-center leading-snug text-[#E8890C]">
      {children}
    </span>
    <span className="mt-2 sm:mt-2.5 block w-10 sm:w-12 lg:w-14 h-[3px] rounded-full bg-[#103F30]" />
  </motion.div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 01 — OUR APPROACH   (reveals LEFT → RIGHT)
// ─────────────────────────────────────────────────────────────────────────────
function OurApproachSection() {
  const reduce = useReducedMotion();

  const approachPoints = [
    { line1: 'Understand', line2: 'Your Goals', icon: Target },
    { line1: 'Analyze', line2: 'Opportunities', icon: FileText },
    { line1: 'Plan the', line2: 'Right Solution', icon: Rocket },
  ];

  // Left → right wipe. `delay` lets the image start after the text.
  const wipeLR = (delay = 0, duration = 1.1) =>
    reduce
      ? { hidden: {}, visible: {} }
      : {
          hidden: { clipPath: WIPES['left-to-right'].clip, opacity: 0, x: -80 },
          visible: {
            clipPath: CLIP_OPEN,
            opacity: 1,
            x: 0,
            transition: { duration, delay, ease: EASE },
          },
        };

  return (
    <section className="w-full bg-white pt-8 sm:pt-10 lg:pt-14 pb-10 sm:pb-12 lg:pb-16 overflow-hidden relative">
      {/* Trigger (never clipped): when it scrolls into view, both columns reveal left → right */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: reveals FIRST (left → right) */}
          <motion.div variants={wipeLR(0, 1.1)} className="lg:col-span-7">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
              className="space-y-6"
            >
              <div>
                <HowTag>01. Our Approach</HowTag>
              </div>

              <motion.h2
                variants={fadeInUp}
                className="text-4xl sm:text-5xl lg:text-[54px] font-black leading-[1.08] tracking-tight"
              >
                <span className="text-[#E8890C] block">We Understand</span>
                <span className="text-[#103F30] block mt-1">Your Business First</span>
              </motion.h2>

              <motion.div variants={fadeInUp} className="flex items-center gap-2 pt-1 pb-1">
                <span className="w-10 h-[3px] bg-[#103F30] rounded-full" />
                <span className="w-16 h-[1.5px] bg-[#FBE3C2] rounded-full" />
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="text-sm sm:text-[15.5px] text-black leading-[1.7] max-w-[530px]"
              >
                Every project starts with understanding your goals, challenges, and audience. We take time to listen, analyze, and recommend the right strategy and technology that truly fits your business needs.
              </motion.p>

              <motion.div variants={fadeInUp} className="pt-6 max-w-[540px]">
                <div className="flex items-center justify-between w-full">
                  {approachPoints.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <React.Fragment key={index}>
                        <div className="flex flex-col items-center text-center flex-shrink-0 w-24 sm:w-28">
                          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#E6F0EC] flex items-center justify-center text-[#103F30] shadow-sm transition-transform duration-300 hover:scale-105">
                            <Icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
                          </div>
                          <div className="mt-3 text-xs sm:text-[13px] font-bold text-[#E8890C] leading-tight">
                            <span>{item.line1}</span>
                            <br />
                            <span>{item.line2}</span>
                          </div>
                        </div>

                        {index < approachPoints.length - 1 && (
                          <div className="flex-1 flex items-center justify-center px-1 sm:px-2 relative -mt-7 sm:-mt-8">
                            <div className="w-full h-[1.5px] bg-[#E2E8F0] relative flex items-center justify-center">
                              <span className="w-2 h-2 rounded-full bg-[#103F30] shadow-[0_0_6px_rgba(16,63,48,0.4)]" />
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column: reveals SECOND (left → right, starts after the text) */}
          <motion.div
            variants={wipeLR(0.55, 1.3)}
            className="lg:col-span-5 relative flex justify-center lg:justify-end mt-6 lg:mt-0"
          >
            <div className="relative w-full max-w-[490px] sm:max-w-[530px]">
              <div className="relative rounded-[26px] sm:rounded-[30px] overflow-hidden shadow-[0_20px_50px_rgba(16,63,48,0.14)] border border-[#E8EEF6] bg-slate-100 aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src={IMAGES.approachConsultation}
                  alt="Professional consultant holding laptop in modern office"
                  className="w-full h-full object-cover object-top sm:object-center"
                  loading="lazy"
                />
                <div
                  className="absolute bottom-0 left-0 w-3/5 h-3/5 bg-gradient-to-tr from-[#103F30]/55 via-[#103F30]/15 to-transparent pointer-events-none z-10 rounded-bl-[26px] sm:rounded-bl-[30px]"
                  aria-hidden="true"
                />
              </div>

              {/* Floating card slides in from the left LAST */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.2, ease: EASE }}
                className="absolute -bottom-5 left-3 sm:-bottom-6 sm:-left-8 z-20 bg-[#103F30] text-white px-5 py-4 rounded-2xl shadow-[0_20px_45px_rgba(10,30,22,0.45)] border border-white/10 flex items-center justify-between gap-5 min-w-[210px] sm:min-w-[230px]"
              >
                <div>
                  <div className="w-6 h-[3px] bg-[#E8890C] rounded-full mb-2" />
                  <p className="text-[12.5px] sm:text-[13px] font-bold text-white leading-tight">Your Vision</p>
                  <p className="text-[12.5px] sm:text-[13px] font-bold text-white leading-tight mt-0.5">Our Strategy</p>
                  <p className="text-[12.5px] sm:text-[13px] font-bold text-[#E8890C] leading-tight mt-0.5">Real Growth</p>
                </div>

                <div className="flex items-end gap-1.5 h-8 pl-3 border-l border-white/10" aria-hidden="true">
                  <span className="w-1.5 h-2.5 rounded-full bg-[#E8890C]/50" />
                  <span className="w-1.5 h-4 rounded-full bg-[#E8890C]/70" />
                  <span className="w-1.5 h-6 rounded-full bg-[#E8890C]/90" />
                  <span className="w-1.5 h-8 rounded-full bg-[#E8890C] shadow-[0_0_8px_rgba(232,137,12,0.7)]" />
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 02 — OUR WORKING PROCESS   (reveals RIGHT → LEFT, FAST)
// ─────────────────────────────────────────────────────────────────────────────
function WorkingProcessSection() {
  const reduce = useReducedMotion();

  const steps = [
    { num: '01', title: 'Discover', desc: 'Understand your business goals and requirements.', icon: Search, iconColor: '#E8890C', arcColor: '#E8890C', numColor: 'text-[#E8890C]' },
    { num: '02', title: 'Plan', desc: 'Create a strategic plan with the right technology and roadmap.', icon: ClipboardList, iconColor: '#103F30', arcColor: '#103F30', numColor: 'text-[#103F30]' },
    { num: '03', title: 'Design', desc: 'Build intuitive and modern designs focused on your users.', icon: Paintbrush, iconColor: '#E8890C', arcColor: '#E8890C', numColor: 'text-[#E8890C]' },
    { num: '04', title: 'Develop', desc: 'Develop robust and scalable solutions with best practices.', icon: Code2, iconColor: '#103F30', arcColor: '#103F30', numColor: 'text-[#103F30]' },
    { num: '05', title: 'Test', desc: 'Rigorous testing for performance, security and quality.', icon: ShieldCheck, iconColor: '#E8890C', arcColor: '#E8890C', numColor: 'text-[#E8890C]' },
    { num: '06', title: 'Launch', desc: 'Deploy and ensure a smooth launch with ongoing support.', icon: Rocket, iconColor: '#103F30', arcColor: '#103F30', numColor: 'text-[#103F30]' },
  ];

  return (
    <section className="relative w-full pt-10 sm:pt-12 lg:pt-14 pb-6 sm:pb-8 lg:pb-8 overflow-hidden bg-white">
      {/* Full-width architectural workspace photograph background */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: `url(${IMAGES.processBg})` }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-white/60 pointer-events-none"
        aria-hidden="true"
      />

      {/* Trigger (never clipped): reveals right → left in steps */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >

        {/* STEP 1: heading uncovered from the right edge to the left */}
        <motion.div
          variants={wipeVariants('right-to-left', reduce, 0, 0.45)}
          className="mb-8 sm:mb-10 lg:mb-12 max-w-[620px]"
        >
          <motion.div variants={staggerFast}>
            <div>
              <HowTagFast>02. Our Working Process</HowTagFast>
            </div>

            <motion.h2
              variants={fadeInUpFast}
              className="text-4xl sm:text-5xl lg:text-[54px] font-black leading-[1.08] tracking-tight mt-3 text-[#E8890C]"
            >
              A Clear Process <br />
              for <span className="text-[#103F30]">Better Results</span>
            </motion.h2>

            <motion.p
              variants={fadeInUpFast}
              className="text-sm sm:text-[15px] text-black font-medium leading-relaxed mt-3 max-w-[500px]"
            >
              We follow a structured and transparent process to ensure smooth execution, on-time delivery and outstanding results.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* STEP 2: the six steps uncovered right → left, appearing one by one from 06 to 01 */}
        <motion.div variants={wipeVariants('right-to-left', reduce, 0.1, 0.5)}>
          <motion.div
            variants={reduce ? staggerFast : stepsReverseStagger}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-8 gap-x-4 lg:gap-x-2 relative items-start"
          >
            {steps.map((step, idx) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.num}
                  variants={fadeInUpFast}
                  className="relative flex flex-col items-center text-center group"
                >
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:flex items-center justify-center absolute top-10 left-[calc(50%+44px)] w-[calc(100%-88px)] -z-0">
                      <div className="flex-1 border-t border-dashed border-[#E8890C]/55" />
                      <div className="w-5 h-5 rounded-full bg-[#103F30] flex items-center justify-center text-white mx-1 flex-shrink-0 shadow-sm">
                        <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <div className="flex-1 border-t border-dashed border-[#E8890C]/55" />
                    </div>
                  )}

                  <div className="relative w-20 h-20 rounded-full bg-white shadow-[0_12px_28px_rgba(16,63,48,0.12)] flex items-center justify-center z-10 transition-transform duration-300 group-hover:scale-105 border border-slate-100">
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

                    <Icon
                      className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2]"
                      style={{ color: step.iconColor }}
                    />
                  </div>

                  <span className={`text-sm sm:text-base font-bold mt-3 tracking-wider uppercase ${step.numColor}`}>
                    {step.num}
                  </span>

                  <h3 className="text-base sm:text-[17px] font-black text-[#E8890C] mt-0.5 mb-1 tracking-tight">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-[12.5px] text-black font-medium leading-relaxed max-w-[18ch] sm:max-w-[20ch]">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 03 — SERVICES BUILT AROUND YOUR GOALS
//   header reveals TOP → DOWN, then the 4 cards drop in one by one
// ─────────────────────────────────────────────────────────────────────────────
function DigitalSolutionsSection() {
  const cards = [
    {
      title: 'Website Development',
      desc: 'Modern, responsive and high-performance websites tailored to your brand.',
      icon: Monitor,
      iconBg: 'bg-[#103F30]',
      image:'/website-development.png',
    },
    {
      title: 'Digital Marketing',
      desc: 'SEO, social media, paid ads and content strategies to grow your online presence.',
      icon: Megaphone,
      iconBg: 'bg-[#E8890C]',
      image: IMAGES.serviceMarketing,
    },
    {
      title: 'Application Development',
      desc: 'Custom web and mobile applications built for performance and scalability.',
      icon: Smartphone,
      iconBg: 'bg-[#103F30]',
      image: IMAGES.serviceApp,
    },
    {
      title: 'Back-Office Support',
      desc: 'Reliable and efficient support services to streamline your business operations.',
      icon: Headset,
      iconBg: 'bg-[#E8890C]',
      image: '/support.png',
    },
  ];

  return (
    <section className="w-full bg-white py-12 sm:py-14 lg:py-20 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ───────── Header (reveals top → down) ───────── */}
        <Reveal from="top-to-bottom" className="mb-10 lg:mb-14">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="space-y-4 max-w-[760px]"
          >
            <div>
              <HowTag>03. Services Built Around Your Goals</HowTag>
            </div>

            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#E8890C] leading-[1.12] tracking-tight"
            >
              Complete Digital Solutions <br className="hidden sm:block" />
              <span className="text-[#103F30]">Under One Roof</span>
            </motion.h2>

            <motion.p variants={fadeInUp} className="text-base sm:text-lg text-black leading-relaxed max-w-[640px]">
              From websites to marketing, mobile apps to back-office support, we provide
              end-to-end digital solutions to help your business grow faster and smarter.
            </motion.p>
          </motion.div>
        </Reveal>

        {/* ───────── Cards: appear one by one, each revealed top → bottom ───────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={cardsStagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch"
        >
          {cards.map((card, idx) => {
            const Icon = card.icon;

            return (
              <motion.article
                key={idx}
                variants={cardDrop}
                whileHover={{ y: -6 }}
                className="group h-full flex flex-col bg-white rounded-3xl border border-[#E3E9F2] shadow-[0_8px_30px_rgba(16,63,48,0.07)] hover:shadow-[0_22px_50px_rgba(16,63,48,0.15)] hover:border-[#103F30]/30 transition-shadow duration-300 overflow-hidden"
              >
                <div className="flex flex-col flex-1 p-6">
                  <div
                    className={`w-14 h-14 rounded-2xl ${card.iconBg} text-white flex items-center justify-center shadow-lg mb-5 transition-transform duration-300 group-hover:scale-105`}
                  >
                    <Icon className="w-7 h-7" strokeWidth={2} />
                  </div>

                  <h3 className="text-xl font-extrabold text-[#E8890C] tracking-tight leading-snug mb-3 lg:min-h-[56px]">
                    {card.title}
                  </h3>

                  <p className="text-[14.5px] text-black leading-relaxed mb-5">
                    {card.desc}
                  </p>

                  <a
                    href="#"
                    aria-label={`Learn more about ${card.title}`}
                    className="mt-auto inline-flex items-center gap-2.5 text-sm font-bold text-[#E8890C] group-hover:text-[#103F30] transition-colors duration-300"
                  >
                    <span className="w-9 h-9 rounded-full bg-[#E6F0EC] text-[#103F30] group-hover:bg-[#103F30] group-hover:text-white flex items-center justify-center transition-colors duration-300">
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                    Learn more
                  </a>
                </div>

                <div className="relative w-full h-48 sm:h-52 shrink-0 overflow-hidden bg-slate-100">
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
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
// SECTION 04 — COLLABORATION & COMMUNICATION   (reveals LEFT → RIGHT)
// ─────────────────────────────────────────────────────────────────────────────
function CollaborationSection() {
  const benefits = [
    { label: 'Regular Updates', icon: MessageSquare },
    { label: 'Dedicated Project Team', icon: Users },
    { label: 'Transparent Communication', icon: FileText },
    { label: 'Your Feedback Matters', icon: Star },
  ];

  const textShadow = '0 1px 8px rgba(0,0,0,0.9), 0 0 2px rgba(0,0,0,0.7)';

  return (
    <section className="group/collab w-full bg-[#0F3D2E] py-12 sm:py-16 lg:py-20 text-white overflow-hidden relative">
      {/* Background photo + green overlay (photo zooms slowly on hover) */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={COLLAB_BG}
          onError={imgFallback(COLLAB_BG_FALLBACK)}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover scale-100 group-hover/collab:scale-110 transition-transform duration-[2500ms] ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#14573F]/75 via-[#1A6B4E]/65 to-[#1F7A58]/55" />
      </div>

      <Reveal from="left-to-right" className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="lg:col-span-6 space-y-6"
          >
            <div>
              <HowTag dark>04. Collaboration & Communication</HowTag>
            </div>

            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-[46px] font-black text-white leading-[1.14] tracking-tight"
              style={{ textShadow: '0 3px 14px rgba(0,0,0,0.85)' }}
            >
              Your Vision, Our Expertise <br />
              <span className="text-[#E8890C]">One Collaborative Team</span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-sm sm:text-base text-white font-medium leading-relaxed max-w-[52ch]"
              style={{ textShadow }}
            >
              We believe the best results come from close collaboration. Our team keeps you involved at every stage with regular updates, open communication and quick feedback loops.
            </motion.p>

            <motion.div variants={fadeInUp} className="pt-2">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-between gap-3 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-[#E8890C] text-white font-bold text-sm sm:text-base shadow-[0_12px_28px_rgba(232,137,12,0.35)] hover:bg-[#E8890C]/90 hover:shadow-[0_18px_36px_rgba(232,137,12,0.45)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <span className="tracking-tight">Let's Work Together</span>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#103F30] transition-all duration-300 flex-shrink-0">
                  <ArrowRight className="w-4 h-4 stroke-[2.4] group-hover:translate-x-0.5 transition-transform duration-300" />
                </div>
              </Link>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-2 gap-4 sm:gap-6 pt-6 border-t border-white/30"
            >
              {benefits.map((b, idx) => {
                const Icon = b.icon;
                return (
                  <div
                    key={idx}
                    className="group/item flex items-center gap-3 cursor-pointer select-none transition-all duration-300 ease-out hover:-translate-y-1 hover:translate-x-1"
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#103F30] border-2 border-white/80 flex items-center justify-center flex-shrink-0 text-white shadow-sm transition-all duration-300 ease-out group-hover/item:scale-125 group-hover/item:bg-[#E8890C] group-hover/item:border-[#E8890C] group-hover/item:shadow-[0_10px_25px_rgba(232,137,12,0.4)]">
                      <Icon className="w-4 h-4 stroke-[2.2] transition-transform duration-300 group-hover/item:scale-110" />
                    </div>
                    <span
                      className="text-xs sm:text-sm font-semibold text-white leading-tight transition-all duration-300 group-hover/item:translate-x-0.5"
                      style={{ textShadow }}
                    >
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
              <div className="relative rounded-[32px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.45)] border-2 border-white/30 bg-white aspect-[4/3] sm:aspect-[16/11] z-10">
                <img
                  src={IMAGES.collabTeam}
                  alt="Connected collaboration team network"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="absolute -bottom-5 left-4 sm:-left-6 z-20 bg-white px-5 py-4 rounded-2xl shadow-[0_16px_36px_rgba(0,0,0,0.25)] border border-[#E8EEF6]"
              >
                <p className="text-[13px] font-bold text-[#E8890C] leading-tight">Ideas</p>
                <p className="text-[13px] font-bold text-[#E8890C] leading-tight">Discussion</p>
                <p className="text-[13px] font-bold text-[#E8890C] leading-tight">Solutions</p>
                <p className="text-[13px] font-bold text-[#E8890C] leading-tight">Success</p>
                <div className="w-8 h-1 bg-[#103F30] rounded-full mt-2" />
              </motion.div>
            </div>
          </motion.div>

        </div>
      </Reveal>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 05 — QUALITY, DELIVERY & CONTINUOUS IMPROVEMENT   (reveals RIGHT → LEFT, FAST)
// ─────────────────────────────────────────────────────────────────────────────
function QualityDeliverySection() {
  const reduce = useReducedMotion();

  const features = [
    { title: 'Quality Assurance', desc: 'Multi-level testing for bug-free and secure solutions.', icon: ShieldCheck },
    { title: 'On-Time Delivery', desc: 'We respect your time and deliver as committed.', icon: Clock },
    { title: 'Continuous Improvement', desc: 'Regular updates and feature enhancements.', icon: TrendingUp },
    { title: 'Long-Term Support', desc: 'Ongoing support to keep your business running smoothly.', icon: Headset },
  ];

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-28 overflow-hidden">
      {/* Trigger (never clipped): reveals right → left in steps */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">

          {/* Left Column: reveals SECOND (right → left, starts right after the photo) */}
          <motion.div
            variants={wipeVariants('right-to-left', reduce, 0.15, 0.45)}
            className="lg:col-span-6"
          >
            <motion.div variants={staggerFast} className="space-y-6">
              <div>
                <HowTagFast>05. Quality, Delivery & Continuous Improvement</HowTagFast>
              </div>

              <motion.h2
                variants={fadeInUpFast}
                className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#E8890C] leading-[1.12] tracking-tight"
              >
                We Deliver Quality <br />
                and <span className="text-[#103F30]">Keep Improving</span>
              </motion.h2>

              <motion.p
                variants={fadeInUpFast}
                className="text-sm sm:text-base text-black leading-relaxed max-w-[54ch]"
              >
                Our commitment doesn't end at launch. We ensure high-quality delivery, continuous improvements and long-term support to keep your digital solutions performing at their best.
              </motion.p>

              <motion.div
                variants={fadeInUpFast}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#E8EEF6]"
              >
                {features.map((feat, idx) => {
                  const Icon = feat.icon;
                  return (
                    <div key={idx} className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-full bg-[#E6F0EC] text-[#103F30] border border-[#103F30]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon className="w-5 h-5 stroke-[2]" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-[15px] font-bold text-[#E8890C] leading-tight mb-1">
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
          </motion.div>

          {/* Right Column: reveals FIRST (right → left) */}
          <motion.div
            variants={wipeVariants('right-to-left', reduce, 0, 0.45)}
            className="lg:col-span-6 relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[520px]">
              <div
                className="absolute -bottom-4 -right-4 w-[96%] h-[96%] rounded-[36px] bg-[#FDF0DC] -z-10"
                aria-hidden="true"
              />

              <div className="relative rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(16,63,48,0.12)] border border-[#E8EEF6] bg-slate-100 aspect-[4/3] sm:aspect-[16/11]">
                {/* No lazy loading here, so the image is ready when the section reveals */}
                <img
                  src={IMAGES.qualityAnalytics}
                  alt="Quality performance and continuous growth analytics chart"
                  className="w-full h-full object-cover object-center"
                  decoding="async"
                />
              </div>

              {/* Floating card slides in LAST, but still quickly */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.4, ease: EASE }}
                className="absolute -top-5 left-4 sm:-left-6 z-20 bg-white/95 backdrop-blur-md px-5 py-4 rounded-2xl shadow-[0_16px_36px_rgba(16,63,48,0.14)] border border-[#E8EEF6]"
              >
                <p className="text-[13px] font-bold text-[#E8890C] leading-tight">Better Solutions</p>
                <p className="text-[13px] font-bold text-[#E8890C] leading-tight">Stronger Performance</p>
                <p className="text-[13px] font-bold text-[#E8890C] leading-tight">Long-Term Growth</p>
                <div className="w-8 h-1 bg-[#103F30] rounded-full mt-2" />
              </motion.div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE EXPORT
// ─────────────────────────────────────────────────────────────────────────────
export default function HowWeWork() {
  return (
    <div className="w-full min-h-screen bg-white font-sans text-[#E8890C] selection:bg-[#103F30] selection:text-white">

      {/* 1. EXISTING HERO SECTION (PRESERVED AS IS) */}
      <PageBanner
        title="How We Work"
        breadcrumbs={[{ label: 'How We Work' }]}
        bgImage={IMAGES.heroBanner}
        className="!mb-0 lg:!mb-0"
      />

      {/* 2. SECTION 01 — OUR APPROACH (reveals left → right) */}
      <OurApproachSection />

      {/* 3. SECTION 02 — OUR WORKING PROCESS (reveals right → left, fast) */}
      <WorkingProcessSection />

      {/* 4. SECTION 03 — SERVICES (header top → down, cards one by one) */}
      <DigitalSolutionsSection />

      {/* 5. SECTION 04 — COLLABORATION & COMMUNICATION (reveals left → right) */}
      <CollaborationSection />

      {/* 6. SECTION 05 — QUALITY, DELIVERY & CONTINUOUS IMPROVEMENT (reveals right → left, fast) */}
      <QualityDeliverySection />

      {/* 7. EXISTING CTA SECTION (PRESERVED AS IS) */}
      <CtaSection />
    </div>
  );
}  