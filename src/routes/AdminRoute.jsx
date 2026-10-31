import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function AdminRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#071811] flex flex-col items-center justify-center text-white">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-[#E8890C]/20 border-t-[#E8890C] rounded-full animate-spin"></div>
          <Loader2 className="w-6 h-6 text-[#E8890C] absolute animate-pulse" />
        </div>
        <p className="mt-4 text-emerald-200/80 text-sm tracking-widest font-mono uppercase">
          Verifying Admin Access...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/demo/vr4web/login" state={{ from: location }} replace />;
  }

  return children;
}
