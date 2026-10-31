import { useState, useEffect } from 'react';
import authService from '../../services/authService';
import { getImageUrl } from '../../utils/imageUrl';
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
  Image as GalleryIcon,
} from 'lucide-react';

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
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
      setFeedback({ type: 'error', message: err.message || 'Error loading gallery assets' });
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
        setFeedback({ type: 'success', message: 'Gallery asset added successfully' });
      }
      setModalOpen(false);
      fetchGallery();
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
      await authService.deleteGallery(deleteTarget._id);
      setFeedback({ type: 'success', message: 'Gallery image deleted' });
      setDeleteTarget(null);
      fetchGallery();
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
            Gallery Assets Management
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Curate portfolio photography, studio displays, and client projects
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E8890C] hover:bg-[#d07703] text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Image Asset</span>
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
            placeholder="Search gallery images by title or caption..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-sm text-[#0F3D2E] placeholder-[#94A3B8] focus:bg-white focus:outline-none focus:border-[#E8890C]"
          />
        </div>
      </div>

      {/* Gallery Cards Grid */}
      {loading ? (
        <LoadingSpinner text="Loading gallery assets..." />
      ) : images.length === 0 ? (
        <EmptyState
          title="No Gallery Images Available"
          description="Your visual portfolio is empty. Click 'Upload Image Asset' to add images!"
          actionText="Upload Image Asset"
          onAction={() => handleOpenModal()}
          icon={GalleryIcon}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img) => (
            <div
              key={img._id}
              className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden group hover:border-[#0F3D2E]/40 hover:shadow-md transition-all flex flex-col"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-video bg-slate-100 overflow-hidden flex items-center justify-center">
                <img
                  src={getImageUrl(img.imageUrl, '/banner/3.jpg')}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/banner/3.jpg';
                  }}
                />
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold backdrop-blur-md shadow-2xs ${
                      img.status === 'visible'
                        ? 'bg-white/95 text-[#16A34A] border border-emerald-200'
                        : 'bg-white/95 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {img.status}
                  </span>
                </div>
              </div>

              {/* Card Meta & Actions */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-[#64748B] font-mono uppercase font-bold tracking-wider">
                    {img.category}
                  </span>
                  <h4 className="font-bold text-[#0F3D2E] text-base mt-0.5 truncate">{img.title}</h4>
                  {img.caption && (
                    <p className="text-xs text-[#64748B] mt-1.5 line-clamp-2 leading-relaxed">
                      {img.caption}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3.5 border-t border-[#E5E7EB] flex items-center justify-between text-xs">
                  <span className="text-[#64748B] font-mono text-[11px]">
                    Ratio: {img.aspectRatio || '16/9'}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenModal(img)}
                      className="p-1.5 rounded-lg bg-[#F8FAF9] hover:bg-slate-100 text-[#0F3D2E] border border-[#E5E7EB] transition-colors cursor-pointer"
                      title="Edit Image Details"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(img)}
                      className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-[#DC2626] border border-red-200 transition-colors cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white border border-[#E5E7EB] rounded-3xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between bg-[#F8FAF9]">
              <h3 className="font-black text-[#0F3D2E] text-lg">
                {editingItem ? 'Edit Gallery Details' : 'Add Gallery Image'}
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
                  Image Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Sydney Innovation Hub"
                  className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-[#0F3D2E] text-sm focus:bg-white focus:outline-none focus:border-[#E8890C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F3D2E] mb-1.5 uppercase">
                  Image URL / Asset Path *
                </label>
                <input
                  type="text"
                  required
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="/gallery/gallery_01.jpg"
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
                    Aspect Ratio
                  </label>
                  <select
                    value={formData.aspectRatio}
                    onChange={(e) => setFormData({ ...formData, aspectRatio: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-[#0F3D2E] text-sm focus:bg-white focus:outline-none focus:border-[#E8890C]"
                  >
                    <option value="16/9">16/9 (Widescreen)</option>
                    <option value="4/3">4/3 (Standard)</option>
                    <option value="1/1">1/1 (Square)</option>
                    <option value="9/16">9/16 (Vertical)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F3D2E] mb-1.5 uppercase">
                  Caption / Description
                </label>
                <textarea
                  rows={2}
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  placeholder="Optional visual description..."
                  className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-[#0F3D2E] text-sm focus:bg-white focus:outline-none focus:border-[#E8890C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F3D2E] mb-1.5 uppercase">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: e.target.value })}
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
                    <option value="visible">Visible</option>
                    <option value="hidden">Hidden</option>
                  </select>
                </div>
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
                  {saving ? 'Saving...' : editingItem ? 'Save Changes' : 'Add Image'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        title="Delete Gallery Image?"
        message="Are you sure you want to permanently delete this gallery image asset?"
        itemName={deleteTarget?.title}
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
