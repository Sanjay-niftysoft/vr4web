/**
 * Utility to resolve asset & uploaded image URLs across dev and production.
 * Automatically formats /uploads/... paths to point to the backend server if not proxied,
 * and handles external URLs and fallbacks gracefully.
 */

const BACKEND_URL = (import.meta.env?.VITE_BACKEND_URL || 'http://localhost:5000').replace(/\/$/, '');

export const getImageUrl = (path, fallback = '/case-study/property.png') => {
  if (!path || typeof path !== 'string' || path.trim() === '') {
    return fallback;
  }

  const clean = path.trim();

  // If already absolute or data/blob URI
  if (
    clean.startsWith('http://') ||
    clean.startsWith('https://') ||
    clean.startsWith('data:') ||
    clean.startsWith('blob:')
  ) {
    return clean;
  }

  // Handle uploaded assets
  if (clean.startsWith('/uploads/') || clean.startsWith('uploads/')) {
    const formatted = clean.startsWith('/') ? clean : `/${clean}`;
    // In local dev with Vite proxy, '/uploads/...' works, but prepending backend URL guarantees it works across all ports (5173, 5174, etc.)
    return `${BACKEND_URL}${formatted}`;
  }

  // Regular public assets (e.g. /case-study/property.png)
  return clean.startsWith('/') ? clean : `/${clean}`;
};

export default getImageUrl;
