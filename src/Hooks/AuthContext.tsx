import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';

type User = { id: number; username?: string } | null;
type AuthContextType = {
  user: User;
  token: string | null;
  login: (token: string, user?: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function decodeJwt(token: string | null): any | null {
  if (!token) return null;
  try {
    const payload = token.split('.')[1];
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decodeURIComponent(escape(json)));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const rawToken = sessionStorage.getItem('authToken')
      ?? (() => {
        const sd = sessionStorage.getItem('sessionData');
        if (!sd) return null;
        try { return JSON.parse(sd).token ?? null; } catch { return null; }
      })();

    if (rawToken) {
      const t = String(rawToken).replace(/^"|"$/g, '').trim();
      setToken(t);
      const payload = decodeJwt(t);
      if (payload) setUser({ id: Number(payload.sub ?? payload.userId ?? payload.id), username: payload.user ?? payload.username });
      else {
        const stored = sessionStorage.getItem('authUser');
        if (stored) try { setUser(JSON.parse(stored)); } catch {}
      }
    }
  }, []);

  const login = (newToken: string, u?: User) => {
    const t = String(newToken).replace(/^"|"$/g, '').trim();
    sessionStorage.setItem('authToken', t);
    if (u) sessionStorage.setItem('authUser', JSON.stringify(u));
    setToken(t);
    setUser(u ?? (() => {
      const p = decodeJwt(t);
      return p ? { id: Number(p.sub ?? p.userId ?? p.id), username: p.user ?? p.username } : null;
    })());
  };

  const logout = () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('authUser');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}