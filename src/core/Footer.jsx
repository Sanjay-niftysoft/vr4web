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
                  src="/vrlogo.png"
                  alt="VR4WEB Logo"
                  className="w-[220px] lg:w-[18em] h-auto object-contain transition-opacity duration-200 group-hover:opacity-90"
                />
              </a>
            </div>
            <p className="leading-relaxed max-w-sm lg:max-w-none mb-4 lg:mb-[1.4em] text-base lg:text-[1.1em] text-[#111111]">
              Pioneering the next generation of immersive web experiences, digital marketing, and enterprise solutions. Step into the future with us.
            </p>
            <div className="flex gap-4 lg:gap-[1em]">
              {[
                { icon: Globe, link: '#' },
                { icon: MessageCircle, link: '#' },
                { icon: Share2, link: '#' },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  className="w-12 h-12 lg:w-[3em] lg:h-[3em] rounded-full bg-black/5 border border-black/10 flex items-center justify-center text-[#111111] hover:text-white hover:bg-[#D92419] hover:border-[#D92419] hover:shadow-[0_0_15px_rgba(217,36,25,0.5)] transition-all duration-300 hover:-translate-y-0.5"
                >
                  <item.icon className="w-5 h-5 lg:w-[1.4em] lg:h-[1.4em]" />
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
                    className="group flex items-center gap-2.5 text-[#111111] hover:text-[#D92419] transition-colors duration-300 whitespace-nowrap cursor-pointer"
                  >
                    <span className="w-0 h-[1.5px] bg-[#D92419] transition-all duration-300 group-hover:w-3" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3 pt-4 lg:pt-[0.5em]">
            <h3 className="text-[#111111] font-bold mb-4 lg:mb-[1em] text-sm lg:text-[0.95em] uppercase tracking-wider">Our Expertise</h3>
            <ul className="space-y-3 lg:space-y-[0.7em] text-base lg:text-[1.05em]">
              {[
                'Web & eCommerce',
                'Web & Mobile Apps',
                'SEO & Digital Marketing',
                'UI/UX Design',
                'Custom Software Solutions',
              ].map((service) => (
                <li key={service}>
                  <Link to="/services" className="group flex items-center gap-2.5 text-[#111111] hover:text-[#D92419] transition-colors duration-300 cursor-pointer">
                    <span className="w-0 h-[1.5px] bg-[#D92419] transition-all duration-300 group-hover:w-3" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{service}</span>
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
                <Mail className="w-5 h-5 lg:w-[1.4em] lg:h-[1.4em] shrink-0 text-[#111111] group-hover:text-[#D92419] transition-colors mt-0.5" />
                <a href="mailto:info@niftysoft.com" className="text-[#111111] hover:text-[#D92419] transition-colors min-w-0 font-medium break-all lg:break-normal lg:whitespace-nowrap">info@niftysoft.com</a>
              </li>
              <li className="flex items-start gap-3 lg:gap-[0.8em] group">
                <Phone className="w-5 h-5 lg:w-[1.4em] lg:h-[1.4em] shrink-0 text-[#111111] group-hover:text-[#D92419] transition-colors mt-0.5" />
                <div className="flex flex-col gap-1 lg:gap-[0.4em]">
                  <a href="tel:+919444116316" className="text-[#111111] hover:text-[#D92419] transition-colors whitespace-nowrap font-medium">+91 94441 16316</a>
                </div>
              </li>
              <li className="flex items-start gap-3 lg:gap-[0.8em] group">
                <MapPin className="w-5 h-5 lg:w-[1.4em] lg:h-[1.4em] shrink-0 text-[#111111] group-hover:text-[#D92419] transition-colors mt-0.5" />
                <div className="text-[#111111] leading-snug">
                  <span className="font-bold block text-xs lg:text-[0.8em] uppercase tracking-wider text-[#D92419]">Development Center (India)</span>
                  <span>Unit No.23 Block I, SIDCO Electronic Complex,<br />Guindy, Chennai – 600 032</span>
                </div>
              </li>
              <li className="pt-2">
                <Link
                  to="/enquiry"
                  className="inline-flex items-center gap-1.5 whitespace-nowrap px-3.5 py-1.5 lg:px-[1em] lg:py-[0.5em] rounded-lg bg-[#D92419] hover:bg-[#b51c12] text-white text-xs lg:text-[0.9em] font-bold shadow-sm transition-all hover:scale-105 cursor-pointer"
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
              className="font-bold hover:text-[#D92419] transition-colors"
            >
              Lead SEO Marketing Private Limited
            </a>
            .
          </p>
          <div className="flex flex-wrap justify-center items-center gap-2 lg:gap-[0.5em] w-full md:w-auto">
            <a href="https://niftysoft.com/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="hover:text-[#D92419] transition-colors">Terms and Conditions</a>
            <span className="text-[#111111]">|</span>
            <a href="https://niftysoft.com/privacypolicy" target="_blank" rel="noopener noreferrer" className="hover:text-[#D92419] transition-colors">Privacy Policy</a>
            <span className="text-[#111111]">|</span>
            <a href="https://niftysoft.com/refund-cancellation-policy" target="_blank" rel="noopener noreferrer" className="hover:text-[#D92419] transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}