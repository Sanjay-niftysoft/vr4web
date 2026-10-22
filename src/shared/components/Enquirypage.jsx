import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

/* ------------------------------------------------------------------
   VR4Web – Enquiry page  (React + Tailwind, no extra deps)

   LAYOUT (intentionally different from the Contact page):
   - Light, left-aligned hero  (Contact page = dark, centred hero)
   - Wide, sectioned single-column form with numbered steps
   - Service + budget chosen as tappable chips instead of dropdowns
   - Sticky right sidebar: "What happens next" timeline + quick contact
     (Contact page = navy info panel on the LEFT of one big card)

   WHERE THE FORM IS SENT
   A) Web3Forms (no backend):  VITE_WEB3FORMS_KEY=your_key
   B) Your own endpoint:       VITE_ENQUIRY_ENDPOINT=https://your-api.com/enquiry
   (CRA users: use process.env.REACT_APP_X instead of import.meta.env.X)
------------------------------------------------------------------- */
const ENDPOINT =
  import.meta.env.VITE_ENQUIRY_ENDPOINT || "https://api.web3forms.com/submit";
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || "";
const PRIVACY_URL = "/privacy-policy";
const HERO_IMG = "/banner/5.png";

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
const COUNTRY_CODES = [
  ["+91", "IN +91"], ["+61", "AU +61"], ["+1", "US/CA +1"], ["+44", "UK +44"],
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

/* ---------- styling helpers ---------- */
const inputBase =
  "w-full rounded-xl border bg-white px-4 text-[15px] text-[#0B1730] placeholder:text-black/60 " +
  "outline-none transition focus:border-[#174F91] focus:ring-4 focus:ring-[#174F91]/15";
const inputCls = (err) => `${inputBase} ${err ? "border-[#E3182D]" : "border-[#D4DCE8]"}`;

function Field({ label, required, error, htmlFor, children, className = "" }) {
  return (
    <div className={`min-w-0 ${className}`}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-[#0B1730]">
        {label}
        {required && <span className="ml-0.5 text-[#E3182D]" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && <p id={`${htmlFor}-err`} role="alert" className="mt-1.5 text-[13px] text-[#E3182D]">{error}</p>}
    </div>
  );
}

/* Numbered section heading */
function SectionTitle({ n, title, hint }) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0B1730] text-sm font-bold text-white">{n}</span>
      <div>
        <h3 className="text-lg font-bold leading-8 text-[#0B1730]">{title}</h3>
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
      <legend className="mb-2 text-sm font-semibold text-[#0B1730]">
        {legend}
        {required && <span className="ml-0.5 text-[#E3182D]" aria-hidden="true">*</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <label key={opt} className="cursor-pointer">
            <input type="radio" name={id} value={opt} checked={value === opt}
                   onChange={() => onChange(opt)}
                   onClick={() => value === opt && onChange("")}
                   className="peer sr-only" />
            <span className={`inline-block rounded-full border px-4 py-2 text-sm transition
              peer-checked:border-[#174F91] peer-checked:bg-[#174F91] peer-checked:font-semibold peer-checked:text-white
              peer-focus-visible:ring-4 peer-focus-visible:ring-[#174F91]/25
              ${error ? "border-[#E3182D]/60" : "border-[#D4DCE8]"} bg-white text-[#0B1730] hover:border-[#174F91]`}>
              {opt}
            </span>
          </label>
        ))}
      </div>
      {error && <p id={`${id}-err`} role="alert" className="mt-1.5 text-[13px] text-[#E3182D]">{error}</p>}
    </fieldset>
  );
}

const contactLink = "flex items-center gap-3 rounded-lg px-2 py-2 text-[15px] text-[#0B1730] transition hover:text-[#174F91]";
const contactIcon = "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E3182D]/10 text-[#E3182D]";

/* ================================================================== */
export default function EnquiryPage() {
  const empty = {
    name: "", email: "", countryCode: "+91", phone: "", company: "",
    service: "", budget: "", message: "", consent: false, botcheck: "",
  };
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const bannerRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // bring the success / error message into view
  useEffect(() => {
    if (status === "success" || status === "error") {
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

  async function onSubmit(e) {
    e.preventDefault();
    if (values.botcheck) return; // honeypot – bots only
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(Object.keys(errs)[0])?.focus();
      return;
    }
    setStatus("loading");
    try {
      const payload = {
        access_key: WEB3FORMS_KEY, // ignored by custom backends
        subject: `New VR4Web enquiry – ${values.service}`,
        from_name: "VR4Web Website",
        name: values.name.trim(),
        email: values.email.trim(),
        phone: `${values.countryCode} ${values.phone.trim()}`,
        company: values.company.trim(),
        service: values.service,
        budget: values.budget,
        message: values.message.trim(),
      };
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === false) throw new Error(data.message || "Request failed");
      setStatus("success");
      setValues(empty);
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-white font-sans text-[#0B1730]">
      {/* ---------------- HERO: background image + clean centered layout ---------------- */}
      <section className="relative isolate overflow-hidden px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8 border-b border-[#1E3A66]">
        <img src={HERO_IMG} alt="" aria-hidden="true" loading="eager"
             className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_20%]" />
        {/* Subtle, soft Navy tint so /banner/5.png cloud texture is clearly visible with no heavy dark smoke filter */}
        <div className="absolute inset-0 -z-10 bg-[#102448]/25" />

        <div className="mx-auto max-w-4xl text-center flex flex-col items-center justify-center">
          <nav aria-label="Breadcrumb" className="mb-4 inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-medium bg-[#102448]/80 text-white px-4 py-1.5 rounded-full shadow-md backdrop-blur-md border border-white/20 mx-auto">
            <Link to="/" className="transition-colors hover:text-[#FF6B7A]">Home</Link>
            <span aria-hidden="true" className="text-white/60">/</span>
            <span className="font-semibold text-white">Enquiry</span>
          </nav>

          <span className="mb-3 inline-block h-1 w-16 rounded-full bg-[#E3182D] mx-auto" />
          <h1 className="text-[clamp(2rem,4.4vw,3.25rem)] font-extrabold leading-tight text-white drop-shadow-[0_4px_16px_rgba(16,36,72,0.6)] mb-4 text-center">
            Let’s Build Something <span className="text-[#E3182D]">Great Together.</span>
          </h1>
          <p className="max-w-2xl text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed text-white drop-shadow-[0_1px_4px_rgba(16,36,72,0.7)] mb-6 text-center mx-auto">
            Have a project in mind or need expert digital solutions? Tell us what you’re looking for, and our team will help you take the next step.
          </p>

          <ul className="flex flex-wrap items-center justify-center gap-2.5 mx-auto">
            {["Reply within 24 hrs", "No obligation", "Free consultation"].map((t) => (
              <li key={t} className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-[#102448]/60 px-4 py-1.5 text-xs sm:text-sm font-medium text-white backdrop-blur-md shadow-sm">
                <span className="text-[#FF6B7A]"><CheckIcon /></span>{t}
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
                <strong>Thank you!</strong> Your enquiry has been sent. We’ll reply shortly.
              </div>
            )}
            {status === "error" && (
              <div role="alert" className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                Something went wrong. Please try again, or email us at{" "}
                <a className="font-semibold underline" href="mailto:info@niftysoft.com">info@niftysoft.com</a>.
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
                            className={`${inputCls(false)} h-12 w-[96px] shrink-0 px-2`}>
                      {COUNTRY_CODES.map(([c, l]) => <option key={c} value={c}>{l}</option>)}
                    </select>
                    <input id="phone" type="tel" autoComplete="tel-national" placeholder="94441 16316"
                           value={values.phone} onChange={set("phone")}
                           aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-err" : undefined}
                           className={`${inputCls(errors.phone)} h-12 min-w-0`} />
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
                       className="mt-0.5 h-5 w-5 shrink-0 rounded border-[#D4DCE8] accent-[#E3182D]" />
                <span>
                  I agree to the{" "}
                  <Link to={PRIVACY_URL} className="font-semibold text-[#174F91] underline">privacy policy</Link>{" "}
                  and consent to VR4Web contacting me regarding my enquiry.
                </span>
              </label>
              {errors.consent && <p role="alert" className="mt-1.5 text-[13px] text-[#E3182D]">{errors.consent}</p>}

              <button type="submit" disabled={status === "loading"}
                      className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#E3182D] px-8 font-bold text-white shadow-lg shadow-[#E3182D]/25 transition hover:bg-[#BF1024] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#E3182D]/30 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto">
                {status === "loading" ? (
                  <>
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity=".25" />
                      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    Sending…
                  </>
                ) : (
                  <>Send Your Enquiry <SendIcon /></>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* SIDEBAR */}
        <aside className="space-y-6 lg:sticky lg:top-28">
          {/* What happens next */}
          <div className="rounded-2xl bg-gradient-to-br from-[#0B1730] to-[#172B4D] p-6 text-white sm:p-7">
            <h2 className="text-lg font-bold">What happens next?</h2>
            <ol className="mt-5">
              {STEPS.map(([title, text], i) => (
                <li key={title} className="relative flex gap-4 pb-6 last:pb-0">
                  {i < STEPS.length - 1 && <span className="absolute left-[15px] top-8 h-[calc(100%-2rem)] w-px bg-white/20" aria-hidden="true" />}
                  <span className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E3182D] text-sm font-bold">{i + 1}</span>
                  <div>
                    <p className="font-semibold">{title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-white">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Quick contact */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-bold text-[#0B1730]">Prefer to talk?</h2>
            <div className="mt-3 space-y-2">
              <a className={contactLink} href="mailto:info@niftysoft.com"><span className={contactIcon}><MailIcon /></span><span className="min-w-0 break-words">info@niftysoft.com</span></a>
              <a className={contactLink} href="tel:+919444116316"><span className={contactIcon}><PhoneIcon /></span><span>+91 94441 16316</span></a>
              <div className="flex items-center gap-3 px-2 py-2 text-[15px] text-[#0B1730]"><span className={contactIcon}><ClockIcon /></span><span>Mon – Fri, 9:30 AM – 6:30 PM IST</span></div>
              <div className="flex items-start gap-3 px-2 py-2 text-[15px] text-[#0B1730]">
                <span className={`${contactIcon} mt-0.5 shrink-0`}><PinIcon /></span>
                <span>Unit No.23 Block I, SIDCO Electronic Complex, Guindy, Chennai – 600 032</span>
              </div>
            </div>
            <div className="mt-4 flex gap-2 border-t border-[#E2E8F0] pt-4">
              {SOCIALS.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name}
                   className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D4DCE8] text-[#0B1730] transition hover:border-[#174F91] hover:bg-[#174F91] hover:text-white">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true"><path d={s.d} /></svg>
                </a>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}