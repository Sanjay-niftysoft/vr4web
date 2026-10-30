import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import BusinessHoursWidget from "../../components/common/BusinessHoursWidget";
import GoogleMapsWidget from "../../components/common/GoogleMapsWidget";

/* ------------------------------------------------------------------
   VR4Web – Enquiry page  (React + Tailwind, no extra deps)

   SUBMIT BEHAVIOUR
   When the form is valid, WhatsApp opens with the full enquiry
   pre-filled, addressed to WHATSAPP_NUMBER below. The visitor just
   taps Send in WhatsApp. No backend or API key needed.
------------------------------------------------------------------- */

// WhatsApp number: country code + number, digits only (no + or spaces)
const WHATSAPP_NUMBER = "919444116316";

const PRIVACY_URL = "/privacy-policy";
const HERO_IMG = "public/enquiry.png";

const SERVICES = [
  "Website Design & Development",
  "Web Application Development",
  "Mobile App Development",
  "UI/UX Design",
  "Digital Marketing & SEO",
  "E-commerce Development",
  "AI & Digital Transformation",
  "Back Office Support",
  "Other",
];
const BUDGETS = [
  "Below ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000 – ₹5,00,000",
  "₹5,00,000+",
  "Prefer to Discuss",
];
// Australia first, then the rest
const COUNTRY_CODES = [
  ["+61", "AU +61"], ["+91", "IN +91"], ["+1", "US/CA +1"], ["+44", "UK +44"],
  ["+65", "SG +65"], ["+971", "AE +971"], ["+64", "NZ +64"],
];
const STEPS = [
  ["We review", "A specialist reads your brief the same business day."],
  ["We reach out", "Expect a reply within 24 business hours."],
  ["We scope it", "A short call to agree goals, timeline and budget."],
  ["You get a proposal", "A clear plan and quote, no obligation."],
];
const SOCIALS = [
  { name: "LinkedIn", href: "https://www.linkedin.com/", d: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.54h.05c.53-1 1.82-2.04 3.75-2.04 4 0 4.75 2.63 4.75 6.05V21h-4v-4.9c0-1.17-.02-2.67-1.63-2.67-1.63 0-1.88 1.27-1.88 2.58V21h-4V9.75Z" },
  { name: "Instagram", href: "https://www.instagram.com/", d: "M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Zm0 1.8A2.7 2.7 0 0 0 4.8 7.5v9a2.7 2.7 0 0 0 2.7 2.7h9a2.7 2.7 0 0 0 2.7-2.7v-9a2.7 2.7 0 0 0-2.7-2.7h-9ZM12 7.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 1.8a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Zm4.9-2.5a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1Z" },
  { name: "Facebook", href: "https://www.facebook.com/", d: "M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.7V3.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.4H7.7V13h2.7v8h3.1Z" },
  { name: "X", href: "https://x.com/", d: "M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.3L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z" },
  { name: "Google Maps", href: "https://maps.app.goo.gl/TE4BHQyxoyt74fJ66", d: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z", hoverColor: "hover:border-[#EA4335] hover:bg-[#EA4335] hover:text-white" },
];

/* ---------- icons ---------- */
const Icon = ({ children, className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    {children}
  </svg>
);
const MailIcon = () => (<Icon className="h-4 w-4"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></Icon>);
const PhoneIcon = () => (<Icon className="h-4 w-4"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" /></Icon>);
const ClockIcon = () => (<Icon className="h-4 w-4"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icon>);
const PinIcon = () => (<Icon className="h-4 w-4"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></Icon>);
const SendIcon = () => (<Icon><path d="m22 2-11 11" /><path d="M22 2 15 22l-4-9-9-4 20-7Z" /></Icon>);
const CheckIcon = () => (<Icon className="h-4 w-4"><path d="m5 12 5 5L20 7" /></Icon>);

/* ---------- validation ---------- */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[0-9\s\-()]{6,15}$/;

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = "Please enter your full name.";
  if (!v.email.trim()) e.email = "Please enter your work email.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "Enter a valid email, e.g. name@company.com.";
  if (!v.phone.trim()) e.phone = "Please enter your phone number.";
  else if (!PHONE_RE.test(v.phone.trim())) e.phone = "Enter a valid phone number (6–15 digits).";
  if (!v.service) e.service = "Please choose a service.";
  if (!v.message.trim()) e.message = "Please tell us about your project.";
  if (!v.consent) e.consent = "Please accept the privacy policy to continue.";
  return e;
}

/* ---------- WhatsApp message ---------- */
function buildWhatsappUrl(v) {
  const lines = [
    "New Website Enquiry",
    "",
    `Name: ${v.name.trim()}`,
    `Email: ${v.email.trim()}`,
    `Phone: ${v.countryCode} ${v.phone.trim()}`,
  ];
  if (v.company.trim()) lines.push(`Company: ${v.company.trim()}`);
  lines.push(`Service: ${v.service}`);
  if (v.budget) lines.push(`Budget: ${v.budget}`);
  lines.push("", "Message:", v.message.trim());

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}

/* ---------- styling helpers ---------- */
const inputBase =
  "w-full rounded-xl border bg-white px-4 text-[15px] text-[#0F3D2E] placeholder:text-black/60 " +
  "outline-none transition focus:border-[#E8890C] focus:ring-4 focus:ring-[#E8890C]/15";
const inputCls = (err) => `${inputBase} ${err ? "border-[#E8890C]" : "border-[#D4DCE8]"}`;

function Field({ label, required, error, htmlFor, children, className = "" }) {
  return (
    <div className={`min-w-0 ${className}`}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-[#0F3D2E]">
        {label}
        {required && <span className="ml-0.5 text-[#E8890C]" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && <p id={`${htmlFor}-err`} role="alert" className="mt-1.5 text-[13px] text-red-600 font-medium">{error}</p>}
    </div>
  );
}

/* Numbered section heading */
function SectionTitle({ n, title, hint }) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0F3D2E] text-sm font-bold text-white">{n}</span>
      <div>
        <h3 className="text-lg font-bold leading-8 text-[#0F3D2E]">{title}</h3>
        {hint && <p className="text-sm text-black">{hint}</p>}
      </div>
    </div>
  );
}

/* Tappable chip group built on native radios (keyboard + screen-reader friendly).
   Clicking the selected chip again clears it, so optional groups can be unset. */
function ChipGroup({ id, legend, required, options, value, onChange, error }) {
  return (
    <fieldset id={id} tabIndex={-1} className="outline-none" aria-describedby={error ? `${id}-err` : undefined}>
      <legend className="mb-2 text-sm font-semibold text-[#0F3D2E]">
        {legend}
        {required && <span className="ml-0.5 text-[#E8890C]" aria-hidden="true">*</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <label key={opt} className="cursor-pointer">
            <input type="radio" name={id} value={opt} checked={value === opt}
                   onChange={() => onChange(opt)}
                   onClick={() => value === opt && onChange("")}
                   className="peer sr-only" />
            <span className={`inline-block rounded-full border px-4 py-2 text-sm transition
              peer-checked:border-[#E8890C] peer-checked:bg-[#E8890C] peer-checked:font-semibold peer-checked:text-white
              peer-focus-visible:ring-4 peer-focus-visible:ring-[#E8890C]/25
              ${error ? "border-red-400" : "border-[#D4DCE8]"} bg-white text-[#0F3D2E] hover:border-[#E8890C]`}>
              {opt}
            </span>
          </label>
        ))}
      </div>
      {error && <p id={`${id}-err`} role="alert" className="mt-1.5 text-[13px] text-red-600 font-medium">{error}</p>}
    </fieldset>
  );
}

const contactLink = "flex items-center gap-3 rounded-lg px-2 py-2 text-[15px] text-[#0F3D2E] transition hover:text-[#E8890C]";
const contactIcon = "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8890C]/10 text-[#E8890C]";

/* ================================================================== */
export default function EnquiryPage() {
  const empty = {
    name: "", email: "", countryCode: "+61", phone: "", company: "",
    service: "", budget: "", message: "", consent: false, botcheck: "",
  };
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | success
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const bannerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // bring the success message into view
  useEffect(() => {
    if (status === "success") {
      bannerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

  const set = (k) => (e) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setField(k, val);
  };
  const setField = (k, val) => {
    setValues((p) => ({ ...p, [k]: val }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  function onSubmit(e) {
    e.preventDefault();
    if (values.botcheck) return; // honeypot – bots only
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(Object.keys(errs)[0])?.focus();
      return;
    }

    const url = buildWhatsappUrl(values);
    setWhatsappUrl(url);

    // Open directly inside the submit handler so popup blockers don't stop it
    window.open(url, "_blank", "noopener,noreferrer");

    setStatus("success");
    setValues(empty);
  }

  return (
    <main className="min-h-screen bg-white font-sans text-[#0F3D2E] selection:bg-[#E8890C] selection:text-white">
      {/* ---------------- HERO ---------------- */}
      <section className="relative isolate overflow-hidden px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8 border-b border-[#0F3D2E] bg-[rgb(240,231,195)]">
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center justify-center">
          <nav aria-label="Breadcrumb" className="mb-4 inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-medium bg-[#0F3D2E] text-white px-4 py-1.5 rounded-full shadow-sm mx-auto">
            <Link to="/" className="transition-colors hover:text-[#E8890C]">Home</Link>
            <span aria-hidden="true" className="text-white/60">/</span>
            <span className="font-semibold text-white">Enquiry</span>
          </nav>

          <h1 className="text-[clamp(2rem,4.4vw,3.25rem)] font-extrabold leading-tight text-[#0F3D2E] mb-6 text-center">
            Let’s Build Something <span className="text-[#E8890C]">Great Together.</span>
          </h1>

          <ul className="flex flex-wrap items-center justify-center gap-2.5 mx-auto">
            {["Reply within 24 hrs", "No obligation", "Free consultation"].map((t) => (
              <li key={t} className="inline-flex items-center gap-1.5 rounded-full border border-[#0F3D2E]/20 bg-[#0F3D2E] px-4 py-1.5 text-xs sm:text-sm font-medium text-white shadow-sm">
                <span className="text-[#E8890C]"><CheckIcon /></span>{t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- FORM + SIDEBAR ---------------- */}
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-[1fr_360px] lg:items-start lg:px-8 lg:py-14">
        {/* MAIN: sectioned form */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm sm:p-8 lg:p-10">
          <div ref={bannerRef}>
            {status === "success" && (
              <div role="status" className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
                <strong>Almost done!</strong> WhatsApp has opened with your enquiry. Please tap{" "}
                <strong>Send</strong> in WhatsApp to complete it. If it didn’t open,{" "}
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
                  open WhatsApp again
                </a>.
              </div>
            )}
          </div>

          <form onSubmit={onSubmit} noValidate className="space-y-9">
            {/* honeypot */}
            <input type="text" name="botcheck" tabIndex={-1} autoComplete="off"
                   value={values.botcheck} onChange={set("botcheck")}
                   className="hidden" aria-hidden="true" />

            {/* 1 – details */}
            <div>
              <SectionTitle n="1" title="Your details" hint="So we know who to get back to." />
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full Name" required htmlFor="name" error={errors.name}>
                  <input id="name" type="text" autoComplete="name" placeholder="John Smith"
                         value={values.name} onChange={set("name")}
                         aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined}
                         className={`${inputCls(errors.name)} h-12`} />
                </Field>
                <Field label="Work Email Address" required htmlFor="email" error={errors.email}>
                  <input id="email" type="email" autoComplete="email" placeholder="you@company.com"
                         value={values.email} onChange={set("email")}
                         aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined}
                         className={`${inputCls(errors.email)} h-12`} />
                </Field>
                <Field label="Phone Number" required htmlFor="phone" error={errors.phone}>
                  <div className="flex gap-2">
                    <select aria-label="Country code" value={values.countryCode} onChange={set("countryCode")}
                            className={`${inputCls(false).replace("w-full", "")} h-12 w-[110px] shrink-0 px-2`}>
                      {COUNTRY_CODES.map(([c, l]) => <option key={c} value={c}>{l}</option>)}
                    </select>
                    <input id="phone" type="tel" autoComplete="tel-national" placeholder="412 345 678"
                           value={values.phone} onChange={set("phone")}
                           aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-err" : undefined}
                           className={`${inputCls(errors.phone)} h-12 min-w-0 flex-1`} />
                  </div>
                </Field>
                <Field label="Company / Brand" htmlFor="company">
                  <input id="company" type="text" autoComplete="organization" placeholder="Your company name"
                         value={values.company} onChange={set("company")} className={`${inputCls(false)} h-12`} />
                </Field>
              </div>
            </div>

            <hr className="border-[#E2E8F0]" />

            {/* 2 – project */}
            <div>
              <SectionTitle n="2" title="About your project" hint="Pick what fits best. Tap again to deselect." />
              <div className="space-y-6">
                <ChipGroup id="service" legend="Service interested in" required options={SERVICES}
                           value={values.service} onChange={(v) => setField("service", v)} error={errors.service} />
                <ChipGroup id="budget" legend="Project budget (optional)" options={BUDGETS}
                           value={values.budget} onChange={(v) => setField("budget", v)} />
              </div>
            </div>

            <hr className="border-[#E2E8F0]" />

            {/* 3 – message */}
            <div>
              <SectionTitle n="3" title="Tell us more" hint="Goals, timelines, anything that helps us prepare." />
              <Field label="Message / Project Requirements" required htmlFor="message" error={errors.message}>
                <textarea id="message" rows={6}
                          placeholder="Please tell us about your project goals, timelines, and requirements…"
                          value={values.message} onChange={set("message")}
                          aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined}
                          className={`${inputCls(errors.message)} min-h-[140px] resize-y py-3`} />
              </Field>
            </div>

            {/* consent + submit */}
            <div className="rounded-xl border border-[#D4DCE8] bg-white p-4 sm:p-5">
              <label className="flex cursor-pointer items-start gap-3 text-sm text-black">
                <input id="consent" type="checkbox" checked={values.consent} onChange={set("consent")}
                       aria-invalid={!!errors.consent}
                       className="mt-0.5 h-5 w-5 shrink-0 rounded border-[#D4DCE8] accent-[#E8890C]" />
                <span>
                  I agree to the{" "}
                  <Link to={PRIVACY_URL} className="font-semibold text-[#0F3D2E] underline transition hover:text-[#E8890C]">privacy policy</Link>{" "}
                  and consent to VR4Web contacting me regarding my enquiry.
                </span>
              </label>
              {errors.consent && <p role="alert" className="mt-1.5 text-[13px] font-medium text-red-600">{errors.consent}</p>}

              <button type="submit"
                      className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#E8890C] to-[#d67d0a] px-8 font-bold text-white shadow-lg shadow-[#E8890C]/25 transition hover:from-[#d67d0a] hover:to-[#b86906] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#E8890C]/30 sm:w-auto">
                Send Your Enquiry <SendIcon />
              </button>
            </div>
          </form>
        </div>

        {/* SIDEBAR */}
        <aside className="space-y-6 lg:sticky lg:top-28">
          {/* What happens next */}
          <div className="rounded-2xl bg-gradient-to-br from-[#0A291E] via-[#0F3D2E] to-[#124A37] p-6 text-white shadow-lg shadow-[#0F3D2E]/20 sm:p-7">
            <h2 className="text-lg font-bold">What happens next?</h2>
            <ol className="mt-5">
              {STEPS.map(([title, text], i) => (
                <li key={title} className="relative flex gap-4 pb-6 last:pb-0">
                  {i < STEPS.length - 1 && <span className="absolute left-[15px] top-8 h-[calc(100%-2rem)] w-px bg-white/20" aria-hidden="true" />}
                  <span className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8890C] text-sm font-bold text-white shadow-md shadow-[#E8890C]/30">{i + 1}</span>
                  <div>
                    <p className="font-semibold">{title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-white">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Business Hours Widget */}
          <div className="w-full">
            <BusinessHoursWidget />
          </div>

          {/* Quick contact */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-bold text-[#0F3D2E]">Prefer to talk?</h2>
            <div className="mt-3 space-y-2">
              <a className={contactLink} href="mailto:info@niftysoft.com"><span className={contactIcon}><MailIcon /></span><span className="min-w-0 break-words">info@niftysoft.com</span></a>
              <a className={contactLink} href="tel:+919444116316"><span className={contactIcon}><PhoneIcon /></span><span>+91 94441 16316 <span className="text-xs text-slate-500 font-normal">(India)</span></span></a>
              <a className={contactLink} href="tel:+61489986622"><span className={contactIcon}><PhoneIcon /></span><span>+61 489 986 622 <span className="text-xs text-slate-500 font-normal">(Australia)</span></span></a>
              <div className="flex items-center gap-3 px-2 py-2 text-[15px] text-[#0F3D2E]"><span className={contactIcon}><ClockIcon /></span><span>Mon – Sat, 9:00 AM – 7:00 PM IST</span></div>
              <div className="flex items-start gap-3 px-2 py-2 text-[15px] text-[#0F3D2E]">
                <span className={`${contactIcon} mt-0.5 shrink-0`}><PinIcon /></span>
                <span>Unit No.23 Block I, SIDCO Electronic Complex, Guindy, Chennai – 600 032</span>
              </div>
            </div>
            <div className="mt-4 flex gap-2 border-t border-[#E2E8F0] pt-4">
              {SOCIALS.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name}
                   className={`flex h-9 w-9 items-center justify-center rounded-full border border-[#D4DCE8] text-[#0F3D2E] transition ${
                     s.hoverColor || "hover:border-[#E8890C] hover:bg-[#E8890C] hover:text-white"
                   }`}>
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true"><path d={s.d} /></svg>
                </a>
              ))}
            </div>
          </div>
        </aside>
      </section>

      {/* ───────────── MAP SECTION ───────────── */}
      <section id="map" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#E8890C]/20 border border-[#E8890C] text-[#0F3D2E] text-xs sm:text-sm font-bold mb-3">
            Find Us
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-[#0F3D2E]">
            Visit Our <span className="text-[#E8890C]">Development Center</span>
          </h2>
          <p className="text-black text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Drop by our Guindy office or reach out to discuss your next project in person or online.
          </p>
        </div>

        <div className="rounded-[10px] shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25)] overflow-hidden bg-white">
          <GoogleMapsWidget />
        </div>
      </section>
    </main>
  );
}