import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  Globe,
  FileText,
  Server,
  Smartphone,
  Code2,
  Cpu,
  Layers,
  Database,
  Search,
  Eye,
  KeyRound,
  RefreshCw,
  HelpCircle,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Home,
  ChevronRight,
  Check
} from 'lucide-react';

const scopeServices = [
  {
    title: 'Web Design & Development',
    desc: 'Bespoke corporate websites, headless CMS architectures, web applications, and interactive portals.',
    icon: Globe,
  },
  {
    title: 'Mobile Application Development',
    desc: 'High-speed native iOS (Swift), Android (Kotlin), and polyglot cross-platform apps (Flutter, React Native).',
    icon: Smartphone,
  },
  {
    title: 'Cloud Solutions & DevOps Engineering',
    desc: 'Secure cloud hosting, automated CI/CD pipelines, container orchestration, and serverless architectures.',
    icon: Server,
  },
  {
    title: 'AI Search Optimization (AEO & GEO)',
    desc: 'Conversational Answer Engine Optimization and Generative Engine Optimization for modern LLM discovery.',
    icon: Search,
  },
  {
    title: 'Custom Enterprise Software',
    desc: 'Tailored SaaS systems, ERP/CRM workflow automation, and distributed database engineering.',
    icon: Code2,
  },
  {
    title: 'UI/UX & Creative Digital Design',
    desc: 'Wireframing, clickable design prototypes, brand identities, and enterprise design system creation.',
    icon: Layers,
  },
  {
    title: 'E-Commerce Platforms & Integrations',
    desc: 'Shopify, WooCommerce, BigCommerce, and secure custom payment gateway checkout workflows.',
    icon: Cpu,
  },
  {
    title: '24/7 Technical Maintenance & Security',
    desc: 'Continuous server telemetry, automated backups, vulnerability mitigation, and strict SLA support.',
    icon: ShieldCheck,
  },
];

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-white font-sans text-[#111111] selection:bg-[#E8890C] selection:text-[#0F3D2E]">
      
      {/* ========================================================================= */}
      {/* 1. HERO BANNER — VR4Web Cream & Forest Green Theme                        */}
      {/* ========================================================================= */}
      <section className="relative w-full overflow-hidden mt-[68px] sm:mt-[76px] lg:mt-[82px] xl:mt-[88px] py-8 sm:py-10 lg:py-12 bg-[rgb(240,231,195)] border-b border-[#E8890C]/20">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
          
          {/* Breadcrumbs */}
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] min-[400px]:text-xs sm:text-sm font-bold text-[#0F3D2E] bg-white/85 px-3 sm:px-4 py-1.5 rounded-xl sm:rounded-full shadow-sm border border-white/70 mb-3.5 backdrop-blur-md max-w-full text-center">
            <Link to="/" className="flex items-center gap-1 hover:text-[#E8890C] transition-colors">
              <Home className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#0F3D2E]/50 flex-shrink-0" />
            <span className="text-[#0F3D2E]/80">Legal</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#0F3D2E]/50 flex-shrink-0" />
            <span className="font-extrabold text-[#0F3D2E]">Privacy Policy</span>
          </div>

          {/* Frosted Glass Content Panel */}
          <div className="w-full max-w-3xl rounded-2xl sm:rounded-3xl bg-white/60 backdrop-blur-md border border-white/70 shadow-[0_8px_30px_rgba(15,61,46,0.08)] px-5 py-5 sm:px-8 sm:py-6 flex flex-col items-center">
            
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#0F3D2E] text-white px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-2.5 shadow-sm">
              <Lock className="w-3 h-3 text-[#E8890C]" />
              <span>Legal & Compliance</span>
            </div>

            <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight leading-tight text-[#0F3D2E] mb-2">
              Privacy <span className="text-[#E8890C]">Policy</span>
            </h1>

            <span className="block h-1 w-20 origin-center rounded-full bg-[#E8890C] mb-3 shadow-sm" />

            <p className="text-[#0F3D2E] font-medium text-xs xs:text-sm sm:text-base leading-relaxed max-w-2xl">
              Your trust is our cornerstone. Discover how VR4Web protects, manages, and safeguards your intellectual property and data with complete transparency under the Australian Privacy Principles.
            </p>
          </div>

          {/* Compliance & Revision Badges */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-semibold text-[#0F3D2E]">
            <span className="inline-flex items-center gap-1.5 bg-white/75 px-3 py-1 rounded-full border border-white/60 shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#0F3D2E]" />
              Last Updated: October 2026
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/75 px-3 py-1 rounded-full border border-white/60 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E8890C]" />
              Australian Privacy Act 1988 (APPs) Compliant
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/75 px-3 py-1 rounded-full border border-white/60 shadow-xs">
              <KeyRound className="w-3.5 h-3.5 text-[#0F3D2E]" />
              100% IP & NDA Protected
            </span>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. MAIN POLICY CONTENT CONTAINER                                         */}
      {/* ========================================================================= */}
      <main className="max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        
        <div className="space-y-8 sm:space-y-11">

          {/* ─────────────────────────────────────────────────────────────────── */}
          {/* SECTION 1: OUR COMMITMENT TO PRIVACY                                */}
          {/* ─────────────────────────────────────────────────────────────────── */}
          <section id="commitment" className="scroll-mt-28">
            <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
              <span className="h-6 w-1.5 rounded-full bg-[#E8890C]" />
              <h2 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-[#0F3D2E] tracking-tight">
                Our Commitment to Privacy
              </h2>
            </div>

            <div className="bg-[#FAF7F2] rounded-2xl p-5 sm:p-7 border border-[#EFE1C6] shadow-xs space-y-3.5 text-sm sm:text-base leading-relaxed text-[#111111]/90 font-normal">
              <p>
                At <strong className="text-[#0F3D2E] font-semibold">VR4Web</strong> (operating under Niftysoft Global), safeguarding your privacy and intellectual property is central to our engineering philosophy. We understand that our clients, website visitors, and enterprise partners entrust us with sensitive business logic, proprietary ideas, and personal information.
              </p>
              <p>
                This Privacy Policy outlines how VR4Web collects, utilizes, communicates, and protects personal and corporate data across our website (<span className="text-[#0F3D2E] font-semibold">vr4web.com</span>), client staging portals, digital communication channels, and contracted project engagements.
              </p>
              <p>
                We adhere strictly to the <strong>Australian Privacy Principles (APPs)</strong> contained within the <em>Privacy Act 1988 (Cth)</em>, ensuring lawful collection, transparent processing, secure storage, and absolute confidentiality across all commercial digital projects.
              </p>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────────────── */}
          {/* SECTION 2: SCOPE OF SERVICES (2-COLUMN RESPONSIVE GRID)             */}
          {/* ─────────────────────────────────────────────────────────────────── */}
          <section id="scope" className="scroll-mt-28">
            <div className="flex items-center gap-2.5 mb-2 sm:mb-3">
              <span className="h-6 w-1.5 rounded-full bg-[#E8890C]" />
              <h2 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-[#0F3D2E] tracking-tight">
                Scope of Services
              </h2>
            </div>
            
            <p className="text-sm sm:text-base text-[#111111]/80 mb-5 leading-relaxed">
              This Privacy Policy applies to personal and corporate data processed in connection with all digital engineering solutions provided by VR4Web, including:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {scopeServices.map((svc, idx) => {
                const IconComponent = svc.icon;
                return (
                  <div
                    key={idx}
                    className="group bg-white rounded-xl p-4 sm:p-4.5 border border-[#EFE1C6] hover:border-[#E8890C] transition-all duration-200 shadow-xs hover:shadow-sm flex items-start gap-3.5"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#FFF8EC] border border-[#F1E3C8] flex items-center justify-center flex-shrink-0 text-[#0F3D2E] group-hover:bg-[#0F3D2E] group-hover:text-white transition-colors duration-200 mt-0.5">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-[15px] font-bold text-[#0F3D2E] mb-1 group-hover:text-[#E8890C] transition-colors duration-200">
                        {svc.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-[#111111]/75 leading-relaxed font-normal">
                        {svc.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────────────── */}
          {/* SECTION 3: COLLECTION AND USE OF PERSONAL INFORMATION               */}
          {/* ─────────────────────────────────────────────────────────────────── */}
          <section id="collection" className="scroll-mt-28">
            <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
              <span className="h-6 w-1.5 rounded-full bg-[#E8890C]" />
              <h2 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-[#0F3D2E] tracking-tight">
                Collection and Use of Personal Information
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#111111]/90 font-normal">
              <p>
                VR4Web will always collect personal information by fair and lawful means, typically with the knowledge or informed consent of the individual concerned. We collect data in the following contexts:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="bg-[#FAF7F2] p-4 sm:p-5 rounded-xl border border-[#EFE1C6]">
                  <h4 className="text-sm sm:text-base font-bold text-[#0F3D2E] flex items-center gap-2 mb-2">
                    <Check className="w-4 h-4 text-[#E8890C]" />
                    Information You Provide Directly
                  </h4>
                  <ul className="text-xs sm:text-[13.5px] space-y-1.5 text-[#111111]/80 list-disc pl-5">
                    <li>Contact details: full name, business email, telephone number.</li>
                    <li>Corporate info: company name, Australian Business Number (ABN/ACN), billing address.</li>
                    <li>Project scope: technical specifications, source code repositories, design mockups, and RFPs.</li>
                    <li>Billing details: invoicing records (payment transactions processed via PCI-DSS compliant providers).</li>
                  </ul>
                </div>

                <div className="bg-[#FAF7F2] p-4 sm:p-5 rounded-xl border border-[#EFE1C6]">
                  <h4 className="text-sm sm:text-base font-bold text-[#0F3D2E] flex items-center gap-2 mb-2">
                    <Check className="w-4 h-4 text-[#E8890C]" />
                    Technical Telemetry (Automated)
                  </h4>
                  <ul className="text-xs sm:text-[13.5px] space-y-1.5 text-[#111111]/80 list-disc pl-5">
                    <li>Device & browser metadata: browser type, version, operating system.</li>
                    <li>Network indicators: anonymized IP addresses, approximate geographic location.</li>
                    <li>Usage statistics: session duration, pages viewed, referral URLs solely to monitor system stability.</li>
                    <li>Security audit logs: authentication attempts on staging environments to protect against cyber threats.</li>
                  </ul>
                </div>
              </div>

              <p className="pt-1">
                Before or at the time of collecting personal data, we identify the purposes for which information is gathered. Personal data will solely be used to fulfill contract deliverables, provide quotes, communicate project milestones, ensure technical SLA guarantees, or comply with relevant legal obligations.
              </p>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────────────── */}
          {/* SECTION 4: REGISTRATION & STAGING ACCESS INFORMATION                */}
          {/* ─────────────────────────────────────────────────────────────────── */}
          <section id="registration" className="scroll-mt-28">
            <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
              <span className="h-6 w-1.5 rounded-full bg-[#E8890C]" />
              <h2 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-[#0F3D2E] tracking-tight">
                Registration & Staging Access Information
              </h2>
            </div>

            <div className="bg-white rounded-2xl p-5 sm:p-7 border border-[#EFE1C6] shadow-xs space-y-3.5 text-sm sm:text-base leading-relaxed text-[#111111]/90 font-normal">
              <p>
                When a business engages with VR4Web for custom software, app development, or cloud engineering, team members may be provided access to designated staging environments, project boards, and code repositories. Information gathered during account setup is strictly used for authentication and authorization verification.
              </p>
              <p>
                VR4Web will protect customer credentials using salted cryptographic hashes and industry-standard tokenization protocols. Access privileges are granted strictly according to the principle of least privilege (PoLP) and revoked immediately upon contract completion.
              </p>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────────────── */}
          {/* SECTION 5: DATA SECURITY & INFRASTRUCTURE PROTECTION                */}
          {/* ─────────────────────────────────────────────────────────────────── */}
          <section id="security" className="scroll-mt-28">
            <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
              <span className="h-6 w-1.5 rounded-full bg-[#E8890C]" />
              <h2 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-[#0F3D2E] tracking-tight">
                Data Security & Infrastructure Protection
              </h2>
            </div>

            <div className="bg-[#FAF7F2] rounded-2xl p-5 sm:p-7 border border-[#EFE1C6] space-y-4 text-sm sm:text-base leading-relaxed text-[#111111]/90">
              <p>
                We implement robust physical, electronic, and administrative safeguards designed to protect personal and corporate information against loss, theft, unauthorized access, disclosure, copying, unauthorized modification, or destruction.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="bg-white p-4 rounded-xl border border-[#EFE1C6] text-center">
                  <Lock className="w-6 h-6 text-[#E8890C] mx-auto mb-2" />
                  <h4 className="font-bold text-[#0F3D2E] text-sm mb-1">TLS 1.3 Encryption</h4>
                  <p className="text-xs text-[#111111]/70">All data in transit is protected with modern end-to-end cryptographic ciphers.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-[#EFE1C6] text-center">
                  <Server className="w-6 h-6 text-[#0F3D2E] mx-auto mb-2" />
                  <h4 className="font-bold text-[#0F3D2E] text-sm mb-1">Encrypted at Rest</h4>
                  <p className="text-xs text-[#111111]/70">Staging databases and cloud backups utilize AES-256 standard encryption.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-[#EFE1C6] text-center">
                  <ShieldCheck className="w-6 h-6 text-[#E8890C] mx-auto mb-2" />
                  <h4 className="font-bold text-[#0F3D2E] text-sm mb-1">Strict NDAs & RBAC</h4>
                  <p className="text-xs text-[#111111]/70">All engineers operate under signed non-disclosure agreements with zero leak tolerance.</p>
                </div>
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────────────── */}
          {/* SECTION 6: CLIENT CONFIDENTIALITY & NO THIRD-PARTY SALE             */}
          {/* ─────────────────────────────────────────────────────────────────── */}
          <section id="confidentiality" className="scroll-mt-28">
            <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
              <span className="h-6 w-1.5 rounded-full bg-[#E8890C]" />
              <h2 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-[#0F3D2E] tracking-tight">
                Client Discretion & Zero Third-Party Monetization
              </h2>
            </div>

            <div className="bg-white rounded-2xl p-5 sm:p-7 border border-[#EFE1C6] shadow-xs space-y-3.5 text-sm sm:text-base leading-relaxed text-[#111111]/90 font-normal">
              <p>
                <strong className="text-[#0F3D2E]">VR4Web will never sell, rent, monetize, or trade your personal or corporate data to any third party under any circumstances.</strong>
              </p>
              <p>
                When you share business requirements, architectural drafts, or proprietary database schemas with our team, that data is treated as strict trade secrets. Any third-party vendors assisting in our operations (such as secure cloud hosting providers or transactional email gateways) are bound by contractual confidentiality agreements requiring identical data protection standards.
              </p>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────────────── */}
          {/* SECTION 7: CUSTOMER SURVEYS & QUALITY FEEDBACK                      */}
          {/* ─────────────────────────────────────────────────────────────────── */}
          <section id="surveys" className="scroll-mt-28">
            <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
              <span className="h-6 w-1.5 rounded-full bg-[#E8890C]" />
              <h2 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-[#0F3D2E] tracking-tight">
                Customer Surveys & Quality Assurance
              </h2>
            </div>

            <div className="space-y-3 text-sm sm:text-base leading-relaxed text-[#111111]/90 font-normal">
              <p>
                From time to time, VR4Web may invite clients to participate in voluntary feedback questionnaires, milestone satisfaction reviews, or project retrospectives. Feedback collected is used internally to refine engineering sprint speeds, code quality, and communication standards.
              </p>
              <p>
                Clients may opt out of qualitative surveys at any time with no impact on their existing service agreements or project delivery.
              </p>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────────────── */}
          {/* SECTION 8: COOKIES, TRACKING & WEB ANALYTICS                        */}
          {/* ─────────────────────────────────────────────────────────────────── */}
          <section id="cookies" className="scroll-mt-28">
            <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
              <span className="h-6 w-1.5 rounded-full bg-[#E8890C]" />
              <h2 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-[#0F3D2E] tracking-tight">
                Cookies & Web Analytics
              </h2>
            </div>

            <div className="bg-[#FAF7F2] rounded-2xl p-5 sm:p-7 border border-[#EFE1C6] space-y-3.5 text-sm sm:text-base leading-relaxed text-[#111111]/90">
              <p>
                Our website utilizes small data files known as cookies to enhance user navigation and monitor aggregate site performance.
              </p>
              <ul className="space-y-2 text-xs sm:text-[14px] text-[#111111]/85 pl-5 list-disc">
                <li><strong>Essential Cookies:</strong> Required to enable standard web page transitions, contact form security, and CSRF token protection.</li>
                <li><strong>Analytical Cookies:</strong> Anonymized metrics via tools like Google Analytics to evaluate bounce rates, page load speeds, and popular services without tracking individual user identities.</li>
              </ul>
              <p className="text-xs sm:text-sm text-[#111111]/70">
                You can configure your browser to reject all cookies or notify you when a cookie is issued. Please note that disabling cookies may affect minor interactive features on the website.
              </p>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────────────── */}
          {/* SECTION 9: DIRECT EMAIL INQUIRIES & RFPS                            */}
          {/* ─────────────────────────────────────────────────────────────────── */}
          <section id="inquiries" className="scroll-mt-28">
            <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
              <span className="h-6 w-1.5 rounded-full bg-[#E8890C]" />
              <h2 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-[#0F3D2E] tracking-tight">
                Direct Inquiries & Project Quotations
              </h2>
            </div>

            <div className="space-y-3 text-sm sm:text-base leading-relaxed text-[#111111]/90 font-normal">
              <p>
                When you submit an inquiry through our quote forms, enquiry portal, or direct emails (<span className="text-[#0F3D2E] font-medium">contact@vr4web.com</span>), the details provided are stored securely and reviewed exclusively by authorized technical directors and solutions architects.
              </p>
              <p>
                We will never add your contact address to unverified promotional newsletter blasts without your explicit consent.
              </p>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────────────── */}
          {/* SECTION 10: AUSTRALIAN PRIVACY PRINCIPLES & EXCEPTIONAL CASES       */}
          {/* ─────────────────────────────────────────────────────────────────── */}
          <section id="compliance" className="scroll-mt-28">
            <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
              <span className="h-6 w-1.5 rounded-full bg-[#E8890C]" />
              <h2 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-[#0F3D2E] tracking-tight">
                Australian Privacy Principles & Exceptional Cases
              </h2>
            </div>

            <div className="bg-white rounded-2xl p-5 sm:p-7 border border-[#EFE1C6] shadow-xs space-y-3.5 text-sm sm:text-base leading-relaxed text-[#111111]/90 font-normal">
              <p>
                VR4Web operates in full harmony with the <strong>13 Australian Privacy Principles (APPs)</strong> set out in the <em>Privacy Act 1988 (Cth)</em>. You have the right to request access to the personal data we hold about you and to ask that any incorrect information be updated or expunged.
              </p>
              <p>
                <strong>Exceptional Legal Disclosures:</strong> We will only disclose personal or commercial records without prior notice if strictly required to do so by an Australian court order, statutory subpoena, or under express instruction from law enforcement authorities where mandatory compliance is compelled by Commonwealth or State legislation.
              </p>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────────────── */}
          {/* NOTICE: POLICY REVISIONS & AMENDMENTS                               */}
          {/* ─────────────────────────────────────────────────────────────────── */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#FFF8EC] border border-[#F1E3C8] flex items-start gap-3 sm:gap-4 text-xs sm:text-sm text-[#0F3D2E]">
            <AlertCircle className="w-5 h-5 text-[#E8890C] flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Policy Revision Notice:</strong> VR4Web reserves the right to amend or update this Privacy Policy periodically to reflect technological enhancements, emerging security standards, or updates to Australian privacy laws. Any material revisions will take effect immediately upon publication on this page with an updated revision date.
            </p>
          </div>

          {/* ─────────────────────────────────────────────────────────────────── */}
          {/* CONTACT & PRIVACY OFFICER CARD                                      */}
          {/* ─────────────────────────────────────────────────────────────────── */}
          <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0F3D2E] via-[#0A291E] to-[#124A37] text-white p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(15,61,46,0.25)] border border-[#E8890C]/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-center md:text-left max-w-xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E8890C] uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">
                <HelpCircle className="w-3.5 h-3.5" />
                Data Protection Officer
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight">
                Have questions about your data?
              </h3>
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                If you wish to query, amend, or remove any personal records held by VR4Web, or have questions regarding our compliance practices, please contact our dedicated Privacy & Security team.
              </p>
              
              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs sm:text-sm text-white/90">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#E8890C]" />
                  <span>privacy@vr4web.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#E8890C]" />
                  <span>Sydney • Melbourne, Australia</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto flex-shrink-0">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#E8890C] hover:bg-[#d07703] text-[#0F3D2E] font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all duration-200 hover:scale-105 active:scale-95 text-center"
              >
                <span>Contact Privacy Team</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/enquiry"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl border border-white/25 transition-all duration-200 text-center"
              >
                <span>Request a Quote</span>
              </Link>
            </div>
          </div>

        </div>

      </main>

    </div>
  );
}

