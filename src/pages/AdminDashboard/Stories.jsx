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
  BookOpen,
} from 'lucide-react';

export default function Stories() {
  const [stories, setStories] = useState([]);
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
    category: 'Digital Transformation',
    author: 'VR4Web Editorial',
    summary: '',
    content: '',
    imageUrl: '/banner/3.jpg',
    status: 'published',
  });

  const fetchStories = async () => {
    try {
      setLoading(true);
      const res = await authService.getStories({ search, status: statusFilter });
      if (res && res.success) {
        setStories(res.data || []);
      }
    } catch (err) {
      setFeedback({ type: 'error', message: err.message || 'Error loading stories' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchStories();
    }, 250);
    return () => clearTimeout(timer);
  }, [search, statusFilter]);

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title || '',
        category: item.category || 'Digital Transformation',
        author: item.author || 'VR4Web Editorial',
        summary: item.summary || '',
        content: item.content || '',
        imageUrl: item.imageUrl || '/banner/3.jpg',
        status: item.status || 'published',
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: '',
        category: 'Digital Transformation',
        author: 'VR4Web Editorial',
        summary: '',
        content: '',
        imageUrl: '/banner/3.jpg',
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
      if (editingItem) {
        await authService.updateStory(editingItem._id, formData);
        setFeedback({ type: 'success', message: 'Story updated successfully' });
      } else {
        await authService.createStory(formData);
        setFeedback({ type: 'success', message: 'Story created successfully' });
      }
      setModalOpen(false);
      fetchStories();
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
      await authService.deleteStory(deleteTarget._id);
      setFeedback({ type: 'success', message: 'Story permanently deleted' });
      setDeleteTarget(null);
      fetchStories();
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
            Stories Management
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Publish client case studies and digital transformation stories
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E8890C] hover:bg-[#d07703] text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Story</span>
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
            placeholder="Search stories by title, summary, or author..."
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
          <LoadingSpinner text="Loading stories from MongoDB..." />
        ) : stories.length === 0 ? (
          <EmptyState
            title="No Stories Found"
            description="No stories match your criteria. Click 'Add New Story' to publish your first case study!"
            actionText="Add New Story"
            onAction={() => handleOpenModal()}
            icon={BookOpen}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F8FAF9] text-xs font-bold uppercase text-[#0F3D2E] border-b border-[#E5E7EB]">
                <tr>
                  <th className="py-3.5 px-6">Story Title</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Author</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Views</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB] text-[#0F3D2E]">
                {stories.map((story) => (
                  <tr key={story._id} className="hover:bg-[#F8FAF9] transition-colors">
                    <td className="py-4 px-6 font-bold max-w-sm truncate">
                      {story.title}
                    </td>
                    <td className="py-4 px-4 text-xs font-semibold text-[#0F3D2E]/80">
                      {story.category}
                    </td>
                    <td className="py-4 px-4 text-xs text-[#64748B]">
                      {story.author}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          story.status === 'published'
                            ? 'bg-emerald-50 text-[#16A34A] border border-emerald-200'
                            : story.status === 'draft'
                            ? 'bg-amber-50 text-[#E8890C] border border-amber-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {story.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-xs font-mono text-[#64748B]">
                      {story.views || 0}
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => handleOpenModal(story)}
                        className="p-1.5 rounded-lg bg-[#F8FAF9] hover:bg-slate-100 text-[#0F3D2E] border border-[#E5E7EB] transition-colors cursor-pointer"
                        title="Edit Story"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(story)}
                        className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-[#DC2626] border border-red-200 transition-colors cursor-pointer"
                        title="Delete Story"
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
                {editingItem ? 'Edit Story' : 'Create New Story'}
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
                  Story Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Scaling Enterprise Cloud Services"
                  className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-[#0F3D2E] text-sm focus:bg-white focus:outline-none focus:border-[#E8890C]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F3D2E] mb-1.5 uppercase">
                  Featured Image URL / Path
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
                  Summary
                </label>
                <textarea
                  rows={2}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Brief synopsis..."
                  className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-[#0F3D2E] text-sm focus:bg-white focus:outline-none focus:border-[#E8890C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F3D2E] mb-1.5 uppercase">
                  Full Story Body
                </label>
                <textarea
                  rows={4}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Full narrative details..."
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
                  {saving ? 'Saving...' : editingItem ? 'Save Changes' : 'Create Story'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        title="Delete Story?"
        message="Are you sure you want to permanently delete this story from the database?"
        itemName={deleteTarget?.title}
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
