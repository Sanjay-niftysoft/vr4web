import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
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

 // 3: Purple / Lavender Waves and Orb
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

 // 4: Cobalt Blue Geometric Blocks and Prism
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
 { id: 1, name: 'Healthcare', category: 'Health and Science', icon: HeartPulse, desc: "Next-gen telehealth portals, electronic health records and AI diagnostic workflows.", color: 'emerald', features: ['Telehealth', 'AI Diagnostics', 'HIPAA'] },
 { id: 2, name: 'Finance', category: 'Finance and Commerce', icon: TrendingUp, desc: "Algorithmic trading engines, wealth management and secure ledger systems.", color: 'amber', features: ['Algo Trading', 'Wealth Management', 'Ledgers'] },
 { id: 3, name: 'Banking', category: 'Finance and Commerce', icon: Landmark, desc: "Core banking interfaces, omnichannel client vaults and AML compliance.", color: 'blue', features: ['Core Banking', 'Client Vaults', 'AML'] },
 { id: 4, name: 'E-Commerce', category: 'Finance and Commerce', icon: ShoppingCart, desc: "High-volume headless storefronts, multi-vendor marketplaces and checkout pipelines.", color: 'rose', features: ['Headless', 'Marketplaces', 'Checkout'] },
 { id: 5, name: 'Education', category: 'Services and Public', icon: GraduationCap, desc: "Interactive LMS platforms, immersive virtual classrooms and micro-credentialing.", color: 'purple', features: ['LMS', 'Virtual Classrooms', 'Micro-credentials'] },
 { id: 6, name: 'Logistics', category: 'Industrial and Supply', icon: Truck, desc: "Fleet telematics, automated warehouse dispatch and freight route tracking.", color: 'cyan', features: ['Telematics', 'Dispatch', 'Route Tracking'] },
 { id: 7, name: 'Real Estate', category: 'Services and Public', icon: Home, desc: "Virtual 3D property walkthroughs, MLS automation and tenant portals.", color: 'indigo', features: ['3D Tours', 'MLS', 'Tenant Portals'] },
 { id: 8, name: 'Travel', category: 'Lifestyle and Media', icon: Plane, desc: "Dynamic booking aggregators, itinerary engines and loyalty ecosystems.", color: 'orange', features: ['Booking API', 'Itineraries', 'Loyalty'] },
 { id: 9, name: 'Restaurant', category: 'Lifestyle and Media', icon: Utensils, desc: "Cloud POS integrations, smart kitchen display systems and mobile ordering.", color: 'rose', features: ['Cloud POS', 'KDS', 'Mobile Ordering'] },
 { id: 10, name: 'Entertainment', category: 'Lifestyle and Media', icon: Clapperboard, desc: "High-throughput streaming backends, digital rights and interactive media.", color: 'purple', features: ['Streaming', 'DRM', 'Interactive'] },
 { id: 11, name: 'EV', category: 'Industrial and Supply', icon: BatteryCharging, desc: "Smart charging network protocols, battery telemetry and fleet telemetry IoT.", color: 'emerald', features: ['Charging Protocols', 'Telemetry', 'IoT'] },
 { id: 12, name: 'SaaS', category: 'Tech and Digital', icon: Cloud, desc: "Multi-tenant cloud architecture, automated subscriptions and analytics pipelines.", color: 'blue', features: ['Multi-tenant', 'Subscriptions', 'Analytics'] },
 { id: 13, name: 'On-Demand', category: 'Tech and Digital', icon: Clock, desc: "Real-time dispatch algorithms, geolocation tracking and micro-fulfillment.", color: 'amber', features: ['Dispatch API', 'Geolocation', 'Micro-fulfillment'] },
 { id: 14, name: 'Social Media', category: 'Tech and Digital', icon: Share2, desc: "Community feeds, algorithmic recommendation engines and real-time messaging.", color: 'sky', features: ['Feeds', 'Algorithms', 'Messaging'] },
 { id: 15, name: 'Agriculture', category: 'Industrial and Supply', icon: Sprout, desc: "Precision agritech telemetry, crop yield AI and supply chain tracing.", color: 'emerald', features: ['Agritech', 'Crop AI', 'Supply Chain'] },
 { id: 16, name: 'Telecom', category: 'Tech and Digital', icon: Radio, desc: "5G network operations, customer self-care portals and billing provisioning.", color: 'blue', features: ['5G Ops', 'Self-care', 'Billing'] },
 { id: 17, name: 'Oil and Gas', category: 'Energy and Utilities', icon: Fuel, desc: "Rig safety monitoring, pipeline SCADA systems and geospatial telemetry.", color: 'amber', features: ['Safety IoT', 'SCADA', 'Geospatial'] },
 { id: 18, name: 'Automotive', category: 'Industrial and Supply', icon: Car, desc: "Connected vehicle software, dealership portals and digital showroom 3D.", color: 'rose', features: ['Connected Car', 'Dealerships', '3D Showrooms'] },
 { id: 19, name: 'Insurance', category: 'Finance and Commerce', icon: ShieldCheck, desc: "Automated claims adjustment, actuarial AI models and policyholder portals.", color: 'cyan', features: ['Claims AI', 'Actuarial', 'Portals'] },
 { id: 20, name: 'Manufacturing', category: 'Industrial and Supply', icon: Factory, desc: "Industry 4.0 IoT instrumentation, digital twins and MES integration.", color: 'slate', features: ['Industry 4.0', 'Digital Twins', 'MES'] },
 { id: 21, name: 'Pharmaceuticals', category: 'Health and Science', icon: Pill, desc: "Clinical trial registries, supply serialization and compliance automation.", color: 'rose', features: ['Clinical Trials', 'Serialization', 'Compliance'] },
 { id: 22, name: 'Aerospace and Aviation', category: 'Industrial and Supply', icon: Rocket, desc: "Flight scheduling optimization, MRO logistics and spatial training modules.", color: 'blue', features: ['Scheduling AI', 'MRO', 'Spatial Training'] },
 { id: 23, name: 'Marine and Shipping', category: 'Industrial and Supply', icon: Ship, desc: "Vessel tracking telemetry, port logistics ERP and automated bill of lading.", color: 'cyan', features: ['Vessel Tracking', 'Port ERP', 'BoL'] },
 { id: 24, name: 'Chemicals', category: 'Industrial and Supply', icon: Atom, desc: "Batch process management, hazardous material compliance and SDS databases.", color: 'purple', features: ['Batch Processing', 'Hazmat', 'SDS'] },
 { id: 25, name: 'Fashion and Apparel', category: 'Lifestyle and Media', icon: Shirt, desc: "Virtual fitting rooms, omni-channel inventory and bespoke lookbook tech.", color: 'pink', features: ['Virtual Fitting', 'Omni-channel', 'Lookbooks'] },
 { id: 26, name: 'Beauty and Personal Care', category: 'Lifestyle and Media', icon: Sparkles, desc: "AR makeup try-on, subscription replenishment and customer beauty profiles.", color: 'rose', features: ['AR Try-on', 'Subscriptions', 'Profiles'] },
 { id: 27, name: 'Jewellery and Luxury', category: 'Lifestyle and Media', icon: Gem, desc: "High-fidelity 3D WebGL configurators, certificate vaults and VIP styling.", color: 'amber', features: ['3D WebGL', 'Vaults', 'VIP Styling'] },
 { id: 28, name: 'Sports and Fitness', category: 'Lifestyle and Media', icon: Dumbbell, desc: "Wearable telemetry synchronization, member portals and performance coaching.", color: 'orange', features: ['Wearables', 'Member Portals', 'Coaching'] },
 { id: 29, name: 'Human Resources and Recruitment', category: 'Services and Public', icon: Users, desc: "Applicant tracking pipelines, automated onboarding and talent intelligence.", color: 'indigo', features: ['ATS', 'Onboarding', 'Talent AI'] },
 { id: 30, name: 'BPO and Business Services', category: 'Services and Public', icon: Headphones, desc: "Workflow automation, contact center CRM integration and SLA ticketing.", color: 'teal', features: ['Workflow', 'CRM', 'SLA'] },
 { id: 31, name: 'Construction and Engineering', category: 'Industrial and Supply', icon: HardHat, desc: "BIM coordination viewers, job-site field reports and project takeoff.", color: 'amber', features: ['BIM', 'Field Reports', 'Takeoff'] },
 { id: 32, name: 'Legal Services', category: 'Services and Public', icon: Scale, desc: "Matter management, automated e-discovery and secure client retainers.", color: 'slate', features: ['Matter Mgmt', 'E-discovery', 'Retainers'] },
 { id: 33, name: 'Government and Public Sector', category: 'Services and Public', icon: Building, desc: "Citizen self-service portals, secure GovTech infrastructure and GIS tools.", color: 'blue', features: ['Self-service', 'GovTech', 'GIS'] },
 { id: 34, name: 'Professional Services', category: 'Services and Public', icon: Award, desc: "Time tracking, resource allocation matrices and client billing suites.", color: 'emerald', features: ['Time Tracking', 'Allocation', 'Billing'] },
 { id: 35, name: 'Cybersecurity', category: 'Tech and Digital', icon: ShieldAlert, desc: "Zero-trust access architectures, threat monitoring and compliance audits.", color: 'red', features: ['Zero-trust', 'Monitoring', 'Audits'] },
 { id: 36, name: 'IT and Software', category: 'Tech and Digital', icon: Code2, desc: "Cloud-native DevOps pipelines, API middleware and microservices scaling.", color: 'indigo', features: ['DevOps', 'API Middleware', 'Microservices'] },
 { id: 37, name: 'Gaming', category: 'Lifestyle and Media', icon: Gamepad2, desc: "Multiplayer backends, WebGL 3D game engines and economy asset systems.", color: 'purple', features: ['Multiplayer', 'WebGL 3D', 'Economies'] },
 { id: 38, name: 'Energy and Utilities', category: 'Energy and Utilities', icon: Lightbulb, desc: "Smart grid metering, demand-response dashboards and outage dispatch.", color: 'amber', features: ['Smart Grids', 'Demand-response', 'Dispatch'] },
 { id: 39, name: 'Renewable Energy', category: 'Energy and Utilities', icon: Wind, desc: "Solar and wind telemetry, carbon credit trading and asset performance.", color: 'emerald', features: ['Telemetry', 'Carbon Trading', 'Performance'] },
 { id: 40, name: 'Food and Beverage', category: 'Lifestyle and Media', icon: Wine, desc: "Farm- traceability, cold chain monitoring and distribution ERP.", color: 'orange', features: ['Traceability', 'Cold Chain', 'ERP'] },
];

const categoryTabs = [
 'All Sectors (40)',
 'Finance and Commerce',
 'Tech and Digital',
 'Industrial and Supply',
 'Health and Science',
 'Lifestyle and Media',
 'Services and Public',
 'Energy and Utilities',
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
 badge: 'bg-white text-[#0B4F9C] border-[#111111]/10/80',
 hoverBorder: 'hover:border-[#F97316]',
 shadowGlow: 'hover:shadow-[0_20px_45px_rgba(59,130,246,0.15)]',
 arrowBg: 'hover:bg-[#0B4F9C]',
 pill: 'bg-white text-[#0B4F9C] border-[#111111]/10'
 },
 rose: {
 badge: 'bg-rose-50 text-rose-700 border-rose-200/80',
 hoverBorder: 'hover:border-rose-300',
 shadowGlow: 'hover:shadow-[0_20px_45px_rgba(244,63,94,0.15)]',
 arrowBg: 'hover:bg-rose-600',
 pill: 'bg-rose-50 text-rose-800 border-rose-200'
 },
 purple: {
 badge: 'bg-white text-[#F97316] border-[#F97316]/80',
 hoverBorder: 'hover:border-[#F97316]',
 shadowGlow: 'hover:shadow-[0_20px_45px_rgba(168,85,247,0.15)]',
 arrowBg: 'hover:bg-[#F97316]',
 pill: 'bg-white text-[#F97316] border-[#F97316]'
 },
 cyan: {
 badge: 'bg-white text-[#F97316] border-[#F97316]/80',
 hoverBorder: 'hover:border-[#F97316]',
 shadowGlow: 'hover:shadow-[0_20px_45px_rgba(6,182,212,0.15)]',
 arrowBg: 'hover:bg-[#F97316]',
 pill: 'bg-white text-[#F97316] border-[#F97316]'
 },
 indigo: {
 badge: 'bg-indigo-50 text-[#0B4F9C] border-[#F97316]/80',
 hoverBorder: 'hover:border-[#F97316]',
 shadowGlow: 'hover:shadow-[0_20px_45px_rgba(99,102,241,0.15)]',
 arrowBg: 'hover:bg-[#0B4F9C]',
 pill: 'bg-indigo-50 text-[#0B4F9C] border-[#F97316]'
 },
 orange: {
 badge: 'bg-orange-50 text-orange-700 border-orange-200/80',
 hoverBorder: 'hover:border-orange-300',
 shadowGlow: 'hover:shadow-[0_20px_45px_rgba(249,115,22,0.15)]',
 arrowBg: 'hover:bg-orange-600',
 pill: 'bg-orange-50 text-orange-800 border-orange-200'
 },
 sky: {
 badge: 'bg-sky-50 text-[#0B4F9C] border-[#F97316]/80',
 hoverBorder: 'hover:border-[#F97316]',
 shadowGlow: 'hover:shadow-[0_20px_45px_rgba(14,165,233,0.15)]',
 arrowBg: 'hover:bg-[#0B4F9C]',
 pill: 'bg-sky-50 text-[#0B4F9C] border-[#F97316]'
 },
 slate: {
 badge: 'bg-white text-[#111111] border-[#111111]/10',
 hoverBorder: 'hover:border-[#111111]/10',
 shadowGlow: 'hover:shadow-[0_20px_45px_rgba(100,116,139,0.15)]',
 arrowBg: 'hover:bg-[#111111]/5',
 pill: 'bg-white text-[#111111] border-[#111111]/10'
 },
 teal: {
 badge: 'bg-teal-50 text-teal-700 border-teal-200/80',
 hoverBorder: 'hover:border-teal-300',
 shadowGlow: 'hover:shadow-[0_20px_45px_rgba(20,184,166,0.15)]',
 arrowBg: 'hover:bg-teal-600',
 pill: 'bg-teal-50 text-teal-800 border-teal-200'
 },
 pink: {
 badge: 'bg-white text-[#F97316] border-[#F97316]/80',
 hoverBorder: 'hover:border-[#F97316]',
 shadowGlow: 'hover:shadow-[0_20px_45px_rgba(236,72,153,0.15)]',
 arrowBg: 'hover:bg-[#F97316]',
 pill: 'bg-white text-[#F97316] border-[#F97316]'
 },
 red: {
 badge: 'bg-red-50 text-red-700 border-red-200/80',
 hoverBorder: 'hover:border-red-300',
 shadowGlow: 'hover:shadow-[0_20px_45px_rgba(239,68,68,0.15)]',
 arrowBg: 'hover:bg-red-600',
 pill: 'bg-red-50 text-red-800 border-red-200'
 }
};

// Define vibrant solid background styles for the "Featured" cards that appear every 10th card
const solidStyles = {
 emerald: { bg: '] ]', shadow: 'shadow-lg', textBadge: 'text-emerald-200', textDesc: 'text-emerald-50', textIcon: 'text-emerald-200' },
 amber: { bg: '] ]', shadow: 'shadow-lg', textBadge: 'text-amber-200', textDesc: 'text-amber-50', textIcon: 'text-amber-200' },
 blue: { bg: '] ]', shadow: 'shadow-lg', textBadge: 'text-[#F97316]', textDesc: 'text-[#F97316]', textIcon: 'text-[#F97316]' },
 rose: { bg: '] ]', shadow: 'shadow-lg', textBadge: 'text-rose-200', textDesc: 'text-rose-50', textIcon: 'text-rose-200' },
 purple: { bg: '] ]', shadow: 'shadow-lg', textBadge: 'text-[#F97316]', textDesc: 'text-[#F97316]', textIcon: 'text-[#F97316]' },
 cyan: { bg: '] ]', shadow: 'shadow-lg', textBadge: 'text-[#F97316]', textDesc: 'text-[#F97316]', textIcon: 'text-[#F97316]' },
 indigo: { bg: '] ]', shadow: 'shadow-lg', textBadge: 'text-[#F97316]', textDesc: 'text-[#F97316]', textIcon: 'text-[#F97316]' },
 orange: { bg: '] ]', shadow: 'shadow-lg', textBadge: 'text-orange-200', textDesc: 'text-orange-50', textIcon: 'text-orange-200' },
 sky: { bg: '] ]', shadow: 'shadow-lg', textBadge: 'text-[#F97316]', textDesc: 'text-[#F97316]', textIcon: 'text-[#F97316]' },
 slate: { bg: '] ]', shadow: 'shadow-lg', textBadge: 'text-[#111111]', textDesc: 'text-[#111111]', textIcon: 'text-[#111111]' },
 teal: { bg: '] ]', shadow: 'shadow-lg', textBadge: 'text-teal-200', textDesc: 'text-teal-50', textIcon: 'text-teal-200' },
 pink: { bg: '] ]', shadow: 'shadow-lg', textBadge: 'text-[#F97316]', textDesc: 'text-[#F97316]', textIcon: 'text-[#F97316]' },
 red: { bg: '] ]', shadow: 'shadow-lg', textBadge: 'text-red-200', textDesc: 'text-red-50', textIcon: 'text-red-200' }
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
 <div className="min-h-screen bg-white text-[#111111] pt-28 pb-24 relative overflow-hidden">
 
 {/* Background Soft Ambiance Gradients */}
 <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-[#0B4F9C] -100/50 -50/30 blur-3xl pointer-events-none -z-10" />

 {/* Hero Banner Section (Full Width Edge-) */}
 <div className="relative w-full h-[332px] flex items-center justify-center overflow-hidden mb-12 lg:mb-16 shadow-[0_20px_50px_rgba(23,37,84,0.15)] border-b border-[#111111]/10">
 
 {/* Background Layer */}
 <div className="absolute inset-0 z-0">
 <img 
 src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2560&h=600" 
 alt="Global Architecture" 
 className="w-full h-full object-cover"
 />
 </div>
 
 <div className="relative z-10 text-center px-4 w-full md:px-8 max-w-[1440px] mx-auto">
 {/* Soft, blurred radial glow strictly behind the text (No Box) */}
 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] md:w-[60%] h-[120%] bg-black/60 blur-[60px] md:blur-[80px] rounded-[100%] pointer-events-none -z-10"></div>
 
 <motion.h1
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ duration: 1.5, ease: "easeInOut" }}
 className="font-extrabold text-white tracking-tight mb-4 min-[768px]:mb-6 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] text-[26px] min-[320px]:text-[28px] min-[768px]:text-[42px] min-[1040px]:text-[52px] min-[1440px]:text-[60px]"
 >
 Industry Verticals We Empower
 </motion.h1>

 <motion.p
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
 className="text-white leading-relaxed font-medium mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] max-w-[95%] min-[768px]:max-w-3xl text-[13px] min-[320px]:text-[14px] min-[768px]:text-[16px] min-[1040px]:text-[18px] min-[1440px]:text-[20px] mb-8"
 >
 From high-compliance banking to spatial WebXR and agritech telemetry, 
 explore our tailored digital architecture across 40 specialized industry domains.
 </motion.p>

 {/* Breadcrumbs */}
 <motion.div 
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ duration: 0.8, delay: 0.8 }}
 className="flex items-center justify-center gap-2 text-sm sm:text-base font-medium text-[#111111] bg-black/30 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/20 w-max mx-auto"
 >
 <Link to="/" className="flex items-center gap-1.5 hover:text-white transition-colors">
 <Home className="w-4 h-4" />
 <span>Home</span>
 </Link>
 <div className="flex items-center gap-2">
 <ChevronRight className="w-4 h-4 text-[#111111]" />
 <span className="text-white font-bold">Sectors</span>
 </div>
 </motion.div>
 </div>
 </div>

 {/* Main Content Container with padding */}
 <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

 {/* Search and Category Filter Bar */}
 <div className="mb-10 sm:mb-12 space-y-4">
 <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-xl mx-auto">
 {/* Search Input */}
 <div className="relative w-full">
 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#111111]" />
 <input
 type="text"
 placeholder="Search any sector (e.g. Healthcare, SaaS, Energy, EV...)"
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 className="w-full pl-11 pr-4 py-3 bg-white border border-[#111111]/10/90 rounded-2xl text-sm text-[#111111] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#172554]/25 focus:border-[#0B4F9C] shadow-xs transition-all"
 />
 {searchQuery && (
 <button
 onClick={() => setSearchQuery('')}
 className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#111111] hover:text-[#111111] font-medium text-xs bg-white p-1 rounded-full cursor-pointer"
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
 key={tab}https://127.0.0.1:63047/static/artifacts/0a2d5867-9e81-4b9e-8be5-d38a93e84ae1/.user_uploaded/media_1791276706209.png?csrf=b87d8ea4-abd7-49a1-a9b7-6e8549cdacb5
 onClick={() => setSelectedCategory(tab)}
 className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
 isSelected
 ? 'bg-[#0B4F9C] text-white shadow-md shadow-[#0B4F9C]/20 scale-105'
 : 'bg-white border border-[#111111]/10 text-[#111111] font-medium hover:bg-white hover:text-[#0B4F9C]'
 }`}
 >
 {tab}
 </button>
 );
 })}
 </div>
 </div>

 {/* Results Counter */}
 <div className="flex items-center justify-between mb-6 px-1 text-xs font-semibold text-[#111111] font-medium">
 <span>Showing <strong className="text-[#0B4F9C]">{filteredSectors.length}</strong> of 40 Industry Sectors</span>
 </div>

 {/* 40 SECTOR CARDS GRID (Inspired by Reference Screenshot) */}
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
 <AnimatePresence mode="popLayout">
 {filteredSectors.map((sector, idx) => {
 const Icon = sector.icon;
 const styling = colorStyles[sector.color] || colorStyles.blue;
 // Make every 10th card a vibrant, solid-color card
 const isColourFullCard = (idx % 10 === 0) && !searchQuery && selectedCategory === 'All Sectors (40)';
 const solidStyle = solidStyles[sector.color] || solidStyles.blue;

 if (isColourFullCard) {
 return (
 <motion.div
 key={sector.id}
 layout
 initial={{ opacity: 0, scale: 0.95 }}
 animate={{ opacity: 1, scale: 1 }}
 exit={{ opacity: 0, scale: 0.95 }}
 transition={{ duration: 0.35 }}
 className={`group relative rounded-3xl p-7 text-white bg-[#0B4F9C] ${solidStyle.bg} ${solidStyle.shadow} flex flex-col justify-between min-h-[260px] overflow-hidden transition-all duration-300`}
 >
 {/* Top Header */}
 <div className="flex items-start justify-between relative z-10">
 <div className="pr-4">
 <span className={`text-[10px] font-extrabold uppercase tracking-widest ${solidStyle.textBadge} bg-white/15 px-2.5 py-0.5 rounded-full inline-block mb-2`}>
 Featured
 </span>
 <h3 className="text-2xl font-extrabold tracking-tight text-white mb-2">
 {sector.name}
 </h3>
 <p className={`text-sm ${solidStyle.textDesc} leading-relaxed max-w-[260px] mt-1 font-normal`}>
 {sector.desc}
 </p>
 </div>

 {/* Top Right Stamp Icon */}
 <div className="w-11 h-11 rounded-2xl bg-white/20 border border-white/30 backdrop-blur-md flex items-center justify-center text-white flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform">
 <Icon className={`w-5 h-5 ${solidStyle.textIcon}`} />
 </div>
 </div>

 {/* Bottom Area: Features Tags */}
 <div className="flex items-end justify-between relative z-10 pt-6 mt-auto">
 <div className="flex flex-wrap gap-2 max-w-[85%]">
 {sector.features?.map(feature => (
 <span key={feature} className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-white/10 text-white/95 border border-white/20 shadow-sm backdrop-blur-sm">
 {feature}
 </span>
 ))}
 </div>
 </div>

 {/* Bottom Right 3D Geometric Vector Artwork */}
 <div className="absolute -bottom-2 -right-2 pointer-events-none group-hover:scale-105 transition-transform duration-500">
 <GeometricGraphic themeIndex={idx} />
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
 className={`group relative rounded-3xl p-7 bg-white border border-[#111111]/10/90 shadow-[0_10px_30px_rgba(23,37,84,0.05)] ${styling.hoverBorder} ${styling.shadowGlow} flex flex-col justify-between min-h-[260px] overflow-hidden transition-all duration-300`}
 >
 {/* Top Header */}
 <div className="flex items-start justify-between relative z-10">
 <div className="pr-4">
 {/* Category */}
 <div className="flex items-center gap-1.5 mb-2">
 <span className="text-[10.5px] font-bold text-[#111111] uppercase tracking-wider">
 {sector.category}
 </span>
 </div>

 {/* Sector Name */}
 <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#111111] group-hover:text-[#0B4F9C] transition-colors mb-2">
 {sector.name}
 </h3>

 {/* Description under name */}
 <p className="text-sm text-[#111111] font-normal leading-relaxed max-w-[240px] sm:max-w-[260px] mt-1">
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

 {/* Bottom Action Area: Features Tags */}
 <div className="flex items-end justify-between relative z-10 pt-6 mt-auto">
 <div className="flex flex-wrap gap-2 max-w-[85%]">
 {sector.features?.map(feature => (
 <span key={feature} className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-white text-[#111111] font-medium border border-[#111111]/10 shadow-sm transition-colors group-hover:bg-white group-hover:text-[#0B4F9C] group-hover:border-[#111111]/10">
 {feature}
 </span>
 ))}
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
 <div className="text-center py-20 bg-white rounded-3xl border border-[#111111]/10 shadow-sm max-w-lg mx-auto">
 <Layers className="w-12 h-12 text-[#111111] mx-auto mb-3" />
 <h4 className="text-lg font-bold text-[#111111]">No industry sectors found</h4>
 <p className="text-xs text-[#111111] font-normal mt-1 mb-4">
 We couldn&apos;t find any sector matching &quot;{searchQuery}&quot;.
 </p>
 <button
 onClick={() => {
 setSearchQuery('');
 setSelectedCategory('All Sectors (40)');
 }}
 className="px-4 py-2 bg-[#0B4F9C] text-white text-xs font-bold rounded-xl cursor-pointer"
 >
 Reset Filters
 </button>
 </div>
 )}

 {/* Bottom Australian Enterprise Callout */}
 <div className="mt-16 sm:mt-20 p-8 sm:p-10 rounded-3xl bg-[#0B4F9C] ] text-white shadow-[0_25px_60px_rgba(23,37,84,0.25)] flex flex-col md:flex-row items-center justify-between gap-6 border border-[#0B4F9C]">
 <div className="flex items-center gap-4">
 <div className="w-12 h-12 rounded-2xl bg-white text-[#0B4F9C] flex items-center justify-center flex-shrink-0 shadow-md">
 <AustralianKangarooIcon className="w-6 h-6 text-[#0B4F9C]" />
 </div>
 <div>
 <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
 Operating in a niche Australian or Global industry?
 </h3>
 <p className="text-xs sm:text-sm text-[#F97316] mt-1 max-w-xl">
 Our Australian solutions architects deliver customized discovery sessions and functional MVPs across all 40 industry verticals.
 </p>
 </div>
 </div>

 <button
 onClick={() => {
 setSelectedSectorModal(sectorsList[0]);
 }}
 className="px-6 py-3 rounded-xl bg-white text-[#0B4F9C] hover:bg-white font-extrabold text-sm shadow-md hover:scale-105 transition-all whitespace-normal sm:whitespace-nowrap cursor-pointer"
 >
 Consult Our Architects
 </button>
 </div>

 </div>

 {/* SECTOR INQUIRY and ARCHITECTURE POPUP MODAL */}
 <AnimatePresence>
 {selectedSectorModal && (
 <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
 {/* Backdrop */}
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 onClick={closeModal}
 className="absolute inset-0 bg-[#111111]/5/60 backdrop-blur-sm"
 />

 {/* Modal Body */}
 <motion.div
 initial={{ opacity: 0, scale: 0.88, y: 25 }}
 animate={{ opacity: 1, scale: 1, y: 0 }}
 exit={{ opacity: 0, scale: 0.9, y: 15 }}
 transition={{ type: "spring", stiffness: 380, damping: 25 }}
 className="relative w-full max-w-lg bg-white rounded-3xl border border-[#111111]/10 shadow-[0_30px_70px_rgba(23,37,84,0.3)] overflow-hidden z-10"
 >
 <div className="h-2 w-full bg-[#0B4F9C]" />

 <div className="p-6 pb-3 flex items-start justify-between">
 <div>
 <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#111111]/10 text-[#0B4F9C] text-xs font-bold mb-2">
 <AustralianKangarooIcon className="w-3.5 h-3.5 text-[#0B4F9C]" />
 <span>Sector #{String(selectedSectorModal.id).padStart(2, '0')} • {selectedSectorModal.category}</span>
 </div>
 <h3 className="text-2xl font-extrabold text-[#111111] flex items-center gap-2">
 <span>{selectedSectorModal.name}</span>
 </h3>
 <p className="text-xs text-[#111111] font-normal mt-1 max-w-sm">
 {selectedSectorModal.desc}
 </p>
 </div>

 <button
 onClick={closeModal}
 className="p-2 rounded-full bg-white hover:bg-white text-[#111111] font-medium hover:text-[#111111] transition-colors cursor-pointer"
 >
 <X className="w-5 h-5" />
 </button>
 </div>

 <div className="p-6 pt-2">
 {!quoteSubmitted ? (
 <form onSubmit={handleInquirySubmit} className="space-y-3.5">
 <div>
 <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-1">
 Full Name
 </label>
 <input
 type="text"
 required
 placeholder="e.g. Sarah Jenkins"
 value={consultationData.name}
 onChange={(e) => setConsultationData({ ...consultationData, name: e.target.value })}
 className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#111111]/10 text-[#111111] text-sm focus:outline-none focus:ring-2 focus:ring-[#172554]/30 focus:border-[#0B4F9C] transition-all"
 />
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
 <div>
 <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-1">
 Work Email
 </label>
 <input
 type="email"
 required
 placeholder="sarah@enterprise.com.au"
 value={consultationData.email}
 onChange={(e) => setConsultationData({ ...consultationData, email: e.target.value })}
 className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#111111]/10 text-[#111111] text-sm focus:outline-none focus:ring-2 focus:ring-[#172554]/30 focus:border-[#0B4F9C] transition-all"
 />
 </div>
 <div>
 <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-1">
 Company / Organization
 </label>
 <input
 type="text"
 required
 placeholder="e.g. Apex Health Australia"
 value={consultationData.company}
 onChange={(e) => setConsultationData({ ...consultationData, company: e.target.value })}
 className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#111111]/10 text-[#111111] text-sm focus:outline-none focus:ring-2 focus:ring-[#172554]/30 focus:border-[#0B4F9C] transition-all"
 />
 </div>
 </div>

 <div>
 <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-1">
 Project Scope / Requirements
 </label>
 <textarea
 rows={3}
 placeholder={`Tell us about your digital requirements for ${selectedSectorModal.name}...`}
 value={consultationData.message}
 onChange={(e) => setConsultationData({ ...consultationData, message: e.target.value })}
 className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#111111]/10 text-[#111111] text-sm focus:outline-none focus:ring-2 focus:ring-[#172554]/30 focus:border-[#0B4F9C] transition-all"
 />
 </div>

 <div className="pt-2">
 <motion.button
 type="submit"
 whileHover={{ scale: 1.02 }}
 whileTap={{ scale: 0.98 }}
 className="w-full py-3 px-6 rounded-xl bg-[#0B4F9C] hover:bg-[#0B4F9C] text-white font-extrabold text-sm flex items-center justify-center gap-2 border border-[#0B4F9C] shadow-md cursor-pointer transition-all"
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

 <h4 className="text-xl font-extrabold text-[#111111]">
 Inquiry Received for {selectedSectorModal.name}!
 </h4>
 <p className="text-xs text-[#111111] font-normal max-w-sm mx-auto">
 Thank you, <span className="font-bold text-[#0B4F9C]">{consultationData.name || 'valued partner'}</span>. Our specialist for the <span className="font-bold">{selectedSectorModal.name}</span> sector will contact <span className="font-semibold">{consultationData.email}</span> within 2 business hours.
 </p>

 <button
 onClick={closeModal}
 className="mt-3 px-5 py-2 rounded-xl bg-[#0B4F9C] hover:bg-[#0B4F9C] text-white font-semibold text-xs cursor-pointer transition-colors"
 >
 Done and Close
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

