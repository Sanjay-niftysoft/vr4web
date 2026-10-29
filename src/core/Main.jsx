import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Official WhatsApp Brand SVG Icon
const WhatsAppIcon = ({ className = 'w-7 h-7' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.004c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.483-8.413Z" />
  </svg>
);

export default function Main() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen w-full relative">
      <Header />
      <main className="flex-1 flex flex-col bg-cyber-bg w-full">
        {/* React Router will inject child routes here */}
        <Outlet />
      </main>
      <Footer />
      
      {/* Floating Action Controls on Right Side (WhatsApp & Scroll To Top - positioned directly above the Call Now widget) */}
      <div className="fixed bottom-[74px] right-3 sm:bottom-[78px] sm:right-4 lg:bottom-[84px] lg:right-5 z-50 flex flex-col items-end gap-3 pointer-events-none">
        {/* Floating Scroll To Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.7, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: 15 }}
              transition={{ duration: 0.25 }}
              onClick={scrollToTop}
              className="pointer-events-auto w-12 h-12 lg:w-13 lg:h-13 bg-white/95 text-[#0B4F9C] border border-[#0B4F9C]/20 hover:border-[#0B4F9C] hover:bg-[#0B4F9C] hover:text-white rounded-full flex items-center justify-center shadow-xl shadow-[#0B4F9C]/15 hover:shadow-2xl hover:shadow-[#0B4F9C]/30 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer group"
              aria-label="Scroll to top"
              title="Scroll to top"
            >
              <ArrowUp className="w-5 h-5 lg:w-6 lg:h-6 transition-transform duration-300 group-hover:-translate-y-1" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Floating WhatsApp Action */}
        <div className="pointer-events-auto relative flex items-center group">
          {/* Tooltip on hover (desktop) */}
          <div className="hidden sm:flex items-center gap-2 mr-3 px-3.5 py-1.5 rounded-full bg-[#0B1428]/95 text-white text-xs font-semibold shadow-2xl border border-white/15 backdrop-blur-md opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span>Chat on WhatsApp</span>
          </div>

          <a
            href="https://wa.me/61489986622"
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-14 h-14 bg-gradient-to-tr from-[#1EBE5D] to-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl shadow-[#25D366]/40 hover:shadow-[#25D366]/70 hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer"
            aria-label="Chat on WhatsApp"
            title="Chat with us on WhatsApp"
          >
            {/* Ambient radar pulse ring */}
            <span className="absolute -inset-1 rounded-full bg-[#25D366]/35 animate-ping -z-10 opacity-75 pointer-events-none" />

            {/* Official WhatsApp SVG Icon */}
            <WhatsAppIcon className="w-7 h-7 text-white fill-current drop-shadow-sm" />
          </a>
        </div>
      </div>
    </div>
  );
}
