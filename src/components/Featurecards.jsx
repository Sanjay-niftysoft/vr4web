import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap } from 'lucide-react';

/* Palette: green #0F3D2E / #0A291E · yellow #E8890C
   Section title: green #0F3D2E with yellow #E8890C highlighted words */

/** Splits "Key Capabilities & Features of Android Development" → accent = text after the last " of " */
const splitTitle = (title = '') => {
    const t = String(title).trim();
    const i = t.toLowerCase().lastIndexOf(' of ');
    if (i > 0) return [t.slice(0, i + 4), t.slice(i + 4)];
    const w = t.split(/\s+/);
    const tail = w.pop() || '';
    return [w.join(' ') + (w.length ? ' ' : ''), tail];
};

function CapabilityCard({ item, idx, Icon }) {
    /* green / white checkerboard: 01 green, 02 white, 03 white, 04 green, 05 green, 06 white */
    const navy = (Math.floor(idx / 2) + (idx % 2)) % 2 === 0;
    const points = item.points || [];

    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: (idx % 2) * 0.08, ease: 'easeOut' }}
            className={`group relative isolate overflow-hidden rounded-[20px] border p-5 sm:p-7 pb-6
                transition-all duration-300 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0
                ${navy
                    ? 'bg-gradient-to-br from-[#0A291E] via-[#0F3D2E] to-[#124A37] border-[#E8890C]/30 hover:border-[#E8890C]/70 shadow-[0_18px_40px_rgba(15,61,46,0.35)] hover:shadow-[0_24px_52px_rgba(15,61,46,0.45)]'
                    : 'bg-white border-[#E8ECF3] hover:border-[#E8890C]/60 shadow-[0_14px_34px_rgba(15,61,46,0.08)] hover:shadow-[0_22px_48px_rgba(232,137,12,0.18)]'}`}
        >
            {/* decorative: diagonal gold highlight */}
            <span
                aria-hidden="true"
                className={`pointer-events-none absolute right-0 bottom-0 h-full w-2/5 -z-10 [clip-path:polygon(100%_0,100%_100%,0_100%)] bg-gradient-to-tr from-transparent ${navy ? 'to-[#E8890C]/20' : 'to-[#E8890C]/15'}`}
            />

            {/* badge */}
            {item.badge && (
                <span className="absolute top-4 right-4 sm:top-5 sm:right-5 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#E8890C] to-[#FFA726] px-3 py-1.5 text-[11px] sm:text-xs font-bold text-white shadow-sm max-w-[48%]">
                    <Zap className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">{item.badge}</span>
                </span>
            )}

            {/* icon */}
            <span
                className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none
                ${navy ? 'bg-[#0A291E] border-[#E8890C]/60 shadow-[0_0_24px_rgba(232,137,12,0.18)]' : 'bg-[#0F3D2E] border-[#E8890C]/50 shadow-md'}`}
            >
                <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-[#E8890C]" strokeWidth={1.6} />
            </span>

            <h3 className={`mt-4 text-lg sm:text-xl font-extrabold leading-snug ${navy ? 'text-white' : 'text-[#0F3D2E]'}`}>
                {item.title}
            </h3>
            <p className={`mt-2 text-sm leading-relaxed ${navy ? 'text-white' : 'text-black'}`}>
                {item.description}
            </p>

            {points.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-2">
                    {points.map((pt, p) => (
                        <li
                            key={p}
                            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold
                            ${navy ? 'bg-white/10 border-white/15 text-white' : 'bg-[#F2F7F4] border-[#D6E6DE] text-[#0F3D2E]'}`}
                        >
                            <span className="flex-shrink-0 w-4 h-4 rounded-full bg-[#E8890C] text-white flex items-center justify-center">
                                <Check className="w-2.5 h-2.5" strokeWidth={4} />
                            </span>
                            {pt}
                        </li>
                    ))}
                </ul>
            )}
        </motion.article>
    );
}

/**
 * Props:
 *   features    – `features` object from servicesdata ({ badge, title, description, items })
 *   resolveIcon – smartIcon(name, text, idx) helper from ServicesDetails
 * Renders the whole section (heading + cards), id="features-section".
 */
export default function FeatureCards({ features, resolveIcon }) {
    const items = features?.items || [];
    const [lead, accent] = splitTitle(features?.title);

    return (
        <section
            id="features-section"
            className="relative scroll-mt-32 overflow-hidden bg-[#FAF7F2] bg-cover bg-center py-8 sm:py-10 lg:py-12"
        >
            <img
                src="/services-home.png"
                alt="Services Background"
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none opacity-20"
            />
            {/* ivory wash keeps the background image subtle and the text readable */}
            <div aria-hidden="true" className="absolute inset-0 bg-[#FAF7F2]/80 pointer-events-none" />

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* heading */}
                <div className="text-center mx-auto max-w-3xl mb-8 sm:mb-10">
                    <div className="inline-flex flex-col items-center mb-3">
                        <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.25em] text-[#0F3D2E]">
                            Capabilities &amp; Innovations
                        </span>
                        <span aria-hidden="true" className="mt-2 block h-1 w-[70px] rounded-full bg-[#E8890C]" />
                    </div>
                    <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-tight text-[#0F3D2E]">
                        {lead}
                        <span className="text-[#E8890C]">{accent}</span>
                    </h2>
                    {features?.description && (
                        <p className="mt-4 text-sm sm:text-base leading-relaxed text-black">{features.description}</p>
                    )}
                </div>

                {/* cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {items.map((item, idx) => (
                        <CapabilityCard
                            key={idx}
                            item={item}
                            idx={idx}
                            Icon={resolveIcon(item.iconName, `${item.title} ${item.badge || ''}`, idx)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}