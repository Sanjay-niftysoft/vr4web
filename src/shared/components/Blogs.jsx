import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Home } from 'lucide-react';
import { getAllBlogs } from '../../data/blogsData';
import CtaSection from '../../components/CtaSection';

export default function Blogs() {
  const blogs = getAllBlogs();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="w-full min-h-screen bg-slate-50/60 font-sans text-[#111111] selection:bg-[#D7192D] selection:text-white">
      {/* ─── 1. HERO (matching Stories page banner height) ─── */}
      <section
        className="relative w-full overflow-hidden px-4 md:px-8 pt-32 pb-12 md:pt-36 md:pb-14 bg-cover bg-center border-b border-slate-200"
        style={{ backgroundImage: `url('/banner/5.png')` }}
      >
        <div className="absolute inset-0 bg-[#102448]/20 z-0" />

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-[0_4px_16px_rgba(16,36,72,0.45)] mb-3 leading-tight"
          >
            Blogs
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium bg-[#102448] text-white px-4 py-1.5 rounded-full shadow-md"
          >
            <Link to="/" className="flex items-center gap-1 hover:text-red-300 transition-colors">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/60" />
            <span className="font-semibold">Blogs</span>
          </motion.div>
        </div>
      </section>

      {/* ─── 2. BLOGS GRID SECTION (Matches Reference Image 1) ─── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, idx) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Card Image */}
              <div className="relative w-full h-52 sm:h-56 bg-slate-900 overflow-hidden">
                <img
                  src={blog.cardImage}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Card Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  {/* Date in Bold Red (Matches Image 1) */}
                  <span className="text-[#D7192D] text-xs font-extrabold uppercase tracking-wider block mb-2.5">
                    {blog.date}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#111111] tracking-tight leading-snug mb-3 group-hover:text-[#D7192D] transition-colors">
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 font-normal">
                    {blog.summary}
                  </p>
                </div>

                {/* Bottom View More Button (Matches Image 1) */}
                <div className="pt-4 border-t border-slate-100">
                  <Link
                    to={`/blogs/${blog.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#102448] group-hover:text-[#D7192D] transition-colors group/btn"
                  >
                    <span>View More</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ─── 3. BOTTOM CTA STRIP ─── */}
      <CtaSection />
    </div>
  );
}
