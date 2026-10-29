import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import PageBanner from '../../components/common/PageBanner';
import CtaSection from '../../components/CtaSection';

// ─────────────────────────────────────────────────────────────────────────────
// Reviews now come live from Elfsight (Google Reviews widget) — no manual data.
// To change which reviews show or how they look, edit the widget in your
// Elfsight dashboard; the page updates automatically.
// ─────────────────────────────────────────────────────────────────────────────

const ELFSIGHT_APP_ID = '010a2b75-8df9-4d0d-935e-15b52281207d';
const ELFSIGHT_SRC = 'https://elfsightcdn.com/platform.js';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

function SectionHeading({ title, sub, text }) {
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
        className="text-4xl sm:text-5xl lg:text-[56px] font-black tracking-tight leading-[1.05] text-[#E8890C]"
      >
        {title}
      </motion.h2>
      <motion.div
        variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.7, ease: 'easeOut' } } }}
        style={{ originX: 0.5 }}
        className="h-1 w-24 bg-[#103F30] rounded-full mt-4 mx-auto"
      />
      <motion.p variants={fadeInUp} className="mt-5 text-lg sm:text-xl font-bold text-[#103F30]">
        {sub}
      </motion.p>
      <motion.p variants={fadeInUp} className="mt-2 text-sm sm:text-base leading-relaxed max-w-[640px] mx-auto text-black">
        {text}
      </motion.p>
    </motion.div>
  );
}

// Loads the Elfsight platform script. It is re-added on every visit to this page
// so the widget also appears when users arrive via in-app (React Router) navigation.
function GoogleReviewsWidget() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const existingScript = containerRef.current.querySelector('script[src*="widget.js"]');
    if (existingScript) existingScript.remove();

    const script = document.createElement('script');
    script.src = 'https://backend.ormconsult.com/embed/widget.js';
    script.setAttribute('data-widget-id', '43');
    script.setAttribute('data-widget-type', 'google_reviews');
    script.setAttribute('data-api-base', 'https://backend.ormconsult.com');
    script.async = true;

    containerRef.current.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-[360px] w-full">
      <div id="widgetcraft-43"></div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <div className="w-full min-h-screen bg-white font-sans text-[#E8890C] selection:bg-[#103F30] selection:text-white">
      <PageBanner
        title="Client Testimonials"
        breadcrumbs={[{ label: 'Testimonials' }]}
        bgImage="/bannerclient.jpg"
        className="!mb-0 lg:!mb-0"
      />

      <section className="relative w-full bg-[#F8FAFC] py-12 lg:py-16 overflow-hidden">
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What Our Clients Say"
            sub="Real results. Real relationships."
            text="Businesses across Australia, New Zealand, the UK, the US and India trust our brands and partners. Here is what they say about working with us."
          />
          <GoogleReviewsWidget />
        </div>
      </section>

      <div className="[&>*]:!py-6 lg:[&>*]:!py-8 [&>*]:!my-0">
        <CtaSection />
      </div>
    </div>
  );
}