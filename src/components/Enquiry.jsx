import PageBanner from './common/PageBanner';

export default function Enquiry() {
 return (
 <div className="bg-white min-h-screen pb-24">
 <PageBanner 
 title="Enquiry" 
 breadcrumbs={[{ label: 'Enquiry' }]} 
 bgImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2560&h=600"
 />
 <div className="max-w-7xl mx-auto px-4 mt-12 text-center">
 <h2 className="text-3xl font-bold text-[#0B4F9C]">Make an <span className="italic text-[#D37B5C]">Enquiry</span></h2>
 <p className="mt-4 text-[#111111] font-normal max-w-2xl mx-auto">Request a quote or more information about our services and products.</p>
 </div>
 </div>
 );
}
