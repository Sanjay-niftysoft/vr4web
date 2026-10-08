import PageBanner from './common/PageBanner';
import OurClientsSection from './OurClientsSection';

export default function Client() {
  return (
    <div className="bg-white min-h-screen">
      <PageBanner 
        title="Our Clients" 
        breadcrumbs={[{ label: 'Client' }]} 
        bgImage="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=2560&h=600"
      />
      <OurClientsSection />
    </div>
  );
}
