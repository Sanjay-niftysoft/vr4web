import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from '../../shared/components/admin/AdminSidebar';
import AdminHeader from '../../shared/components/admin/AdminHeader';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/stories')) return 'Stories';
    if (path.includes('/blogs')) return 'Blogs';
    if (path.includes('/newspaper')) return 'Newspaper Articles';
    if (path.includes('/gallery')) return 'Gallery Assets';
    return 'Dashboard Overview';
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] text-[#0F3D2E] flex flex-col md:flex-row antialiased selection:bg-[#E8890C] selection:text-white">
      {/* Light Sidebar */}
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Light Header */}
        <AdminHeader pageTitle={getPageTitle()} setSidebarOpen={setSidebarOpen} />

        {/* Dynamic Nested Route View */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
