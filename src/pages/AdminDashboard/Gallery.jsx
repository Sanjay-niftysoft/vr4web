import { useState, useEffect } from 'react';
import authService from '../../services/authService';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Loader2,
  AlertCircle,
  X,
  CheckCircle2,
  Image as ImageIcon,
} from 'lucide-react';

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    caption: '',
    category: 'Sydney Headquarters & Projects',
    imageUrl: '/gallery/gallery_01.jpg',
    aspectRatio: '16/9',
    order: 0,
    status: 'visible',
  });

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await authService.getGallery({ search, category: categoryFilter });
      if (res && res.success) {
        setImages(res.data || []);
      }
    } catch (err) {
      setFeedback({ type: 'error', message: err.message || 'Error loading gallery images' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchGallery();
    }, 250);
    return () => clearTimeout(timer);
  }, [search, categoryFilter]);

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title || '',
        caption: item.caption || '',
        category: item.category || 'Sydney Headquarters & Projects',
        imageUrl: item.imageUrl || '/gallery/gallery_01.jpg',
        aspectRatio: item.aspectRatio || '16/9',
        order: item.order || 0,
        status: item.status || 'visible',
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: '',
        caption: '',
        category: 'Sydney Headquarters & Projects',
        imageUrl: '/gallery/gallery_01.jpg',
        aspectRatio: '16/9',
        order: images.length + 1,
        status: 'visible',
      });
    }
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.imageUrl.trim()) return;

    setSaving(true);
    try {
      if (editingItem) {
        await authService.updateGallery(editingItem._id, formData);
        setFeedback({ type: 'success', message: 'Gallery image updated successfully' });
      } else {
        await authService.createGallery(formData);
        setFeedback({ type: 'success', message: 'Gallery image added successfully' });
      }
      setModalOpen(false);
      fetchGallery();
    } catch (err) {
      setFeedback({ type: 'error', message: err.response?.data?.message || err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await authService.deleteGallery(id);
      setFeedback({ type: 'success', message: 'Gallery image removed successfully' });
      setDeleteConfirm(null);
      fetchGallery();
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Visual Gallery Assets</h2>
          <p className="text-xs text-emerald-300/70 mt-1">
            Curate portfolio photography, studio displays, and office technology spaces
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E8890C] hover:bg-[#d07703] text-[#06140E] font-bold text-sm shadow-md transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Image Asset</span>
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
            placeholder="Search gallery images by title or caption..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#06140E] border border-emerald-900/60 rounded-xl text-sm text-white placeholder-emerald-700 focus:outline-none focus:border-[#E8890C]"
          />
        </div>
      </div>

      {/* Gallery Cards Grid */}
      {loading ? (
        <div className="py-20 flex justify-center items-center text-emerald-400">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : images.length === 0 ? (
        <div className="py-16 text-center text-emerald-300/60 bg-[#091D15] rounded-2xl border border-emerald-900/40">
          No gallery images available. Click "Upload Image Asset" to add photos!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img) => (
            <div
              key={img._id}
              className="bg-[#091D15] border border-emerald-900/40 rounded-2xl overflow-hidden group hover:border-[#E8890C]/50 transition-all flex flex-col"
            >
              {/* Image Preview */}
              <div className="relative aspect-video bg-black/60 overflow-hidden flex items-center justify-center">
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/banner/3.jpg';
                  }}
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold backdrop-blur-md ${
                      img.status === 'visible'
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700'
                        : 'bg-black/80 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {img.status}
                  </span>
                </div>
              </div>

              {/* Card Meta & Actions */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-emerald-400 font-mono uppercase tracking-wider">
                    {img.category}
                  </span>
                  <h4 className="font-bold text-white text-base mt-0.5 truncate">{img.title}</h4>
                  {img.caption && (
                    <p className="text-xs text-emerald-200/60 mt-1 line-clamp-2">{img.caption}</p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-emerald-900/30 flex items-center justify-between text-xs">
                  <span className="text-emerald-400/50 font-mono text-[11px]">
                    Ratio: {img.aspectRatio || '16/9'}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenModal(img)}
                      className="p-1.5 rounded-lg bg-emerald-900/40 hover:bg-emerald-800 text-emerald-300 transition-colors cursor-pointer"
                      title="Edit Image Details"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(img)}
                      className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900 text-red-300 transition-colors cursor-pointer"
                      title="Delete Image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Create Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#091D15] border border-emerald-900/60 rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-emerald-900/40 flex items-center justify-between bg-[#071810]">
              <h3 className="font-bold text-white text-lg">
                {editingItem ? 'Edit Gallery Details' : 'Add Gallery Image'}
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
                  Image Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Sydney Headquarters Showcase"
                  className="w-full px-3.5 py-2.5 bg-[#06140E] border border-emerald-900/60 rounded-xl text-white text-sm focus:outline-none focus:border-[#E8890C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-emerald-200/80 mb-1.5 uppercase">
                  Image URL / Asset Path *
                </label>
                <input
                  type="text"
                  required
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="/gallery/gallery_01.jpg"
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
                    Aspect Ratio
                  </label>
                  <select
                    value={formData.aspectRatio}
                    onChange={(e) => setFormData({ ...formData, aspectRatio: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#06140E] border border-emerald-900/60 rounded-xl text-white text-sm focus:outline-none focus:border-[#E8890C]"
                  >
                    <option value="16/9">16/9 (Widescreen)</option>
                    <option value="4/3">4/3 (Standard)</option>
                    <option value="1/1">1/1 (Square)</option>
                    <option value="9/16">9/16 (Vertical)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-emerald-200/80 mb-1.5 uppercase">
                  Caption / Description
                </label>
                <textarea
                  rows={2}
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  placeholder="Optional visual description..."
                  className="w-full px-3.5 py-2.5 bg-[#06140E] border border-emerald-900/60 rounded-xl text-white text-sm focus:outline-none focus:border-[#E8890C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-emerald-200/80 mb-1.5 uppercase">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: e.target.value })}
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
                    <option value="visible">Visible</option>
                    <option value="hidden">Hidden</option>
                  </select>
                </div>
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
                  <span>{editingItem ? 'Save Details' : 'Add Image'}</span>
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
            <h3 className="text-lg font-bold text-white mb-2">Delete Gallery Image?</h3>
            <p className="text-sm text-slate-300 mb-6">
              Are you sure you want to delete{' '}
              <span className="text-[#E8890C] font-semibold">"{deleteConfirm.title}"</span>?
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
                Delete Asset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
