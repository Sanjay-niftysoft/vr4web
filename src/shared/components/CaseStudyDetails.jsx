import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import CtaSection from '../../components/CtaSection';
import PageBanner from '../../components/common/PageBanner';
import {
  ArrowRight, ArrowLeft, ChevronRight, Home, X,
  Clock, Users, Shield, Layers, Globe, Code2, Server, Cpu, Database, Palette, Box, Cloud,
  Zap, Flame, LayoutDashboard, Search, ShieldCheck, Rocket, FolderArchive, Calendar,
  MessageSquare, TrendingUp, FileCheck, Compass, CreditCard, Target, Mail, Building,
  Building2, Bot, FileText, Headphones, CheckCircle2, Sparkles,
} from 'lucide-react';
import { getCaseStudyById, getRelatedCaseStudies } from '../../data/caseStudiesData';

/* ════════════════════════════════════════════════════════════════
   CASE STUDY PAGE — blog-style layout
   Theme : Dark Green #0F3D2E · Yellow #E8890C · White
   Font  : Poppins
   Layout: centred title → [ left sidebar (fixed) | article (scrolls) | right sidebar (fixed) ]
           Desktop (lg+): the title + 3 columns fill one screen. Only the centre scrolls.
           Mobile / tablet: normal single column, whole page scrolls.
   All content comes from the `study` object. Optional fields are hidden when missing.
   ════════════════════════════════════════════════════════════════ */

const FONT = "font-['Inter',sans-serif]";

const ICONS = {
  Globe, Layers, Code2, Clock, Users, Shield, CheckCircle2, FolderArchive, Calendar,
  MessageSquare, TrendingUp, FileCheck, Compass, CreditCard, Target, Mail, Building,
  Building2, Bot, FileText, Headphones, Search, Palette, Server, Cpu, Database, Box,
  Cloud, Zap, Flame, LayoutDashboard, ShieldCheck, Rocket,
};
const Icon = ({ name, className = 'w-4 h-4' }) => {
  const C = ICONS[name] || Sparkles;
  return <C className={className} aria-hidden="true" />;
};

const PROCESS_STEP_IMAGES = {
  '01': 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
  '02': 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
  '03': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
  '04': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
  '05': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
};

const CONCEPT_SHOWCASE_IMAGES = {
  bhoomibay: '/case-study-images/2.png',
  'smm-consult': '/case-study-images/smm.png',
  chatsupport: '/case-study-images/3.png',
};

const CONCEPT_SHOWCASE_CAPTIONS = {
  bhoomibay: {
    tag: 'Platform Architecture Preview',
    title: 'BhoomiBay Digital Realty Ecosystem',
    badge: 'PropTech Cloud Platform',
  },
  'smm-consult': {
    tag: 'Operational Command Preview',
    title: 'SMM Consult Real-Time Analytics Engine',
    badge: 'Multi-Tenant SaaS',
  },
  chatsupport: {
    tag: 'Intelligence Pipeline Preview',
    title: 'ChatSupport AI Neural Orchestration',
    badge: 'FastAPI & RAG System',
  },
};

/* ── small reusable pieces ── */
function Reveal({ children, delay = 0, className = '' }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

/** sidebar heading with a short yellow line */
const SideTitle = ({ children, className = '' }) => (
  <h3 className={`${FONT} text-xl sm:text-[22px] font-extrabold text-[#0F3D2E] tracking-tight ${className}`}>
    {children}
    <span className="block mt-2.5 h-[3.5px] w-12 bg-[#E8890C] rounded-full" aria-hidden="true" />
  </h3>
);

/** tiny uppercase label (like "LET'S CONNECT", "PROJECT FACTS") */
const Tiny = ({ children, className = '' }) => (
  <p className={`${FONT} text-sm sm:text-[14.5px] font-black uppercase tracking-[0.14em] text-[#0F3D2E] ${className}`}>{children}</p>
);

/** article sub-heading */
const ArticleHeading = ({ id, label, children }) => (
  <div className="mb-6">
    {label && <Tiny className="!text-[#E8890C] mb-2">{label}</Tiny>}
    <h2 id={id} className={`${FONT} text-[26px] sm:text-[32px] md:text-[36px] font-black leading-snug text-[#0F3D2E]`}>{children}</h2>
  </div>
);

/** body paragraph */
const P = ({ children, className = '' }) => (
  <p className={`${FONT} text-[16.5px] sm:text-[18px] leading-[1.8] text-slate-800 font-normal ${className}`}>{children}</p>
);

function Lightbox({ items, index, onClose, onStep }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onStep(1);
      if (e.key === 'ArrowLeft') onStep(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onStep]);
  const item = items[index];
  return (
    <div role="dialog" aria-modal="true" aria-label="Project image viewer" className="fixed inset-0 z-[100] bg-[#0A291E]/95 flex flex-col items-center justify-center p-4" onClick={onClose}>
      <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white text-[#0F3D2E] flex items-center justify-center hover:bg-[#E8890C] hover:text-white transition-colors"><X className="w-5 h-5" /></button>
      <img src={item.src} alt={item.alt || item.caption || ''} className="max-h-[78vh] max-w-full object-contain" onClick={(e) => e.stopPropagation()} />
      {item.caption && <p className="mt-4 text-white/90 text-sm text-center max-w-xl">{item.caption}</p>}
      <div className="mt-4 flex gap-3" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => onStep(-1)} aria-label="Previous image" className="w-11 h-11 rounded-full bg-white/10 text-white hover:bg-[#E8890C] flex items-center justify-center transition-colors"><ArrowLeft className="w-5 h-5" /></button>
        <button onClick={() => onStep(1)} aria-label="Next image" className="w-11 h-11 rounded-full bg-white/10 text-white hover:bg-[#E8890C] flex items-center justify-center transition-colors"><ArrowRight className="w-5 h-5" /></button>
      </div>
    </div>
  );
}

/* ════════════════ PAGE ════════════════ */
export default function CaseStudyDetails() {
  const { id } = useParams();
  const study = getCaseStudyById(id);
  const related = study ? getRelatedCaseStudies(study.id) : [];
  const reduce = useReducedMotion();
  const [lightbox, setLightbox] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    scrollRef.current?.scrollTo({ top: 0 }); // opening another case study starts at the top
  }, [id]);

  if (!study) {
    return (
      <div className={`${FONT} min-h-[70vh] flex flex-col items-center justify-center px-4`}>
        <h2 className="text-2xl font-bold text-[#0F3D2E] mb-4">Case Study Not Found</h2>
        <Link to="/stories" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0F3D2E] text-white font-medium">
          <ArrowLeft className="w-4 h-4" /><span>Back to All Stories</span>
        </Link>
      </div>
    );
  }

  /* optional content */
  const heroImg = study.heroImage || study.cardImage;
  const showcaseImg = CONCEPT_SHOWCASE_IMAGES[study.id] || CONCEPT_SHOWCASE_IMAGES[study.slug] || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80';
  const about = study.aboutClient;
  const meta = study.meta || about?.highlights?.slice(0, 4).map((h) => ({ label: h.label, value: h.value })) || [];
  const challenges = (study.challenges || []).map((c) => (typeof c === 'string' ? { title: c } : c));
  const gallery = study.gallery?.length ? study.gallery : [];
  const features = study.keyFeatures || [];
  const process = study.process || [];
  const metrics = study.results?.metrics || [];
  const points = study.results?.points || [];
  const tech = study.techStack || [];
  const step = (d) => setLightbox((i) => (i + d + gallery.length) % gallery.length);


  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
  const enc = encodeURIComponent;
  const shares = [
    ['Facebook', `https://www.facebook.com/sharer/sharer.php?u=${enc(pageUrl)}`],
    ['Twitter', `https://twitter.com/intent/tweet?url=${enc(pageUrl)}&text=${enc(study.title)}`],
    ['LinkedIn', `https://www.linkedin.com/sharing/share-offsite/?url=${enc(pageUrl)}`],
    ['WhatsApp', `https://wa.me/?text=${enc(`${study.title} ${pageUrl}`)}`],
  ];

  return (
    <div className={`${FONT} w-full min-h-screen bg-white text-black selection:bg-[#E8890C] selection:text-[#0F3D2E]`}>
      {/* ───────────── 1. HERO BANNER ───────────── */}
      <PageBanner
        title={study.shortTitle ? `${study.shortTitle} Case Study` : 'Case Study Details'}
        breadcrumbs={[
          { label: 'Case Studies', path: '/stories' },
          { label: study.shortTitle || 'Case Study' },
        ]}
        bgImage="/A.png"
        className="!mb-6 lg:!mb-8"
      />

      {/* ───────────── 2. CASE STUDY HEADLINE & BADGE ───────────── */}
      <header className="px-4 sm:px-6 lg:px-8 pb-8 text-center max-w-5xl mx-auto">
        {study.badge && (
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#E8890C]/15 border border-[#E8890C]/40 text-[#E8890C] text-xs font-black uppercase tracking-wider mb-3 shadow-sm">
            {study.badge} {study.category ? `• ${study.category}` : ''}
          </span>
        )}
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`${FONT} text-2xl sm:text-3xl lg:text-[40px] font-black leading-[1.25] text-[#0F3D2E] tracking-tight`}
        >
          {study.title}
        </motion.h1>
      </header>

      {/* ───────────── 3-COLUMN BODY ───────────── */}
      <div
        className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pb-16
                   grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)_280px]
                   gap-8 lg:gap-12 items-start"
      >

        {/* ═════ LEFT SIDEBAR — About the client (sticky) ═════ */}
        {about ? (
          <aside className="order-2 lg:order-1 lg:pr-2 lg:sticky lg:top-28 self-start space-y-6" aria-label="About the client">
            <SideTitle>{about.tag || 'About the client'}</SideTitle>

            {(about.image || about.logo) && (
              <img src={about.image || about.logo} alt={about.heading || ''} loading="lazy" className="mt-5 w-full aspect-square object-cover rounded-2xl shadow-sm border border-[#0F3D2E]/10" />
            )}

            <div>
              <h4 className={`${FONT} text-lg sm:text-xl font-black leading-snug text-[#0F3D2E]`}>{about.heading}</h4>
              {about.description && (
                <p className={`${FONT} mt-3 text-[16px] sm:text-[17px] normal-case leading-relaxed text-slate-700 font-normal`}>{about.description}</p>
              )}
            </div>

            {(about.highlights || []).length > 0 && (
              <div>
                <Tiny className="mb-4">Client details</Tiny>
                <ul className="space-y-4">
                  {about.highlights.map((h) => (
                    <li key={h.id || h.label} className="flex items-start gap-3.5">
                      <span className="mt-0.5 text-[#E8890C] p-2 rounded-xl bg-[#E8890C]/10 shrink-0"><Icon name={h.iconName} className="w-5 h-5" /></span>
                      <span className="min-w-0">
                        <span className={`${FONT} block text-[12px] sm:text-[13px] font-extrabold uppercase tracking-wider text-[#E8890C]`}>{h.label}</span>
                        <span className={`${FONT} block text-[15.5px] sm:text-[16.5px] font-bold leading-snug text-[#0F3D2E] break-words mt-0.5`}>{h.value}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(about.website || study.website) && (
              <div>
                <Tiny className="mb-3.5">Let’s connect</Tiny>
                <a
                  href={about.website || study.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${FONT} inline-flex items-center gap-2 text-[16px] sm:text-[17px] font-extrabold text-[#0F3D2E] border-b-2 border-[#E8890C] pb-0.5 hover:text-[#E8890C] transition-colors`}
                >
                  Visit website <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            )}
          </aside>
        ) : (
          /* keeps the centre column in the middle when there is no client info */
          <div className="hidden lg:block lg:order-1" aria-hidden="true" />
        )}

        {/* ═════ CENTRE — the article (scrolls with page) ═════ */}
        <article
          ref={scrollRef}
          className="order-1 lg:order-2 min-w-0 lg:px-10 lg:border-x lg:border-[#0F3D2E]/10"
        >
          {heroImg && (
            <Reveal>
              <div className="group overflow-hidden rounded-2xl bg-slate-100 shadow-sm border border-[#0F3D2E]/10">
                <img src={heroImg} alt={study.title} className="w-full aspect-[3/2] object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:group-hover:scale-100" />
              </div>
            </Reveal>
          )}

            {/* lead text */}
            {study.leadDescription && (
              <Reveal className="mt-8"><P>{study.leadDescription}</P></Reveal>
            )}

            {/* challenges */}
            {challenges.length > 0 && (
              <section aria-labelledby="challenge-h" className="mt-12">
                <Reveal><ArticleHeading id="challenge-h" label="The challenge">What stood in the way</ArticleHeading></Reveal>
                <ol className="space-y-6">
                  {challenges.map((c, i) => (
                    <Reveal key={i} delay={i * 0.06}>
                      <li className="flex gap-5">
                        <span className={`${FONT} text-3xl font-extrabold leading-none text-[#E8890C]`} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                        <div className="flex-1 border-t border-[#0F3D2E]/15 pt-3">
                          <h3 className={`${FONT} text-lg font-bold text-[#0F3D2E]`}>{c.title}</h3>
                          {c.description && <P className="mt-1.5">{c.description}</P>}
                        </div>
                      </li>
                    </Reveal>
                  ))}
                </ol>
              </section>
            )}

            {/* approach */}
            {study.approach && (
              <section aria-labelledby="approach-h" className="mt-12">
                <Reveal><ArticleHeading id="approach-h" label="Our approach & strategy">{study.approach.heading || 'How we tackled it'}</ArticleHeading></Reveal>
                {study.approach.image && (
                  <Reveal>
                    <div className="group overflow-hidden mb-6 bg-slate-100 rounded-2xl shadow-sm border border-[#0F3D2E]/10">
                      <img loading="lazy" src={study.approach.image} alt={study.approach.heading || 'Our approach'} className="w-full aspect-[3/2] object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                  </Reveal>
                )}
                {study.approach.description && <Reveal><P>{study.approach.description}</P></Reveal>}
                {study.approach.points?.length > 0 && (
                  <ul className="mt-5 space-y-3">
                    {study.approach.points.map((p, i) => (
                      <li key={i} className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0 text-[#E8890C]" aria-hidden="true" />
                        <P>{p}</P>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )}

            {/* testimonial = the blockquote from the layout */}
            {study.testimonial && (
              <Reveal className="mt-10">
                <blockquote className="border-l-4 border-[#E8890C] pl-6 py-2 bg-[#0F3D2E]/5 rounded-r-2xl">
                  <p className={`${FONT} text-base sm:text-lg italic leading-relaxed text-[#0F3D2E]`}>“{study.testimonial.quote}”</p>
                  <footer className={`${FONT} mt-3 text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#0F3D2E]`}>
                    {study.testimonial.author}
                    {study.testimonial.role && <span className="text-[#E8890C]"> · {study.testimonial.role}</span>}
                  </footer>
                </blockquote>
              </Reveal>
            )}

            {/* solution */}
            {features.length > 0 && (
              <section aria-labelledby="solution-h" className="mt-12">
                <Reveal><ArticleHeading id="solution-h" label="The solution">What we built and why it works</ArticleHeading></Reveal>
                <div className="space-y-8">
                  {features.map((f, i) => (
                    <Reveal key={f.id || i} delay={i * 0.05}>
                      <div className="grid sm:grid-cols-[1fr_auto] gap-4 items-start">
                        <div>
                          <p className={`${FONT} flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#E8890C]`}>
                            <Icon name={f.iconName} />{f.tag || 'Delivered'}
                          </p>
                          <h3 className={`${FONT} mt-1.5 text-xl font-bold text-[#0F3D2E]`}>{f.title}</h3>
                          <P className="mt-1.5">{f.description}</P>
                        </div>
                        {f.image && <img loading="lazy" src={f.image} alt={f.title} className="w-full sm:w-44 h-32 object-cover rounded-xl shadow-sm border border-[#0F3D2E]/10" />}
                      </div>
                    </Reveal>
                  ))}
                </div>
              </section>
            )}

            {/* gallery */}
            {gallery.length > 0 && (
              <section aria-labelledby="gallery-h" className="mt-12">
                <Reveal><ArticleHeading id="gallery-h" label="Project showcase">The work, up close</ArticleHeading></Reveal>
                <div className="grid grid-cols-2 gap-3">
                  {gallery.map((g, i) => (
                    <Reveal key={g.src + i} delay={(i % 2) * 0.06} className={i % 3 === 0 ? 'col-span-2' : ''}>
                      <figure className="group relative overflow-hidden bg-slate-100">
                        <button
                          type="button"
                          onClick={() => setLightbox(i)}
                          aria-label={`Enlarge image: ${g.caption || g.alt || `Project image ${i + 1}`}`}
                          className="block w-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#E8890C]"
                        >
                          <img loading="lazy" src={g.src} alt={g.alt || g.caption || study.title} className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${i % 3 === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'}`} />
                        </button>
                        {g.caption && (
                          <figcaption className="absolute inset-x-0 bottom-0 bg-[#0F3D2E] text-white text-xs px-4 py-2 translate-y-full group-hover:translate-y-0 group-focus-within:translate-y-0 transition-transform duration-300">{g.caption}</figcaption>
                        )}
                      </figure>
                    </Reveal>
                  ))}
                </div>
              </section>
            )}

            {/* ─── PROCESS / PROJECT EXECUTION: 3D CARD FLOW WITH PHOTOS ─── */}
            {process.length > 0 && (
              <section aria-labelledby="process-h" className="mt-14">
                <Reveal>
                  <ArticleHeading id="process-h" label="Project execution">
                    From first call to launch
                  </ArticleHeading>
                </Reveal>

                <div className="space-y-6 mt-7">
                  {process.map((s, i) => {
                    const stepNumber = s.step || String(i + 1).padStart(2, '0');
                    const stepImg = s.image || PROCESS_STEP_IMAGES[stepNumber] || PROCESS_STEP_IMAGES['01'];
                    return (
                      <Reveal key={s.step || i} delay={i * 0.08}>
                        <motion.div
                          whileHover={{ y: -5, scale: 1.01 }}
                          transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-[#FAFDFB] to-white border-2 border-[#0F3D2E]/10 p-5 sm:p-6 shadow-[0_12px_36px_rgba(15,61,46,0.06)] hover:shadow-[0_24px_50px_rgba(15,61,46,0.14)] hover:border-[#E8890C]/50 transition-all duration-300 group"
                        >
                          {/* Ambient glow accent */}
                          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-[#E8890C]/10 via-[#0F3D2E]/5 to-transparent rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

                          <div className="relative z-10 grid grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)] gap-5 sm:gap-6 items-center">
                            {/* Step photo with 3D rounded frame */}
                            <div className="relative overflow-hidden rounded-2xl aspect-[16/10] md:aspect-[4/3] bg-slate-100 shadow-md border border-[#0F3D2E]/10 group-hover:shadow-lg transition-shadow">
                              <img
                                loading="lazy"
                                src={stepImg}
                                alt={s.title}
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#0F3D2E]/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                              
                
                            </div>

                            {/* Content */}
                            <div className="flex flex-col justify-center">
                              <div className="flex items-center gap-3 mb-2.5">
                                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F3D2E] to-[#1a5541] text-[#E8890C] flex items-center justify-center shadow-md shadow-[#0F3D2E]/20 group-hover:bg-[#E8890C] group-hover:text-white transition-colors duration-300">
                                  <Icon name={s.iconName} className="w-5 h-5" />
                                </span>
                                <span className={`${FONT} text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#E8890C]`}>
                                  Phase {stepNumber}
                                </span>
                              </div>

                              <h3 className={`${FONT} text-xl sm:text-2xl font-black text-[#0F3D2E] group-hover:text-[#E8890C] transition-colors leading-snug`}>
                                {s.title}
                              </h3>

                              <P className="mt-2 text-slate-700">
                                {s.description}
                              </P>
                            </div>
                          </div>
                        </motion.div>
                      </Reveal>
                    );
                  })}
                </div>
              </section>
            )}

            {/* ─── RESULTS & IMPACT: 3D HERO METRICS & ACHIEVEMENT CARDS ─── */}
            {study.results && (points.length > 0 || metrics.length > 0) && (
              <section aria-labelledby="results-h" className="mt-14">
                <Reveal>
                  <ArticleHeading id="results-h" label={study.results.tag || 'Results & impact'}>
                    {study.results.heading}
                  </ArticleHeading>
                </Reveal>

                {/* 3D Vibrant Metric Cards - 2/2 Uniform Height & Width Grid */}
                {metrics.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 sm:gap-5 my-7">
                    {metrics.map((m, i) => (
                      <Reveal key={i} delay={i * 0.06} className="h-full">
                        <motion.div
                          whileHover={{ y: -5, scale: 1.02 }}
                          transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F3D2E] via-[#144b39] to-[#0A291E] p-5 sm:p-6 text-center text-white shadow-xl shadow-[#0F3D2E]/20 border-2 border-white/10 hover:border-[#E8890C]/60 group cursor-default h-full min-h-[170px] sm:min-h-[185px] flex flex-col items-center justify-center transition-all duration-300"
                        >
                          <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#E8890C]/20 blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
                          <div className="relative z-10 flex flex-col items-center justify-center w-full">
                            <span className="w-10 h-10 rounded-xl bg-white/10 text-[#E8890C] flex items-center justify-center mb-3 group-hover:rotate-6 group-hover:scale-110 transition-transform shadow-inner">
                              <TrendingUp className="w-5 h-5" />
                            </span>
                            <span className={`${FONT} text-3xl sm:text-4xl lg:text-[38px] font-black text-[#E8890C] tracking-tight drop-shadow-sm leading-none`}>
                              {m.value}
                            </span>
                            <span className={`${FONT} mt-2.5 text-xs sm:text-[13px] font-extrabold uppercase tracking-wider text-white/95 leading-snug max-w-[200px]`}>
                              {m.label}
                            </span>
                          </div>
                        </motion.div>
                      </Reveal>
                    ))}
                  </div>
                )}

                {/* Impact Key Highlights in modern cards - 2x2 Equal Grid */}
                {points.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                    {points.map((p, i) => (
                      <Reveal key={i} delay={(i % 4) * 0.05} className="h-full">
                        <motion.div
                          whileHover={{ y: -3, scale: 1.01 }}
                          className="flex items-start gap-3.5 p-4.5 sm:p-5 rounded-2xl bg-white border-2 border-[#0F3D2E]/10 hover:border-[#E8890C] shadow-sm hover:shadow-lg transition-all duration-300 group h-full cursor-default"
                        >
                          <span className="w-9 h-9 rounded-xl bg-[#0F3D2E] text-[#E8890C] flex items-center justify-center flex-shrink-0 shadow-md group-hover:bg-[#E8890C] group-hover:text-white transition-colors duration-300">
                            <CheckCircle2 className="w-5 h-5" />
                          </span>
                          <p className={`${FONT} text-[15px] sm:text-[16px] font-medium text-slate-800 leading-snug pt-1 flex-1`}>
                            {p}
                          </p>
                        </motion.div>
                      </Reveal>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* ─── LIVE PLATFORM ARCHITECTURE SHOWCASE BANNER ─── */}
            {showcaseImg && (
              <Reveal className="mt-14 mb-2">
                <div className="relative overflow-hidden rounded-3xl bg-slate-900 border-2 border-[#0F3D2E]/15 shadow-xl group">
                  <div className="relative overflow-hidden aspect-[16/9] w-full">
                    <img
                      loading="lazy"
                      src={showcaseImg}
                      alt={`${study.title} platform architecture showcase`}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A291E]/90 via-[#0A291E]/25 to-transparent" />
                  </div>

                  {/* Sleek bottom overlay strip */}
                  <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 flex flex-wrap items-center justify-between gap-3 text-white">
                    <div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8890C] text-[#0F3D2E] text-xs font-black uppercase tracking-wider shadow-md">
                        {CONCEPT_SHOWCASE_CAPTIONS[study.id]?.tag || 'Platform Preview'}
                      </span>
                      <h4 className={`${FONT} text-lg sm:text-xl font-black text-white mt-2 drop-shadow-md`}>
                        {CONCEPT_SHOWCASE_CAPTIONS[study.id]?.title || `${study.shortTitle || study.title} Architecture`}
                      </h4>
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-white/95 bg-white/15 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/20">
                      {CONCEPT_SHOWCASE_CAPTIONS[study.id]?.badge || 'Production System'}
                    </span>
                  </div>
                </div>
              </Reveal>
            )}

            {/* ─── TECHNOLOGY: MODERN BALANCED 2-COLUMN ENTERPRISE TECH STACK ─── */}
            {tech.length > 0 && (
              <section aria-labelledby="tech-h" className="mt-12">
                <Reveal>
                  <ArticleHeading id="tech-h" label="Technology">
                    Built with
                  </ArticleHeading>
                </Reveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 mt-6">
                  {tech.map((t, i) => (
                    <Reveal key={i} delay={(i % 4) * 0.05}>
                      <motion.div
                        whileHover={{ y: -4, scale: 1.01 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                        className="relative overflow-hidden rounded-2xl bg-white p-4 sm:p-4.5 border-2 border-[#0F3D2E]/10 hover:border-[#E8890C] shadow-sm hover:shadow-lg transition-all duration-300 group flex items-center gap-4 cursor-default"
                      >
                        {/* Hover glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#E8890C]/5 via-transparent to-[#0F3D2E]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                        {/* Tech Icon container with 3D lift */}
                        <span className="relative z-10 w-12 h-12 rounded-xl bg-gradient-to-br from-[#0F3D2E] to-[#17523f] text-[#E8890C] flex items-center justify-center flex-shrink-0 shadow-md shadow-[#0F3D2E]/20 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                          <Icon name={t.iconName} className="w-6 h-6" />
                        </span>

                        {/* Name and Role stacked: 100% full text visibility without any truncation or ellipsis */}
                        <div className="relative z-10 min-w-0 flex-1 flex flex-col items-start justify-center gap-1">
                          <span className={`${FONT} text-base sm:text-[17px] font-black text-[#0F3D2E] group-hover:text-[#E8890C] transition-colors leading-snug break-words`}>
                            {t.name}
                          </span>
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#E8890C]/10 text-[#E8890C] text-[11px] sm:text-[12px] font-bold tracking-wide border border-[#E8890C]/30 whitespace-nowrap">
                            {t.role}
                          </span>
                        </div>
                      </motion.div>
                    </Reveal>
                  ))}
                </div>
              </section>
            )}

            {/* share this */}
            <div className={`${FONT} mt-14 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-semibold uppercase tracking-wide text-[#0F3D2E]`}>
              <span>Share this:</span>
              {shares.map(([name, href]) => (
                <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="border-b border-transparent hover:border-[#E8890C] hover:text-[#E8890C] transition-colors">
                  {name}
                </a>
              ))}
            </div>

            {/* author box */}
            <div className="mt-8 py-6 border-y border-[#0F3D2E]/10 flex gap-5 items-start">
              <span className={`${FONT} flex-shrink-0 w-[64px] h-[64px] rounded-full bg-[#0F3D2E] text-[#E8890C] flex items-center justify-center text-xl font-semibold`} aria-hidden="true">VR</span>
              <div>
                <p className={`${FONT} text-[15px] font-semibold text-[#0F3D2E]`}>Written by the VR4Web team</p>
                <p className={`${FONT} mt-1 text-[13px] leading-6 text-black`}>
                  Our engineers and designers build websites, apps and software for businesses across Australia and beyond.
                </p>
              </div>
            </div>

            {/* related posts */}
            {related.length > 0 && (
              <section aria-labelledby="related-h" className="mt-12">
                <Reveal><h2 id="related-h" className={`${FONT} text-base font-semibold text-[#0F3D2E] mb-6`}>Related case studies</h2></Reveal>
                <div className="grid sm:grid-cols-2 gap-5">
                  {related.map((r) => (
                    <Link key={r.id} to={`/stories/${r.id}`} className="group relative block h-[170px] overflow-hidden bg-slate-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#E8890C]">
                      <img loading="lazy" src={r.cardImage} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </Link>
                  ))}
                </div>
              </section>
            )}


          </article>

          {/* ═════ RIGHT SIDEBAR — More case studies + Project facts (sticky) ═════ */}
          <aside className="order-3 lg:pl-2 lg:sticky lg:top-28 self-start space-y-8" aria-label="More from VR4Web">
            {related.length > 0 && (
              <div>
                <SideTitle>More case studies</SideTitle>
                <ul className="mt-6 space-y-6">
                  {related.map((r) => (
                    <li key={r.id} className="group">
                      {r.badge && (
                        <span className={`${FONT} inline-block text-[12.5px] sm:text-[13px] font-extrabold uppercase tracking-wider text-[#E8890C] mb-1.5`}>{r.badge}</span>
                      )}
                      <Link to={`/stories/${r.id}`} className={`${FONT} block text-[16.5px] sm:text-[17.5px] font-bold leading-snug text-[#0F3D2E] group-hover:text-[#E8890C] transition-colors`}>
                        {r.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {meta.length > 0 && (
              <div>
                <Tiny className="mb-4">Project facts</Tiny>
                <ul className="space-y-3">
                  {meta.map((m) => (
                    <li key={m.label} className={`${FONT} text-[15.5px] sm:text-[16.5px] text-slate-700 flex items-baseline justify-between gap-3 border-b border-[#0F3D2E]/10 pb-2.5`}>
                      <span className="font-bold text-[#0F3D2E]">{m.label}</span>
                      <span className="text-[#E8890C] font-black text-right">({m.value})</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>

      <CtaSection />

      {lightbox !== null && <Lightbox items={gallery} index={lightbox} onClose={() => setLightbox(null)} onStep={step} />}
    </div>
  );
}