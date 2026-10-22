import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Smartphone, Code2, Monitor, ShoppingCart, Megaphone, Palette, Headphones,
  ArrowRight, ArrowUpRight, ChevronRight, ChevronLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

/* Same image set as before, defined once so the data below stays short */
const U = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=800`;
const IMG = {
  code: U("photo-1498050108023-c5249f4df085"),
  phone: U("photo-1517694712202-14dd9538aa97"),
  team: U("photo-1522881115182-995b28d0eb4c"),
  laptop: U("photo-1504384308090-c894fdcc538d"),
  dash: U("photo-1551434678-e076c223a692"),
  office: U("photo-1573164713988-8665fc963095"),
  tech: U("photo-1581291518857-484c06f8ba1c"),
  saas: U("photo-1531403009284-440f080d1e12"),
  work: U("photo-1499951360447-b19be8fe80f5"),
  app: U("photo-1512758684065-8b2b952a8a81"),
  integ: U("photo-1556761175-4b46a572b786"),
  chart: U("photo-1551288049-bebda4e38f71"),
  cms: U("photo-1497366216548-37526070297c"),
  portal: U("photo-1521737852567-6949f3f9f2b5"),
  corp: U("photo-1555949963-aa79dcee981c"),
  custom: U("photo-1586717791821-3f44a563fa4c"),
};

const s = (title, desc, img) => ({ title, desc, img });

const servicesData = [
  {
    id: "01", title: "App Development", icon: Smartphone,
    shortDesc: "Custom mobile and cross-platform applications.",
    cta: "Explore App Development", link: "/services/app-development",
    subServices: [
      s("Android Development", "Native Android applications engineered for performance.", IMG.code),
      s("iOS Development", "Premium iOS mobile experiences.", IMG.phone),
      s("React Native Development", "Cross-platform mobile interfaces.", IMG.team),
      s("Hybrid Development", "One codebase running across multiple mobile devices.", IMG.laptop),
      s("Flutter Development", "Modern mobile application UI.", IMG.dash),
      s("Kotlin / Ionic / Swift", "Full-stack mobile frameworks.", IMG.office),
      s("Visionaire", "Future-forward mobile solutions.", IMG.tech),
    ],
  },
  {
    id: "02", title: "Software Application Development", icon: Code2,
    shortDesc: "Custom enterprise software and scalable platforms.",
    cta: "Explore Software Solutions", link: "/services/software-development",
    subServices: [
      s("SaaS", "Cloud-based enterprise software dashboard.", IMG.saas),
      s("Low Code / No Code", "Rapid application development.", IMG.work),
      s("Application Development", "Full-stack custom software.", IMG.app),
      s("Software Integration", "Connected enterprise systems and APIs.", IMG.integ),
      s("AI Chat Support", "Customer support interface and AI dashboard.", IMG.chart),
    ],
  },
  {
    id: "03", title: "Web Design and Development", icon: Monitor,
    shortDesc: "Fast, responsive, and search-ready corporate websites.",
    cta: "Explore Web Development", link: "/services/web-development",
    subServices: [
      s("CMS Development", "Content management dashboard.", IMG.cms),
      s("Web Portal Development", "Enterprise web portal interface.", IMG.portal),
      s("Corporate Web Development", "Professional business website.", IMG.corp),
      s("Custom Web Application", "Bespoke browser-based platforms.", IMG.custom),
      s("SOHO Web Development", "Local business web solutions.", IMG.code),
      s("Node.js Development", "Backend architecture and server dashboard.", IMG.phone),
      s("Next.js Development", "Server-side rendered React apps.", IMG.team),
      s("React.js Development", "Modern frontend development interface.", IMG.laptop),
    ],
  },
  {
    id: "04", title: "E-commerce Solutions", icon: ShoppingCart,
    shortDesc: "Online stores and shopping experiences designed to convert.",
    cta: "Explore E-commerce Solutions", link: "/services/ecommerce",
    subServices: [
      s("Custom eCommerce Solutions", "Tailored enterprise-grade commerce platforms.", IMG.dash),
      s("Shopify Development Solutions", "Bespoke Shopify store design and development.", IMG.office),
      s("WooCommerce Development Solutions", "Scalable WordPress-based e-commerce stores.", IMG.tech),
      s("BigCommerce Development Solutions", "High-volume scalable enterprise storefronts.", IMG.saas),
    ],
  },
  {
    id: "05", title: "Digital Marketing Solutions", icon: Megaphone,
    shortDesc: "Analytics, campaign dashboards, and search performance.",
    cta: "Explore Digital Marketing", link: "/services/digital-marketing",
    subServices: [
      s("AEO", "Answer Engine Optimization for AI.", IMG.work),
      s("GEO", "Generative Engine Optimization.", IMG.app),
      s("AI SEO", "AI-powered search engine rankings.", IMG.integ),
      s("Social Media Marketing", "Brand engagement and audience building.", IMG.chart),
      s("PPC", "Targeted pay-per-click campaigns.", IMG.cms),
    ],
  },
  {
    id: "06", title: "Creative Solutions", icon: Palette,
    shortDesc: "Branding, graphic design, and digital creative work.",
    cta: "Explore Creative Solutions", link: "/services/creative",
    subServices: [
      s("UI/UX Design Services", "Human-centric user journeys and intuitive interfaces.", IMG.portal),
      s("Custom Logo Design", "Distinctive, memorable corporate brand identities.", IMG.corp),
      s("Creative Video Production", "High-definition brand commercials and promo videos.", IMG.custom),
      s("User Manual Development", "Comprehensive technical documentation and guides.", IMG.code),
      s("Product Design and Prototyping", "End-to-end digital and physical product UX design.", IMG.phone),
      s("Social Media Creative Design", "Eye-catching social graphics and digital assets.", IMG.team),
    ],
  },
  {
    id: "07", title: "Back Office Support", icon: Headphones,
    shortDesc: "Operations dashboards and business management interfaces.",
    cta: "Explore Back Office Support", link: "/services/back-office",
    subServices: [
      s("Website Maintenance", "Ongoing updates and performance checks.", IMG.laptop),
      s("24/7 Support", "Round-the-clock technical assistance.", IMG.dash),
      s("Tech Security", "Proactive defense and patches.", IMG.office),
      s("Backend Management", "Streamlined operational logistics.", IMG.tech),
    ],
  },
];

const AUTOPLAY_MS = 3000;

export default function ServicesSection() {
  const reduceMotion = useReducedMotion();
  const [serviceIdx, setServiceIdx] = useState(0);
  const [subIdx, setSubIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  const service = servicesData[serviceIdx];
  const total = service.subServices.length;
  const sub = service.subServices[subIdx];
  const autoplay = !paused && !reduceMotion && total > 1;

  // Changing service resets the sub-service in the same update (no flash of stale state)
  const selectService = useCallback((i) => {
    setServiceIdx(i);
    setSubIdx(0);
  }, []);
  const next = useCallback(() => setSubIdx((p) => (p + 1) % total), [total]);
  const prev = useCallback(() => setSubIdx((p) => (p - 1 + total) % total), [total]);

  // Autoplay: restarts whenever the slide changes (manual or automatic)
  useEffect(() => {
    if (!autoplay) return;
    const t = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [autoplay, serviceIdx, subIdx, next]);

  // Preload the next image so the crossfade never shows a blank frame
  useEffect(() => {
    const img = new Image();
    img.src = service.subServices[(subIdx + 1) % total].img;
  }, [service, subIdx, total]);

  return (
    <section
      className="relative w-full overflow-hidden bg-gradient-to-br from-[#0B4F9C] via-[#07366B] to-[#03152E] py-5 sm:py-6 lg:py-8"
      style={{ fontFamily: "Poppins, sans-serif" }}
      aria-labelledby="services-heading"
    >
      {/* Ambient glow – static for reduced-motion users */}
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -24, 0], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-[10%] -top-[30%] h-[700px] w-[700px] rounded-full bg-[#4392F1] opacity-10 blur-[140px] mix-blend-screen"
      />
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, 30, 0], opacity: [0.08, 0.12, 0.08] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="pointer-events-none absolute -bottom-[25%] -left-[15%] h-[600px] w-[600px] rounded-full bg-[#D92419] opacity-10 blur-[160px] mix-blend-screen"
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Heading */}
        <div className="mb-4 flex flex-wrap items-end justify-between gap-x-6 gap-y-1 lg:mb-5">
          <div>
            <div className="mb-1.5 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#D92419]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF5A4F]">Our Services</span>
            </div>
            <h2 id="services-heading" className="text-xl font-bold leading-tight text-white sm:text-2xl lg:text-[28px]">
              Digital solutions for every stage of growth
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:gap-8 xl:gap-12">
          {/* LEFT: service navigation – scrolling chips on mobile, list on desktop */}
          <div className="w-full lg:w-[40%]">
            <div
              role="tablist"
              aria-label="Service categories"
              className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
            >
              {servicesData.map((item, idx) => {
                const active = idx === serviceIdx;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    role="tab"
                    aria-selected={active}
                    onClick={() => selectService(idx)}
                    onMouseEnter={() => {
                      if (window.matchMedia("(hover: hover) and (min-width: 1024px)").matches) selectService(idx);
                    }}
                    className={`group relative flex shrink-0 items-center overflow-hidden rounded-full border px-4 py-2.5 text-left transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 lg:w-full lg:rounded-2xl lg:px-5 lg:py-3 ${
                      active
                        ? "border-white/25 bg-white/10 backdrop-blur-xl"
                        : "border-white/10 hover:bg-white/[0.05] lg:border-transparent"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute left-0 top-0 hidden h-full w-1.5 bg-[#D92419] lg:block"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <Icon
                      strokeWidth={active ? 2.5 : 2}
                      className={`mr-3 h-5 w-5 shrink-0 transition-colors ${active ? "text-[#FF5A4F]" : "text-white/55 group-hover:text-white/85"}`}
                    />
                    <span className={`whitespace-nowrap text-[13px] font-semibold sm:text-sm lg:flex-1 lg:whitespace-normal lg:text-[15px] ${active ? "text-white" : "text-white/80 group-hover:text-white"}`}>
                      {item.title}
                    </span>
                    <ChevronRight
                      strokeWidth={active ? 3 : 2.5}
                      className={`ml-2 hidden h-4 w-4 shrink-0 transition-transform lg:block ${active ? "translate-x-1 text-[#FF5A4F]" : "text-white/30 group-hover:translate-x-1 group-hover:text-white/60"}`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: showcase card */}
          <div className="w-full lg:w-[60%]">
            <div
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
              className="group relative h-[340px] w-full overflow-hidden rounded-3xl border border-white/10 bg-[#061834] shadow-[0_24px_50px_rgba(0,0,0,0.4)] md:h-[420px] lg:h-[440px]"
            >
              <AnimatePresence>
                <motion.img
                  key={`${service.id}-${subIdx}`}
                  src={sub.img}
                  alt={sub.title}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.7, ease: "easeInOut" }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>

              {/* Readability overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#03152E]/85 via-[#03152E]/15 to-transparent" />

              {/* Category badge */}
              <div className="absolute left-4 top-4 z-20 md:left-6 md:top-6">
                <span className="inline-block rounded-full bg-white/90 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#0B4F9C] shadow-lg backdrop-blur-md md:text-xs">
                  {service.title}
                </span>
              </div>

              {/* Prev / next */}
              {total > 1 && (
                <div className="absolute right-4 top-4 z-20 flex gap-2 md:right-6 md:top-6">
                  {[["Previous", prev, ChevronLeft], ["Next", next, ChevronRight]].map(([label, fn, Ico]) => (
                    <button
                      key={label}
                      onClick={fn}
                      aria-label={`${label} service`}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition hover:bg-white hover:text-[#0B4F9C] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <Ico className="h-4 w-4" />
                    </button>
                  ))}
                </div>
              )}

              {/* Bottom content */}
              <div className="absolute inset-x-4 bottom-4 z-20 md:inset-x-6 md:bottom-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${service.id}-${subIdx}-txt`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: reduceMotion ? 0 : 0.3 }}
                  >
                    <div className="flex max-w-full items-center gap-3 self-start rounded-full bg-white p-1.5 pr-5 shadow-[0_10px_30px_rgba(0,0,0,0.25)] sm:inline-flex">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f0f4f8] md:h-11 md:w-11">
                        <ArrowUpRight className="h-5 w-5 text-[#D92419]" strokeWidth={2.5} />
                      </span>
                      <h3 className="truncate text-sm font-extrabold tracking-tight text-[#0B4F9C] md:text-lg">{sub.title}</h3>
                    </div>
                    <p className="mt-2 max-w-md text-[13px] leading-snug text-white/85 md:text-sm">{sub.desc}</p>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <Link
                    to={service.link}
                    className="inline-flex items-center gap-2 rounded-full bg-[#D92419] px-4 py-2 text-[13px] font-semibold text-white shadow-lg transition hover:bg-[#B81D14] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    {service.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  {/* Progress dots – click to jump */}
                  <div className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 backdrop-blur-xl">
                    <div className="flex gap-1">
                      {service.subServices.map((item, i) => (
                        <button
                          key={item.title}
                          onClick={() => setSubIdx(i)}
                          aria-label={`Show ${item.title}`}
                          className="relative h-1.5 w-3 overflow-hidden rounded-full bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:w-4"
                        >
                          {i < subIdx && <span className="absolute inset-0 bg-[#FF5A4F]/50" />}
                          {i === subIdx &&
                            (autoplay ? (
                              <span
                                key={`${serviceIdx}-${subIdx}`}
                                className="svc-fill absolute inset-y-0 left-0 bg-[#FF5A4F]"
                                style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
                              />
                            ) : (
                              <span className="absolute inset-0 bg-[#FF5A4F]" />
                            ))}
                        </button>
                      ))}
                    </div>
                    <span className="whitespace-nowrap text-[10px] font-bold tracking-wider text-white">
                      {String(subIdx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes svc-fill { from { width: 0 } to { width: 100% } }
        .svc-fill { width: 0; animation-name: svc-fill; animation-timing-function: linear; animation-fill-mode: forwards; }
      `}</style>
    </section>
  );
}