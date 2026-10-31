import { useState, useEffect } from 'react';
import authService from '../../services/authService';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Loader2,
  Eye,
  AlertCircle,
  X,
  CheckCircle2,
} from 'lucide-react';

export default function Stories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [saving, setSaving] = useState(false);
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

  const handleDelete = async (id) => {
    try {
      await authService.deleteStory(id);
      setFeedback({ type: 'success', message: 'Story deleted successfully' });
      setDeleteConfirm(null);
      fetchStories();
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Client Stories Management</h2>
          <p className="text-xs text-emerald-300/70 mt-1">
            Publish case studies and digital transformation success narratives
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E8890C] hover:bg-[#d07703] text-[#06140E] font-bold text-sm shadow-md transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Story</span>
        </button>
      </div>

      {/* Feedback Toast */}
      {feedback && (
        <div
          className={`p-4 rounded-xl text-sm flex items-center justify-between border ${
            feedback.type === 'success'
              ? 'bg-emerald-950/80 border-emerald-700 text-emerald-200'
              : 'bg-red-950/80 border-red-700 text-red-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3 bg-[#091D15] border border-emerald-900/40 p-4 rounded-2xl">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400/60" />
          <input
            type="text"
            placeholder="Search stories by title, summary, or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#06140E] border border-emerald-900/60 rounded-xl text-sm text-white placeholder-emerald-700 focus:outline-none focus:border-[#E8890C]"
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#06140E] border border-emerald-900/60 text-white text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-[#E8890C]"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-[#091D15] border border-emerald-900/40 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="py-20 flex justify-center items-center text-emerald-400">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : stories.length === 0 ? (
          <div className="py-16 text-center text-emerald-300/60">
            No stories match your criteria. Click "Add New Story" to publish one!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-200">
              <thead className="bg-[#071710] text-xs font-mono uppercase text-emerald-400/70 border-b border-emerald-900/40">
                <tr>
                  <th className="py-3.5 px-6">Story Title</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Author</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Views</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-900/30">
                {stories.map((story) => (
                  <tr key={story._id} className="hover:bg-emerald-950/40 transition-colors">
                    <td className="py-4 px-6 font-semibold text-white max-w-sm truncate">
                      {story.title}
                    </td>
                    <td className="py-4 px-4 text-emerald-200 text-xs">
                      {story.category}
                    </td>
                    <td className="py-4 px-4 text-emerald-300/80 text-xs">
                      {story.author}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          story.status === 'published'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60'
                            : story.status === 'draft'
                            ? 'bg-amber-950 text-amber-300 border border-amber-700/60'
                            : 'bg-slate-800 text-slate-300 border border-slate-700'
                        }`}
                      >
                        {story.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-xs font-mono text-emerald-400/80">
                      {story.views || 0}
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => handleOpenModal(story)}
                        className="p-1.5 rounded-lg bg-emerald-900/40 hover:bg-emerald-800 text-emerald-300 transition-colors cursor-pointer"
                        title="Edit Story"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(story)}
                        className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900 text-red-300 transition-colors cursor-pointer"
                        title="Delete Story"
                      >
                        <Trash2 className="w-4 h-4" />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#091D15] border border-emerald-900/60 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-emerald-900/40 flex items-center justify-between bg-[#071810]">
              <h3 className="font-bold text-white text-lg">
                {editingItem ? 'Edit Story' : 'Create New Story'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-emerald-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-xs font-semibold text-emerald-200/80 mb-1.5 uppercase">
                  Story Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Scaling Enterprise Cloud Services"
                  className="w-full px-3.5 py-2.5 bg-[#06140E] border border-emerald-900/60 rounded-xl text-white text-sm focus:outline-none focus:border-[#E8890C]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-emerald-200/80 mb-1.5 uppercase">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#06140E] border border-emerald-900/60 rounded-xl text-white text-sm focus:outline-none focus:border-[#E8890C]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-emerald-200/80 mb-1.5 uppercase">
                    Author
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#06140E] border border-emerald-900/60 rounded-xl text-white text-sm focus:outline-none focus:border-[#E8890C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-emerald-200/80 mb-1.5 uppercase">
                  Image Path / URL
                </label>
                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#06140E] border border-emerald-900/60 rounded-xl text-white text-sm focus:outline-none focus:border-[#E8890C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-emerald-200/80 mb-1.5 uppercase">
                  Executive Summary
                </label>
                <textarea
                  rows={2}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Brief synopsis..."
                  className="w-full px-3.5 py-2.5 bg-[#06140E] border border-emerald-900/60 rounded-xl text-white text-sm focus:outline-none focus:border-[#E8890C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-emerald-200/80 mb-1.5 uppercase">
                  Full Story Body
                </label>
                <textarea
                  rows={4}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Full narrative details..."
                  className="w-full px-3.5 py-2.5 bg-[#06140E] border border-emerald-900/60 rounded-xl text-white text-sm focus:outline-none focus:border-[#E8890C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-emerald-200/80 mb-1.5 uppercase">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#06140E] border border-emerald-900/60 rounded-xl text-white text-sm focus:outline-none focus:border-[#E8890C]"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-emerald-900/40">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-emerald-300 hover:bg-emerald-950/60 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-[#E8890C] hover:bg-[#d07703] text-[#06140E] font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingItem ? 'Save Changes' : 'Create Story'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#091D15] border border-red-900/60 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-2">Delete Story?</h3>
            <p className="text-sm text-slate-300 mb-6">
              Are you sure you want to permanently delete{' '}
              <span className="text-[#E8890C] font-semibold">"{deleteConfirm.title}"</span>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-emerald-300 hover:bg-emerald-950/60 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm._id)}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
