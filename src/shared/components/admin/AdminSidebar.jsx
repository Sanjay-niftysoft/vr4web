import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Newspaper,
  Image as GalleryIcon,
  LogOut,
  X,
  ExternalLink,
  User,
} from 'lucide-react';

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
  const { admin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/demo/vr4web/login', { replace: true });
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Stories', path: '/admin/stories', icon: BookOpen },
    { name: 'Blogs', path: '/admin/blogs', icon: FileText },
    { name: 'Newspaper', path: '/admin/newspaper', icon: Newspaper },
    { name: 'Gallery', path: '/admin/gallery', icon: GalleryIcon },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 md:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 h-screen w-64 sm:w-72 bg-white border-r border-[#E5E7EB] flex flex-col transition-transform duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-20 px-6 border-b border-[#E5E7EB] flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <img
              src="/vr4web.png"
              alt="VR4WEB Logo"
              className="h-9 w-auto object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div>
              <span className="font-extrabold text-base tracking-tight text-[#0F3D2E] block">
                VR4WEB <span className="text-[#E8890C]">ADMIN</span>
              </span>
              <p className="text-[10px] text-[#64748B] font-mono tracking-wider uppercase font-semibold">
                Management Suite
              </p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-[#64748B] hover:text-[#0F3D2E] p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <p className="px-3 text-[11px] font-bold text-[#64748B]/80 uppercase tracking-wider mb-3">
            Admin Modules
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? location.pathname === item.path || location.pathname === `${item.path}/`
              : location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.exact}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all group ${
                  isActive
                    ? 'bg-[#0F3D2E] text-white shadow-sm'
                    : 'text-[#0F3D2E] hover:bg-[#F8FAF9] hover:text-[#0F3D2E]'
                }`}
              >
                <div
                  className={`p-1.5 rounded-lg transition-colors ${
                    isActive ? 'bg-[#E8890C] text-white' : 'text-[#0F3D2E] group-hover:text-[#E8890C]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="flex-1">{item.name}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8890C]"></span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Quick Link to Public Website */}
        <div className="px-4 py-3 border-t border-[#E5E7EB]">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-[#0F3D2E] hover:bg-[#F8FAF9] transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-[#E8890C]" />
            <span>Open Public Website</span>
          </a>
        </div>

        {/* Admin Profile & Logout Footer */}
        <div className="p-4 border-t border-[#E5E7EB] bg-[#F8FAF9]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-white border border-[#E5E7EB] shadow-xs flex items-center justify-center text-[#0F3D2E]">
              <User className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[#0F3D2E] truncate">
                {admin?.name || 'VR4Web Admin'}
              </p>
              <p className="text-[11px] text-[#64748B] font-mono truncate">
                {admin?.email || 'sanjay@niftysoft.in'}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white hover:bg-red-50 border border-[#E5E7EB] hover:border-red-200 text-[#DC2626] text-xs font-bold transition-all shadow-2xs cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
