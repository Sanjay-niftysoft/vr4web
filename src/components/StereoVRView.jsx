import { useState } from 'react';
import { Sliders, Maximize2 } from 'lucide-react';

export default function StereoVRView() {
 const [ipd, setIpd] = useState(64); // Interpupillary distance

 return (
 <div className="w-full h-full flex flex-col bg-black relative">
 <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 glass-panel px-6 py-3 rounded-full flex items-center gap-4 border border-[#F97316]/30">
 <Sliders className="text-[#F97316] w-4 h-4" />
 <span className="text-[#111111] text-sm">IPD Adjust</span>
 <input 
 type="range" 
 min="55" 
 max="75" 
 value={ipd} 
 onChange={(e) => setIpd(e.target.value)}
 className="w-32 accent-magenta-500"
 />
 <span className="text-[#F97316] font-mono text-sm">{ipd}mm</span>
 <div className="w-px h-4 bg-[#111111]/5 mx-2"></div>
 <button className="text-[#111111] hover:text-white transition">
 <Maximize2 className="w-4 h-4" />
 </button>
 </div>

 <div className="flex-1 flex overflow-hidden">
 {/* Left Eye */}
 <div className="flex-1 border-r border-[#111111]/10 relative flex items-center justify-center overflow-hidden">
 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(0,0,0,0.8)_100%)] z-10 pointer-events-none"></div>
 <div className="w-full h-full bg-[#0B4F9C] -900/40 grid-bg flex items-center justify-center">
 {/* Simulating 3D View for Left Eye */}
 <div className="w-64 h-64 border border-[#F97316]/30 rounded-full flex items-center justify-center relative">
 <div className="w-32 h-32 border border-[#F97316]/30 rounded-full animate-ping"></div>
 <div className="absolute inset-0 flex items-center justify-center text-[#F97316] font-mono opacity-50">L</div>
 </div>
 </div>
 </div>

 {/* Right Eye */}
 <div className="flex-1 relative flex items-center justify-center overflow-hidden">
 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(0,0,0,0.8)_100%)] z-10 pointer-events-none"></div>
 <div className="w-full h-full bg-[#0B4F9C] -900/40 grid-bg flex items-center justify-center">
 {/* Simulating 3D View for Right Eye (slightly offset by IPD) */}
 <div 
 className="w-64 h-64 border border-[#F97316]/30 rounded-full flex items-center justify-center relative"
 style={{ transform: `translateX(${ (ipd - 64) * 0.5 }px)` }}
 >
 <div className="w-32 h-32 border border-[#F97316]/30 rounded-full animate-ping"></div>
 <div className="absolute inset-0 flex items-center justify-center text-[#F97316] font-mono opacity-50">R</div>
 </div>
 </div>
 </div>
 </div>
 </div>
 );
}
