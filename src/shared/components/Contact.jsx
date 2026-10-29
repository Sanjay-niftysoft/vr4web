import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Mail, Phone, Clock, ArrowRight, ChevronRight, Home, CheckCircle2,
  Send, AlertCircle, RotateCcw,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import BusinessHoursWidget from '../../components/common/BusinessHoursWidget';
import GoogleMapsWidget from '../../components/common/GoogleMapsWidget';

/*  Palette: Yellow #E8890C · Dark Green #0F3D2E  */

/* Hero background image  →  file lives at public/contact.png */
const HERO_BG = '/contact.png';

// WhatsApp number: country code + number, digits only (no + or spaces)
const WHATSAPP_NUMBER = '919444116316';

// Australia first, then the rest (text labels: flag emojis don't render on Windows Chrome)
const COUNTRY_CODES = [
  { code: '+61', label: 'AU +61' },
  { code: '+91', label: 'IN +91' },
  { code: '+1', label: 'US +1' },
  { code: '+44', label: 'UK +44' },
  { code: '+64', label: 'NZ +64' },
  { code: '+65', label: 'SG +65' },
];

// ─── Clean Custom Social SVGs ───
const GoogleMapsIcon = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4" {...props}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
  </svg>
);

const LinkedInIcon = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4" {...props}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m1.4 9.74V9.97H5.06v8.53h2.8z" />
  </svg>
);
const InstagramIcon = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4" {...props}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);
const FacebookIcon = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4" {...props}>
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
  </svg>
);
const TwitterIcon = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// ─── Shared form helpers (keeps every input styled identically) ───
const inputClass = (hasError) =>
  `w-full px-4 py-3 rounded-[10px] border text-sm text-black placeholder:text-black/60 transition-all duration-200 outline-none font-medium ${
    hasError
      ? 'border-red-500 bg-red-50/40 focus:border-red-600 focus:ring-2 focus:ring-red-100'
      : 'border-slate-300 bg-white focus:border-[#E8890C] focus:ring-2 focus:ring-[#E8890C]/15'
  }`;

const labelClass = 'block text-xs sm:text-sm font-bold text-[#0F3D2E] mb-1.5';
const Req = () => <span className="text-red-600">*</span>;

const FieldError = ({ msg, className = '' }) =>
  msg ? (
    <p role="alert" className={`text-xs text-red-600 mt-1 flex items-center gap-1 font-bold ${className}`}>
      <AlertCircle className="w-3 h-3" />
      {msg}
    </p>
  ) : null;

const EMPTY_FORM = {
  fullName: '',
  email: '',
  phoneCode: '+61', // Australia default
  phone: '',
  subject: '',
  message: '',
  consent: false,
};

const CONTACT_ITEMS = [
  {
    icon: MapPin,
    label: 'Office Address',
    content: (
      <>
        <p className="text-white text-sm font-medium leading-snug">
          Unit No.23 Block I, SIDCO Electronic Complex, Guindy, Chennai – 600 032
        </p>
        <span className="text-xs text-white mt-0.5 block">Development Center (India)</span>
      </>
    ),
  },
  {
    icon: Mail,
    label: 'Email Us',
    content: (
      <a
        href="mailto:info@niftysoft.com"
        className="text-white hover:text-[#E8890C] text-sm font-medium transition-colors break-words"
      >
        info@niftysoft.com
      </a>
    ),
  },
  {
    icon: Phone,
    label: 'Call Us',
    content: (
      <div className="flex flex-col gap-1">
        <a
          href="tel:+919444116316"
          className="text-white hover:text-[#E8890C] text-sm font-medium transition-colors"
        >
          +91 94441 16316 <span className="text-xs text-white/80">(India)</span>
        </a>
        <a
          href="tel:+61489986622"
          className="text-white hover:text-[#E8890C] text-sm font-medium transition-colors"
        >
          +61 489 986 622 <span className="text-xs text-white/80">(Australia)</span>
        </a>
      </div>
    ),
  },
  {
    icon: Clock,
    label: 'Business Hours',
    content: (
      <>
        <p className="text-white text-sm font-medium">Mon – Sat: 9:00 AM – 7:00 PM IST</p>
        <span className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Priority Support 24/7 Available
        </span>
      </>
    ),
  },
];

const SOCIALS = [
  { icon: LinkedInIcon, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: InstagramIcon, label: 'Instagram', href: 'https://instagram.com' },
  { icon: FacebookIcon, label: 'Facebook', href: 'https://facebook.com' },
  { icon: TwitterIcon, label: 'Twitter', href: 'https://twitter.com' },
  { icon: GoogleMapsIcon, label: 'Google Maps', href: 'https://maps.app.goo.gl/TE4BHQyxoyt74fJ66', hoverColor: 'hover:border-[#EA4335] hover:bg-[#EA4335] hover:text-white' },
];

export default function Contact() {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const validateForm = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required.';

    if (!formData.email.trim()) errs.email = 'Work email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = 'Please enter a valid work email address.';

    if (!formData.phone.trim()) errs.phone = 'Phone number is required.';
    else if (!/^[0-9\s\-()+]{6,20}$/.test(formData.phone))
      errs.phone = 'Please enter a valid phone number.';

    if (!formData.subject.trim()) errs.subject = 'Please enter a subject.';
    else if (formData.subject.trim().length < 3) errs.subject = 'Subject must be at least 3 characters.';

    if (!formData.message.trim()) errs.message = 'Please provide a brief description of your requirements.';
    else if (formData.message.trim().length < 10) errs.message = 'Message must be at least 10 characters.';

    if (!formData.consent) errs.consent = 'You must agree to the privacy policy to proceed.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const buildWhatsappUrl = () => {
    const text =
`New Website Enquiry

Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phoneCode} ${formData.phone}
Subject: ${formData.subject}

Message:
${formData.message}`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const url = buildWhatsappUrl();
    setWhatsappUrl(url);

    // Open directly inside the click handler so popup blockers don't stop it
    window.open(url, '_blank', 'noopener,noreferrer');

    setIsSubmitted(true);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0F3D2E', '#E8890C', '#124A37', '#ffffff'],
      });
    } catch (err) {
      /* ignore confetti errors */
    }
  };

  const handleReset = () => {
    setFormData(EMPTY_FORM);
    setErrors({});
    setWhatsappUrl('');
    setIsSubmitted(false);
  };

  return (
    <div className="w-full min-h-screen bg-white font-sans text-[#0F3D2E] selection:bg-[#E8890C] selection:text-white">
      {/* ───────────── 1. HERO ───────────── */}
      <section
        className="relative w-full overflow-hidden px-4 md:px-8 pt-32 pb-12 md:pt-36 md:pb-14 bg-[rgb(240,231,195)] border-b border-slate-200"
      >
        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 leading-tight text-[#0F3D2E]"
          >
            Contact <span className="text-[#E8890C]">Us</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium bg-[#0F3D2E] text-white px-4 py-1.5 rounded-full shadow-md"
          >
            <Link to="/" className="flex items-center gap-1 hover:text-[#E8890C] transition-colors">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/60" />
            <span className="font-semibold">Contact Us</span>
          </motion.div>
        </div>
      </section>

      {/* ───────────── 2. CONTACT FORM ───────────── */}
      <section
        id="contact-form"
        className="relative overflow-hidden bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#E8890C]/20 border border-[#E8890C] text-[#0F3D2E] text-xs sm:text-sm font-bold mb-3 sm:mb-4">
              Let’s Connect
            </span>
            <h2 className="text-2xl sm:text-2xl md:text-4xl lg:text-3xl font-extrabold tracking-tight mb-3">
              <span className="text-[#0F3D2E]">Share your project vision to,</span>{' '}
              <span className="text-[#E8890C]">get a custom roadmap and estimate.</span>
            </h2>

          </div>

          <div className="relative">
            {/* GREEN INFO PANEL */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 overflow-hidden rounded-[10px] bg-gradient-to-br from-[#0A291E] via-[#0F3D2E] to-[#124A37] p-8 sm:p-10 text-white shadow-[0_30px_60px_-20px_rgba(15,61,46,0.6)] mb-6 lg:mb-0 lg:absolute lg:left-0 lg:top-10 lg:bottom-10 lg:w-[38%] lg:flex lg:flex-col lg:justify-between"
            >
              <div className="relative">
                <h3 className="text-2xl sm:text-[28px] font-extrabold tracking-tight">Contact Us</h3>
                <span aria-hidden className="mt-2 block h-[3px] w-14 rounded-full bg-[#E8890C]" />
                <p className="mt-4 text-sm text-white leading-relaxed">
                  A website, a web app or a complete tech solution — we’re ready to help.
                </p>

                <ul className="mt-7 space-y-5">
                  {CONTACT_ITEMS.map(({ icon: Icon, label, content }) => (
                    <li key={label} className="flex items-start gap-4">
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[10px] bg-[#E8890C] text-[#0F3D2E] shadow-md">
                        <Icon className="h-[18px] w-[18px]" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-[#E8890C] mb-0.5">
                          {label}
                        </span>
                        {content}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative mt-8 flex items-center gap-3">
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`flex h-9 w-9 items-center justify-center rounded-[10px] border border-white/20 bg-white/10 text-white transition-all duration-300 hover:scale-110 ${
                      social.hoverColor || 'hover:border-[#E8890C] hover:bg-[#E8890C] hover:text-[#0F3D2E]'
                    }`}
                  >
                    <social.icon />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* WHITE FORM CARD */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[10px] shadow-[0_30px_60px_-24px_rgba(15,23,42,0.28)] lg:ml-14"
            >
              <div className="rounded-[10px] bg-white p-7 sm:p-10 lg:py-14 lg:pr-12 lg:pl-[calc(38%_-_0.5rem)] min-h-[560px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="py-10 text-center flex flex-col items-center justify-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5 shadow-inner">
                        <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F3D2E] mb-2 tracking-tight">
                        Thank You, {formData.fullName}!
                      </h3>

                      <p className="text-black text-base max-w-md mx-auto mb-6 leading-relaxed">
                        WhatsApp has opened with your enquiry. Please tap{' '}
                        <span className="font-bold">Send</span> in WhatsApp to complete it, and our team will
                        reply shortly.
                      </p>

                      <div className="bg-white border border-slate-300 rounded-[10px] p-4 max-w-sm w-full text-left text-xs text-black mb-6 space-y-2">
                        <div className="flex justify-between gap-4 border-b border-slate-300 pb-1.5">
                          <span className="font-bold">Subject:</span>
                          <span className="font-semibold text-right break-words min-w-0">{formData.subject}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="font-bold">Work Email:</span>
                          <span className="font-semibold text-right break-words min-w-0">{formData.email}</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        {/* Fallback if WhatsApp didn't open (popup blocked) */}
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] bg-[#25D366] hover:bg-[#1ebe5a] text-white text-sm font-semibold transition-all duration-200 shadow-md"
                        >
                          <Send className="w-4 h-4" />
                          <span>Open WhatsApp Again</span>
                        </a>

                        <button
                          type="button"
                          onClick={handleReset}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] bg-[#0F3D2E] hover:bg-[#124A37] text-white text-sm font-semibold transition-all duration-200 shadow-md cursor-pointer"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>Send Another Enquiry</span>
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="mb-7">
                        <h3 className="text-2xl sm:text-[28px] font-extrabold text-[#0F3D2E] tracking-tight">
                          Get in <span className="text-[#E8890C]">Touch</span>
                        </h3>
                        <span aria-hidden className="mt-2 block h-[3px] w-14 rounded-full bg-[#E8890C]" />
                        <p className="mt-3 text-black text-sm sm:text-base leading-relaxed">
                          Share a few details about your project and we’ll get back to you soon.
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} noValidate className="space-y-5">
                        {/* Row 1: Full Name & Work Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="fullName" className={labelClass}>Full Name <Req /></label>
                            <input
                              id="fullName" name="fullName" type="text" autoComplete="name"
                              value={formData.fullName} onChange={handleChange}
                              placeholder="e.g. John Doe"
                              aria-invalid={!!errors.fullName}
                              className={inputClass(errors.fullName)}
                            />
                            <FieldError msg={errors.fullName} />
                          </div>

                          <div>
                            <label htmlFor="email" className={labelClass}>Work Email Address <Req /></label>
                            <input
                              id="email" name="email" type="email" autoComplete="email"
                              value={formData.email} onChange={handleChange}
                              placeholder="john@company.com"
                              aria-invalid={!!errors.email}
                              className={inputClass(errors.email)}
                            />
                            <FieldError msg={errors.email} />
                          </div>
                        </div>

                        {/* Row 2: Phone Number & Subject */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="phone" className={labelClass}>Phone Number <Req /></label>
                            <div className="flex rounded-[10px] overflow-hidden">
                              <select
                                name="phoneCode" aria-label="Country code"
                                value={formData.phoneCode} onChange={handleChange}
                                className="bg-slate-100 border border-r-0 border-slate-300 text-xs sm:text-sm font-bold text-[#0F3D2E] px-2.5 py-3 outline-none focus:bg-slate-200 transition-colors"
                              >
                                {COUNTRY_CODES.map((c) => (
                                  <option key={c.code} value={c.code}>{c.label}</option>
                                ))}
                              </select>
                              <input
                                id="phone" name="phone" type="tel" autoComplete="tel-national"
                                value={formData.phone} onChange={handleChange}
                                placeholder="412 345 678"
                                aria-invalid={!!errors.phone}
                                className={`${inputClass(errors.phone)} flex-1 min-w-0 !rounded-l-none`}
                              />
                            </div>
                            <FieldError msg={errors.phone} />
                          </div>

                          <div>
                            <label htmlFor="subject" className={labelClass}>Subject <Req /></label>
                            <input
                              id="subject" name="subject" type="text"
                              value={formData.subject} onChange={handleChange}
                              placeholder="e.g. New website for my business"
                              maxLength={120}
                              aria-invalid={!!errors.subject}
                              className={inputClass(errors.subject)}
                            />
                            <FieldError msg={errors.subject} />
                          </div>
                        </div>

                        {/* Row 3: Message */}
                        <div>
                          <label htmlFor="message" className={labelClass}>Message / Project Requirements <Req /></label>
                          <textarea
                            id="message" name="message" rows={5}
                            value={formData.message} onChange={handleChange}
                            placeholder="Please tell us about your project goals, timelines, and requirements..."
                            aria-invalid={!!errors.message}
                            className={`${inputClass(errors.message)} resize-y`}
                          />
                          <FieldError msg={errors.message} />
                        </div>

                        {/* Consent */}
                        <div>
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input
                              type="checkbox" name="consent"
                              checked={formData.consent} onChange={handleChange}
                              className="mt-1 w-4 h-4 rounded border-slate-300 accent-[#E8890C]"
                            />
                            <span className="text-xs sm:text-sm text-black leading-snug">
                              I agree to the{' '}
                              <a
                                href="https://niftysoft.com/privacypolicy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#0F3D2E] font-bold underline hover:text-[#E8890C] transition-colors"
                              >
                                privacy policy
                              </a>{' '}
                              and consent to VR4Web contacting me regarding my enquiry.{' '}
                              <span className="text-[#E8890C] font-bold">*</span>
                            </span>
                          </label>
                          <FieldError msg={errors.consent} className="pl-7" />
                        </div>

                        {/* Submit */}
                        <div className="pt-1">
                          <button
                            type="submit"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-3.5 rounded-[10px] bg-gradient-to-b from-[#E8890C] to-[#d67d0a] hover:from-[#d67d0a] hover:to-[#b86906] text-white font-bold text-sm sm:text-base shadow-[0_12px_26px_-8px_rgba(232,137,12,0.7)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                          >
                            <span>Send Enquiry</span>
                            <Send className="w-4 h-4" />
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────────── 3. MAP & BUSINESS HOURS ───────────── */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-block px-4 py-1 rounded-full bg-[#E8890C]/20 border border-[#E8890C] text-[#0F3D2E] text-sm font-bold mb-4">
            Find Us & Business Hours
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            <span className="text-[#0F3D2E]">Visit Our</span>{' '}
            <span className="text-[#E8890C]">Development Center</span>
          </h2>
          <p className="text-black text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Drop by our Guindy office or reach out to discuss your next project in person or online.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 w-full">
            <BusinessHoursWidget />
          </div>
          <div className="lg:col-span-7 rounded-[10px] shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25)] overflow-hidden bg-white">
            <GoogleMapsWidget />
          </div>
        </div>
      </section>
    </div>
  );
}