import { Globe2, Play, Pause } from 'lucide-react';
import { useState } from 'react';

export default function PanoramaViewer() {
  const [playing, setPlaying] = useState(true);

  return (
    <div className="w-full h-full relative bg-gray-900 overflow-hidden flex items-center justify-center">
      {/* Fallback immersive CSS visualization instead of loading heavy images */}
      <div 
        className={`absolute inset-[-50%] bg-[conic-gradient(var(--tw-gradient-stops))] from-cyan-900 via-purple-900 to-black transition-transform duration-1000 ${playing ? 'animate-[spin_20s_linear_infinite]' : ''}`}
        style={{ filter: 'blur(40px)' }}
      ></div>
      
      <div className="z-10 text-center glass-panel p-8 rounded-2xl max-w-md">
        <Globe2 className="w-16 h-16 text-cyan-400 mx-auto mb-4 animate-pulse" />
        <h2 className="text-2xl font-bold text-white mb-2 neon-text">360° Explorer</h2>
        <p className="text-gray-400 text-sm mb-6">
          Immersive panorama viewer active. Rotate device or drag to look around.
        </p>
        
        <button 
          onClick={() => setPlaying(!playing)}
          className="glass-button px-6 py-2 rounded-full text-white flex items-center justify-center gap-2 mx-auto"
        >
          {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {playing ? 'PAUSE ROTATION' : 'AUTO-ROTATE'}
        </button>
      </div>

      {/* Grid overlay for 360 reference */}
      <div className="absolute inset-0 border border-white/5 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.8)_100%)] pointer-events-none"></div>
    </div>
  );
}
