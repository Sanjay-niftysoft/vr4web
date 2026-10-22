import { Routes, Route } from 'react-router-dom';
import Main from '../core/Main';
import Home from '../components/Home';
import SectorsPage from '../components/SectorsPage';
import AboutUs from '../components/AboutUs';
import HowWeWork from '../components/HowWeWork';
import Gallery from '../components/Gallery';
import Client from '../components/Client';
import BrandsPartners from '../components/BrandsPartners';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Product from '../components/Product';
import EnquiryPage from '../shared/components/Enquirypage';
import Stories from '../components/Stories';
import CaseStudyDetails from '../components/CaseStudyDetails';
import Blogs from '../components/Blogs';
import BlogDetails from '../components/BlogDetails';
import Whitepaper from '../shared/components/Whitepaper';
import ServicesDetails from '../shared/components/servicesdetails';

// Placeholder components for the other routes so they don't break
const Placeholder = ({ title }) => (
 <div className="flex-1 flex items-center justify-center min-h-[50vh]">
 <h2 className="text-3xl text-[#111111] font-bold neon-text">{title} Page</h2>
 </div>
);

export default function AppRoutes() {
 return (
 <Routes>
 {/* The Main component wraps all these routes with Header and Footer */}
 <Route element={<Main />}>
 <Route path="/" element={<Home />} />
 <Route path="/about" element={<AboutUs />} />
 <Route path="/how-we-work" element={<HowWeWork />} />
 <Route path="/testimonials" element={<Testimonials />} />
 <Route path="/brands-partners" element={<BrandsPartners />} />
 <Route path="/client" element={<Client />} />
 <Route path="/services" element={<ServicesDetails />} />
 <Route path="/services/:categorySlug" element={<ServicesDetails />} />
 <Route path="/services/:categorySlug/:subServiceSlug" element={<ServicesDetails />} />
 <Route path="/sectors" element={<SectorsPage />} />
 <Route path="/stories" element={<Stories />} />
 <Route path="/stories/:id" element={<CaseStudyDetails />} />
 <Route path="/case-studies" element={<Stories />} />
 <Route path="/case-studies/:id" element={<CaseStudyDetails />} />
 <Route path="/our-work" element={<Placeholder title="Our Work" />} />
 <Route path="/blogs" element={<Blogs />} />
 <Route path="/blogs/:id" element={<BlogDetails />} />
 <Route path="/blog/:id" element={<BlogDetails />} />
 <Route path="/journal" element={<Blogs />} />
 <Route path="/white-paper" element={<Whitepaper />} />
 <Route path="/whitepaper" element={<Whitepaper />} />
 <Route path="/whitepapers" element={<Whitepaper />} />
 <Route path="/gallery" element={<Gallery />} />
 <Route path="/contact" element={<Contact />} />
 <Route path="/get-a-quote" element={<EnquiryPage />} />
 <Route path="/enquiry" element={<EnquiryPage />} />
 <Route path="/product" element={<Product />} />
 </Route>
 </Routes>
 );
}
