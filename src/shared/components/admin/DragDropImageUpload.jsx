import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, X, RefreshCw, CheckCircle2, FileImage, Link as LinkIcon } from 'lucide-react';
import { getImageUrl } from '../../../utils/imageUrl';

export default function DragDropImageUpload({
  label = 'Featured Image',
  sublabel = 'Drag & drop image here, or browse files',
  value = '',
  onChange,
  onUpload,
  uploading = false,
  uploadProgress = null,
  fallback = '/case-study/property.png',
  aspectRatio = 'aspect-[16/9]',
  helperText = 'Accepted formats: JPG, PNG, WEBP, SVG (Max: 5 MB)',
  className = '',
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlDraft, setUrlDraft] = useState('');
  const fileInputRef = useRef(null);

  const hasImage = Boolean(value && value.trim() && value !== fallback);

  // Drag & Drop handlers
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (onUpload) {
        await onUpload(file);
      }
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file && onUpload) {
      await onUpload(file);
    }
    // Reset file input so user can pick same file again if desired
    if (e.target) e.target.value = '';
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    onChange('');
  };

  const handleApplyUrl = () => {
    if (urlDraft.trim()) {
      onChange(urlDraft.trim());
      setShowUrlInput(false);
      setUrlDraft('');
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-[#0F3D2E] uppercase tracking-wider">
            {label}
          </label>
          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="text-[11px] font-bold text-[#E8890C] hover:text-amber-700 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <LinkIcon className="w-3 h-3" />
            <span>{showUrlInput ? 'Hide URL Input' : 'Enter Image URL'}</span>
          </button>
        </div>
      )}

      {/* Optional Direct URL Input field */}
      {showUrlInput && (
        <div className="flex gap-2 p-2.5 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl mb-2 animate-in fade-in duration-200">
          <input
            type="text"
            value={urlDraft}
            onChange={(e) => setUrlDraft(e.target.value)}
            placeholder="Paste direct image URL or /uploads/..."
            className="flex-1 px-3 py-1.5 bg-white border border-[#E5E7EB] rounded-lg text-xs text-[#0F3D2E] focus:outline-none focus:border-[#E8890C]"
          />
          <button
            type="button"
            onClick={handleApplyUrl}
            className="px-3 py-1.5 rounded-lg bg-[#0F3D2E] text-white text-xs font-bold hover:bg-emerald-950 transition-colors cursor-pointer"
          >
            Apply
          </button>
        </div>
      )}

      {/* Drag & Drop Card Container */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative group rounded-2xl border-2 transition-all duration-200 cursor-pointer overflow-hidden ${
          isDragging
            ? 'border-dashed border-[#E8890C] bg-amber-50/60 ring-4 ring-[#E8890C]/20 scale-[1.005]'
            : hasImage
            ? 'border-solid border-[#E5E7EB] bg-white hover:border-[#0F3D2E]/40 shadow-xs hover:shadow-md'
            : 'border-dashed border-slate-300 hover:border-[#0F3D2E] bg-[#F8FAF9] hover:bg-emerald-50/30'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/webp, image/svg+xml"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Upload in Progress Overlay */}
        {uploading && (
          <div className="absolute inset-0 z-30 bg-[#0F3D2E]/90 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-white text-center">
            <RefreshCw className="w-8 h-8 animate-spin text-[#E8890C] mb-3" />
            <p className="text-sm font-bold">Uploading Image...</p>
            {uploadProgress !== null && (
              <div className="w-48 max-w-full bg-white/20 h-2 rounded-full overflow-hidden mt-3">
                <div
                  className="bg-[#E8890C] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}
            <p className="text-xs text-white/70 mt-1.5 font-mono">{uploadProgress || 10}%</p>
          </div>
        )}

        {/* Content: If Image is already uploaded / selected */}
        {hasImage ? (
          <div className="p-4 sm:p-5 flex flex-col md:flex-row items-center gap-5">
            {/* Visual Thumbnail */}
            <div className={`relative ${aspectRatio} w-full md:w-56 rounded-xl overflow-hidden bg-slate-100 border border-[#E5E7EB] flex-shrink-0 shadow-xs group/thumb`}>
              <img
                src={getImageUrl(value, fallback)}
                alt="Uploaded preview"
                className="w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-105"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = fallback;
                }}
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#0F3D2E]/90 text-white text-[10px] font-bold backdrop-blur-xs flex items-center gap-1 shadow-xs">
                <CheckCircle2 className="w-3 h-3 text-[#E8890C]" />
                <span>Uploaded</span>
              </div>
            </div>

            {/* Details & Actions */}
            <div className="flex-1 min-w-0 w-full flex flex-col justify-between py-1 space-y-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-50 text-[#0F3D2E] text-xs font-bold border border-emerald-200">
                    Active Image Asset
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500 font-medium truncate">
                    Ready for Publish
                  </span>
                </div>
                <p className="text-xs font-mono text-slate-600 truncate bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-lg select-all">
                  {value}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0F3D2E] hover:bg-emerald-950 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Replace Photo</span>
                </button>

                <button
                  type="button"
                  onClick={handleRemove}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>

                <span className="text-[11px] text-slate-400 ml-auto hidden sm:inline-block">
                  Drag new file over to replace
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Drag & Drop Zone */
          <div className="py-8 px-6 flex flex-col items-center justify-center text-center">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3.5 transition-colors ${
                isDragging
                  ? 'bg-[#E8890C] text-white scale-110 shadow-lg shadow-[#E8890C]/30'
                  : 'bg-emerald-50 text-[#0F3D2E] border border-emerald-100 group-hover:scale-105 shadow-xs'
              }`}
            >
              <Upload className="w-6 h-6" />
            </div>

            <p className="text-sm font-bold text-[#0F3D2E] mb-1">
              {isDragging ? 'Drop photo here to upload!' : sublabel}
            </p>
            <p className="text-xs text-slate-500 mb-4 max-w-sm">
              Drag & drop from your desktop, or click to browse files from your computer.
            </p>

            <button
              type="button"
              className="px-4 py-2 rounded-xl bg-[#0F3D2E] group-hover:bg-[#E8890C] text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer pointer-events-none"
            >
              <FileImage className="w-3.5 h-3.5" />
              <span>Browse Computer</span>
            </button>
          </div>
        )}
      </div>

      {helperText && (
        <p className="text-[11px] text-[#64748B] flex items-center justify-between">
          <span>{helperText}</span>
          {hasImage && (
            <span className="text-[#16A34A] font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Image loaded
            </span>
          )}
        </p>
      )}
    </div>
  );
}
