import { useState } from 'react';
import { Headset, Eye, Settings, Volume2, Globe, Cuboid, Zap } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <nav className="glass-panel w-full h-16 flex items-center justify-between px-6 z-50 relative border-b border-cyan-500/20">
      <div className="flex items-center gap-3">
        <Zap className="text-cyan-400 w-8 h-8 animate-pulse" />
        <h1 className="text-2xl font-bold tracking-wider text-white neon-text">VR4WEB</h1>
        <span className="text-xs bg-magenta-500/20 text-pink-400 px-2 py-0.5 rounded border border-pink-500/30 ml-2">BETA</span>
      </div>
      
      <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10">
        <NavButton 
          icon={<Cuboid className="w-4 h-4" />} 
          label="3D Holodeck" 
          active={activeTab === 'holodeck'} 
          onClick={() => setActiveTab('holodeck')} 
        />
        <NavButton 
          icon={<Headset className="w-4 h-4" />} 
          label="Stereo VR" 
          active={activeTab === 'stereo'} 
          onClick={() => setActiveTab('stereo')} 
        />
        <NavButton 
          icon={<Globe className="w-4 h-4" />} 
          label="360 Explorer" 
          active={activeTab === '360'} 
          onClick={() => setActiveTab('360')} 
        />
        <NavButton 
          icon={<Volume2 className="w-4 h-4" />} 
          label="Spatial Audio" 
          active={activeTab === 'audio'} 
          onClick={() => setActiveTab('audio')} 
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-xs text-cyan-200 bg-cyan-900/30 px-3 py-1.5 rounded-full border border-cyan-500/30">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          XR STATUS: READY
        </div>
        <button className="glass-button p-2 rounded-full text-gray-300 hover:text-white">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
}

function NavButton({ icon, label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-all duration-300 ${
        active 
          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_10px_rgba(0,240,255,0.2)]' 
          : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
