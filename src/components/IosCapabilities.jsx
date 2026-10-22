import React from 'react';
import { motion } from 'framer-motion';
import {
    Smartphone,
    Zap,
    Cloud,
    ShieldCheck,
    CheckCircle2,
    RefreshCw,
    Sparkles,
    Flame
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   3D-STYLED VECTOR ILLUSTRATIONS FOR THE 6 CAPABILITY CARDS
   Matched with precision to the reference design
   ───────────────────────────────────────────────────────────── */

/** Card 01 — 3D Stacked Isometric Translucent Layers with Apple Logo */
const IsometricLayersGraphic = () => (
    <svg viewBox="0 0 120 100" className="w-full h-full drop-shadow-md select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="c1-red" x1="20" y1="10" x2="100" y2="50" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FF4652" />
                <stop offset="50%" stopColor="#FF3038" />
                <stop offset="100%" stopColor="#C4121B" />
            </linearGradient>
            <linearGradient id="c1-glass1" x1="20" y1="25" x2="100" y2="65" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#E0ECFB" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#BACFEA" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="c1-glass2" x1="20" y1="40" x2="100" y2="80" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#EAF2FC" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#8FB7EB" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient id="c1-base" x1="20" y1="55" x2="100" y2="95" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#0B1F3A" stopOpacity="0.8" />
            </linearGradient>
            <filter id="c1-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
        </defs>

        {/* Ambient ruby glow */}
        <ellipse cx="60" cy="36" rx="36" ry="18" fill="#FF3038" opacity="0.3" filter="url(#c1-glow)" />

        {/* Base Layer 4 */}
        <g transform="translate(0, 42)">
            <path d="M60 12 L100 30 L60 48 L20 30 Z" fill="url(#c1-base)" stroke="#3B82F6" strokeWidth="1" strokeOpacity="0.4" />
            <path d="M20 30 L60 48 L60 53 L20 35 Z" fill="#0B1F3A" />
            <path d="M60 48 L100 30 L100 35 L60 53 Z" fill="#172554" />
        </g>
        {/* Layer 3 */}
        <g transform="translate(0, 28)">
            <path d="M60 12 L100 30 L60 48 L20 30 Z" fill="url(#c1-glass2)" stroke="#93C5FD" strokeWidth="1" strokeOpacity="0.6" />
            <path d="M20 30 L60 48 L60 53 L20 35 Z" fill="#93C5FD" fillOpacity="0.3" />
            <path d="M60 48 L100 30 L100 35 L60 53 Z" fill="#60A5FA" fillOpacity="0.4" />
        </g>
        {/* Layer 2 */}
        <g transform="translate(0, 14)">
            <path d="M60 12 L100 30 L60 48 L20 30 Z" fill="url(#c1-glass1)" stroke="#BFDBFE" strokeWidth="1.2" />
            <path d="M20 30 L60 48 L60 53 L20 35 Z" fill="#BFDBFE" fillOpacity="0.5" />
            <path d="M60 48 L100 30 L100 35 L60 53 Z" fill="#93C5FD" fillOpacity="0.6" />
        </g>
        {/* Top Layer 1 — Red with Apple Logo */}
        <g transform="translate(0, 0)">
            <path d="M60 12 L100 30 L60 48 L20 30 Z" fill="url(#c1-red)" stroke="#FF8A90" strokeWidth="1.2" />
            <path d="M20 30 L60 48 L60 54 L20 36 Z" fill="#9F0E17" />
            <path d="M60 48 L100 30 L100 36 L60 54 Z" fill="#C4121B" />
            {/* Apple Logo */}
            <g transform="translate(53, 20) scale(0.65)">
                <path d="M12.5 13.5c-.8.9-1.9 1.5-3 1.4-.2-1.1.3-2.3 1-3 .8-.9 2-1.5 3.1-1.3.1 1.1-.3 2.1-1.1 2.9zm3.5 1.7c-.5-.3-1.6-.9-2.7-.9-1.4 0-2.4.9-3.2.9-.8 0-1.7-.8-2.8-.8-1.5 0-2.8.9-3.6 2.2-1.6 2.7-.4 6.7 1.1 8.9.8 1.1 1.7 2.3 2.9 2.2 1.2 0 1.6-.7 3-.7 1.4 0 1.8.7 3 .7 1.2 0 2-1.1 2.8-2.2.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.4-.9-2.4-3.6 0-2.3 1.9-3.4 2-3.5-.9-1.6-2.5-1.7-2.9-1.7z" fill="#FFFFFF" />
            </g>
        </g>
    </svg>
);

/** Card 02 — Floating React Native and Flutter 3D Frosted Tiles */
const ReactNativeFlutterGraphic = () => (
    <svg viewBox="0 0 120 100" className="w-full h-full drop-shadow-md select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="c2-tile1" x1="10" y1="5" x2="65" y2="60" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#DCE8FA" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="c2-tile2" x1="55" y1="35" x2="115" y2="90" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#CDE1FB" stopOpacity="0.85" />
            </linearGradient>
            <filter id="c2-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
        </defs>

        {/* Ambient blue glow */}
        <circle cx="65" cy="50" r="36" fill="#3B82F6" opacity="0.22" filter="url(#c2-glow)" />

        {/* Upper Frosted Glass Tile: React Native */}
        <g transform="translate(52, 8)">
            <rect x="0" y="0" width="46" height="46" rx="14" fill="url(#c2-tile1)" stroke="#93C5FD" strokeWidth="1.4" />
            {/* React Atom */}
            <g transform="translate(23, 23)">
                <ellipse rx="13" ry="5.2" stroke="#00D8FF" strokeWidth="1.8" fill="none" />
                <ellipse rx="13" ry="5.2" stroke="#00D8FF" strokeWidth="1.8" fill="none" transform="rotate(60)" />
                <ellipse rx="13" ry="5.2" stroke="#00D8FF" strokeWidth="1.8" fill="none" transform="rotate(120)" />
                <circle r="2.8" fill="#00D8FF" />
            </g>
        </g>

        {/* Lower Frosted Glass Tile: Flutter */}
        <g transform="translate(18, 38)">
            <rect x="0" y="0" width="48" height="48" rx="14" fill="url(#c2-tile2)" stroke="#60A5FA" strokeWidth="1.5" />
            {/* Flutter Wing Logo */}
            <g transform="translate(14, 11) scale(1.15)">
                <polygon points="12,0 3,9 7.5,13.5 19.5,1.5" fill="#02569B" />
                <polygon points="7.5,13.5 0,21 4.5,25.5 16.5,13.5" fill="#0175C2" />
                <polygon points="12,18 7.5,13.5 12,9 16.5,13.5" fill="#42A5F5" />
                <polygon points="7.5,13.5 3,18 7.5,22.5 12,18" fill="#02569B" opacity="0.6" />
            </g>
        </g>
    </svg>
);

/** Card 03 — 3D Cloud with Upload Arrow & Server Blade Chassis */
const CloudMicroservicesGraphic = () => (
    <svg viewBox="0 0 120 100" className="w-full h-full drop-shadow-md select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="c3-cloud" x1="30" y1="8" x2="95" y2="52" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="50%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
            <linearGradient id="c3-server" x1="25" y1="55" x2="95" y2="90" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#E2E8F0" />
                <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
            <filter id="c3-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
        </defs>

        <circle cx="62" cy="32" r="30" fill="#3B82F6" opacity="0.25" filter="url(#c3-glow)" />

        {/* Server Blade 2 (bottom) */}
        <g transform="translate(28, 68)">
            <rect x="0" y="0" width="64" height="15" rx="4" fill="url(#c3-server)" stroke="#64748B" strokeWidth="1" />
            <line x1="8" y1="7.5" x2="38" y2="7.5" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
            <circle cx="48" cy="7.5" r="2" fill="#10B981" />
            <circle cx="54" cy="7.5" r="2" fill="#3B82F6" />
        </g>
        {/* Server Blade 1 (top) */}
        <g transform="translate(28, 50)">
            <rect x="0" y="0" width="64" height="15" rx="4" fill="url(#c3-server)" stroke="#64748B" strokeWidth="1" />
            <line x1="8" y1="7.5" x2="38" y2="7.5" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
            <circle cx="48" cy="7.5" r="2" fill="#10B981" />
            <circle cx="54" cy="7.5" r="2" fill="#F59E0B" />
        </g>

        {/* 3D Puffy Cloud with Upward Arrow */}
        <g transform="translate(26, 8)">
            <path d="M22 36 C13 36 6 29 6 20 C6 12 12 6 20 5 C23 1 30 -1 37 1 C43 -2 52 0 57 5 C66 4 72 12 71 21 C76 24 77 31 73 36 Z" fill="url(#c3-cloud)" />
            {/* White Upward Arrow */}
            <path d="M38 12 L46 20 L41 20 L41 28 L35 28 L35 20 L30 20 Z" fill="#FFFFFF" />
        </g>
    </svg>
);

/** Card 04 — Vision Pro Spatial Headset */
const VisionProGraphic = () => (
    <svg viewBox="0 0 120 100" className="w-full h-full drop-shadow-md select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="c4-visor" x1="20" y1="25" x2="100" y2="70" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#1E1B4B" />
                <stop offset="40%" stopColor="#0B132B" />
                <stop offset="70%" stopColor="#1C2D54" />
                <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="c4-reflection" x1="30" y1="30" x2="80" y2="55" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#A855F7" stopOpacity="0.65" />
                <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.45" />
                <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <filter id="c4-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
        </defs>

        <ellipse cx="60" cy="50" rx="42" ry="24" fill="#8B5CF6" opacity="0.22" filter="url(#c4-glow)" />

        {/* Solo Knit Headband */}
        <path d="M16 48 C14 36 24 28 35 27 C50 25 70 25 85 27 C96 28 106 36 104 48" stroke="#1D4ED8" strokeWidth="8" strokeLinecap="round" strokeDasharray="3 2" />

        {/* Visor Chassis Body */}
        <g transform="translate(18, 30)">
            {/* Aluminum Rim */}
            <rect x="0" y="0" width="84" height="40" rx="20" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
            {/* Curved Dark Glass */}
            <rect x="3" y="3" width="78" height="34" rx="17" fill="url(#c4-visor)" />
            {/* Spatial Eyesight Reflection Sheen */}
            <ellipse cx="42" cy="20" rx="32" ry="12" fill="url(#c4-reflection)" />
            {/* Dual Sensor Pod Accents */}
            <circle cx="16" cy="20" r="3" fill="#38BDF8" opacity="0.5" />
            <circle cx="68" cy="20" r="3" fill="#38BDF8" opacity="0.5" />
            {/* Center bridge */}
            <rect x="40" y="3" width="4" height="8" rx="2" fill="#475569" opacity="0.4" />
        </g>

        {/* Side Audio Pods */}
        <rect x="14" y="44" width="7" height="12" rx="3" fill="#CBD5E1" stroke="#64748B" strokeWidth="0.8" />
        <rect x="99" y="44" width="7" height="12" rx="3" fill="#CBD5E1" stroke="#64748B" strokeWidth="0.8" />
    </svg>
);

/** Card 05 — Continuous CI/CD 3D Infinity Loop with Gear */
const CiCdPipelineGraphic = () => (
    <svg viewBox="0 0 120 100" className="w-full h-full drop-shadow-md select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="c5-infinity" x1="15" y1="20" x2="105" y2="70" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#007AFF" />
                <stop offset="50%" stopColor="#00C7BE" />
                <stop offset="100%" stopColor="#0051C6" />
            </linearGradient>
            <linearGradient id="c5-gear" x1="75" y1="45" x2="105" y2="75" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
            <filter id="c5-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
        </defs>

        <ellipse cx="60" cy="50" rx="42" ry="25" fill="#007AFF" opacity="0.22" filter="url(#c5-glow)" />

        {/* 3D Infinity Loop Path */}
        <path
            d="M38 50 C22 34 10 44 10 52 C10 60 22 70 38 54 C54 38 66 38 82 54 C98 70 110 60 110 52 C110 44 98 34 82 50 C66 66 54 66 38 50 Z"
            stroke="url(#c5-infinity)"
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M38 50 C22 34 10 44 10 52 C10 60 22 70 38 54 C54 38 66 38 82 54 C98 70 110 60 110 52 C110 44 98 34 82 50 C66 66 54 66 38 50 Z"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="12 40"
            opacity="0.85"
        />

        {/* Interlocking Gear on right loop */}
        <g transform="translate(82, 54)">
            <circle cx="0" cy="0" r="14" fill="url(#c5-gear)" stroke="#E0F2FE" strokeWidth="1" />
            <circle cx="0" cy="0" r="5" fill="#FFFFFF" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <rect
                    key={deg}
                    x="-2.5"
                    y="-17"
                    width="5"
                    height="5"
                    rx="1"
                    fill="url(#c5-gear)"
                    transform={`rotate(${deg})`}
                />
            ))}
        </g>
    </svg>
);

/** Card 06 — Military-Grade App Security Shield with Apple Logo & 3D Padlock */
const MilitarySecurityGraphic = () => (
    <svg viewBox="0 0 120 100" className="w-full h-full drop-shadow-md select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="c6-shield" x1="20" y1="15" x2="80" y2="75" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#1E293B" />
                <stop offset="50%" stopColor="#0F172A" />
                <stop offset="100%" stopColor="#0B132B" />
            </linearGradient>
            <linearGradient id="c6-lock" x1="70" y1="50" x2="105" y2="85" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FF414D" />
                <stop offset="100%" stopColor="#C4121B" />
            </linearGradient>
            <filter id="c6-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
        </defs>

        <circle cx="55" cy="46" r="35" fill="#FF3038" opacity="0.25" filter="url(#c6-glow)" />

        {/* Concentric Radar Rings */}
        <circle cx="55" cy="46" r="40" stroke="#FF3038" strokeWidth="1" strokeDasharray="3 5" opacity="0.45" />
        <circle cx="55" cy="46" r="30" stroke="#FF3038" strokeWidth="0.8" opacity="0.35" />

        {/* Shield Base */}
        <g transform="translate(25, 12)">
            <path
                d="M30 4 L56 14 C56 42 30 58 30 62 C30 58 4 42 4 14 Z"
                fill="url(#c6-shield)"
                stroke="#FF3038"
                strokeWidth="1.8"
            />
            {/* Apple Logo engraved on shield */}
            <g transform="translate(22, 22) scale(0.65)">
                <path d="M12.5 13.5c-.8.9-1.9 1.5-3 1.4-.2-1.1.3-2.3 1-3 .8-.9 2-1.5 3.1-1.3.1 1.1-.3 2.1-1.1 2.9zm3.5 1.7c-.5-.3-1.6-.9-2.7-.9-1.4 0-2.4.9-3.2.9-.8 0-1.7-.8-2.8-.8-1.5 0-2.8.9-3.6 2.2-1.6 2.7-.4 6.7 1.1 8.9.8 1.1 1.7 2.3 2.9 2.2 1.2 0 1.6-.7 3-.7 1.4 0 1.8.7 3 .7 1.2 0 2-1.1 2.8-2.2.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.4-.9-2.4-3.6 0-2.3 1.9-3.4 2-3.5-.9-1.6-2.5-1.7-2.9-1.7z" fill="#FFFFFF" />
            </g>
        </g>

        {/* 3D Red Padlock (bottom right) */}
        <g transform="translate(74, 50)">
            {/* Silver Shackle */}
            <path d="M7 14 L7 8 C7 4 10 1 15 1 C20 1 23 4 23 8 L23 14" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* Padlock Body */}
            <rect x="0" y="12" width="30" height="24" rx="6" fill="url(#c6-lock)" stroke="#FF8A90" strokeWidth="1" />
            {/* Keyhole */}
            <circle cx="15" cy="22" r="2.5" fill="#FFFFFF" />
            <polygon points="13.5,22 16.5,22 17,29 13,29" fill="#FFFFFF" />
        </g>
    </svg>
);

/* ─────────────────────────────────────────────────────────────
   HERO BANNER RIGHT-SIDE ILLUSTRATION: POLISHED IPHONE MOCKUP
   With floating App Store, Swift, React Native badges and glow
   ───────────────────────────────────────────────────────────── */
const HeroPhoneMockup = () => (
    <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] mx-auto flex items-center justify-center select-none py-4">
        {/* Ambient radial blue/cyan glow */}
        <div className="absolute w-72 sm:w-80 h-72 sm:h-80 rounded-full bg-gradient-to-tr from-[#007AFF]/35 via-cyan-400/20 to-transparent blur-3xl pointer-events-none" />

        {/* Decorative Concentric Circular Rings */}
        <div className="absolute inset-0 m-auto w-72 sm:w-80 h-72 sm:h-80 rounded-full border border-cyan-400/15 pointer-events-none" />
        <div className="absolute inset-0 m-auto w-88 sm:w-96 h-88 sm:h-96 rounded-full border border-white/5 pointer-events-none" />

        {/* Floating App Store Badge (Top-Left) */}
        <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-2 -left-2 sm:-left-6 z-20 flex items-center gap-2.5 p-2 sm:p-2.5 pr-3.5 rounded-2xl bg-[#0B1F3A]/90 backdrop-blur-xl border border-white/20 shadow-[0_12px_28px_rgba(0,122,255,0.45)]"
        >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#007AFF] to-[#0051C6] flex items-center justify-center text-white shadow-md flex-shrink-0">
                {/* App Store 'A' Symbol */}
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.76 1.04-1.82.93-2.88-.9.04-1.99.6-2.64 1.36-.57.66-.99 1.73-.86 2.76.99.08 2.02-.53 2.57-1.24" />
                </svg>
            </div>
            <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-cyan-300">App Store</span>
                <span className="block text-xs font-extrabold text-white">Apple Certified</span>
            </div>
        </motion.div>

        {/* Floating Swift Badge (Top-Right) */}
        <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute top-6 -right-2 sm:-right-4 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#FF5A00] to-[#E03A00] flex items-center justify-center text-white shadow-[0_12px_24px_rgba(255,90,0,0.45)] border border-white/25"
            title="Swift 6 Ecosystem"
        >
            <Flame className="w-6 h-6 text-white" />
        </motion.div>

        {/* Floating React Native / Multiplatform Badge (Bottom-Left) */}
        <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute -bottom-3 -left-2 sm:-left-4 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-slate-900/90 text-[#00D8FF] flex items-center justify-center shadow-[0_10px_24px_rgba(0,0,0,0.5)] border border-cyan-400/40 backdrop-blur-md"
            title="Multiplatform Reach"
        >
            <svg viewBox="0 0 24 24" className="w-6 h-6">
                <ellipse cx="12" cy="12" rx="9" ry="3.8" stroke="#00D8FF" strokeWidth="1.6" fill="none" />
                <ellipse cx="12" cy="12" rx="9" ry="3.8" stroke="#00D8FF" strokeWidth="1.6" fill="none" transform="rotate(60 12 12)" />
                <ellipse cx="12" cy="12" rx="9" ry="3.8" stroke="#00D8FF" strokeWidth="1.6" fill="none" transform="rotate(120 12 12)" />
                <circle cx="12" cy="12" r="2" fill="#00D8FF" />
            </svg>
        </motion.div>

        {/* Polished Smartphone Body (Titanium border with subtle bevel) */}
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 w-[220px] sm:w-[250px] rounded-[44px] p-2.5 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-950 shadow-[0_25px_60px_rgba(0,0,0,0.65)] border border-slate-600/70"
        >
            {/* Screen Glass Container */}
            <div className="relative rounded-[36px] bg-[#0A1120] overflow-hidden border border-white/10 p-3 sm:p-4 aspect-[9/18.5] flex flex-col justify-between">
                {/* Dynamic Island Pill */}
                <div className="w-22 sm:w-24 h-5 bg-black rounded-full mx-auto flex items-center justify-end px-2 gap-1 mb-1">
                    <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-700" />
                </div>

                {/* In-app Mini Header */}
                <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                    <div>
                        <span className="text-[9px] font-semibold text-slate-400">VR4Web Mobile</span>
                        <h4 className="text-xs font-bold text-white">iOS Engineering</h4>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[9px] font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        120 FPS
                    </span>
                </div>

                {/* In-app Telemetry Card */}
                <div className="my-2 p-2.5 sm:p-3 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/15 backdrop-blur-md">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] text-slate-300 font-medium">Native Swift 6</span>
                        <span className="text-[10px] font-bold text-[#FFC629]">99.9% Crash-Free</span>
                    </div>
                    {/* Activity wave bars */}
                    <div className="h-9 flex items-end gap-1.5">
                        {[40, 65, 50, 85, 70, 95, 80, 100].map((h, i) => (
                            <div
                                key={i}
                                style={{ height: `${h}%` }}
                                className="flex-1 rounded-sm bg-gradient-to-t from-[#007AFF] to-cyan-400"
                            />
                        ))}
                    </div>
                </div>

                {/* 2 Feature Tiles */}
                <div className="grid grid-cols-2 gap-2 my-1">
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-center">
                        <span className="block text-[11px] font-extrabold text-white">Metal</span>
                        <span className="block text-[8px] text-slate-400">GPU Accelerated</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-center">
                        <span className="block text-[11px] font-extrabold text-[#FFC629]">VisionOS</span>
                        <span className="block text-[8px] text-slate-400">Spatial Reality</span>
                    </div>
                </div>

                {/* Screen Bottom Action CTA */}
                <div className="pt-2">
                    <div className="w-full py-2 rounded-xl bg-gradient-to-r from-[#FF3038] to-[#FF5A00] text-center text-[10px] font-bold text-white shadow-md">
                        Deploy to TestFlight
                    </div>
                </div>
            </div>
        </motion.div>
    </div>
);

/* ─────────────────────────────────────────────────────────────
   CAPABILITY CARDS DATA (EXACT 6 CARDS AS SPECIFIED)
   ───────────────────────────────────────────────────────────── */
const CAPABILITY_CARDS = [
    {
        number: '01',
        accentColor: '#FF3038',
        accentBorder: 'bg-[#FF3038]',
        iconBg: 'bg-gradient-to-br from-[#FF3038] to-[#D92027]',
        badgeCls: 'bg-red-50 text-[#FF3038] border border-red-200/70',
        Icon: Smartphone,
        title: 'Native High-Throughput Engines',
        description: 'Leveraging Swift and Kotlin for resource-intensive apps requiring raw graphics power, hardware acceleration, and seamless sensor integration.',
        illustration: <IsometricLayersGraphic />,
        pills: [
            'Metal & Vulkan rendering',
            'BLE & sensor communication',
            'Sub-millisecond responsiveness',
        ],
    },
    {
        number: '02',
        accentColor: '#2563EB',
        accentBorder: 'bg-[#2563EB]',
        iconBg: 'bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8]',
        badgeCls: 'bg-blue-50 text-[#2563EB] border border-blue-200/70',
        Icon: Zap,
        title: 'Cross-Platform React Native & Flutter',
        description: 'Maximize budget efficiency with unified codebases delivering true native 60fps/120fps refresh rates across both iOS and Android.',
        illustration: <ReactNativeFlutterGraphic />,
        pills: [
            'Shared logic modules',
            'Hot reload agility',
            'Native bridge optimization',
        ],
    },
    {
        number: '03',
        accentColor: '#FFC629',
        accentBorder: 'bg-[#FFC629]',
        iconBg: 'bg-gradient-to-br from-[#FBBF24] to-[#F59E0B]',
        badgeCls: 'bg-amber-50 text-amber-600 border border-amber-200/70',
        Icon: Cloud,
        title: 'Cloud Backend & Microservices Integration',
        description: 'Seamless connectivity to GraphQL, RESTful APIs, Firebase, AWS AppSync, and custom microservice backends.',
        illustration: <CloudMicroservicesGraphic />,
        pills: [
            'GraphQL subscriptions',
            'Automated push queues',
            'Fault-tolerant retries',
        ],
    },
    {
        number: '04',
        accentColor: '#8B5CF6',
        accentBorder: 'bg-[#8B5CF6]',
        iconBg: 'bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9]',
        badgeCls: 'bg-purple-50 text-[#8B5CF6] border border-purple-200/70',
        // Goggles / VR headset icon
        Icon: (props) => (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
                <rect x="2" y="6" width="20" height="12" rx="6" />
                <circle cx="8" cy="12" r="3" />
                <circle cx="16" cy="12" r="3" />
                <path d="M11 12h2" />
            </svg>
        ),
        title: 'Spatial & Augmented Reality (Vision Pro)',
        description: 'Pioneering immersive iOS experiences with depth sensing, spatial audio, and hand-eye gesture interfaces.',
        illustration: <VisionProGraphic />,
        pills: [
            'RealityKit & ARKit',
            'Spatial audio layers',
            'Bespoke 3D interactions',
        ],
    },
    {
        number: '05',
        accentColor: '#10B981',
        accentBorder: 'bg-[#10B981]',
        iconBg: 'bg-gradient-to-br from-[#10B981] to-[#047857]',
        badgeCls: 'bg-emerald-50 text-[#10B981] border border-emerald-200/70',
        Icon: RefreshCw,
        title: 'Continuous CI/CD Pipeline',
        description: 'Automated test execution, static analysis, and multi-track release/deployment pipelines.',
        illustration: <CiCdPipelineGraphic />,
        pills: [
            'Fastlane automation',
            'Zero-downtime releases',
            'Automated testing suites',
        ],
    },
    {
        number: '06',
        accentColor: '#FF3038',
        accentBorder: 'bg-[#FF3038]',
        iconBg: 'bg-gradient-to-br from-[#FF3038] to-[#D92027]',
        badgeCls: 'bg-red-50 text-[#FF3038] border border-red-200/70',
        Icon: ShieldCheck,
        title: 'Military-Grade App Security',
        description: 'Implementing advanced encryption, anti-tampering, secure keychain, and user privacy protection for high-security applications.',
        illustration: <MilitarySecurityGraphic />,
        pills: [
            'Advanced threat detection',
            'Runtime integrity checks',
            'Anti-tampering tools',
        ],
    },
];

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT: IOS CAPABILITIES (HERO BANNER + 6 CARDS)
   ───────────────────────────────────────────────────────────── */
export default function IosCapabilities() {
    return (
        <section id="features-section" className="relative scroll-mt-28">
            {/* ───────────── 1. DEEP NAVY-BLUE HERO BANNER (#0B1F3A) ───────────── */}
            <div className="relative bg-[#0B1F3A] text-white overflow-hidden py-14 sm:py-20 lg:py-24">
                {/* Subtle blue gradients & faint dotted patterns */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 [background-size:24px_24px] [background-image:radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] opacity-70 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-[#007AFF]/20 blur-[130px]"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-40 -left-40 w-[520px] h-[520px] rounded-full bg-[#FF3038]/15 blur-[130px]"
                />

                <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
                        {/* Left Side: Heading & Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.55 }}
                            className="lg:col-span-7 text-left"
                        >
                            {/* Small pill badge: “CAPABILITIES & INNOVATIONS” */}
                            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold border mb-4 bg-white/10 text-white border-white/20 tracking-wider uppercase">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FF3038] animate-pulse" />
                                CAPABILITIES &amp; INNOVATIONS
                            </span>

                            {/* Large bold heading */}
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-2 text-white">
                                Key Capabilities &amp; Features of{' '}
                                <span className="text-[#FFC629]">iOS Development</span>
                            </h2>

                            {/* Short yellow underline */}
                            <span className="block h-1 w-24 rounded-full bg-[#FFC629] mb-4 mt-2" />

                            {/* Description */}
                            <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-xl">
                                Our mobile engineering stack encompasses everything modern mobile applications require to dominate App Store and Play Store charts.
                            </p>
                        </motion.div>

                        {/* Right Side: Polished Smartphone / iPhone Mockup */}
                        <div className="lg:col-span-5 flex justify-center">
                            <HeroPhoneMockup />
                        </div>
                    </div>
                </div>
            </div>

            {/* ───────────── 2. LIGHT BLUE-WHITE CAPABILITY CARDS SECTION ───────────── */}
            <div className="relative bg-[#F0F4FA] py-14 sm:py-20 overflow-hidden">
                {/* Faint dotted grid pattern */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 [background-size:24px_24px] [background-image:radial-gradient(rgba(11,31,58,0.06)_1px,transparent_1px)]"
                />

                <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    {/* 3-Column Desktop Grid, 2 Rows */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                        {CAPABILITY_CARDS.map((card, idx) => (
                            <motion.div
                                key={card.number}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ duration: 0.5, delay: idx * 0.07 }}
                                className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-[0_8px_25px_rgba(11,31,75,0.06)] hover:shadow-[0_16px_36px_rgba(11,31,75,0.12)] hover:-translate-y-1 transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between overflow-hidden"
                            >
                                {/* Thin colored accent stripe along left edge */}
                                <span className={`absolute left-0 top-0 bottom-0 w-1.5 ${card.accentBorder}`} />

                                <div>
                                    {/* Top Row: Icon + Number Badge on Left, 3D Illustration on Right */}
                                    <div className="flex items-start justify-between gap-3 mb-4">
                                        <div className="flex items-center gap-2.5">
                                            {/* Large colorful icon in rounded-square container */}
                                            <div className={`w-12 h-12 rounded-2xl ${card.iconBg} text-white flex items-center justify-center shadow-md shadow-black/10`}>
                                                <card.Icon className="w-6 h-6 text-white" />
                                            </div>
                                            {/* Number Badge */}
                                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${card.badgeCls}`}>
                                                {card.number}
                                            </span>
                                        </div>

                                        {/* Relevant Decorative 3D Illustration positioned towards top right */}
                                        <div className="w-24 sm:w-28 h-20 sm:h-22 shrink-0 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                                            {card.illustration}
                                        </div>
                                    </div>

                                    {/* Bold Navy-Blue Title */}
                                    <h3 className="text-lg sm:text-[19px] font-extrabold text-[#0B1F3A] leading-tight mb-2 tracking-tight">
                                        {card.title}
                                    </h3>

                                    {/* Concise Readable Description */}
                                    <p className="text-[13px] sm:text-[13.5px] text-slate-600 leading-relaxed mb-6">
                                        {card.description}
                                    </p>
                                </div>

                                {/* Three Compact Feature Pills with Red Check Icons */}
                                <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2">
                                    {card.pills.map((pill, pIdx) => (
                                        <span
                                            key={pIdx}
                                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200/80 text-[11px] sm:text-[11.5px] font-semibold text-slate-700"
                                        >
                                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FF3038] shrink-0" />
                                            <span>{pill}</span>
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
