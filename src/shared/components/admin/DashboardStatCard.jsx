import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function DashboardStatCard({
  title,
  value = 0,
  icon: Icon,
  link,
}) {
  return (
    <Link
      to={link}
      className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs hover:shadow-md hover:border-[#0F3D2E]/30 transition-all duration-200 group flex flex-col justify-between"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-[#F8FAF9] border border-[#E5E7EB] flex items-center justify-center text-[#0F3D2E] group-hover:bg-[#0F3D2E] group-hover:text-white transition-colors duration-200">
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex items-center gap-1 text-xs font-semibold text-[#E8890C] group-hover:translate-x-0.5 transition-transform">
          <span>Manage</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>

      <div>
        <div className="text-3xl sm:text-4xl font-black text-[#0F3D2E] tracking-tight mb-1">
          {value}
        </div>
        <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
          {title}
        </div>
      </div>
    </Link>
  );
}
