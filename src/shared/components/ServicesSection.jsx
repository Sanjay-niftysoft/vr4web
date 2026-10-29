import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Smartphone, Code2, Monitor, ShoppingCart, Megaphone, Palette, Headphones,
  ArrowRight, ArrowUpRight, ChevronRight, ChevronLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

/* Section background photo: Iconic Sydney Harbour & modern tech skyline (Australia) */
const BG_SERVICES = 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=1800';
const BG_SERVICES_FALLBACK = 'https://images.unsplash.com/photo-1514395462725-fb4566210144?auto=format&fit=crop&q=80&w=1800';

function PhotoBackdrop({ src, fallback }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallback; }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Reduced green overlay: subtle luxury dark slate & charcoal with gentle brand emerald tint */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#07130f]/92 via-[#0a1f18]/70 to-[#06110d]/92" />
      {/* soft dark edge at the top and bottom so the section blends seamlessly into the page */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />
    </div>
  );
}

const s = (title, desc, img) => ({ title, desc, img });

const servicesData = [
  {
    id: "01", title: "App Development", icon: Smartphone,
    shortDesc: "Custom mobile and cross-platform applications.",
    cta: "Explore App Development", link: "/services/app-development",
    subServices: [
      s(
        "Android Development",
        "Native Android applications engineered for performance.",
        "/services-section-home-page/app-development/Android Development.png"
      ),

      s(
        "iOS Development",
        "Premium iOS mobile experiences.",
        "/services-section-home-page/app-development/iOS Development.png"
      ),

      s(
        "React Native Development",
        "Cross-platform mobile interfaces.",
        "/services-section-home-page/app-development/React Native Development.png"
      ),

      s(
        "Hybrid Development",
        "One codebase running across multiple mobile devices.",
        "/services-section-home-page/app-development/Hybrid Development.png"
      ),

      s(
        "Flutter Development",
        "Modern mobile application UI.",
        "/services-section-home-page/app-development/flutter.png"
      ),

      s(
        "Kotlin / Ionic / Swift",
        "Full-stack mobile frameworks.",
        "/services-section-home-page/app-development/kolitein.png"
      ),

      s(
        "Visionaire",
        "Future-forward mobile solutions.",
        "/services-section-home-page/app-development/Visionaire.png"
      ),
    ],
  },
  {
    id: "02", title: "Software Application Development", icon: Code2,
    shortDesc: "Custom enterprise software and scalable platforms.",
    cta: "Explore Software Solutions", link: "/services/software-development",
    subServices: [
      s("SaaS", "Cloud-based enterprise software dashboard.", "/services-section-home-page/Software Application Development/saas.png"),
      s("Low Code / No Code", "Rapid application development.", "/services-section-home-page/Software Application Development/Low Code-No Code.png"),
      s("Application Development", "Full-stack custom software.", "/services-section-home-page/Software Application Development/Application Development.png"),
      s("Software Integration", "Connected enterprise systems and APIs.", "/services-section-home-page/Software Application Development/Software Integration.png"),
      s("AI Chat Support", "Customer support interface and AI dashboard.", "/services-section-home-page/Software Application Development/AI Chat Support.png"),
    ],
  },
  {
    id: "03", title: "Web Design and Development", icon: Monitor,
    shortDesc: "Fast, responsive, and search-ready corporate websites.",
    cta: "Explore Web Development", link: "/services/web-development",
    subServices: [
      s("CMS Development", "Content management systems & headless architecture.", "/services-section-home-page/Web Design and Development/CMS Development.png"),
      s("Web Portal Development", "Enterprise client & partner web portal interfaces.", "/services-section-home-page/Web Design and Development/Web Portal Development.png"),
      s("Corporate Web Development", "High-performance brand & corporate websites.", "/services-section-home-page/Web Design and Development/Corporate Web Development.png"),
      s("React.js Development", "Interactive, scalable frontend user experiences.", "/services-section-home-page/Web Design and Development/React.js Development.png"),
      s("Next.js Development", "Server-side rendered and dynamic React web apps.", "/services-section-home-page/Web Design and Development/Next.js Development.png"),
      s("Angular Development", "Enterprise-grade scalable web applications.", "/services-section-home-page/Web Design and Development/Angular Development.png"),
      s("Node.js Development", "High-throughput server runtimes and API engines.", "/services-section-home-page/Web Design and Development/Node.js Development.png"),
      s("Laravel Development", "Robust and secure PHP enterprise web applications.", "/services-section-home-page/Web Design and Development/Laravel Development.png"),
      s("PHP Development", "Dynamic backend systems and custom web engineering.", "/services-section-home-page/Web Design and Development/PHP Development.png"),
    ],
  },
  {
    id: "04", title: "E-commerce Solutions", icon: ShoppingCart,
    shortDesc: "Online stores and shopping experiences designed to convert.",
    cta: "Explore E-commerce Solutions", link: "/services/ecommerce",
    subServices: [
      s("Custom eCommerce Solutions", "Tailored enterprise-grade commerce platforms.", "/services-section-home-page/E-commerce Solutions/Custom eCommerce Solutions.png"),
      s("Shopify Development Solutions", "Bespoke Shopify store design and development.", "/services-section-home-page/E-commerce Solutions/Shopify Development Solutions.png"),
      s("WooCommerce Development Solutions", "Scalable WordPress-based e-commerce stores.", "/services-section-home-page/E-commerce Solutions/WooCommerce Development Solutions.png"),
      s("BigCommerce Development Solutions", "High-volume scalable enterprise storefronts.", "/services-section-home-page/E-commerce Solutions/BigCommerce Development Solutions.png"),
    ],
  },
  {
    id: "05", title: "Digital Marketing Solutions", icon: Megaphone,
    shortDesc: "Analytics, campaign dashboards, and search performance.",
    cta: "Explore Digital Marketing", link: "/services/digital-marketing",
    subServices: [
      s("AEO", "AI conversational answer discovery & AI citations.", "/services-images-set2/aeo.png"),
      s("GEO", "Generative AI & LLM algorithm data optimization.", "/services-images-set2/image.png"),
      s("AI SEO", "Modern SEO telemetry & search ranking analytics.", "/services-images-set2/Ai.png"),
      s("Social Media Marketing", "Mobile social media ecosystem & community engagement.", "/services-images-set2/digital-marketing.png"),
      s("(PPC) Paid Advertising", "Precision ad clicks, conversions & ROAS tracking.", "/services-images-set2/ppc.png"),
      s("Email Marketing", "Automated newsletter workflows & email marketing analytics.", "/services-images-set2/email-marketing.png"),
      s("WhatsApp Marketing", "Direct mobile WhatsApp chat commerce & conversation.", "/services-images-set2/whatapp-marketing.png"),
      s("SMS Marketing", "Instant mobile text notifications & promotional alerts.", "/services-images-set2/sms.png"),
      s("Content Marketing", "High-authority thought leadership copywriting & article drafting.", "/services-images-set2/content.png"),
      s("Video Marketing", "High-definition video camera & cinema production.", "/services-images-set2/video.png"),
      s("White Hat SEO Services", "Technical search engine optimization & organic audit screens.", "/services-images-set2/white-hat-seo.png"),
      s("Link Building Services", "Interconnected network nodes & domain authority web.", "/services-images-set2/link.png"),
      s("ORM (Online Reputation Management)", "5-star customer review ratings & trust feedback.", "/services-images-set2/orm.png"),
    ],
  },
  {
    id: "06", title: "Creative Solutions", icon: Palette,
    shortDesc: "Branding, graphic design, and digital creative work.",
    cta: "Explore Creative Solutions", link: "/services/creative",
    subServices: [
      s("UI/UX Design Services", "Human-centric user journeys and intuitive interfaces.", "/services-set3/uiux.png"),
      s("Custom Logo Design", "Distinctive, memorable corporate brand identities.", "/services-set3/logo.png"),
      s("Creative Video Production", "High-definition brand commercials and promo videos.", "/services-set3/video.png"),
      s("User Manual Development", "Comprehensive technical documentation and guides.", "/services-set3/user-management.png"),
      s("Product Design and Prototyping", "End-to-end digital and physical product UX design.", "/services-set3/product-design.png"),
      s("Social Media Creative Design", "Eye-catching social graphics and digital assets.", "/services-set3/social-media.png"),
    ],
  },
  {
    id: "07", title: "Back Office Support", icon: Headphones,
    shortDesc: "Operations dashboards and business management interfaces.",
    cta: "Explore Back Office Support", link: "/services/back-office",
    subServices: [
      s("E-commerce Website Maintenance", "Ongoing updates and performance checks.", "/services-set4/E-commerce Website Maintenance.png"),
      s("24/7 Support", "Round-the-clock technical assistance.", "/services-set4/support.png"),
      s("Technical Maintenance and Security", "Proactive defense and patches.", "/services-set4/tech-management.png"),
      s("Order and Backend Management", "Streamlined operational logistics.", "/services-set4/order-mangement.png"),
    ],
  },
];

const AUTOPLAY_MS = 10000;

export default function ServicesSection() {
  const reduceMotion = useReducedMotion();
  const [serviceIdx, setServiceIdx] = useState(0);
  const [subIdx, setSubIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  const service = servicesData[serviceIdx] || servicesData[0];
  const total = service.subServices.length;
  const currentSubIdx = subIdx < total ? subIdx : 0;
  const sub = service.subServices[currentSubIdx];
  const autoplay = !paused && !reduceMotion && total > 1;

  // Changing service resets the sub-service in the same update (no flash of stale state)
  const selectService = useCallback((i) => {
    setServiceIdx(i);
    setSubIdx(0);
  }, []);
  const next = useCallback(() => {
    setSubIdx((p) => (p + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setSubIdx((p) => (p - 1 + total) % total);
  }, [total]);

  // Autoplay: restarts whenever the slide changes (manual or automatic)
  useEffect(() => {
    if (!autoplay) return;
    const t = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [autoplay, serviceIdx, currentSubIdx, next]);

  // Preload the next image so the crossfade never shows a blank frame
  useEffect(() => {
    if (service && service.subServices && total > 0) {
      const img = new Image();
      img.src = service.subServices[(currentSubIdx + 1) % total].img;
    }
  }, [service, currentSubIdx, total]);

  return (
    <section
      className="relative w-full overflow-hidden bg-[#07130f] py-5 sm:py-6 lg:py-8"
      style={{ fontFamily: "Poppins, sans-serif" }}
      aria-labelledby="services-heading"
    >
      <PhotoBackdrop src={BG_SERVICES} fallback={BG_SERVICES_FALLBACK} />

      {/* Ambient glow – static for reduced-motion users */}
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -24, 0], opacity: [0.08, 0.12, 0.08] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-[10%] -top-[30%] h-[700px] w-[700px] rounded-full bg-[#E8890C] opacity-10 blur-[140px] mix-blend-screen"
      />
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, 30, 0], opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="pointer-events-none absolute -bottom-[25%] -left-[15%] h-[600px] w-[600px] rounded-full bg-[#1F6B4F] opacity-5 blur-[160px] mix-blend-screen"
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Heading */}
        <div className="mb-4 flex flex-wrap items-end justify-between gap-x-6 gap-y-1 lg:mb-5">
          <div>
            {/* Tag: gold text + short gold underline */}
            <div className="mb-2.5 flex flex-col items-start">
              <span className="text-xs sm:text-sm lg:text-base font-bold uppercase tracking-[0.2em] text-[#E8890C]">
                Our Services
              </span>
              <span className="mt-2 block h-[3px] w-10 sm:w-12 lg:w-14 rounded-full bg-[#E8890C]" />
            </div>
            <h2 id="services-heading" className="text-xl font-bold leading-tight text-white sm:text-2xl lg:text-[28px]">
              Digital solutions for every stage of growth
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:gap-8 xl:gap-12">
          {/* LEFT: service navigation – hidden on mobile view (320px), visible on tablet and desktop */}
          <div className="hidden sm:block w-full lg:w-[40%]">
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
                    className={`group relative flex shrink-0 items-center overflow-hidden rounded-[10px] border px-4 py-2.5 text-left transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8890C] lg:w-full lg:px-5 lg:py-3 ${
                      active
                        ? "border-white/25 bg-white/10 backdrop-blur-xl"
                        : "border-white/10 hover:bg-white/[0.05] lg:border-transparent"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute left-0 top-0 hidden h-full w-1.5 bg-[#E8890C] lg:block"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    {/* Icon: always gold */}
                    <Icon
                      strokeWidth={active ? 2.5 : 2}
                      className="mr-3 h-5 w-5 shrink-0 text-[#E8890C]"
                    />
                    {/* Text: always white */}
                    <span className="whitespace-nowrap text-[13px] font-semibold text-white sm:text-sm lg:flex-1 lg:whitespace-normal lg:text-[15px]">
                      {item.title}
                    </span>
                    <ChevronRight
                      strokeWidth={active ? 3 : 2.5}
                      className={`ml-2 hidden h-4 w-4 shrink-0 transition-transform lg:block ${
                        active ? "translate-x-1 text-[#E8890C]" : "text-white/40 group-hover:translate-x-1 group-hover:text-[#E8890C]"
                      }`}
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
              className="group relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-[#091512] shadow-[0_24px_50px_rgba(0,0,0,0.5)]" style={{ aspectRatio: "903/590", minHeight: "260px" }}
            >
              <AnimatePresence>
                <motion.img
                  key={`${service.id}-${currentSubIdx}`}
                  src={sub.img}
                  alt={sub.title}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800";
                  }}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.7, ease: "easeInOut" }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>

              {/* Category badge */}
              <div className="absolute left-3.5 top-3.5 z-20 sm:left-6 sm:top-6">
                <button
                  type="button"
                  onClick={() => selectService((serviceIdx + 1) % servicesData.length)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 sm:px-4 sm:py-2 text-[9px] sm:text-xs font-extrabold uppercase tracking-[0.18em] text-[#0F3D2E] shadow-md backdrop-blur-md transition hover:bg-white active:scale-95"
                  title="Switch category"
                >
                  <span>{service.title}</span>
                  <ChevronRight className="h-3 w-3 text-[#E8890C] sm:hidden" />
                </button>
              </div>

              {/* Prev / next */}
              {total > 1 && (
                <div className="absolute right-3.5 top-3.5 z-20 flex gap-1.5 sm:gap-2 sm:right-6 sm:top-6">
                  {[["Previous", prev, ChevronLeft], ["Next", next, ChevronRight]].map(([label, fn, Ico]) => (
                    <button
                      key={label}
                      onClick={fn}
                      aria-label={`${label} service`}
                      className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-md transition hover:border-[#E8890C] hover:bg-[#E8890C] hover:text-[#0F3D2E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8890C]"
                    >
                      <Ico className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </button>
                  ))}
                </div>
              )}

              {/* Bottom content */}
              <div className="absolute inset-x-3.5 bottom-3.5 z-20 sm:inset-x-6 sm:bottom-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${service.id}-${currentSubIdx}-txt`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: reduceMotion ? 0 : 0.3 }}
                  >
                    <div className="flex max-w-full items-center gap-2 sm:gap-3 self-start rounded-full bg-white/95 backdrop-blur-md p-1 sm:p-1.5 pr-3.5 sm:pr-5 shadow-lg sm:inline-flex">
                      <span className="flex h-7 w-7 sm:h-9 sm:w-9 md:h-11 md:w-11 shrink-0 items-center justify-center rounded-full bg-[#f4f1ea]">
                        <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 text-[#E8890C]" strokeWidth={2.5} />
                      </span>
                      <h3 className="truncate text-xs sm:text-sm md:text-lg font-extrabold tracking-tight text-[#0F3D2E]">{sub.title}</h3>
                    </div>
                    <p className="mt-1.5 sm:mt-2 max-w-md text-xs sm:text-[13px] md:text-sm line-clamp-2 leading-snug text-white font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">{sub.desc}</p>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-2.5 sm:mt-3 flex items-center justify-between gap-2">
                  <Link
                    to={service.link}
                    className="inline-flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-[10px] bg-[#E8890C] px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-[13px] font-bold text-[#0F3D2E] shadow-md transition hover:bg-[#E8890C]/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white whitespace-nowrap"
                  >
                    <span>{service.cta}</span>
                    <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Link>

                  {/* Progress dots – click to jump */}
                  <div className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/25 bg-black/40 px-2 sm:px-3 py-1 sm:py-1.5 backdrop-blur-md flex-shrink-0">
                    <div className="flex gap-1">
                      {service.subServices.map((item, i) => (
                        <button
                          key={item.title}
                          onClick={() => setSubIdx(i)}
                          aria-label={`Show ${item.title}`}
                          className="relative h-1.5 w-2.5 sm:w-3 overflow-hidden rounded-full bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:w-4"
                        >
                          {i < currentSubIdx && <span className="absolute inset-0 bg-[#E8890C]/50" />}
                          {i === currentSubIdx &&
                            (autoplay ? (
                              <span
                                key={`${serviceIdx}-${currentSubIdx}`}
                                className="svc-fill absolute inset-y-0 left-0 bg-[#E8890C]"
                                style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
                              />
                            ) : (
                              <span className="absolute inset-0 bg-[#E8890C]" />
                            ))}
                        </button>
                      ))}
                    </div>
                    <span className="whitespace-nowrap text-[9px] sm:text-[10px] font-bold tracking-wider text-white">
                      {String(currentSubIdx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
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