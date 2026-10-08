import PageBanner from './common/PageBanner';

export default function Contact() {
 return (
 <div className="bg-white min-h-screen pb-24">
 <PageBanner 
 title="Contact Us" 
 breadcrumbs={[{ label: 'Contact Us' }]} 
 bgImage="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2560&h=600"
 />
 <div className="max-w-7xl mx-auto px-4 mt-12 text-center">
 <h2 className="text-3xl font-bold text-[#0B4F9C]">Get In <span className="italic text-[#D37B5C]">Touch</span></h2>
 <p className="mt-4 text-[#111111] font-normal max-w-2xl mx-auto">We'd love to hear from you. Reach out for any inquiries.</p>
 </div>
 </div>
 );
}
