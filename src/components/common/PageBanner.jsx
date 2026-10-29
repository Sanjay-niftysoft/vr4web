import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function PageBanner({ title, bgImage, breadcrumbs, className = "" }) {
  return (
    <div className={`relative w-full h-[332px] flex items-center justify-center overflow-hidden mb-12 lg:mb-16 shadow-[0_20px_50px_rgba(23,37,84,0.15)] border-b border-[#111111]/10 ${className}`}>
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src={bgImage || "/how-we-work-banner.jpg"} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative z-10 text-center px-4 w-full md:px-8 max-w-[1440px] mx-auto flex flex-col items-center mt-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-extrabold text-white tracking-tight mb-6 leading-tight text-[26px] min-[320px]:text-[28px] min-[768px]:text-[42px] min-[1040px]:text-[52px]"
        >
          {title}
        </motion.h1>

        {/* Breadcrumbs */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-2 text-sm sm:text-base font-medium text-white/90 bg-black/25 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/20"
        >
          <Link to="/" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          
          {breadcrumbs.map((crumb, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-white/70" />
              {crumb.path ? (
                <Link to={crumb.path} className="hover:text-white transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-white font-bold">{crumb.label}</span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
