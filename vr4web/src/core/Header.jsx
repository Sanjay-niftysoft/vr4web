import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
 ChevronDown,
 ChevronRight,
 Menu,
 X,
 ArrowUpRight,
 Users,
 Layers,
 Globe,
 Compass,
 Image as ImageIcon,
 Mail,
 Workflow,
 MessageSquareQuote,
 Handshake,
 BookOpen,
 Briefcase,
 ScrollText,
 TrendingUp,
 CheckCircle2,
 Send,
 MapPin,
 Smartphone,
 Code2,
 Layout,
 ShoppingCart,
 Megaphone,
 Palette,
 Headphones,
 Sparkles,
 Bot,
 Apple,
 Atom,
 Cpu,
 Zap,
 Boxes,
 Glasses,
 Cloud,
 Sliders,
 Binary,
 Network,
 MessageSquareCode,
 FileCode2,
 Globe2,
 Building2,
 AppWindow,
 Home,
 Server,
 Rocket,
 Blocks,
 Flame,
 ShieldCheck,
 Database,
 Store,
 ShoppingBag,
 CreditCard,
 PackageCheck,
 HelpCircle,
 BrainCircuit,
 Share2,
 Target,
 MailCheck,
 MessageCircle,
 MessageSquareShare,
 FileText,
 Video,
 Award,
 Link2,
 BadgeCheck,
 LayoutGrid,
 PenTool,
 Film,
 BookOpenCheck,
 Box,
 ImagePlus,
 Wrench,
 Clock,
 Lock,
 ClipboardCheck
} from 'lucide-react';

// Stylized Australian Kangaroo Icon
const AustralianKangarooIcon = ({ className = "w-4 h-4" }) => (
 <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
 <path d="M21.7 5.5c-.3-.4-1-.4-1.3 0l-1.8 1.8c-.6-.4-1.3-.6-2-.5l-2-1.6c-.3-.2-.8-.2-1.1.1l-1.2 1.2c-.3.3-.3.7-.1 1l.7 1.5c-.8.8-1.5 1.7-1.9 2.8l-4 2.1c-.4.2-.6.7-.4 1.1.2.4.7.6 1.1.6h2.1c.2.7.5 1.4.9 2l-4 2.2c-.4.2-.6.7-.4 1.1.2.4.7.6 1.1.6h5.4c3.4 0 6.1-2.7 6.3-6.1.1-1.7-.5-3.3-1.7-4.5l1.9-1.5c.4-.3.4-.9.1-1.3l-.4-.1z" />
 </svg>
);

export default function Header() {
 const location = useLocation();
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 const [activeDropdown, setActiveDropdown] = useState(null);
 const [mobileDropdown, setMobileDropdown] = useState(null);
 const [activeServiceCategory, setActiveServiceCategory] = useState('app-dev');
 const [mobileServiceCategory, setMobileServiceCategory] = useState(null);
 const [scrolled, setScrolled] = useState(false);
 const [quoteModalOpen, setQuoteModalOpen] = useState(false);
 const [quoteSubmitted, setQuoteSubmitted] = useState(false);
 const dropdownTimeoutRef = useRef(null);

 // Quote Form State
 const [formData, setFormData] = useState({
 name: '',
 email: '',
 state: 'NSW (Sydney)',
 service: 'Web Application',
 timeline: 'Immediate'
 });

 // Track scroll for subtle elevation change
 useEffect(() => {
 const handleScroll = () => {
 setScrolled(window.scrollY > 20);
 };
 window.addEventListener('scroll', handleScroll);
 return () => window.removeEventListener('scroll', handleScroll);
 }, []);

 // Handle ESC key to close modals/menus
 useEffect(() => {
 const handleKeyDown = (e) => {
 if (e.key === 'Escape') {
 setQuoteModalOpen(false);
 setActiveDropdown(null);
 }
 };
 window.addEventListener('keydown', handleKeyDown);
 return () => window.removeEventListener('keydown', handleKeyDown);
 }, []);

 const handleQuoteSubmit = (e) => {
 e.preventDefault();
 setQuoteSubmitted(true);
 // Dark Blue and Gold Confetti
 try {
 confetti({
 particleCount: 85,
 spread: 85,
 origin: { y: 0.55 },
 colors: ['#172554', '#1e40af', '#2563eb', '#38bdf8', '#ffffff']
 });
 } catch {
 // safe fallback
 }
 };

 const closeQuoteModal = () => {
 setQuoteModalOpen(false);
 setTimeout(() => {
 setQuoteSubmitted(false);
 }, 300);
 };

 // Detailed Services Mega Menu Data
 const servicesData = [
 {
 id: 'app-dev',
 name: 'App Development',
 desc: 'Mobile and spatial application engineering',
 icon: Smartphone,
 subItems: [
 { name: 'Android Development', desc: 'Native Kotlin and Java apps for Android ecosystems', icon: Bot },
 { name: 'iOS Development', desc: 'High-performance Swift apps for iPhone and iPad', icon: Apple },
 { name: 'React Native Development', desc: 'Cross-platform mobile apps with native performance', icon: Atom },
 { name: 'Hybrid Development', desc: 'Unified single-codebase cross-platform solutions', icon: Cpu },
 { name: 'Flutter Development', desc: 'Fast, fluid, multi-screen reactive applications', icon: Zap },
 { name: 'Kotlin / Ionic / Swift / Xamarin', desc: 'Multi-framework modern mobile stack', icon: Boxes },
 { name: 'Visionaire', desc: 'Next-gen spatial and Apple Vision Pro experiences', icon: Glasses },
 ]
 },
 {
 id: 'software-dev',
 name: 'Software Application Development',
 desc: 'Enterprise architecture and intelligent automation',
 icon: Code2,
 subItems: [
 { name: 'SaaS', desc: 'Scalable multi-tenant cloud software products', icon: Cloud },
 { name: 'Low Code / No Code', desc: 'Rapid prototyping and accelerated enterprise tooling', icon: Sliders },
 { name: 'Application Development', desc: 'Bespoke corporate architecture and workflows', icon: Binary },
 { name: 'Software Integration', desc: 'Seamless API, CRM, ERP and database bridges', icon: Network },
 { name: 'AI Chat Support', desc: 'Intelligent conversational agents and LLM workflows', icon: MessageSquareCode },
 ]
 },
 {
 id: 'web-dev',
 name: 'Web Design and Development',
 desc: 'Full-stack web applications and high-performance portals',
 icon: Layout,
 subItems: [
 { name: 'CMS Development', desc: 'Headless and enterprise content systems', icon: FileCode2 },
 { name: 'Web Portal Development', desc: 'Secure client, employee and partner dashboards', icon: Globe2 },
 { name: 'Corporate Web Development', desc: 'High-converting enterprise web presence', icon: Building2 },
 { name: 'Custom Web Application', desc: 'Tailored cloud-native software platforms', icon: AppWindow },
 { name: 'Small Office and Home Office Web Development', desc: 'Agile and cost-efficient digital starter packages', icon: Home },
 { name: 'Node.js Development', desc: 'Ultra-fast event-driven backend microservices', icon: Server },
 { name: 'Next.js Development', desc: 'Production-ready server-side rendered web apps', icon: Rocket },
 { name: 'React.js Development', desc: 'Dynamic, reactive component-driven interfaces', icon: Blocks },
 { name: 'Laravel Development', desc: 'Robust, elegant PHP backend architecture', icon: Flame },
 { name: 'Angular Development', desc: 'Structured, large-scale enterprise SPAs', icon: ShieldCheck },
 { name: 'PHP Development', desc: 'Reliable, proven server-side database systems', icon: Database },
 ]
 },
 {
 id: 'ecommerce',
 name: 'E-commerce Solutions',
 desc: 'High-converting digital storefronts and marketplaces',
 icon: ShoppingCart,
 subItems: [
 { name: 'Custom eCommerce Solutions', desc: 'Tailored enterprise-grade commerce platforms', icon: Store },
 { name: 'Shopify Development solutions', desc: 'Bespoke Shopify store design and integration', icon: ShoppingBag },
 { name: 'WooCommerce Development solutions', desc: 'Scalable WordPress-based storefronts', icon: CreditCard },
 { name: 'BigCommerce Development Solutions', desc: 'High-volume scalable enterprise stores', icon: PackageCheck },
 ]
 },
 {
 id: 'digital-marketing',
 name: 'Digital Marketing Solutions',
 desc: 'Data-driven growth, generative search and brand visibility',
 icon: Megaphone,
 subItems: [
 { name: 'AEO (Answer Engine Optimization)', desc: 'AI answer engine visibility and conversational query targeting', icon: HelpCircle },
 { name: 'GEO (Generative Engine Optimization)', desc: 'Optimization for ChatGPT, Gemini, Copilot and Perplexity', icon: Sparkles },
 { name: 'AI SEO', desc: 'Next-gen algorithmic and semantic search intelligence', icon: BrainCircuit },
 { name: 'Social Media Marketing', desc: 'Omnichannel brand awareness, viral campaigns and community reach', icon: Share2 },
 { name: '(PPC) Paid Advertising', desc: 'High-ROI Google, Meta, Bing and LinkedIn targeted ad campaigns', icon: Target },
 { name: 'Email Marketing', desc: 'Automated newsletters, drip sequences and customer retention', icon: MailCheck },
 { name: 'WhatsApp Marketing', desc: 'Direct conversational commerce, broadcast alerts and automated CRM', icon: MessageCircle },
 { name: 'SMS Marketing', desc: 'Instant deliverability text campaigns and promotional alerts', icon: MessageSquareShare },
 { name: 'Content Marketing', desc: 'High-authority industry thought leadership, copywriting and articles', icon: FileText },
 { name: 'Video Marketing', desc: 'Engaging video campaigns, YouTube growth and social reels', icon: Video },
 { name: 'White Hat SEO Services', desc: 'Ethical, sustainable long-term top organic search rankings', icon: Award },
 { name: 'Link Building Services', desc: 'High-authority backlink outreach and domain authority growth', icon: Link2 },
 { name: 'ORM (Online Reputation Management)', desc: 'Brand sentiment monitoring, review curation and crisis mitigation', icon: BadgeCheck },
 ]
 },
 {
 id: 'creative-solutions',
 name: 'Creative Solutions',
 desc: 'Cutting-edge design, branding and visual storytelling',
 icon: Palette,
 subItems: [
 { name: 'UI/UX Design Services', desc: 'Human-centric user journeys, wireframing and interactive prototypes', icon: LayoutGrid },
 { name: 'Custom Logo Design', desc: 'Distinctive, memorable corporate brand marks and identity assets', icon: PenTool },
 { name: 'Creative Video Production', desc: 'High-definition brand commercials, 3D motion graphics and animations', icon: Film },
 { name: 'User Manual Development', desc: 'Comprehensive technical documentation and onboarding guides', icon: BookOpenCheck },
 { name: 'Product Design and Prototyping', desc: 'End- digital and physical product UX and 3D modeling', icon: Box },
 { name: 'Social Media Creative Design', desc: 'Eye-catching social graphics, carousels, banner ads and viral assets', icon: ImagePlus },
 ]
 },
 {
 id: 'back-office',
 name: 'Back Office Support',
 desc: 'Continuous operational, technical and administrative excellence',
 icon: Headphones,
 subItems: [
 { name: 'E-commerce Website Maintenance', desc: 'Store upkeep, checkout monitoring, inventory sync and plugin patches', icon: Wrench },
 { name: '24/7 Support', desc: 'Round-the-clock SLA helpdesk, live chat support and incident resolution', icon: Clock },
 { name: 'Technical Maintenance and Security', desc: 'Server hardening, malware scanning, core upgrades and bug fixes', icon: Lock },
 { name: 'Order and Backend Management', desc: 'Fulfillment workflows, catalog management and customer data processing', icon: ClipboardCheck },
 ]
 }
 ];

 const navItems = [
 {
 name: 'Who we are',
 icon: Users,
 isDropdown: true,
 subItems: [
 {
 name: 'About Us',
 path: '/about',
 desc: 'Our vision, leadership and team',
 icon: Users
 },
 {
 name: 'How We Work',
 path: '/how-we-work',
 desc: 'Agile execution and delivery',
 icon: Workflow
 },
 {
 name: 'Testimonials',
 path: '/testimonials',
 desc: 'Verified enterprise success stories',
 icon: MessageSquareQuote
 },
 {
 name: 'Our Brands and Our Partners',
 path: '/brands-partners',
 desc: 'Trusted global alliances',
 icon: Handshake
 },
 ]
 },
 {
 name: 'Our Services',
 path: '/services',
 icon: Layers,
 isMegaMenu: true
 },
 {
 name: 'Sectors',
 path: '/sectors',
 icon: Globe,
 isDropdown: false
 },
 {
 name: 'Explore',
 icon: Compass,
 isDropdown: true,
 subItems: [
 {
 name: 'Stories',
 path: '/stories',
 desc: 'Transformation case studies',
 icon: TrendingUp
 },
 {
 name: 'Our Work',
 path: '/our-work',
 desc: 'Innovative solutions catalog',
 icon: Briefcase
 },
 {
 name: 'Journal',
 path: '/journal',
 desc: 'Tech insights and industry news',
 icon: BookOpen
 },
 {
 name: 'White Paper',
 path: '/white-paper',
 desc: 'In-depth research and benchmarks',
 icon: ScrollText
 },
 ]
 },
 {
 name: 'Gallery',
 path: '/gallery',
 icon: ImageIcon,
 isDropdown: false
 },
 {
 name: 'Contact Us',
 path: '/contact',
 icon: Mail,
 isDropdown: false
 }
 ];

 const handleMouseEnter = (name) => {
 if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
 setActiveDropdown(name);
 };

 const handleMouseLeave = () => {
 dropdownTimeoutRef.current = setTimeout(() => {
 setActiveDropdown(null);
 }, 220);
 };

 const isItemActive = (item) => {
 if (item.isMegaMenu) {
 return location.pathname === '/services';
 }
 if (!item.isDropdown) {
 return location.pathname === item.path;
 }
 return item.subItems.some(sub => location.pathname === sub.path);
 };

 // Staggered slow visible reveal animation variants
 const navContainerVariants = {
 hidden: { opacity: 0 },
 visible: {
 opacity: 1,
 transition: {
 staggerChildren: 0.12,
 delayChildren: 0.2
 }
 }
 };

 const navItemVariants = {
 hidden: { opacity: 0, y: -16, filter: 'blur(6px)' },
 visible: {
 opacity: 1,
 y: 0,
 filter: 'blur(0px)',
 transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
 }
 };

 // Currently selected category in the mega menu
 const currentCategoryData = servicesData.find(c => c.id === activeServiceCategory) || servicesData[0];

 return (
 <>
 <motion.header
 initial={{ y: -90, opacity: 0 }}
 animate={{ y: 0, opacity: 1 }}
 transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
 className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
 ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_24px_rgba(23,37,84,0.06)] border-b border-[#111111]/10/80 h-[64px] sm:h-[72px] lg:h-[78px] xl:h-[84px] 4xl:h-[100px]'
 : 'bg-white/90 backdrop-blur-sm border-b border-[#111111]/10/50 h-[68px] sm:h-[76px] lg:h-[82px] xl:h-[88px] 4xl:h-[108px]'
 }`}
 >
 <div className="w-full max-w-[1440px] 4xl:max-w-[2400px] mx-auto px-3 xs:px-4 sm:px-5 lg:px-2.5 xl:px-8 4xl:px-16 h-full flex items-center justify-between gap-1 lg:gap-1.5 xl:gap-4 4xl:gap-8">

 {/* Logo (Links to Home Page) with Slow Reveal Animation */}
 <Link
 to="/"
 onClick={() => {
 setMobileMenuOpen(false);
 setActiveDropdown(null);
 }}
 className="flex items-center gap-2 flex-shrink-0 group focus:outline-none"
 title="VR4WEB - Home"
 >
 <motion.div
 initial={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
 animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
 transition={{ duration: 0.9, ease: "easeOut" }}
 whileHover={{ scale: 1.05 }}
 whileTap={{ scale: 0.95 }}
 className="flex items-center"
 >
 <img
 src="/vrlogo.png"
 alt="VR4WEB Logo"
 className="h-8 xs:h-9 sm:h-9 md:h-10 lg:h-9 xl:h-12 4xl:h-18 w-auto object-contain drop-shadow-sm"
 />
 </motion.div>
 </Link>

 {/* Desktop Navigation Bar (1024px, 1440px, 2560px) */}
 <motion.nav
 variants={navContainerVariants}
 initial="hidden"
 animate="visible"
 className="hidden lg:flex items-center justify-center gap-0.5 xl:gap-1.5 2xl:gap-2.5 4xl:gap-4 flex-1 min-w-0"
 >
 {navItems.map((item) => {
 const active = isItemActive(item);
 const Icon = item.icon;

 // MEGA MENU FOR "OUR SERVICES"
 if (item.isMegaMenu) {
 const isOpen = activeDropdown === 'Our Services';

 return (
 <motion.div
 key={item.name}
 variants={navItemVariants}
 className="relative py-2"
 onMouseEnter={() => handleMouseEnter('Our Services')}
 onMouseLeave={handleMouseLeave}
 >
 <motion.button
 whileHover={{ y: -3 }}
 transition={{ type: "spring", stiffness: 450, damping: 14 }}
 onClick={() => setActiveDropdown(isOpen ? null : 'Our Services')}
 className={`group relative px-1.5 py-1 lg:px-1.5 lg:py-1 xl:px-3 xl:py-2 4xl:px-5 4xl:py-2.5 rounded-2xl text-[12px] lg:text-[12px] xl:text-[13.5px] 4xl:text-[17px] font-medium flex items-center gap-1 lg:gap-1 xl:gap-2 transition-all duration-200 cursor-pointer ${active || isOpen
 ? 'text-[#0B4F9C] bg-white/90 shadow-sm border border-[#111111]/10/70'
 : 'text-[#111111] hover:text-[#0B4F9C] hover:bg-white/70'
 }`}
 >
 <motion.div
 whileTap={{ scale: 0.82, rotate: [0, -8, 8, 0] }}
 whileHover={{ scale: 1.1 }}
 transition={{ type: "spring", stiffness: 600, damping: 15 }}
 className={`w-5.5 h-5.5 lg:w-5.5 lg:h-5.5 xl:w-7 xl:h-7 4xl:w-9 4xl:h-9 rounded-full flex items-center justify-center transition-all duration-200 ${active || isOpen
 ? 'bg-[#0B4F9C] text-white shadow-sm shadow-[#0B4F9C]/30'
 : 'bg-white/70 text-[#111111] group-hover:bg-white group-hover:text-[#0B4F9C]'
 }`}
 >
 <Icon className="w-2.5 h-2.5 lg:w-2.5 lg:h-2.5 xl:w-3.5 xl:h-3.5 4xl:w-4.5 4xl:h-4.5" />
 </motion.div>

 <span className="flex items-center whitespace-nowrap">
 <span className={`${active || isOpen ? 'text-[#0B4F9C] font-semibold text-[1.12em]' : ''}`}>
 {item.name.charAt(0)}
 </span>
 <span>{item.name.slice(1)}</span>
 </span>

 <ChevronDown
 className={`w-3 h-3 lg:w-3 lg:h-3 xl:w-3.5 xl:h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#0B4F9C]' : active ? 'text-[#0B4F9C]' : 'text-[#111111]'}`}
 />

 {(active || isOpen) && (
 <motion.div
 layoutId="activeIndicator"
 className="absolute bottom-0 left-3 right-3 h-[3px] bg-[#0B4F9C] rounded-full shadow-[0_2px_8px_rgba(23,37,84,0.4)]"
 />
 )}
 </motion.button>

 {/* BIG MEGA MENU (Split Left / Right Layout like Descript) */}
 <AnimatePresence>
 {isOpen && (
 <motion.div
 initial={{ opacity: 0, y: 15, scale: 0.98 }}
 animate={{ opacity: 1, y: 0, scale: 1 }}
 exit={{ opacity: 0, y: 10, scale: 0.98 }}
 transition={{ duration: 0.25, ease: "easeOut" }}
 className="fixed lg:absolute top-[68px] sm:top-[76px] lg:top-full left-1/2 -translate-x-1/2 pt-2 lg:pt-3 z-50 w-[94vw] lg:w-[920px] xl:w-[1050px] 4xl:w-[1350px] max-w-[94vw] 4xl:max-w-[1400px]"
 onMouseEnter={() => handleMouseEnter('Our Services')}
 onMouseLeave={handleMouseLeave}
 >
 <div className="bg-white border border-[#111111]/10/90 rounded-3xl shadow-[0_25px_70px_rgba(23,37,84,0.18)] overflow-hidden flex flex-col md:flex-row max-h-[82vh]">

 {/* LEFT COLUMN: Categories / Domains (Vertical Tabs) */}
 <div className="w-[300px] xl:w-[330px] bg-white/90 p-4 border-r border-[#111111]/10/80 flex flex-col justify-between overflow-y-auto">
 <div>
 <div className="px-3 pb-3 pt-1">
 <span className="text-[13px] font-semibold uppercase tracking-widest text-[#111111]">
 Our Services Directory
 </span>
 </div>

 <div className="space-y-1">
 {servicesData.map((cat) => {
 const isSelected = activeServiceCategory === cat.id;
 const CatIcon = cat.icon;

 return (
 <button
 key={cat.id}
 onMouseEnter={() => setActiveServiceCategory(cat.id)}
 onClick={() => setActiveServiceCategory(cat.id)}
 className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-left transition-all duration-200 cursor-pointer ${isSelected
 ? 'bg-[#0B4F9C] text-white shadow-md shadow-[#0B4F9C]/25'
 : 'text-[#111111] hover:bg-white/70 hover:text-[#0B4F9C]'
 }`}
 >
 <div className="flex items-center gap-2.5 min-w-0">
 <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform ${isSelected
 ? 'bg-white/20 text-white'
 : 'bg-white text-[#111111] border border-[#111111]/10/70'
 }`}>
 <CatIcon className="w-4 h-4" />
 </div>
 <div className="min-w-0">
 <p className={`text-[13px] font-bold tracking-tight truncate ${isSelected ? 'text-white' : 'text-[#111111]'
 }`}>
 {cat.name}
 </p>
 </div>
 </div>
 <ChevronRight className={`w-4 h-4 flex-shrink-0 ml-1 transition-transform ${isSelected ? 'text-white translate-x-0.5' : 'text-[#111111]'
 }`} />
 </button>
 );
 })}
 </div>
 </div>

 {/* vr4web.com Badge in Left Column */}
 <div className="mt-4 pt-3 border-t border-[#111111]/10/80 px-3 flex items-center gap-2 text-[#111111] text-[13px] font-medium">
 <Globe className="w-3.5 h-3.5 text-[#0B4F9C]" />
 <span className="text-[#111111] font-medium tracking-wide">vr4web.com</span>
 </div>
 </div>

 {/* RIGHT COLUMN: Sub-Services Grid and Features */}
 <div className="flex-1 p-6 xl:p-8 bg-white overflow-y-auto">
 <div>
 {/* Sub-heading Section */}
 <div className="pb-4 mb-4 border-b border-[#111111]/10">
 <div>
 <h3 className="text-xl xl:text-2xl font-semibold text-[#0B4F9C] tracking-tight flex items-center gap-2">
 <span>{currentCategoryData.name}</span>
 </h3>
 <p className="text-[15px] xl:text-[17px] font-normal text-[#111111] mt-1">
 {currentCategoryData.desc}
 </p>
 </div>
 </div>

 {/* Sub-Sub Headings (Interactive Grid of Capabilities) */}
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xl:gap-3.5">
 {currentCategoryData.subItems.map((sub) => {
 const SubItemIcon = sub.icon || Sparkles;

 return (
 <Link
 key={sub.name}
 to={`/services?category=${encodeURIComponent(currentCategoryData.name)}&item=${encodeURIComponent(sub.name)}`}
 onClick={() => setActiveDropdown(null)}
 className="group p-3 rounded-2xl border border-[#111111]/10 hover:border-[#111111]/10/90 hover:bg-white/40 transition-all duration-200 flex flex-col justify-between hover:shadow-xs"
 >
 <div className="flex items-center justify-between mb-1.5">
 <div className="flex items-center gap-2.5">
 <motion.div
 whileHover={{ scale: 1.15, rotate: 6 }}
 whileTap={{ scale: 0.86, rotate: -6 }}
 transition={{ type: "spring", stiffness: 450, damping: 16 }}
 className="w-7 h-7 rounded-lg bg-white/90 group-hover:bg-[#0B4F9C] text-[#0B4F9C] group-hover:text-white flex items-center justify-center transition-all duration-200 border border-[#111111]/10/80 group-hover:border-[#0B4F9C] shadow-xs flex-shrink-0"
 >
 <SubItemIcon className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-105" />
 </motion.div>
 <span className="text-[14px] font-bold text-[#111111] group-hover:text-[#0B4F9C] transition-colors leading-tight">
 {sub.name}
 </span>
 </div>
 <ArrowUpRight className="w-3.5 h-3.5 text-[#111111] group-hover:text-[#0B4F9C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all opacity-0 group-hover:opacity-100 flex-shrink-0 ml-1" />
 </div>
 <p className="text-[13.5px] font-normal text-[#111111] line-clamp-1 leading-snug pl-[38px]">
 {sub.desc}
 </p>
 </Link>
 );
 })}
 </div>
 </div>
 </div>

 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </motion.div>
 );
 }

 // STANDARD DROPDOWNS (Who we are, Explore)
 if (item.isDropdown) {
 const isOpen = activeDropdown === item.name;

 return (
 <motion.div
 key={item.name}
 variants={navItemVariants}
 className="relative py-2"
 onMouseEnter={() => handleMouseEnter(item.name)}
 onMouseLeave={handleMouseLeave}
 >
 <motion.button
 whileHover={{ y: -3 }}
 transition={{ type: "spring", stiffness: 450, damping: 14 }}
 onClick={() => setActiveDropdown(isOpen ? null : item.name)}
 className={`group relative px-1.5 py-1 lg:px-1.5 lg:py-1 xl:px-3 xl:py-2 4xl:px-5 4xl:py-2.5 rounded-2xl text-[12px] lg:text-[12px] xl:text-[13.5px] 4xl:text-[17px] font-medium flex items-center gap-1 lg:gap-1 xl:gap-2 transition-all duration-200 cursor-pointer ${active
 ? 'text-[#0B4F9C] bg-white/90 shadow-sm border border-[#111111]/10/70'
 : 'text-[#111111] hover:text-[#0B4F9C] hover:bg-white/70'
 }`}
 >
 <motion.div
 whileTap={{ scale: 0.82, rotate: [0, -8, 8, 0] }}
 whileHover={{ scale: 1.1 }}
 transition={{ type: "spring", stiffness: 600, damping: 15 }}
 className={`w-5.5 h-5.5 lg:w-5.5 lg:h-5.5 xl:w-7 xl:h-7 4xl:w-9 4xl:h-9 rounded-full flex items-center justify-center transition-all duration-200 ${active
 ? 'bg-[#0B4F9C] text-white shadow-sm shadow-[#0B4F9C]/30'
 : 'bg-white/70 text-[#111111] group-hover:bg-white group-hover:text-[#0B4F9C]'
 }`}
 >
 <Icon className="w-2.5 h-2.5 lg:w-2.5 lg:h-2.5 xl:w-3.5 xl:h-3.5 4xl:w-4.5 4xl:h-4.5" />
 </motion.div>

 <span className="flex items-center whitespace-nowrap">
 <span className={`${active ? 'text-[#0B4F9C] font-semibold text-[1.12em]' : ''}`}>
 {item.name.charAt(0)}
 </span>
 <span>{item.name.slice(1)}</span>
 </span>

 <ChevronDown
 className={`w-3 h-3 lg:w-3 lg:h-3 xl:w-3.5 xl:h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#0B4F9C]' : active ? 'text-[#0B4F9C]' : 'text-[#111111]'}`}
 />

 {active && (
 <motion.div
 layoutId="activeIndicator"
 className="absolute bottom-0 left-3 right-3 h-[3px] bg-[#0B4F9C] rounded-full shadow-[0_2px_8px_rgba(23,37,84,0.4)]"
 />
 )}
 </motion.button>

 <AnimatePresence>
 {isOpen && (
 <motion.div
 initial={{ opacity: 0, y: 12, scale: 0.95 }}
 animate={{ opacity: 1, y: 0, scale: 1 }}
 exit={{ opacity: 0, y: 8, scale: 0.95 }}
 transition={{ duration: 0.22, ease: "easeOut" }}
 className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 w-[300px] xl:w-[320px]"
 >
 <div className="bg-white border border-[#111111]/10 rounded-2xl shadow-[0_18px_40px_rgba(23,37,84,0.12)] p-2.5 backdrop-blur-xl">
 <div className="space-y-1">
 {item.subItems.map((sub) => {
 const isSubActive = location.pathname === sub.path;
 const SubIcon = sub.icon;

 return (
 <Link
 key={sub.name}
 to={sub.path}
 onClick={() => setActiveDropdown(null)}
 className={`group flex items-start gap-3 p-2.5 rounded-xl transition-all duration-200 ${isSubActive
 ? 'bg-[#0B4F9C] text-white shadow-md shadow-[#0B4F9C]/20'
 : 'hover:bg-white/70 text-[#111111]'
 }`}
 >
 <motion.div
 whileTap={{ scale: 0.84, rotate: -8 }}
 whileHover={{ scale: 1.12 }}
 transition={{ type: "spring", stiffness: 600, damping: 15 }}
 className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${isSubActive
 ? 'bg-white/20 text-white'
 : 'bg-white/70 text-[#0B4F9C] group-hover:bg-[#0B4F9C] group-hover:text-white'
 }`}
 >
 <SubIcon className="w-4 h-4" />
 </motion.div>

 <div className="flex-1 min-w-0">
 <div className="flex items-center justify-between">
 <span className={`text-[14px] font-bold tracking-tight transition-transform duration-200 group-hover:translate-x-0.5 ${isSubActive ? 'text-white' : 'text-[#111111] group-hover:text-[#0B4F9C]'
 }`}>
 <span className={isSubActive ? 'text-[#F97316] font-extrabold text-[1.1em]' : 'group-hover:text-[#0B4F9C]'}>
 {sub.name.charAt(0)}
 </span>
 {sub.name.slice(1)}
 </span>

 <ArrowUpRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${isSubActive ? 'opacity-100 text-white' : 'text-[#0B4F9C]'
 }`} />
 </div>
 <p className={`text-[13px] font-normal leading-snug mt-0.5 line-clamp-1 ${isSubActive ? 'text-[#F97316]' : 'text-[#111111]'
 }`}>
 {sub.desc}
 </p>
 </div>
 </Link>
 );
 })}
 </div>
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </motion.div>
 );
 }

 // REGULAR NAV ITEMS (Sectors, Gallery, Contact Us)
 return (
 <motion.div
 key={item.name}
 variants={navItemVariants}
 whileHover={{ y: -3 }}
 transition={{ type: "spring", stiffness: 450, damping: 14 }}
 >
 <Link
 to={item.path}
 onClick={() => setActiveDropdown(null)}
 className={`group relative px-1.5 py-1 lg:px-1.5 lg:py-1 xl:px-3 xl:py-2 4xl:px-5 4xl:py-2.5 rounded-2xl text-[12px] lg:text-[12px] xl:text-[13.5px] 4xl:text-[17px] font-medium inline-flex items-center gap-1 lg:gap-1 xl:gap-2 transition-all duration-200 ${active
 ? 'text-[#0B4F9C] bg-white/90 shadow-sm border border-[#111111]/10/70'
 : 'text-[#111111] hover:text-[#0B4F9C] hover:bg-white/70'
 }`}
 >
 <motion.div
 whileTap={{ scale: 0.82, rotate: [0, -8, 8, 0] }}
 whileHover={{ scale: 1.1 }}
 transition={{ type: "spring", stiffness: 600, damping: 15 }}
 className={`w-5.5 h-5.5 lg:w-5.5 lg:h-5.5 xl:w-7 xl:h-7 4xl:w-9 4xl:h-9 rounded-full flex items-center justify-center transition-all duration-200 ${active
 ? 'bg-[#0B4F9C] text-white shadow-sm shadow-[#0B4F9C]/30'
 : 'bg-white/70 text-[#111111] group-hover:bg-white group-hover:text-[#0B4F9C]'
 }`}
 >
 <Icon className="w-2.5 h-2.5 lg:w-2.5 lg:h-2.5 xl:w-3.5 xl:h-3.5 4xl:w-4.5 4xl:h-4.5" />
 </motion.div>

 <span className="flex items-center whitespace-nowrap">
 <span className={`${active ? 'text-[#0B4F9C] font-semibold text-[1.12em]' : ''}`}>
 {item.name.charAt(0)}
 </span>
 <span>{item.name.slice(1)}</span>
 </span>

 {active && (
 <motion.div
 layoutId="activeIndicator"
 className="absolute bottom-0 left-3 right-3 h-[3px] bg-[#0B4F9C] rounded-full shadow-[0_2px_8px_rgba(23,37,84,0.4)]"
 />
 )}
 </Link>
 </motion.div>
 );
 })}
 </motion.nav>

 {/* CTA Button: Solid Normal Dark Blue (#172554) */}
 <motion.div
 initial={{ opacity: 0, x: 20, filter: 'blur(5px)' }}
 animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
 transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
 className="hidden sm:flex items-center flex-shrink-0"
 >
 <motion.button
 onClick={() => {
 setActiveDropdown(null);
 setQuoteModalOpen(true);
 }}
 whileHover={{ scale: 1.04, y: -2 }}
 whileTap={{ scale: 0.94 }}
 transition={{ type: "spring", stiffness: 450, damping: 15 }}
 className="relative flex items-center bg-[#0B4F9C] hover:bg-[#0B4F9C] text-white px-2.5 sm:px-3 lg:px-3 lg:py-1.5 xl:px-5 xl:py-2 4xl:px-7 4xl:py-3 rounded-xl 4xl:rounded-2xl border border-[#0B4F9C] shadow-[0_4px_16px_rgba(23,37,84,0.35)] hover:shadow-[0_6px_22px_rgba(23,37,84,0.5)] transition-all duration-200 overflow-hidden group focus:outline-none cursor-pointer flex-shrink-0"
 >
 <span className="relative z-10 font-bold text-xs sm:text-[12.5px] lg:text-[12px] xl:text-[14px] 4xl:text-[17px] tracking-wide text-white whitespace-nowrap">
 Get a Quote
 </span>
 </motion.button>
 </motion.div>

 {/* Mobile and Tablet Hamburger Toggle (320px, 425px, 768px) */}
 <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">
 <button
 onClick={() => {
 setMobileMenuOpen(false);
 setQuoteModalOpen(true);
 }}
 className="sm:hidden relative flex items-center gap-1 bg-[#0B4F9C] text-white px-2.5 py-1.5 rounded-lg text-[11px] font-bold border border-[#0B4F9C] shadow-sm cursor-pointer whitespace-normal sm:whitespace-nowrap"
 >
 <AustralianKangarooIcon className="w-2.5 h-2.5 text-white" />
 <span>Quote</span>
 </button>

 <motion.button
 whileTap={{ scale: 0.9 }}
 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
 className="p-1.5 sm:p-2.5 rounded-xl bg-white text-[#0B4F9C] hover:bg-white focus:outline-none transition-colors cursor-pointer"
 aria-label="Toggle Navigation Menu"
 >
 {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
 </motion.button>
 </div>

 </div>

 {/* Mobile / Tablet Responsive Drawer Menu (320px, 425px, 768px) */}
 <AnimatePresence>
 {mobileMenuOpen && (
 <motion.div
 initial={{ opacity: 0, height: 0 }}
 animate={{ opacity: 1, height: 'auto' }}
 exit={{ opacity: 0, height: 0 }}
 transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
 className="lg:hidden bg-white border-b border-[#111111]/10/90 shadow-2xl overflow-hidden max-h-[calc(100vh-64px)] sm:max-h-[calc(100vh-72px)] overflow-y-auto"
 >
 <div className="px-3 xs:px-4 py-4 sm:py-5 space-y-2 max-w-lg md:max-w-xl mx-auto">
 {navItems.map((item) => {
 const active = isItemActive(item);
 const Icon = item.icon;

 // MOBILE "OUR SERVICES" MEGA ACCORDION
 if (item.isMegaMenu) {
 const isExpanded = mobileDropdown === 'Our Services';

 return (
 <div key={item.name} className="border-b border-[#111111]/10/60 pb-2">
 <button
 onClick={() => setMobileDropdown(isExpanded ? null : 'Our Services')}
 className={`w-full flex items-center justify-between py-2.5 px-3 rounded-xl font-bold text-left transition-colors cursor-pointer ${active || isExpanded
 ? 'bg-white text-[#0B4F9C] border border-[#111111]/10/60'
 : 'text-[#111111] hover:bg-white'
 }`}
 >
 <span className="flex items-center gap-2.5 text-[15px]">
 <div className={`w-7 h-7 rounded-full flex items-center justify-center ${active || isExpanded ? 'bg-[#0B4F9C] text-white shadow-sm' : 'bg-white text-[#111111]'
 }`}>
 <Icon className="w-3.5 h-3.5" />
 </div>
 <span className="whitespace-nowrap">
 <span className={active || isExpanded ? 'text-[#0B4F9C] font-semibold text-[1.12em]' : ''}>
 {item.name.charAt(0)}
 </span>
 <span>{item.name.slice(1)}</span>
 </span>
 </span>
 <ChevronDown
 className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-[#0B4F9C]' : 'text-[#111111]'}`}
 />
 </button>

 <AnimatePresence>
 {isExpanded && (
 <motion.div
 initial={{ opacity: 0, height: 0 }}
 animate={{ opacity: 1, height: 'auto' }}
 exit={{ opacity: 0, height: 0 }}
 transition={{ duration: 0.25 }}
 className="pl-2 pr-1 pt-2 space-y-1.5 overflow-hidden"
 >
 {servicesData.map((cat) => {
 const isCatOpen = mobileServiceCategory === cat.id;
 const CatIcon = cat.icon;

 return (
 <div key={cat.id} className="bg-white rounded-xl border border-[#111111]/10/70 overflow-hidden">
 <button
 onClick={() => setMobileServiceCategory(isCatOpen ? null : cat.id)}
 className="w-full flex items-center justify-between p-2.5 text-left font-bold text-[13.5px] text-[#111111] hover:bg-white cursor-pointer"
 >
 <div className="flex items-center gap-2">
 <CatIcon className="w-3.5 h-3.5 text-[#0B4F9C]" />
 <span>{cat.name}</span>
 </div>
 <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isCatOpen ? 'rotate-180 text-[#0B4F9C]' : 'text-[#111111]'}`} />
 </button>

 <AnimatePresence>
 {isCatOpen && (
 <motion.div
 initial={{ opacity: 0, height: 0 }}
 animate={{ opacity: 1, height: 'auto' }}
 exit={{ opacity: 0, height: 0 }}
 transition={{ duration: 0.2 }}
 className="px-3 pb-2.5 pt-1 space-y-1 border-t border-[#111111]/10 bg-white/50"
 >
 {cat.subItems.map((sub) => {
 const SubItemIcon = sub.icon || Sparkles;
 return (
 <Link
 key={sub.name}
 to={`/services?category=${encodeURIComponent(cat.name)}&item=${encodeURIComponent(sub.name)}`}
 onClick={() => {
 setMobileMenuOpen(false);
 setActiveDropdown(null);
 }}
 className="group flex items-center justify-between py-2 px-2.5 rounded-lg text-xs font-medium text-[#111111] hover:text-[#0B4F9C] hover:bg-white/80 transition-all"
 >
 <div className="flex items-center gap-2.5 min-w-0">
 <motion.div
 whileTap={{ scale: 0.85, rotate: -6 }}
 className="w-6 h-6 rounded-md bg-white group-hover:bg-[#0B4F9C] text-[#0B4F9C] group-hover:text-white flex items-center justify-center transition-colors flex-shrink-0 border border-[#111111]/10/60"
 >
 <SubItemIcon className="w-3 h-3" />
 </motion.div>
 <span className="truncate">{sub.name}</span>
 </div>
 <ArrowUpRight className="w-3 h-3 text-[#111111] group-hover:text-[#0B4F9C] flex-shrink-0" />
 </Link>
 );
 })}
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 );
 })}
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 );
 }

 // MOBILE STANDARD DROPDOWNS
 if (item.isDropdown) {
 const isExpanded = mobileDropdown === item.name;

 return (
 <div key={item.name} className="border-b border-[#111111]/10/60 pb-2">
 <button
 onClick={() => setMobileDropdown(isExpanded ? null : item.name)}
 className={`w-full flex items-center justify-between py-2.5 px-3 rounded-xl font-bold text-left transition-colors cursor-pointer ${active
 ? 'bg-white text-[#0B4F9C] border border-[#111111]/10/60'
 : 'text-[#111111] hover:bg-white'
 }`}
 >
 <span className="flex items-center gap-2.5 text-[15px]">
 <div className={`w-7 h-7 rounded-full flex items-center justify-center ${active ? 'bg-[#0B4F9C] text-white shadow-sm' : 'bg-white text-[#111111]'
 }`}>
 <Icon className="w-3.5 h-3.5" />
 </div>
 <span>
 <span className={active ? 'text-[#0B4F9C] font-semibold text-[1.12em]' : ''}>
 {item.name.charAt(0)}
 </span>
 <span>{item.name.slice(1)}</span>
 </span>
 </span>
 <ChevronDown
 className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-[#0B4F9C]' : 'text-[#111111]'}`}
 />
 </button>

 <AnimatePresence>
 {isExpanded && (
 <motion.div
 initial={{ opacity: 0, height: 0 }}
 animate={{ opacity: 1, height: 'auto' }}
 exit={{ opacity: 0, height: 0 }}
 transition={{ duration: 0.25 }}
 className="pl-3 pr-1 pt-1 space-y-1 overflow-hidden"
 >
 {item.subItems.map((sub) => {
 const isSubActive = location.pathname === sub.path;
 const SubIcon = sub.icon;

 return (
 <Link
 key={sub.name}
 to={sub.path}
 onClick={() => {
 setMobileMenuOpen(false);
 setActiveDropdown(null);
 }}
 className={`flex items-center gap-3 py-2 px-3 rounded-lg text-[13.5px] font-medium transition-all ${isSubActive
 ? 'bg-[#0B4F9C] text-white shadow-sm'
 : 'text-[#111111] hover:bg-white/70 hover:text-[#0B4F9C]'
 }`}
 >
 <div className={`w-7 h-7 rounded-md flex items-center justify-center ${isSubActive ? 'bg-white/20 text-white' : 'bg-white text-[#0B4F9C]'
 }`}>
 <SubIcon className="w-3.5 h-3.5" />
 </div>
 <span className="flex-1">
 <span className={isSubActive ? 'text-[#F97316] font-extrabold' : ''}>
 {sub.name.charAt(0)}
 </span>
 {sub.name.slice(1)}
 </span>
 </Link>
 );
 })}
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 );
 }

 return (
 <div key={item.name} className="border-b border-[#111111]/10/60 pb-2">
 <Link
 to={item.path}
 onClick={() => {
 setMobileMenuOpen(false);
 setActiveDropdown(null);
 }}
 className={`flex items-center justify-between py-2.5 px-3 rounded-xl font-bold text-[15px] transition-colors ${active
 ? 'bg-white text-[#0B4F9C] border border-[#111111]/10/60'
 : 'text-[#111111] hover:bg-white'
 }`}
 >
 <span className="flex items-center gap-2.5">
 <div className={`w-7 h-7 rounded-full flex items-center justify-center ${active ? 'bg-[#0B4F9C] text-white shadow-sm' : 'bg-white text-[#111111]'
 }`}>
 <Icon className="w-3.5 h-3.5" />
 </div>
 <span>
 <span className={active ? 'text-[#0B4F9C] font-semibold text-[1.12em]' : ''}>
 {item.name.charAt(0)}
 </span>
 <span>{item.name.slice(1)}</span>
 </span>
 </span>
 <ArrowUpRight className="w-4 h-4 opacity-70" />
 </Link>
 </div>
 );
 })}

 {/* Mobile "Get a Quote" Button (Solid Dark Blue) */}
 <div className="pt-4 pb-2">
 <button
 onClick={() => {
 setMobileMenuOpen(false);
 setQuoteModalOpen(true);
 }}
 className="w-full flex items-center justify-between bg-[#0B4F9C] hover:bg-[#0B4F9C] text-white px-5 py-3.5 rounded-xl font-bold text-[15px] border border-[#0B4F9C] shadow-lg shadow-[#0B4F9C]/30 active:scale-95 transition-all cursor-pointer"
 >
 <span>Get a Quote</span>
 <div className="w-7 h-7 rounded-full bg-white text-[#0B4F9C] flex items-center justify-center shadow">
 <AustralianKangarooIcon className="w-3.5 h-3.5 text-[#0B4F9C]" />
 </div>
 </button>
 </div>

 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </motion.header>

 {/* Interactive Australian Quote Request Modal (Spring Popup Animation) */}
 <AnimatePresence>
 {quoteModalOpen && (
 <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 onClick={closeQuoteModal}
 className="absolute inset-0 bg-[#111111]/5/60 backdrop-blur-sm"
 />

 <motion.div
 initial={{ opacity: 0, scale: 0.85, y: 30 }}
 animate={{ opacity: 1, scale: 1, y: 0 }}
 exit={{ opacity: 0, scale: 0.9, y: 20 }}
 transition={{ type: "spring", stiffness: 380, damping: 25 }}
 className="relative w-full max-w-lg 4xl:max-w-2xl bg-white rounded-2xl sm:rounded-3xl border border-[#111111]/10 shadow-[0_25px_60px_rgba(23,37,84,0.3)] overflow-hidden z-10 max-h-[92vh] overflow-y-auto"
 >
 <div className="h-1.5 sm:h-2 w-full bg-[#0B4F9C]" />

 <div className="p-4 sm:p-6 pb-2 sm:pb-4 flex items-start justify-between">
 <div>
 <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#111111]/10 text-[#0B4F9C] text-xs font-bold mb-2">
 <AustralianKangarooIcon className="w-3.5 h-3.5 text-[#0B4F9C]" />
 <span>Australian Business Solutions</span>
 </div>
 <h3 className="text-xl sm:text-2xl 4xl:text-3xl font-semibold text-[#111111]">
 Get a Free Custom Quote
 </h3>
 <p className="text-xs 4xl:text-sm text-[#111111] mt-1">
 Fast, transparent pricing tailored for your enterprise in Australia.
 </p>
 </div>

 <button
 onClick={closeQuoteModal}
 className="p-1.5 sm:p-2 rounded-full bg-white/70 text-[#111111] hover:bg-[#111111]/5/80 hover:text-[#111111] transition-colors cursor-pointer"
 >
 <X className="w-5 h-5" />
 </button>
 </div>

 <div className="p-4 sm:p-6 pt-1 sm:pt-2">
 {!quoteSubmitted ? (
 <form onSubmit={handleQuoteSubmit} className="space-y-4">
 <div>
 <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">
 Select Primary Service
 </label>
 <div className="grid grid-cols-2 gap-2">
 {['Web Application', 'VR / 3D Experience', 'Cloud and DevOps', 'Enterprise Software'].map((serv) => (
 <button
 type="button"
 key={serv}
 onClick={() => setFormData({ ...formData, service: serv })}
 className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-left flex items-center justify-between cursor-pointer ${formData.service === serv
 ? 'bg-[#0B4F9C] text-white shadow-md shadow-[#0B4F9C]/25'
 : 'bg-white border border-[#111111]/10 text-[#111111] hover:bg-white'
 }`}
 >
 <span>{serv}</span>
 {formData.service === serv && <CheckCircle2 className="w-3.5 h-3.5 text-[#F97316]" />}
 </button>
 ))}
 </div>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
 <div>
 <label className="block text-xs font-bold text-[#111111] mb-1">
 Your Name
 </label>
 <input
 type="text"
 required
 placeholder="e.g. Liam Smith"
 value={formData.name}
 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
 className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#111111]/10 text-[#111111] text-sm focus:outline-none focus:ring-2 focus:ring-[#172554]/30 focus:border-[#0B4F9C] transition-all"
 />
 </div>
 <div>
 <label className="block text-xs font-bold text-[#111111] mb-1">
 Work Email
 </label>
 <input
 type="email"
 required
 placeholder="liam@company.com.au"
 value={formData.email}
 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
 className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#111111]/10 text-[#111111] text-sm focus:outline-none focus:ring-2 focus:ring-[#172554]/30 focus:border-[#0B4F9C] transition-all"
 />
 </div>
 </div>

 <div>
 <label className="block text-xs font-bold text-[#111111] mb-1 flex items-center gap-1">
 <MapPin className="w-3.5 h-3.5 text-[#0B4F9C]" />
 <span>Australian Location / Region</span>
 </label>
 <select
 value={formData.state}
 onChange={(e) => setFormData({ ...formData, state: e.target.value })}
 className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#111111]/10 text-[#111111] text-sm focus:outline-none focus:ring-2 focus:ring-[#172554]/30 focus:border-[#0B4F9C] transition-all cursor-pointer"
 >
 <option value="NSW (Sydney)">New South Wales (Sydney)</option>
 <option value="VIC (Melbourne)">Victoria (Melbourne)</option>
 <option value="QLD (Brisbane)">Queensland (Brisbane / Gold Coast)</option>
 <option value="WA (Perth)">Western Australia (Perth)</option>
 <option value="SA (Adelaide)">South Australia (Adelaide)</option>
 <option value="ACT (Canberra)">Australian Capital Territory (Canberra)</option>
 <option value="TAS (Hobart)">Tasmania (Hobart)</option>
 </select>
 </div>

 <div className="pt-2">
 <motion.button
 type="submit"
 whileHover={{ scale: 1.02 }}
 whileTap={{ scale: 0.98 }}
 className="w-full py-3 px-6 rounded-xl bg-[#0B4F9C] hover:bg-[#0B4F9C] text-white font-semibold text-sm flex items-center justify-center gap-2 border border-[#0B4F9C] shadow-lg shadow-[#0B4F9C]/30 cursor-pointer transition-all"
 >
 <AustralianKangarooIcon className="w-4 h-4 text-white" />
 <span>Submit Quote Request</span>
 <Send className="w-3.5 h-3.5 ml-1" />
 </motion.button>
 </div>
 </form>
 ) : (
 <motion.div
 initial={{ opacity: 0, scale: 0.9 }}
 animate={{ opacity: 1, scale: 1 }}
 className="text-center py-8 space-y-4"
 >
 <div className="w-16 h-16 rounded-full bg-[#0B4F9C] text-white border border-[#0B4F9C] flex items-center justify-center mx-auto shadow-lg shadow-[#0B4F9C]/30">
 <AustralianKangarooIcon className="w-8 h-8 text-white" />
 </div>

 <div>
 <h4 className="text-xl font-semibold text-[#111111]">
 G&apos;day, {formData.name || 'there'}!
 </h4>
 <p className="text-sm text-[#111111] mt-1 max-w-sm mx-auto">
 Your custom quote request for <span className="font-bold text-[#0B4F9C]">{formData.service}</span> in <span className="font-bold text-[#111111]">{formData.state}</span> has been received!
 </p>
 <p className="text-xs text-[#0B4F9C] bg-white border border-[#111111]/10 rounded-lg p-2.5 mt-3 max-w-xs mx-auto">
 Our Australian solution architect will send your tailored proposal to <span className="font-medium">{formData.email}</span> within 2 business hours.
 </p>
 </div>

 <button
 onClick={closeQuoteModal}
 className="mt-4 px-6 py-2.5 rounded-xl bg-[#0B4F9C] hover:bg-[#0B4F9C] text-white font-semibold text-xs transition-colors cursor-pointer"
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
 </>
 );
}
