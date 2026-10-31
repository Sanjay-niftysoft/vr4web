import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronRight, Home } from 'lucide-react';
import { getAllCaseStudies } from '../../data/caseStudiesData';
import authService from '../../services/authService';
import CtaSection from '../../components/CtaSection';

// ─────────────────────────────────────────────────────────────────────────────
// COLOURS (change the whole page here)
//   GREEN  = #0F3D2E
//   YELLOW = #E8890C
//   WHITE  = #FFFFFF
// ─────────────────────────────────────────────────────────────────────────────

/* Hero background image */
const HERO_BG = '/blogs.png';

/* New card images from  public/case-study/
   Matched by words in the case study title / id. Add more lines if you add more images. */
const CARD_IMAGES = [
  [/bhoomi|property|real estate/i, '/case-study/property.png'],
  [/chatsupport|chat support|chatbot/i, '/case-study/chatbot.png'],
  [/smm|social media/i, '/case-study/ad.png'],
];

function getCardImage(study) {
  if (study.featuredImage) return study.featuredImage;
  if (study.cardImage && study.cardImage.startsWith('/uploads/')) return study.cardImage;
  const key = `${study.id || ''} ${study.title || ''}`;
  const hit = CARD_IMAGES.find(([re]) => re.test(key));
  return hit ? hit[1] : (study.cardImage || FALLBACK_IMG);
}

/* Used only if a case study has no image at all */
const FALLBACK_IMG =
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80';

const EASE = [0.22, 1, 0.36, 1];

const imgFallback = (e) => {
  if (e.currentTarget.src !== FALLBACK_IMG) e.currentTarget.src = FALLBACK_IMG;
};

/* ───────────────────────────────────────────────────────────────
   Turn a long case-study title into a short name + one short line.
   Works with your current titles, for example:
   "How We Built SMM Consult's End-to-End Social Media Management Platform"
        → name: SMM Consult        text: End-to-End Social Media Management Platform
   "How We Built BhoomiBay — A Complete Real Estate Collaboration Platform ..."
        → name: BhoomiBay          text: A Complete Real Estate Collaboration Platform ...
   If a case study has its own shortTitle / summary / tags in
   caseStudiesData, those are used first.
─────────────────────────────────────────────────────────────── */
function splitTitle(study) {
  const raw = String(study.title || '').trim();
  const cleaned = raw.replace(/^how we (built|created|developed|designed)\s+/i, '');

  let name = study.shortTitle;
  let text = study.summary || study.excerpt || study.shortDescription;

  if (!name) {
    const dash = cleaned.match(/^(.+?)\s+[—–-]\s+(.+)$/);
    const poss = cleaned.match(/^(.+?)['’]s\s+(.+)$/);
    if (dash) {
      name = dash[1];
      text = text || dash[2];
    } else if (poss) {
      name = poss[1];
      text = text || poss[2];
    } else {
      name = cleaned;
    }
  }
  return { name, text: text || '' };
}

function getTags(study) {
  const t = study.tags || study.categories || study.technologies;
  if (Array.isArray(t)) return t.slice(0, 3);
  const single = study.category || study.industry;
  return single ? [single] : [];
}

/* ───────── LEFT: one case study row (image left, text right) ───────── */
function StoryRow({ study }) {
  const reduce = useReducedMotion();
  const { name, text } = splitTitle(study);
  const tags = getTags(study);
  const badge = tags[0] || 'Case Study';
  const link = `/case-study/${study.slug || study.id}`;

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="group grid grid-cols-1 sm:grid-cols-[minmax(0,320px)_1fr] lg:grid-cols-[minmax(0,300px)_1fr] gap-5 sm:gap-7 items-center pb-6 mb-6 border-b border-[#0F3D2E]/10 last:border-b-0 last:mb-0 last:pb-0"
    >
      {/* Image (case study artwork is shown whole, never cropped) */}
      <Link
        to={link}
        aria-label={`Read case study: ${study.title}`}
        className="block overflow-hidden rounded-md aspect-[4/3] bg-[#E6F0EC] shadow-[0_18px_40px_-20px_rgba(15,61,46,0.35)] outline-none focus-visible:ring-4 focus-visible:ring-[#E8890C]/40"
      >
        <img
          src={getCardImage(study) || FALLBACK_IMG}
          alt={study.title}
          loading="lazy"
          onError={imgFallback}
          className="h-full w-full object-contain p-3 transition-transform duration-700 ease-out group-hover:scale-[1.07]"
        />
      </Link>

      {/* Text */}
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px]">
          <span className="inline-block rounded-full bg-[#E8890C] px-3.5 py-1 text-xs font-bold text-white">
            {badge}
          </span>
          {study.date && <span className="font-medium text-black">{study.date}</span>}
        </div>

        <h3 className="mt-3 text-2xl sm:text-[28px] font-extrabold tracking-tight leading-tight text-[#0F3D2E] transition-colors duration-300 group-hover:text-[#E8890C]">
          <Link to={link} className="outline-none focus-visible:underline">
            {name}
          </Link>
        </h3>

        {text && (
          <p className="mt-3 text-[15px] leading-relaxed text-black line-clamp-3 max-w-[520px]">
            {text}
          </p>
        )}

        <Link
          to={link}
          className="mt-4 inline-flex items-center gap-2 border-b-2 border-[#E8890C] pb-0.5 text-sm font-bold text-[#0F3D2E] transition-colors duration-300 hover:text-[#E8890C]"
        >
          View Case Study
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
}

/* ───────── RIGHT: one item of the "all case studies" list ───────── */
function SidebarItem({ study, index }) {
  const reduce = useReducedMotion();
  const { name, text } = splitTitle(study);
  const link = `/case-study/${study.slug || study.id}`;

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: Math.min(index, 5) * 0.06, ease: EASE }}
      className="border-b border-[#0F3D2E]/10 last:border-b-0 py-4 first:pt-0 last:pb-0"
    >
      <Link
        to={link}
        aria-label={`Read case study: ${study.title}`}
        className="group flex items-center gap-4 outline-none focus-visible:ring-4 focus-visible:ring-[#E8890C]/40 rounded-md"
      >
        <div className="h-[92px] w-[84px] flex-shrink-0 overflow-hidden rounded-md bg-[#E6F0EC]">
          <img
            src={getCardImage(study) || FALLBACK_IMG}
            alt=""
            loading="lazy"
            onError={imgFallback}
            className="h-full w-full object-contain p-1.5 transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="min-w-0">
          <h4 className="text-[16px] font-extrabold leading-snug text-[#0F3D2E] line-clamp-2 transition-colors duration-300 group-hover:text-[#E8890C]">
            {name}
          </h4>
          {text && <p className="mt-1 text-xs font-medium leading-snug text-black line-clamp-2">{text}</p>}
        </div>
      </Link>
    </motion.div>
  );
}

export default function CaseStudies() {
  const staticStudies = useMemo(() => getAllCaseStudies(), []);
  const [caseStudies, setCaseStudies] = useState(staticStudies);

  useEffect(() => {
    let isMounted = true;
    const fetchLiveStudies = async () => {
      try {
        const res = await authService.getPublicCaseStudies({ limit: 50 });
        if (res?.success && Array.isArray(res.data) && res.data.length > 0 && isMounted) {
          const liveNormalized = res.data.map((item) => ({
            id: item.slug || item._id,
            slug: item.slug,
            _id: item._id,
            title: item.title,
            shortTitle: item.clientName || item.title,
            summary: item.shortDescription || item.summary || item.projectOverview || item.challenge || '',
            category: item.category || 'Case Study',
            industry: item.industry || '',
            featuredImage: item.featuredImage,
            cardImage: item.featuredImage || '/case-study/ad.png',
            date: item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '',
            isLive: true,
            creationMode: item.creationMode,
            tags: [item.category, item.industry].filter(Boolean)
          }));

          const liveIds = new Set(liveNormalized.map((s) => s.id));
          const filteredStatic = staticStudies.filter((s) => !liveIds.has(s.id));
          setCaseStudies([...liveNormalized, ...filteredStatic]);
        }
      } catch (err) {
        console.warn('Using static case studies data fallback:', err);
      }
    };

    fetchLiveStudies();
    return () => {
      isMounted = false;
    };
  }, [staticStudies]);

  /* Tags card is shown only if your case studies have tags / categories */
  const tags = useMemo(
    () => Array.from(new Set(caseStudies.flatMap((s) => getTags(s)))),
    [caseStudies]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-white font-sans text-[#0F3D2E] selection:bg-[#0F3D2E] selection:text-white">
      {/* ─── 1. HERO ─── */}
      <section
        className="relative w-full overflow-hidden px-4 md:px-8 pt-32 pb-8 md:pt-36 md:pb-9 bg-[rgb(240,231,195)] border-b border-slate-200"
      >
        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 leading-tight text-[#0F3D2E]"
          >
            Our Successful <span className="text-[#E8890C]">Case Studies</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium bg-[#0F3D2E] text-white px-4 py-1.5 rounded-full shadow-md"
          >
            <Link to="/" className="flex items-center gap-1 hover:text-[#E8890C] transition-colors">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/60" />
            <span className="font-semibold">Case Studies</span>
          </motion.div>
        </div>
      </section>

      {/* ─── 2. CASE STUDY LIST (left: one by one) + SIDEBAR (right: all case studies) ─── */}
      <section className="py-8 md:py-10 px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <span className="inline-block px-4 py-1 rounded-full bg-[#E8890C]/15 border border-[#E8890C] text-[#0F3D2E] text-sm font-bold mb-4">
            Selected Works
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            <span className="text-[#0F3D2E]">Real Projects,</span>{' '}
            <span className="text-[#E8890C]">Real Impact</span>
          </h2>

          <p className="text-black text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Explore how we build tailored, high-performance systems and user interfaces for diverse business domains.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-8 lg:gap-12 items-start">
          {/* LEFT: case studies appear one by one as you scroll */}
          <div>
            {caseStudies.map((study) => (
              <StoryRow key={study.id} study={study} />
            ))}
          </div>

          {/* RIGHT: sidebar showing all case studies (stays in view while you scroll) */}
          <aside className="lg:sticky lg:top-28 space-y-8">
            <div className="rounded-lg border border-[#0F3D2E]/10 bg-white p-6 shadow-[0_18px_40px_-24px_rgba(15,61,46,0.35)]">
              <div className="mb-5">
                <h3 className="text-xl font-extrabold tracking-tight text-[#0F3D2E]">All Case Studies</h3>
                <span className="mt-2 block h-[3px] w-12 rounded-full bg-[#E8890C]" />
              </div>

              <div className="max-h-[560px] overflow-y-auto pr-1 [scrollbar-width:thin]">
                {caseStudies.map((study, i) => (
                  <SidebarItem key={study.id} study={study} index={i} />
                ))}
              </div>
            </div>

            {tags.length > 0 && (
              <div className="rounded-lg border border-[#0F3D2E]/10 bg-white p-6 shadow-[0_18px_40px_-24px_rgba(15,61,46,0.35)]">
                <div className="mb-5">
                  <h3 className="text-xl font-extrabold tracking-tight text-[#0F3D2E]">Tags</h3>
                  <span className="mt-2 block h-[3px] w-12 rounded-full bg-[#E8890C]" />
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#0F3D2E]/20 px-4 py-1.5 text-sm font-semibold text-[#0F3D2E] transition-colors duration-300 hover:border-[#E8890C] hover:bg-[#E8890C] hover:text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* ─── 3. CTA ─── */}
      <CtaSection />
    </div>
  );
}