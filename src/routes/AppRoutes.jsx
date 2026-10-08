import { Routes, Route } from 'react-router-dom';
import Main from '../core/Main';
import Home from '../components/Home';
import SectorsPage from '../components/SectorsPage';
import AboutUs from '../components/AboutUs';
import Gallery from '../components/Gallery';
import Client from '../components/Client';
import Contact from '../components/Contact';
import Product from '../components/Product';
import Enquiry from '../components/Enquiry';

import { useSearchParams } from 'react-router-dom';

// Placeholder components for the other routes so they don't break
const Placeholder = ({ title }) => (
 <div className="flex-1 flex items-center justify-center min-h-[50vh]">
 <h2 className="text-3xl text-[#111111] font-bold neon-text">{title} Page</h2>
 </div>
);

const ServicesPage = () => {
 const [searchParams] = useSearchParams();
 const category = searchParams.get('category');
 const item = searchParams.get('item');

 return (
 <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] px-4 py-20 text-center">
 <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#111111]/10 text-[#0B4F9C] text-xs font-bold mb-4 shadow-sm">
 <span>Our Services</span>
 {category && (
 <>
 <span className="text-[#F97316]">?</span>
 <span>{category}</span>
 </>
 )}
 </div>
 <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B4F9C] mb-4 tracking-tight">
 {item || category || 'Our Services'}
 </h1>
 <p className="text-[#111111] font-normal max-w-lg text-base sm:text-lg mb-8 leading-relaxed">
 {item 
 ? `Comprehensive engineering and consulting solutions for ${item}. Full dedicated page coming soon.` 
 : 'Delivering end- digital engineering and software architecture tailored for Australian businesses.'}
 </p>
 <div className="flex items-center gap-3">
 <a 
 href="/services" 
 className="px-5 py-2.5 rounded-xl bg-[#0B4F9C] hover:bg-[#0B4F9C] text-white font-semibold text-xs shadow-md transition-colors"
 >
 All Services
 </a>
 <a 
 href="/contact" 
 className="px-5 py-2.5 rounded-xl bg-white border border-[#111111]/10 text-[#111111] hover:bg-white font-semibold text-xs transition-colors"
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
 <Route path="/about" element={<AboutUs />} />
 <Route path="/how-we-work" element={<Placeholder title="How We Work" />} />
 <Route path="/testimonials" element={<Placeholder title="Testimonials" />} />
 <Route path="/brands-partners" element={<Client />} />
 <Route path="/client" element={<Client />} />
 <Route path="/services" element={<ServicesPage />} />
 <Route path="/sectors" element={<SectorsPage />} />
 <Route path="/stories" element={<Placeholder title="Stories" />} />
 <Route path="/our-work" element={<Placeholder title="Our Work" />} />
 <Route path="/journal" element={<Placeholder title="Journal" />} />
 <Route path="/white-paper" element={<Placeholder title="White Paper" />} />
 <Route path="/gallery" element={<Gallery />} />
 <Route path="/contact" element={<Contact />} />
 <Route path="/get-a-quote" element={<Enquiry />} />
 <Route path="/enquiry" element={<Enquiry />} />
 <Route path="/product" element={<Product />} />
 </Route>
 </Routes>
 );
}
