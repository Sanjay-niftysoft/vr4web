import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowUpRight, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Sparkles, 
  Eye,
  Camera,
  Layers,
  MapPin
} from 'lucide-react';

// Curated authentic editorial photography for VR4WEB (Virtual reality, 3D architecture, digital technology - No AI, No humans)
export const GALLERY_ITEMS = [
  {
    id: '01',
    number: '01',
    title: 'Spatial Hardware',
    category: 'IMMERSIVE VR INTERFACE',
    location: 'VR Hardware Lab',
    desc: 'Precision-engineered virtual reality headset and optical motion controller built for seamless 6DOF web exploration.',
    img: '/gallery/gallery_01.jpg',
    fallback: 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?auto=format&fit=crop&q=80&w=1200',
    focalPoint: 'center center',
  },
  {
    id: '02',
    number: '02',
    title: 'Monolithic Horizon',
    category: 'METROPOLITAN SCALE',
    location: 'Financial District',
    desc: 'Towering geometric glass skyscrapers piercing the clouds, exemplifying scale, precision, and structural engineering.',
    img: '/gallery/gallery_02.jpg',
    fallback: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
    focalPoint: 'center 40%',
  },
  {
    id: '03',
    number: '03',
    title: 'Neural Circuitry',
    category: 'CORE HARDWARE',
    location: 'Silicon Core',
    desc: 'Luminescent blueprint and circuit pathways illustrating the microscopic processing power behind real-time 3D simulation.',
    img: '/gallery/gallery_03.jpg',
    fallback: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200',
    focalPoint: 'center center',
  },
  {
    id: '04',
    number: '04',
    title: 'Parametric Villa',
    category: '3D ARCHITECTURAL CAPTURE',
    location: 'Melbourne, Australia',
    desc: 'Contemporary residential architecture featuring contrasting timber slats, dark cladding, and ambient architectural lighting.',
    img: '/gallery/gallery_04.jpg',
    fallback: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1200',
    focalPoint: 'center 35%',
  },
  {
    id: '05',
    number: '05',
    title: 'Virtual Engine',
    category: 'WEBGL CODE ARCHITECTURE',
    location: 'Engineering Suite',
    desc: 'Clean algorithmic code structure and responsive logic powering smooth 60fps immersive WebGL visual pipelines.',
    img: '/gallery/gallery_05.jpg',
    fallback: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200',
    focalPoint: 'center center',
  },
  {
    id: '06',
    number: '06',
    title: 'Panoramic Living',
    category: 'SPATIAL INTERIOR SCAN',
    location: 'Modern Estate',
    desc: 'High-fidelity spatial interior featuring Scandinavian minimalism, natural lighting, and seamless indoor-outdoor flow.',
    img: '/gallery/gallery_06.jpg',
    fallback: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200',
    focalPoint: 'center center',
  },
  {
    id: '07',
    number: '07',
    title: 'Global Network',
    category: 'WORLDWIDE CLOUD FABRIC',
    location: 'Orbital Perspective',
    desc: 'Planetary node connectivity and city light constellations representing global low-latency CDN distribution.',
    img: '/gallery/gallery_07.jpg',
    fallback: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200',
    focalPoint: 'center center',
  },
  {
    id: '08',
    number: '08',
    title: 'Compute Telemetry',
    category: 'DATA CENTER INFRASTRUCTURE',
    location: 'Tier-4 Server Cluster',
    desc: 'Tier-4 datacenter server clusters interconnected with high-throughput fiber channels for instant 3D asset streaming.',
    img: '/gallery/gallery_08.jpg',
    fallback: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200',
    focalPoint: 'center 45%',
  },
  {
    id: '09',
    number: '09',
    title: 'Spatial Analytics',
    category: 'REAL-TIME TELEMETRY',
    location: 'Operations Dashboard',
    desc: 'Interactive telemetry monitoring user engagement, frame rates, bounce rates, and spatial interaction times.',
    img: '/gallery/gallery_09.jpg',
    fallback: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
    focalPoint: 'center center',
  },
  {
    id: '10',
    number: '10',
    title: 'Glass Pavilion',
    category: 'COMMERCIAL SPACE SCAN',
    location: 'Corporate Headquarters',
    desc: 'Expansive modern glass office corridor scanned with millimeter precision for interactive virtual corporate walkthroughs.',
    img: '/gallery/gallery_10.jpg',
    fallback: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
    focalPoint: 'center center',
  },
];

// Interactive 3D Card with mouse tilt, image parallax & smooth spring reset
function GalleryCard3D({ item, index, onOpen, className = '', heightStyle = '' }) {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState('');
  const [imageStyle, setImageStyle] = useState('');
  const [sheenStyle, setSheenStyle] = useState({ opacity: 0, x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [imgSrc, setImgSrc] = useState(item.img);
  const rafRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

    const sheenX = ((e.clientX - rect.left) / rect.width) * 100;
    const sheenY = ((e.clientY - rect.top) / rect.height) * 100;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      // Subtle premium 3D tilt: max 5-6 degrees
      const rotX = -y * 8;
      const rotY = x * 8;
      // Parallax image shift: opposite to cursor, max 8px
      const imgX = -x * 12;
      const imgY = -y * 12;

      setTransformStyle(
        `perspective(1200px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-7px) scale3d(1.018, 1.018, 1.018)`
      );
      setImageStyle(
        `scale(1.06) translate3d(${imgX.toFixed(1)}px, ${imgY.toFixed(1)}px, 0px)`
      );
      setSheenStyle({
        opacity: 0.18,
        x: sheenX,
        y: sheenY,
      });
    });
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

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
      transition={{
        duration: 0.85,
        delay: index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
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
        className={`w-full overflow-hidden rounded-[18px] sm:rounded-[20px] bg-slate-100 relative ${heightStyle}
          border border-black/[0.05]
          shadow-[0_10px_28px_-10px_rgba(0,0,0,0.07),0_4px_10px_-4px_rgba(0,0,0,0.03)]
          hover:shadow-[0_24px_50px_-12px_rgba(11,79,156,0.18),0_12px_24px_-6px_rgba(0,0,0,0.06)]
          hover:border-[#0B4F9C]/25 transition-all duration-300`}
      >
        {/* Full Color Image with Zoom & Parallax */}
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-slate-200">
          <img
            src={imgSrc}
            alt={item.title}
            onError={() => {
              if (imgSrc !== item.fallback) setImgSrc(item.fallback);
            }}
            loading={index < 3 ? 'eager' : 'lazy'}
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

        {/* Dynamic Sheen Light Reflection following cursor */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 mix-blend-overlay"
          style={{
            opacity: sheenStyle.opacity,
            background: `radial-gradient(circle 280px at ${sheenStyle.x}% ${sheenStyle.y}%, rgba(255, 255, 255, 0.95), transparent 75%)`,
          }}
        />

        {/* Ambient Dark Bottom Gradient on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />


        {/* Hover Expand Icon Indicator */}
        <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-[#0B4F9C] flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300 shadow-md border border-white/60">
          <Maximize2 className="w-3.5 h-3.5" />
        </div>

        {/* Hover Caption at Bottom */}
        <div className="absolute bottom-3 left-3 right-12 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300 pointer-events-none">
          <p className="text-white text-xs font-bold drop-shadow-sm truncate">{item.title}</p>
          <p className="text-white text-[11px] font-medium drop-shadow-xs truncate">{item.location}</p>
        </div>
      </div>
    </motion.div>
  );
}

// Editorial Arrow List Component (Matching the exact reference feature)
function EditorialArrowList({ className = '', onItemClick }) {
  const items = [
    { text: 'Silent stories.', index: 3 },
    { text: 'Honest frames.', index: 1 },
    { text: 'Still truth.', index: 5 },
    { text: 'Quiet depth.', index: 2 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.25 }}
      className={`space-y-3 sm:space-y-3.5 py-3 ${className}`}
    >
      {items.map((item) => (
        <motion.div
          key={item.text}
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
          onClick={() => onItemClick && onItemClick(item.index)}
          className="flex items-center gap-2.5 text-[#111111] hover:text-[#0B4F9C] group transition-colors duration-200 cursor-pointer"
        >
          <ArrowUpRight className="w-4 h-4 text-[#0B4F9C] flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          <span className="text-[14px] sm:text-[15px] xl:text-[16px] font-medium tracking-tight text-gray-800 group-hover:text-[#0B4F9C] leading-snug">
            {item.text}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function AsymmetricGallerySection({ onExploreClick }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [mobileSlideIndex, setMobileSlideIndex] = useState(0);

  // All curated gallery items for mobile slideshow
  const mobileGalleryItems = GALLERY_ITEMS;

  // Auto-advance mobile slide every 2 seconds (2000ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setMobileSlideIndex((prev) => (prev + 1) % mobileGalleryItems.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [mobileGalleryItems.length]);

  // Keyboard navigation for Lightbox
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
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  const activeLightboxItem = lightboxIndex !== null ? GALLERY_ITEMS[lightboxIndex] : null;

  return (
    <section className="relative w-full bg-white text-[#111111] overflow-hidden pt-28 xs:pt-32 sm:pt-32 md:pt-28 lg:pt-20 pb-4 sm:pb-6 md:pb-8 lg:pb-10">
      {/* Subtle Ambient Background Gradients (Clean & Light) */}
      <div className="absolute top-0 left-1/4 w-[650px] h-[650px] bg-gradient-to-br from-[#0B4F9C]/[0.035] to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-gradient-to-tl from-[#F97316]/[0.035] to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-[1560px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-8 xl:px-12 relative z-10">

        {/* ============================================================== */}
        {/* DESKTOP & LAPTOP LAYOUT (1024px, 1440px, 1920px, 2560px)        */}
        {/* Exact Asymmetric 5-Column Composition Matching Reference       */}
        {/* ============================================================== */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-4 lg:gap-4 xl:gap-5 2xl:gap-6 items-end">

          {/* COLUMN 1 (Spans 3 cols on lg / 25%): Hero Text + Bottom Card 01 */}
          <div className="lg:col-span-3 flex flex-col justify-between h-full min-h-[780px] xl:min-h-[820px]">
            {/* Top: Editorial Hero Text Block */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="pt-2 pr-2"
            >
              {/* Eyebrow matching Why Choose Us style */}
              <div className="flex flex-col items-start mb-3 sm:mb-4">
                <span className="text-[#0B3B82] font-extrabold text-[11px] sm:text-[12px] xl:text-[13px] tracking-[0.25em] uppercase mb-1.5">
                  FEATURED GALLERY
                </span>
                <div className="w-12 h-1 bg-[#F97316] rounded-full"></div>
              </div>

              {/* Main Heading matching Why Choose Us style (Blue line 1, Orange line 2) */}
              <h2 className="text-[34px] sm:text-[44px] lg:text-[48px] xl:text-[56px] 2xl:text-[64px] font-extrabold leading-[1.05] tracking-tight mb-5">
                <span className="text-[#0B3B82] block">Beyond Color.</span>
                <span className="text-[#F97316] block mt-0.5 sm:mt-1">Pure Emotion.</span>
              </h2>

              {/* Concise Supporting Description (Updated to black) */}
              <p className="text-[14px] xl:text-[15px] 2xl:text-[16px] text-[#111111] font-medium leading-relaxed max-w-[320px] mb-7">
                Timeless visual narratives and spatial perspectives that speak without words.
              </p>

              {/* Rounded Rectangle Box with Circle Arrow Box */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  if (onExploreClick) onExploreClick();
                  else setLightboxIndex(0);
                }}
                className="group pl-5 pr-2 py-2 rounded-xl bg-[#0B3B82] hover:bg-[#F97316] text-white font-medium text-[13.5px] xl:text-[14px] inline-flex items-center gap-3 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
              >
                <span>See the Stories</span>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 group-hover:bg-white text-white group-hover:text-[#F97316] flex items-center justify-center transition-all duration-300">
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </motion.button>
            </motion.div>

            {/* Bottom: Card 01 (Bridge Perspective) */}
            <div className="mt-8 xl:mt-10">
              <GalleryCard3D
                item={GALLERY_ITEMS[0]}
                index={0}
                onOpen={setLightboxIndex}
                heightStyle="h-[300px] xl:h-[340px]"
              />
            </div>
          </div>

          {/* COLUMN 2 (Spans 2 cols on lg / ~16.6%): Card 02 (Pavilion) + Card 03 (Misty Pier) */}
          <div className="lg:col-span-2 flex flex-col justify-end gap-4 xl:gap-5">
            {/* Top: Card 02 (Pavilion / Kiosk) */}
            <GalleryCard3D
              item={GALLERY_ITEMS[1]}
              index={1}
              onOpen={setLightboxIndex}
              heightStyle="h-[370px] xl:h-[450px]"
            />
            {/* Bottom: Card 03 (Misty Pier / Lampposts) */}
            <GalleryCard3D
              item={GALLERY_ITEMS[2]}
              index={2}
              onOpen={setLightboxIndex}
              heightStyle="h-[180px] xl:h-[200px]"
            />
          </div>

          {/* COLUMN 3 (Spans 2 cols on lg / ~16.6%): Card 04 (Alleyway Dog) + Card 05 (Tree Trunk) */}
          <div className="lg:col-span-2 flex flex-col justify-end gap-4 xl:gap-5">
            {/* Top: Card 04 (Alley Dog) */}
            <GalleryCard3D
              item={GALLERY_ITEMS[3]}
              index={3}
              onOpen={setLightboxIndex}
              heightStyle="h-[380px] xl:h-[400px]"
            />
            {/* Bottom: Card 05 (Sculptural Tree) */}
            <GalleryCard3D
              item={GALLERY_ITEMS[4]}
              index={4}
              onOpen={setLightboxIndex}
              heightStyle="h-[300px] xl:h-[330px]"
            />
          </div>

          {/* COLUMN 4 (Spans 2 cols on lg / ~16.6%): Card 10 (Curved Dimension) + Card 06 (Architectural Stairs) */}
          <div className="lg:col-span-2 flex flex-col justify-end gap-4 xl:gap-5">
            {/* Top: New Image Card replacing the arrow text list */}
            <GalleryCard3D
              item={GALLERY_ITEMS[9]}
              index={9}
              onOpen={setLightboxIndex}
              heightStyle="h-[390px] xl:h-[430px]"
            />
            {/* Bottom: Card 06 (Curved Architectural Stairs) */}
            <GalleryCard3D
              item={GALLERY_ITEMS[5]}
              index={5}
              onOpen={setLightboxIndex}
              heightStyle="h-[310px] xl:h-[350px]"
            />
          </div>

          {/* COLUMN 5 (Spans 3 cols on lg / 25%): Card 07 (Bicycle) + Card 08 (Clock Tower) + Card 09 (Zebras) */}
          <div className="lg:col-span-3 flex flex-col justify-end gap-4 xl:gap-5">
            {/* Top: Card 07 (Bicycle on wet street - sits high up at heading level!) */}
            <GalleryCard3D
              item={GALLERY_ITEMS[6]}
              index={6}
              onOpen={setLightboxIndex}
              heightStyle="h-[180px] xl:h-[200px]"
            />
            {/* Middle: Card 08 (Towering Big Ben clock tower) */}
            <GalleryCard3D
              item={GALLERY_ITEMS[7]}
              index={7}
              onOpen={setLightboxIndex}
              heightStyle="h-[380px] xl:h-[430px]"
            />
            {/* Bottom: Card 09 (Zebras close-up) */}
            <GalleryCard3D
              item={GALLERY_ITEMS[8]}
              index={8}
              onOpen={setLightboxIndex}
              heightStyle="h-[160px] xl:h-[180px]"
            />
          </div>

        </div>

        {/* ============================================================== */}
        {/* TABLET LAYOUT (768px - 1023px)                                  */}
        {/* Filled, zero-empty-space 3-Column Masonry Composition          */}
        {/* ============================================================== */}
        <div className="hidden md:block lg:hidden">
          
          {/* Tablet Header Row */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex flex-row items-end justify-between gap-6 pb-6 border-b border-gray-100/80"
          >
            <div>
              <div className="flex flex-col items-start mb-2.5">
                <span className="text-[#0B3B82] font-extrabold text-[12px] tracking-[0.25em] uppercase mb-1">
                  FEATURED GALLERY
                </span>
                <div className="w-12 h-1 bg-[#F97316] rounded-full"></div>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-[38px] font-extrabold leading-[1.08] tracking-tight">
                <span className="text-[#0B3B82] block">Beyond Color.</span>
                <span className="text-[#F97316] block mt-0.5">Pure Emotion.</span>
              </h2>
            </div>

            <div className="flex flex-col items-end gap-3 flex-shrink-0">
              <p className="text-xs text-[#111111] font-medium max-w-[260px] text-right leading-relaxed">
                Timeless visual narratives and spatial perspectives that speak without words.
              </p>
              <button
                onClick={() => setLightboxIndex(0)}
                className="group pl-4 pr-1.5 py-1.5 rounded-xl bg-[#0B3B82] hover:bg-[#F97316] text-white font-medium text-xs inline-flex items-center gap-2.5 transition-all duration-300 shadow-md cursor-pointer"
              >
                <span>See the Stories</span>
                <div className="w-6 h-6 rounded-full bg-white/20 group-hover:bg-white text-white group-hover:text-[#F97316] flex items-center justify-center transition-all duration-300">
                  <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </button>
            </div>
          </motion.div>

          {/* Underneath: 3 Equal-Height Columns Ending on the Exact Same Line */}
          <div className="grid grid-cols-12 gap-4 sm:gap-5 items-stretch">
            {/* Tablet Col 1: Card 01 (280) + Card 02 (250) + Card 03 (220) = 750px */}
            <div className="col-span-4 flex flex-col gap-4">
              <GalleryCard3D
                item={GALLERY_ITEMS[0]}
                index={0}
                onOpen={setLightboxIndex}
                heightStyle="h-[280px]"
              />
              <GalleryCard3D
                item={GALLERY_ITEMS[1]}
                index={1}
                onOpen={setLightboxIndex}
                heightStyle="h-[250px]"
              />
              <GalleryCard3D
                item={GALLERY_ITEMS[2]}
                index={2}
                onOpen={setLightboxIndex}
                heightStyle="h-[220px]"
              />
            </div>

            {/* Tablet Col 2: Card 04 (270) + Card 05 (270) + Card 06 (210) = 750px */}
            <div className="col-span-4 flex flex-col gap-4">
              <GalleryCard3D
                item={GALLERY_ITEMS[3]}
                index={3}
                onOpen={setLightboxIndex}
                heightStyle="h-[270px]"
              />
              <GalleryCard3D
                item={GALLERY_ITEMS[4]}
                index={4}
                onOpen={setLightboxIndex}
                heightStyle="h-[270px]"
              />
              <GalleryCard3D
                item={GALLERY_ITEMS[5]}
                index={5}
                onOpen={setLightboxIndex}
                heightStyle="h-[210px]"
              />
            </div>

            {/* Tablet Col 3: Card 07 (200) + Card 08 (310) + Card 10 (240) = 750px (Zebra removed) */}
            <div className="col-span-4 flex flex-col gap-4">
              <GalleryCard3D
                item={GALLERY_ITEMS[6]}
                index={6}
                onOpen={setLightboxIndex}
                heightStyle="h-[200px]"
              />
              <GalleryCard3D
                item={GALLERY_ITEMS[7]}
                index={7}
                onOpen={setLightboxIndex}
                heightStyle="h-[310px]"
              />
              <GalleryCard3D
                item={GALLERY_ITEMS[9]}
                index={9}
                onOpen={setLightboxIndex}
                heightStyle="h-[240px]"
              />
            </div>
          </div>

        </div>

        {/* ============================================================== */}
        {/* MOBILE LAYOUT (320px - 767px)                                   */}
        {/* Full-width Single Image Auto-Advancing Carousel (Every 1.5s)    */}
        {/* ============================================================== */}
        <div className="block md:hidden">
          
          {/* Mobile Hero Block */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6 pt-4 xs:pt-6"
          >
            <div className="flex flex-col items-start mb-2">
              <span className="text-[#0B3B82] font-extrabold text-[11px] tracking-[0.22em] uppercase mb-1">
                FEATURED GALLERY
              </span>
              <div className="w-10 h-1 bg-[#F97316] rounded-full mb-2"></div>
            </div>
            <h2 className="text-2xl xs:text-3xl font-extrabold leading-[1.1] tracking-tight mb-2.5">
              <span className="text-[#0B3B82] block">Beyond Color.</span>
              <span className="text-[#F97316] block mt-0.5">Pure Emotion.</span>
            </h2>
            <p className="text-xs xs:text-sm text-[#111111] font-medium leading-relaxed mb-4">
              Timeless visual narratives and spatial perspectives that speak without words.
            </p>
            <div className="flex items-center justify-between">
              <button
                onClick={() => setLightboxIndex(0)}
                className="group pl-4 pr-1.5 py-1.5 rounded-xl bg-[#0B3B82] hover:bg-[#F97316] text-white font-medium text-xs inline-flex items-center gap-2.5 transition-all duration-300 shadow-md cursor-pointer"
              >
                <span>See the Stories</span>
                <div className="w-6 h-6 rounded-full bg-white/20 group-hover:bg-white text-white group-hover:text-[#F97316] flex items-center justify-center transition-all duration-300">
                  <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </button>
            </div>
          </motion.div>

          {/* Full-width Single Image Auto-Advancing Slideshow (Every 2 Seconds) */}
          <div className="relative w-full">
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
                  onOpen={() => {
                    const origIdx = GALLERY_ITEMS.findIndex(
                      (it) => it.id === mobileGalleryItems[mobileSlideIndex].id
                    );
                    setLightboxIndex(origIdx !== -1 ? origIdx : 0);
                  }}
                  heightStyle="h-[360px] xs:h-[400px]"
                />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>

      {/* ============================================================== */}
      {/* FULL-SCREEN EDITORIAL LIGHTBOX MODAL                            */}
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
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-5xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxIndex(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev / Next Navigation Buttons (Floating) */}
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

              {/* Left Column: Image Canvas */}
              <div className="flex-1 bg-slate-950 flex items-center justify-center overflow-hidden min-h-[300px] md:min-h-[550px] relative">
                <img
                  src={activeLightboxItem.img}
                  alt={activeLightboxItem.title}
                  className="max-h-[82vh] w-auto max-w-full object-contain"
                />
              </div>

              {/* Right Column: Editorial Details */}
              <div className="w-full md:w-[320px] lg:w-[360px] p-6 sm:p-8 flex flex-col justify-between bg-white border-t md:border-t-0 md:border-l border-gray-100 overflow-y-auto">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-[#0B4F9C]/10 text-[#0B4F9C] text-xs font-bold tracking-wider uppercase">
                      FRAME {activeLightboxItem.number} / 10
                    </span>
                    <span className="text-xs text-gray-400 font-medium">{activeLightboxItem.location}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-[#111111] mb-2 tracking-tight">
                    {activeLightboxItem.title}
                  </h3>

                  <p className="text-xs font-semibold text-[#F97316] uppercase tracking-wider mb-4">
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
