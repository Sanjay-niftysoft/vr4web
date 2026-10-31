import { Routes, Route, Link, Navigate } from 'react-router-dom';
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
import PrivacyPolicy from '../components/PrivacyPolicy';

// Admin Auth & Dashboard Components
import AdminLogin from '../pages/AdminLogin/AdminLogin';
import AdminRoute from './AdminRoute';
import DashboardLayout from '../pages/AdminDashboard/DashboardLayout';
import DashboardHome from '../pages/AdminDashboard/DashboardHome';
import StoriesModule from '../pages/AdminDashboard/Stories';
import BlogsModule from '../pages/AdminDashboard/Blogs';
import NewspaperModule from '../pages/AdminDashboard/Newspaper';
import GalleryModule from '../pages/AdminDashboard/Gallery';

// 404 Catch-All Component with navigation recovery
const NotFound = () => (
  <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] px-4 text-center py-16">
    <span className="text-7xl font-black text-[#E8890C] mb-2 tracking-tight">404</span>
    <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] mb-3">Page Not Found</h1>
    <p className="text-slate-600 max-w-md mb-8 text-base">
      The page you are looking for doesn't exist, has been moved, or the link may be outdated.
    </p>
    <div className="flex flex-wrap gap-4 justify-center">
      <Link
        to="/"
        className="px-6 py-3 rounded-xl bg-[#0F3D2E] text-white font-bold hover:bg-[#E8890C] transition-colors shadow-md"
      >
        Return to Home
      </Link>
      <Link
        to="/services"
        className="px-6 py-3 rounded-xl bg-white border border-[#0F3D2E] text-[#0F3D2E] font-bold hover:bg-slate-50 transition-colors"
      >
        Explore Services
      </Link>
      <Link
        to="/contact"
        className="px-6 py-3 rounded-xl bg-[#E8890C] text-white font-bold hover:bg-[#d07703] transition-colors"
      >
        Contact Us
      </Link>
    </div>
  </div>
);

export default function AppRoutes() {
  return (
    <Routes>
      {/* Dedicated Admin Login Route (Direct URL access only) */}
      <Route path="/demo/vr4web/login" element={<AdminLogin />} />
      <Route path="/login" element={<Navigate to="/demo/vr4web/login" replace />} />
      <Route path="/admin/login" element={<Navigate to="/demo/vr4web/login" replace />} />

      {/* Protected Admin Dashboard Suite */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <DashboardLayout />
          </AdminRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="stories" element={<StoriesModule />} />
        <Route path="blogs" element={<BlogsModule />} />
        <Route path="newspaper" element={<NewspaperModule />} />
        <Route path="gallery" element={<GalleryModule />} />
      </Route>

      {/* Public Website Routes (Wrapped with Header and Footer) */}
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
        <Route path="/our-work" element={<Stories />} />
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
        <Route path="/get-quote" element={<EnquiryPage />} />
        <Route path="/enquiry" element={<EnquiryPage />} />
        <Route path="/product" element={<Product />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        {/* Catch-all 404 handler */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
