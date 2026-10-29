import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Mail, Phone, Clock, ArrowRight, ChevronRight, Home, CheckCircle2,
  Send, ShieldCheck, Zap, Users, MessageSquare, Building2, AlertCircle, RotateCcw,
} from 'lucide-react';
import confetti from 'canvas-confetti';

// ─── Theme Colors ───
const RED = '#D7192D';
const NAVY = '#172B4D';
const DARK_NAVY = '#0B1428';

// ─── Clean Custom Social SVGs ───
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
  `w-full px-4 py-3 rounded-xl border text-sm text-black placeholder:text-black/40 bg-slate-50/80 transition-all duration-200 outline-none font-medium ${
    hasError
      ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-100 bg-red-50/20'
      : 'border-slate-300 focus:border-[#D7192D] focus:ring-2 focus:ring-[#D7192D]/15 focus:bg-white'
  }`;

const labelClass = 'block text-xs sm:text-sm font-bold text-black mb-1.5';
const Req = () => <span className="text-[#D7192D]">*</span>;

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
  phoneCode: '+91',
  phone: '',
  subject: '',
  message: '',
  consent: false,
};

export default function Contact() {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API submission (replace with your real endpoint call)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: [RED, NAVY, DARK_NAVY, '#ffffff'],
        });
      } catch (err) {
        /* ignore confetti errors */
      }
    }, 1200);
  };

  const handleReset = () => {
    setFormData(EMPTY_FORM);
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 font-sans text-[#111111] selection:bg-[#D7192D] selection:text-white">
      {/* ───────────── 1. HERO ───────────── */}
      <section className="relative w-full bg-[#0B1428] text-white pt-24 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-[#172B4D]/60">
        <div className="absolute -top-24 right-1/4 w-96 h-96 bg-[#D7192D]/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-10 w-80 h-80 bg-[#172B4D]/50 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-white bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/20 mb-6"
          >
            <Link to="/" className="flex items-center gap-1 text-white hover:text-[#D7192D] transition-colors">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/80" />
            <span className="text-[#D7192D] font-bold">Contact Us</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-5 leading-tight text-white"
          >
            Let’s Build Something <span className="text-[#D7192D]">Great Together.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-white max-w-2xl font-normal leading-relaxed"
          >
            Have a project in mind or need expert digital solutions? Tell us what you’re looking for,
            and our team will help you take the next step.
          </motion.p>
        </div>
      </section>

      {/* ───────────── 2. TWO-COLUMN CONTACT ───────────── */}
      <section id="contact-form" className="relative z-20 -mt-8 sm:-mt-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16 sm:pb-24">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* LEFT: info panel */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#0B1428] via-[#0E1A33] to-[#172B4D] text-white p-8 sm:p-10 lg:p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D7192D]/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-60 h-60 bg-[#172B4D] rounded-full blur-[60px] pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D7192D]/20 border border-[#D7192D]/40 text-[#D7192D] text-xs font-bold uppercase tracking-wider mb-4">
                <span>GET IN TOUCH</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 text-white leading-snug">
                Let’s Talk About Your Next Project
              </h2>

              <p className="text-white text-sm sm:text-base leading-relaxed mb-8">
                Whether you need a website, a web application, a digital transformation, or a complete
                technology solution, we’re ready to help.
              </p>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4 pb-5 border-b border-white/15 group">
                  <div className="w-11 h-11 rounded-full bg-[#D7192D] text-white flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-200">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold uppercase tracking-wider text-white block mb-0.5">OFFICE ADDRESS</span>
                    <p className="text-white text-sm sm:text-base font-semibold leading-snug">
                      Unit No.23 Block I, SIDCO Electronic Complex, Guindy, Chennai – 600 032
                    </p>
                    <span className="text-xs text-white/90 mt-0.5 block font-normal">Development Center (India)</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 pb-5 border-b border-white/15 group">
                  <div className="w-11 h-11 rounded-full bg-[#D7192D] text-white flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-200">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold uppercase tracking-wider text-white block mb-0.5">EMAIL US</span>
                    <a href="mailto:info@niftysoft.com" className="text-white hover:text-[#D7192D] text-sm sm:text-base font-semibold transition-colors block break-words">
                      info@niftysoft.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 pb-5 border-b border-white/15 group">
                  <div className="w-11 h-11 rounded-full bg-[#D7192D] text-white flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-200">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold uppercase tracking-wider text-white block mb-0.5">CALL US</span>
                    <a href="tel:+919444116316" className="text-white hover:text-[#D7192D] text-sm sm:text-base font-semibold transition-colors block">
                      +91 94441 16316 <span className="text-xs text-white/80 font-normal">(Direct Line)</span>
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-full bg-[#D7192D] text-white flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-200">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold uppercase tracking-wider text-white block mb-0.5">BUSINESS HOURS</span>
                    <p className="text-white text-sm sm:text-base font-semibold">Mon – Fri: 9:00 AM – 6:00 PM IST</p>
                    <span className="text-xs text-emerald-400 mt-0.5 inline-flex items-center gap-1 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Priority Support 24/7 Available
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-8 mt-8 border-t border-white/20">
              <span className="text-xs font-bold uppercase tracking-wider text-white block mb-3">Connect With Us</span>
              <div className="flex items-center gap-3">
                {[
                  { icon: LinkedInIcon, label: 'LinkedIn', href: 'https://linkedin.com' },
                  { icon: InstagramIcon, label: 'Instagram', href: 'https://instagram.com' },
                  { icon: FacebookIcon, label: 'Facebook', href: 'https://facebook.com' },
                  { icon: TwitterIcon, label: 'Twitter', href: 'https://twitter.com' },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D7192D] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm border border-white/15 hover:border-[#D7192D]"
                  >
                    <social.icon />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="py-12 px-4 sm:px-8 text-center flex flex-col items-center justify-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5 shadow-inner">
                    <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111111] mb-2 tracking-tight">
                    Thank You, {formData.fullName}!
                  </h3>

                  <p className="text-black text-base max-w-md mx-auto mb-6 leading-relaxed">
                    Your enquiry has been received successfully. A senior solutions consultant from VR4Web
                    will review your requirements and reach out to you within 24 business hours.
                  </p>

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-sm w-full text-left text-xs text-black mb-8 space-y-2">
                    <div className="flex justify-between gap-4 border-b border-slate-200/80 pb-1.5">
                      <span className="font-bold text-black">Subject:</span>
                      <span className="text-black font-semibold text-right break-words min-w-0">{formData.subject}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="font-bold text-black">Work Email:</span>
                      <span className="text-black font-semibold text-right break-words min-w-0">{formData.email}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#172B4D] hover:bg-[#0B1428] text-white text-sm font-semibold transition-all duration-200 shadow-md cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Send Another Enquiry</span>
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <div className="mb-8">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight mb-2">Send Us an Enquiry</h3>
                    <p className="text-black text-sm sm:text-base leading-relaxed font-normal">
                      Share a few details about your project, and our team will get back to you as soon as possible.
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
                        <div className="flex rounded-xl overflow-hidden">
                          <select
                            name="phoneCode" aria-label="Country code"
                            value={formData.phoneCode} onChange={handleChange}
                            className="bg-slate-100 border border-r-0 border-slate-300 text-xs sm:text-sm font-bold text-black px-2.5 py-3 outline-none focus:bg-slate-200 transition-colors"
                          >
                            <option value="+91">🇮🇳 +91</option>
                            <option value="+61">🇦🇺 +61</option>
                            <option value="+1">🇺🇸 +1</option>
                            <option value="+44">🇬🇧 +44</option>
                            <option value="+64">🇳🇿 +64</option>
                            <option value="+65">🇸🇬 +65</option>
                          </select>
                          <input
                            id="phone" name="phone" type="tel" autoComplete="tel-national"
                            value={formData.phone} onChange={handleChange}
                            placeholder="94441 16316"
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
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox" name="consent"
                          checked={formData.consent} onChange={handleChange}
                          className="mt-1 w-4 h-4 rounded border-slate-300 text-[#D7192D] focus:ring-[#D7192D] accent-[#D7192D]"
                        />
                        <span className="text-xs sm:text-sm text-black leading-snug font-normal">
                          I agree to the{' '}
                          <a
                            href="https://niftysoft.com/privacypolicy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-black font-bold underline hover:text-[#D7192D] transition-colors"
                          >
                            privacy policy
                          </a>{' '}
                          and consent to VR4Web contacting me regarding my enquiry. <span className="text-[#D7192D] font-bold">*</span>
                        </span>
                      </label>
                      <FieldError msg={errors.consent} className="pl-7" />
                    </div>

                    {/* Submit */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#D7192D] hover:bg-[#172B4D] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#D7192D]/25 hover:shadow-xl hover:shadow-[#172B4D]/25 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-60 disabled:pointer-events-none"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Sending Your Enquiry...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Your Enquiry</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ───────────── 3. TRUST STRIP ───────────── */}
      <section className="pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Zap, title: 'Quick Response', desc: 'Guaranteed response within 24 business hours.' },
            { icon: ShieldCheck, title: 'Client-Focused Solutions', desc: 'Tailored architectures built around your goals.' },
            { icon: Users, title: 'Experienced Dev Team', desc: 'Senior full-stack engineers and UX specialists.' },
            { icon: MessageSquare, title: 'Reliable Communication', desc: 'Transparent milestones and regular sprint reviews.' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-[#D7192D]/40 transition-all duration-300 flex items-start gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#D7192D]/10 text-[#D7192D] flex items-center justify-center flex-shrink-0 group-hover:bg-[#D7192D] group-hover:text-white transition-colors duration-300">
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-black mb-1 tracking-tight">{item.title}</h4>
                <p className="text-xs sm:text-sm text-black leading-relaxed font-normal">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────── 4. MAP ───────────── */}
      <section className="pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D7192D]/10 border border-[#D7192D]/25 text-[#D7192D] text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5 text-[#D7192D]" />
            <span>FIND US</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight mb-3">
            Our Development Center & Office Location
          </h2>
          <p className="text-black text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-normal">
            We’d love to hear from you. Reach out to our engineering team to discuss your next project in person or virtually.
          </p>
        </div>

        <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100 h-80 sm:h-96 md:h-[420px]">
          <iframe
            title="VR4Web Development Center Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.3752538965934!2d80.20387557584483!3d13.01174621401362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52670e30d66c5d%3A0xe543db487f58b760!2sSIDCO%20Industrial%20Estate%2C%20Guindy%2C%20Chennai%2C%20Tamil%20Nadu%20600032!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full grayscale-[25%] contrast-[105%]"
          />

          <div className="absolute bottom-5 left-5 right-5 sm:right-auto sm:max-w-sm bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-slate-200/90 shadow-lg flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#D7192D] text-white flex items-center justify-center flex-shrink-0 shadow-md">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h5 className="text-sm font-bold text-black mb-0.5">Development Center (India)</h5>
              <p className="text-xs text-black leading-snug font-normal">Unit No.23 Block I, SIDCO Electronic Complex, Guindy, Chennai – 600 032</p>
              <a
                href="https://maps.google.com/?q=SIDCO+Electronic+Complex+Guindy+Chennai+600032"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#D7192D] hover:text-[#172B4D] transition-colors mt-2"
              >
                <span>Open in Google Maps</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}