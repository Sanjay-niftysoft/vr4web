import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import authService from '../../services/authService';
import {
  BookOpen,
  FileText,
  Newspaper,
  Image as GalleryIcon,
  Plus,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';

export default function DashboardHome() {
  const [stats, setStats] = useState({
    totalStories: 0,
    totalBlogs: 0,
    totalNewspaper: 0,
    totalGallery: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await authService.getDashboardStats();
      if (res && res.success) {
        setStats(res.stats || { totalStories: 0, totalBlogs: 0, totalNewspaper: 0, totalGallery: 0 });
        setRecentActivity(res.recentActivity || []);
      }
    } catch (err) {
      setError(err.message || 'Failed to load dashboard telemetry');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: 'Total Stories',
      value: stats.totalStories,
      icon: BookOpen,
      link: '/admin/stories',
      color: 'from-emerald-500/20 to-emerald-900/30',
      border: 'border-emerald-500/30',
      iconColor: 'text-emerald-400',
    },
    {
      title: 'Total Blogs',
      value: stats.totalBlogs,
      icon: FileText,
      link: '/admin/blogs',
      color: 'from-amber-500/20 to-amber-900/30',
      border: 'border-[#E8890C]/30',
      iconColor: 'text-[#E8890C]',
    },
    {
      title: 'Newspaper Articles',
      value: stats.totalNewspaper,
      icon: Newspaper,
      link: '/admin/newspaper',
      color: 'from-blue-500/20 to-blue-900/30',
      border: 'border-blue-500/30',
      iconColor: 'text-blue-400',
    },
    {
      title: 'Gallery Images',
      value: stats.totalGallery,
      icon: GalleryIcon,
      link: '/admin/gallery',
      color: 'from-teal-500/20 to-teal-900/30',
      border: 'border-teal-500/30',
      iconColor: 'text-teal-400',
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0C2B1E] via-[#091D15] to-[#071710] border border-emerald-800/40 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8890C]/10 border border-[#E8890C]/30 text-[#E8890C] text-xs font-mono font-semibold mb-3">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>LIVE MERN SYSTEM OPERATIONAL</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Welcome back to <span className="text-[#E8890C]">VR4Web Control</span>
            </h2>
            <p className="text-emerald-200/70 text-sm mt-1 max-w-xl">
              Publish and maintain stories, tech blogs, Australian press releases, and high-resolution portfolio gallery assets in real time.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2.5">
            <Link
              to="/admin/stories?action=new"
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#E8890C] hover:bg-[#d07703] text-[#06140E] font-bold text-xs shadow-md transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>New Story</span>
            </Link>
            <Link
              to="/admin/blogs?action=new"
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 text-white font-bold text-xs transition-colors"
            >
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>New Blog</span>
            </Link>
            <Link
              to="/admin/gallery?action=new"
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 text-white font-bold text-xs transition-colors"
            >
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>Add Image</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Overview Stat Cards */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-32 bg-[#091D15]/60 border border-emerald-900/30 rounded-2xl animate-pulse flex items-center justify-center"
            >
              <Loader2 className="w-6 h-6 text-emerald-600 animate-spin" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="p-4 rounded-xl bg-red-950/50 border border-red-800 text-red-300 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <span>{error}</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                to={card.link}
                className={`p-6 rounded-2xl bg-gradient-to-br ${card.color} ${card.border} border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group relative overflow-hidden`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-black/40 ${card.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-emerald-400/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <div className="text-3xl font-black text-white tracking-tight mb-1">
                  {card.value}
                </div>
                <div className="text-xs font-semibold text-emerald-300/80 uppercase tracking-wider">
                  {card.title}
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Recent Activity Table */}
      <div className="bg-[#091D15] border border-emerald-900/40 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-emerald-900/30">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Recent Activity & Content</h3>
            <p className="text-xs text-emerald-300/60 mt-0.5">
              Real-time audit log of database records
            </p>
          </div>
          <button
            onClick={fetchDashboardData}
            className="text-xs text-[#E8890C] hover:text-[#f39518] font-mono cursor-pointer font-semibold"
          >
            Refresh Data
          </button>
        </div>

        {loading ? (
          <div className="py-12 flex justify-center items-center text-emerald-400">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : recentActivity.length === 0 ? (
          <div className="py-12 text-center text-emerald-300/50 text-sm">
            No recent content found in database. Create your first record above!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-200">
              <thead className="text-xs text-emerald-400/70 font-mono uppercase border-b border-emerald-900/40">
                <tr>
                  <th className="pb-3 font-semibold">Title / Item</th>
                  <th className="pb-3 font-semibold">Type</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Date</th>
                  <th className="pb-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-900/20 font-medium">
                {recentActivity.map((item) => (
                  <tr key={item._id} className="hover:bg-emerald-950/40 transition-colors">
                    <td className="py-3.5 pr-4 text-white max-w-xs truncate font-semibold">
                      {item.title}
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-emerald-900/50 text-emerald-200 border border-emerald-700/40">
                        {item.type}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          item.status === 'published' || item.status === 'visible'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60'
                            : 'bg-amber-950 text-amber-300 border border-amber-700/60'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {item.status || 'Active'}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4 text-xs text-emerald-400/60 font-mono">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="py-3.5 text-right">
                      <Link
                        to={
                          item.type === 'Story'
                            ? '/admin/stories'
                            : item.type === 'Blog'
                            ? '/admin/blogs'
                            : '/admin/newspaper'
                        }
                        className="text-xs text-[#E8890C] hover:underline font-semibold"
                      >
                        Manage →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
