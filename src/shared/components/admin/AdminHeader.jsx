import { Menu, LogOut, ExternalLink, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminHeader({ pageTitle = 'Dashboard', setSidebarOpen }) {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/demo/vr4web/login', { replace: true });
  };

  return (
    <header className="h-20 px-4 sm:px-8 bg-white border-b border-[#E5E7EB] flex items-center justify-between sticky top-0 z-30 shadow-2xs">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden p-2 rounded-xl text-[#0F3D2E] hover:bg-[#F8FAF9] border border-[#E5E7EB] cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-xs text-[#64748B] font-medium">
            <span>VR4WEB</span>
            <span>/</span>
            <span className="text-[#E8890C] font-semibold">Admin</span>
            <span>/</span>
            <span className="text-[#0F3D2E] font-semibold">{pageTitle}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#0F3D2E] tracking-tight">
            {pageTitle}
          </h1>
        </div>
      </div>

      {/* Admin Profile & Actions */}
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="hidden sm:flex flex-col text-right">
          <span className="text-xs font-bold text-[#0F3D2E] flex items-center justify-end gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>{admin?.name || 'SuperAdmin'}</span>
          </span>
          <span className="text-[11px] text-[#64748B] font-mono">{admin?.email}</span>
        </div>

        <button
          onClick={handleLogout}
          className="p-2 sm:px-3 sm:py-2 rounded-xl bg-[#F8FAF9] hover:bg-red-50 border border-[#E5E7EB] hover:border-red-200 text-[#64748B] hover:text-[#DC2626] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          title="Sign out of admin session"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}

