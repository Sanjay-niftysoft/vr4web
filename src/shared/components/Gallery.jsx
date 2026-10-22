import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageBanner from '../../components/common/PageBanner';
import CtaSection from '../../components/CtaSection';

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// All photos are PLACEHOLDERS (Unsplash) with NO people / faces.
// Swap `photo` for your own image URL or a file in /public (e.g. '/gallery/office.jpg').
// `category` must be one of CATEGORIES below.
// ─────────────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  'All',
  'Web Development',
  'App',
  'Marketing',
  'Digital Marketing',
  'Computer',
  'Office',
  'Other',
];

const GALLERY = [
  // ── First batch: visible on page load (one of each category) ──
  {
    id: 'g1',
    category: 'Web Development',
    title: 'Building for the Web',
    caption: 'Fast, mobile-first websites built with clean code.',
    photo: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
  },
  {
    id: 'g2',
    category: 'App',
    title: 'Mobile Apps',
    caption: 'Apps designed to feel simple and smooth on every phone.',
    photo: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c',
  },
  {
    id: 'g3',
    category: 'Marketing',
    title: 'Marketing That Performs',
    caption: 'Plans and reports that show what is working.',
    photo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
  },
  {
    id: 'g4',
    category: 'Digital Marketing',
    title: 'Data-Led Digital Marketing',
    caption: 'SEO, ads and analytics tracked in one place.',
    photo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
  },
  {
    id: 'g5',
    category: 'Computer',
    title: 'Powerful Workstations',
    caption: 'Reliable hardware set up for everyday business work.',
    photo: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3',
  },
  {
    id: 'g6',
    category: 'Office',
    title: 'Where Ideas Come Together',
    caption: 'A bright workspace built for planning and building.',
    photo: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2',
  },
  {
    id: 'g7',
    category: 'Other',
    title: 'Reliable Infrastructure',
    caption: 'Servers and networks monitored around the clock.',
    photo: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
  },

  // ── Second batch: appears when the user scrolls down ──
  {
    id: 'g8',
    category: 'Web Development',
    title: 'Clean, Modern Code',
    caption: 'Every project is built to be fast and easy to maintain.',
    photo: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
  },
  {
    id: 'g9',
    category: 'App',
    title: 'App Design',
    caption: 'Screens planned around how real people use them.',
    photo: 'https://images.unsplash.com/photo-1551650975-87deedd944c3',
  },
  {
    id: 'g10',
    category: 'Marketing',
    title: 'Campaign Planning',
    caption: 'Clear goals, clear numbers, clear next steps.',
    photo: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3',
  },
  {
    id: 'g11',
    category: 'Digital Marketing',
    title: 'Search and Social',
    caption: 'Growing traffic with search, social and email.',
    photo: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07',
  },
  {
    id: 'g12',
    category: 'Computer',
    title: 'Inside the Machine',
    caption: 'Hardware that keeps your business running.',
    photo: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
  },
  {
    id: 'g13',
    category: 'Office',
    title: 'A Space to Create',
    caption: 'An open workspace for creative and technical work.',
    photo: 'https://images.unsplash.com/photo-1497366216548-37526070297c',
  },
  {
    id: 'g14',
    category: 'Other',
    title: 'Security First',
    caption: 'Protecting data, systems and customers.',
    photo: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
  },

  // ── Third batch ──
  {
    id: 'g15',
    category: 'Web Development',
    title: 'Shipping Great Work',
    caption: 'From first sketch to launch day, we deliver.',
    photo: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
  },
  {
    id: 'g16',
    category: 'App',
    title: 'Built for Touch',
    caption: 'Fast, friendly apps for iOS and Android.',
    photo: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb',
  },
  {
    id: 'g17',
    category: 'Marketing',
    title: 'Brand and Growth',
    caption: 'Ideas that turn attention into customers.',
    photo: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312',
  },
  {
    id: 'g18',
    category: 'Digital Marketing',
    title: 'Content That Ranks',
    caption: 'Pages written and built to be found.',
    photo: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a',
  },
  {
    id: 'g19',
    category: 'Computer',
    title: 'Everyday Tech',
    caption: 'Laptops and desktops ready for work from day one.',
    photo: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45',
  },
  {
    id: 'g20',
    category: 'Office',
    title: 'Ready for the Day',
    caption: 'A clean, comfortable place to do our best work.',
    photo: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174',
  },
];

const BATCH = 7;

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const isUnsplash = (url) => url.includes('images.unsplash.com');
const unsplash = (url, w) => `${url}?auto=format&w=${w}&q=75`;

// ─────────────────────────────────────────────────────────────────────────────
// RESPONSIVE LAYOUT  (equal grid, every tile the same size, perfectly aligned)
//   320px  → 1 column      720px  → 2 columns     1024px → 3 columns
//   1440px → 4 columns     2560px → 5 columns, wider container, bigger text
// ─────────────────────────────────────────────────────────────────────────────

const CONTAINER =
  'relative z-10 mx-auto w-full px-4 min-[400px]:px-5 sm:px-6 lg:px-8 xl:px-10 ' +
  'max-w-[1280px] xl:max-w-[1360px] min-[1920px]:max-w-[1800px] min-[2400px]:max-w-[2100px]';

const GRID =
  'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-[2400px]:grid-cols-5 ' +
  'gap-3 min-[400px]:gap-4 lg:gap-5 min-[1920px]:gap-6 min-[2400px]:gap-8';

// ─────────────────────────────────────────────────────────────────────────────
// SECTION HEADING
// ─────────────────────────────────────────────────────────────────────────────

function SectionHeading({ title, sub, text }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={stagger}
      className="mx-auto mb-6 max-w-[780px] text-center sm:mb-8 min-[1920px]:mb-12 min-[1920px]:max-w-[1000px]"
    >
      <motion.h2
        variants={fadeInUp}
        className="text-[28px] min-[400px]:text-4xl sm:text-5xl lg:text-[56px] min-[1920px]:text-[72px] min-[2400px]:text-[84px] font-black tracking-tight leading-[1.05] text-[#102448]"
      >
        {title}
      </motion.h2>
      <motion.div
        variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.7, ease: 'easeOut' } } }}
        style={{ originX: 0.5 }}
        className="mx-auto mt-3 h-1 w-20 rounded-full bg-[#D7192D] sm:mt-4 sm:w-24 min-[1920px]:h-1.5 min-[1920px]:w-32"
      />
      <motion.p
        variants={fadeInUp}
        className="mt-4 text-base min-[400px]:text-lg sm:mt-5 sm:text-xl min-[1920px]:text-3xl min-[2400px]:text-4xl font-bold text-[#D7192D]"
      >
        {sub}
      </motion.p>
      <motion.p
        variants={fadeInUp}
        className="mx-auto mt-2 max-w-[640px] text-[13px] leading-relaxed text-black min-[400px]:text-sm sm:text-base min-[1920px]:max-w-[900px] min-[1920px]:text-xl min-[2400px]:text-2xl"
      >
        {text}
      </motion.p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FILTER TABS
// ─────────────────────────────────────────────────────────────────────────────

function FilterTabs({ active, onChange }) {
  return (
    <div
      role="tablist"
      aria-label="Gallery categories"
      className="mx-auto mb-6 flex flex-wrap justify-center gap-2 sm:mb-8 sm:gap-3 min-[1920px]:mb-12 min-[1920px]:gap-4"
    >
      {CATEGORIES.map((cat) => {
        const on = cat === active;
        return (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onChange(cat)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition-colors duration-300 sm:px-5 sm:py-2 sm:text-sm min-[1920px]:px-7 min-[1920px]:py-3 min-[1920px]:text-lg ${
              on
                ? 'border-[#D7192D] bg-[#D7192D] text-white'
                : 'border-slate-300 bg-white text-[#102448] hover:border-[#D7192D] hover:text-[#D7192D]'
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LAZY-LOADED IMAGE
// Fills its tile. Grey placeholder until the photo arrives, then fades in.
// ─────────────────────────────────────────────────────────────────────────────

function LazyImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const ref = useRef(null);

  // Handles images that finished loading before React attached the onLoad handler.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth > 0) setLoaded(true);
  }, []);

  const sizes =
    '(min-width: 2400px) 20vw, (min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw';

  const imgProps = isUnsplash(src)
    ? {
        src: unsplash(src, 800),
        srcSet: [400, 600, 800, 1000, 1400].map((w) => `${unsplash(src, w)} ${w}w`).join(', '),
        sizes,
      }
    : { src };

  return (
    <>
      <div
        aria-hidden
        className={`absolute inset-0 bg-gray-200 ${loaded || failed ? '' : 'animate-pulse'}`}
      />
      {!failed && (
        <img
          ref={ref}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-105 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          {...imgProps}
        />
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GALLERY TILE
// Every tile is the same 4:3 size. Hover: dark shade + text slide up
// (always visible on touch screens). Click / Enter: opens the big viewer.
// ─────────────────────────────────────────────────────────────────────────────

function GalleryTile({ item, onOpen }) {
  return (
    <motion.figure
      role="button"
      tabIndex={0}
      aria-label={`Open ${item.title}`}
      onClick={() => onOpen(item.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(item.id);
        }
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeInUp}
      className="group relative m-0 aspect-[4/3] w-full min-w-0 cursor-zoom-in overflow-hidden rounded-lg bg-gray-200 shadow-[0_14px_32px_-20px_rgba(15,23,42,0.35)] outline-none focus-visible:ring-2 focus-visible:ring-[#D7192D] min-[1920px]:rounded-xl"
    >
      <LazyImage src={item.photo} alt={item.title} />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent
                   opacity-0 transition-opacity duration-500
                   group-hover:opacity-100 group-focus-within:opacity-100 [@media(hover:none)]:opacity-100"
      />

      <figcaption
        className="pointer-events-none absolute inset-x-0 bottom-0 p-3 sm:p-4 lg:p-4 min-[1920px]:p-6
                   translate-y-4 opacity-0 transition-all duration-500
                   group-hover:translate-y-0 group-hover:opacity-100
                   group-focus-within:translate-y-0 group-focus-within:opacity-100
                   [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100"
      >
        <span className="mb-2 block h-1 w-8 rounded-full bg-[#D7192D] transition-all duration-500 group-hover:w-14 sm:w-10 min-[1920px]:h-1.5 min-[1920px]:w-14 min-[1920px]:group-hover:w-24" />
        <h3 className="text-sm font-extrabold leading-snug text-white sm:text-base min-[1920px]:text-xl min-[2400px]:text-2xl">
          {item.title}
        </h3>
        <p className="mt-1 text-[11px] leading-relaxed text-white sm:text-xs min-[1920px]:text-base min-[2400px]:text-lg">
          {item.caption}
        </p>
      </figcaption>
    </motion.figure>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LIGHTBOX  (big image with  <  and  >  arrows)
// • Click arrows, press ← → on the keyboard, or swipe on touch screens
// • Click the dark background, the X button, or press Esc to close
// • The big photo is shown in FULL (object-contain), never cropped
// ─────────────────────────────────────────────────────────────────────────────

function ArrowButton({ dir, onClick }) {
  return (
    <button
      type="button"
      aria-label={dir === 'prev' ? 'Previous image' : 'Next image'}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`absolute top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#102448] shadow-lg transition hover:scale-110 hover:bg-white sm:h-12 sm:w-12 min-[1920px]:h-16 min-[1920px]:w-16 ${
        dir === 'prev' ? 'left-2 sm:left-5' : 'right-2 sm:right-5'
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 sm:h-6 sm:w-6 min-[1920px]:h-8 min-[1920px]:w-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {dir === 'prev' ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
      </svg>
    </button>
  );
}

function Lightbox({ items, index, onClose, onChange }) {
  const touchX = useRef(null);
  const item = items[index];
  const total = items.length;

  const prev = () => onChange((index - 1 + total) % total);
  const next = () => onChange((index + 1) % total);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') onChange((index - 1 + total) % total);
      else if (e.key === 'ArrowRight') onChange((index + 1) % total);
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [index, total, onClose, onChange]);

  // Warm the cache for the neighbouring photos so arrows feel instant.
  useEffect(() => {
    [items[(index + 1) % total], items[(index - 1 + total) % total]].forEach((it) => {
      if (it && isUnsplash(it.photo)) new Image().src = unsplash(it.photo, 1600);
    });
  }, [index, items, total]);

  if (!item) return null;

  const bigSrc = isUnsplash(item.photo) ? unsplash(item.photo, 1600) : item.photo;

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/90 px-3 py-14 backdrop-blur-sm sm:px-20"
    >
      {/* Counter */}
      <div className="absolute left-4 top-4 z-20 rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white sm:left-6 sm:top-5 sm:text-sm">
        {index + 1} / {total}
      </div>

      {/* Close */}
      <button
        type="button"
        aria-label="Close"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#102448] shadow-lg transition hover:scale-110 hover:bg-white sm:right-5 sm:top-4 sm:h-12 sm:w-12"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </svg>
      </button>

      <ArrowButton dir="prev" onClick={prev} />
      <ArrowButton dir="next" onClick={next} />

      {/* Big image, shown in full */}
      <AnimatePresence mode="wait">
        <motion.img
          key={item.id}
          src={bigSrc}
          alt={item.title}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          draggable={false}
          className="max-h-[75vh] w-auto max-w-full rounded-lg bg-gray-800 object-contain shadow-2xl min-[1920px]:max-h-[80vh]"
        />
      </AnimatePresence>

      {/* Caption */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="mt-4 max-w-[90vw] text-center text-white sm:max-w-[700px] min-[1920px]:max-w-[1000px]"
      >
        <h3 className="text-base font-extrabold sm:text-xl min-[1920px]:text-3xl">{item.title}</h3>
        <p className="mt-1 text-xs text-white/80 sm:text-sm min-[1920px]:text-xl">{item.caption}</p>
      </div>
    </motion.div>,
    document.body
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GALLERY SECTION
// First 7 show on load; the next 7 load when the user scrolls near the bottom.
// Changing the filter starts again from the first 7 of that category.
// ─────────────────────────────────────────────────────────────────────────────

function GallerySection() {
  const [active, setActive] = useState('All');
  const [count, setCount] = useState(BATCH);
  const [openIndex, setOpenIndex] = useState(null);
  const sentinelRef = useRef(null);

  const filtered = active === 'All' ? GALLERY : GALLERY.filter((g) => g.category === active);
  const visible = filtered.slice(0, count);

  const handleFilter = (cat) => {
    setActive(cat);
    setCount(BATCH);
    setOpenIndex(null);
  };

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || count >= filtered.length) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCount((c) => Math.min(c + BATCH, filtered.length));
        }
      },
      { rootMargin: '0px 0px 150px 0px' }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [count, filtered.length, active]);

  const openById = (id) => setOpenIndex(filtered.findIndex((g) => g.id === id));

  return (
    <section className="relative w-full overflow-hidden bg-[#F8FAFC] py-8 sm:py-12 lg:py-16 min-[1920px]:py-24">
      <div className={CONTAINER}>
        <SectionHeading
          title="Our Gallery"
          sub="A look inside our work and our people."
          text="Browse moments from our projects, our team and the technology behind the services we deliver."
        />

        <FilterTabs active={active} onChange={handleFilter} />

        {/* Equal grid: same size tiles, perfectly aligned rows and columns */}
        <div className={GRID}>
          {visible.map((item) => (
            <GalleryTile key={item.id} item={item} onOpen={openById} />
          ))}
        </div>

        {/* Triggers loading the next batch when it scrolls into view */}
        {count < filtered.length && <div ref={sentinelRef} className="h-10" />}
      </div>

      <AnimatePresence>
        {openIndex !== null && openIndex >= 0 && (
          <Lightbox
            items={filtered}
            index={openIndex}
            onClose={() => setOpenIndex(null)}
            onChange={setOpenIndex}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE  (hero + gallery heading + gallery + CTA)
// ─────────────────────────────────────────────────────────────────────────────

export default function Gallery() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white font-sans text-[#102448] selection:bg-[#D7192D] selection:text-white">
      <PageBanner
        title="Gallery"
        breadcrumbs={[{ label: 'Gallery' }]}
        bgImage="/how-we-work-banner.jpg"
        className="!mb-0 lg:!mb-0"
      />

      <GallerySection />

      <div className="[&>*]:!py-6 lg:[&>*]:!py-8 [&>*]:!my-0">
        <CtaSection />
      </div>
    </div>
  );
}