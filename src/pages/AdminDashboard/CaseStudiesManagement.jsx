import { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import DOMPurify from 'dompurify';
import authService from '../../services/authService';
import { getImageUrl } from '../../utils/imageUrl';
import DragDropImageUpload from '../../shared/components/admin/DragDropImageUpload';
import ConfirmDeleteModal from '../../shared/components/admin/ConfirmDeleteModal';
import EmptyState from '../../shared/components/admin/EmptyState';
import LoadingSpinner from '../../shared/components/admin/LoadingSpinner';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Copy,
  Eye,
  CheckCircle2,
  AlertCircle,
  X,
  Upload,
  Globe,
  TrendingUp,
  FileText,
  Sparkles,
  Layers,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Sliders,
  Check,
  Calendar,
  Image as ImageIcon,
  Tag,
  ArrowRight,
  Send,
  Save,
  RefreshCw,
  FolderOpen,
} from 'lucide-react';

const INDUSTRIES = [
  'Technology',
  'Healthcare',
  'Education',
  'Finance',
  'Real Estate',
  'E-commerce',
  'Manufacturing',
  'Professional Services',
  'Other',
];

const CATEGORIES = [
  'Website Development',
  'Web Application Development',
  'Mobile App Development',
  'UI/UX Design',
  'Digital Marketing',
  'SEO',
  'Branding',
  'Software Development',
  'Other',
];

const PROJECT_TYPES = [
  'Website',
  'Web Application',
  'Mobile Application',
  'E-commerce',
  'Branding',
  'Digital Marketing',
  'SEO',
  'Other',
];

const INITIAL_FORM_STATE = {
  title: '',
  slug: '',
  creationMode: 'manual', // 'manual' | 'quick'
  clientName: '',
  industry: 'Technology',
  category: 'Website Development',
  shortDescription: '',
  featuredImage: '',
  additionalImages: [],
  projectCompletionDate: new Date().toISOString().split('T')[0],
  isFeatured: false,
  // Project Details
  clientOverview: '',
  projectOverview: '',
  projectType: 'Website',
  servicesProvided: ['Website Design', 'UI/UX Design', 'Full-Stack Development'],
  technologiesUsed: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
  projectDuration: '8 Weeks',
  projectUrl: 'https://vr4web.com',
  clientLocation: 'Sydney, Australia',
  // Structured Content (Manual Fill)
  challenge: '',
  solution: '',
  challengesAndSolutions: [
    {
      challengeTitle: 'The Business Challenge',
      challengeDescription: '',
      solutionTitle: 'Our Strategic Approach',
      solutionDescription: '',
    },
  ],
  implementation: '',
  results: '',
  conclusion: '',
  gallery: [],
  testimonial: { quote: '', name: '', designation: '', photo: '' },
  // Results & Metrics
  metrics: [
    { value: '45%', label: 'Conversion Uplift', description: 'Immediate increase in organic sales funnel throughput', icon: 'TrendingUp' },
    { value: '3.2x', label: 'Faster Load Times', description: 'Average Core Web Vitals performance increase across all devices', icon: 'Zap' },
  ],
  beforeAfter: { beforeImage: '', afterImage: '', beforeDescription: '', afterDescription: '' },
  // SEO
  metaTitle: '',
  metaDescription: '',
  metaKeywords: ['Case Study', 'Digital Solutions', 'Software Development'],
  canonicalUrl: '',
  ogImage: '',
  // Quick Create Rich Text
  content: '',
  status: 'published',
};

export default function CaseStudiesManagement() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 1, limit: 10 });

  // Creation / Edit Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [activeTab, setActiveTab] = useState('basic'); // basic, details, content, metrics, seo
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [saving, setSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [feedback, setFeedback] = useState(null);

  // Quick Create Expandable Accordion
  const [quickDetailsExpanded, setQuickDetailsExpanded] = useState(false);

  // Tag Inputs
  const [serviceInput, setServiceInput] = useState('');
  const [techInput, setTechInput] = useState('');
  const [keywordInput, setKeywordInput] = useState('');

  const quillRef = useRef(null);
  const fileInputRef = useRef(null);

  // Fetch List
  const fetchCaseStudies = async () => {
    try {
      setLoading(true);
      const res = await authService.getCaseStudies({
        search,
        industry: industryFilter,
        category: categoryFilter,
        status: statusFilter,
        page,
        limit: 10,
      });
      if (res && res.success) {
        setCaseStudies(res.data || []);
        if (res.pagination) setPagination(res.pagination);
      }
    } catch (err) {
      setFeedback({ type: 'error', message: err.message || 'Failed to load case studies' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCaseStudies();
    }, 250);
    return () => clearTimeout(timer);
  }, [search, industryFilter, categoryFilter, statusFilter, page]);

  // Handle Automatic Slug Generation
  const handleTitleChange = (val) => {
    setFormData((prev) => {
      const autoSlug = val
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      return {
        ...prev,
        title: val,
        slug: prev.slug === '' || prev.slug === autoSlug.slice(0, -1) ? autoSlug : prev.slug,
        metaTitle: prev.metaTitle || val,
      };
    });
  };

  // Open Modal
  const handleOpenModal = async (item = null) => {
    if (item) {
      setEditingId(item._id);

      let csPairs = [];
      if (Array.isArray(item.challengesAndSolutions) && item.challengesAndSolutions.length > 0) {
        csPairs = item.challengesAndSolutions.map((cs, idx) => ({
          challengeTitle: cs.challengeTitle || `Challenge ${idx + 1}`,
          challengeDescription: cs.challengeDescription || '',
          solutionTitle: cs.solutionTitle || `Strategic Solution ${idx + 1}`,
          solutionDescription: cs.solutionDescription || '',
        }));
      } else if (item.challenge || item.solution) {
        csPairs = [
          {
            challengeTitle: 'The Business Challenge',
            challengeDescription: item.challenge || '',
            solutionTitle: 'Our Strategic Approach',
            solutionDescription: item.solution || '',
          },
        ];
      } else {
        csPairs = [
          {
            challengeTitle: 'The Business Challenge',
            challengeDescription: '',
            solutionTitle: 'Our Strategic Approach',
            solutionDescription: '',
          },
        ];
      }

      setFormData({
        ...INITIAL_FORM_STATE,
        ...item,
        challengesAndSolutions: csPairs,
        servicesProvided: Array.isArray(item.servicesProvided) ? item.servicesProvided : [],
        technologiesUsed: Array.isArray(item.technologiesUsed) ? item.technologiesUsed : [],
        metrics: Array.isArray(item.metrics) ? item.metrics : [],
        testimonial: item.testimonial || { quote: '', name: '', designation: '', photo: '' },
        beforeAfter: item.beforeAfter || { beforeImage: '', afterImage: '', beforeDescription: '', afterDescription: '' },
      });
    } else {
      setEditingId(null);
      setFormData(INITIAL_FORM_STATE);
    }
    setActiveTab('basic');
    setModalOpen(true);
  };

  // Add Another Challenge & Solution Pair
  const handleAddChallengeSolution = () => {
    setFormData((prev) => {
      const nextIndex = (prev.challengesAndSolutions?.length || 0) + 1;
      return {
        ...prev,
        challengesAndSolutions: [
          ...(prev.challengesAndSolutions || []),
          {
            challengeTitle: `Challenge ${nextIndex}`,
            challengeDescription: '',
            solutionTitle: `Strategic Solution ${nextIndex}`,
            solutionDescription: '',
          },
        ],
      };
    });
  };

  // Remove a Challenge & Solution Pair
  const handleRemoveChallengeSolution = (indexToRemove) => {
    setFormData((prev) => {
      const currentList = prev.challengesAndSolutions || [];
      const updated = currentList.filter((_, idx) => idx !== indexToRemove);
      const finalList = updated.length > 0 ? updated : [
        {
          challengeTitle: 'The Business Challenge',
          challengeDescription: '',
          solutionTitle: 'Our Strategic Approach',
          solutionDescription: '',
        },
      ];
      return {
        ...prev,
        challengesAndSolutions: finalList,
        challenge: finalList[0]?.challengeDescription || '',
        solution: finalList[0]?.solutionDescription || '',
      };
    });
  };

  // Update a Challenge & Solution Field
  const handleUpdateChallengeSolution = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...(prev.challengesAndSolutions || [])];
      if (!updated[index]) return prev;
      updated[index] = { ...updated[index], [field]: value };
      return {
        ...prev,
        challengesAndSolutions: updated,
        challenge: index === 0 && field === 'challengeDescription' ? value : prev.challenge,
        solution: index === 0 && field === 'solutionDescription' ? value : prev.solution,
      };
    });
  };

  // Switch Creation Mode seamlessly
  const handleModeSwitch = (mode) => {
    setFormData((prev) => {
      // If switching from manual to quick and content is empty, compile manual sections into rich HTML
      if (mode === 'quick' && !prev.content) {
        const sectionsHtml = [
          prev.challenge ? `<h2>The Challenge</h2><p>${prev.challenge.replace(/\n/g, '<br/>')}</p>` : '',
          prev.solution ? `<h2>Our Solution</h2><p>${prev.solution.replace(/\n/g, '<br/>')}</p>` : '',
          prev.implementation ? `<h2>Implementation</h2><p>${prev.implementation.replace(/\n/g, '<br/>')}</p>` : '',
          prev.results ? `<h2>Results</h2><p>${prev.results.replace(/\n/g, '<br/>')}</p>` : '',
          prev.conclusion ? `<h2>Conclusion</h2><p>${prev.conclusion.replace(/\n/g, '<br/>')}</p>` : '',
        ].filter(Boolean).join('');

        return { ...prev, creationMode: mode, content: sectionsHtml || prev.content };
      }
      return { ...prev, creationMode: mode };
    });
  };

  // Insert Standard Template into Quick Create Editor
  const handleInsertTemplate = () => {
    const template = `
<h2>Introduction</h2>
<p>Provide a high-level executive summary of this client project, strategic vision, and goals...</p>

<h2>Client Background</h2>
<p>Overview of the client organisation, their target demographic, and market challenges...</p>

<h2>The Challenge</h2>
<p>Detail the friction points, legacy technology constraints, or operational bottlenecks faced...</p>

<h2>Our Solution</h2>
<p>Explain the architecture, design principles, modern technology stack, and engineering execution...</p>

<h2>Implementation</h2>
<p>Break down the delivery sprints, testing phases, performance audits, and release strategy...</p>

<h2>Results & Key Achievements</h2>
<p>Highlight verifiable business results, user engagement metrics, and ROI improvements...</p>

<h2>Conclusion</h2>
<p>Summarise project success, ongoing support protocols, and the client's long-term competitive advantage...</p>
`;
    setFormData((prev) => ({
      ...prev,
      content: prev.content ? `${prev.content}<br/>${template}` : template,
    }));
  };

  // Generic Image Uploader supporting both Direct File and Input Event
  const uploadImageFile = async (file, fieldPath = 'featuredImage', onProgress) => {
    if (!file) return null;

    if (file.size > 5 * 1024 * 1024) {
      const err = new Error('File size exceeds the 5 MB limit. Please select a smaller photo.');
      setFeedback({ type: 'error', message: err.message });
      throw err;
    }

    try {
      setUploadProgress(15);
      const res = await authService.uploadCaseStudyImage(file, (percent) => {
        setUploadProgress(percent);
        if (onProgress) onProgress(percent);
      });
      if (res && res.success) {
        setFormData((prev) => {
          if (fieldPath === 'featuredImage') return { ...prev, featuredImage: res.fileUrl };
          if (fieldPath === 'beforeImage') return { ...prev, beforeAfter: { ...prev.beforeAfter, beforeImage: res.fileUrl } };
          if (fieldPath === 'afterImage') return { ...prev, beforeAfter: { ...prev.beforeAfter, afterImage: res.fileUrl } };
          if (fieldPath === 'testimonialPhoto') return { ...prev, testimonial: { ...prev.testimonial, photo: res.fileUrl } };
          if (fieldPath === 'additionalImages') return { ...prev, additionalImages: [...prev.additionalImages, res.fileUrl].slice(0, 2) };
          return prev;
        });
        setFeedback({ type: 'success', message: 'Photo uploaded and saved successfully!' });
        return res.fileUrl;
      }
      throw new Error(res?.message || 'Server did not return a valid file URL');
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Image upload failed';
      setFeedback({ type: 'error', message: msg });
      throw err;
    } finally {
      setUploadProgress(null);
    }
  };

  const handleFileUpload = async (e, fieldPath) => {
    const file = e.target?.files?.[0] || e;
    await uploadImageFile(file, fieldPath);
  };

  // Editor Inline Image Handler
  const handleEditorImageUpload = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/png, image/jpeg, image/webp');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      try {
        setUploadProgress(10);
        const res = await authService.uploadCaseStudyImage(file, (percent) => setUploadProgress(percent));
        if (res && res.success) {
          const quill = quillRef.current?.getEditor();
          if (quill) {
            const range = quill.getSelection(true);
            quill.insertEmbed(range.index, 'image', res.fileUrl);
            quill.setSelection(range.index + 1);
          }
        }
      } catch (err) {
        setFeedback({ type: 'error', message: 'Failed to insert image into editor' });
      } finally {
        setUploadProgress(null);
      }
    };
  };

  // Save / Publish
  const handleSave = async (targetStatus) => {
    if (!formData.title.trim()) {
      setFeedback({ type: 'error', message: 'Case Study Title is required' });
      return;
    }

    setSaving(true);
    try {
      const firstPair = formData.challengesAndSolutions?.[0];
      const payload = {
        ...formData,
        challenge: firstPair?.challengeDescription || formData.challenge || '',
        solution: firstPair?.solutionDescription || formData.solution || '',
        featuredImage: formData.featuredImage?.trim() || '/case-study/property.png',
        status: targetStatus || formData.status,
      };

      if (editingId) {
        await authService.updateCaseStudy(editingId, payload);
        setFeedback({ type: 'success', message: `Case study saved as ${payload.status}` });
      } else {
        await authService.createCaseStudy(payload);
        setFeedback({ type: 'success', message: `Case study published as ${payload.status}` });
      }

      setModalOpen(false);
      fetchCaseStudies();
    } catch (err) {
      setFeedback({ type: 'error', message: err.response?.data?.message || err.message });
    } finally {
      setSaving(false);
    }
  };

  // Duplicate
  const handleDuplicate = async (id) => {
    try {
      await authService.duplicateCaseStudy(id);
      setFeedback({ type: 'success', message: 'Case study duplicated as Draft' });
      fetchCaseStudies();
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    }
  };

  // Publish / Unpublish Toggle
  const handleTogglePublish = async (item) => {
    try {
      if (item.status === 'published') {
        await authService.unpublishCaseStudy(item._id);
        setFeedback({ type: 'success', message: `"${item.title}" moved to Drafts` });
      } else {
        await authService.publishCaseStudy(item._id);
        setFeedback({ type: 'success', message: `"${item.title}" is now Published live!` });
      }
      fetchCaseStudies();
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    }
  };

  // Delete
  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await authService.deleteCaseStudy(deleteTarget._id);
      setFeedback({ type: 'success', message: 'Case study deleted' });
      setDeleteTarget(null);
      fetchCaseStudies();
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    }
  };

  // Metrics helper
  const handleAddMetric = () => {
    setFormData((prev) => ({
      ...prev,
      metrics: [...prev.metrics, { value: '', label: '', description: '', icon: 'TrendingUp' }],
    }));
  };

  const handleUpdateMetric = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.metrics];
      updated[index][field] = value;
      return { ...prev, metrics: updated };
    });
  };

  const handleRemoveMetric = (index) => {
    setFormData((prev) => ({
      ...prev,
      metrics: prev.metrics.filter((_, i) => i !== index),
    }));
  };

  // Tag input helpers
  const handleAddTag = (field, value, setVal) => {
    if (!value.trim()) return;
    setFormData((prev) => ({
      ...prev,
      [field]: [...new Set([...(prev[field] || []), value.trim()])],
    }));
    setVal('');
  };

  const handleRemoveTag = (field, tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((t) => t !== tagToRemove),
    }));
  };

  // Quill Toolbar Modules
  const quillModules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ color: [] }, { background: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
        ['link', 'image', 'clean'],
      ],
      handlers: {
        image: handleEditorImageUpload,
      },
    },
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0F3D2E] tracking-tight">
            Case Study Management
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Create, edit, publish, and manage your case studies with Manual Fill or Quick Create
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E8890C] hover:bg-[#d07703] text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Case Study</span>
        </button>
      </div>

      {/* Feedback Toast */}
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
      <div className="flex flex-col lg:flex-row gap-3 bg-white border border-[#E5E7EB] p-4 rounded-2xl shadow-2xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input
            type="text"
            placeholder="Search by case study title, client name, or summary..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-sm text-[#0F3D2E] placeholder-[#94A3B8] focus:bg-white focus:outline-none focus:border-[#E8890C]"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {/* Industry Filter */}
          <select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            className="bg-[#F8FAF9] border border-[#E5E7EB] text-[#0F3D2E] text-xs sm:text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#E8890C] font-medium"
          >
            <option value="all">All Industries</option>
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-[#F8FAF9] border border-[#E5E7EB] text-[#0F3D2E] text-xs sm:text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#E8890C] font-medium"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#F8FAF9] border border-[#E5E7EB] text-[#0F3D2E] text-xs sm:text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#E8890C] font-medium"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Listing Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-xs overflow-hidden">
        {loading ? (
          <LoadingSpinner text="Retrieving case studies..." />
        ) : caseStudies.length === 0 ? (
          <EmptyState
            title="No Case Studies Found"
            description="You haven't created any case studies yet or no items match your search. Click below to create your first case study!"
            actionText="Add New Case Study"
            onAction={() => handleOpenModal()}
            icon={FolderOpen}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F8FAF9] text-xs font-bold uppercase text-[#0F3D2E] border-b border-[#E5E7EB]">
                <tr>
                  <th className="py-3.5 px-4">#</th>
                  <th className="py-3.5 px-4">Featured Image</th>
                  <th className="py-3.5 px-6">Case Study Title</th>
                  <th className="py-3.5 px-4">Client Name</th>
                  <th className="py-3.5 px-4">Industry</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Created Date</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB] text-[#0F3D2E]">
                {caseStudies.map((study, idx) => (
                  <tr key={study._id} className="hover:bg-[#F8FAF9] transition-colors">
                    <td className="py-4 px-4 font-mono text-xs text-[#64748B]">
                      {(page - 1) * 10 + idx + 1}
                    </td>
                    <td className="py-4 px-4">
                      <div className="w-14 h-10 rounded-lg overflow-hidden bg-slate-100 border border-[#E5E7EB] flex-shrink-0">
                        <img
                          src={getImageUrl(study.featuredImage)}
                          alt={study.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/case-study/property.png';
                          }}
                        />
                      </div>
                    </td>
                    <td className="py-4 px-6 font-bold max-w-xs">
                      <div className="truncate text-[#0F3D2E]">{study.title}</div>
                      <div className="text-[11px] text-[#64748B] font-mono mt-0.5 truncate">
                        /{study.slug}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-xs font-semibold text-[#0F3D2E]/80">
                      {study.clientName || '—'}
                    </td>
                    <td className="py-4 px-4 text-xs text-[#64748B]">
                      {study.industry}
                    </td>
                    <td className="py-4 px-4 text-xs text-[#64748B]">
                      {study.category}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          study.status === 'published'
                            ? 'bg-emerald-50 text-[#16A34A] border border-emerald-200'
                            : study.status === 'draft'
                            ? 'bg-amber-50 text-[#E8890C] border border-amber-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {study.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-xs font-mono text-[#64748B]">
                      {new Date(study.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* View Live / Preview */}
                        <a
                          href={`/stories/${study.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-[#F8FAF9] hover:bg-slate-100 text-[#0F3D2E] border border-[#E5E7EB] transition-colors"
                          title="View Live Page"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </a>

                        {/* Edit */}
                        <button
                          onClick={() => handleOpenModal(study)}
                          className="p-1.5 rounded-lg bg-[#F8FAF9] hover:bg-slate-100 text-[#0F3D2E] border border-[#E5E7EB] transition-colors cursor-pointer"
                          title="Edit Case Study"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        {/* Duplicate */}
                        <button
                          onClick={() => handleDuplicate(study._id)}
                          className="p-1.5 rounded-lg bg-[#F8FAF9] hover:bg-slate-100 text-[#0F3D2E] border border-[#E5E7EB] transition-colors cursor-pointer"
                          title="Duplicate Case Study"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        {/* Publish / Unpublish Toggle */}
                        <button
                          onClick={() => handleTogglePublish(study)}
                          className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                            study.status === 'published'
                              ? 'bg-amber-50 hover:bg-amber-100 text-[#E8890C] border-amber-200'
                              : 'bg-emerald-50 hover:bg-emerald-100 text-[#16A34A] border-emerald-200'
                          }`}
                          title={study.status === 'published' ? 'Unpublish to Draft' : 'Publish Live'}
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => setDeleteTarget(study)}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-[#DC2626] border border-red-200 transition-colors cursor-pointer"
                          title="Delete Case Study"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        {pagination.pages > 1 && (
          <div className="p-4 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#64748B]">
            <div>
              Showing Page <span className="font-bold text-[#0F3D2E]">{pagination.page}</span> of{' '}
              <span className="font-bold text-[#0F3D2E]">{pagination.pages}</span> ({pagination.total} total)
            </div>
            <div className="flex gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1.5 rounded-lg border border-[#E5E7EB] bg-white hover:bg-[#F8FAF9] disabled:opacity-40 cursor-pointer font-medium"
              >
                Previous
              </button>
              <button
                disabled={page >= pagination.pages}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1.5 rounded-lg border border-[#E5E7EB] bg-white hover:bg-[#F8FAF9] disabled:opacity-40 cursor-pointer font-medium"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          CREATION & EDIT MODAL (TWO CREATION MODES)
         ───────────────────────────────────────────────────────────── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white border border-[#E5E7EB] rounded-3xl w-full max-w-5xl max-h-[94vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Top Header */}
            <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between bg-[#F8FAF9]">
              <div>
                <h3 className="font-black text-[#0F3D2E] text-lg sm:text-xl">
                  {editingId ? 'Edit Case Study' : 'Create New Case Study'}
                </h3>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Select your preferred content creation mode below
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-[#64748B] hover:text-[#0F3D2E] p-1.5 rounded-lg hover:bg-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mode Selection Cards / Tabs */}
            <div className="px-6 py-4 border-b border-[#E5E7EB] bg-white flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() => handleModeSwitch('manual')}
                className={`flex-1 p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  formData.creationMode === 'manual'
                    ? 'border-[#0F3D2E] bg-emerald-50/60 shadow-xs'
                    : 'border-[#E5E7EB] hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#0F3D2E]">
                    <Sliders className="w-4 h-4 text-[#E8890C]" />
                    <span>Option 1: Manual Fill</span>
                  </div>
                  {formData.creationMode === 'manual' && (
                    <span className="w-2 h-2 rounded-full bg-[#E8890C]"></span>
                  )}
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Structured fields across tabs: project details, challenge, solution, metrics, and SEO.
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleModeSwitch('quick')}
                className={`flex-1 p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  formData.creationMode === 'quick'
                    ? 'border-[#0F3D2E] bg-emerald-50/60 shadow-xs'
                    : 'border-[#E5E7EB] hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#0F3D2E]">
                    <Sparkles className="w-4 h-4 text-[#E8890C]" />
                    <span>Option 2: Quick Create</span>
                  </div>
                  {formData.creationMode === 'quick' && (
                    <span className="w-2 h-2 rounded-full bg-[#E8890C]"></span>
                  )}
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Single rich text editor: copy & paste your complete case study with formatting and images.
                </p>
              </button>
            </div>

            {/* Modal Body Container */}
            <div className="flex-1 overflow-y-auto p-6 bg-[#F8FAF9]">
              {/* Modal Feedback Alert */}
              {feedback && (
                <div
                  className={`p-3.5 mb-4 rounded-xl text-xs sm:text-sm flex items-center justify-between border ${
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
              {/* ──────────────────────────────────────────────────
                  MODE 1: MANUAL FILL (5 STRUCTURED TABS)
                 ────────────────────────────────────────────────── */}
              {formData.creationMode === 'manual' ? (
                <div className="space-y-6">
                  {/* Tab Navigation */}
                  <div className="flex flex-wrap gap-2 border-b border-[#E5E7EB] pb-3">
                    {[
                      { id: 'basic', label: '1. Basic Info' },
                      { id: 'details', label: '2. Project Details' },
                      { id: 'content', label: '3. Case Study Content' },
                      { id: 'metrics', label: '4. Results & Metrics' },
                      { id: 'seo', label: '5. SEO & Social' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          activeTab === tab.id
                            ? 'bg-[#0F3D2E] text-white shadow-xs'
                            : 'bg-white text-[#64748B] hover:text-[#0F3D2E] border border-[#E5E7EB]'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab 1: Basic Info */}
                  {activeTab === 'basic' && (
                    <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-[#0F3D2E] mb-1.5 uppercase">
                          Case Study Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.title}
                          onChange={(e) => handleTitleChange(e.target.value)}
                          placeholder="Enter a compelling case study title..."
                          className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-[#0F3D2E] text-sm focus:bg-white focus:outline-none focus:border-[#E8890C]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#0F3D2E] mb-1.5 uppercase">
                          Slug *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.slug}
                          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                          placeholder="how-we-improved-business-performance"
                          className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-[#0F3D2E] text-sm font-mono focus:bg-white focus:outline-none focus:border-[#E8890C]"
                        />
                        <p className="text-[11px] text-[#64748B] font-mono mt-1">
                          Preview URL: <span className="text-[#E8890C]">yourdomain.com/case-study/{formData.slug || 'your-slug'}</span>
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#0F3D2E] mb-1.5 uppercase">
                            Client Name
                          </label>
                          <input
                            type="text"
                            value={formData.clientName}
                            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                            placeholder="e.g. SMM Consult Pty Ltd"
                            className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-[#0F3D2E] text-sm focus:bg-white focus:outline-none focus:border-[#E8890C]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#0F3D2E] mb-1.5 uppercase">
                            Industry
                          </label>
                          <select
                            value={formData.industry}
                            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-[#0F3D2E] text-sm focus:bg-white focus:outline-none focus:border-[#E8890C]"
                          >
                            {INDUSTRIES.map((ind) => (
                              <option key={ind} value={ind}>{ind}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#0F3D2E] mb-1.5 uppercase">
                            Category
                          </label>
                          <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-[#0F3D2E] text-sm focus:bg-white focus:outline-none focus:border-[#E8890C]"
                          >
                            {CATEGORIES.map((cat) => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#0F3D2E] mb-1.5 uppercase">
                          Short Description (150–250 chars)
                        </label>
                        <textarea
                          rows={2}
                          value={formData.shortDescription}
                          onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                          placeholder="Brief executive synopsis of the engagement..."
                          className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-[#0F3D2E] text-sm focus:bg-white focus:outline-none focus:border-[#E8890C]"
                        />
                      </div>

                      {/* Featured Image Drag & Drop Upload Zone */}
                      <DragDropImageUpload
                        label="Featured Image (Cover Photo)"
                        sublabel="Drag & drop your featured cover photo here, or browse files"
                        value={formData.featuredImage}
                        onChange={(url) => setFormData((prev) => ({ ...prev, featuredImage: url }))}
                        onUpload={(file, onProgress) => uploadImageFile(file, 'featuredImage', onProgress)}
                        fallback="/case-study/property.png"
                        aspectRatio="aspect-[16/9]"
                        helperText="Recommended resolution: 1200 x 675px. Formats: JPG, PNG, WEBP, SVG (Max: 5 MB)"
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div>
                          <label className="block text-xs font-bold text-[#0F3D2E] mb-1.5 uppercase">
                            Project Completion Date
                          </label>
                          <input
                            type="date"
                            value={formData.projectCompletionDate}
                            onChange={(e) => setFormData({ ...formData, projectCompletionDate: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-[#0F3D2E] text-sm focus:outline-none"
                          />
                        </div>
                        <div className="flex items-center gap-3 pt-6">
                          <input
                            type="checkbox"
                            id="isFeatured"
                            checked={formData.isFeatured}
                            onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                            className="w-4 h-4 text-[#E8890C] rounded focus:ring-0 cursor-pointer"
                          />
                          <label htmlFor="isFeatured" className="text-xs font-bold text-[#0F3D2E] cursor-pointer">
                            Mark as Featured Case Study (Shows in homepage highlights)
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab 2: Project Details */}
                  {activeTab === 'details' && (
                    <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#0F3D2E] mb-1.5 uppercase">
                            Client Overview
                          </label>
                          <textarea
                            rows={3}
                            value={formData.clientOverview}
                            onChange={(e) => setFormData({ ...formData, clientOverview: e.target.value })}
                            placeholder="Describe the client business and background..."
                            className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-[#0F3D2E] text-sm focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#0F3D2E] mb-1.5 uppercase">
                            Project Overview
                          </label>
                          <textarea
                            rows={3}
                            value={formData.projectOverview}
                            onChange={(e) => setFormData({ ...formData, projectOverview: e.target.value })}
                            placeholder="Describe the primary mission and project objectives..."
                            className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-[#0F3D2E] text-sm focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#0F3D2E] mb-1.5 uppercase">
                            Project Type
                          </label>
                          <select
                            value={formData.projectType}
                            onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-[#0F3D2E] text-sm focus:outline-none"
                          >
                            {PROJECT_TYPES.map((t) => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#0F3D2E] mb-1.5 uppercase">
                            Duration
                          </label>
                          <input
                            type="text"
                            value={formData.projectDuration}
                            onChange={(e) => setFormData({ ...formData, projectDuration: e.target.value })}
                            placeholder="e.g. 8 Weeks"
                            className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-[#0F3D2E] text-sm focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#0F3D2E] mb-1.5 uppercase">
                            Project URL
                          </label>
                          <input
                            type="url"
                            value={formData.projectUrl}
                            onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                            placeholder="https://..."
                            className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-[#0F3D2E] text-sm focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#0F3D2E] mb-1.5 uppercase">
                            Client Location
                          </label>
                          <input
                            type="text"
                            value={formData.clientLocation}
                            onChange={(e) => setFormData({ ...formData, clientLocation: e.target.value })}
                            placeholder="Sydney, NSW"
                            className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-[#0F3D2E] text-sm focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Services Provided Tags */}
                      <div>
                        <label className="block text-xs font-bold text-[#0F3D2E] mb-1.5 uppercase">
                          Services Provided
                        </label>
                        <div className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={serviceInput}
                            onChange={(e) => setServiceInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddTag('servicesProvided', serviceInput, setServiceInput);
                              }
                            }}
                            placeholder="Type service and press Enter..."
                            className="flex-1 px-3.5 py-2 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-xs text-[#0F3D2E] focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => handleAddTag('servicesProvided', serviceInput, setServiceInput)}
                            className="px-3.5 py-2 rounded-xl bg-[#0F3D2E] text-white text-xs font-bold cursor-pointer"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {formData.servicesProvided?.map((s) => (
                            <span
                              key={s}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-[#0F3D2E] border border-emerald-200"
                            >
                              <span>{s}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveTag('servicesProvided', s)}
                                className="hover:text-red-600 cursor-pointer"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Technologies Used Tags */}
                      <div>
                        <label className="block text-xs font-bold text-[#0F3D2E] mb-1.5 uppercase">
                          Technologies Used
                        </label>
                        <div className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={techInput}
                            onChange={(e) => setTechInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddTag('technologiesUsed', techInput, setTechInput);
                              }
                            }}
                            placeholder="e.g. React, Node.js, Express, MongoDB..."
                            className="flex-1 px-3.5 py-2 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-xs text-[#0F3D2E] focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => handleAddTag('technologiesUsed', techInput, setTechInput)}
                            className="px-3.5 py-2 rounded-xl bg-[#0F3D2E] text-white text-xs font-bold cursor-pointer"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {formData.technologiesUsed?.map((t) => (
                            <span
                              key={t}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-[#F8FAF9] text-[#0F3D2E] border border-[#E5E7EB]"
                            >
                              <span>{t}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveTag('technologiesUsed', t)}
                                className="hover:text-red-600 cursor-pointer"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab 3: Structured Content */}
                  {activeTab === 'content' && (
                    <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] space-y-4">
                      {/* Dynamic Challenges & Solutions Pairs */}
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#E5E7EB]">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-xs font-bold text-[#0F3D2E] uppercase tracking-wide">
                                Challenges & Solutions
                              </h3>
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8890C]/15 text-[#E8890C]">
                                {formData.challengesAndSolutions?.length || 1} {formData.challengesAndSolutions?.length === 1 ? 'Pair' : 'Pairs'}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#64748B] mt-0.5">
                              Add as many challenge and engineered solution pairs as required for this project.
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={handleAddChallengeSolution}
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0F3D2E] hover:bg-[#E8890C] text-white text-xs font-bold transition-all shadow-xs cursor-pointer self-start sm:self-auto"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Pair</span>
                          </button>
                        </div>

                        {/* List of Pairs */}
                        <div className="space-y-4">
                          {(formData.challengesAndSolutions || []).map((pair, idx) => (
                            <div
                              key={idx}
                              className="p-4 sm:p-5 rounded-2xl border border-[#E5E7EB] bg-[#F8FAF9] hover:border-[#0F3D2E]/30 transition-all space-y-3.5 relative"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="w-6 h-6 rounded-full bg-[#0F3D2E] text-white text-xs font-bold flex items-center justify-center">
                                    {idx + 1}
                                  </span>
                                  <span className="text-xs font-bold text-[#0F3D2E] uppercase tracking-wide">
                                    Challenge & Solution Pair #{idx + 1}
                                  </span>
                                </div>
                                {(formData.challengesAndSolutions || []).length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveChallengeSolution(idx)}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors cursor-pointer"
                                    title="Delete this Challenge & Solution pair"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>Remove</span>
                                  </button>
                                )}
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* The Challenge Box */}
                                <div className="p-3.5 rounded-xl bg-white border border-[#E5E7EB] space-y-2">
                                  <div className="flex items-center justify-between">
                                    <label className="block text-[11px] font-bold text-[#E8890C] uppercase tracking-wider">
                                      The Challenge #{idx + 1}
                                    </label>
                                  </div>
                                  <input
                                    type="text"
                                    value={pair.challengeTitle || ''}
                                    onChange={(e) => handleUpdateChallengeSolution(idx, 'challengeTitle', e.target.value)}
                                    placeholder="Challenge Title (e.g. Legacy System Bottlenecks)"
                                    className="w-full px-3 py-1.5 bg-[#F8FAF9] border border-[#E5E7EB] rounded-lg text-xs font-semibold text-[#0F3D2E] focus:outline-none focus:border-[#E8890C]"
                                  />
                                  <textarea
                                    rows={3}
                                    value={pair.challengeDescription || ''}
                                    onChange={(e) => handleUpdateChallengeSolution(idx, 'challengeDescription', e.target.value)}
                                    placeholder="What core business or technical friction was the client experiencing?"
                                    className="w-full px-3 py-2 bg-[#F8FAF9] border border-[#E5E7EB] rounded-lg text-xs text-[#0F3D2E] focus:outline-none focus:border-[#E8890C]"
                                  />
                                </div>

                                {/* Our Solution Box */}
                                <div className="p-3.5 rounded-xl bg-white border border-[#E5E7EB] space-y-2">
                                  <div className="flex items-center justify-between">
                                    <label className="block text-[11px] font-bold text-[#0F3D2E] uppercase tracking-wider">
                                      Our Solution #{idx + 1}
                                    </label>
                                  </div>
                                  <input
                                    type="text"
                                    value={pair.solutionTitle || ''}
                                    onChange={(e) => handleUpdateChallengeSolution(idx, 'solutionTitle', e.target.value)}
                                    placeholder="Solution Title (e.g. Modern Full-Stack Architecture)"
                                    className="w-full px-3 py-1.5 bg-[#F8FAF9] border border-[#E5E7EB] rounded-lg text-xs font-semibold text-[#0F3D2E] focus:outline-none focus:border-[#0F3D2E]"
                                  />
                                  <textarea
                                    rows={3}
                                    value={pair.solutionDescription || ''}
                                    onChange={(e) => handleUpdateChallengeSolution(idx, 'solutionDescription', e.target.value)}
                                    placeholder="What architectural and strategic solutions were engineered?"
                                    className="w-full px-3 py-2 bg-[#F8FAF9] border border-[#E5E7EB] rounded-lg text-xs text-[#0F3D2E] focus:outline-none focus:border-[#0F3D2E]"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Add Another Pair Button */}
                        <button
                          type="button"
                          onClick={handleAddChallengeSolution}
                          className="w-full py-3 border-2 border-dashed border-[#0F3D2E]/25 hover:border-[#E8890C] hover:bg-orange-50/40 rounded-2xl text-[#0F3D2E] hover:text-[#E8890C] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Another Challenge & Solution Pair</span>
                        </button>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#0F3D2E] mb-1.5 uppercase">
                          Implementation & Delivery
                        </label>
                        <textarea
                          rows={3}
                          value={formData.implementation}
                          onChange={(e) => setFormData({ ...formData, implementation: e.target.value })}
                          placeholder="How were sprints orchestrated and quality gates enforced?"
                          className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-[#0F3D2E] text-sm focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#0F3D2E] mb-1.5 uppercase">
                          Results & Key Impact
                        </label>
                        <textarea
                          rows={3}
                          value={formData.results}
                          onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                          placeholder="What quantifiable outcomes and operational benefits resulted?"
                          className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-[#0F3D2E] text-sm focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#0F3D2E] mb-1.5 uppercase">
                          Conclusion
                        </label>
                        <textarea
                          rows={2}
                          value={formData.conclusion}
                          onChange={(e) => setFormData({ ...formData, conclusion: e.target.value })}
                          placeholder="Concluding summary and future roadmap..."
                          className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-[#0F3D2E] text-sm focus:outline-none"
                        />
                      </div>

                      {/* Client Testimonial */}
                      <div className="pt-4 border-t border-[#E5E7EB] space-y-3">
                        <h4 className="text-xs font-bold text-[#0F3D2E] uppercase">Client Testimonial (Optional)</h4>
                        <textarea
                          rows={2}
                          value={formData.testimonial?.quote || ''}
                          onChange={(e) => setFormData({ ...formData, testimonial: { ...formData.testimonial, quote: e.target.value } })}
                          placeholder="Client endorsement quote..."
                          className="w-full px-3.5 py-2 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-xs text-[#0F3D2E]"
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={formData.testimonial?.name || ''}
                            onChange={(e) => setFormData({ ...formData, testimonial: { ...formData.testimonial, name: e.target.value } })}
                            placeholder="Client Name"
                            className="px-3.5 py-2 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-xs text-[#0F3D2E]"
                          />
                          <input
                            type="text"
                            value={formData.testimonial?.designation || ''}
                            onChange={(e) => setFormData({ ...formData, testimonial: { ...formData.testimonial, designation: e.target.value } })}
                            placeholder="Client Designation / Company"
                            className="px-3.5 py-2 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-xs text-[#0F3D2E]"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab 4: Results & Metrics */}
                  {activeTab === 'metrics' && (
                    <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="text-xs font-bold text-[#0F3D2E] uppercase">Metric Cards</h4>
                            <p className="text-xs text-[#64748B]">Add measurable KPI highlights (e.g. 45% Increase in Conversions)</p>
                          </div>
                          <button
                            type="button"
                            onClick={handleAddMetric}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E8890C] text-white text-xs font-bold cursor-pointer hover:bg-[#d07703]"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Metric</span>
                          </button>
                        </div>

                        <div className="space-y-3">
                          {formData.metrics.map((m, idx) => (
                            <div key={idx} className="p-3.5 rounded-xl border border-[#E5E7EB] bg-[#F8FAF9] flex flex-col sm:flex-row gap-3 items-center">
                              <input
                                type="text"
                                value={m.value}
                                onChange={(e) => handleUpdateMetric(idx, 'value', e.target.value)}
                                placeholder="Value (e.g. 45%, 3x)"
                                className="w-full sm:w-28 px-3 py-2 bg-white border border-[#E5E7EB] rounded-lg text-xs font-bold text-[#0F3D2E]"
                              />
                              <input
                                type="text"
                                value={m.label}
                                onChange={(e) => handleUpdateMetric(idx, 'label', e.target.value)}
                                placeholder="Label (e.g. Increase in Conversions)"
                                className="w-full sm:w-48 px-3 py-2 bg-white border border-[#E5E7EB] rounded-lg text-xs font-semibold text-[#0F3D2E]"
                              />
                              <input
                                type="text"
                                value={m.description}
                                onChange={(e) => handleUpdateMetric(idx, 'description', e.target.value)}
                                placeholder="Brief description..."
                                className="flex-1 w-full px-3 py-2 bg-white border border-[#E5E7EB] rounded-lg text-xs text-[#64748B]"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveMetric(idx)}
                                className="p-2 text-red-500 hover:text-red-700 cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Before & After Comparison */}
                      <div className="pt-4 border-t border-[#E5E7EB] space-y-3">
                        <h4 className="text-xs font-bold text-[#0F3D2E] uppercase">Before & After Showcase (Optional)</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="p-3.5 rounded-xl border border-[#E5E7EB] bg-[#F8FAF9] space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-[#0F3D2E]">Before Image</span>
                              {formData.beforeAfter?.beforeImage && (
                                <button
                                  type="button"
                                  onClick={() => setFormData({ ...formData, beforeAfter: { ...formData.beforeAfter, beforeImage: '' } })}
                                  className="text-[11px] text-red-500 hover:underline cursor-pointer"
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                            <div className="flex gap-2 items-center">
                              {formData.beforeAfter?.beforeImage && (
                                <div className="w-12 h-10 rounded-lg overflow-hidden bg-slate-200 border border-[#E5E7EB] flex-shrink-0">
                                  <img
                                    src={getImageUrl(formData.beforeAfter.beforeImage, '/case-study/property.png')}
                                    alt="Before preview"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = '/case-study/property.png';
                                    }}
                                  />
                                </div>
                              )}
                              <input
                                type="text"
                                value={formData.beforeAfter?.beforeImage || ''}
                                onChange={(e) => setFormData({ ...formData, beforeAfter: { ...formData.beforeAfter, beforeImage: e.target.value } })}
                                placeholder="/case-study/before.png"
                                className="flex-1 px-3 py-1.5 bg-white border border-[#E5E7EB] rounded-lg text-xs text-[#0F3D2E] focus:outline-none"
                              />
                              <label className="p-2 rounded-lg bg-[#0F3D2E] text-white cursor-pointer hover:bg-emerald-900 transition-colors">
                                <Upload className="w-3.5 h-3.5" />
                                <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'beforeImage')} />
                              </label>
                            </div>
                            <input
                              type="text"
                              value={formData.beforeAfter?.beforeDescription || ''}
                              onChange={(e) => setFormData({ ...formData, beforeAfter: { ...formData.beforeAfter, beforeDescription: e.target.value } })}
                              placeholder="Legacy slow portal with high churn..."
                              className="w-full px-3 py-1.5 bg-white border border-[#E5E7EB] rounded-lg text-xs"
                            />
                          </div>

                          <div className="p-3.5 rounded-xl border border-[#E5E7EB] bg-[#F8FAF9] space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-[#0F3D2E]">After Image</span>
                              {formData.beforeAfter?.afterImage && (
                                <button
                                  type="button"
                                  onClick={() => setFormData({ ...formData, beforeAfter: { ...formData.beforeAfter, afterImage: '' } })}
                                  className="text-[11px] text-red-500 hover:underline cursor-pointer"
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                            <div className="flex gap-2 items-center">
                              {formData.beforeAfter?.afterImage && (
                                <div className="w-12 h-10 rounded-lg overflow-hidden bg-slate-200 border border-[#E5E7EB] flex-shrink-0">
                                  <img
                                    src={getImageUrl(formData.beforeAfter.afterImage, '/case-study/property.png')}
                                    alt="After preview"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = '/case-study/property.png';
                                    }}
                                  />
                                </div>
                              )}
                              <input
                                type="text"
                                value={formData.beforeAfter?.afterImage || ''}
                                onChange={(e) => setFormData({ ...formData, beforeAfter: { ...formData.beforeAfter, afterImage: e.target.value } })}
                                placeholder="/case-study/after.png"
                                className="flex-1 px-3 py-1.5 bg-white border border-[#E5E7EB] rounded-lg text-xs text-[#0F3D2E] focus:outline-none"
                              />
                              <label className="p-2 rounded-lg bg-[#0F3D2E] text-white cursor-pointer hover:bg-emerald-900 transition-colors">
                                <Upload className="w-3.5 h-3.5" />
                                <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'afterImage')} />
                              </label>
                            </div>
                            <input
                              type="text"
                              value={formData.beforeAfter?.afterDescription || ''}
                              onChange={(e) => setFormData({ ...formData, beforeAfter: { ...formData.beforeAfter, afterDescription: e.target.value } })}
                              placeholder="High-converting modern web application..."
                              className="w-full px-3 py-1.5 bg-white border border-[#E5E7EB] rounded-lg text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab 5: SEO */}
                  {activeTab === 'seo' && (
                    <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-[#0F3D2E] mb-1.5 uppercase">
                          Meta Title (50–60 chars)
                        </label>
                        <input
                          type="text"
                          value={formData.metaTitle}
                          onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                          placeholder="VR4Web Case Study | How We Engineered..."
                          className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-[#0F3D2E] text-sm focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#0F3D2E] mb-1.5 uppercase">
                          Meta Description (120–160 chars)
                        </label>
                        <textarea
                          rows={2}
                          value={formData.metaDescription}
                          onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                          placeholder="Detailed case study examining how VR4Web deployed scalable cloud software..."
                          className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-[#0F3D2E] text-sm focus:outline-none"
                        />
                      </div>

                      {/* Google Search Result Preview */}
                      <div className="pt-2">
                        <span className="block text-xs font-bold text-[#0F3D2E] mb-2 uppercase">Google Search Preview</span>
                        <div className="p-4 rounded-xl border border-[#E5E7EB] bg-[#F8FAF9] max-w-xl">
                          <div className="text-xs text-slate-700 font-mono truncate">
                            https://vr4web.com/case-study/{formData.slug || 'your-slug'}
                          </div>
                          <div className="text-base font-semibold text-[#1a0dab] hover:underline cursor-pointer truncate mt-0.5">
                            {formData.metaTitle || formData.title || 'Case Study Title'}
                          </div>
                          <div className="text-xs text-slate-600 mt-1 line-clamp-2">
                            {formData.metaDescription || formData.shortDescription || 'Read our detailed case study analysis on how we delivered innovative digital outcomes.'}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* ──────────────────────────────────────────────────
                   MODE 2: QUICK CREATE (SINGLE QUILL RICH TEXT EDITOR)
                   ────────────────────────────────────────────────── */
                <div className="space-y-6">
                  {/* Basic Inputs for Quick Mode */}
                  <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0F3D2E] mb-1.5 uppercase">
                        Case Study Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="Enter case study title..."
                        className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-[#0F3D2E] text-sm font-bold focus:bg-white focus:outline-none focus:border-[#E8890C]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#0F3D2E] mb-1.5 uppercase">
                          Slug *
                        </label>
                        <input
                          type="text"
                          value={formData.slug}
                          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                          className="w-full px-3.5 py-2 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#0F3D2E] mb-1.5 uppercase">
                          Client Name
                        </label>
                        <input
                          type="text"
                          value={formData.clientName}
                          onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                          placeholder="Client Company"
                          className="w-full px-3.5 py-2 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#0F3D2E] mb-1.5 uppercase">
                          Industry
                        </label>
                        <select
                          value={formData.industry}
                          onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                          className="w-full px-3.5 py-2 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-xs"
                        >
                          {INDUSTRIES.map((ind) => (
                            <option key={ind} value={ind}>{ind}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Featured Image Drag & Drop for Quick Mode */}
                    <div className="pt-2">
                      <DragDropImageUpload
                        label="Featured Cover Photo"
                        sublabel="Drag & drop your case study cover photo here, or browse files"
                        value={formData.featuredImage}
                        onChange={(url) => setFormData((prev) => ({ ...prev, featuredImage: url }))}
                        onUpload={(file, onProgress) => uploadImageFile(file, 'featuredImage', onProgress)}
                        fallback="/case-study/property.png"
                        aspectRatio="aspect-[16/9]"
                        helperText="Visual cover displayed on case study listings and social shares (Max: 5 MB)"
                      />
                    </div>
                  </div>

                  {/* Single Quill Rich Text Editor */}
                  <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E5E7EB]">
                      <div>
                        <h4 className="text-sm font-bold text-[#0F3D2E]">Rich Text Content Editor</h4>
                        <p className="text-xs text-[#64748B]">
                          Copy & paste complete case study documents from Word or Docs with formatting preserved.
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleInsertTemplate}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#0F3D2E] border border-emerald-200 text-xs font-bold cursor-pointer transition-colors"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-[#E8890C]" />
                          <span>Insert Case Study Template</span>
                        </button>
                      </div>
                    </div>

                    {uploadProgress !== null && (
                      <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-[#E8890C] font-semibold flex items-center gap-2">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Uploading image: {uploadProgress}%</span>
                      </div>
                    )}

                    <div className="quill-editor-wrapper">
                      <ReactQuill
                        ref={quillRef}
                        theme="snow"
                        value={formData.content}
                        onChange={(val) => setFormData({ ...formData, content: val })}
                        modules={quillModules}
                        placeholder="Write or paste your complete case study here..."
                        style={{ height: '350px', marginBottom: '45px' }}
                      />
                    </div>
                  </div>

                  {/* Optional Quick Create Details Accordion */}
                  <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setQuickDetailsExpanded(!quickDetailsExpanded)}
                      className="w-full p-4 flex items-center justify-between text-left hover:bg-[#F8FAF9] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2 font-bold text-xs text-[#0F3D2E] uppercase">
                        <Sliders className="w-4 h-4 text-[#E8890C]" />
                        <span>Additional Details (Optional)</span>
                      </div>
                      {quickDetailsExpanded ? <ChevronUp className="w-4 h-4 text-[#64748B]" /> : <ChevronDown className="w-4 h-4 text-[#64748B]" />}
                    </button>

                    {quickDetailsExpanded && (
                      <div className="p-6 pt-2 border-t border-[#E5E7EB] space-y-4 bg-[#F8FAF9]">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-[#0F3D2E] mb-1">Project Type</label>
                            <input
                              type="text"
                              value={formData.projectType}
                              onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                              className="w-full px-3 py-1.5 bg-white border border-[#E5E7EB] rounded-lg text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-[#0F3D2E] mb-1">Duration</label>
                            <input
                              type="text"
                              value={formData.projectDuration}
                              onChange={(e) => setFormData({ ...formData, projectDuration: e.target.value })}
                              className="w-full px-3 py-1.5 bg-white border border-[#E5E7EB] rounded-lg text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-[#0F3D2E] mb-1">Live URL</label>
                            <input
                              type="url"
                              value={formData.projectUrl}
                              onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                              className="w-full px-3 py-1.5 bg-white border border-[#E5E7EB] rounded-lg text-xs"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#0F3D2E] mb-1">Short Description</label>
                          <textarea
                            rows={2}
                            value={formData.shortDescription}
                            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                            className="w-full px-3 py-1.5 bg-white border border-[#E5E7EB] rounded-lg text-xs"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Action Footer */}
            <div className="p-4 sm:p-5 border-t border-[#E5E7EB] bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-[#64748B] hover:text-[#0F3D2E] hover:bg-[#F8FAF9] transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
                {/* Save Draft */}
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => handleSave('draft')}
                  className="px-4 py-2.5 rounded-xl border border-[#0F3D2E] text-[#0F3D2E] hover:bg-[#F8FAF9] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save as Draft</span>
                </button>

                {/* Preview */}
                <button
                  type="button"
                  onClick={() => setPreviewOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-[#F8FAF9] border border-[#E5E7EB] hover:bg-slate-100 text-[#0F3D2E] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-[#E8890C]" />
                  <span>Preview</span>
                </button>

                {/* Publish */}
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => handleSave('published')}
                  className="px-5 py-2.5 rounded-xl bg-[#E8890C] hover:bg-[#d07703] text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{saving ? 'Publishing...' : 'Publish Case Study'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          LIVE PREVIEW MODAL
         ───────────────────────────────────────────────────────────── */}
      {previewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white border border-[#E5E7EB] rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-[#E5E7EB] flex items-center justify-between bg-[#0F3D2E] text-white">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#E8890C]" />
                <span className="font-bold text-sm">Public Details Page Live Preview</span>
              </div>
              <button onClick={() => setPreviewOpen(false)} className="text-white hover:text-[#E8890C]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8">
              {/* Preview Hero */}
              <div className="border-b border-[#E5E7EB] pb-6">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-[#0F3D2E] border border-emerald-200">
                  {formData.category} · {formData.industry}
                </span>
                <h1 className="text-2xl sm:text-4xl font-black text-[#0F3D2E] mt-3">
                  {formData.title || 'Case Study Title'}
                </h1>
                <p className="text-[#64748B] text-sm sm:text-base mt-2 max-w-2xl">
                  {formData.shortDescription || 'Short overview and summary of this client case study.'}
                </p>
                {formData.clientName && (
                  <p className="text-xs text-[#E8890C] font-semibold mt-2">
                    Client: {formData.clientName}
                  </p>
                )}
              </div>

              {/* Preview Featured Image */}
              {formData.featuredImage && (
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#E5E7EB] bg-slate-100 shadow-xs">
                  <img
                    src={getImageUrl(formData.featuredImage, '/case-study/property.png')}
                    alt={formData.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/case-study/property.png';
                    }}
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0F3D2E]/90 text-white text-xs font-bold backdrop-blur-xs">
                    {formData.clientName || 'Case Study Cover'}
                  </div>
                </div>
              )}

              {/* Main Content Render */}
              {formData.creationMode === 'quick' ? (
                <div
                  className="prose max-w-none text-[#0F3D2E]"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(formData.content || '<p>No content entered yet...</p>') }}
                />
              ) : (
                <div className="space-y-6 text-[#0F3D2E]">
                  {formData.challengesAndSolutions?.length > 0 ? (
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-[#0F3D2E]">Challenges & Strategic Solutions</h3>
                      <div className="space-y-3">
                        {formData.challengesAndSolutions.map((cs, idx) => (
                          <div key={idx} className="p-4 rounded-xl border border-[#E5E7EB] bg-[#F8FAF9] space-y-3">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-[#E8890C] text-white text-[11px] font-bold flex items-center justify-center">
                                {idx + 1}
                              </span>
                              <span className="text-xs font-bold text-[#0F3D2E] uppercase">Pair #{idx + 1}</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="border-l-2 border-[#E8890C] pl-3">
                                <div className="text-xs font-bold text-[#E8890C] uppercase mb-1">
                                  {cs.challengeTitle || `Challenge ${idx + 1}`}
                                </div>
                                <p className="text-xs text-[#64748B] leading-relaxed whitespace-pre-line">
                                  {cs.challengeDescription || 'No challenge description provided'}
                                </p>
                              </div>
                              <div className="border-l-2 border-[#0F3D2E] pl-3">
                                <div className="text-xs font-bold text-[#0F3D2E] uppercase mb-1">
                                  {cs.solutionTitle || `Strategic Solution ${idx + 1}`}
                                </div>
                                <p className="text-xs text-[#64748B] leading-relaxed whitespace-pre-line">
                                  {cs.solutionDescription || 'No solution description provided'}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      {formData.challenge && (
                        <div>
                          <h3 className="text-xl font-bold text-[#0F3D2E] mb-2">The Challenge</h3>
                          <p className="text-sm text-[#64748B] leading-relaxed whitespace-pre-line">{formData.challenge}</p>
                        </div>
                      )}
                      {formData.solution && (
                        <div>
                          <h3 className="text-xl font-bold text-[#0F3D2E] mb-2">Our Solution</h3>
                          <p className="text-sm text-[#64748B] leading-relaxed whitespace-pre-line">{formData.solution}</p>
                        </div>
                      )}
                    </>
                  )}
                  {formData.implementation && (
                    <div>
                      <h3 className="text-xl font-bold text-[#0F3D2E] mb-2">Implementation</h3>
                      <p className="text-sm text-[#64748B] leading-relaxed whitespace-pre-line">{formData.implementation}</p>
                    </div>
                  )}
                  {formData.results && (
                    <div>
                      <h3 className="text-xl font-bold text-[#0F3D2E] mb-2">Results & Impact</h3>
                      <p className="text-sm text-[#64748B] leading-relaxed whitespace-pre-line">{formData.results}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Metrics Preview */}
              {formData.metrics?.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E5E7EB]">
                  {formData.metrics.map((m, i) => (
                    <div key={i} className="p-4 rounded-xl border border-[#E5E7EB] bg-[#F8FAF9]">
                      <div className="text-2xl font-black text-[#0F3D2E]">{m.value}</div>
                      <div className="text-xs font-bold text-[#E8890C] uppercase mt-0.5">{m.label}</div>
                      <div className="text-xs text-[#64748B] mt-1">{m.description}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Testimonial Preview */}
              {formData.testimonial?.quote && (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <p className="text-sm font-medium italic text-[#0F3D2E]">"{formData.testimonial.quote}"</p>
                  <p className="text-xs font-bold text-[#0F3D2E] mt-2">— {formData.testimonial.name || 'Client Lead'} ({formData.testimonial.designation || 'Partner'})</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        title="Delete Case Study?"
        message="Are you sure you want to delete this case study? This action will remove it from the public listing."
        itemName={deleteTarget?.title}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

