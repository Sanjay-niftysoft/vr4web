import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import CtaSection from '../../components/CtaSection';
import {
  ArrowRight, ArrowLeft, ChevronRight, Home, X, Quote,
  Clock, Users, Shield, Layers, Globe, Code2, Server, Cpu, Database, Palette, Box, Cloud,
  Zap, Flame, LayoutDashboard, Search, ShieldCheck, Rocket, FolderArchive, Calendar,
  MessageSquare, TrendingUp, FileCheck, Compass, CreditCard, Target, Mail, Building,
  Building2, Bot, FileText, Headphones, CheckCircle2, Sparkles,
} from 'lucide-react';
import { getCaseStudyById, getRelatedCaseStudies } from '../../data/caseStudiesData';

/* ════════════════════════════════════════════════════════════════
   MASTER CASE STUDY PAGE — all content comes from the `study` object.
   Optional fields (hidden when missing): meta, challenges, approach,
   gallery, testimonial, techStack, process, results.metrics, cta,
   keyFeatures[].image
   ════════════════════════════════════════════════════════════════ */

const ICONS = {
  Globe, Layers, Code2, Clock, Users, Shield, CheckCircle2, FolderArchive, Calendar,
  MessageSquare, TrendingUp, FileCheck, Compass, CreditCard, Target, Mail, Building,
  Building2, Bot, FileText, Headphones, Search, Palette, Server, Cpu, Database, Box,
  Cloud, Zap, Flame, LayoutDashboard, ShieldCheck, Rocket,
};
const Icon = ({ name, className = 'w-5 h-5' }) => {
  const C = ICONS[name] || Sparkles;
  return <C className={className} aria-hidden="true" />;
};

/* Section background cycle: white → light blue → white → dark navy */
const CYCLE = ['white', 'sky', 'white', 'navy'];
const TONES = {
  white: { bg: 'bg-white', head: '#102448', body: '#000', line: 'rgba(16,36,72,.15)', accent: '#D7192D', hover: '#D3E6FA' },
  sky: { bg: 'bg-[#8DBDEC]', head: '#102448', body: '#000', line: 'rgba(16,36,72,.15)', accent: '#D7192D', hover: '#FFFFFF' },
  navy: { bg: 'bg-[#102448]', head: '#FFFFFF', body: 'rgba(255,255,255,.9)', line: 'rgba(255,255,255,.22)', accent: '#FF5A6B', hover: 'rgba(255,255,255,.12)' },
  red: { bg: 'bg-[#D7192D]', head: '#FFFFFF', body: 'rgba(255,255,255,.95)', line: 'rgba(255,255,255,.35)', accent: '#FFFFFF', hover: 'rgba(255,255,255,.15)' },
};

const SLOTS = [
  'md:col-span-8 md:row-span-2', 'md:col-span-4', 'md:col-span-4',
  'md:col-span-5', 'md:col-span-7', 'md:col-span-12',
];

/* ── Reusable pieces ── */
function Band({ tone, id, children, className = '' }) {
  const t = TONES[tone];
  return (
    <section
      aria-labelledby={id}
      className={`${t.bg} relative py-10 md:py-14 px-4 sm:px-6 lg:px-8 overflow-hidden ${className}`}
      style={{ '--head': t.head, '--body': t.body, '--line': t.line, '--accent': t.accent, '--hover': t.hover }}
    >
      <div className="max-w-7xl mx-auto relative">{children}</div>
    </section>
  );
}

function Reveal({ children, delay = 0, className = '' }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

function Heading({ id, label, title }) {
  return (
    <div>
      {label && (
        <p className="flex items-center gap-3 text-sm font-semibold mb-3 text-[color:var(--head)]">
          <span className="block w-10 h-[3px] bg-[#D7192D]" aria-hidden="true" />
          <span className="opacity-75">{label}</span>
        </p>
      )}
      <h2 id={id} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] text-[color:var(--head)]">
        {title}
      </h2>
    </div>
  );
}

function Btn({ to, children, variant = 'red' }) {
  const base =
    'inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-xl text-sm sm:text-base font-bold transition-all duration-200 ease-out hover:-translate-y-1.5 active:translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 motion-reduce:transition-none motion-reduce:hover:translate-y-0';
  const styles = {
    red: 'bg-[#D7192D] text-white shadow-[0_6px_0_0_#9d0f1f] hover:shadow-[0_12px_0_0_#9d0f1f,0_18px_28px_-6px_rgba(215,25,45,0.55)] active:shadow-[0_2px_0_0_#9d0f1f]',
    white: 'bg-white text-[#102448] shadow-[0_6px_0_0_#102448] hover:shadow-[0_12px_0_0_#102448,0_18px_28px_-6px_rgba(0,0,0,0.4)] active:shadow-[0_2px_0_0_#102448]',
    ghost: 'bg-transparent text-white border-2 border-white/50 hover:border-white hover:bg-white/10',
  }[variant];
  return (
    <Link to={to} className={`${base} ${styles}`}>
      <span>{children}</span>
      <span className={`flex items-center justify-center w-9 h-9 rounded-full ${variant === 'red' ? 'bg-white text-[#D7192D]' : variant === 'white' ? 'bg-[#D7192D] text-white' : 'bg-white text-[#102448]'}`}>
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </span>
    </Link>
  );
}

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
    <div role="dialog" aria-modal="true" aria-label="Project image viewer" className="fixed inset-0 z-[100] bg-[#0a1630]/95 flex flex-col items-center justify-center p-4" onClick={onClose}>
      <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white text-[#102448] flex items-center justify-center hover:bg-[#D7192D] hover:text-white transition-colors"><X className="w-5 h-5" /></button>
      <img src={item.src} alt={item.alt || item.caption || ''} className="max-h-[78vh] max-w-full object-contain" onClick={(e) => e.stopPropagation()} />
      {item.caption && <p className="mt-4 text-white/90 text-sm text-center max-w-xl">{item.caption}</p>}
      <div className="mt-4 flex gap-3" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => onStep(-1)} aria-label="Previous image" className="w-11 h-11 rounded-full bg-white/10 text-white hover:bg-[#D7192D] flex items-center justify-center transition-colors"><ArrowLeft className="w-5 h-5" /></button>
        <button onClick={() => onStep(1)} aria-label="Next image" className="w-11 h-11 rounded-full bg-white/10 text-white hover:bg-[#D7192D] flex items-center justify-center transition-colors"><ArrowRight className="w-5 h-5" /></button>
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
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const nFeat = study?.keyFeatures?.length || 0;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    setActive(0);
  }, [id, reduce]);

  /* Auto-highlight solution rows one by one */
  useEffect(() => {
    if (reduce || paused || nFeat < 2) return undefined;
    const t = setInterval(() => setActive((a) => (a + 1) % nFeat), 2800);
    return () => clearInterval(t);
  }, [reduce, paused, nFeat]);

  if (!study) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl font-bold text-[#102448] mb-4">Case Study Not Found</h2>
        <Link to="/stories" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#102448] text-white font-medium">
          <ArrowLeft className="w-4 h-4" /><span>Back to All Stories</span>
        </Link>
      </div>
    );
  }

  /* Optional content */
  const heroImg = study.heroImage || study.cardImage;
  const meta = study.meta || study.aboutClient?.highlights?.slice(0, 4).map((h) => ({ label: h.label, value: h.value })) || [];
  const challenges = (study.challenges || []).map((c) => (typeof c === 'string' ? { title: c } : c));
  const fallbackImgs = [...new Set([study.heroImage, study.cardImage].filter(Boolean))];
  const gallery = study.gallery?.length ? study.gallery : fallbackImgs.length > 1 ? fallbackImgs.map((src) => ({ src, alt: study.title })) : [];
  const features = study.keyFeatures || [];
  const process = study.process || [];
  const metrics = study.results?.metrics || [];
  const points = study.results?.points || [];
  const tech = study.techStack || [];
  const cta = {
    heading: 'Have a Similar Challenge?',
    text: "Let's explore how the right strategy and solution can help your business move forward.",
    primary: { label: 'Start Your Project', to: '/contact' },
    secondary: { label: 'Explore More Case Studies', to: '/stories' },
    ...(study.cta || {}),
  };
  const step = (d) => setLightbox((i) => (i + d + gallery.length) % gallery.length);

  /* Decide which sections show, then give each the next colour in the cycle */
  const order = [
    (heroImg || study.leadDescription || meta.length) && 'intro',
    study.aboutClient && 'overview',
    challenges.length && 'challenge',
    study.approach && 'approach',
    features.length && 'solution',
    gallery.length && 'gallery',
    process.length && 'process',
    study.results && (points.length || metrics.length) && 'results',
    tech.length && 'tech',
    related.length && 'related',
  ].filter(Boolean);
  const tone = (k) => CYCLE[order.indexOf(k) % CYCLE.length];
  const lastTone = order.length ? tone(order[order.length - 1]) : 'white';
  const ctaTone = lastTone === 'navy' ? 'red' : 'navy';

  return (
    <div className="w-full min-h-screen bg-white font-sans text-[#102448] selection:bg-[#D7192D] selection:text-white overflow-x-clip">
      {/* ─── 01 HERO — title + breadcrumb only ─── */}
      <header className="relative bg-gradient-to-br from-[#A6D0F0] via-[#8DBDEC] to-[#74A8E4] pt-28 md:pt-32 pb-10 md:pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="relative max-w-6xl mx-auto text-center flex flex-col items-center">
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.12] text-white max-w-5xl drop-shadow-[0_3px_12px_rgba(16,36,72,0.45)]"
          >
            {study.title}
          </motion.h1>
          <nav aria-label="Breadcrumb" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white bg-[#5d86b8]/50 backdrop-blur px-5 py-2 rounded-full">
            <Link to="/" className="flex items-center gap-1 hover:text-[#102448] transition-colors"><Home className="w-4 h-4" aria-hidden="true" />Home</Link>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
            <Link to="/stories" className="font-bold hover:text-[#102448] transition-colors">Case Studies</Link>
          </nav>
        </div>
      </header>

      {/* ─── 01b INTRO — description, key facts, image ─── */}
      {order.includes('intro') && (
        <Band tone={tone('intro')} id="intro-h">
          <h2 id="intro-h" className="sr-only">Project summary</h2>
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <Reveal className="lg:col-span-5">
              {study.badge && <p className="inline-block bg-[#D7192D] text-white text-sm font-semibold px-4 py-1.5 mb-4">{study.badge}</p>}
              {study.leadDescription && <p className="text-base sm:text-lg leading-relaxed text-[color:var(--body)]">{study.leadDescription}</p>}
              {meta.length > 0 && (
                <dl className="mt-5 grid grid-cols-2 gap-px bg-[#102448]/30 border border-[#102448]/30 border-b-4 border-b-[#D7192D] text-left">
                  {meta.map((m) => (
                    <div key={m.label} className="bg-white px-4 py-3">
                      <dt className="text-xs text-black">{m.label}</dt>
                      <dd className="text-sm font-bold text-[#102448]">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </Reveal>
            {heroImg && (
              <Reveal delay={0.1} className="lg:col-span-7">
                <div className="group relative">
                  <div className="absolute -bottom-4 -right-4 w-3/4 h-3/4 bg-[#102448]" aria-hidden="true" />
                  <div className="absolute -top-3 -left-3 w-20 h-20 border-t-4 border-l-4 border-[#D7192D]" aria-hidden="true" />
                  <div className="relative overflow-hidden h-64 sm:h-80 lg:h-96 bg-white">
                    <img src={heroImg} alt={study.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 motion-reduce:group-hover:scale-100" />
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </Band>
      )}

      {/* ─── 02 OVERVIEW ─── */}
      {study.aboutClient && (
        <Band tone={tone('overview')} id="overview-h">
                    <div className="grid lg:grid-cols-12 gap-8">
            <Reveal className="lg:col-span-5">
              <Heading id="overview-h" label={study.aboutClient.tag || 'Project overview'} title={study.aboutClient.heading} />
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-[color:var(--body)]">{study.aboutClient.description}</p>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-7">
              <ul className="border-y border-[color:var(--line)]" style={{ perspective: 900 }}>
                {(study.aboutClient.highlights || []).map((h) => (
                  <li
                    key={h.id}
                    className="relative px-4 py-3 grid sm:grid-cols-12 gap-1 sm:gap-6 items-start border-b last:border-b-0 border-[color:var(--line)] cursor-default
                               transition-all duration-300 ease-out hover:z-10 hover:-translate-y-1 hover:scale-[1.03] hover:bg-[color:var(--hover)] hover:shadow-[0_18px_40px_-12px_rgba(16,36,72,0.45)] hover:rounded-lg hover:border-transparent motion-reduce:transform-none"
                  >
                    <span className="sm:col-span-4 flex items-center gap-3 text-sm font-semibold text-[color:var(--accent)]">
                      <Icon name={h.iconName} />{h.label}
                    </span>
                    <span className="sm:col-span-8">
                      <span className="block text-lg font-bold text-[color:var(--head)]">{h.value}</span>
                      {h.desc && <span className="block text-sm mt-0.5 leading-relaxed text-[color:var(--body)]">{h.desc}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Band>
      )}

      {/* ─── 03 CHALLENGE (optional) ─── */}
      {challenges.length > 0 && (
        <Band tone={tone('challenge')} id="challenge-h">
          <div className="grid lg:grid-cols-12 gap-8">
            <Reveal className="lg:col-span-4 lg:sticky lg:top-32 self-start">
              <Heading id="challenge-h" label="The challenge" title="What stood in the way" />
            </Reveal>
            <ol className="lg:col-span-8 space-y-6">
              {challenges.map((c, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <li className="flex gap-6 sm:gap-10 items-start">
                    <span className="text-5xl sm:text-7xl font-extrabold leading-none text-[color:var(--accent)]" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    <div className="border-t border-[color:var(--line)] flex-1 pt-4">
                      <h3 className="text-xl sm:text-2xl font-bold text-[color:var(--head)]">{c.title}</h3>
                      {c.description && <p className="mt-2 leading-relaxed text-[color:var(--body)]">{c.description}</p>}
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </Band>
      )}

      {/* ─── 04 APPROACH (optional) ─── */}
      {study.approach && (
        <Band tone={tone('approach')} id="approach-h">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {study.approach.image && (
              <Reveal className="lg:col-span-6 relative order-last lg:order-first">
                <div className="group relative">
                  <div className="absolute -top-4 -left-4 w-2/3 h-2/3 bg-[#D7192D]" aria-hidden="true" />
                  <div className="relative overflow-hidden h-72 sm:h-[24rem]">
                    <img loading="lazy" src={study.approach.image} alt={study.approach.heading || 'Our approach'} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                </div>
              </Reveal>
            )}
            <Reveal delay={0.1} className={study.approach.image ? 'lg:col-span-6' : 'lg:col-span-8 lg:col-start-3'}>
              <Heading id="approach-h" label="Our approach & strategy" title={study.approach.heading || 'How we tackled it'} />
              {study.approach.description && <p className="mt-4 text-base sm:text-lg leading-relaxed text-[color:var(--body)]">{study.approach.description}</p>}
              {study.approach.points?.length > 0 && (
                <ul className="mt-4 space-y-3">
                  {study.approach.points.map((p, i) => (
                    <li key={i} className="flex gap-3 text-[color:var(--body)]">
                      <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0 text-[color:var(--accent)]" aria-hidden="true" /><span>{p}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          </div>
        </Band>
      )}

      {/* ─── 05 SOLUTION — rows highlight one by one automatically ─── */}
      {features.length > 0 && (
        <Band tone={tone('solution')} id="solution-h">
          <Reveal className="max-w-3xl mb-6">
            <Heading id="solution-h" label="The solution" title="What we built and why it works" />
          </Reveal>
          <div onMouseLeave={() => setPaused(false)} style={{ perspective: 1000 }}>
            {features.map((f, i) => {
              const on = i === active;
              return (
                <Reveal key={f.id}>
                  <article
                    onMouseEnter={() => { setActive(i); setPaused(true); }}
                    onFocus={() => { setActive(i); setPaused(true); }}
                    onBlur={() => setPaused(false)}
                    tabIndex={0}
                    className={`relative grid lg:grid-cols-12 gap-3 lg:gap-8 items-center px-5 py-4 border-b border-[color:var(--line)] transition-all duration-500 ease-out outline-none focus-visible:ring-4 focus-visible:ring-[#D7192D]/40
                      ${on ? 'z-10 bg-[color:var(--hover)] scale-[1.025] shadow-[0_20px_44px_-14px_rgba(16,36,72,0.5)] rounded-lg border-transparent' : 'opacity-80'} motion-reduce:transform-none`}
                  >
                    <span className={`absolute left-0 top-0 h-full w-1.5 bg-[#D7192D] origin-top transition-transform duration-500 ${on ? 'scale-y-100' : 'scale-y-0'}`} aria-hidden="true" />
                    <div className="lg:col-span-5">
                      <span className="flex items-center gap-3 text-sm font-semibold mb-1 text-[color:var(--accent)]">
                        <span className={`inline-flex transition-transform duration-500 ${on ? 'scale-125 rotate-6' : ''}`}><Icon name={f.iconName} /></span>
                        {f.tag || 'Delivered'}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[color:var(--head)]">{f.title}</h3>
                    </div>
                    <p className={`${f.image ? 'lg:col-span-5' : 'lg:col-span-7'} text-base leading-relaxed text-[color:var(--body)]`}>{f.description}</p>
                    {f.image && <img loading="lazy" src={f.image} alt={f.title} className="lg:col-span-2 w-full h-24 object-cover" />}
                    {on && !paused && !reduce && (
                      <motion.span className="absolute left-0 bottom-0 h-[3px] w-full bg-[#D7192D] origin-left" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 2.8, ease: 'linear' }} aria-hidden="true" />
                    )}
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Band>
      )}

      {/* ─── 06 GALLERY COLLAGE ─── */}
      {gallery.length > 0 && (
        <Band tone={tone('gallery')} id="gallery-h">
          <Reveal className="mb-6"><Heading id="gallery-h" label="Project showcase" title="The work, up close" /></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[13rem] md:auto-rows-[15rem] gap-3 md:gap-4">
            {gallery.map((g, i) => (
              <Reveal key={g.src + i} delay={(i % 3) * 0.08} className={`${SLOTS[i % SLOTS.length]} min-h-0`}>
                <figure className="group relative h-full overflow-hidden bg-slate-100">
                  <button type="button" onClick={() => setLightbox(i)} aria-label={`Enlarge image: ${g.caption || g.alt || `Project image ${i + 1}`}`} className="block w-full h-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#D7192D]">
                    <img loading="lazy" src={g.src} alt={g.alt || g.caption || study.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 motion-reduce:group-hover:scale-100" />
                  </button>
                  {g.caption && (
                    <figcaption className="absolute inset-x-0 bottom-0 bg-[#102448] text-white text-sm px-4 py-2 translate-y-full group-hover:translate-y-0 group-focus-within:translate-y-0 transition-transform duration-300">{g.caption}</figcaption>
                  )}
                </figure>
              </Reveal>
            ))}
          </div>
        </Band>
      )}

      {/* ─── 07 EXECUTION TIMELINE — icons + animated line ─── */}
      {process.length > 0 && (
        <Band tone={tone('process')} id="process-h">
          <Reveal className="mb-8 max-w-3xl"><Heading id="process-h" label="Project execution" title="From first call to launch" /></Reveal>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-flow-col lg:auto-cols-fr gap-x-4 gap-y-8">
            {process.map((s, i) => (
              <li key={s.step || i} className="group">
                <div className="flex items-center">
                  <motion.span
                    initial={reduce ? false : { scale: 0, rotate: -90 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 220, damping: 14, delay: i * 0.15 }}
                    className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-[#D7192D] text-white flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
                  >
                    <span className="absolute inset-0 rounded-full bg-[#D7192D] opacity-0 group-hover:opacity-40 motion-safe:group-hover:animate-ping" aria-hidden="true" />
                    <Icon name={s.iconName} className="relative w-5 h-5" />
                  </motion.span>
                  <motion.span
                    initial={reduce ? false : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.15 + 0.2, ease: 'easeOut' }}
                    className="h-[3px] flex-1 origin-left bg-gradient-to-r from-[#D7192D] to-[color:var(--line)]"
                    aria-hidden="true"
                  />
                </div>
                <Reveal delay={i * 0.12}>
                  <div className="mt-4 mr-2 p-4 rounded-lg transition-all duration-300 group-hover:-translate-y-2 group-hover:bg-[color:var(--hover)] group-hover:shadow-[0_18px_36px_-12px_rgba(16,36,72,0.45)]">
                    <span className="text-3xl font-extrabold text-[color:var(--accent)] transition-transform duration-300 inline-block group-hover:scale-110 origin-left">{s.step || String(i + 1).padStart(2, '0')}</span>
                    <h3 className="mt-1 text-lg font-bold text-[color:var(--head)]">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[color:var(--body)]">{s.description}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Band>
      )}

      {/* ─── 08 RESULTS — no empty column ─── */}
      {order.includes('results') && (
        <Band tone={tone('results')} id="results-h">
          <Reveal className="mb-6 max-w-3xl"><Heading id="results-h" label={study.results.tag || 'Results & impact'} title={study.results.heading} /></Reveal>

          {metrics.length > 0 && (
            <dl className="grid grid-cols-2 lg:grid-cols-4 border-y-2 border-[color:var(--head)] mb-8">
              {metrics.map((m, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="py-5 px-4 sm:px-6 border-r last:border-r-0 border-[color:var(--line)] h-full transition-colors hover:bg-[color:var(--hover)]">
                    <dd className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[color:var(--accent)]">{m.value}</dd>
                    <dt className="mt-1 text-sm font-medium text-[color:var(--body)]">{m.label}</dt>
                  </div>
                </Reveal>
              ))}
            </dl>
          )}

          {points.length > 0 && (
            <ul className="grid md:grid-cols-2 gap-x-8" style={{ perspective: 900 }}>
              {points.map((p, i) => (
                <Reveal key={i} delay={(i % 2) * 0.08}>
                  <li className="flex gap-4 px-4 py-3 border-b border-[color:var(--line)] text-base sm:text-lg leading-relaxed text-[color:var(--body)] transition-all duration-300 hover:-translate-y-1 hover:bg-[color:var(--hover)] hover:shadow-lg hover:rounded-lg hover:border-transparent">
                    <CheckCircle2 className="w-6 h-6 mt-0.5 flex-shrink-0 text-[color:var(--accent)]" aria-hidden="true" />
                    <span>{p}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          )}

          {study.testimonial && (
            <figure className="mt-8 bg-[#102448] text-white p-8 sm:p-10 border-l-8 border-[#D7192D]">
              <Quote className="w-9 h-9 text-[#FF5A6B]" aria-hidden="true" />
              <blockquote className="mt-3 text-lg sm:text-2xl leading-relaxed">{study.testimonial.quote}</blockquote>
              <figcaption className="mt-4 text-sm text-white/80">
                <span className="font-bold text-white">{study.testimonial.author}</span>
                {study.testimonial.role && <span> · {study.testimonial.role}</span>}
              </figcaption>
            </figure>
          )}
        </Band>
      )}

      {/* ─── Tech stack (optional) ─── */}
      {tech.length > 0 && (
        <Band tone={tone('tech')} id="tech-h">
          <div className="grid lg:grid-cols-12 gap-8">
            <Reveal className="lg:col-span-4"><Heading id="tech-h" label="Technology" title="Built with" /></Reveal>
            <ul className="lg:col-span-8 grid sm:grid-cols-2 gap-x-8">
              {tech.map((t, i) => (
                <li key={i} className="flex items-center gap-4 px-3 py-3 border-b border-[color:var(--line)] transition-all duration-300 hover:bg-[color:var(--hover)] hover:-translate-y-0.5 hover:rounded-lg">
                  <Icon name={t.iconName} className="w-5 h-5 text-[color:var(--accent)] flex-shrink-0" />
                  <span className="font-bold text-[color:var(--head)]">{t.name}</span>
                  <span className="ml-auto text-sm text-[color:var(--body)]">{t.role}</span>
                </li>
              ))}
            </ul>
          </div>
        </Band>
      )}

      {/* ─── Related projects (optional) ─── */}
      {related.length > 0 && (
        <Band tone={tone('related')} id="related-h">
          <Reveal className="mb-6"><Heading id="related-h" label="More work" title="Related case studies" /></Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {related.map((r) => (
              <Link key={r.id} to={`/stories/${r.id}`} className="group block focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#D7192D]">
                <div className="overflow-hidden h-60 bg-slate-100">
                  <img loading="lazy" src={r.cardImage} alt={r.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 motion-reduce:group-hover:scale-100" />
                </div>
                <h3 className="mt-3 text-lg sm:text-xl font-bold leading-snug text-[color:var(--head)] group-hover:text-[color:var(--accent)] transition-colors">{r.title}</h3>
                <span className="mt-1 inline-flex items-center gap-2 text-sm font-bold text-[color:var(--accent)]">
                  View case study <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </Band>
      )}

      <CtaSection />

      {lightbox !== null && <Lightbox items={gallery} index={lightbox} onClose={() => setLightbox(null)} onStep={step} />}
    </div>
  );
}