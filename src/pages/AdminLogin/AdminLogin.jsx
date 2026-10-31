import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, Eye, EyeOff, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';

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
        setErrorMessage(result.message || 'Invalid email address or password.');
      }
    } catch {
      setErrorMessage('Network connection error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] text-[#0F3D2E] flex flex-col justify-center items-center px-4 sm:px-6 py-12 relative overflow-hidden select-none">
      {/* Subtle Light Geometric Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#E5E7EB_1px,transparent_1px)] [background-size:24px_24px] opacity-70"></div>
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#0F3D2E]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#E8890C]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img
              src="/vr4web.png"
              alt="VR4WEB"
              className="h-12 sm:h-14 w-auto object-contain drop-shadow-xs"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0F3D2E]">
            Admin <span className="text-[#E8890C]">Portal</span>
          </h1>
          <p className="text-[#64748B] text-xs sm:text-sm mt-1.5 font-medium">
            Secure administrative access for VR4Web Australia
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 sm:p-9 shadow-xl shadow-slate-200/50">
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-[#DC2626] text-xs sm:text-sm flex items-start gap-2.5">
              <span className="font-bold">●</span>
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-[#0F3D2E] uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
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
                  className="w-full pl-10 pr-4 py-3 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-[#0F3D2E] placeholder-[#94A3B8] focus:bg-white focus:outline-none focus:border-[#E8890C] focus:ring-1 focus:ring-[#E8890C] text-sm transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold text-[#0F3D2E] uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
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
                  className="w-full pl-10 pr-11 py-3 bg-[#F8FAF9] border border-[#E5E7EB] rounded-xl text-[#0F3D2E] placeholder-[#94A3B8] focus:bg-white focus:outline-none focus:border-[#E8890C] focus:ring-1 focus:ring-[#E8890C] text-sm transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#64748B] hover:text-[#0F3D2E] transition-colors cursor-pointer"
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
              className="w-full mt-3 py-3.5 px-4 bg-[#E8890C] hover:bg-[#d07703] text-white font-bold text-sm rounded-xl shadow-md shadow-[#E8890C]/25 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Signing In...</span>
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
          <div className="mt-6 pt-5 border-t border-[#E5E7EB] text-center">
            <p className="text-[11px] text-[#64748B] flex items-center justify-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>Encrypted Session · Single Sign-On Access</span>
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center mt-8 text-[#64748B] text-xs">
          © {new Date().getFullYear()} VR4Web Australia Pty Ltd. All rights reserved.
        </div>
      </div>
    </div>
  );
}
