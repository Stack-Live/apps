
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

const AuthContext = createContext(null);

// The API_HOST should always point to your QR-Embed instance's public URL.
const rawApiHost = process.env.NEXT_PUBLIC_QR_EMBED_URL || 'https://www.stacklive.dev/';
const API_HOST = rawApiHost.replace(/\/+$/, "");

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSession = useCallback(async () => {
    if (API_HOST === undefined) {
      console.error("NEXT_PUBLIC_QR_EMBED_URL is not set. Authentication will not work.");
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_HOST}/api/auth/me`, { credentials: 'include' });
      if (res.ok) {
        const { user: userData, permissions: userPermissions, roles: userRoles } = await res.json();
        setUser(userData);
        setPermissions(userPermissions || []);
        setRoles(userRoles || []);
      } else {
        setUser(null);
        setPermissions([]);
        setRoles([]);
      }
    } catch (error) {
      console.error("Failed to fetch user session:", error);
      setUser(null);
      setPermissions([]);
      setRoles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  const logout = async () => {
    if (API_HOST === undefined) return;
    await fetch(`${API_HOST}/api/auth/logout`, { method: 'POST', credentials: 'include' });
    setUser(null);
    setPermissions([]);
    setRoles([]);
    // Force a full page reload to the homepage to clear all state.
    window.location.href = '/';
  };

  const hasPermission = (requiredPermission) => {
    return permissions.includes(requiredPermission);
  };

  const hasRole = (requiredRole) => {
    // Check by role name
    return roles.some(role => role.name === requiredRole);
  };

  const value = { user, permissions, roles, isAuthenticated: !!user, loading, logout, hasPermission, hasRole, fetchSession };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
    