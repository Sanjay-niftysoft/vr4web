import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Share2, MessageCircle, Globe, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

/*
  HOW THIS WORKS
  - The background <img> is now an absolute "backdrop" (object-cover) on every screen size.
  - The content is in NORMAL FLOW, so the footer is always as tall as its content.
    The bottom bar (copyright line) can never be cut off or pushed outside the footer.
  - On lg+ the footer also has an aspect-ratio (lg:aspect-[1920/440]) so it keeps the
    artwork's proportions on big screens. If the content is taller, the footer simply grows.
    -> Set 1920/440 to your footer2.0.png width/height if you want the exact artwork ratio.
  - Text, icons and spacing on lg+ are in "em" with a fluid font-size, so everything scales together.
  Tweaks: lg:pl-[27%] / lg:pr-[24%] = side safe zones (kangaroo left, map right).
*/
// Clean Social SVGs
const SocialLinkedIn = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 lg:w-[1.4em] lg:h-[1.4em]" {...props}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m1.4 9.74V9.97H5.06v8.53h2.8z" />
  </svg>
);
const SocialInstagram = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 lg:w-[1.4em] lg:h-[1.4em]" {...props}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689-.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);
const SocialFacebook = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 lg:w-[1.4em] lg:h-[1.4em]" {...props}>
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
  </svg>
);
const SocialX = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 lg:w-[1.4em] lg:h-[1.4em]" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const SocialMaps = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 lg:w-[1.4em] lg:h-[1.4em]" {...props}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
  </svg>
);

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToHeroTop = (e) => {
    if (e) e.preventDefault();

    const doSlowScroll = () => {
      const heroEl = document.getElementById('hero');
      const targetY = heroEl ? heroEl.getBoundingClientRect().top + window.pageYOffset : 0;
      const startPosition = window.pageYOffset || document.documentElement.scrollTop;
      const distance = Math.abs(startPosition - targetY);

      if (distance < 5) return;

      // Slow, luxurious smooth scroll duration (~1500ms) for an elegant down-to-top glide
      const duration = 1500;
      let startTime = null;
      let animId = null;

      // Smooth easeInOutCubic for soft start, majestic motion, gentle landing
      const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const cleanup = () => {
        window.removeEventListener('wheel', interrupt);
        window.removeEventListener('touchmove', interrupt);
      };

      const interrupt = () => {
        if (animId) cancelAnimationFrame(animId);
        cleanup();
      };

      window.addEventListener('wheel', interrupt, { passive: true });
      window.addEventListener('touchmove', interrupt, { passive: true });

      const step = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = easeInOutCubic(progress);

        window.scrollTo(0, Math.round(startPosition + (targetY - startPosition) * ease));

        if (progress < 1) {
          animId = requestAnimationFrame(step);
        } else {
          cleanup();
          window.scrollTo(0, targetY);
        }
      };

      animId = requestAnimationFrame(step);
    };

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        doSlowScroll();
      }, 150);
    } else {
      doSlowScroll();
    }
  };

  return (
    <footer
      className="relative w-full overflow-hidden bg-[#f4ebd8] font-['Poppins',sans-serif] text-[#111111]
                 pt-10 pb-6 sm:pt-14 sm:pb-8
                 lg:py-0 lg:flex lg:flex-col lg:justify-center lg:aspect-[1920/440] lg:min-h-[320px]"
    >
      {/* Background artwork: always a backdrop, never defines content height */}
      <img
        src="/footer2.0.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-bottom lg:object-center select-none pointer-events-none"
      />

      {/* Readability overlay: mobile / tablet only */}
      <div className="absolute inset-0 bg-white/70 lg:hidden pointer-events-none" />

      {/* Content (in normal flow → footer always grows to fit it) */}
      <div
        className="relative z-10 w-full mx-auto px-4 sm:px-6 md:px-8
                   lg:px-0 lg:pl-[27%] lg:pr-[24%] lg:py-[1.6em]
                   lg:text-[clamp(9px,0.7vw,16px)]"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-x-[2.5em] lg:gap-y-0">

          {/* Brand Info */}
          <div className="lg:col-span-4">
            <div className="mb-6 lg:mb-[1.4em]">
              <a
                href="#hero"
                onClick={scrollToHeroTop}
                className="inline-block cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 group focus:outline-none"
                title="Back to Top"
                aria-label="VR4WEB - Scroll to hero section"
              >
                <img
                  src="/vr4web.png"
                  alt="VR4WEB Logo"
                  className="w-[220px] lg:w-[18em] h-auto object-contain transition-opacity duration-200 group-hover:opacity-90"
                />
              </a>
            </div>
            <p className="leading-relaxed max-w-sm lg:max-w-none mb-4 lg:mb-[1.4em] text-base lg:text-[1.1em] text-[#111111]">
              Pioneering the next generation of immersive web experiences, digital marketing, and enterprise solutions. Step into the future with us.
            </p>
            <div className="flex flex-wrap gap-3 lg:gap-[0.75em]">
              {[
                { icon: SocialLinkedIn, link: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: SocialInstagram, link: 'https://instagram.com', label: 'Instagram' },
                { icon: SocialFacebook, link: 'https://facebook.com', label: 'Facebook' },
                { icon: SocialX, link: 'https://x.com', label: 'X' },
                { icon: SocialMaps, link: 'https://maps.app.goo.gl/TE4BHQyxoyt74fJ66', label: 'Google Maps' },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="w-10 h-10 lg:w-[2.6em] lg:h-[2.6em] rounded-full bg-black/5 border border-black/10 flex items-center justify-center text-[#111111] hover:text-white hover:bg-[#FB0202] hover:border-[#FB0202] hover:shadow-[0_0_15px_rgba(217,36,25,0.5)] transition-all duration-300 hover:-translate-y-0.5"
                >
                  <item.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 pt-4 lg:pt-[0.5em]">
            <h3 className="text-[#111111] font-bold mb-4 lg:mb-[1em] text-sm lg:text-[0.95em] uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3 lg:space-y-[0.55em] text-base lg:text-[1.05em]">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Blogs', path: '/blogs' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'Stories', path: '/stories' },
                { name: 'Testimonials', path: '/testimonials' },
                { name: 'Services', path: '/services' },
                { name: 'Sectors', path: '/sectors' },
                { name: 'Enquiry', path: '/enquiry' },
                { name: 'Contact Us', path: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    onClick={link.path === '/' ? scrollToHeroTop : undefined}
                    className="group flex items-center gap-2.5 text-[#111111] hover:text-[#FB0202] transition-colors duration-300 whitespace-nowrap cursor-pointer"
                  >
                    <span className="w-0 h-[1.5px] bg-[#FB0202] transition-all duration-300 group-hover:w-3" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3 pt-4 lg:pt-[0.5em]">
            <h3 className="text-[#111111] font-bold mb-4 lg:mb-[1em] text-sm lg:text-[0.95em] uppercase tracking-wider">Our Services</h3>
            <ul className="space-y-3 lg:space-y-[0.55em] text-base lg:text-[1.05em]">
              {[
                { name: 'App Development', path: '/services/app-development' },
                { name: 'Software Application Development', path: '/services/software-application-development' },
                { name: 'Web Design and Development', path: '/services/web-design-and-development' },
                { name: 'E-commerce Solutions', path: '/services/e-commerce-solutions' },
                { name: 'Digital Marketing Solutions', path: '/services/digital-marketing-solutions' },
                { name: 'Creative Solutions', path: '/services/creative-solutions' },
                { name: 'Back Office Support', path: '/services/back-office-support' },
              ].map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.path}
                    className="group flex items-center gap-2.5 text-[#111111] hover:text-[#FB0202] transition-colors duration-300 cursor-pointer"
                  >
                    <span className="w-0 h-[1.5px] bg-[#FB0202] transition-all duration-300 group-hover:w-3" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Info */}
          <div className="lg:col-span-3 min-w-0 pt-4 lg:pt-[0.5em]">
            <h3 className="text-[#111111] font-bold mb-4 lg:mb-[1em] text-sm lg:text-[0.95em] uppercase tracking-wider">Get in Touch</h3>
            <ul className="space-y-3.5 lg:space-y-[0.9em] text-base lg:text-[1.05em]">
              <li className="flex items-start gap-3 lg:gap-[0.8em] group">
                <Mail className="w-5 h-5 lg:w-[1.4em] lg:h-[1.4em] shrink-0 text-[#111111] group-hover:text-[#FB0202] transition-colors mt-0.5" />
                <a href="mailto:info@niftysoft.com" className="text-[#111111] hover:text-[#FB0202] transition-colors min-w-0 font-medium break-all lg:break-normal lg:whitespace-nowrap">info@niftysoft.com</a>
              </li>
              <li className="flex items-start gap-3 lg:gap-[0.8em] group">
                <Phone className="w-5 h-5 lg:w-[1.4em] lg:h-[1.4em] shrink-0 text-[#111111] group-hover:text-[#FB0202] transition-colors mt-0.5" />
                <div className="flex flex-col gap-1 lg:gap-[0.4em]">
                  <a href="tel:+919444116316" className="text-[#111111] hover:text-[#FB0202] transition-colors whitespace-nowrap font-medium">+91 94441 16316 <span className="text-xs text-gray-500 font-normal">(India)</span></a>
                  <a href="tel:+61489986622" className="text-[#111111] hover:text-[#FB0202] transition-colors whitespace-nowrap font-medium">+61 489 986 622 <span className="text-xs text-gray-500 font-normal">(Australia)</span></a>
                </div>
              </li>
              <li className="flex items-start gap-3 lg:gap-[0.8em] group">
                <MapPin className="w-5 h-5 lg:w-[1.4em] lg:h-[1.4em] shrink-0 text-[#111111] group-hover:text-[#FB0202] transition-colors mt-0.5" />
                <div className="text-[#111111] leading-snug">
                  <span className="font-bold block text-xs lg:text-[0.8em] uppercase tracking-wider text-[#FB0202]">Development Center (India)</span>
                  <span>Unit No.23 Block I, SIDCO Electronic Complex,<br />Guindy, Chennai – 600 032</span>
                </div>
              </li>
              <li className="pt-2">
                <Link
                  to="/enquiry"
                  className="inline-flex items-center gap-1.5 whitespace-nowrap px-3.5 py-1.5 lg:px-[1em] lg:py-[0.5em] rounded-lg bg-[#FB0202] hover:bg-[#b51c12] text-white text-xs lg:text-[0.9em] font-bold shadow-sm transition-all hover:scale-105 cursor-pointer"
                >
                  <span>Submit an Enquiry</span>
                  <ArrowRight className="w-3.5 h-3.5 lg:w-[1em] lg:h-[1em]" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 lg:pt-[0.9em] flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4 lg:gap-[1em] text-[11px] lg:text-[0.85em] text-[#111111] w-full border-t border-[#111111]/10 mt-4 lg:mt-[1em]">
          <p className="w-full md:w-auto">
            &copy; {new Date().getFullYear()} VR4WEB.COM. All rights reserved. | Brand of{' '}
            <a
              href="https://www.leadseo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold hover:text-[#FB0202] transition-colors"
            >
              Lead SEO Marketing Private Limited
            </a>
            .
          </p>
          <div className="flex flex-wrap justify-center items-center gap-2 lg:gap-[0.5em] w-full md:w-auto">
            <a href="https://niftysoft.com/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="hover:text-[#FB0202] transition-colors">Terms and Conditions</a>
            <span className="text-[#111111]">|</span>
            <a href="https://niftysoft.com/privacypolicy" target="_blank" rel="noopener noreferrer" className="hover:text-[#FB0202] transition-colors">Privacy Policy</a>
            <span className="text-[#111111]">|</span>
            <a href="https://niftysoft.com/refund-cancellation-policy" target="_blank" rel="noopener noreferrer" className="hover:text-[#FB0202] transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}