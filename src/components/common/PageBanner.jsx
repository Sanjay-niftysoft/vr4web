import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function PageBanner({ title, bgImage, breadcrumbs, className = "" }) {
  return (
    <div className={`relative w-full h-[332px] flex items-center justify-center overflow-hidden mb-12 lg:mb-16 shadow-[0_20px_50px_rgba(23,37,84,0.15)] border-b border-[#111111]/10 bg-[rgb(240,231,195)] ${className}`}>
      <div className="relative z-10 text-center px-4 w-full md:px-8 max-w-[1440px] mx-auto flex flex-col items-center mt-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-extrabold text-[#0F3D2E] tracking-tight mb-6 leading-tight text-[26px] min-[320px]:text-[28px] min-[768px]:text-[42px] min-[1040px]:text-[52px]"
        >
          {title}
        </motion.h1>

        {/* Breadcrumbs */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 text-[11px] min-[400px]:text-xs sm:text-sm font-medium text-white bg-[#0F3D2E] px-3 sm:px-4 py-1.5 rounded-xl sm:rounded-full shadow-sm max-w-full text-center"
        >
          <Link to="/" className="flex items-center gap-1.5 hover:text-[#E8890C] transition-colors">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          
          {breadcrumbs.map((crumb, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <ChevronRight className="w-3.5 h-3.5 text-white/60" />
              {crumb.path ? (
                <Link to={crumb.path} className="hover:text-[#E8890C] transition-colors">
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
