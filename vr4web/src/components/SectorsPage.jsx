import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HeartPulse,
  TrendingUp,
  Landmark,
  ShoppingCart,
  GraduationCap,
  Truck,
  Home,
  Plane,
  Utensils,
  Clapperboard,
  BatteryCharging,
  Cloud,
  Clock,
  Share2,
  Sprout,
  Radio,
  Fuel,
  Car,
  ShieldCheck,
  Factory,
  Pill,
  Rocket,
  Ship,
  Atom,
  Shirt,
  Sparkles,
  Gem,
  Dumbbell,
  Users,
  Headphones,
  HardHat,
  Scale,
  Building,
  Award,
  ShieldAlert,
  Code2,
  Gamepad2,
  Lightbulb,
  Wind,
  Wine,
  ArrowRight,
  Search,
  CheckCircle2,
  X,
  Send,
  MapPin,
  Layers,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

// Stylized Kangaroo Icon
const AustralianKangarooIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M21.7 5.5c-.3-.4-1-.4-1.3 0l-1.8 1.8c-.6-.4-1.3-.6-2-.5l-2-1.6c-.3-.2-.8-.2-1.1.1l-1.2 1.2c-.3.3-.3.7-.1 1l.7 1.5c-.8.8-1.5 1.7-1.9 2.8l-4 2.1c-.4.2-.6.7-.4 1.1.2.4.7.6 1.1.6h2.1c.2.7.5 1.4.9 2l-4 2.2c-.4.2-.6.7-.4 1.1.2.4.7.6 1.1.6h5.4c3.4 0 6.1-2.7 6.3-6.1.1-1.7-.5-3.3-1.7-4.5l1.9-1.5c.4-.3.4-.9.1-1.3l-.4-.1z" />
  </svg>
);

// 6 Distinct 3D Geometric Vector Compositions inspired by reference screenshot
const GeometricGraphic = ({ themeIndex }) => {
  const index = themeIndex % 6;

  // 0: Emerald / Teal composition
  if (index === 0) {
    return (
      <svg className="w-24 h-24 sm:w-28 sm:h-28" viewBox="0 0 120 120" fill="none">
        <defs>
          <linearGradient id="g0_1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <linearGradient id="g0_2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <pattern id="pat0" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="8" stroke="#047857" strokeWidth="1.5" opacity="0.25" />
          </pattern>
        </defs>
        <circle cx="85" cy="85" r="28" fill="url(#g0_1)" opacity="0.85" />
        <circle cx="85" cy="85" r="28" fill="url(#pat0)" />
        <rect x="35" y="45" width="45" height="45" rx="14" fill="url(#g0_2)" opacity="0.9" />
        <circle cx="48" cy="86" r="16" fill="#a7f3d0" opacity="0.95" />
        <circle cx="28" cy="98" r="12" fill="#065f46" opacity="0.7" />
      </svg>
    );
  }

  // 1: Amber / Mustard Wood Blocks
  if (index === 1) {
    return (
      <svg className="w-24 h-24 sm:w-28 sm:h-28" viewBox="0 0 120 120" fill="none">
        <defs>
          <linearGradient id="g1_1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
          <pattern id="pat1" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
            <line x1="0" y1="0" x2="0" y2="6" stroke="#78350f" strokeWidth="1.2" opacity="0.3" />
          </pattern>
        </defs>
        <path d="M45 40 L85 20 L85 70 L45 90 Z" fill="#fcd34d" opacity="0.95" />
        <path d="M85 20 L115 40 L115 90 L85 70 Z" fill="#d97706" opacity="0.85" />
        <circle cx="50" cy="86" r="22" fill="url(#g1_1)" />
        <circle cx="50" cy="86" r="22" fill="url(#pat1)" />
        <rect x="70" y="70" width="38" height="26" rx="6" fill="#b45309" opacity="0.9" />
      </svg>
    );
  }

  // 2: Coral / Crimson Arches
  if (index === 2) {
    return (
      <svg className="w-24 h-24 sm:w-28 sm:h-28" viewBox="0 0 120 120" fill="none">
        <defs>
          <linearGradient id="g2_1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#be123c" />
          </linearGradient>
          <pattern id="pat2" width="7" height="7" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="7" y2="7" stroke="#881337" strokeWidth="1.3" opacity="0.3" />
          </pattern>
        </defs>
        <path d="M40 96 C40 50, 110 50, 110 96 Z" fill="url(#g2_1)" opacity="0.9" />
        <path d="M40 96 C40 50, 110 50, 110 96 Z" fill="url(#pat2)" />
        <circle cx="45" cy="86" r="20" fill="#9f1239" />
        <circle cx="45" cy="86" r="20" fill="url(#pat2)" />
        <circle cx="28" cy="98" r="10" fill="#fda4af" />
      </svg>
    );
  }

  // 3: Purple / Lavender Waves & Orb
  if (index === 3) {
    return (
      <svg className="w-24 h-24 sm:w-28 sm:h-28" viewBox="0 0 120 120" fill="none">
        <defs>
          <linearGradient id="g3_1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#6b21a8" />
          </linearGradient>
          <pattern id="pat3" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(60)">
            <line x1="0" y1="0" x2="0" y2="6" stroke="#4c1d95" strokeWidth="1.2" opacity="0.35" />
          </pattern>
        </defs>
        <path d="M30 96 Q50 60 70 75 Q90 90 110 65 L110 96 Z" fill="#c084fc" opacity="0.85" />
        <path d="M30 96 Q50 60 70 75 Q90 90 110 65 L110 96 Z" fill="url(#pat3)" />
        <circle cx="95" cy="65" r="18" fill="url(#g3_1)" />
        <circle cx="95" cy="65" r="18" fill="url(#pat3)" />
        <ellipse cx="60" cy="90" rx="28" ry="14" fill="#7e22ce" opacity="0.8" />
      </svg>
    );
  }

  // 4: Cobalt Blue Geometric Blocks & Prism
  if (index === 4) {
    return (
      <svg className="w-24 h-24 sm:w-28 sm:h-28" viewBox="0 0 120 120" fill="none">
        <defs>
          <linearGradient id="g4_1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
          <pattern id="pat4" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="7" stroke="#172554" strokeWidth="1.3" opacity="0.3" />
          </pattern>
        </defs>
        <rect x="65" y="45" width="40" height="45" fill="#1d4ed8" opacity="0.9" />
        <path d="M35 85 L70 45 L70 85 Z" fill="#60a5fa" opacity="0.95" />
        <circle cx="50" cy="90" r="16" fill="url(#g4_1)" />
        <circle cx="50" cy="90" r="16" fill="url(#pat4)" />
        <rect x="80" y="70" width="30" height="26" fill="#172554" opacity="0.85" />
      </svg>
    );
  }

  // 5: Caramel / Orange Concentric Arches
  return (
    <svg className="w-24 h-24 sm:w-28 sm:h-28" viewBox="0 0 120 120" fill="none">
      <defs>
        <linearGradient id="g5_1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#c2410c" />
        </linearGradient>
        <pattern id="pat5" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#7c2d12" strokeWidth="1.2" opacity="0.3" />
        </pattern>
      </defs>
      <rect x="40" y="55" width="32" height="42" rx="16" fill="url(#g5_1)" opacity="0.9" />
      <rect x="74" y="45" width="36" height="52" rx="8" fill="#fdba74" opacity="0.95" />
      <circle cx="92" cy="70" r="14" fill="#ea580c" />
      <circle cx="92" cy="70" r="14" fill="url(#pat5)" />
      <circle cx="55" cy="85" r="12" fill="#9a3412" opacity="0.8" />
    </svg>
  );
};

// 40 Sectors Data with matched icons, categories, and color accents
const sectorsList = [
  { id: 1, name: 'Healthcare', category: 'Health & Science', icon: HeartPulse, desc: "Next-gen telehealth portals, electronic health records & AI diagnostic workflows.", color: 'emerald' },
  { id: 2, name: 'Finance', category: 'Finance & Commerce', icon: TrendingUp, desc: "Algorithmic trading engines, wealth management & secure ledger systems.", color: 'amber' },
  { id: 3, name: 'Banking', category: 'Finance & Commerce', icon: Landmark, desc: "Core banking interfaces, omnichannel client vaults & AML compliance.", color: 'blue' },
  { id: 4, name: 'E-Commerce', category: 'Finance & Commerce', icon: ShoppingCart, desc: "High-volume headless storefronts, multi-vendor marketplaces & checkout pipelines.", color: 'rose' },
  { id: 5, name: 'Education', category: 'Services & Public', icon: GraduationCap, desc: "Interactive LMS platforms, immersive virtual classrooms & micro-credentialing.", color: 'purple' },
  { id: 6, name: 'Logistics', category: 'Industrial & Supply', icon: Truck, desc: "Fleet telematics, automated warehouse dispatch & freight route tracking.", color: 'cyan' },
  { id: 7, name: 'Real Estate', category: 'Services & Public', icon: Home, desc: "Virtual 3D property walkthroughs, MLS automation & tenant portals.", color: 'indigo' },
  { id: 8, name: 'Travel', category: 'Lifestyle & Media', icon: Plane, desc: "Dynamic booking aggregators, itinerary engines & loyalty ecosystems.", color: 'orange' },
  { id: 9, name: 'Restaurant', category: 'Lifestyle & Media', icon: Utensils, desc: "Cloud POS integrations, smart kitchen display systems & mobile ordering.", color: 'rose' },
  { id: 10, name: 'Entertainment', category: 'Lifestyle & Media', icon: Clapperboard, desc: "High-throughput streaming backends, digital rights & interactive media.", color: 'purple' },
  { id: 11, name: 'EV', category: 'Industrial & Supply', icon: BatteryCharging, desc: "Smart charging network protocols, battery telemetry & fleet telemetry IoT.", color: 'emerald' },
  { id: 12, name: 'SaaS', category: 'Tech & Digital', icon: Cloud, desc: "Multi-tenant cloud architecture, automated subscriptions & analytics pipelines.", color: 'blue' },
  { id: 13, name: 'On-Demand', category: 'Tech & Digital', icon: Clock, desc: "Real-time dispatch algorithms, geolocation tracking & micro-fulfillment.", color: 'amber' },
  { id: 14, name: 'Social Media', category: 'Tech & Digital', icon: Share2, desc: "Community feeds, algorithmic recommendation engines & real-time messaging.", color: 'sky' },
  { id: 15, name: 'Agriculture', category: 'Industrial & Supply', icon: Sprout, desc: "Precision agritech telemetry, crop yield AI & supply chain tracing.", color: 'emerald' },
  { id: 16, name: 'Telecom', category: 'Tech & Digital', icon: Radio, desc: "5G network operations, customer self-care portals & billing provisioning.", color: 'blue' },
  { id: 17, name: 'Oil and Gas', category: 'Energy & Utilities', icon: Fuel, desc: "Rig safety monitoring, pipeline SCADA systems & geospatial telemetry.", color: 'amber' },
  { id: 18, name: 'Automotive', category: 'Industrial & Supply', icon: Car, desc: "Connected vehicle software, dealership portals & digital showroom 3D.", color: 'rose' },
  { id: 19, name: 'Insurance', category: 'Finance & Commerce', icon: ShieldCheck, desc: "Automated claims adjustment, actuarial AI models & policyholder portals.", color: 'cyan' },
  { id: 20, name: 'Manufacturing', category: 'Industrial & Supply', icon: Factory, desc: "Industry 4.0 IoT instrumentation, digital twins & MES integration.", color: 'slate' },
  { id: 21, name: 'Pharmaceuticals', category: 'Health & Science', icon: Pill, desc: "Clinical trial registries, supply serialization & compliance automation.", color: 'rose' },
  { id: 22, name: 'Aerospace & Aviation', category: 'Industrial & Supply', icon: Rocket, desc: "Flight scheduling optimization, MRO logistics & spatial training modules.", color: 'blue' },
  { id: 23, name: 'Marine & Shipping', category: 'Industrial & Supply', icon: Ship, desc: "Vessel tracking telemetry, port logistics ERP & automated bill of lading.", color: 'cyan' },
  { id: 24, name: 'Chemicals', category: 'Industrial & Supply', icon: Atom, desc: "Batch process management, hazardous material compliance & SDS databases.", color: 'purple' },
  { id: 25, name: 'Fashion & Apparel', category: 'Lifestyle & Media', icon: Shirt, desc: "Virtual fitting rooms, omni-channel inventory & bespoke lookbook tech.", color: 'pink' },
  { id: 26, name: 'Beauty & Personal Care', category: 'Lifestyle & Media', icon: Sparkles, desc: "AR makeup try-on, subscription replenishment & customer beauty profiles.", color: 'rose' },
  { id: 27, name: 'Jewellery & Luxury', category: 'Lifestyle & Media', icon: Gem, desc: "High-fidelity 3D WebGL configurators, certificate vaults & VIP styling.", color: 'amber' },
  { id: 28, name: 'Sports & Fitness', category: 'Lifestyle & Media', icon: Dumbbell, desc: "Wearable telemetry synchronization, member portals & performance coaching.", color: 'orange' },
  { id: 29, name: 'Human Resources & Recruitment', category: 'Services & Public', icon: Users, desc: "Applicant tracking pipelines, automated onboarding & talent intelligence.", color: 'indigo' },
  { id: 30, name: 'BPO & Business Services', category: 'Services & Public', icon: Headphones, desc: "Workflow automation, contact center CRM integration & SLA ticketing.", color: 'teal' },
  { id: 31, name: 'Construction & Engineering', category: 'Industrial & Supply', icon: HardHat, desc: "BIM coordination viewers, job-site field reports & project takeoff.", color: 'amber' },
  { id: 32, name: 'Legal Services', category: 'Services & Public', icon: Scale, desc: "Matter management, automated e-discovery & secure client retainers.", color: 'slate' },
  { id: 33, name: 'Government & Public Sector', category: 'Services & Public', icon: Building, desc: "Citizen self-service portals, secure GovTech infrastructure & GIS tools.", color: 'blue' },
  { id: 34, name: 'Professional Services', category: 'Services & Public', icon: Award, desc: "Time tracking, resource allocation matrices & client billing suites.", color: 'emerald' },
  { id: 35, name: 'Cybersecurity', category: 'Tech & Digital', icon: ShieldAlert, desc: "Zero-trust access architectures, threat monitoring & compliance audits.", color: 'red' },
  { id: 36, name: 'IT & Software', category: 'Tech & Digital', icon: Code2, desc: "Cloud-native DevOps pipelines, API middleware & microservices scaling.", color: 'indigo' },
  { id: 37, name: 'Gaming', category: 'Lifestyle & Media', icon: Gamepad2, desc: "Multiplayer backends, WebGL 3D game engines & economy asset systems.", color: 'purple' },
  { id: 38, name: 'Energy & Utilities', category: 'Energy & Utilities', icon: Lightbulb, desc: "Smart grid metering, demand-response dashboards & outage dispatch.", color: 'amber' },
  { id: 39, name: 'Renewable Energy', category: 'Energy & Utilities', icon: Wind, desc: "Solar & wind telemetry, carbon credit trading & asset performance.", color: 'emerald' },
  { id: 40, name: 'Food & Beverage', category: 'Lifestyle & Media', icon: Wine, desc: "Farm-to-fork traceability, cold chain monitoring & distribution ERP.", color: 'orange' },
];

const categoryTabs = [
  'All Sectors (40)',
  'Finance & Commerce',
  'Tech & Digital',
  'Industrial & Supply',
  'Health & Science',
  'Lifestyle & Media',
  'Services & Public',
  'Energy & Utilities',
];

// Color styling maps matching pastel stamps from reference image
const colorStyles = {
  emerald: {
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    hoverBorder: 'hover:border-emerald-300',
    shadowGlow: 'hover:shadow-[0_20px_45px_rgba(16,185,129,0.15)]',
    arrowBg: 'hover:bg-emerald-600',
    pill: 'bg-emerald-50 text-emerald-800 border-emerald-200'
  },
  amber: {
    badge: 'bg-amber-50 text-amber-700 border-amber-200/80',
    hoverBorder: 'hover:border-amber-300',
    shadowGlow: 'hover:shadow-[0_20px_45px_rgba(245,158,11,0.15)]',
    arrowBg: 'hover:bg-amber-600',
    pill: 'bg-amber-50 text-amber-800 border-amber-200'
  },
  blue: {
    badge: 'bg-blue-50 text-blue-700 border-blue-200/80',
    hoverBorder: 'hover:border-blue-300',
    shadowGlow: 'hover:shadow-[0_20px_45px_rgba(59,130,246,0.15)]',
    arrowBg: 'hover:bg-[#172554]',
    pill: 'bg-blue-50 text-blue-800 border-blue-200'
  },
  rose: {
    badge: 'bg-rose-50 text-rose-700 border-rose-200/80',
    hoverBorder: 'hover:border-rose-300',
    shadowGlow: 'hover:shadow-[0_20px_45px_rgba(244,63,94,0.15)]',
    arrowBg: 'hover:bg-rose-600',
    pill: 'bg-rose-50 text-rose-800 border-rose-200'
  },
  purple: {
    badge: 'bg-purple-50 text-purple-700 border-purple-200/80',
    hoverBorder: 'hover:border-purple-300',
    shadowGlow: 'hover:shadow-[0_20px_45px_rgba(168,85,247,0.15)]',
    arrowBg: 'hover:bg-purple-600',
    pill: 'bg-purple-50 text-purple-800 border-purple-200'
  },
  cyan: {
    badge: 'bg-cyan-50 text-cyan-700 border-cyan-200/80',
    hoverBorder: 'hover:border-cyan-300',
    shadowGlow: 'hover:shadow-[0_20px_45px_rgba(6,182,212,0.15)]',
    arrowBg: 'hover:bg-cyan-600',
    pill: 'bg-cyan-50 text-cyan-800 border-cyan-200'
  },
  indigo: {
    badge: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
    hoverBorder: 'hover:border-indigo-300',
    shadowGlow: 'hover:shadow-[0_20px_45px_rgba(99,102,241,0.15)]',
    arrowBg: 'hover:bg-indigo-600',
    pill: 'bg-indigo-50 text-indigo-800 border-indigo-200'
  },
  orange: {
    badge: 'bg-orange-50 text-orange-700 border-orange-200/80',
    hoverBorder: 'hover:border-orange-300',
    shadowGlow: 'hover:shadow-[0_20px_45px_rgba(249,115,22,0.15)]',
    arrowBg: 'hover:bg-orange-600',
    pill: 'bg-orange-50 text-orange-800 border-orange-200'
  },
  sky: {
    badge: 'bg-sky-50 text-sky-700 border-sky-200/80',
    hoverBorder: 'hover:border-sky-300',
    shadowGlow: 'hover:shadow-[0_20px_45px_rgba(14,165,233,0.15)]',
    arrowBg: 'hover:bg-sky-600',
    pill: 'bg-sky-50 text-sky-800 border-sky-200'
  },
  slate: {
    badge: 'bg-slate-100 text-slate-700 border-slate-300',
    hoverBorder: 'hover:border-slate-400',
    shadowGlow: 'hover:shadow-[0_20px_45px_rgba(100,116,139,0.15)]',
    arrowBg: 'hover:bg-slate-800',
    pill: 'bg-slate-100 text-slate-800 border-slate-300'
  },
  teal: {
    badge: 'bg-teal-50 text-teal-700 border-teal-200/80',
    hoverBorder: 'hover:border-teal-300',
    shadowGlow: 'hover:shadow-[0_20px_45px_rgba(20,184,166,0.15)]',
    arrowBg: 'hover:bg-teal-600',
    pill: 'bg-teal-50 text-teal-800 border-teal-200'
  },
  pink: {
    badge: 'bg-pink-50 text-pink-700 border-pink-200/80',
    hoverBorder: 'hover:border-pink-300',
    shadowGlow: 'hover:shadow-[0_20px_45px_rgba(236,72,153,0.15)]',
    arrowBg: 'hover:bg-pink-600',
    pill: 'bg-pink-50 text-pink-800 border-pink-200'
  },
  red: {
    badge: 'bg-red-50 text-red-700 border-red-200/80',
    hoverBorder: 'hover:border-red-300',
    shadowGlow: 'hover:shadow-[0_20px_45px_rgba(239,68,68,0.15)]',
    arrowBg: 'hover:bg-red-600',
    pill: 'bg-red-50 text-red-800 border-red-200'
  }
};

export default function SectorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Sectors (40)');
  const [selectedSectorModal, setSelectedSectorModal] = useState(null);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [consultationData, setConsultationData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const filteredSectors = useMemo(() => {
    return sectorsList.filter((sector) => {
      const matchesSearch =
        sector.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sector.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sector.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        selectedCategory === 'All Sectors (40)' ||
        sector.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setQuoteSubmitted(true);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#172554', '#2563eb', '#38bdf8', '#ffffff']
      });
    } catch {
      // safe fallback
    }
  };

  const closeModal = () => {
    setSelectedSectorModal(null);
    setTimeout(() => {
      setQuoteSubmitted(false);
      setConsultationData({ name: '', email: '', company: '', message: '' });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 pt-28 pb-24 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      
      {/* Background Soft Ambiance Gradients */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-blue-100/50 via-indigo-50/30 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-[1400px] mx-auto">

        {/* Hero Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs mb-4"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-[#172554] tracking-wide">
              Complete 40 Industry Sectors
            </span>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
              <AustralianKangarooIcon className="w-3.5 h-3.5 text-[#172554]" />
              <span>Australian & Global Scope</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#172554] tracking-tight mb-5"
          >
            Industry Verticals We Empower
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal"
          >
            From high-compliance banking to spatial WebXR and agritech telemetry, 
            explore our tailored digital architecture across 40 specialized industry domains.
          </motion.p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="mb-10 sm:mb-12 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-xl mx-auto">
            {/* Search Input */}
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search any sector (e.g. Healthcare, SaaS, Energy, EV...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200/90 rounded-2xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#172554]/25 focus:border-[#172554] shadow-xs transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs bg-slate-100 p-1 rounded-full cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap pt-2">
            {categoryTabs.map((tab) => {
              const isSelected = selectedCategory === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setSelectedCategory(tab)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#172554] text-white shadow-md shadow-blue-950/20 scale-105'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-[#172554]'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 px-1 text-xs font-semibold text-slate-500">
          <span>Showing <strong className="text-[#172554]">{filteredSectors.length}</strong> of 40 Industry Sectors</span>
          <span className="hidden sm:inline">Click any card to request sector-specific solution architecture</span>
        </div>

        {/* 40 SECTOR CARDS GRID (Inspired by Reference Screenshot) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          <AnimatePresence mode="popLayout">
            {filteredSectors.map((sector, idx) => {
              const Icon = sector.icon;
              const styling = colorStyles[sector.color] || colorStyles.blue;
              // Card #1 as highlighted solid card or clean white card like in screenshot
              const isFirstTealFeatured = sector.id === 1 && !searchQuery && selectedCategory === 'All Sectors (40)';

              if (isFirstTealFeatured) {
                return (
                  <motion.div
                    key={sector.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    onClick={() => setSelectedSectorModal(sector)}
                    className="group relative rounded-3xl p-7 text-white bg-gradient-to-br from-[#065f46] via-[#047857] to-[#0f766e] shadow-[0_16px_40px_rgba(4,120,87,0.28)] flex flex-col justify-between min-h-[260px] overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300"
                  >
                    {/* Top Header */}
                    <div className="flex items-start justify-between relative z-10">
                      <div className="pr-4">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-200 bg-white/15 px-2.5 py-0.5 rounded-full inline-block mb-2">
                          Sector #01 • Featured
                        </span>
                        <h3 className="text-2xl font-extrabold tracking-tight text-white mb-2">
                          {sector.name}
                        </h3>
                        <p className="text-xs text-emerald-100 leading-relaxed max-w-[220px]">
                          {sector.desc}
                        </p>
                      </div>

                      {/* Top Right Stamp Icon */}
                      <div className="w-11 h-11 rounded-2xl bg-white/20 border border-white/30 backdrop-blur-md flex items-center justify-center text-white flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5 text-emerald-200" />
                      </div>
                    </div>

                    {/* Bottom Area */}
                    <div className="flex items-end justify-between relative z-10 pt-8">
                      {/* Arrow Button */}
                      <div className="w-10 h-10 rounded-full bg-white text-[#047857] flex items-center justify-center shadow-md group-hover:translate-x-1.5 transition-transform duration-200">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Bottom Right 3D Geometric Vector Artwork */}
                    <div className="absolute -bottom-2 -right-2 pointer-events-none group-hover:scale-105 transition-transform duration-500">
                      <GeometricGraphic themeIndex={0} />
                    </div>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={sector.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: idx * 0.02 }}
                  onClick={() => setSelectedSectorModal(sector)}
                  className={`group relative rounded-3xl p-7 bg-white border border-slate-100/90 shadow-[0_10px_30px_rgba(23,37,84,0.05)] ${styling.hoverBorder} ${styling.shadowGlow} flex flex-col justify-between min-h-[260px] overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300`}
                >
                  {/* Top Header */}
                  <div className="flex items-start justify-between relative z-10">
                    <div className="pr-4">
                      {/* Sector Number & Category */}
                      <div className="flex items-center gap-1.5 mb-2">
                        <span className="text-[10px] font-bold text-slate-400">
                          #{String(sector.id).padStart(2, '0')}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">
                          {sector.category}
                        </span>
                      </div>

                      {/* Sector Name */}
                      <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 group-hover:text-[#172554] transition-colors mb-2">
                        {sector.name}
                      </h3>

                      {/* Description under name */}
                      <p className="text-xs text-slate-500 leading-relaxed max-w-[210px] sm:max-w-[230px]">
                        {sector.desc}
                      </p>
                    </div>

                    {/* Top Right Icon Stamp (Matching user image stamp style) */}
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 6 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className={`w-11 h-11 rounded-2xl ${styling.badge} border flex items-center justify-center flex-shrink-0 shadow-xs transition-all duration-200`}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>
                  </div>

                  {/* Bottom Action Area */}
                  <div className="flex items-end justify-between relative z-10 pt-8">
                    {/* Bottom Left Circle Arrow */}
                    <div className={`w-9 h-9 rounded-full bg-slate-100 text-slate-700 ${styling.arrowBg} group-hover:text-white flex items-center justify-center shadow-xs group-hover:translate-x-1.5 transition-all duration-200`}>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Bottom Right 3D Geometric Vector Shapes (Inspired by Screenshot) */}
                  <div className="absolute -bottom-2 -right-2 pointer-events-none group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100">
                    <GeometricGraphic themeIndex={sector.id} />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredSectors.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-lg mx-auto">
            <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-slate-800">No industry sectors found</h4>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              We couldn&apos;t find any sector matching &quot;{searchQuery}&quot;.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Sectors (40)');
              }}
              className="px-4 py-2 bg-[#172554] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom Australian Enterprise Callout */}
        <div className="mt-16 sm:mt-20 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#172554] via-[#1e3a8a] to-[#172554] text-white shadow-[0_25px_60px_rgba(23,37,84,0.25)] flex flex-col md:flex-row items-center justify-between gap-6 border border-blue-900">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white text-[#172554] flex items-center justify-center flex-shrink-0 shadow-md">
              <AustralianKangarooIcon className="w-6 h-6 text-[#172554]" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                Operating in a niche Australian or Global industry?
              </h3>
              <p className="text-xs sm:text-sm text-blue-200 mt-1 max-w-xl">
                Our Australian solutions architects deliver customized discovery sessions and functional MVPs across all 40 industry verticals.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedSectorModal(sectorsList[0]);
            }}
            className="px-6 py-3 rounded-xl bg-white text-[#172554] hover:bg-blue-50 font-extrabold text-sm shadow-md hover:scale-105 transition-all whitespace-nowrap cursor-pointer"
          >
            Consult Our Architects
          </button>
        </div>

      </div>

      {/* SECTOR INQUIRY & ARCHITECTURE POPUP MODAL */}
      <AnimatePresence>
        {selectedSectorModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ type: "spring", stiffness: 380, damping: 25 }}
              className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-[0_30px_70px_rgba(23,37,84,0.3)] overflow-hidden z-10"
            >
              <div className="h-2 w-full bg-[#172554]" />

              <div className="p-6 pb-3 flex items-start justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#172554] text-xs font-bold mb-2">
                    <AustralianKangarooIcon className="w-3.5 h-3.5 text-[#172554]" />
                    <span>Sector #{String(selectedSectorModal.id).padStart(2, '0')} • {selectedSectorModal.category}</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                    <span>{selectedSectorModal.name}</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm">
                    {selectedSectorModal.desc}
                  </p>
                </div>

                <button
                  onClick={closeModal}
                  className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 pt-2">
                {!quoteSubmitted ? (
                  <form onSubmit={handleInquirySubmit} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sarah Jenkins"
                        value={consultationData.name}
                        onChange={(e) => setConsultationData({ ...consultationData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#172554]/30 focus:border-[#172554] transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Work Email
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="sarah@enterprise.com.au"
                          value={consultationData.email}
                          onChange={(e) => setConsultationData({ ...consultationData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#172554]/30 focus:border-[#172554] transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Company / Organization
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Apex Health Australia"
                          value={consultationData.company}
                          onChange={(e) => setConsultationData({ ...consultationData, company: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#172554]/30 focus:border-[#172554] transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Project Scope / Requirements
                      </label>
                      <textarea
                        rows={3}
                        placeholder={`Tell us about your digital requirements for ${selectedSectorModal.name}...`}
                        value={consultationData.message}
                        onChange={(e) => setConsultationData({ ...consultationData, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#172554]/30 focus:border-[#172554] transition-all"
                      />
                    </div>

                    <div className="pt-2">
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 px-6 rounded-xl bg-[#172554] hover:bg-[#1e3a8a] text-white font-extrabold text-sm flex items-center justify-center gap-2 border border-blue-900 shadow-md cursor-pointer transition-all"
                      >
                        <AustralianKangarooIcon className="w-4 h-4 text-white" />
                        <span>Request {selectedSectorModal.name} Proposal</span>
                        <Send className="w-3.5 h-3.5 ml-1" />
                      </motion.button>
                    </div>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6 space-y-3"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <h4 className="text-xl font-extrabold text-slate-900">
                      Inquiry Received for {selectedSectorModal.name}!
                    </h4>
                    <p className="text-xs text-slate-600 max-w-sm mx-auto">
                      Thank you, <span className="font-bold text-[#172554]">{consultationData.name || 'valued partner'}</span>. Our specialist for the <span className="font-bold">{selectedSectorModal.name}</span> sector will contact <span className="font-semibold">{consultationData.email}</span> within 2 business hours.
                    </p>

                    <button
                      onClick={closeModal}
                      className="mt-3 px-5 py-2 rounded-xl bg-[#172554] hover:bg-[#1e3a8a] text-white font-bold text-xs cursor-pointer transition-colors"
                    >
                      Done & Close
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
