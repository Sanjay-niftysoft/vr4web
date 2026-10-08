import { Share2, MessageCircle, Globe, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer 
      className="relative w-full font-['Poppins',sans-serif] text-gray-900 border-t-4 border-[#F97316] overflow-hidden pt-10 sm:pt-14 lg:pt-12 xl:pt-16 2xl:pt-20 pb-6 sm:pb-8 lg:pb-6 xl:pb-8 2xl:pb-10 bg-[#f7eedc]"
    >
      {/* 1. Base Seamless Parchment Texture (spans 100% width and height) */}
      <img
        src="/footer-parchment.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
      />

      {/* 2. Mobile/Tablet Background: for screens < lg */}
      <img
        src="/footer.png?v=3"
        alt=""
        aria-hidden="true"
        className="lg:hidden absolute inset-0 w-full h-full object-cover object-bottom select-none pointer-events-none"
      />

      {/* 3. Desktop Left Artwork (SYD Tag + Kangaroo) - Pinned to the Left Edge for lg+ */}
      <div 
        className="hidden lg:block absolute left-0 top-0 bottom-0 w-[200px] xl:w-[260px] 2xl:w-[330px] 3xl:w-[400px] overflow-hidden pointer-events-none select-none z-0"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, black 75%, transparent 100%)',
          maskImage: 'linear-gradient(to right, black 75%, transparent 100%)'
        }}
      >
        <img
          src="/footer.png?v=3"
          alt="Kangaroo Artwork"
          aria-hidden="true"
          className="absolute left-0 top-0 h-full w-auto max-w-none select-none pointer-events-none"
        />
      </div>

      {/* 4. Desktop Right Artwork (Boomerang + Australia Map) - Pinned to the Right Edge for lg+ */}
      <div 
        className="hidden lg:block absolute right-0 top-0 bottom-0 w-[220px] xl:w-[280px] 2xl:w-[350px] 3xl:w-[430px] overflow-hidden pointer-events-none select-none z-0"
        style={{
          WebkitMaskImage: 'linear-gradient(to left, black 75%, transparent 100%)',
          maskImage: 'linear-gradient(to left, black 75%, transparent 100%)'
        }}
      >
        <img
          src="/footer.png?v=3"
          alt="Australia Map Artwork"
          aria-hidden="true"
          className="absolute right-0 top-0 h-full w-auto max-w-none select-none pointer-events-none"
        />
      </div>

      {/* 5. Readability overlay on small screens only */}
      <div className="absolute inset-0 bg-[#FFF8E7]/35 lg:hidden pointer-events-none"></div>

      {/* 6. Content Container: Sized & padded so Kangaroo (left) and Australia Map (right) stay completely visible at 1024px & 1440px */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:pl-[195px] lg:pr-[215px] xl:pl-[255px] xl:pr-[275px] 2xl:pl-[325px] 2xl:pr-[345px] 3xl:pl-[380px] 3xl:pr-[410px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-3 xl:gap-6 2xl:gap-8 mb-8 sm:mb-10 lg:mb-6 xl:mb-10">

          {/* Brand Info */}
          <div className="lg:col-span-4 xl:col-span-4">
            <div className="mb-3 sm:mb-4 lg:mb-2.5 xl:mb-4">
              <img src="/vrlogo.png" alt="VR4WEB Logo" className="h-8 sm:h-10 lg:h-8 xl:h-11 2xl:h-14 w-auto object-contain" />
            </div>
            <p className="leading-relaxed max-w-sm 4xl:max-w-md mb-4 sm:mb-5 lg:mb-3 xl:mb-5 text-xs lg:text-[11px] xl:text-xs 2xl:text-sm text-gray-800">
              Pioneering the next generation of immersive web experiences, digital marketing, and enterprise solutions. Step into the future with us.
            </p>
            <div className="flex gap-2 sm:gap-2.5">
              {[
                { icon: Globe, link: "#" },
                { icon: MessageCircle, link: "#" },
                { icon: Share2, link: "#" },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  className="w-7 h-7 lg:w-6.5 lg:h-6.5 xl:w-8 xl:h-8 4xl:w-10 4xl:h-10 rounded-full bg-[#0B4F9C] border border-[#0B4F9C] flex items-center justify-center text-white hover:bg-[#F97316] hover:border-[#F97316] hover:shadow-[0_0_15px_rgba(249,115,22,0.5)] transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <item.icon className="w-3 h-3 lg:w-2.5 lg:h-2.5 xl:w-3.5 xl:h-3.5 4xl:w-4.5 4xl:h-4.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 xl:col-span-2">
            <h3 className="text-[#0B4F9C] font-bold mb-2.5 sm:mb-3 lg:mb-2 xl:mb-3.5 text-xs lg:text-[11.5px] xl:text-xs 2xl:text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-1.5 sm:space-y-2 lg:space-y-1.5 xl:space-y-2 text-xs lg:text-[11px] xl:text-xs 2xl:text-sm">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Services', path: '/services' },
                { name: 'Sectors', path: '/sectors' },
                { name: 'Contact Us', path: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.path} className="group flex items-center gap-1.5 text-gray-900 hover:text-[#F97316] transition-colors duration-300 whitespace-nowrap">
                    <span className="w-0 h-[1px] bg-[#F97316] transition-all duration-300 group-hover:w-2"></span>
                    <span className="group-hover:translate-x-0.5 transition-transform duration-300">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3 xl:col-span-3">
            <h3 className="text-[#0B4F9C] font-bold mb-2.5 sm:mb-3 lg:mb-2 xl:mb-3.5 text-xs lg:text-[11.5px] xl:text-xs 2xl:text-sm uppercase tracking-wider">Our Expertise</h3>
            <ul className="space-y-1.5 sm:space-y-2 lg:space-y-1.5 xl:space-y-2 text-xs lg:text-[11px] xl:text-xs 2xl:text-sm">
              {[
                'Web & eCommerce',
                'Web & Mobile Apps',
                'SEO & Digital Marketing',
                'UI/UX Design',
                'Custom Software Solutions'
              ].map((service) => (
                <li key={service}>
                  <a href="/services" className="group flex items-center gap-1.5 text-gray-900 hover:text-[#F97316] transition-colors duration-300">
                    <span className="w-0 h-[1px] bg-[#F97316] transition-all duration-300 group-hover:w-2"></span>
                    <span className="group-hover:translate-x-0.5 transition-transform duration-300">{service}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Info */}
          <div className="lg:col-span-3 xl:col-span-3">
            <h3 className="text-[#0B4F9C] font-bold mb-2.5 sm:mb-3 lg:mb-2 xl:mb-3.5 text-xs lg:text-[11.5px] xl:text-xs 2xl:text-sm uppercase tracking-wider">Get in Touch</h3>
            <ul className="space-y-2 sm:space-y-2.5 lg:space-y-1.5 xl:space-y-2.5 text-xs lg:text-[11px] xl:text-xs 2xl:text-sm mb-4">
              <li className="flex items-start gap-2 group">
                <Mail className="w-3.5 h-3.5 lg:w-3 lg:h-3 xl:w-4 xl:h-4 shrink-0 text-[#0B4F9C] group-hover:text-[#F97316] transition-colors mt-0.5" />
                <a href="mailto:hello@vr4web.io" className="text-gray-900 hover:text-[#F97316] transition-colors whitespace-nowrap">hello@vr4web.io</a>
              </li>
              <li className="flex items-start gap-2 group">
                <Phone className="w-3.5 h-3.5 lg:w-3 lg:h-3 xl:w-4 xl:h-4 shrink-0 text-[#0B4F9C] group-hover:text-[#F97316] transition-colors mt-0.5" />
                <a href="tel:+919444116316" className="text-gray-900 hover:text-[#F97316] transition-colors whitespace-nowrap">+91 94441 16316</a>
              </li>
              <li className="flex items-start gap-2 group">
                <MapPin className="w-3.5 h-3.5 lg:w-3 lg:h-3 xl:w-4 xl:h-4 shrink-0 text-[#0B4F9C] group-hover:text-[#F97316] transition-colors mt-0.5" />
                <span className="text-gray-900 leading-snug">2048 Cyber Avenue,<br />Neon City, TX</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#0B4F9C]/30 pt-4 sm:pt-5 lg:pt-3.5 xl:pt-5 mt-3 sm:mt-4 lg:mt-3 xl:mt-4 flex flex-col md:flex-row justify-between items-center gap-2 text-[11px] lg:text-[11px] xl:text-xs 2xl:text-sm text-gray-900">
          <p>
            &copy; {new Date().getFullYear()} VR4WEB.COM. All rights reserved. | Brand of{' '}
            <span className="font-bold">
              <a href="https://www.leadseo.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#F97316] transition-colors">
                Lead SEO Marketing Private Limited
              </a>
            </span>
            .
          </p>
          <div className="flex gap-3 sm:gap-4 lg:gap-3 xl:gap-5">
            <a href="#" className="hover:text-[#F97316] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#F97316] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#F97316] transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}