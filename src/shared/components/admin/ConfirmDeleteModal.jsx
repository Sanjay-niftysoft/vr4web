import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmDeleteModal({
  isOpen,
  title = 'Delete Item?',
  message = 'Are you sure you want to permanently delete this item? This action cannot be undone.',
  itemName,
  onConfirm,
  onCancel,
  loading = false,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-fadeIn">
      <div className="bg-white border border-[#E5E7EB] rounded-2xl w-full max-w-md p-6 shadow-xl relative animate-scaleUp">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-[#64748B] hover:text-[#0F3D2E] p-1 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-11 h-11 rounded-xl bg-red-50 border border-red-200 text-[#DC2626] flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#0F3D2E]">{title}</h3>
            <p className="text-xs text-[#64748B]">Permanent action</p>
          </div>
        </div>

        <p className="text-sm text-[#64748B] leading-relaxed mb-6">
          {message}{' '}
          {itemName && (
            <span className="font-semibold text-[#0F3D2E] block mt-1.5 p-2 bg-[#F8FAF9] rounded-lg border border-[#E5E7EB] truncate">
              "{itemName}"
            </span>
          )}
        </p>

        <div className="flex justify-end gap-3 pt-2 border-t border-[#E5E7EB]">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#64748B] hover:text-[#0F3D2E] hover:bg-[#F8FAF9] border border-[#E5E7EB] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="px-5 py-2.5 rounded-xl bg-[#DC2626] hover:bg-red-700 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Deleting...' : 'Delete Permanently'}
          </button>
        </div>
      </div>
    </div>
  );
}
