import PageBanner from './common/PageBanner';

export default function Product() {
 return (
 <div className="bg-white min-h-screen pb-24">
 <PageBanner 
 title="Our Products" 
 breadcrumbs={[{ label: 'Product' }]} 
 bgImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2560&h=600"
 />
 <div className="max-w-7xl mx-auto px-4 mt-12 text-center">
 <h2 className="text-3xl font-bold text-[#0B4F9C]">Innovative <span className="italic text-[#D37B5C]">Solutions</span></h2>
 <p className="mt-4 text-[#111111] font-normal max-w-2xl mx-auto">Discover our range of products designed to elevate your business.</p>
 </div>
 </div>
 );
}
