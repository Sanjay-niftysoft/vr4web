import PageBanner from './common/PageBanner';

import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------
 VR4WEB — About Us
 React + Tailwind. Fonts: Playfair Display (headings) + Lato (body).
 Palette taken from the live site: sky blue, coral, white + deep navy.
 Tailwind needs no extra config (arbitrary values are used).
------------------------------------------------------------------- */

const C = { blue: "#0B4F9C", coral: "#F97316", navy: "#0B4F9C", ice: "#FFFFFF" };

// TODO: add only VERIFIED numbers here, e.g. { value: 120, suffix: "+", label: "Websites delivered" }
const METRICS = [];

// TODO: replace with real, verified milestones (years / events)
const MILESTONES = [
 { t: "The start", d: "VR4WEB began as a small web design studio with one promise: websites that bring in real enquiries." },
 { t: "Growing the craft", d: "We added e-commerce, CMS builds and search-friendly development for clients across the globe." },
 { t: "Apps and marketing", d: "Android, iOS and hybrid apps joined SEO, social and content marketing under one roof." },
];

const IMG = {
 hero: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
 story: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
 team: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=2000&q=80",
};

const INDUSTRIES = [
 { n: "Retail and eCommerce", p: "Shopping carts, catalogues, payment flows.", i: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80" },
 { n: "Small business", p: "Fast, credible sites that win local search.", i: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" },
 { n: "Corporate", p: "Brand-led sites with clear enquiry paths.", i: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" },
 { n: "Education", p: "Portals, course pages and admissions forms.", i: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80" },
 { n: "Healthcare", p: "Clear information and easy appointment requests.", i: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80" },
];

/* ---------- helpers ---------- */
function useInView(once = true) {
 const ref = useRef(null);
 const [seen, setSeen] = useState(false);
 useEffect(() => {
 const io = new IntersectionObserver(([e]) => {
 if (e.isIntersecting) { setSeen(true); if (once) io.disconnect(); }
 }, { threshold: 0.2 });
 ref.current && io.observe(ref.current);
 return () => io.disconnect();
 }, [once]);
 return [ref, seen];
}

function Img({ src, className = "", alt = "" }) {
 const [bad, setBad] = useState(false);
 return bad ? (
 <div className={className} style={{ background: `linear-gradient(135deg,${C.blue},${C.navy})` }} />
 ) : (
 <img src={src} alt={alt} loading="lazy" onError={() => setBad(true)} className={`object-cover ${className}`} />
 );
}

/* 3D tilt card with moving glare */
function Tilt({ children, className = "", max = 12 }) {
 const ref = useRef(null);
 const move = (e) => {
 const el = ref.current, r = el.getBoundingClientRect();
 const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
 el.style.transform = `perspective(900px) rotateY(${(x - 0.5) * max * 2}deg) rotateX(${(0.5 - y) * max * 2}deg) translateZ(10px)`;
 el.style.setProperty("--gx", `${x * 100}%`);
 el.style.setProperty("--gy", `${y * 100}%`);
 };
 const leave = () => { ref.current.style.transform = "perspective(900px) rotateX(0) rotateY(0)"; };
 return (
 <div ref={ref} onMouseMove={move} onMouseLeave={leave}
 className={`tilt relative transition-transform duration-200 ease-out [transform-style:preserve-3d] ${className}`}>
 {children}
 <span className="glare pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300" />
 </div>
 );
}

function Counter({ to, suffix = "" }) {
 const [ref, seen] = useInView();
 const [v, setV] = useState(0);
 useEffect(() => {
 if (!seen) return;
 let s; const f = (t) => { s ??= t; const p = Math.min((t - s) / 1400, 1); setV(Math.round(to * (1 - Math.pow(1 - p, 3)))); p < 1 && requestAnimationFrame(f); };
 requestAnimationFrame(f);
 }, [seen, to]);
 return <span ref={ref}>{v}{suffix}</span>;
}

/* ---------- 01 HERO ---------- */
function Hero() {
 const [p, setP] = useState({ x: 0, y: 0 });
 const onMove = (e) => {
 const r = e.currentTarget.getBoundingClientRect();
 setP({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
 };
 const layer = (z) => ({ transform: `translate3d(${p.x * z}px,${p.y * z}px,0)` });
 return (
 <section onMouseMove={onMove} className="relative overflow-hidden bg-[#0B4F9C] text-white">
 <div className="orb absolute -left-24 top-10 h-96 w-96 rounded-full bg-[#0B4F9C]/40 blur-3xl" />
 <div className="orb2 absolute right-0 bottom-0 h-80 w-80 rounded-full bg-[#F97316]/30 blur-3xl" />
 <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 lg:grid-cols-2 lg:py-28">
 <div>
 <nav className="mb-8 flex items-center gap-2 text-sm text-white/70">
 <a href="/" className="hover:text-white">Home</a><span>/</span><span className="text-white">About</span>
 </nav>
 <h1 className="font-sans text-5xl font-black leading-[1.05] sm:text-6xl xl:text-7xl">
 Empowering Businesses Through <span className="shimmer italic">Innovative Technology</span>
 </h1>
 <p className="mt-6 max-w-xl font-sans text-lg leading-relaxed text-white/80">
 VR4WEB designs and builds websites, e-commerce stores and mobile apps — then helps people find them through search and digital marketing.
 </p>
 <div className="mt-9 flex flex-wrap items-center gap-5">
 <a href="#contact" className="btn-glow rounded-full bg-[#F97316] px-8 py-3.5 font-sans font-semibold text-white">Start a project</a>
 <a href="#story" className="group flex items-center gap-2 font-sans text-white/80 hover:text-white">
 Our story <span className="inline-block animate-bounce">↓</span>
 </a>
 </div>
 </div>

 {/* layered 3D visual */}
 <div className="relative mx-auto h-[420px] w-full max-w-lg [perspective:1000px]">
 <div style={layer(-30)} className="absolute inset-6 rotate-6 rounded-3xl border border-white/20 bg-white/5 transition-transform duration-150" />
 <div style={layer(-14)} className="absolute inset-3 -rotate-3 rounded-3xl bg-[#0B4F9C] ] transition-transform duration-150" />
 <div style={layer(8)} className="absolute inset-0 overflow-hidden rounded-3xl shadow-2xl shadow-black/50 transition-transform duration-150">
 <Img src={IMG.hero} alt="Code on a screen" className="h-full w-full" />
 <div className="absolute inset-0 bg-[#0B4F9C]/80 " />
 </div>
 <div style={layer(40)} className="float absolute -left-6 bottom-12 rounded-2xl bg-white px-5 py-4 font-sans text-[#0B4F9C] shadow-xl">
 <div className="text-xs text-[#111111] font-medium">Built for</div><div className="font-bold">Search & speed</div>
 </div>
 <div style={layer(55)} className="float2 absolute -right-4 top-10 rounded-2xl bg-[#F97316] px-5 py-4 font-sans font-bold text-white shadow-xl">
 Web · App · SEO
 </div>
 </div>
 </div>
 <div className="relative overflow-hidden border-t border-white/10 py-4">
 <div className="marquee flex w-max gap-12 font-sans text-xl italic text-white/50">
 {Array.from({ length: 2 }).flatMap((_, k) =>
 ["Website design", "eCommerce", "Mobile apps", "SEO", "Social media", "Content marketing", "CMS"].map((t) => <span key={t + k}>{t}</span>)
 )}
 </div>
 </div>
 </section>
 );
}

/* ---------- 02 STORY ---------- */
function Story() {
 return (
 <section id="story" className="bg-white py-12 md:py-16">
 <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-12">
 <Reveal className="lg:col-span-6">
 <Tilt max={6} className="rounded-[2rem]">
 <div className="relative">
 <div className="absolute -bottom-5 -right-5 h-full w-full rounded-[2rem] bg-[#F97316]/90" />
 <Img src={IMG.story} alt="Team collaborating" className="relative h-[520px] w-full rounded-[2rem]" />
 </div>
 </Tilt>
 </Reveal>
 <Reveal className="lg:col-span-6">
 <h2 className="font-sans text-4xl font-bold leading-tight text-[#0B4F9C] md:text-5xl">A small studio with a simple belief: success lies in excellence.</h2>
 <p className="mt-6 font-sans text-lg leading-relaxed text-[#111111] font-normal">
 We are a digital agency with a team of developers who work tirelessly to deliver the results you set out for. From the first sketch to the final launch, we build custom designs that fit your business and your budget.
 </p>
 <ol className="mt-10 space-y-6 border-l-2 border-[#0B4F9C]/20 pl-8">
 {MILESTONES.map((m, i) => (
 <li key={i} className="relative">
 <span className="absolute -left-[41px] top-1.5 h-4 w-4 rounded-full border-4 border-white bg-[#0B4F9C] ring-2 ring-[#0B4F9C]/30" />
 <h3 className="font-sans text-xl font-bold text-[#0B4F9C]">{m.t}</h3>
 <p className="font-sans text-[#111111] font-normal">{m.d}</p>
 </li>
 ))}
 </ol>
 </Reveal>
 </div>
 </section>
 );
}

function Reveal({ children, className = "" }) {
 const [ref, seen] = useInView();
 return (
 <div ref={ref} className={`transition-all duration-1000 ease-out ${seen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"} ${className}`}>
 {children}
 </div>
 );
}

/* ---------- 03 VISION & MISSION ---------- */
function VisionMission() {
 return (
 <section className="grid min-h-[70vh] md:grid-cols-2">
 {[
 { k: "Vision", t: "A web where every business can be found, trusted and chosen.", bg: "bg-[#0B4F9C]", fg: "text-white", s: "We want quality design and technology to be within reach of every business, not only the biggest." },
 { k: "Mission", t: "Deliver custom, search-friendly solutions on time and with care.", bg: "bg-[#F97316]", fg: "text-white", s: "One dedicated point of contact, honest pricing, and results you can measure in enquiries and revenue." },
 ].map((b) => (
 <div key={b.k} className={`group relative flex flex-col justify-center overflow-hidden px-8 py-12 md:py-16 md:px-16 ${b.bg} ${b.fg}`}>
 <span className="pointer-events-none absolute -right-6 -top-10 select-none font-sans text-[14rem] font-black leading-none text-white/10 transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-6">{b.k[0]}</span>
 <h2 className="font-sans text-2xl italic text-white/80">Our {b.k}</h2>
 <p className="mt-4 max-w-xl font-sans text-4xl font-black leading-[1.1] lg:text-5xl">{b.t}</p>
 <p className="mt-6 max-w-md font-sans text-lg text-white/85">{b.s}</p>
 </div>
 ))}
 </section>
 );
}

/* ---------- 04 WHAT WE DO ---------- */
const Ill = {
 web: (
 <svg viewBox="0 0 200 140" className="w-full">
 <rect x="10" y="10" width="180" height="120" rx="10" fill="#fff" opacity=".95" />
 <rect x="10" y="10" width="180" height="20" rx="10" fill="#0B4F9C" />
 {[22, 34, 46].map((x, i) => <circle key={x} cx={x} cy="20" r="3" fill={[C.coral, "#ffc857", "#5bd38b"][i]} />)}
 <rect className="bar" x="24" y="44" width="90" height="10" rx="5" fill={C.blue} />
 <rect className="bar d1" x="24" y="62" width="140" height="8" rx="4" fill="#cfe6f5" />
 <rect className="bar d2" x="24" y="78" width="120" height="8" rx="4" fill="#cfe6f5" />
 <rect className="bar d3" x="24" y="98" width="50" height="18" rx="9" fill={C.coral} />
 </svg>
 ),
 app: (
 <svg viewBox="0 0 200 140" className="w-full">
 <rect x="70" y="4" width="60" height="132" rx="12" fill="#fff" />
 <rect x="76" y="16" width="48" height="108" rx="6" fill="#0B4F9C" />
 {[0, 1, 2].map((i) => <rect key={i} className={`bar d${i}`} x="82" y={24 + i * 28} width="36" height="20" rx="5" fill={[C.blue, C.coral, "#5bd38b"][i]} />)}
 <circle className="pulse" cx="150" cy="40" r="10" fill={C.coral} opacity=".8" />
 </svg>
 ),
 seo: (
 <svg viewBox="0 0 200 140" className="w-full">
 {[30, 55, 40, 80, 105].map((h, i) => <rect key={i} className={`grow d${i % 4}`} x={24 + i * 34} y={125 - h} width="22" height={h} rx="5" fill={i === 4 ? C.coral : "#fff"} />)}
 <path className="draw" d="M20 100 L58 80 L92 88 L130 52 L180 22" fill="none" stroke={C.coral} strokeWidth="4" strokeLinecap="round" />
 </svg>
 ),
};

function WhatWeDo() {
 const items = [
 { k: "web", t: "Web & eCommerce", d: "Business sites, corporate sites, CMS builds, shopping carts and web applications.", c: C.blue },
 { k: "app", t: "Web & Mobile Apps", d: "Android, iOS and hybrid apps designed around how your customers actually use them.", c: C.navy },
 { k: "seo", t: "SEO & Digital Marketing", d: "SEO, social media, PPC and content marketing that put your site in front of buyers.", c: C.coral },
 ];
 const [on, setOn] = useState(0);
 return (
 <section className="bg-[#FFFFFF] py-12 md:py-16">
 <div className="mx-auto max-w-7xl px-6">
 <h2 className="font-sans text-4xl font-bold text-[#0B4F9C] md:text-5xl">What We <span className="italic text-[#D37B5C]">Do</span></h2>
 <p className="mt-3 max-w-xl font-sans text-[#111111] font-normal">Hover or tap a panel to open it.</p>
 <div className="mt-12 flex h-auto flex-col gap-4 md:h-[440px] md:flex-row">
 {items.map((it, i) => (
 <button key={it.k} onMouseEnter={() => setOn(i)} onClick={() => setOn(i)} aria-expanded={on === i}
 style={{ background: it.c }}
 className={`relative overflow-hidden rounded-3xl p-8 text-left text-white transition-all duration-700 ease-[cubic-bezier(.7,0,.2,1)] md:flex-[1] ${on === i ? "md:flex-[3]" : "md:flex-[1]"}`}>
 <h3 className="font-sans text-3xl font-bold">{it.t}</h3>
 <div className={`mt-4 flex flex-col items-center gap-6 transition-all duration-700 md:flex-row ${on === i ? "opacity-100" : "opacity-0 md:opacity-0"} ${on === i ? "" : "max-h-0 overflow-hidden md:max-h-none"}`}>
 <p className="max-w-xs font-sans text-lg text-white/90">{it.d}</p>
 <div className="w-64 shrink-0">{Ill[it.k]}</div>
 </div>
 <span className="absolute bottom-4 right-6 font-sans text-7xl font-black text-white/10">{it.k === "web" ? "W" : it.k === "app" ? "A" : "S"}</span>
 </button>
 ))}
 </div>
 </div>
 </section>
 );
}

/* ---------- 05 WHY CHOOSE ---------- */
function Why() {
 const rows = [
 ["Client-focused solutions", "One dedicated point of contact and a design shaped around your goals — never a recycled template."],
 ["Responsive development", "Every page is built to load fast and look right on phones, tablets and desktops."],
 ["Search-friendly websites", "Pre-optimized structure, XML sitemaps for Google and Bing, and clean code from day one."],
 ];
 return (
 <section className="bg-white py-12 md:py-16">
 <div className="mx-auto max-w-6xl px-6">
 <h2 className="font-sans text-4xl font-bold text-[#0B4F9C] md:text-5xl">Why Choose <span className="italic text-[#D37B5C]">VR4WEB</span></h2>
 <div className="mt-12">
 {rows.map(([t, d], i) => (
 <Reveal key={t}>
 <div className="group grid items-center gap-4 border-t border-[#111111]/10 py-10 transition-colors duration-500 hover:bg-[#FFFFFF] md:grid-cols-[auto_1fr_1fr] md:gap-12 md:px-6">
 <span className="font-sans text-7xl font-black text-[#0B4F9C]/25 transition-all duration-500 group-hover:text-[#F97316] md:text-9xl">{i + 1}</span>
 <h3 className="font-sans text-3xl font-bold text-[#0B4F9C] transition-transform duration-500 group-hover:translate-x-2 md:text-4xl">{t}</h3>
 <p className="font-sans text-lg text-[#111111] font-normal">{d}</p>
 </div>
 </Reveal>
 ))}
 <div className="border-t border-[#111111]/10" />
 </div>
 </div>
 </section>
 );
}

/* ---------- 06 HOW WE WORK ---------- */
function Process() {
 const steps = [
 ["Discover", "We learn your business, audience and goals."],
 ["Plan", "Pages, features and timeline agreed up front."],
 ["Design", "Custom layouts you review and refine with us."],
 ["Develop", "Fast, responsive, search-ready code."],
 ["Launch & support", "Go live, then we stay on call."],
 ];
 const [ref, seen] = useInView();
 const [a, setA] = useState(0);
 return (
 <section ref={ref} className="overflow-hidden bg-[#0B4F9C] py-12 md:py-16 text-white">
 <div className="mx-auto max-w-7xl px-6">
 <h2 className="font-sans text-4xl font-bold md:text-5xl">How We <span className="italic text-[#D37B5C]">Work</span></h2>
 <div className="relative mt-16 hidden md:block">
 <svg viewBox="0 0 1000 160" className="w-full" fill="none">
 <path d="M40 90 C 180 -10, 260 190, 400 90 S 640 -10, 760 90 S 900 150, 960 80"
 stroke="#ffffff22" strokeWidth="4" strokeLinecap="round" />
 <path d="M40 90 C 180 -10, 260 190, 400 90 S 640 -10, 760 90 S 900 150, 960 80"
 stroke="url(#g)" strokeWidth="4" strokeLinecap="round" className={seen ? "flow" : ""} strokeDasharray="1400" strokeDashoffset={seen ? 0 : 1400} />
 <defs><linearGradient id="g"><stop offset="0" stopColor={C.blue} /><stop offset="1" stopColor={C.coral} /></linearGradient></defs>
 </svg>
 {[4, 24, 40, 62, 94].map((l, i) => (
 <button key={i} onClick={() => setA(i)} onMouseEnter={() => setA(i)} aria-label={steps[i][0]}
 style={{ left: `${l}%`, top: ["56%", "30%", "56%", "56%", "50%"][i] }}
 className={`absolute grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full font-sans text-lg font-bold transition-all duration-300 ${a === i ? "scale-125 bg-[#F97316] shadow-[0_0_0_10px_rgba(250,90,75,.25)]" : "bg-[#0B4F9C]"}`}>
 {i + 1}
 </button>
 ))}
 </div>
 <div className="mt-10 grid gap-6 md:mt-4 md:grid-cols-5">
 {steps.map(([t, d], i) => (
 <button key={t} onClick={() => setA(i)} className={`rounded-2xl border p-5 text-left transition-all duration-500 ${a === i ? "-translate-y-2 border-[#F97316] bg-white/10" : "border-white/10 bg-white/[.03]"}`}>
 <h3 className="font-sans text-xl font-bold">{t}</h3>
 <p className={`mt-2 font-sans text-sm text-white/70 transition-all duration-500 ${a === i ? "max-h-24 opacity-100" : "max-h-0 overflow-hidden opacity-0 md:max-h-24 md:opacity-60"}`}>{d}</p>
 </button>
 ))}
 </div>
 </div>
 </section>
 );
}

/* ---------- 07 PEOPLE ---------- */
function People() {
 return (
 <section className="relative">
 <div className="relative h-[70vh] min-h-[460px] overflow-hidden">
 <Img src={IMG.team} alt="The VR4WEB team at work" className="parallax h-[120%] w-full" />
 <div className="absolute inset-0 bg-[#0B4F9C] ]/40 " />
 <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-6 pb-14 text-white">
 <h2 className="max-w-3xl font-sans text-4xl font-black leading-tight md:text-6xl">Developers, designers and marketers in one room.</h2>
 </div>
 </div>
 <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 md:py-12 md:grid-cols-3">
 {[
 ["Technical expertise", "HTML and CMS builds, web applications, shopping carts, Android, iOS and hybrid apps."],
 ["Creative expertise", "Custom layouts and brand-enhancing visuals that look right on any screen."],
 ["How we collaborate", "Short feedback loops and a single contact who knows your project inside out."],
 ].map(([t, d]) => (
 <Reveal key={t}>
 <h3 className="border-b border-[#111111]/10 pb-3 font-sans text-2xl font-bold text-[#0B4F9C]">{t}</h3>
 <p className="mt-3 font-sans leading-relaxed text-[#111111] font-normal">{d}</p>
 </Reveal>
 ))}
 </div>
 </section>
 );
}

/* ---------- 08 INDUSTRIES & IMPACT ---------- */
function Industries() {
 return (
 <section className="bg-[#FFFFFF] py-12 md:py-16">
 <div className="mx-auto max-w-7xl px-6">
 <h2 className="font-sans text-4xl font-bold text-[#0B4F9C] md:text-5xl">Industries We <span className="italic text-[#D37B5C]">Serve</span></h2>
 <p className="mt-3 font-sans text-[#111111] font-normal">Scroll sideways to see more.</p>
 </div>
 <div className="no-bar mt-10 flex snap-x gap-8 overflow-x-auto px-6 pb-10 pt-4 md:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
 {INDUSTRIES.map((x) => (
 <Tilt key={x.n} className="w-72 shrink-0 snap-start rounded-3xl md:w-80">
 <div className="relative h-[400px] overflow-hidden rounded-3xl shadow-xl">
 <Img src={x.i} alt={x.n} className="h-full w-full transition-transform duration-700 hover:scale-110" />
 <div className="absolute inset-0 bg-[#0B4F9C] ]/30 " />
 <div className="absolute bottom-0 p-6 text-white [transform:translateZ(40px)]">
 <h3 className="font-sans text-2xl font-bold">{x.n}</h3>
 <p className="mt-1 font-sans text-sm text-white/80">{x.p}</p>
 </div>
 </div>
 </Tilt>
 ))}
 </div>
 {METRICS.length > 0 && (
 <div className="mx-auto mt-6 grid max-w-7xl gap-8 px-6 md:grid-cols-4">
 {METRICS.map((m) => (
 <div key={m.label} className="border-t-2 border-[#F97316] pt-4">
 <div className="font-sans text-6xl font-black text-[#0B4F9C]"><Counter to={m.value} suffix={m.suffix} /></div>
 <div className="font-sans text-[#111111] font-medium">{m.label}</div>
 </div>
 ))}
 </div>
 )}
 </section>
 );
}

/* ---------- 09 CTA ---------- */
function CTA() {
 return (
 <section id="contact" className="relative overflow-hidden bg-black py-16 md:py-20 text-white">
 <div className="orb absolute left-1/4 top-0 h-80 w-80 rounded-full bg-[#0B4F9C]/40 blur-3xl" />
 <div className="orb2 absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-[#F97316]/40 blur-3xl" />
 <div className="relative mx-auto max-w-5xl px-6 text-center">
 <h2 className="font-sans text-5xl font-black leading-[1.05] md:text-8xl">Let's Build Something <span className="italic text-[#D37B5C]">Together.</span></h2>
 <p className="mx-auto mt-6 max-w-xl font-sans text-lg text-white/75">Tell us about your project. We'll reply with a clear plan and a fair price.</p>
 <div className="mt-10 flex flex-wrap justify-center gap-4">
 <a href="/enquiry" className="btn-glow rounded-full bg-[#F97316] px-10 py-4 font-sans text-lg font-semibold">Discuss your project</a>
 <a href="tel:+919444116316" className="rounded-full border border-white/30 px-10 py-4 font-sans text-lg transition hover:bg-white hover:text-[#111111]">+91 94441 16316</a>
 </div>
 </div>
 </section>
 );
}

/* ---------- PAGE ---------- */
export default function AboutUs() {
 return (
 <main className="overflow-x-hidden bg-white font-sans">
 <style>{`
 @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');
 .shimmer{background:linear-gradient(90deg,#fff,#7fd0ff,#F97316,#fff);background-size:250% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:sh 6s linear infinite}
 @keyframes sh{to{background-position:-250% 0}}
 .orb{animation:orb 12s ease-in-out infinite alternate}.orb2{animation:orb 15s ease-in-out infinite alternate-reverse}
 @keyframes orb{to{transform:translate(60px,40px) scale(1.2)}}
 .float{animation:fl 5s ease-in-out infinite}.float2{animation:fl 6s ease-in-out infinite reverse}
 @keyframes fl{50%{margin-top:-14px}}
 .marquee{animation:mq 30s linear infinite}@keyframes mq{to{transform:translateX(-50%)}}
 .btn-glow{box-shadow:0 0 0 0 rgba(250,90,75,.6);animation:gl 2.4s infinite;transition:transform .2s}
 .btn-glow:hover{transform:translateY(-3px) scale(1.04)}
 @keyframes gl{70%{box-shadow:0 0 0 18px rgba(250,90,75,0)}100%{box-shadow:0 0 0 0 rgba(250,90,75,0)}}
 .tilt:hover .glare{opacity:1;background:radial-gradient(circle at var(--gx) var(--gy),rgba(255,255,255,.35),transparent 55%)}
 .bar{transform-origin:left;animation:bar 2.4s ease-in-out infinite alternate}
 .grow{transform-box:fill-box;transform-origin:bottom;animation:gr 2.4s ease-in-out infinite alternate}
 @keyframes bar{from{transform:scaleX(.4)}to{transform:scaleX(1)}}
 @keyframes gr{from{transform:scaleY(.4)}to{transform:scaleY(1)}}
 .d1{animation-delay:.3s}.d2{animation-delay:.6s}.d3{animation-delay:.9s}
 .pulse{animation:pu 1.6s infinite;transform-box:fill-box;transform-origin:center}@keyframes pu{50%{transform:scale(1.5);opacity:.3}}
 .draw{stroke-dasharray:300;animation:dr 3s ease-in-out infinite}@keyframes dr{from{stroke-dashoffset:300}60%,to{stroke-dashoffset:0}}
 .flow{transition:stroke-dashoffset 2.4s cubic-bezier(.6,0,.2,1)}
 .no-bar{scrollbar-width:none}.no-bar::-webkit-scrollbar{display:none}
 .parallax{animation:par linear both;animation-timeline:view();}
 @keyframes par{from{transform:translateY(0)}to{transform:translateY(-16%)}}
 @media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
 `}</style>
 <PageBanner 
 title="About Us" 
 breadcrumbs={[{ label: 'About Us' }]} 
 bgImage="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2560&h=600"
 className="!mb-0 lg:!mb-0"
 />

 <Story />
 <VisionMission />
 <WhatWeDo />
 <Why />
 <Process />
 <People />
 <Industries />
 <CTA />
 </main>
 );
}
