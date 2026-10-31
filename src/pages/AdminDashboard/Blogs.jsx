import { useState, useEffect } from 'react';
import authService from '../../services/authService';
import ConfirmDeleteModal from '../../shared/components/admin/ConfirmDeleteModal';
import EmptyState from '../../shared/components/admin/EmptyState';
import LoadingSpinner from '../../shared/components/admin/LoadingSpinner';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  FileText,
} from 'lucide-react';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Technology & AI',
    author: 'VR4Web Insights',
    readTime: '5 min read',
    summary: '',
    content: '',
    imageUrl: '/blogs/blogs-banner.png',
    tags: 'AI, GEO, AEO, Architecture',
    status: 'published',
  });

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await authService.getBlogs({ search, status: statusFilter });
      if (res && res.success) {
        setBlogs(res.data || []);
      }
    } catch (err) {
      setFeedback({ type: 'error', message: err.message || 'Error loading blogs' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBlogs();
    }, 250);
    return () => clearTimeout(timer);
  }, [search, statusFilter]);

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title || '',
        category: item.category || 'Technology & AI',
        author: item.author || 'VR4Web Insights',
        readTime: item.readTime || '5 min read',
        summary: item.summary || '',
        content: item.content || '',
        imageUrl: item.imageUrl || '/blogs/blogs-banner.png',
        tags: Array.isArray(item.tags) ? item.tags.join(', ') : item.tags || '',
        status: item.status || 'published',
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: '',
        category: 'Technology & AI',
        author: 'VR4Web Insights',
        readTime: '5 min read',
        summary: '',
        content: '',
        imageUrl: '/blogs/blogs-banner.png',
        tags: 'AI, GEO, AEO, Architecture',
        status: 'published',
      });
    }
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setSaving(true);
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
      };

      if (editingItem) {
        await authService.updateBlog(editingItem._id, payload);
        setFeedback({ type: 'success', message: 'Blog article updated successfully' });
      } else {
        await authService.createBlog(payload);
        setFeedback({ type: 'success', message: 'Blog article created successfully' });
      }
      setModalOpen(false);
      fetchBlogs();
    } catch (err) {
      setFeedback({ type: 'error', message: err.response?.data?.message || err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await authService.deleteBlog(deleteTarget._id);
      setFeedback({ type: 'success', message: 'Blog article deleted' });
      setDeleteTarget(null);
      fetchBlogs();
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0F3D2E] tracking-tight">
            Blogs & Insights Management
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Author and schedule engineering articles and industry thought pieces
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E8890C] hover:bg-[#d07703] text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Blog</span>
        </button>
      </div>

      {/* Feedback Alert */}
      {feedback && (
        <div
          className={`p-4 rounded-xl text-xs sm:text-sm flex items-center justify-between border ${
            feedback.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-[#16A34A]'
              : 'bg-red-50 border-red-200 text-[#DC2626]'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
            ) : (
              <AlertCircle className="w-4 h-4 text-[#DC2626]" />
            )}
            <span className="font-medium">{feedback.message}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white border border-[#E5E7EB] p-4 rounded-2xl shadow-2xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input
            type="text"
            placeholder="Search blogs by title, summary, or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-sm text-[#0F3D2E] placeholder-[#94A3B8] focus:bg-white focus:outline-none focus:border-[#E8890C]"
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#F8FAF9] border border-[#E5E7EB] text-[#0F3D2E] text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#E8890C] font-medium"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-xs overflow-hidden">
        {loading ? (
          <LoadingSpinner text="Loading blogs from database..." />
        ) : blogs.length === 0 ? (
          <EmptyState
            title="No Blog Articles"
            description="No articles found. Click 'Add New Blog' to publish your first post!"
            actionText="Add New Blog"
            onAction={() => handleOpenModal()}
            icon={FileText}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F8FAF9] text-xs font-bold uppercase text-[#0F3D2E] border-b border-[#E5E7EB]">
                <tr>
                  <th className="py-3.5 px-6">Blog Title</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Read Time</th>
                  <th className="py-3.5 px-4">Tags</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB] text-[#0F3D2E]">
                {blogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-[#F8FAF9] transition-colors">
                    <td className="py-4 px-6 font-bold max-w-sm truncate">
                      {blog.title}
                    </td>
                    <td className="py-4 px-4 text-xs font-semibold text-[#0F3D2E]/80">
                      {blog.category}
                    </td>
                    <td className="py-4 px-4 text-xs font-mono text-[#64748B]">
                      {blog.readTime || '5 min'}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {blog.tags?.slice(0, 2).map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#F8FAF9] text-[#0F3D2E] border border-[#E5E7EB]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          blog.status === 'published'
                            ? 'bg-emerald-50 text-[#16A34A] border border-emerald-200'
                            : blog.status === 'draft'
                            ? 'bg-amber-50 text-[#E8890C] border border-amber-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {blog.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => handleOpenModal(blog)}
                        className="p-1.5 rounded-lg bg-[#F8FAF9] hover:bg-slate-100 text-[#0F3D2E] border border-[#E5E7EB] transition-colors cursor-pointer"
                        title="Edit Blog"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(blog)}
                        className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-[#DC2626] border border-red-200 transition-colors cursor-pointer"
                        title="Delete Blog"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit / Create Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white border border-[#E5E7EB] rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between bg-[#F8FAF9]">
              <h3 className="font-black text-[#0F3D2E] text-lg">
                {editingItem ? 'Edit Blog Article' : 'Create New Blog Article'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-[#64748B] hover:text-[#0F3D2E] p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-xs font-bold text-[#0F3D2E] mb-1.5 uppercase">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. The Future of AI Search Visibility"
                  className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-[#0F3D2E] text-sm focus:bg-white focus:outline-none focus:border-[#E8890C]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F3D2E] mb-1.5 uppercase">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-[#0F3D2E] text-sm focus:bg-white focus:outline-none focus:border-[#E8890C]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0F3D2E] mb-1.5 uppercase">
                    Author
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-[#0F3D2E] text-sm focus:bg-white focus:outline-none focus:border-[#E8890C]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0F3D2E] mb-1.5 uppercase">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-[#0F3D2E] text-sm focus:bg-white focus:outline-none focus:border-[#E8890C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F3D2E] mb-1.5 uppercase">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="AI, GEO, AEO, Architecture"
                  className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-[#0F3D2E] text-sm focus:bg-white focus:outline-none focus:border-[#E8890C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F3D2E] mb-1.5 uppercase">
                  Image URL / Asset Path
                </label>
                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-[#0F3D2E] text-sm focus:bg-white focus:outline-none focus:border-[#E8890C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F3D2E] mb-1.5 uppercase">
                  Summary / Snippet
                </label>
                <textarea
                  rows={2}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Brief introductory excerpt..."
                  className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-[#0F3D2E] text-sm focus:bg-white focus:outline-none focus:border-[#E8890C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F3D2E] mb-1.5 uppercase">
                  Full Article Body
                </label>
                <textarea
                  rows={4}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Full article content..."
                  className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-[#0F3D2E] text-sm focus:bg-white focus:outline-none focus:border-[#E8890C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F3D2E] mb-1.5 uppercase">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-[#0F3D2E] text-sm focus:bg-white focus:outline-none focus:border-[#E8890C]"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#E5E7EB]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#64748B] hover:text-[#0F3D2E] hover:bg-[#F8FAF9] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-[#E8890C] hover:bg-[#d07703] text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  {saving ? 'Saving...' : editingItem ? 'Save Changes' : 'Create Blog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        title="Delete Blog Article?"
        message="Are you sure you want to permanently delete this blog post?"
        itemName={deleteTarget?.title}
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
