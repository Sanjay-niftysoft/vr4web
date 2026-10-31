import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  Image as ImageIcon,
  X,
  RefreshCw,
  CheckCircle2,
  FileImage,
  Link as LinkIcon,
  AlertTriangle,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';
import { getImageUrl } from '../../../utils/imageUrl';

export default function DragDropImageUpload({
  label = 'Featured Image',
  sublabel = 'Drag & drop image here, or browse files',
  value = '',
  onChange,
  onUpload,
  fallback = '/case-study/property.png',
  aspectRatio = 'aspect-[16/9]',
  helperText = 'Accepted formats: JPG, PNG, WEBP, SVG (Max: 5 MB)',
  className = '',
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [localPreview, setLocalPreview] = useState(null);
  const [lastFile, setLastFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [imageLoadError, setImageLoadError] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlDraft, setUrlDraft] = useState('');

  const fileInputRef = useRef(null);
  const dragCounterRef = useRef(0);

  // Sync external value changes
  useEffect(() => {
    if (!value) {
      setLocalPreview(null);
    }
  }, [value]);

  const hasImage = Boolean((localPreview || (value && value.trim())));
  const activeImageSrc = localPreview || getImageUrl(value, fallback);

  // Core File Upload Processor
  const processFile = async (file) => {
    if (!file) return;

    // 1. Validation - File Type
    const isImage = file.type.startsWith('image/') || /\.(jpe?g|png|webp|svg|gif|avif)$/i.test(file.name);
    if (!isImage) {
      setErrorMessage(
        `"${file.name}" is not a recognized image format. Supported formats: JPG, PNG, WEBP, SVG, GIF.`
      );
      return;
    }

    // 2. Validation - File Size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
      setErrorMessage(
        `File is too large (${sizeMb} MB). Maximum allowed size is 5 MB. Please choose a smaller image.`
      );
      return;
    }

    // 3. Instant Local Preview: Show the image immediately!
    const objectUrl = URL.createObjectURL(file);
    setLocalPreview(objectUrl);
    setLastFile(file);
    setErrorMessage(null);
    setImageLoadError(false);

    // 4. Server Upload
    if (onUpload) {
      setUploading(true);
      setUploadPercent(15);
      try {
        const uploadedUrl = await onUpload(file, (percent) => {
          setUploadPercent(percent);
        });

        if (uploadedUrl) {
          onChange(uploadedUrl);
          setUploadPercent(100);
          setErrorMessage(null);
        }
      } catch (err) {
        console.error('Image upload failed:', err);
        const reason =
          err.response?.data?.message ||
          err.message ||
          'Upload failed due to a server or network error.';
        setErrorMessage(`Server Upload Failed: ${reason}`);
      } finally {
        setUploading(false);
      }
    }
  };

  // Drag Event Handlers with Counter (prevents flicker on child elements)
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current += 1;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current -= 1;
    if (dragCounterRef.current <= 0) {
      dragCounterRef.current = 0;
      setIsDragging(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current = 0;
    setIsDragging(false);

    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      await processFile(files[0]);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      await processFile(file);
    }
    if (e.target) e.target.value = '';
  };

  const handleRetry = (e) => {
    e?.stopPropagation();
    if (lastFile) {
      processFile(lastFile);
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleRemove = (e) => {
    e?.stopPropagation();
    setLocalPreview(null);
    setLastFile(null);
    setErrorMessage(null);
    setImageLoadError(false);
    onChange('');
  };

  const handleApplyUrl = () => {
    if (urlDraft.trim()) {
      setLocalPreview(null);
      setErrorMessage(null);
      setImageLoadError(false);
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

      {/* Manual URL Input Bar */}
      {showUrlInput && (
        <div className="flex gap-2 p-2.5 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl mb-2">
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
            className="px-3.5 py-1.5 rounded-lg bg-[#0F3D2E] text-white text-xs font-bold hover:bg-emerald-950 transition-colors cursor-pointer"
          >
            Apply
          </button>
        </div>
      )}

      {/* Error Reason Banner (High visibility if upload or format failed) */}
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-2.5 text-xs animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <span className="font-bold block text-red-800">Upload Issue Detected:</span>
            <p className="mt-0.5 leading-relaxed">{errorMessage}</p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {lastFile && (
              <button
                type="button"
                onClick={handleRetry}
                className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
                title="Retry upload with the same file"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Retry</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="p-1 hover:bg-red-100 rounded text-red-500 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Drag & Drop Zone */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative group rounded-2xl border-2 transition-all duration-200 cursor-pointer overflow-hidden ${
          isDragging
            ? 'border-dashed border-[#E8890C] bg-amber-50/70 ring-4 ring-[#E8890C]/25 scale-[1.005]'
            : hasImage
            ? 'border-solid border-[#E5E7EB] bg-white hover:border-[#0F3D2E]/40 shadow-xs hover:shadow-md'
            : 'border-dashed border-slate-300 hover:border-[#0F3D2E] bg-[#F8FAF9] hover:bg-emerald-50/30'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/webp, image/svg+xml, image/gif, image/avif"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Uploading Spinner Overlay */}
        {uploading && (
          <div className="absolute inset-0 z-30 bg-[#0F3D2E]/85 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-white text-center">
            <RefreshCw className="w-8 h-8 animate-spin text-[#E8890C] mb-2.5" />
            <p className="text-sm font-bold">Uploading Photo to Server...</p>
            <div className="w-48 max-w-full bg-white/20 h-2 rounded-full overflow-hidden mt-2.5">
              <div
                className="bg-[#E8890C] h-full transition-all duration-300 rounded-full"
                style={{ width: `${uploadPercent || 20}%` }}
              />
            </div>
            <p className="text-xs text-white/80 mt-1 font-mono">{uploadPercent || 20}%</p>
          </div>
        )}

        {/* View 1: When an Image Exists (either local preview or server URL) */}
        {hasImage ? (
          <div className="p-4 sm:p-5 flex flex-col md:flex-row items-center gap-5">
            {/* Visual Thumbnail */}
            <div className={`relative ${aspectRatio} w-full md:w-56 rounded-xl overflow-hidden bg-slate-100 border border-[#E5E7EB] flex-shrink-0 shadow-xs group/thumb`}>
              <img
                src={activeImageSrc}
                alt="Case study cover"
                className="w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-105"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = fallback;
                  setImageLoadError(true);
                }}
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#0F3D2E]/90 text-white text-[10px] font-bold backdrop-blur-xs flex items-center gap-1 shadow-xs">
                {uploading ? (
                  <RefreshCw className="w-3 h-3 animate-spin text-[#E8890C]" />
                ) : (
                  <CheckCircle2 className="w-3 h-3 text-[#E8890C]" />
                )}
                <span>{uploading ? 'Uploading...' : 'Active Cover Photo'}</span>
              </div>
            </div>

            {/* Meta details & action controls */}
            <div className="flex-1 min-w-0 w-full flex flex-col justify-between py-1 space-y-3">
              <div>
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-50 text-[#0F3D2E] text-xs font-bold border border-emerald-200">
                    Live Photo Ready
                  </span>
                  {lastFile && (
                    <span className="text-xs text-slate-500 font-mono">
                      {(lastFile.size / 1024).toFixed(0)} KB • {lastFile.type.split('/')[1]?.toUpperCase() || 'IMAGE'}
                    </span>
                  )}
                </div>
                <p className="text-xs font-mono text-slate-600 truncate bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-lg select-all">
                  {value || (lastFile ? lastFile.name : 'Local photo selected')}
                </p>
                {imageLoadError && (
                  <p className="text-[11px] text-amber-700 mt-1 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-amber-600" />
                    <span>Image failed to load from remote path; showing fallback.</span>
                  </p>
                )}
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
                  Drag new file over to replace anytime
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* View 2: Empty Drag & Drop Zone */
          <div className="py-9 px-6 flex flex-col items-center justify-center text-center">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3.5 transition-all duration-200 ${
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
              className="px-4 py-2 rounded-xl bg-[#0F3D2E] group-hover:bg-[#E8890C] text-white text-xs font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer pointer-events-none"
            >
              <FileImage className="w-3.5 h-3.5" />
              <span>Browse Computer</span>
            </button>
          </div>
        )}
      </div>

      {helperText && (
        <div className="text-[11px] text-[#64748B] flex items-center justify-between">
          <span>{helperText}</span>
          {hasImage && !uploading && !errorMessage && (
            <span className="text-[#16A34A] font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Photo loaded
            </span>
          )}
        </div>
      )}
    </div>
  );
}
