import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import authService from '../../services/authService';
import DashboardStatCard from '../../shared/components/admin/DashboardStatCard';
import EmptyState from '../../shared/components/admin/EmptyState';
import LoadingSpinner from '../../shared/components/admin/LoadingSpinner';
import {
  BookOpen,
  FileText,
  Newspaper,
  Image as GalleryIcon,
  Plus,
  Clock,
  Sparkles,
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

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await authService.getDashboardStats();
      if (res && res.success) {
        setStats(res.stats || { totalStories: 0, totalBlogs: 0, totalNewspaper: 0, totalGallery: 0 });
        setRecentActivity(res.recentActivity || []);
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner - Clean Light Theme */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#0F3D2E] text-xs font-mono font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#E8890C]" />
              <span>VR4WEB LIVE PRODUCTION ENGINE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F3D2E] tracking-tight">
              Welcome back to <span className="text-[#E8890C]">VR4Web Control</span>
            </h2>
            <p className="text-[#64748B] text-sm mt-1.5 max-w-xl leading-relaxed">
              Publish and maintain stories, tech blogs, Australian press releases, and gallery assets in real time.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Link
              to="/admin/stories?action=new"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E8890C] hover:bg-[#d07703] text-white font-bold text-xs shadow-xs hover:shadow transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>New Story</span>
            </Link>
            <Link
              to="/admin/blogs?action=new"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-[#F8FAF9] border border-[#0F3D2E] text-[#0F3D2E] font-bold text-xs shadow-2xs transition-all"
            >
              <Plus className="w-4 h-4 text-[#E8890C]" />
              <span>New Blog</span>
            </Link>
            <Link
              to="/admin/gallery?action=new"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-[#F8FAF9] border border-[#0F3D2E] text-[#0F3D2E] font-bold text-xs shadow-2xs transition-all"
            >
              <Plus className="w-4 h-4 text-[#E8890C]" />
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
              className="h-32 bg-white border border-[#E5E7EB] rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <DashboardStatCard
            title="Total Stories"
            value={stats.totalStories}
            icon={BookOpen}
            link="/admin/stories"
          />
          <DashboardStatCard
            title="Total Blogs"
            value={stats.totalBlogs}
            icon={FileText}
            link="/admin/blogs"
          />
          <DashboardStatCard
            title="Newspaper Articles"
            value={stats.totalNewspaper}
            icon={Newspaper}
            link="/admin/newspaper"
          />
          <DashboardStatCard
            title="Gallery Images"
            value={stats.totalGallery}
            icon={GalleryIcon}
            link="/admin/gallery"
          />
        </div>
      )}

      {/* Recent Activity Section */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-7 shadow-xs">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E5E7EB]">
          <div>
            <h3 className="text-lg font-bold text-[#0F3D2E] tracking-tight">Recent Activity & Content</h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              Live database records aggregated from MongoDB
            </p>
          </div>
          <button
            onClick={fetchDashboardData}
            className="text-xs text-[#E8890C] hover:text-[#d07703] font-mono font-semibold cursor-pointer"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <LoadingSpinner text="Retrieving live records..." />
        ) : recentActivity.length === 0 ? (
          <EmptyState
            title="No Recent Content"
            description="No stories, blogs, or articles have been created yet. Click above to add your first post!"
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs text-[#0F3D2E] font-bold uppercase border-b border-[#E5E7EB] bg-[#F8FAF9]">
                <tr>
                  <th className="py-3 px-4 rounded-l-lg">Title / Item</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right rounded-r-lg">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB] text-[#0F3D2E]">
                {recentActivity.map((item) => (
                  <tr key={item._id} className="hover:bg-[#F8FAF9] transition-colors">
                    <td className="py-3.5 px-4 font-semibold max-w-xs truncate">
                      {item.title}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-[#F8FAF9] text-[#0F3D2E] border border-[#E5E7EB]">
                        {item.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          item.status === 'published' || item.status === 'visible'
                            ? 'bg-emerald-50 text-[#16A34A] border border-emerald-200'
                            : 'bg-amber-50 text-[#E8890C] border border-amber-200'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {item.status || 'Active'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-[#64748B] font-mono">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#64748B]" />
                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        to={
                          item.type === 'Story'
                            ? '/admin/stories'
                            : item.type === 'Blog'
                            ? '/admin/blogs'
                            : '/admin/newspaper'
                        }
                        className="text-xs font-bold text-[#E8890C] hover:underline"
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
