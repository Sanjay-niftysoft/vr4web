import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ text = 'Loading data...' }) {
  return (
    <div className="py-16 flex flex-col items-center justify-center text-[#64748B]">
      <div className="relative flex items-center justify-center mb-3">
        <div className="w-10 h-10 border-3 border-[#E5E7EB] border-t-[#E8890C] rounded-full animate-spin"></div>
        <Loader2 className="w-5 h-5 text-[#0F3D2E] absolute animate-pulse" />
      </div>
      <p className="text-xs font-medium tracking-wide uppercase font-mono text-[#0F3D2E]/70">{text}</p>
    </div>
  );
}
