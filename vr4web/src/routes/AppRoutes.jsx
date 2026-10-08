import { Routes, Route } from 'react-router-dom';
import Main from '../core/Main';
import Home from '../components/Home';
import SectorsPage from '../components/SectorsPage';

import { useSearchParams } from 'react-router-dom';

// Placeholder components for the other routes so they don't break
const Placeholder = ({ title }) => (
  <div className="flex-1 flex items-center justify-center min-h-[50vh]">
    <h2 className="text-3xl text-gray-400 font-bold neon-text">{title} Page</h2>
  </div>
);

const ServicesPage = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const item = searchParams.get('item');

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] px-4 py-20 text-center">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#172554] text-xs font-bold mb-4 shadow-sm">
        <span>Our Services</span>
        {category && (
          <>
            <span className="text-blue-300">•</span>
            <span>{category}</span>
          </>
        )}
      </div>
      <h1 className="text-3xl sm:text-5xl font-extrabold text-[#172554] mb-4 tracking-tight">
        {item || category || 'Our Services'}
      </h1>
      <p className="text-slate-600 max-w-lg text-sm sm:text-base mb-8 leading-relaxed">
        {item 
          ? `Comprehensive engineering and consulting solutions for ${item}. Full dedicated page coming soon.` 
          : 'Delivering end-to-end digital engineering and software architecture tailored for Australian businesses.'}
      </p>
      <div className="flex items-center gap-3">
        <a 
          href="/services" 
          className="px-5 py-2.5 rounded-xl bg-[#172554] hover:bg-[#1e3a8a] text-white font-bold text-xs shadow-md transition-colors"
        >
          All Services
        </a>
        <a 
          href="/contact" 
          className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs transition-colors"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default function AppRoutes() {
  return (
    <Routes>
      {/* The Main component wraps all these routes with Header and Footer */}
      <Route element={<Main />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Placeholder title="About Us" />} />
        <Route path="/how-we-work" element={<Placeholder title="How We Work" />} />
        <Route path="/testimonials" element={<Placeholder title="Testimonials" />} />
        <Route path="/brands-partners" element={<Placeholder title="Our Brands & Our Partners" />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/sectors" element={<SectorsPage />} />
        <Route path="/stories" element={<Placeholder title="Stories" />} />
        <Route path="/our-work" element={<Placeholder title="Our Work" />} />
        <Route path="/journal" element={<Placeholder title="Journal" />} />
        <Route path="/white-paper" element={<Placeholder title="White Paper" />} />
        <Route path="/gallery" element={<Placeholder title="Gallery" />} />
        <Route path="/contact" element={<Placeholder title="Contact Us" />} />
        <Route path="/get-a-quote" element={<Placeholder title="Get a Quote" />} />
      </Route>
    </Routes>
  );
}
