import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export const GALLERY_ITEMS = [
  {
    id: '01',
    number: '01',
    title: 'Answer Engine Optimization',
    category: 'DIGITAL MARKETING',
    location: 'AI Search Visibility',
    desc: 'Helping businesses improve visibility across AI-powered search engines.',
    img: '/services-images-set2/aeo.png',
    fallback: '/services-images-set2/aeo.png',
    focalPoint: 'center center',
  },
  {
    id: '02',
    number: '02',
    title: 'Content Marketing',
    category: 'CONTENT MARKETING',
    location: 'Content Strategy',
    desc: 'Creating engaging content that connects brands with their audiences.',
    img: '/services-images-set2/content.png',
    fallback: '/services-images-set2/content.png',
    focalPoint: 'center center',
  },
  {
    id: '03',
    number: '03',
    title: 'Flutter App Development',
    category: 'APP DEVELOPMENT',
    location: 'Mobile Applications',
    desc: 'Building cross-platform mobile applications with Flutter.',
    img: '/services-section-home-page/app-development/flutter.png',
    fallback: '/services-section-home-page/app-development/flutter.png',
    focalPoint: 'center center',
  },
  {
    id: '04',
    number: '04',
    title: 'iOS App Development',
    category: 'APP DEVELOPMENT',
    location: 'iOS Applications',
    desc: 'Developing intuitive and high-performance applications for iOS.',
    img: '/services-section-home-page/app-development/iOS Development.png',
    fallback: '/services-section-home-page/app-development/iOS Development.png',
    focalPoint: 'center center',
  },
  {
    id: '05',
    number: '05',
    title: 'Shopify Development',
    category: 'E-COMMERCE',
    location: 'Digital Retail',
    desc: 'Creating scalable Shopify stores with seamless shopping experiences.',
    img: '/services-section-home-page/E-commerce Solutions/Shopify Development Solutions.png',
    fallback: '/services-section-home-page/E-commerce Solutions/Shopify Development Solutions.png',
    focalPoint: 'center center',
  },
  {
    id: '06',
    number: '06',
    title: 'Software Integration',
    category: 'SOFTWARE',
    location: 'Business Automation',
    desc: 'Connecting business systems for smoother workflows and operations.',
    img: '/services-section-home-page/Software Application Development/Software Integration.png',
    fallback: '/services-section-home-page/Software Application Development/Software Integration.png',
    focalPoint: 'center center',
  },
  {
    id: '07',
    number: '07',
    title: 'Digital Marketing',
    category: 'DIGITAL MARKETING',
    location: 'Online Growth',
    desc: 'Driving online growth through targeted digital marketing strategies.',
    img: '/services-images-set2/digital-marketing.png',
    fallback: '/services-images-set2/digital-marketing.png',
    focalPoint: 'center center',
  },
  {
    id: '08',
    number: '08',
    title: 'White Hat SEO',
    category: 'SEO',
    location: 'Organic Search',
    desc: 'Improving organic search rankings through ethical SEO practices.',
    img: '/services-images-set2/white-hat-seo.png',
    fallback: '/services-images-set2/white-hat-seo.png',
    focalPoint: 'center center',
  },
  {
    id: '09',
    number: '09',
    title: 'Web Portal Development',
    category: 'WEB DEVELOPMENT',
    location: 'Business Portals',
    desc: 'Building interactive web portals for business and customer needs.',
    img: '/services-section-home-page/Web Design and Development/Web Portal Development.png',
    fallback: '/services-section-home-page/Web Design and Development/Web Portal Development.png',
    focalPoint: 'center center',
  },
  {
    id: '10',
    number: '10',
    title: 'Logo Design',
    category: 'BRANDING',
    location: 'Visual Identity',
    desc: 'Creating distinctive visual identities for modern businesses.',
    img: '/services-set3/logo.png',
    fallback: '/services-set3/logo.png',
    focalPoint: 'center center',
  },
  {
    id: '11',
    number: '11',
    title: 'UI/UX Design',
    category: 'DESIGN',
    location: 'User Experience',
    desc: 'Designing intuitive interfaces and engaging user experiences.',
    img: '/services-set3/uiux.png',
    fallback: '/services-set3/uiux.png',
    focalPoint: 'center center',
  },
  {
    id: '12',
    number: '12',
    title: 'WhatsApp Marketing',
    category: 'MARKETING',
    location: 'Customer Engagement',
    desc: 'Connecting with customers through personalized WhatsApp campaigns.',
    img: '/services-images-set2/whatapp-marketing.png',
    fallback: '/services-images-set2/whatapp-marketing.png',
    focalPoint: 'center center',
  },
];

// Interactive 3D square card: mouse tilt, image parallax & smooth spring reset.
// The card is always 1:1 (aspect-square), matching the square source images,
// so nothing is cropped and there are no gaps in the grid.
function GalleryCard3D({ item, index, onOpen, className = '' }) {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState('');
  const [imageStyle, setImageStyle] = useState('');
  const [sheenStyle, setSheenStyle] = useState({ opacity: 0, x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [imgSrc, setImgSrc] = useState(item.img);
  const rafRef = useRef(null);

  useEffect(() => {
    setImgSrc(item.img);
  }, [item.img]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const sheenX = ((e.clientX - rect.left) / rect.width) * 100;
    const sheenY = ((e.clientY - rect.top) / rect.height) * 100;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rotX = -y * 8;
      const rotY = x * 8;
      // Keep parallax tiny so the square image never reveals its edges
      const imgX = -x * 8;
      const imgY = -y * 8;

      setTransformStyle(
        `perspective(1200px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-7px) scale3d(1.018, 1.018, 1.018)`
      );
      setImageStyle(`scale(1.06) translate3d(${imgX.toFixed(1)}px, ${imgY.toFixed(1)}px, 0px)`);
      setSheenStyle({ opacity: 0.18, x: sheenX, y: sheenY });
    });
  }, []);

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setTransformStyle('perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)');
    setImageStyle('scale(1) translate3d(0px, 0px, 0px)');
    setSheenStyle({ opacity: 0, x: 50, y: 50 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.85, delay: (index % 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={`relative group cursor-pointer select-none ${className}`}
      onClick={() => onOpen(index)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(index);
        }
      }}
      aria-label={`View ${item.title}`}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: transformStyle || 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)',
          transition: isHovered
            ? 'transform 0.12s ease-out, box-shadow 0.35s ease-out'
            : 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.65s ease-out',
        }}
        className="w-full aspect-square overflow-hidden rounded-[18px] sm:rounded-[20px] bg-slate-100 relative
          border border-black/[0.05]
          shadow-[0_10px_28px_-10px_rgba(0,0,0,0.07),0_4px_10px_-4px_rgba(0,0,0,0.03)]
          hover:shadow-[0_24px_50px_-12px_rgba(232,137,12,0.18),0_12px_24px_-6px_rgba(0,0,0,0.06)]
          hover:border-[#E8890C]/25 transition-all duration-300"
      >
        {/* Full image: square container + square image = no crop */}
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-slate-200">
          <img
            src={imgSrc}
            alt={item.title}
            onError={() => {
              if (imgSrc !== item.fallback) setImgSrc(item.fallback);
            }}
            loading={index < 4 ? 'eager' : 'lazy'}
            style={{
              objectPosition: item.focalPoint,
              transform: imageStyle || 'scale(1) translate3d(0,0,0)',
              transition: isHovered
                ? 'transform 0.14s ease-out'
                : 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="w-full h-full object-cover will-change-transform"
          />
        </div>

        {/* Cursor sheen */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 mix-blend-overlay"
          style={{
            opacity: sheenStyle.opacity,
            background: `radial-gradient(circle 280px at ${sheenStyle.x}% ${sheenStyle.y}%, rgba(255, 255, 255, 0.95), transparent 75%)`,
          }}
        />

        {/* Bottom gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Expand icon */}
        <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-[#E8890C] flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300 shadow-md border border-white/60">
          <Maximize2 className="w-3.5 h-3.5" />
        </div>

        {/* Hover caption */}
        <div className="absolute bottom-3 left-3 right-12 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300 pointer-events-none">
          <p className="text-white text-xs font-bold drop-shadow-sm truncate">{item.title}</p>
          <p className="text-white text-[11px] font-medium drop-shadow-xs truncate">{item.location}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function GallerySection({ onExploreClick }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [mobileSlideIndex, setMobileSlideIndex] = useState(0);

  const mobileGalleryItems = GALLERY_ITEMS;

  // Auto-advance mobile slide every 2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setMobileSlideIndex((prev) => (prev + 1) % mobileGalleryItems.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [mobileGalleryItems.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  const activeLightboxItem = lightboxIndex !== null ? GALLERY_ITEMS[lightboxIndex] : null;

  const handleExplore = () => {
    if (onExploreClick) onExploreClick();
    else setLightboxIndex(0);
  };

  return (
    <section className="relative w-full bg-white text-[#111111] overflow-hidden pt-28 xs:pt-32 sm:pt-32 md:pt-28 lg:pt-20 pb-8 sm:pb-10 md:pb-12 lg:pb-14">
      {/* Ambient background gradients */}
      <div className="absolute top-0 left-1/4 w-[650px] h-[650px] bg-gradient-to-br from-[#E8890C]/[0.035] to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-gradient-to-tl from-[#0F3D2E]/[0.035] to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1560px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-8 xl:px-12 relative z-10">
        {/* ============================================================== */}
        {/* DESKTOP (1280px and up): asymmetric 5-column layout, ALL squares. */}
        {/* 3 squares in each 2-col column = height of 2 squares in a 3-col   */}
        {/* column, so every column ends on the same line: no empty space.   */}
        {/* ============================================================== */}
        <div className="hidden xl:grid xl:grid-cols-12 gap-5 2xl:gap-6 items-stretch">
          {/* COLUMN 1 (3 cols): hero text + card 01 */}
          <div className="xl:col-span-3 flex flex-col justify-between gap-5">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="pr-2"
            >
              <div className="flex flex-col items-start mb-3">
                <span className="text-[#E8890C] font-extrabold text-[12px] xl:text-[13px] tracking-[0.25em] uppercase mb-1.5">
                  FEATURED GALLERY
                </span>
                <div className="w-12 h-1 bg-[#0F3D2E] rounded-full"></div>
              </div>

              <h2 className="text-[44px] 2xl:text-[56px] font-extrabold leading-[1.05] tracking-tight mb-3">
                <span className="text-[#E8890C] block">Beyond Color.</span>
                <span className="text-[#0F3D2E] block mt-0.5">Pure Emotion.</span>
              </h2>

              <p className="text-[14px] 2xl:text-[15px] text-[#111111] font-medium leading-relaxed max-w-[320px] mb-4">
                Timeless visual narratives and spatial perspectives that speak without words.
              </p>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleExplore}
                className="group pl-5 pr-2 py-2 rounded-xl bg-[#E8890C] hover:bg-[#0F3D2E] text-white font-medium text-[14px] inline-flex items-center gap-3 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
              >
                <span>See the Stories</span>
                <div className="w-8 h-8 rounded-full bg-white/20 group-hover:bg-white text-white group-hover:text-[#0F3D2E] flex items-center justify-center transition-all duration-300">
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </motion.button>
            </motion.div>

            <GalleryCard3D item={GALLERY_ITEMS[0]} index={0} onOpen={setLightboxIndex} />
          </div>

          {/* COLUMN 2 (2 cols): cards 02, 08, 09 */}
          <div className="xl:col-span-2 flex flex-col justify-between gap-5 2xl:gap-6">
            <GalleryCard3D item={GALLERY_ITEMS[1]} index={1} onOpen={setLightboxIndex} />
            <GalleryCard3D item={GALLERY_ITEMS[7]} index={7} onOpen={setLightboxIndex} />
            <GalleryCard3D item={GALLERY_ITEMS[8]} index={8} onOpen={setLightboxIndex} />
          </div>

          {/* COLUMN 3 (2 cols): cards 03, 04, 10 */}
          <div className="xl:col-span-2 flex flex-col justify-between gap-5 2xl:gap-6">
            <GalleryCard3D item={GALLERY_ITEMS[2]} index={2} onOpen={setLightboxIndex} />
            <GalleryCard3D item={GALLERY_ITEMS[3]} index={3} onOpen={setLightboxIndex} />
            <GalleryCard3D item={GALLERY_ITEMS[9]} index={9} onOpen={setLightboxIndex} />
          </div>

          {/* COLUMN 4 (2 cols): cards 05, 11, 12 */}
          <div className="xl:col-span-2 flex flex-col justify-between gap-5 2xl:gap-6">
            <GalleryCard3D item={GALLERY_ITEMS[4]} index={4} onOpen={setLightboxIndex} />
            <GalleryCard3D item={GALLERY_ITEMS[10]} index={10} onOpen={setLightboxIndex} />
            <GalleryCard3D item={GALLERY_ITEMS[11]} index={11} onOpen={setLightboxIndex} />
          </div>

          {/* COLUMN 5 (3 cols): cards 06, 07 */}
          <div className="xl:col-span-3 flex flex-col justify-between gap-5 2xl:gap-6">
            <GalleryCard3D item={GALLERY_ITEMS[5]} index={5} onOpen={setLightboxIndex} />
            <GalleryCard3D item={GALLERY_ITEMS[6]} index={6} onOpen={setLightboxIndex} />
          </div>
        </div>

        {/* ============================================================== */}
        {/* TABLET / SMALL LAPTOP (768px - 1279px): header + 4 x 3 square grid */}
        {/* ============================================================== */}
        <div className="hidden md:block xl:hidden">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 lg:mb-10 flex flex-row items-end justify-between gap-8"
          >
            <div className="max-w-[640px]">
              <div className="flex flex-col items-start mb-3 sm:mb-4">
                <span className="text-[#E8890C] font-extrabold text-[11px] sm:text-[12px] xl:text-[13px] tracking-[0.25em] uppercase mb-1.5">
                  FEATURED GALLERY
                </span>
                <div className="w-12 h-1 bg-[#0F3D2E] rounded-full"></div>
              </div>

              <h2 className="text-[34px] md:text-[38px] lg:text-[48px] xl:text-[56px] 2xl:text-[64px] font-extrabold leading-[1.05] tracking-tight mb-4">
                <span className="text-[#E8890C] block">Beyond Color.</span>
                <span className="text-[#0F3D2E] block mt-0.5 sm:mt-1">Pure Emotion.</span>
              </h2>

              <p className="text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px] text-[#111111] font-medium leading-relaxed max-w-[420px] mb-6">
                Timeless visual narratives and spatial perspectives that speak without words.
              </p>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleExplore}
                className="group pl-5 pr-2 py-2 rounded-xl bg-[#E8890C] hover:bg-[#0F3D2E] text-white font-medium text-[13.5px] xl:text-[14px] inline-flex items-center gap-3 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
              >
                <span>See the Stories</span>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 group-hover:bg-white text-white group-hover:text-[#0F3D2E] flex items-center justify-center transition-all duration-300">
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </motion.button>
            </div>
          </motion.div>

          {/* Gap-free square grid: 4 columns x 3 rows = 12 cards */}
          <div className="grid grid-cols-4 gap-4 lg:gap-5 2xl:gap-6">
            {GALLERY_ITEMS.map((item, i) => (
              <GalleryCard3D key={item.id} item={item} index={i} onOpen={setLightboxIndex} />
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* MOBILE (up to 767px)                                            */}
        {/* Full-width square auto-advancing carousel, image fully shown    */}
        {/* ============================================================== */}
        <div className="block md:hidden">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6 pt-4 xs:pt-6"
          >
            <div className="flex flex-col items-start mb-2">
              <span className="text-[#E8890C] font-extrabold text-[11px] tracking-[0.22em] uppercase mb-1">
                FEATURED GALLERY
              </span>
              <div className="w-10 h-1 bg-[#0F3D2E] rounded-full mb-2"></div>
            </div>
            <h2 className="text-2xl xs:text-3xl font-extrabold leading-[1.1] tracking-tight mb-2.5">
              <span className="text-[#E8890C] block">Beyond Color.</span>
              <span className="text-[#0F3D2E] block mt-0.5">Pure Emotion.</span>
            </h2>
            <p className="text-xs xs:text-sm text-[#111111] font-medium leading-relaxed mb-4">
              Timeless visual narratives and spatial perspectives that speak without words.
            </p>
            <button
              onClick={handleExplore}
              className="group pl-4 pr-1.5 py-1.5 rounded-xl bg-[#E8890C] hover:bg-[#0F3D2E] text-white font-medium text-xs inline-flex items-center gap-2.5 transition-all duration-300 shadow-md cursor-pointer"
            >
              <span>See the Stories</span>
              <div className="w-6 h-6 rounded-full bg-white/20 group-hover:bg-white text-white group-hover:text-[#0F3D2E] flex items-center justify-center transition-all duration-300">
                <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>
            </button>
          </motion.div>

          {/* Square slideshow: same size every slide, no crop, no jump */}
          <div className="relative w-full aspect-square">
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileGalleryItems[mobileSlideIndex].id}
                initial={{ opacity: 0, x: 35 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -35 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <GalleryCard3D
                  item={mobileGalleryItems[mobileSlideIndex]}
                  index={mobileSlideIndex}
                  onOpen={() => setLightboxIndex(mobileSlideIndex)}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress dots */}
          <div className="flex items-center justify-center gap-1.5 mt-4">
            {mobileGalleryItems.map((it, i) => (
              <button
                key={it.id}
                onClick={() => setMobileSlideIndex(i)}
                aria-label={`Show ${it.title}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === mobileSlideIndex ? 'w-6 bg-[#E8890C]' : 'w-1.5 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* FULL-SCREEN LIGHTBOX                                            */}
      {/* ============================================================== */}
      <AnimatePresence>
        {activeLightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-3 xs:p-4 sm:p-6"
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-5xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxIndex(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
                }}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/80 hover:bg-white text-gray-900 flex items-center justify-center transition-all shadow-xl cursor-pointer hover:scale-105"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
                }}
                aria-label="Next image"
                className="absolute right-4 md:right-[340px] top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/80 hover:bg-white text-gray-900 flex items-center justify-center transition-all shadow-xl cursor-pointer hover:scale-105"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image canvas (object-contain: always the full image) */}
              <div className="flex-1 bg-slate-950 flex items-center justify-center overflow-hidden min-h-[300px] md:min-h-[550px] relative">
                <img
                  src={activeLightboxItem.img}
                  alt={activeLightboxItem.title}
                  className="max-h-[82vh] w-auto max-w-full object-contain"
                />
              </div>

              {/* Details */}
              <div className="w-full md:w-[320px] lg:w-[360px] p-6 sm:p-8 flex flex-col justify-between bg-white border-t md:border-t-0 md:border-l border-gray-100 overflow-y-auto">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-[#E8890C]/10 text-[#E8890C] text-xs font-bold tracking-wider uppercase">
                      FRAME {activeLightboxItem.number} / {String(GALLERY_ITEMS.length).padStart(2, '0')}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">{activeLightboxItem.location}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-[#111111] mb-2 tracking-tight">
                    {activeLightboxItem.title}
                  </h3>

                  <p className="text-xs font-semibold text-[#0F3D2E] uppercase tracking-wider mb-4">
                    {activeLightboxItem.category}
                  </p>

                  <p className="text-sm text-gray-600 leading-relaxed font-normal mb-6">
                    {activeLightboxItem.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                  <span>VR4WEB Immersive Collection</span>
                  <span>Full Color 3D</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Alias so either import name works
export { GallerySection as AsymmetricGallerySection };