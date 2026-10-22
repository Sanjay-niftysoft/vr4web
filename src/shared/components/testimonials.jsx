import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin } from 'lucide-react';
import PageBanner from '../../components/common/PageBanner';
import CtaSection from '../../components/CtaSection';

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// NOTE: These are PLACEHOLDER testimonials. Replace every name, company and quote
// with real client feedback (with their permission) before going live.
// ─────────────────────────────────────────────────────────────────────────────

const CATEGORIES = ['All', 'Web & Software', 'Email & IT', 'Digital Marketing'];

const TESTIMONIALS = [
  {
    id: 't1',
    quote:
      'Our old website was slow and hard to update. The team rebuilt it as a fast, mobile-friendly site and trained our staff to manage it. Enquiries from the website have clearly gone up.',
    name: 'Daniel Brooks',
    role: 'Managing Director',
    company: 'Brooks Logistics',
    location: 'Melbourne, Australia',
    service: 'Niftysoft',
    category: 'Web & Software',
    accent: '#D7192D',
  },
  {
    id: 't2',
    quote:
      'We moved our company email over without losing a single message. Spam dropped sharply, and when we had a question, someone answered the same day.',
    name: 'Priya Raman',
    role: 'Operations Head',
    company: 'Raman Textiles',
    location: 'Chennai, India',
    service: 'Business Mail Solutions',
    category: 'Email & IT',
    accent: '#0B4F9C',
  },
  {
    id: 't3',
    quote:
      'Lead SEO fixed the technical problems on our site and focused on keywords our buyers actually use. We now get steady enquiries from search without paying for every click.',
    name: 'Sophie Williams',
    role: 'Marketing Manager',
    company: 'Harbour Dental Group',
    location: 'Auckland, New Zealand',
    service: 'Lead SEO',
    category: 'Digital Marketing',
    accent: '#102342',
  },
  {
    id: 't4',
    quote:
      'Network Care monitors our servers around the clock. Last winter they caught a failing disk before it caused any downtime, and we never noticed a problem.',
    name: 'James Carter',
    role: 'IT Director',
    company: 'Carter & Moore Solicitors',
    location: 'Manchester, United Kingdom',
    service: 'Network Care',
    category: 'Email & IT',
    accent: '#D7192D',
  },
  {
    id: 't5',
    quote:
      'We were a small startup with a small budget. Low Cost Web Design delivered a clean, professional site in two weeks and explained every step in plain language.',
    name: 'Arjun Mehta',
    role: 'Founder',
    company: 'Greenleaf Organics',
    location: 'Bengaluru, India',
    service: 'Low Cost Web Design',
    category: 'Web & Software',
    accent: '#0B4F9C',
  },
  {
    id: 't6',
    quote:
      'Their social media team understood our brand quickly. The short videos they produce get shared far more than anything we made ourselves.',
    name: 'Emily Johnson',
    role: 'Brand Lead',
    company: 'Northwind Fitness',
    location: 'Austin, United States',
    service: 'SMM Consult',
    category: 'Digital Marketing',
    accent: '#102342',
  },
  {
    id: 't7',
    quote:
      'A handful of unfair reviews were hurting us. ORM Consult responded to them professionally and helped us gather real feedback from happy customers.',
    name: 'Rahul Nair',
    role: 'Owner',
    company: 'Coastline Resorts',
    location: 'Kochi, India',
    service: 'ORM Consult',
    category: 'Digital Marketing',
    accent: '#D7192D',
  },
  {
    id: 't8',
    quote:
      'The live chat agents sound like part of our own team. Customers get answers at night and on weekends, and our inbox is much calmer.',
    name: 'Olivia Thompson',
    role: 'Customer Service Lead',
    company: 'Bluebird Travel',
    location: 'Sydney, Australia',
    service: 'Chat Support',
    category: 'Digital Marketing',
    accent: '#0B4F9C',
  },
  {
    id: 't9',
    quote:
      'They built our customer portal on time and walked us through each stage. When we asked for changes late in the project, they handled them without fuss.',
    name: 'Michael Reed',
    role: 'CTO',
    company: 'Reed Financial Services',
    location: 'London, United Kingdom',
    service: 'Niftysoft',
    category: 'Web & Software',
    accent: '#102342',
  },
];


const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const initials = (name) =>
  name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('');

// ─────────────────────────────────────────────────────────────────────────────
// SHARED PIECES
// ─────────────────────────────────────────────────────────────────────────────

function SectionHeading({ title, sub, text, light = false }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={stagger}
      className="max-w-[780px] mb-8 sm:mb-10 mx-auto text-center"
    >
      <motion.h2
        variants={fadeInUp}
        className={`text-4xl sm:text-5xl lg:text-[56px] font-black tracking-tight leading-[1.05] ${
          light ? 'text-white' : 'text-[#102448]'
        }`}
      >
        {title}
      </motion.h2>
      <motion.div
        variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.7, ease: 'easeOut' } } }}
        style={{ originX: 0.5 }}
        className="h-1 w-24 bg-[#D7192D] rounded-full mt-4 mx-auto"
      />
      <motion.p
        variants={fadeInUp}
        className="mt-5 text-lg sm:text-xl font-bold text-[#D7192D]"
      >
        {sub}
      </motion.p>
      <motion.p
        variants={fadeInUp}
        className={`mt-2 text-sm sm:text-base leading-relaxed max-w-[640px] mx-auto ${
          light ? 'text-white' : 'text-black'
        }`}
      >
        {text}
      </motion.p>
    </motion.div>
  );
}

function Stars({ count = 5, className = 'w-4 h-4' }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className={`${className} fill-[#F5B301] text-[#F5B301]`} />
      ))}
    </div>
  );
}

function Avatar({ name, accent, size = 'w-12 h-12 text-base' }) {
  return (
    <span
      className={`${size} flex-shrink-0 rounded-full flex items-center justify-center font-black text-white`}
      style={{ backgroundColor: accent }}
      aria-hidden
    >
      {initials(name)}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 01 — TESTIMONIAL WALL (filterable grid, light section)
// ─────────────────────────────────────────────────────────────────────────────

function TestimonialCard({ item }) {
  return (
    <motion.article
      variants={fadeInUp}
      className="flex flex-col rounded-[10px] bg-white border border-[#E5EBF2] p-6 shadow-[0_14px_32px_-20px_rgba(15,23,42,0.25)] hover:shadow-[0_22px_44px_-18px_rgba(15,23,42,0.3)] transition-shadow duration-300"
    >
      <div className="flex items-center justify-between gap-3">
        <Stars />
        <span className="rounded-[10px] bg-[#EEF4FB] px-3 py-1.5 text-xs font-extrabold text-[#0B4F9C] text-right">
          {item.service}
        </span>
      </div>

      <p className="mt-4 flex-1 text-[15px] leading-relaxed text-black">{item.quote}</p>

      <div className="mt-6 pt-5 border-t border-slate-200 flex items-center gap-3">
        <Avatar name={item.name} accent={item.accent} />
        <div className="min-w-0">
          <p className="text-sm font-black text-[#102448] truncate">{item.name}</p>
          <p className="text-xs text-black truncate">
            {item.role}, {item.company}
          </p>
          <p className="mt-0.5 inline-flex items-center gap-1 text-xs font-semibold text-black">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{item.location}</span>
          </p>
        </div>
      </div>
    </motion.article>
  );
}

function TestimonialWall() {
  const [filter, setFilter] = useState('All');
  const items = filter === 'All' ? TESTIMONIALS : TESTIMONIALS.filter((t) => t.category === filter);

  return (
    <section className="relative w-full bg-[#F8FAFC] py-12 lg:py-16 overflow-hidden">
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="What Our Clients Say"
          sub="Real results. Real relationships."
          text="Businesses across Australia, New Zealand, the UK, the US and India trust our brands and partners. Filter by service to see how we have helped businesses like yours."
        />

        <div
          role="tablist"
          aria-label="Filter testimonials"
          className="flex gap-2.5 overflow-x-auto pb-4 mb-6 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] justify-start lg:justify-center"
        >
          {CATEGORIES.map((c) => {
            const isActive = c === filter;
            return (
              <button
                key={c}
                role="tab"
                aria-selected={isActive}
                onClick={() => setFilter(c)}
                className={`px-5 py-2.5 rounded-[10px] font-bold text-sm whitespace-nowrap transition-colors duration-300 outline-none focus-visible:ring-4 focus-visible:ring-[#D7192D]/30 ${
                  isActive
                    ? 'bg-[#D7192D] text-white'
                    : 'bg-white text-[#102448] border border-slate-200 hover:border-[#D7192D]/50'
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        <motion.div
          key={filter}
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
        >
          {items.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE  (hero + testimonials + CTA)
// ─────────────────────────────────────────────────────────────────────────────

export default function Testimonials() {
  return (
    <div className="w-full min-h-screen bg-white font-sans text-[#102448] selection:bg-[#D7192D] selection:text-white">
      <PageBanner
        title="Client Testimonials"
        breadcrumbs={[{ label: 'Testimonials' }]}
        bgImage="/banner/3.jpg"
        className="!mb-0 lg:!mb-0"
      />

      <TestimonialWall />

      <div className="[&>*]:!py-6 lg:[&>*]:!py-8 [&>*]:!my-0">
        <CtaSection />
      </div>
    </div>
  );
}