import { useState } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Newspaper,
  Image as GalleryIcon,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Shield,
  User,
  ExternalLink,
} from 'lucide-react';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  // Helper for page title from current route
  const getPageTitle = () => {
    const current = navItems.find((item) =>
      item.exact ? location.pathname === item.path || location.pathname === `${item.path}/` : location.pathname.startsWith(item.path)
    );
    return current ? current.name : 'Administration';
  };

  return (
    <div className="min-h-screen bg-[#06140E] text-slate-100 flex flex-col md:flex-row antialiased selection:bg-[#E8890C] selection:text-black">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 h-screen w-64 sm:w-72 bg-[#091D15] border-r border-emerald-900/40 flex flex-col transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-18 px-6 border-b border-emerald-900/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0E4935] to-[#072419] border border-[#E8890C]/40 flex items-center justify-center shadow-md">
              <Shield className="w-5 h-5 text-[#E8890C]" />
            </div>
            <div>
              <span className="font-black text-lg tracking-tight text-white">
                VR4WEB <span className="text-[#E8890C]">ADMIN</span>
              </span>
              <p className="text-[10px] text-emerald-400 font-mono tracking-wider">MANAGEMENT SUITE</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-emerald-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <p className="px-3 text-[11px] font-semibold text-emerald-400/50 uppercase tracking-widest mb-3">
            Core Modules
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
                    ? 'bg-[#E8890C] text-[#06140E] shadow-md shadow-[#E8890C]/20'
                    : 'text-emerald-100/70 hover:text-white hover:bg-emerald-950/60'
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-[#06140E]' : 'text-emerald-400'
                  }`}
                />
                <span className="flex-1">{item.name}</span>
                {isActive && <ChevronRight className="w-4 h-4 text-[#06140E]" />}
              </NavLink>
            );
          })}
        </nav>

        {/* Quick Link to Public Website */}
        <div className="px-4 py-3 border-t border-emerald-900/30">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium text-emerald-300/70 hover:text-white hover:bg-emerald-950/50 transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-[#E8890C]" />
            <span>View Public Website</span>
          </a>
        </div>

        {/* Admin Profile & Logout Footer */}
        <div className="p-4 border-t border-emerald-900/40 bg-[#06140E]/60">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-emerald-900/80 border border-emerald-700/50 flex items-center justify-center text-[#E8890C]">
              <User className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">
                {admin?.name || 'Administrator'}
              </p>
              <p className="text-[11px] text-emerald-300/60 font-mono truncate">
                {admin?.email || 'sanjay@niftysoft.in'}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-900/50 text-red-200 text-xs font-bold transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-18 px-4 sm:px-8 bg-[#091D15]/80 backdrop-blur-md border-b border-emerald-900/40 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg text-emerald-400 hover:text-white hover:bg-emerald-900/40"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <div className="flex items-center gap-2 text-xs text-emerald-400/70 font-mono">
                <span>VR4WEB</span>
                <span>/</span>
                <span className="text-[#E8890C] font-semibold">{getPageTitle()}</span>
              </div>
              <h1 className="text-lg sm:text-xl font-black text-white tracking-tight">
                {getPageTitle()}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-bold text-white">{admin?.name || 'SuperAdmin'}</span>
              <span className="text-[10px] text-emerald-400 font-mono">{admin?.email}</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
          </div>
        </header>

        {/* Dynamic Nested Route View */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
