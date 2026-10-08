import { Activity, Box, Monitor, Layers } from 'lucide-react';

export default function TelemetryBar() {
 return (
 <div className="glass-panel absolute bottom-0 w-full h-8 flex items-center justify-between px-4 text-xs text-[#111111] z-50 border-t border-[#F97316]/20 text-mono font-mono">
 <div className="flex items-center gap-6">
 <div className="flex items-center gap-2">
 <Activity className="w-3 h-3 text-[#F97316]" />
 <span>FPS: <span className="text-[#F97316] font-extrabold">60</span></span>
 </div>
 <div className="flex items-center gap-2">
 <Monitor className="w-3 h-3 text-[#F97316]" />
 <span>RENDER: <span className="text-[#F97316]">WEBGL2</span></span>
 </div>
 <div className="flex items-center gap-2">
 <Box className="w-3 h-3 text-[#F97316]" />
 <span>POLYGONS: <span className="text-[#F97316]">24,512</span></span>
 </div>
 <div className="flex items-center gap-2">
 <Layers className="w-3 h-3 text-green-400" />
 <span>DRAW CALLS: <span className="text-green-300">42</span></span>
 </div>
 </div>
 
 <div className="flex items-center gap-2">
 <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
 <span>ENGINE RUNNING</span>
 </div>
 </div>
 );
}
