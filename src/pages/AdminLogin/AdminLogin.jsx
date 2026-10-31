import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Lock, Mail, Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { login, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If already authenticated, redirect to /admin/
  useEffect(() => {
    if (!loading && isAuthenticated) {
      const from = location.state?.from?.pathname || '/admin';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, loading, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Basic validation
    if (!email.trim() || !password) {
      setErrorMessage('Please enter both your email address and password.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const result = await login(email.trim(), password);
      if (result.success) {
        const from = location.state?.from?.pathname || '/admin';
        navigate(from, { replace: true });
      } else {
        setErrorMessage(result.message || 'Invalid email or password.');
      }
    } catch {
      setErrorMessage('A network error occurred. Please verify your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#06140E] text-white flex flex-col justify-center items-center px-4 sm:px-6 py-12 relative overflow-hidden select-none">
      {/* Background Ambience & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#143b2c_1px,transparent_1px)] [background-size:24px_24px] opacity-30"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#E8890C]/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#0E4935]/30 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0E4935] to-[#072419] border border-[#E8890C]/30 shadow-lg shadow-[#000000]/40 mb-4">
            <ShieldCheck className="w-7 h-7 text-[#E8890C]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            VR4WEB <span className="text-[#E8890C]">PORTAL</span>
          </h1>
          <p className="text-emerald-200/60 text-xs sm:text-sm mt-1 font-medium">
            Authorized Administrator Access Only
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#0A1F16]/90 backdrop-blur-xl border border-emerald-900/40 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/60">
          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-950/60 border border-red-800/60 text-red-200 text-xs sm:text-sm flex items-start gap-2.5 animate-fadeIn">
              <span className="text-red-400 font-bold">●</span>
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-emerald-200/80 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-400/60">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@vr4web.com"
                  autoComplete="email"
                  disabled={isSubmitting}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-[#06140E] border border-emerald-900/60 rounded-xl text-white placeholder-emerald-800 focus:outline-none focus:border-[#E8890C] focus:ring-1 focus:ring-[#E8890C] text-sm transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-emerald-200/80 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-400/60">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  disabled={isSubmitting}
                  required
                  className="w-full pl-10 pr-11 py-3 bg-[#06140E] border border-emerald-900/60 rounded-xl text-white placeholder-emerald-800 focus:outline-none focus:border-[#E8890C] focus:ring-1 focus:ring-[#E8890C] text-sm transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-emerald-400/60 hover:text-emerald-300 transition-colors cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3.5 px-4 bg-gradient-to-r from-[#E8890C] to-[#d97c06] hover:from-[#f39518] hover:to-[#e4830b] text-[#06140E] font-bold text-sm rounded-xl shadow-lg shadow-[#E8890C]/20 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#06140E]" />
                  <span>Verifying Session...</span>
                </>
              ) : (
                <>
                  <span>Login to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Security Note */}
          <div className="mt-6 pt-5 border-t border-emerald-900/30 text-center">
            <p className="text-[11px] text-emerald-300/40 font-mono">
              256-bit Encrypted Session · HTTP-only Cookie Auth
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center mt-8 text-emerald-200/40 text-xs">
          © {new Date().getFullYear()} VR4Web Australia Pty Ltd. All rights reserved.
        </div>
      </div>
    </div>
  );
}
