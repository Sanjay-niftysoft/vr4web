import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronRight, Home } from 'lucide-react';
import { getAllBlogs } from '../../data/blogsData';
import CtaSection from '../../components/CtaSection';

// ─────────────────────────────────────────────────────────────────────────────
// COLOURS (change the whole page here)
//   GREEN  = #0F3D2E
//   YELLOW = #E8890C
//   WHITE  = #FFFFFF
// ─────────────────────────────────────────────────────────────────────────────

/* Hero background image (same as Case Studies) */
const HERO_BG = '/yellow.png';

/* Used only if a blog has no image at all */
const FALLBACK_IMG =
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80';

const EASE = [0.22, 1, 0.36, 1];

const imgFallback = (e) => {
  if (e.currentTarget.src !== FALLBACK_IMG) e.currentTarget.src = FALLBACK_IMG;
};

/* ───────── LEFT: one blog post row (image left, text right) ───────── */
function PostRow({ blog }) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="group grid grid-cols-1 sm:grid-cols-[minmax(0,320px)_1fr] lg:grid-cols-[minmax(0,300px)_1fr] gap-5 sm:gap-7 items-center pb-6 mb-6 border-b border-[#0F3D2E]/10 last:border-b-0 last:mb-0 last:pb-0"
    >
      {/* Image */}
      <Link
        to={`/blogs/${blog.id}`}
        aria-label={`Read blog: ${blog.title}`}
        className="block overflow-hidden rounded-md aspect-[4/3] bg-slate-100 shadow-[0_18px_40px_-20px_rgba(15,61,46,0.35)] outline-none focus-visible:ring-4 focus-visible:ring-[#E8890C]/40"
      >
        <img
          src={blog.cardImage || FALLBACK_IMG}
          alt={blog.title}
          loading="lazy"
          onError={imgFallback}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
        />
      </Link>

      {/* Text */}
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px]">
          <span className="inline-block rounded-full bg-[#E8890C] px-3.5 py-1 text-xs font-bold text-white">
            {blog.category || 'Article'}
          </span>
          {blog.date && <span className="font-medium text-black">{blog.date}</span>}
          <span className="font-medium text-black">
            By <span className="font-bold text-[#E8890C]">{blog.author || 'Admin'}</span>
          </span>
        </div>

        <h3 className="mt-3 text-2xl sm:text-[28px] font-extrabold tracking-tight leading-tight text-[#0F3D2E] transition-colors duration-300 group-hover:text-[#E8890C]">
          <Link to={`/blogs/${blog.id}`} className="outline-none focus-visible:underline">
            {blog.title}
          </Link>
        </h3>

        {blog.summary && (
          <p className="mt-3 text-[15px] leading-relaxed text-black line-clamp-3 max-w-[520px]">
            {blog.summary}
          </p>
        )}

        <Link
          to={`/blogs/${blog.id}`}
          className="mt-4 inline-flex items-center gap-2 border-b-2 border-[#E8890C] pb-0.5 text-sm font-bold text-[#0F3D2E] transition-colors duration-300 hover:text-[#E8890C]"
        >
          Read More
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
}

/* ───────── RIGHT: one item of the "all posts" list ───────── */
function SidebarItem({ blog, index }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: Math.min(index, 5) * 0.06, ease: EASE }}
      className="border-b border-[#0F3D2E]/10 last:border-b-0 py-4 first:pt-0 last:pb-0"
    >
      <Link
        to={`/blogs/${blog.id}`}
        aria-label={`Read blog: ${blog.title}`}
        className="group flex items-center gap-4 outline-none focus-visible:ring-4 focus-visible:ring-[#E8890C]/40 rounded-xl"
      >
        <div className="h-[92px] w-[84px] flex-shrink-0 overflow-hidden rounded-md bg-slate-100">
          <img
            src={blog.cardImage || FALLBACK_IMG}
            alt=""
            loading="lazy"
            onError={imgFallback}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="min-w-0">
          {blog.date && <p className="text-xs font-semibold text-black">{blog.date}</p>}
          <h4 className="mt-1 text-[16px] font-extrabold leading-snug text-[#0F3D2E] line-clamp-3 transition-colors duration-300 group-hover:text-[#E8890C]">
            {blog.title}
          </h4>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Blogs() {
  const blogs = getAllBlogs();

  /* Tags are shown only if your blog data has a `tags` array */
  const tags = useMemo(
    () => Array.from(new Set(blogs.flatMap((b) => (Array.isArray(b.tags) ? b.tags : [])))),
    [blogs]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-white font-sans text-[#0F3D2E] selection:bg-[#0F3D2E] selection:text-white">
      {/* ─── 1. HERO ─── */}
      <section
        className="relative w-full overflow-hidden px-4 md:px-8 pt-32 pb-8 md:pt-36 md:pb-9 bg-[rgb(240,231,195)] border-b border-slate-200"
      >
        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 leading-tight text-[#0F3D2E]"
          >
            Our Latest <span className="text-[#E8890C]">Blogs</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium bg-[#0F3D2E] text-white px-4 py-1.5 rounded-full shadow-md"
          >
            <Link to="/" className="flex items-center gap-1 hover:text-[#E8890C] transition-colors">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/60" />
            <span className="font-semibold">Blogs</span>
          </motion.div>
        </div>
      </section>

      {/* ─── 2. BLOG LIST (left: one by one) + SIDEBAR (right: all posts) ─── */}
      <section className="py-8 md:py-10 px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <span className="inline-block px-4 py-1 rounded-full bg-[#E8890C]/15 border border-[#E8890C] text-[#0F3D2E] text-sm font-bold mb-4">
            Latest Articles
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            <span className="text-[#0F3D2E]">Fresh Ideas,</span>{' '}
            <span className="text-[#E8890C]">Real Insights</span>
          </h2>

          <p className="text-black text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Practical tips, trends and lessons from our work in web, apps, AI and digital growth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-8 lg:gap-12 items-start">
          {/* LEFT: posts appear one by one as you scroll */}
          <div>
            {blogs.map((blog) => (
              <PostRow key={blog.id} blog={blog} />
            ))}
          </div>

          {/* RIGHT: sidebar showing all posts (stays in view while you scroll) */}
          <aside className="lg:sticky lg:top-28 space-y-8">
            <div className="rounded-lg border border-[#0F3D2E]/10 bg-white p-6 shadow-[0_18px_40px_-24px_rgba(15,61,46,0.35)]">
              <div className="mb-5">
                <h3 className="text-xl font-extrabold tracking-tight text-[#0F3D2E]">All Posts</h3>
                <span className="mt-2 block h-[3px] w-12 rounded-full bg-[#E8890C]" />
              </div>

              <div className="max-h-[560px] overflow-y-auto pr-1 [scrollbar-width:thin]">
                {blogs.map((blog, i) => (
                  <SidebarItem key={blog.id} blog={blog} index={i} />
                ))}
              </div>
            </div>

            {tags.length > 0 && (
              <div className="rounded-lg border border-[#0F3D2E]/10 bg-white p-6 shadow-[0_18px_40px_-24px_rgba(15,61,46,0.35)]">
                <div className="mb-5">
                  <h3 className="text-xl font-extrabold tracking-tight text-[#0F3D2E]">Tags</h3>
                  <span className="mt-2 block h-[3px] w-12 rounded-full bg-[#E8890C]" />
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#0F3D2E]/20 px-4 py-1.5 text-sm font-semibold text-[#0F3D2E] transition-colors duration-300 hover:border-[#E8890C] hover:bg-[#E8890C] hover:text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* ─── 3. CTA ─── */}
      <CtaSection />
    </div>
  );
}