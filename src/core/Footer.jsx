import { Share2, MessageCircle, Globe, MapPin, Phone, Mail } from 'lucide-react';

/*
  HOW THIS WORKS (no image size needed)
  - On lg+ the background <img> sits in normal flow with h-auto, so the footer is
    exactly as tall as the artwork at any width (1024 / 1440 / 1920 / 2560...).
    Kangaroo, SYD tag and the full Australia map are never cropped.
  - All content on lg+ is sized in "em", and the font-size is fluid
    (clamp(10px, 0.78vw, 22px)), so text, icons, spacing and logo grow and shrink
    together with the artwork. That fixes the 2560px look (small text in a huge footer).
  - Content is centered vertically and kept in the clear parchment area between
    the kangaroo (left) and the map (right).
  Tweaks: lg:min-h-[320px] = minimum footer height, lg:pl-[18%] / lg:pr-[22%] = side safe zones.
*/
export default function Footer() {
  return (
    <footer
      className="relative w-full overflow-hidden bg-[#f7e6bf] font-['Poppins',sans-serif] text-gray-900
                 border-t-4 border-[#F97316]
                 pt-10 pb-6 sm:pt-14 sm:pb-8 lg:p-0"
    >
      {/* Background artwork: fills box on mobile, defines the footer height on lg+ */}
      <img
        src="/footer.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-bottom select-none pointer-events-none
                   lg:static lg:block lg:h-auto lg:min-h-[320px] lg:object-center"
      />

      {/* Readability overlay: mobile / tablet only */}
      <div className="absolute inset-0 bg-[#FFF8E7]/60 lg:hidden pointer-events-none" />

      {/* Content */}
      <div
        className="relative z-10 w-full mx-auto px-4 sm:px-6 md:px-8
                   lg:absolute lg:inset-0 lg:flex lg:flex-col lg:justify-center
                   lg:px-0 lg:pl-[18%] lg:pr-[22%] lg:py-[1.5%]
                   lg:text-[clamp(10px,0.78vw,22px)]"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-x-[1.5em] lg:gap-y-0 mb-8 lg:mb-[1.4em]">

          {/* Brand Info */}
          <div className="lg:col-span-4">
            <div className="mb-3 lg:mb-[0.9em]">
              <img src="/vrlogo.png" alt="VR4WEB Logo" className="h-8 sm:h-10 lg:h-[3.4em] w-auto object-contain" />
            </div>
            <p className="leading-relaxed max-w-sm lg:max-w-none mb-4 lg:mb-[1.2em] text-xs lg:text-[1em] text-gray-800">
              Pioneering the next generation of immersive web experiences, digital marketing, and enterprise solutions. Step into the future with us.
            </p>
            <div className="flex gap-2 lg:gap-[0.7em]">
              {[
                { icon: Globe, link: '#' },
                { icon: MessageCircle, link: '#' },
                { icon: Share2, link: '#' },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  className="w-8 h-8 lg:w-[2.7em] lg:h-[2.7em] rounded-full bg-[#0B4F9C] border border-[#0B4F9C] flex items-center justify-center text-white hover:bg-[#F97316] hover:border-[#F97316] hover:shadow-[0_0_15px_rgba(249,115,22,0.5)] transition-all duration-300 hover:-translate-y-0.5"
                >
                  <item.icon className="w-3.5 h-3.5 lg:w-[1.2em] lg:h-[1.2em]" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-[#0B4F9C] font-bold mb-2.5 lg:mb-[1em] text-xs lg:text-[1em] uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-1.5 lg:space-y-[0.75em] text-xs lg:text-[1em]">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Services', path: '/services' },
                { name: 'Sectors', path: '/sectors' },
                { name: 'Contact Us', path: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.path} className="group flex items-center gap-1.5 text-gray-900 hover:text-[#F97316] transition-colors duration-300 whitespace-nowrap">
                    <span className="w-0 h-[1px] bg-[#F97316] transition-all duration-300 group-hover:w-2" />
                    <span className="group-hover:translate-x-0.5 transition-transform duration-300">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="text-[#0B4F9C] font-bold mb-2.5 lg:mb-[1em] text-xs lg:text-[1em] uppercase tracking-wider">Our Expertise</h3>
            <ul className="space-y-1.5 lg:space-y-[0.75em] text-xs lg:text-[1em]">
              {[
                'Web & eCommerce',
                'Web & Mobile Apps',
                'SEO & Digital Marketing',
                'UI/UX Design',
                'Custom Software Solutions',
              ].map((service) => (
                <li key={service}>
                  <a href="/services" className="group flex items-center gap-1.5 text-gray-900 hover:text-[#F97316] transition-colors duration-300">
                    <span className="w-0 h-[1px] bg-[#F97316] transition-all duration-300 group-hover:w-2" />
                    <span className="group-hover:translate-x-0.5 transition-transform duration-300">{service}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Info */}
          <div className="lg:col-span-3 min-w-0">
            <h3 className="text-[#0B4F9C] font-bold mb-2.5 lg:mb-[1em] text-xs lg:text-[1em] uppercase tracking-wider">Get in Touch</h3>
            <ul className="space-y-2 lg:space-y-[0.9em] text-xs lg:text-[1em]">
              <li className="flex items-start gap-2 lg:gap-[0.7em] group">
                <Mail className="w-3.5 h-3.5 lg:w-[1.25em] lg:h-[1.25em] shrink-0 text-[#0B4F9C] group-hover:text-[#F97316] transition-colors mt-0.5" />
                <a href="mailto:hello@vr4web.io" className="text-gray-900 hover:text-[#F97316] transition-colors break-words min-w-0">hello@vr4web.io</a>
              </li>
              <li className="flex items-start gap-2 lg:gap-[0.7em] group">
                <Phone className="w-3.5 h-3.5 lg:w-[1.25em] lg:h-[1.25em] shrink-0 text-[#0B4F9C] group-hover:text-[#F97316] transition-colors mt-0.5" />
                <a href="tel:+919444116316" className="text-gray-900 hover:text-[#F97316] transition-colors whitespace-nowrap">+91 94441 16316</a>
              </li>
              <li className="flex items-start gap-2 lg:gap-[0.7em] group">
                <MapPin className="w-3.5 h-3.5 lg:w-[1.25em] lg:h-[1.25em] shrink-0 text-[#0B4F9C] group-hover:text-[#F97316] transition-colors mt-0.5" />
                <span className="text-gray-900 leading-snug">2048 Cyber Avenue,<br />Neon City, TX</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: left-aligned, copyright on top and links below on lg+ */}
        <div className="border-t border-[#0B4F9C]/30 pt-3 lg:pt-[1em] flex flex-col md:flex-row lg:flex-col justify-between items-center md:items-center lg:items-start gap-2 lg:gap-[0.5em] text-[11px] lg:text-[1em] text-gray-900">
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} VR4WEB.COM. All rights reserved. | Brand of{' '}
            <a
              href="https://www.leadseo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold hover:text-[#F97316] transition-colors"
            >
              Lead SEO Marketing Private Limited
            </a>
            .
          </p>
          <div className="flex gap-3 lg:gap-[1.5em] whitespace-nowrap">
            <a href="#" className="hover:text-[#F97316] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#F97316] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#F97316] transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}