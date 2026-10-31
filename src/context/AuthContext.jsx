import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if admin session is already active (via HTTP-only cookie or saved token)
  const verifySession = useCallback(async () => {
    try {
      setLoading(true);
      const data = await authService.getMe();
      if (data && data.success && data.admin) {
        setAdmin(data.admin);
      } else {
        setAdmin(null);
      }
    } catch {
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    verifySession();
  }, [verifySession]);

  const login = async (email, password) => {
    setError(null);
    try {
      const data = await authService.login(email, password);
      if (data && data.success && data.admin) {
        setAdmin(data.admin);
        return { success: true, admin: data.admin };
      }
      throw new Error(data?.message || 'Login failed');
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Invalid credentials';
      setError(message);
      return { success: false, message };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setAdmin(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        loading,
        error,
        isAuthenticated: !!admin,
        login,
        logout,
        verifySession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
